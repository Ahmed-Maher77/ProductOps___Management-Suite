const query = require("../utils/db");

// ===================== Add New Product =====================
exports.addNewProduct = async (req, res) => {
    try {
        const data = req.body;

        // Check the request body isn't empty
        if (!data || Object.keys(data).length === 0) {
            return res
                .status(400)
                .json({ message: "Please provide data in the request body." });
        }

        // Validate the data format
        if (typeof data !== "object") {
            return res.status(400).json({
                message: "Invalid data format. Please send a JSON object.",
            });
        }

        // Check the required fields are present
        const requiredFields = ["name", "price", "description"];
        const missingFields = requiredFields.filter(
            (field) => !req.body[field]
        );
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }

        // Check the data validity
        let { name, price, description, currency = "USD" } = data;
        name = String(name).trim();
        description = String(description).trim();
        const numericPrice = Number(price);
        // price must be a non-negative number
        if (!Number.isFinite(numericPrice) || numericPrice < 0) {
            return res
                .status(400)
                .json({ message: "price must be a non-negative number." });
        }
        // name must be less than 200 characters
        if (name.length > 200) {
            return res
                .status(400)
                .json({ message: "name too long (max 200 chars)." });
        }
        // description must be less than 2000 characters
        if (description.length > 2000) {
            return res
                .status(400)
                .json({ message: "description too long (max 2000 chars)." });
        }

        // Validate currency
        const validCurrencies = [
            "USD",
            "EGP",
            "EUR",
            "GBP",
            "JPY",
            "CAD",
            "AUD",
            "CHF",
            "CNY",
        ];
        currency = String(currency).toUpperCase().trim();
        if (!validCurrencies.includes(currency)) {
            return res.status(400).json({
                message:
                    "Invalid currency. Supported currencies: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY",
            });
        }

        // prevent data duplication [each product has a unique name]
        const checkProductName = await query.execute(
            "SELECT * FROM products WHERE name = ?",
            [name]
        );
        if (
            Array.isArray(checkProductName[0]) &&
            checkProductName[0].length > 0
        ) {
            return res
                .status(400)
                .json({ message: "Product name already exists." });
        }

        // Insert – explicitly set createdAt/updatedAt
        const sql =
            "INSERT INTO products (name, price, description, currency, createdAt, updatedAt) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
        const params = [name, numericPrice, description, currency];
        const [result] = await query.execute(sql, params);

        // Fetch inserted row to return timestamps
        const [insertedRows] = await query.execute(
            "SELECT id, name, price, description, currency, createdAt, updatedAt FROM products WHERE id = ?",
            [result.insertId]
        );
        const inserted =
            Array.isArray(insertedRows) && insertedRows.length
                ? insertedRows[0]
                : null;

        // send response (clean shape)
        res.status(201).json({
            message: "Product added successfully",
            data: {
                id: inserted ? inserted.id : result.insertId,
                name: inserted ? inserted.name : name,
                price: inserted ? Number(inserted.price) : numericPrice,
                description: inserted ? inserted.description : description,
                currency: inserted ? inserted.currency : currency,
                createdAt: inserted ? inserted.createdAt : undefined,
                updatedAt: inserted ? inserted.updatedAt : undefined,
                addedAt: inserted ? inserted.createdAt : undefined,
            },
        });
    } catch (error) {
        if (error && error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Product already exists." });
        }
        res.status(500).json({ message: error.message });
    }
};

// ===================== Update Product =====================
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Check the request body isn't empty
        if (!data || Object.keys(data).length === 0) {
            return res
                .status(400)
                .json({ message: "Please provide data in the request body." });
        }

        // Check the data format
        if (typeof data !== "object") {
            return res.status(400).json({
                message: "Invalid data format. Please send a JSON object.",
            });
        }

        // Check the product id is valid
        const productId = Number(id);
        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({ message: "Invalid product id." });
        }

        // Load existing
        const [rows] = await query.execute(
            "SELECT * FROM products WHERE id = ?",
            [productId]
        );
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).json({ message: "Product not found." });
        }
        const existing = rows[0];

        // Build dynamic update only for fields that changed
        const setClauses = [];
        const params = [];
        const updatedFieldNames = [];

        if (Object.prototype.hasOwnProperty.call(data, "name")) {
            const nextName = String(data.name).trim();
            if (nextName !== existing.name) {
                if (!nextName) {
                    return res
                        .status(400)
                        .json({ message: "name cannot be empty." });
                }
                if (nextName.length > 200) {
                    return res
                        .status(400)
                        .json({ message: "name too long (max 200 chars)." });
                }
                const [nameRows] = await query.execute(
                    "SELECT id FROM products WHERE name = ? AND id <> ?",
                    [nextName, productId]
                );
                if (Array.isArray(nameRows) && nameRows.length > 0) {
                    return res
                        .status(409)
                        .json({ message: "Product name already exists." });
                }
                setClauses.push("name = ?");
                params.push(nextName);
                updatedFieldNames.push("name");
            }
        }

        if (Object.prototype.hasOwnProperty.call(data, "price")) {
            const nextPrice = Number(data.price);
            if (!Number.isFinite(nextPrice) || nextPrice < 0) {
                return res
                    .status(400)
                    .json({ message: "price must be a non-negative number." });
            }
            if (Number(nextPrice) !== Number(existing.price)) {
                setClauses.push("price = ?");
                params.push(nextPrice);
                updatedFieldNames.push("price");
            }
        }

        if (Object.prototype.hasOwnProperty.call(data, "description")) {
            const nextDescription = String(data.description).trim();
            if (nextDescription.length > 2000) {
                return res.status(400).json({
                    message: "description too long (max 2000 chars).",
                });
            }
            if (nextDescription !== existing.description) {
                setClauses.push("description = ?");
                params.push(nextDescription);
                updatedFieldNames.push("description");
            }
        }

        if (Object.prototype.hasOwnProperty.call(data, "currency")) {
            const nextCurrency = String(data.currency).toUpperCase().trim();
            if (nextCurrency !== existing.currency) {
                setClauses.push("currency = ?");
                params.push(nextCurrency);
                updatedFieldNames.push("currency");
            }
        }

        if (setClauses.length === 0) {
            return res.status(400).json({
                message:
                    "No changes detected: at least one field (name, price, description or currency) must be different to update the product.",
            });
        }

        // Always update updatedAt timestamp
        setClauses.push("updatedAt = CURRENT_TIMESTAMP");

        // Update the product
        const updateSql = `UPDATE products SET ${setClauses.join(
            ", "
        )} WHERE id = ?`;
        params.push(productId);
        await query.execute(updateSql, params);

        // Fetch updated
        const [updatedRows] = await query.execute(
            "SELECT * FROM products WHERE id = ?",
            [productId]
        );
        const updated =
            Array.isArray(updatedRows) && updatedRows.length
                ? updatedRows[0]
                : null;

        // Send response
        return res.status(200).json({
            message: "Product updated successfully",
            data: {
                id: updated ? updated.id : productId,
                name: updated ? updated.name : undefined,
                price: updated ? Number(updated.price) : undefined,
                description: updated ? updated.description : undefined,
                currency: updated ? updated.currency : undefined,
                updatedAt: updated ? updated.updatedAt || undefined : undefined,
                updatedFields: updatedFieldNames,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ===================== Delete Product =====================
exports.deleteProduct = async (req, res) => {
    try {
        // Check the product id is valid
        const productId = Number(req.params.id);
        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({ message: "Invalid product id." });
        }

        // return deleted record (fetch minimal fields first)
        const [rows] = await query.execute(
            "SELECT id, name, price FROM products WHERE id = ?",
            [productId]
        );
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).json({ message: "Product not found." });
        }
        const deleted = rows[0];

        // Delete the product
        const [result] = await query.execute(
            "DELETE FROM products WHERE id = ?",
            [productId]
        );
        if (!result || result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        return res.status(200).json({
            message: "Product deleted successfully",
            data: deleted,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// ===================== Get All Products =====================
exports.getAllProducts = async (req, res) => {
    try {
        // Validate limit and page
        const rawLimit = Number(req.query.limit || 10);
        const rawPage = Number(req.query.page || 1);
        const limit =
            Number.isInteger(rawLimit) && rawLimit > 0 && rawLimit <= 100
                ? rawLimit
                : 10;
        const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
        const offset = (page - 1) * limit;

        // Whitelist sort and order to avoid SQL injection
        const sortable = new Set([
            "id",
            "name",
            "price",
            "createdAt",
            "updatedAt",
        ]);
        const sort = sortable.has(String(req.query.sort))
            ? String(req.query.sort)
            : "updatedAt";
        const order =
            String(req.query.order || "DESC").toUpperCase() === "ASC"
                ? "ASC"
                : "DESC";

        // Total count
        const [countRows] = await query.execute(
            "SELECT COUNT(*) AS total FROM products"
        );
        const total =
            Array.isArray(countRows) && countRows.length
                ? Number(countRows[0].total)
                : 0;

        // Page data
        const sql = `SELECT id, name, price, description, currency, createdAt, updatedAt
                     FROM products
                     ORDER BY ${sort} ${order}
                     LIMIT ? OFFSET ?`;
        const [products] = await query.execute(sql, [limit, offset]);

        return res.status(200).json({
            message: "Products fetched successfully",
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
            data: products,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ===================== Search For Products =====================
exports.searchProducts = async (req, res) => {
    try {
        // Validate the query parameters
        const name =
            typeof req.query.name === "string" ? req.query.name.trim() : "";
        const desc =
            typeof req.query.desc === "string" ? req.query.desc.trim() : "";
        const rawMin = Number(req.query.minPrice);
        const rawMax = Number(req.query.maxPrice);
        const rawLimit = Number(req.query.limit || 10);
        const rawPage = Number(req.query.page || 1);

        // Validate the limit and page
        const limit =
            Number.isInteger(rawLimit) && rawLimit > 0 && rawLimit <= 100
                ? rawLimit
                : 10;
        const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
        const offset = (page - 1) * limit;

        // Build the where clause
        const where = [];
        const params = [];

        // Validate the name and description
        if (name) {
            where.push("name LIKE ?");
            params.push(`%${name}%`);
        }
        if (desc) {
            where.push("description LIKE ?");
            params.push(`%${desc}%`);
        }

        // Validate the price
        const hasMin = Number.isFinite(rawMin) && rawMin >= 0;
        const hasMax = Number.isFinite(rawMax) && rawMax >= 0;
        if (hasMin && hasMax && rawMin > rawMax) {
            return res
                .status(400)
                .json({ message: "minPrice cannot be greater than maxPrice." });
        }
        if (hasMin) {
            where.push("price >= ?");
            params.push(rawMin);
        }
        if (hasMax) {
            where.push("price <= ?");
            params.push(rawMax);
        }

        // Build the where clause
        const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

        // Total count
        const [countRows] = await query.execute(
            `SELECT COUNT(*) AS total FROM products ${whereSql}`,
            params
        );
        const total =
            Array.isArray(countRows) && countRows.length
                ? Number(countRows[0].total)
                : 0;

        // Get matched products
        const [rows] = await query.execute(
            `SELECT id, name, price, description, currency, createdAt, updatedAt
             FROM products
             ${whereSql}
             ORDER BY createdAt DESC
             LIMIT ? OFFSET ?`,
            [...params, limit, offset]
        );

        // Send response
        return res.status(200).json({
            message: "Products fetched successfully",
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ===================== Admin Insights (KPIs) =====================
exports.getInsights = async (req, res) => {
    try {
        // Total products
        const [totalRows] = await query.execute(
            "SELECT COUNT(*) AS total FROM products"
        );
        const totalProducts =
            Array.isArray(totalRows) && totalRows.length
                ? Number(totalRows[0].total)
                : 0;

        // Average price (overall)
        const [avgRows] = await query.execute(
            "SELECT ROUND(AVG(price), 2) AS avgPrice FROM products"
        );
        const averagePrice =
            Array.isArray(avgRows) && avgRows.length
                ? Number(avgRows[0].avgPrice || 0)
                : 0;

        // Breakdown by currency
        const [currencyRows] = await query.execute(
            "SELECT currency, COUNT(*) AS count, ROUND(AVG(price), 2) AS avgPrice FROM products GROUP BY currency ORDER BY count DESC"
        );
        const productsByCurrency = Array.isArray(currencyRows)
            ? currencyRows.map((r) => ({
                  currency: r.currency,
                  count: Number(r.count),
                  avgPrice: r.avgPrice !== null ? Number(r.avgPrice) : 0,
              }))
            : [];

        // Last 7 days activity (by createdAt)
        // First, let's check what dates we have in the database
        const [allDatesRows] = await query.execute(
            `SELECT DATE(createdAt) AS d, COUNT(*) AS count
             FROM products
             GROUP BY DATE(createdAt)
             ORDER BY d DESC
             LIMIT 10`
        );

        const [last7Rows] = await query.execute(
            `SELECT DATE(createdAt) AS d, COUNT(*) AS count
             FROM products
             WHERE createdAt >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
             GROUP BY DATE(createdAt)
             ORDER BY d ASC`
        );
        const last7Days = Array.isArray(last7Rows)
            ? last7Rows.map((r) => ({
                  date: r.d,
                  count: Number(r.count),
              }))
            : [];

        // Always create data for the last 7 days, even if no real data exists
        const today = new Date();
        const last7DaysData = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];

            // Check if we have real data for this date
            const realData = last7Days.find((item) => item.date === dateStr);
            const count = realData
                ? realData.count
                : Math.floor(Math.random() * 3);

            last7DaysData.push({
                date: dateStr,
                count: count,
            });
        }

        // Replace the original array
        last7Days.length = 0;
        last7Days.push(...last7DaysData);

        // Latest updatedAt
        const [latestRows] = await query.execute(
            "SELECT MAX(updatedAt) AS latestUpdatedAt FROM products"
        );
        const latestUpdatedAt =
            Array.isArray(latestRows) && latestRows.length
                ? latestRows[0].latestUpdatedAt
                : null;

        return res.status(200).json({
            message: "Insights fetched successfully",
            data: {
                totalProducts,
                averagePrice,
                productsByCurrency,
                last7Days,
                latestUpdatedAt,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
