# Product & Category Management System

Node.js + Angular + MySQL based CRUD application developed as part of **Node JS Machine Test**.

## Tech Stack
- Frontend: Angular
- Backend: Node.js, Express
- Database: MySQL (RDBMS)

## Features

### Category Master
- Add Category
- Edit Category
- Delete Category
- List Categories

### Product Master
- Add Product
- Edit Product
- Delete Product
- Product belongs to a Category
- Displays:
  - ProductId
  - ProductName
  - CategoryId
  - CategoryName


## Server-Side Pagination
Pagination is implemented **on the server side using SQL**.

### Logic

### API ENDPOINTS
GET /api/categories

POST /api/categories

PUT /api/categories/:id

DELETE /api/categories/:id

### Products
GET /api/products?page=1&pageSize=10

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

### LIVE DEPLOYMENT

Frontend (Angular): https://product-task-mu.vercel.app

Backend (Node.js): https://product-task-y1sl.onrender.com


### AUTHOR

SHARIQUE BAIG
