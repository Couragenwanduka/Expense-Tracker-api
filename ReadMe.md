# Expenses API Documentation

The **Expenses API** is a backend system designed for managing users, categories, and expenses in a structured and efficient manner. Built using a monolithic architecture, this API serves as a single cohesive application ideal for small-to-medium scale use cases. It utilizes MongoDB for data storage due to its flexibility and scalability. The system is built with **Node.js**, **Express**, and **TypeScript**, ensuring type safety and fast development. 

---

## **App Description**

The Expenses API allows users to:
- **Manage Accounts**: Signup, login, and securely store user information.
- **Track Expenses**: Create, update, delete, and filter expenses.
- **Organize Categories**: Define categories for expenses, such as "Health & Fitness" or "Utilities."
- **Authenticate Requests**: Protect endpoints with secure token-based authentication (JWT).

### **Key Features**:
1. **CRUD Operations**:
   - Perform Create, Read, Update, and Delete operations on users, categories, and expenses.
2. **Pagination and Filtering**:
   - Supports pagination for large datasets (categories and expenses).
   - Filter expenses by date range.
3. **Security**:
   - All endpoints require authentication with Bearer tokens.
4. **Data Validation**:
   - Ensures all incoming requests meet the required schema using validation middleware.

---

## **Architecture Overview**

The API follows a **monolithic architecture**, meaning it consists of a single deployable unit that handles all application concerns. 

### **Why Monolithic?**
- **Simplicity**: Ideal for small-scale applications with limited features.
- **Easy Development**: All components reside in a single codebase, simplifying debugging and deployment.
- **Performance**: Reduces the overhead of managing inter-service communication compared to microservices.

### **Tech Stack**
- **Backend Framework**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Language**: TypeScript
- **Validation**: Joi for schema validation

### **Data Storage**
The database schema is designed to follow normalization principles (1NF to 3NF), ensuring:
- Data consistency.
- Reduced redundancy.
- Efficient querying.

---

## **Setup**

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Server**:
   ```bash
   npm run dev
   ```

3. **Environment Variables**:
   Configure the following in your `.env` file:
   ```env
   PORT=9000
   MONGODB_URI=<Your MongoDB Connection String>
   JWT_SECRET=<Your JWT Secret>
   ```

4. **Base URL**:
   The API runs locally at `http://localhost:9000`.

---

## **Endpoints**

### **1. User Signup**
**Endpoint**: `POST /user`  
**Description**: Create a new user.  
**Request Body**:
```json
{
  "firstName": "Courage",
  "lastName": "Nduka",
  "email": "courageobunike62@gmail.com",
  "password": "P@ssw0rd123",
  "country": "Nigeria",
  "age": 28,
  "gender": "Male",
  "dateofbirth": "1996-03-15",
  "yearlyIncome": 75000
}
```

---

### **2. User Login**
**Endpoint**: `POST /user/login`  
**Description**: Log in an existing user.  
**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "P@ssw0rd123"
}
```

---

### **3. Create Category**
**Endpoint**: `POST /category`  
**Description**: Create a new category.  
**Authorization**: Bearer token required.  
**Request Body**:
```json
{
  "name": "Health & Fitness",
  "description": "Expenses for gym memberships, health supplements, and medical bills.",
  "isDefault": true
}
```

---

### **4. Get All Categories**
**Endpoint**: `GET /category`  
**Description**: Retrieve all categories with pagination.  
**Authorization**: Bearer token required.  
**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 20)

---

### **5. Update Category**
**Endpoint**: `PATCH /category/update/:id`  
**Description**: Update an existing category.  
**Authorization**: Bearer token required.  
**Request Body**:
```json
{
  "name": "Eating Out",
  "isDefault": true
}
```

---

### **6. Delete Category**
**Endpoint**: `DELETE /category/:id`  
**Description**: Delete a category by ID.  
**Authorization**: Bearer token required.  

---

### **7. Create Expense**
**Endpoint**: `POST /expense`  
**Description**: Create a new expense.  
**Authorization**: Bearer token required.  
**Request Body**:
```json
{
  "category": "6745dbcade3d65ac6115a4f9",
  "name": "Light Bill",
  "totalUnit": 1,
  "price": 999.99,
  "date": "2024-11-25T14:32:48Z"
}
```

---

### **8. Get All Expenses**
**Endpoint**: `GET /expense`  
**Description**: Retrieve all expenses.  
**Authorization**: Bearer token required.

---

### **9. Update Expense**
**Endpoint**: `PATCH /expense/update/:id`  
**Description**: Update an existing expense.  
**Authorization**: Bearer token required.  
**Request Body**:
```json
{
  "category": "6745dbcade3d65ac6115a4f9",
  "name": "Water Bill",
  "totalUnit": 1,
  "price": 999.99,
  "date": "2024-11-25T14:32:48Z"
}
```

---

### **10. Delete Expense**
**Endpoint**: `DELETE /expense/:id`  
**Description**: Delete an expense by ID.  
**Authorization**: Bearer token required.  

---

### **11. Filter Expenses**
**Endpoint**: `GET /expense/filter`  
**Description**: Filter expenses by date range.  
**Authorization**: Bearer token required.  
**Query Parameters**:
- `startDate`: Start date (e.g., `2024-11-01`)
- `endDate`: End date (e.g., `2024-11-30`)

---

## **Authentication**
Most endpoints require a Bearer token. Include the token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

---

## **Testing**
Use an API client (e.g., Thunder Client or Postman) to test endpoints. Ensure the server is running locally (`http://localhost:9000`) and provide valid headers and body for each request.

---

## **Error Responses**
- **401 Unauthorized**: When the token is missing or invalid.
- **400 Bad Request**: When required fields are missing or invalid.
- **404 Not Found**: When the requested resource is not found.

---
