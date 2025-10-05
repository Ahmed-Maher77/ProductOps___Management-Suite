## ProductOps - Management Suite

A comprehensive product management platform for end‑to‑end operations. ProductOps delivers enterprise‑grade CRUD with validation, advanced search and server‑side pagination, and CSV exports. The UI is multilingual (EN/AR with RTL) and accessibility‑first, and a real‑time insights dashboard surfaces KPIs (totals, average price, currency breakdown, recent activity) on a modern, responsive stack powered by Node.js/Express.

---

### 🌐 Live Preview

-   👀 Watch Live Demo: [https://ahmed-maher77.github.io/ProductOps\_\_\_Management-Suite/](https://ahmed-maher77.github.io/ProductOps___Management-Suite/)
-   🖲️ Backend API: [https://product-ops-management-suite.vercel.app](https://product-ops-management-suite.vercel.app)

---

### 🎥 Demo Video

**Watch the Demo on LinkedIn:** <a href="" target="_blank">**coming soon**</a>

---

### 💻 Used Technologies

-   **HTML5/CSS3:** UI structure and responsive styling
-   **JavaScript (ES6+):** Client logic, translations, accessibility
-   **Bootstrap Utilities:** Layout and spacing helpers
-   **Font Awesome:** Icons
-   **Node.js + Express:** REST API for product operations
-   **Hosting:**
    -   Backend → Vercel (serverless-friendly, easy deploys)
    -   Frontend → GitHub Pages (fast static hosting)

---

### ✨ Key Features

-   Product CRUD with validation
-   Search & Filters (name, price range, description)
-   Pagination with info text
-   Product details modal + edit handoff
-   Delete confirmation modal with warning
-   CSV export of products
-   Internationalization (English/Arabic) with RTL layout
-   Language switcher (accessible; ARIA + keyboard)
-   Skeleton loaders for table while fetching
-   Admin insights (totals, average price, currency breakdown, last 7 days)
-   Accessibility improvements (skip link, landmarks, aria-live)
-   Responsive design and consistent theming

---

### 📸 Website Preview (UI Mockup)

<a href="https://ahmed-maher77.github.io/ProductOps___Management-Suite/" target="_blank" title="demo">
  <img src="https://github.com/user-attachments/assets/ae806e43-f848-40d2-b47d-6bfb11571a14" alt="website preview - UI Mockup" width="400">
</a>

---

### 📥 Installation Instructions (Local Setup)

1. Clone repo:
    ```bash
    git clone https://github.com/Ahmed-Maher77/ProductOps___Management-Suite.git
    cd ProductOps___Management-Suite
    ```
2. Backend:
    ```bash
    # Install dependencies
    cd Backend-server
    npm install
    # Configure environment varaibles
    PORT=3001
    DATABASE_NAME="name_of_your_database"
    DATABASE_URL= "url_of_your_database"
    DATABASE_PASSWORD= "password_of_your_database"
    DATABASE_USER= "username_of_your_database"
    # Start server
    npm run dev
    ```
3. Frontend:
    ```bash
    cd ../Frontend-client
    # Serve statically (e.g., VS Code Live Server or simple HTTP server)
    # Example:
    npx serve -p 5500
    # Open http://localhost:5500
    ```

---

### 📁 Project Structure

```
ProductOps/
├─ Backend-server/
│  ├─ controllers/
│  ├─ routes/
│  ├─ utils/
│  ├─ index.js
│  └─ package.json
├─ Frontend-client/
│  ├─ index.html
│  ├─ js/
│  │  └─ main.js
│  ├─ styles/
│  │  └─ style.css
│  └─ images/ (favicons)
└─ README.md
```

---

### 🗄️ Database Structure (Products)

-   id: number (unique)
-   name: string (255 chars max)
-   price: number
-   currency: string (e.g., USD, EGP)
-   description: string
-   createdAt: ISO date
-   updatedAt: ISO date

---

### 🔌 API Docs (REST)

Base URL: `https://product-ops-management-suite.vercel.app/api`

-   GET /products?page=1&limit=10&name=&minPrice=&maxPrice=&desc=
    -   List products with pagination and filters
-   GET /products/:id
    -   Get product by ID
-   POST /products
    -   Create product (body: { name, price, currency, description })
-   PUT /products/:id
    -   Update product
-   DELETE /products/:id
    -   Delete product

Response shape (list) — example for endpoint: GET /products:

```json
{
    "data": [
        {
            "id": 1,
            "name": "…",
            "price": 100,
            "currency": "USD",
            "description": "…",
            "createdAt": "…",
            "updatedAt": "…"
        }
    ],
    "meta": { "page": 1, "limit": 10, "total": 42, "totalPages": 5 }
}
```

---

## 📬 Contact & Contribution

-   🧑‍💻 **Portfolio:** <a href="https://ahmedmaher-portfolio.vercel.app/" title="See My Portfolio">https://ahmedmaher-portfolio.vercel.app/</a>
-   🔗 **LinkedIn:** <a href="https://www.linkedin.com/in/ahmed-maher-algohary" title="Contact via LinkedIn">https://www.linkedin.com/in/ahmed-maher-algohary</a>
-   📧 **Email:** <a href="mailto:ahmedmaher.dev1@gmail.com" title="Contact via Email">ahmedmaher.dev1@gmail.com</a>

> Contributions, suggestions, and bug reports are welcome. Feel free to open issues or pull requests.

---

## ⭐ Support

If you found this project helpful or inspiring, please consider giving it a ⭐. Your support helps me grow and share more open-source projects like this!
