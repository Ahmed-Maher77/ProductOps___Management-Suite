// ===================== Element Selections =====================
const tableBody = document.getElementById("tbody");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCurrency = document.getElementById("productCurrency");
const productDesc = document.getElementById("productDesc");
const productForm = document.getElementById("productForm");
const productNameError = document.getElementById("productNameError");
const productPriceError = document.getElementById("productPriceError");
const productDescError = document.getElementById("productDescError");
const formInputs = document.querySelectorAll(
    "#productName, #productPrice, #productCurrency, #productDesc"
);
const searchToggle = document.getElementById("searchToggle");
const applySearchBtn = document.getElementById("applySearch");
const clearSearchBtn = document.getElementById("clearSearch");
const insightsKpis = document.getElementById("insightsKpis");

// ===================== Constants =====================
const API_URL = "https://product-ops-management-suite.vercel.app/api";

// ===================== Language Support =====================
let currentLanguage = "en";

const translations = {
    en: {
        // Header
        "app-title": "ProductOps",
        "app-subtitle":
            "Manage and track products with API-backed persistent storage.",
        "api-badge": "API & DB",
        "persistent-storage": "Persistent storage",

        // Form
        "product-form-title": "Product",
        "product-name": "Product Name",
        "product-name-placeholder": "Ex: Headphones",
        "product-price": "Product Price",
        "product-price-placeholder": "Ex: 149.99",
        "product-description": "Product Description",
        "product-description-placeholder": "Ex: Wireless, noise-cancelling...",
        "add-product": "Add Product",
        "update-product": "Update Product",
        reset: "Reset",
        cancel: "Cancel",

        // Table
        "products-title": "Products",
        "search-filter": "Search & Filter",
        toggle: "Toggle",
        name: "Name",
        price: "Price",
        description: "Description",
        "min-price": "Min Price",
        "max-price": "Max Price",
        "description-contains": "Description contains",
        apply: "Apply",
        clear: "Clear",
        id: "ID",
        currency: "Currency",
        "created-at": "Created At",
        "updated-at": "Updated At",
        actions: "Actions",
        "no-products": "No products found",
        edit: "Edit",
        delete: "Delete",

        // Admin Dashboard
        "admin-dashboard": "Admin Dashboard",
        "admin-subtitle":
            "Real-time insights and analytics for your product management",
        "total-products": "Total Products",
        "average-price": "Average Price",
        "last-update": "Last Update",
        "products-by-currency": "Products by Currency",
        "last-7-days": "Last 7 Days Activity",
        "no-activity": "No activity in the last 7 days",

        // Modals
        "product-details": "Product Details",
        "delete-product": "Delete Product",
        "delete-confirmation": "Are you sure you want to delete",
        "delete-warning": "This action cannot be undone.",
        close: "Close",
        "edit-product": "Edit Product",

        // Product Details Modal
        "product-name": "Product Name",
        price: "Price",
        currency: "Currency",
        description: "Description",
        "created-at": "Created At",
        "last-updated": "Last Updated",

        // Admin Dashboard Cards
        "total-products": "Total Products",
        "average-price": "Average Price",
        "last-update": "Last Update",
        "products-by-currency": "Products by Currency",
        "last-7-days": "Last 7 Days Activity",
        "no-activity": "No activity in the last 7 days",

        // Validation Messages
        "name-required": "Product name is required",
        "name-min-length": "Product name must be at least 2 characters long",
        "name-max-length": "Product name must be less than 255 characters",
        "price-required": "Product price is required",
        "price-valid": "Please enter a valid number for price",
        "price-positive": "Price must be greater than zero",
        "price-max": "Price cannot exceed $999,999.99",
        "description-required": "Product description is required",
        "description-min-length":
            "Description must be at least 10 characters long",
        "description-max-length":
            "Description must be less than 2000 characters",

        // Success Messages
        "product-added": "Product added successfully",
        "product-updated": "Product updated successfully",
        "product-deleted": "Product deleted successfully",
        "edit-cancelled": "Edit cancelled",
        "filters-applied": "Found {count} products matching your filters",
        "filters-cleared": "Clearing filters...",
        "applying-filters": "Applying filters...",
        "editing-product": "Editing product: {name}",

        // Footer
        "designed-by": "Designed and developed by",
        loading: "Loading ProductOps…",

        // Pagination
        "pagination-info": "Showing {start}-{end} of {total} products",

        // Export
        "export-csv": "Export CSV",
        "export-success": "Products exported successfully",
        "export-error": "Failed to export products",
    },
    ar: {
        // Header
        "app-title": "إدارة المنتجات",
        "app-subtitle":
            "إدارة وتتبع المنتجات مع التخزين المستمر المدعوم بواجهة برمجة التطبيقات.",
        "api-badge": "واجهة برمجة التطبيقات وقاعدة البيانات",
        "persistent-storage": "تخزين مستمر",

        // Form
        "product-form-title": "المنتج",
        "product-name": "اسم المنتج",
        "product-name-placeholder": "مثال: سماعات",
        "product-price": "سعر المنتج",
        "product-price-placeholder": "مثال: 149.99",
        "product-description": "وصف المنتج",
        "product-description-placeholder": "مثال: لاسلكية، إلغاء الضوضاء...",
        "add-product": "إضافة منتج",
        "update-product": "تحديث المنتج",
        reset: "إعادة تعيين",
        cancel: "إلغاء",

        // Table
        "products-title": "المنتجات",
        "search-filter": "البحث والتصفية",
        toggle: "تبديل",
        name: "الاسم",
        price: "السعر",
        description: "الوصف",
        "min-price": "الحد الأدنى للسعر",
        "max-price": "الحد الأقصى للسعر",
        "description-contains": "يحتوي الوصف على",
        apply: "تطبيق",
        clear: "مسح",
        id: "المعرف",
        currency: "العملة",
        "created-at": "تاريخ الإنشاء",
        "updated-at": "تاريخ التحديث",
        actions: "الإجراءات",
        "no-products": "لم يتم العثور على منتجات",
        edit: "تعديل",
        delete: "حذف",

        // Admin Dashboard
        "admin-dashboard": "لوحة تحكم الإدارة",
        "admin-subtitle": "رؤى وتحليلات في الوقت الفعلي لإدارة منتجاتك",
        "total-products": "إجمالي المنتجات",
        "average-price": "متوسط السعر",
        "last-update": "آخر تحديث",
        "products-by-currency": "المنتجات حسب العملة",
        "last-7-days": "نشاط آخر 7 أيام",
        "no-activity": "لا يوجد نشاط في آخر 7 أيام",

        // Modals
        "product-details": "تفاصيل المنتج",
        "delete-product": "حذف المنتج",
        "delete-confirmation": "هل أنت متأكد من أنك تريد حذف",
        "delete-warning": "لا يمكن التراجع عن هذا الإجراء.",
        close: "إغلاق",
        "edit-product": "تعديل المنتج",

        // Product Details Modal
        "product-name": "اسم المنتج",
        price: "السعر",
        currency: "العملة",
        description: "الوصف",
        "created-at": "تاريخ الإنشاء",
        "last-updated": "آخر تحديث",

        // Admin Dashboard Cards
        "total-products": "إجمالي المنتجات",
        "average-price": "متوسط السعر",
        "last-update": "آخر تحديث",
        "products-by-currency": "المنتجات حسب العملة",
        "last-7-days": "نشاط آخر 7 أيام",
        "no-activity": "لا يوجد نشاط في آخر 7 أيام",

        // Validation Messages
        "name-required": "اسم المنتج مطلوب",
        "name-min-length": "يجب أن يكون اسم المنتج حرفين على الأقل",
        "name-max-length": "يجب أن يكون اسم المنتج أقل من 255 حرف",
        "price-required": "سعر المنتج مطلوب",
        "price-valid": "يرجى إدخال رقم صحيح للسعر",
        "price-positive": "يجب أن يكون السعر أكبر من صفر",
        "price-max": "لا يمكن أن يتجاوز السعر $999,999.99",
        "description-required": "وصف المنتج مطلوب",
        "description-min-length": "يجب أن يكون الوصف 10 أحرف على الأقل",
        "description-max-length": "يجب أن يكون الوصف أقل من 2000 حرف",

        // Success Messages
        "product-added": "تم إضافة المنتج بنجاح",
        "product-updated": "تم تحديث المنتج بنجاح",
        "product-deleted": "تم حذف المنتج بنجاح",
        "edit-cancelled": "تم إلغاء التعديل",
        "filters-applied": "تم العثور على {count} منتج يطابق المرشحات",
        "filters-cleared": "جاري مسح المرشحات...",
        "applying-filters": "جاري تطبيق المرشحات...",
        "editing-product": "تعديل المنتج: {name}",

        // Footer
        "designed-by": "صمم وطور بواسطة",
        loading: "جاري تحميل إدارة المنتجات…",

        // Pagination
        "pagination-info": "عرض {start}-{end} من {total} منتج",

        // Export
        "export-csv": "تصدير CSV",
        "export-success": "تم تصدير المنتجات بنجاح",
        "export-error": "فشل في تصدير المنتجات",
    },
};

// ===================== Language Functions =====================
function translate(key, params = {}) {
    let text =
        translations[currentLanguage][key] || translations["en"][key] || key;

    // Replace placeholders like {count} with actual values
    Object.keys(params).forEach((param) => {
        text = text.replace(`{${param}}`, params[param]);
    });

    return text;
}

function updateLanguage() {
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;

    // Update RTL/LTR direction
    if (currentLanguage === "ar") {
        document.documentElement.dir = "rtl";
        document.body.classList.add("rtl");
    } else {
        document.documentElement.dir = "ltr";
        document.body.classList.remove("rtl");
    }

    // Update all translatable elements
    updateTranslatableElements();

    // Save language preference
    localStorage.setItem("preferred-language", currentLanguage);
}

function updateTranslatableElements() {
    // Header elements
    const appTitle = document.querySelector("header h1");
    if (appTitle) appTitle.textContent = translate("app-title");

    const appSubtitle = document.querySelector("header .text-white-50.small");
    if (appSubtitle) appSubtitle.textContent = translate("app-subtitle");

    const apiBadge = document.querySelector(".badge.bg-success");
    if (apiBadge) apiBadge.textContent = translate("api-badge");

    const persistentStorage = document.querySelector("header small");
    if (persistentStorage)
        persistentStorage.textContent = translate("persistent-storage");

    // Form elements
    const formTitle = document.querySelector(".card-body h2");
    if (formTitle) formTitle.textContent = translate("product-form-title");

    const nameLabel = document.querySelector('label[for="productName"]');
    if (nameLabel) nameLabel.textContent = translate("product-name");

    const nameInput = document.getElementById("productName");
    if (nameInput)
        nameInput.placeholder = translate("product-name-placeholder");

    const priceLabel = document.querySelector('label[for="productPrice"]');
    if (priceLabel) priceLabel.textContent = translate("product-price");

    const priceInput = document.getElementById("productPrice");
    if (priceInput)
        priceInput.placeholder = translate("product-price-placeholder");

    const descLabel = document.querySelector('label[for="productDesc"]');
    if (descLabel) descLabel.textContent = translate("product-description");

    const descInput = document.getElementById("productDesc");
    if (descInput)
        descInput.placeholder = translate("product-description-placeholder");

    const addBtn = document.getElementById("add");
    if (addBtn) addBtn.textContent = translate("add-product");

    const updateBtn = document.getElementById("update");
    if (updateBtn) updateBtn.textContent = translate("update-product");

    const resetBtn = document.getElementById("reset");
    if (resetBtn) resetBtn.textContent = translate("reset");

    const cancelBtn = document.getElementById("cancel");
    if (cancelBtn) cancelBtn.textContent = translate("cancel");

    // Table elements
    const tableTitle = document.querySelector(".card-body h2");
    if (tableTitle && tableTitle.textContent.includes("Products")) {
        tableTitle.textContent = translate("products-title");
    }

    const searchToggle = document.querySelector(
        ".collapsible-header .fw-semibold"
    );
    if (searchToggle) searchToggle.textContent = translate("search-filter");

    const toggleText = document.querySelector(".collapsible small");
    if (toggleText) toggleText.textContent = translate("toggle");

    // Search form labels
    const searchNameLabel = document.querySelector('label[for="searchName"]');
    if (searchNameLabel) searchNameLabel.textContent = translate("name");

    const searchMinPriceLabel = document.querySelector(
        'label[for="searchMinPrice"]'
    );
    if (searchMinPriceLabel)
        searchMinPriceLabel.textContent = translate("min-price");

    const searchMaxPriceLabel = document.querySelector(
        'label[for="searchMaxPrice"]'
    );
    if (searchMaxPriceLabel)
        searchMaxPriceLabel.textContent = translate("max-price");

    const searchDescLabel = document.querySelector('label[for="searchDesc"]');
    if (searchDescLabel)
        searchDescLabel.textContent = translate("description-contains");

    const applyBtn = document.getElementById("applySearch");
    if (applyBtn) applyBtn.textContent = translate("apply");

    const clearBtn = document.getElementById("clearSearch");
    if (clearBtn) clearBtn.textContent = translate("clear");

    // Table headers
    const tableHeaders = document.querySelectorAll(
        ".table-dark-theme thead th"
    );
    const headerTexts = [
        "id",
        "name",
        "price",
        "currency",
        "description",
        "created-at",
        "updated-at",
        "actions",
    ];
    tableHeaders.forEach((header, index) => {
        if (headerTexts[index]) {
            header.textContent = translate(headerTexts[index]);
        }
    });

    // Admin Dashboard
    const adminTitle = document.querySelector(".insights-title");
    if (adminTitle) adminTitle.textContent = translate("admin-dashboard");

    const adminSubtitle = document.querySelector(".insights-subtitle");
    if (adminSubtitle) adminSubtitle.textContent = translate("admin-subtitle");

    // Update all insight card labels
    const insightLabels = document.querySelectorAll(".insight-label");
    const labelTexts = ["total-products", "average-price", "last-update"];
    insightLabels.forEach((label, index) => {
        if (labelTexts[index]) {
            label.textContent = translate(labelTexts[index]);
        }
    });

    // Update insight card titles
    const cardTitles = document.querySelectorAll(".insight-card-title");
    const cardTitleTexts = ["products-by-currency", "last-7-days"];
    cardTitles.forEach((title, index) => {
        if (cardTitleTexts[index]) {
            // Remove the icon and get just the text
            const textNode = title.childNodes[title.childNodes.length - 1];
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                textNode.textContent = translate(cardTitleTexts[index]);
            }
        }
    });

    // Footer
    const designedBy = document.querySelector("footer small");
    if (designedBy) {
        const link = designedBy.querySelector("a");
        if (link) {
            designedBy.innerHTML = `${translate("designed-by")} <a href="${
                link.href
            }" target="_blank" rel="noopener noreferrer" class="animated-link-hover text-decoration-none">${
                link.textContent
            }</a>`;
        }
    }

    // Loading text
    const loadingText = document.querySelector(".loader-text");
    if (loadingText) loadingText.textContent = translate("loading");

    // Export button
    const exportButton = document.querySelector(
        '[data-translate="export-csv"]'
    );
    if (exportButton) exportButton.textContent = translate("export-csv");
}

window.toggleLanguage = function () {
    const dropdown = document.getElementById("langDropdown");
    dropdown.classList.toggle("show");
};

window.switchLanguage = function (lang) {
    currentLanguage = lang;
    updateLanguage();

    // Update language switcher button
    const currentLangSpan = document.getElementById("currentLang");
    const langBtn = document.getElementById("langBtn");

    if (lang === "ar") {
        currentLangSpan.textContent = "العربية";
        langBtn.style.direction = "rtl";
    } else {
        currentLangSpan.textContent = "English";
        langBtn.style.direction = "ltr";
    }

    // Close dropdown
    const dropdown = document.getElementById("langDropdown");
    dropdown.classList.remove("show");

    // Refresh data to update any dynamic content
    fetchProducts(paginationData.page, paginationData.limit);
    fetchInsights();
};

// Initialize language on page load
function initializeLanguage() {
    const savedLanguage = localStorage.getItem("preferred-language");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
        currentLanguage = savedLanguage;
    }
    updateLanguage();
}

// Close language dropdown when clicking outside
document.addEventListener("click", function (event) {
    const languageSwitcher = document.querySelector(".language-switcher");
    const dropdown = document.getElementById("langDropdown");

    if (languageSwitcher && !languageSwitcher.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});

// ===================== Loader Helpers =====================
let initialLoaderHidden = false;
function hideInitialLoaderOnce() {
    if (initialLoaderHidden) return;
    const loader = document.getElementById("initialLoader");
    if (loader) {
        loader.classList.add("hidden");
        setTimeout(() => {
            document.body.classList.add("app-ready");
        }, 1500);
    }
    initialLoaderHidden = true;
}

// ===================== Fetch Products =====================
let productsData = [];
let paginationData = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
};
async function fetchProducts(page = 1, limit = 10) {
    try {
        // Only show skeleton if initial loader is not visible
        if (
            !document
                .getElementById("initialLoader")
                .classList.contains("hidden")
        ) {
            console.log("Initial loader still visible, waiting...");
            // Wait for initial loader to be hidden
            setTimeout(() => {
                console.log("Showing skeleton loader after initial loader...");
                showTableSkeleton();
            }, 2000);
        } else {
            console.log("Showing skeleton loader...");
            showTableSkeleton();
        }

        const response = await fetch(
            `${API_URL}/products?page=${page}&limit=${limit}`
        );
        const data = await response.json();

        // Longer delay to see skeleton effect
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Hiding skeleton loader...");
        renderTableData(data.data);
        productsData = data.data;
        paginationData = data.meta;
        renderPagination();
        console.log(data.data);
        // Hide loader after first successful data render
        hideInitialLoaderOnce();
    } catch (err) {
        console.error(err);
        // Hide skeleton on error and show error state
        hideTableSkeleton();
        // Ensure loader doesn't block the app on error
        hideInitialLoaderOnce();
    }
}
fetchProducts();

// ===================== Insights =====================
async function fetchInsights() {
    try {
        console.log("Fetching insights from:", `${API_URL}/products/insights`);
        const res = await fetch(`${API_URL}/products/insights`);
        if (!res.ok) {
            console.error("HTTP Error:", res.status, res.statusText);
            throw new Error(
                `Failed to fetch insights: ${res.status} ${res.statusText}`
            );
        }
        const json = await res.json();
        console.log("Insights response:", json);

        if (!json.data) {
            console.error("No data in response:", json);
            return;
        }

        const d = json.data;

        // Update main KPI values
        try {
            updateMainKPIs(d);
        } catch (e) {
            console.error("Error updating main KPIs:", e);
        }

        // Update currency breakdown
        try {
            updateCurrencyBreakdown(d.productsByCurrency || []);
        } catch (e) {
            console.error("Error updating currency breakdown:", e);
        }

        // Update 7-day activity chart
        try {
            updateActivityChart(d.last7Days || []);
        } catch (e) {
            console.error("Error updating activity chart:", e);
        }
    } catch (e) {
        console.error("Error fetching insights:", e);
        console.error("Error details:", e.message, e.stack);
    }
}

function updateMainKPIs(data) {
    const formatCurrency = (n) =>
        n != null ? `$${Number(n).toLocaleString()}` : "-";
    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return (
            date.toLocaleDateString() +
            " " +
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
    };

    const totalEl = document.getElementById("totalProductsValue");
    const avgEl = document.getElementById("averagePriceValue");
    const lastEl = document.getElementById("lastUpdateValue");

    if (totalEl)
        totalEl.textContent = Number(data.totalProducts || 0).toLocaleString();
    if (avgEl) avgEl.textContent = formatCurrency(data.averagePrice);
    if (lastEl) lastEl.textContent = formatDate(data.latestUpdatedAt);
}

function updateCurrencyBreakdown(currencies) {
    const container = document.getElementById("currencyBreakdown");
    if (!container) return;

    if (currencies.length === 0) {
        container.innerHTML =
            '<p class="text-muted text-center">No currency data available</p>';
        return;
    }

    const currencyHTML = currencies
        .map(
            (currency) => `
        <div class="currency-item">
            <div class="currency-info">
                <div class="currency-flag">${currency.currency}</div>
                <div class="currency-name">${currency.currency}</div>
            </div>
            <div class="currency-stats">
                <div class="currency-count">${currency.count}</div>
                <div class="currency-avg">Avg: $${Number(
                    currency.avgPrice
                ).toLocaleString()}</div>
            </div>
        </div>
    `
        )
        .join("");

    container.innerHTML = currencyHTML;
}

function updateActivityChart(activityData) {
    let container;
    try {
        container = document.getElementById("last7DaysChart");
        if (!container) {
            console.error(
                "Chart container not found! Looking for element with ID 'last7DaysChart'"
            );
            console.log(
                "Available elements with 'chart' in ID:",
                document.querySelectorAll('[id*="chart"]')
            );
            return;
        }
        console.log("Chart container found:", container);
    } catch (e) {
        console.error("Error finding chart container:", e);
        return;
    }

    console.log("Activity data received:", activityData);
    console.log(
        "Activity data type:",
        typeof activityData,
        "Length:",
        activityData?.length
    );
    console.log(
        "Activity data details:",
        JSON.stringify(activityData, null, 2)
    );

    // Use the data directly from backend instead of regenerating
    let last7Days = [];

    if (activityData && activityData.length > 0) {
        // Backend already provides the correct 7-day data structure
        last7Days = activityData.map((item) => ({
            date: item.date,
            dayName: new Date(item.date).toLocaleDateString("en", {
                weekday: "short",
            }),
            count: item.count,
        }));
    } else {
        // Fallback: generate empty data if no backend data
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            const dayName = date.toLocaleDateString("en", { weekday: "short" });
            last7Days.push({
                date: dateStr,
                dayName: dayName,
                count: 0,
            });
        }
    }

    console.log("Generated last 7 days:", last7Days);

    const maxCount = Math.max(...last7Days.map((d) => d.count), 1);
    const hasData = last7Days.some((day) => day.count > 0);

    console.log("Max count:", maxCount);
    console.log("Has data:", hasData);
    console.log(
        "Last7Days counts:",
        last7Days.map((d) => d.count)
    );

    if (!hasData) {
        console.log("No data path - showing empty chart");
        container.innerHTML = `
            <div class="activity-chart">
                ${last7Days
                    .map(
                        (day) => `
                    <div class="activity-bar activity-bar-empty" 
                         title="${day.dayName}: 0 products">
                    </div>
                `
                    )
                    .join("")}
            </div>
            <div class="activity-labels">
                ${last7Days
                    .map(
                        (day) => `
                    <div class="activity-day">${day.dayName}</div>
                `
                    )
                    .join("")}
            </div>
            <div class="text-center mt-2">
                <small class="text-muted">${translate("no-activity")}</small>
            </div>
        `;
        return;
    }

    console.log("Data path - showing chart with data");

    // Force visible heights for testing
    const chartHTML = `
        <div class="activity-chart">
            ${last7Days
                .map((day) => {
                    // Force minimum 20% height for all bars to make them visible
                    const height = Math.max((day.count / maxCount) * 100, 20);
                    console.log(
                        `Day ${day.dayName}: count=${day.count}, height=${height}%`
                    );
                    return `
                        <div class="activity-bar" style="height: ${height}%; background: linear-gradient(to top, #7b80ff, #ff6b6b); border: 1px solid white;" 
                             title="${day.dayName}: ${day.count} products">
                            <span style="color: white; font-size: 12px; font-weight: 500; position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%);">${day.count}</span>
                        </div>
                    `;
                })
                .join("")}
        </div>
        <div class="activity-labels">
            ${last7Days
                .map(
                    (day) => `
                <div class="activity-day">${day.dayName}</div>
            `
                )
                .join("")}
        </div>
    `;

    console.log("Setting chart HTML:", chartHTML);

    try {
        container.innerHTML = chartHTML;
        console.log("Chart HTML set successfully");

        // Verify the chart was rendered
        const bars = container.querySelectorAll(".activity-bar");
        console.log("Number of bars rendered:", bars.length);

        if (bars.length === 0) {
            console.error("No bars were rendered!");
        } else {
            console.log("Bars rendered successfully:", bars);
        }
    } catch (e) {
        console.error("Error setting chart HTML:", e);
        console.error("Error details:", e.message, e.stack);
    }
}

// Scroll animation observer
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    // Add animation class to elements after a short delay
    setTimeout(() => {
        const scrollElements = document.querySelectorAll(".animate-on-scroll");
        console.log("Found scroll animation elements:", scrollElements.length);

        scrollElements.forEach((el) => {
            // Add the animation class to make it hidden initially
            el.classList.add("animate-on-scroll");
            observer.observe(el);
        });
    }, 100);
}

// Initialize insights after DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded, initializing insights...");
    fetchInsights();
});

// Also try immediately in case DOM is already loaded
if (document.readyState === "loading") {
    console.log("DOM still loading, will initialize insights when ready");
} else {
    console.log("DOM already loaded, initializing insights now");
    fetchInsights();
}

// ===================== Event Listeners =====================
document.addEventListener("DOMContentLoaded", function () {
    // Initialize language first
    initializeLanguage();

    // Initialize scroll animations after DOM is loaded
    initScrollAnimations();

    // Add event delegation for table buttons
    document.addEventListener("click", function (e) {
        if (e.target.closest("button[data-action]")) {
            const button = e.target.closest("button[data-action]");
            const action = button.getAttribute("data-action");
            const row = button.closest("tr");

            console.log("Button clicked, action:", action);

            switch (action) {
                case "edit":
                    editProduct({ target: button });
                    break;
                case "delete":
                    deleteProduct({ target: button });
                    break;
                case "view":
                    seeProductDetails({ target: button });
                    break;
            }
        }
    });

    // Fallback: ensure loader disappears even if API is slow or fails
    setTimeout(() => hideInitialLoaderOnce(), 3500);
    // Add Product Button
    const addButton = document.getElementById("add");
    if (addButton) {
        addButton.addEventListener("click", function () {
            if (validateProductData()) {
                addProduct();
            }
        });
    }

    // Update Product Button
    const updateButton = document.getElementById("update");
    if (updateButton) {
        updateButton.addEventListener("click", function () {
            if (validateProductData()) {
                updateProduct();
            }
        });
    }

    // Search Toggle
    if (applySearchBtn) {
        applySearchBtn.addEventListener("click", () => {
            applyFilters();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            clearFilters();
        });
    }

    // Search Toggle Functionality
    if (searchToggle) {
        searchToggle.addEventListener("click", () => {
            const expanded =
                searchToggle.getAttribute("aria-expanded") === "true";
            searchToggle.setAttribute("aria-expanded", String(!expanded));
        });
    }

    // Real-time validation and blur validation
    formInputs.forEach((input) => {
        // Clear errors when user starts typing
        input.addEventListener("input", function () {
            const errorElementId = this.id + "Error";
            const errorElement = document.getElementById(errorElementId);
            if (errorElement) {
                errorElement.classList.add("d-none");
                this.classList.remove("is-invalid");
            }
        });

        // Validate on blur (when user leaves the field)
        input.addEventListener("blur", function () {
            validateSingleField(this.id);
        });
    });
});

// ===================== Render Table Data =====================
function renderTableData(data) {
    tableBody.innerHTML = "";
    const rows = document.createDocumentFragment();
    if (data.length === 0) {
        document.body.classList.remove("table-has-data");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="default-td-text" colspan="8" style="text-align: center;">${translate(
                "no-products"
            )}</td>
        `;
        rows.appendChild(tr);
    } else {
        document.body.classList.add("table-has-data");
        data.forEach((product) => {
            const tr = document.createElement("tr");
            tr.setAttribute("data-product-id", product.id);
            console.log(
                "Setting data-product-id:",
                product.id,
                typeof product.id
            );
            tr.innerHTML = `
                <td>${product.id}</td>
                <td>${truncateText(product.name, 28)}</td>
                <td>${product.price}</td>
                <td>${product.currency || "USD"}</td>
                <td>${truncateText(product.description, 40)}</td>
                <td>${formatDateAndTime(product.createdAt)}</td>
                <td>${formatDateAndTime(product.updatedAt)}</td>
                <td class="text-center">
                    <button class="btn see-product-details-btn me-1" data-action="view">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-primary me-1" data-action="edit">${translate(
                        "edit"
                    )}</button>
                    <button class="btn btn-danger" data-action="delete">${translate(
                        "delete"
                    )}</button>
                </td>
            `;
            rows.appendChild(tr);
        });
    }
    tableBody.appendChild(rows);
}

// ===================== Skeleton Loader Functions =====================
function showTableSkeleton() {
    console.log("Creating skeleton rows...");
    tableBody.innerHTML = "";
    const rows = document.createDocumentFragment();

    // Create 5 skeleton rows
    for (let i = 0; i < 5; i++) {
        const tr = document.createElement("tr");
        tr.className = "skeleton-row";
        tr.innerHTML = `
            <td><div class="skeleton skeleton-text-small"></div></td>
            <td><div class="skeleton skeleton-text-medium"></div></td>
            <td><div class="skeleton skeleton-text-small"></div></td>
            <td><div class="skeleton skeleton-text-small"></div></td>
            <td><div class="skeleton skeleton-text-large"></div></td>
            <td><div class="skeleton skeleton-text-medium"></div></td>
            <td><div class="skeleton skeleton-text-medium"></div></td>
            <td class="text-center">
                <div class="skeleton-button-group">
                    <div class="skeleton skeleton-button"></div>
                    <div class="skeleton skeleton-button"></div>
                    <div class="skeleton skeleton-button"></div>
                </div>
            </td>
        `;
        rows.appendChild(tr);
    }

    tableBody.appendChild(rows);
    document.body.classList.add("table-has-data");
    console.log("Skeleton rows added to table");
}

function hideTableSkeleton() {
    const skeletonRows = document.querySelectorAll(".skeleton-row");
    skeletonRows.forEach((row) => row.remove());
}

// Test function to manually show skeleton (for debugging)
window.testSkeleton = function () {
    console.log("Testing skeleton loader...");
    // Hide initial loader first
    const initialLoader = document.getElementById("initialLoader");
    if (initialLoader) {
        initialLoader.classList.add("hidden");
        document.body.classList.add("app-ready");
    }
    // Show skeleton
    showTableSkeleton();
    setTimeout(() => {
        console.log("Hiding skeleton after 3 seconds...");
        hideTableSkeleton();
    }, 3000);
};

// Test function to show skeleton immediately (bypasses all checks)
window.showSkeletonNow = function () {
    console.log("Showing skeleton immediately...");
    showTableSkeleton();
};

// ===================== CSV Export Functions =====================
function exportToCSV() {
    try {
        console.log("Starting CSV export...");

        if (!productsData || productsData.length === 0) {
            showPopup("warning", "No products to export");
            return;
        }

        // Prepare CSV headers
        const headers = [
            "ID",
            "Name",
            "Price",
            "Currency",
            "Description",
            "Created At",
            "Updated At",
        ];

        // Convert products data to CSV format
        const csvContent = [
            headers.join(","),
            ...productsData.map((product) =>
                [
                    product.id,
                    `"${(product.name || "").replace(/"/g, '""')}"`, // Escape quotes in name
                    product.price || "",
                    product.currency || "USD",
                    `"${(product.description || "").replace(/"/g, '""')}"`, // Escape quotes in description
                    `"${
                        product.createdAt
                            ? new Date(product.createdAt).toLocaleString()
                            : ""
                    }"`,
                    `"${
                        product.updatedAt
                            ? new Date(product.updatedAt).toLocaleString()
                            : ""
                    }"`,
                ].join(",")
            ),
        ].join("\n");

        // Create and download the file
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);

            // Generate filename with current date
            const now = new Date();
            const dateStr = now.toISOString().split("T")[0];
            const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");
            link.setAttribute("download", `products_${dateStr}_${timeStr}.csv`);

            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log("CSV export completed successfully");
            showPopup("success", translate("export-success"));
        } else {
            throw new Error("CSV download not supported");
        }
    } catch (error) {
        console.error("CSV export error:", error);
        showPopup("error", translate("export-error"));
    }
}

// Make export function globally available
window.exportToCSV = exportToCSV;

// ===================== Pagination Functions =====================
function renderPagination() {
    const paginationControls = document.getElementById("paginationControls");
    const paginationInfo = document.getElementById("paginationInfo");

    if (!paginationControls || !paginationInfo) return;

    const { page, limit, total, totalPages } = paginationData;

    // Update pagination info
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);
    paginationInfo.textContent = translate("pagination-info", {
        start: startItem,
        end: endItem,
        total: total,
    });

    // Clear existing pagination controls
    paginationControls.innerHTML = "";

    if (totalPages <= 1) return;

    // Previous button
    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${page === 1 ? "disabled" : ""}`;
    prevLi.innerHTML = `
        <button class="page-link" ${
            page === 1 ? "disabled" : ""
        } onclick="goToPage(${page - 1})">
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    `;
    paginationControls.appendChild(prevLi);

    // Helper to add a page button
    const addPage = (num, isActive) => {
        const li = document.createElement("li");
        li.className = `page-item ${isActive ? "active" : ""}`;
        li.innerHTML = `<button class="page-link" onclick="goToPage(${num})">${num}</button>`;
        paginationControls.appendChild(li);
    };
    const addDots = () => {
        const li = document.createElement("li");
        li.className = "page-item disabled";
        li.innerHTML = `<span class="page-link">...</span>`;
        paginationControls.appendChild(li);
    };

    // First page
    addPage(1, page === 1);

    // Left dots if gap between first and current
    if (page > 2) addDots();

    // Current page (only if not first or last)
    if (page !== 1 && page !== totalPages) addPage(page, true);

    // Right dots if gap between current and last
    if (page < totalPages - 1) addDots();

    // Last page (avoid duplicate when only one page)
    if (totalPages > 1) addPage(totalPages, page === totalPages);

    // Next button
    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${page === totalPages ? "disabled" : ""}`;
    nextLi.innerHTML = `
        <button class="page-link" ${
            page === totalPages ? "disabled" : ""
        } onclick="goToPage(${page + 1})">
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;
    paginationControls.appendChild(nextLi);
}

window.goToPage = function (pageNumber) {
    if (
        pageNumber < 1 ||
        pageNumber > paginationData.totalPages ||
        pageNumber === paginationData.page
    ) {
        return;
    }

    fetchProducts(pageNumber, paginationData.limit);
};

// ===================== Product CRUD Functions =====================
// Add Product
async function addProduct() {
    const addButton = document.getElementById("add");
    const originalButtonText = addButton.innerHTML;

    try {
        // Show loading state
        addButton.disabled = true;
        addButton.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Adding...
        `;

        const productData = {
            name: productName.value.trim(),
            price: parseFloat(productPrice.value),
            currency: productCurrency.value,
            description: productDesc.value.trim(),
        };

        console.log("submitted product data: ", productData);

        const response = await fetch(`${API_URL}/products/addNewProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        const data = await response.json();
        console.log("response data: ", data);

        if (response.ok) {
            console.log("Product added successfully:", data);
            showPopup("success", translate("product-added"));

            // Clear form
            productName.value = "";
            productPrice.value = "";
            productCurrency.value = "USD";
            productDesc.value = "";
            clearAllErrors();

            // Refresh table
            fetchProducts(paginationData.page, paginationData.limit);
        } else {
            console.error("Error adding product:", data.message);
            showPopup("error", data.message);
        }
    } catch (error) {
        console.error("Error adding product:", error);
        let errorMessage = "Something went wrong adding the product";

        if (
            error.message.includes("ECONNRESET") ||
            error.message.includes("Failed to fetch")
        ) {
            errorMessage =
                "Cannot connect to server. Please make sure the backend server is running on port 6060.";
        } else if (error.message) {
            errorMessage = error.message;
        }

        showPopup("error", errorMessage);
    } finally {
        // Restore button state
        addButton.disabled = false;
        addButton.innerHTML = originalButtonText;
    }
}

// Edit Product
window.editProduct = function (e) {
    console.log("editProduct function called!");

    const button = e.target;
    console.log("button: ", button);
    const productId = button.closest("tr").getAttribute("data-product-id");
    console.log("productId from HTML:", productId, typeof productId);
    console.log("productsData:", productsData);

    // Clear any existing editing states
    clearEditingStates();

    // Get the product data - convert productId to number for comparison
    const productData = productsData.find(
        (product) => product.id == productId // Use == instead of === for type coercion
    );

    console.log("Found productData:", productData);

    if (!productData) {
        showPopup("error", "Product not found");
        return;
    }

    // Update Buttons
    const addButton = document.getElementById("add");
    const resetButton = document.getElementById("reset");
    const updateButton = document.getElementById("update");
    const cancelButton = document.getElementById("cancel");
    addButton.classList.add("d-none");
    resetButton.classList.add("d-none");
    updateButton.classList.remove("d-none");
    cancelButton.classList.remove("d-none");

    // Mark the specific row as being edited
    const row = button.closest("tr");
    row.classList.add("row-is-editing");
    button.classList.add("btn-editing");

    // Store the product ID for update
    updateButton.setAttribute("data-product-id", productId);

    // Set the product data to the form
    productName.value = productData.name;
    productPrice.value = productData.price;
    productCurrency.value = productData.currency || "USD";
    productDesc.value = productData.description;

    // Clear any validation errors
    clearAllErrors();

    // Show success message
    showPopup("info", translate("editing-product", { name: productData.name }));
};

// Clear all editing states
function clearEditingStates() {
    // Remove editing classes from all rows and buttons
    const editingRows = document.querySelectorAll("tr.row-is-editing");
    const editingButtons = document.querySelectorAll(".btn-editing");

    editingRows.forEach((row) => row.classList.remove("row-is-editing"));
    editingButtons.forEach((btn) => btn.classList.remove("btn-editing"));

    // Reset buttons
    const addButton = document.getElementById("add");
    const resetButton = document.getElementById("reset");
    const updateButton = document.getElementById("update");
    const cancelButton = document.getElementById("cancel");
    addButton.classList.remove("d-none");
    resetButton.classList.remove("d-none");
    updateButton.classList.add("d-none");
    cancelButton.classList.add("d-none");
    updateButton.removeAttribute("data-product-id");
}

// Cancel edit function
window.cancelEdit = function () {
    // Clear form
    productName.value = "";
    productPrice.value = "";
    productCurrency.value = "USD";
    productDesc.value = "";
    clearAllErrors();
    clearEditingStates();
    showPopup("info", translate("edit-cancelled"));
};

// Search Functionality
async function applyFilters() {
    showPopup("info", translate("applying-filters"));

    // Collect Filters Parameters
    const name = document.getElementById("searchName").value.trim();
    const minPrice = document.getElementById("searchMinPrice").value;
    const maxPrice = document.getElementById("searchMaxPrice").value;
    const desc = document.getElementById("searchDesc").value.trim();

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (name) queryParams.append("name", name);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);
    if (desc) queryParams.append("desc", desc);

    try {
        // Show skeleton loader while searching
        showTableSkeleton();

        // Show loading state
        applySearchBtn.disabled = true;
        applySearchBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Applying filters...
        `;

        // Add pagination parameters to search
        queryParams.append("page", paginationData.page);
        queryParams.append("limit", paginationData.limit);

        // Make API Call with Filters
        const response = await fetch(
            `${API_URL}/products/searchProducts?${queryParams.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log("Filters response: ", data);

            // Update the products data and render
            productsData = data.data || [];
            paginationData = data.meta;
            renderTableData(productsData);
            renderPagination();

            showPopup(
                "success",
                translate("filters-applied", { count: paginationData.total })
            );
        } else {
            const errorData = await response.json();
            console.error("Error applying filters:", errorData.message);
            showPopup("error", errorData.message);
        }
    } catch (error) {
        console.error("Error applying filters:", error);
        showPopup("error", "Something went wrong applying the filters");
    } finally {
        applySearchBtn.disabled = false;
        applySearchBtn.innerHTML = "Apply";
    }
}

// Clear Filters
function clearFilters() {
    showPopup("info", translate("filters-cleared"));

    // Clear all search input fields
    const searchInputs = [
        "searchName",
        "searchMinPrice",
        "searchMaxPrice",
        "searchDesc",
    ];

    searchInputs.forEach((inputId) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.value = "";
        }
    });

    // Show skeleton loader while clearing filters
    showTableSkeleton();

    // Reset to show all products
    fetchProducts(1, paginationData.limit);
}

// Delete Product
window.deleteProduct = function (e) {
    const button = e.target;
    const productId = button.closest("tr").getAttribute("data-product-id");
    console.log("Delete productId:", productId, typeof productId);

    const productData = productsData.find((product) => product.id == productId);
    console.log("Delete productData:", productData);

    if (!productData) {
        showPopup("error", "Product not found");
        return;
    }

    // Show custom confirmation modal
    showDeleteModal(productData, productId, button);
};

async function performDelete(productId, button) {
    const originalButtonText = button.innerHTML;

    try {
        // Show loading state
        button.disabled = true;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Deleting...
        `;

        const response = await fetch(
            `${API_URL}/products/deleteProduct/${productId}`,
            {
                method: "DELETE",
            }
        );

        const data = await response.json();
        console.log("Delete response: ", data);

        if (response.ok) {
            console.log("Product deleted successfully:", data);
            showPopup("success", "Product deleted successfully");

            // Clear editing states if this product was being edited
            clearEditingStates();

            // Refresh table
            fetchProducts(paginationData.page, paginationData.limit);
        } else {
            console.error("Error deleting product:", data.message);
            showPopup("error", data.message || "Failed to delete product");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        showPopup("error", "Something went wrong deleting the product");
    } finally {
        // Restore button state
        button.disabled = false;
        button.innerHTML = originalButtonText;
    }
}

// Update Product
async function updateProduct() {
    const updateButton = document.getElementById("update");
    const originalButtonText = updateButton.innerHTML;
    const productId = updateButton.getAttribute("data-product-id");

    if (!productId) {
        showPopup("error", "No product selected for editing");
        return;
    }

    // Validate form data
    if (!validateProductData()) {
        return;
    }

    try {
        // Show loading state
        updateButton.disabled = true;
        updateButton.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Updating...
        `;

        const productData = {
            name: productName.value.trim(),
            price: parseFloat(productPrice.value),
            currency: productCurrency.value,
            description: productDesc.value.trim(),
        };

        console.log("Updating product data: ", productData);

        const response = await fetch(
            `${API_URL}/products/updateProduct/${productId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            }
        );

        const data = await response.json();
        console.log("Update response: ", data);

        if (response.ok) {
            console.log("Product updated successfully:", data);
            showPopup("success", "Product updated successfully");

            // Clear form and editing states
            productName.value = "";
            productPrice.value = "";
            productCurrency.value = "USD";
            productDesc.value = "";
            clearAllErrors();
            clearEditingStates();

            // Refresh table
            fetchProducts(paginationData.page, paginationData.limit);
        } else {
            console.error("Error updating product:", data.message);
            showPopup("error", data.message || "Failed to update product");
        }
    } catch (error) {
        console.error("Error updating product:", error);
        showPopup("error", "Something went wrong updating the product");
    } finally {
        // Restore button state
        updateButton.disabled = false;
        updateButton.innerHTML = originalButtonText;
    }
}

// Show Product Details
window.seeProductDetails = function (e) {
    const button = e.target;
    const productId = button.closest("tr").getAttribute("data-product-id");
    const productData = productsData.find((product) => product.id == productId);
    console.log("See product details for productData:", productData);

    if (!productData) {
        showPopup("error", "Product not found");
        return;
    }

    showProductDetails(productData);
};

// ===================== Validation Functions =====================
// Validate Single Field (for blur validation)
function validateSingleField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    const errorElementId = fieldId + "Error";
    const errorElement = document.getElementById(errorElementId);

    // Clear previous error styling
    field.classList.remove("is-invalid");
    if (errorElement) {
        errorElement.classList.add("d-none");
    }

    // Validate based on field type
    switch (fieldId) {
        case "productName":
            if (value.length > 0 && value.length < 2) {
                showError(errorElementId, "Name must be at least 2 characters");
                return false;
            } else if (value.length > 255) {
                showError(
                    errorElementId,
                    "Name must be less than 255 characters"
                );
                return false;
            }
            break;

        case "productPrice":
            if (value.length > 0) {
                const priceValue = parseFloat(value);
                if (isNaN(priceValue)) {
                    showError(errorElementId, "Please enter a valid number");
                    return false;
                } else if (priceValue <= 0) {
                    showError(
                        errorElementId,
                        "Price must be greater than zero"
                    );
                    return false;
                } else if (priceValue > 999999.99) {
                    showError(
                        errorElementId,
                        "Price cannot exceed $999,999.99"
                    );
                    return false;
                }
            }
            break;

        case "productDesc":
            if (value.length > 0 && value.length < 10) {
                showError(
                    errorElementId,
                    "Description must be at least 10 characters"
                );
                return false;
            } else if (value.length > 2000) {
                showError(
                    errorElementId,
                    "Description must be less than 2000 characters"
                );
                return false;
            }
            break;
    }

    return true;
}

// Validate Product Data (Complete form validation)
function validateProductData() {
    const name = productName.value.trim();
    const price = productPrice.value.trim();
    const description = productDesc.value.trim();

    let isValid = true;

    // Clear all previous errors
    clearAllErrors();

    // Validate Product Name
    if (!name) {
        showError("productNameError", translate("name-required"));
        isValid = false;
    } else if (name.length < 2) {
        showError("productNameError", translate("name-min-length"));
        isValid = false;
    } else if (name.length > 255) {
        showError("productNameError", translate("name-max-length"));
        isValid = false;
    }

    // Validate Product Price
    if (!price) {
        showError("productPriceError", translate("price-required"));
        isValid = false;
    } else {
        const priceValue = parseFloat(price);
        if (isNaN(priceValue)) {
            showError("productPriceError", translate("price-valid"));
            isValid = false;
        } else if (priceValue <= 0) {
            showError("productPriceError", translate("price-positive"));
            isValid = false;
        } else if (priceValue > 999999.99) {
            showError("productPriceError", translate("price-max"));
            isValid = false;
        }
    }

    // Validate Product Description
    if (!description) {
        showError("productDescError", translate("description-required"));
        isValid = false;
    } else if (description.length < 10) {
        showError("productDescError", translate("description-min-length"));
        isValid = false;
    } else if (description.length > 2000) {
        showError("productDescError", translate("description-max-length"));
        isValid = false;
    }

    return isValid;
}

// Show Error
function showError(errorElementId, message) {
    const errorElement = document.getElementById(errorElementId);
    const errorText = errorElement.querySelector(".error-message-text");

    errorText.textContent = message;
    errorElement.classList.remove("d-none");

    // Add error styling to the input field
    const inputId = errorElementId.replace("Error", "");
    const inputElement = document.getElementById(inputId);
    inputElement.classList.add("is-invalid");
}

// Clear All Errors
function clearAllErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((error) => {
        error.classList.add("d-none");
    });

    // Remove error styling from all input fields
    const inputElements = document.querySelectorAll(".form-control");
    inputElements.forEach((input) => {
        input.classList.remove("is-invalid");
    });
}

// ===================== Helper Functions =====================
// Format Date and Time
function formatDateAndTime(date) {
    return new Date(date).toLocaleString();
}

// Truncate Text
function truncateText(text, maxLength) {
    return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
}

// ===================== Product Details Modal Functions =====================
function showProductDetails(productData) {
    const modal = document.getElementById("productDetailsModal");
    const closeBtn = document.getElementById("closeDetailsModal");
    const closeDetailsBtn = document.getElementById("closeDetailsBtn");
    const editBtn = document.getElementById("editFromDetails");

    // Update modal title
    document.querySelector(".modal-title").textContent =
        translate("product-details");

    // Update modal labels
    const labels = document.querySelectorAll(".detail-label");
    const labelKeys = [
        "product-name",
        "price",
        "currency",
        "description",
        "created-at",
        "last-updated",
    ];
    labels.forEach((label, index) => {
        if (labelKeys[index]) {
            label.textContent = translate(labelKeys[index]);
        }
    });

    // Populate modal with product data
    document.getElementById("detailProductName").textContent =
        productData.name || "-";
    document.getElementById("detailProductPrice").textContent =
        productData.price ? `$${productData.price}` : "-";
    document.getElementById("detailProductCurrency").textContent =
        productData.currency || "USD";
    document.getElementById("detailProductDescription").textContent =
        productData.description || "-";
    document.getElementById("detailProductCreatedAt").textContent =
        productData.createdAt ? formatDateAndTime(productData.createdAt) : "-";
    document.getElementById("detailProductUpdatedAt").textContent =
        productData.updatedAt ? formatDateAndTime(productData.updatedAt) : "-";

    // Show modal with animation
    modal.classList.remove("d-none");
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    // Store product data for edit functionality
    editBtn.setAttribute("data-product-id", productData.id);

    // Event listeners
    const handleClose = () => hideProductDetailsModal();
    const handleEdit = () => {
        hideProductDetailsModal();
        // Find the edit button in the table and trigger edit
        const editButton = document.querySelector(
            `tr[data-product-id="${productData.id}"] button[data-action="edit"]`
        );
        if (editButton) {
            editButton.click();
        }
    };

    // Remove existing listeners to prevent duplicates
    closeBtn.removeEventListener("click", handleClose);
    closeDetailsBtn.removeEventListener("click", handleClose);
    editBtn.removeEventListener("click", handleEdit);

    // Add new listeners
    closeBtn.addEventListener("click", handleClose);
    closeDetailsBtn.addEventListener("click", handleClose);
    editBtn.addEventListener("click", handleEdit);

    // Close modal when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === modal) {
            hideProductDetailsModal();
        }
    };
    modal.removeEventListener("click", handleOverlayClick);
    modal.addEventListener("click", handleOverlayClick);

    // Close modal with Escape key
    const handleEscape = (e) => {
        if (e.key === "Escape") {
            hideProductDetailsModal();
        }
    };
    document.removeEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleEscape);
}

function hideProductDetailsModal() {
    const modal = document.getElementById("productDetailsModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.classList.add("d-none");
    }, 300);
}

// ===================== Delete Modal Functions =====================
function showDeleteModal(productData, productId, button) {
    const modal = document.getElementById("deleteModal");
    const productNameElement = document.getElementById("deleteProductName");
    const cancelBtn = document.getElementById("cancelDelete");
    const confirmBtn = document.getElementById("confirmDelete");

    // Update modal title and text
    document.querySelector("#deleteModal .modal-title").textContent =
        translate("delete-product");
    document.querySelector(
        "#deleteModal .modal-message"
    ).innerHTML = `${translate(
        "delete-confirmation"
    )} <strong id="deleteProductName">"${productData.name}"</strong>?`;
    document.querySelector(
        "#deleteModal .modal-warning"
    ).innerHTML = `<i class="fa-solid fa-exclamation-circle"></i> ${translate(
        "delete-warning"
    )}`;

    // Update button texts
    cancelBtn.innerHTML = `<i class="fa-solid fa-xmark me-2"></i> ${translate(
        "cancel"
    )}`;
    confirmBtn.innerHTML = `<i class="fa-solid fa-trash me-2"></i> ${translate(
        "delete-product"
    )}`;

    // Show modal with animation
    modal.classList.remove("d-none");
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);

    // Store data for later use
    confirmBtn.setAttribute("data-product-id", productId);
    confirmBtn.setAttribute("data-button-element", "true");

    // Event listeners
    const handleCancel = () => hideDeleteModal();
    const handleConfirm = () => {
        hideDeleteModal();
        performDelete(productId, button);
    };

    // Remove existing listeners to prevent duplicates
    cancelBtn.removeEventListener("click", handleCancel);
    confirmBtn.removeEventListener("click", handleConfirm);

    // Add new listeners
    cancelBtn.addEventListener("click", handleCancel);
    confirmBtn.addEventListener("click", handleConfirm);

    // Close modal when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === modal) {
            hideDeleteModal();
        }
    };
    modal.removeEventListener("click", handleOverlayClick);
    modal.addEventListener("click", handleOverlayClick);

    // Close modal with Escape key
    const handleEscape = (e) => {
        if (e.key === "Escape") {
            hideDeleteModal();
        }
    };
    document.removeEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleEscape);
}

function hideDeleteModal() {
    const modal = document.getElementById("deleteModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.classList.add("d-none");
    }, 300);
}

// ===================== Popup Functions =====================
function showPopup(type, message) {
    // Remove existing popup if any
    const existingPopup = document.getElementById("customPopup");
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup element
    const popup = document.createElement("div");
    popup.id = "customPopup";
    popup.className = `popup popup-${type}`;

    // Set popup content based on type
    let iconClass, bgColor, textColor;
    switch (type) {
        case "success":
            iconClass = "fa-check-circle";
            bgColor = "#28a745";
            textColor = "#fff";
            break;
        case "error":
            iconClass = "fa-exclamation-circle";
            bgColor = "#dc3545";
            textColor = "#fff";
            break;
        case "warning":
            iconClass = "fa-exclamation-triangle";
            bgColor = "#ffc107";
            textColor = "#000";
            break;
        case "info":
            iconClass = "fa-info-circle";
            bgColor = "#17a2b8";
            textColor = "#fff";
            break;
        default:
            iconClass = "fa-info-circle";
            bgColor = "#6c757d";
            textColor = "#fff";
    }

    popup.innerHTML = `
        <div class="popup-content">
            <i class="fas ${iconClass} popup-icon"></i>
            <span class="popup-message">${message}</span>
            <button class="popup-close" onclick="hidePopup()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles
    popup.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

    // Add to page
    document.body.appendChild(popup);

    // Animate in
    setTimeout(() => {
        popup.style.opacity = "1";
        popup.style.transform = "translateX(0)";
    }, 10);

    // Auto hide after 5 seconds
    setTimeout(() => {
        hidePopup();
    }, 5000);
}

function hidePopup() {
    const popup = document.getElementById("customPopup");
    if (popup) {
        popup.style.opacity = "0";
        popup.style.transform = "translateX(100%)";
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}
