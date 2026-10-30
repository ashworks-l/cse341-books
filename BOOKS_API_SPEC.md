# Books API Specification

## Purpose

The purpose of this project is to create a read-only REST API that allows users to retrieve information about books stored in a MongoDB database.

## Technology

- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver

## Database

- Database name: `cse341-books-db`
- Collection name: `books`

## Data Model

Each book must contain the following fields:

| Field | Type | Description |
|---|---|---|
| id | String | Unique identifier for the book |
| author | String | Name of the book's author |
| title | String | Title of the book |
| publicationDate | String | Publication date in ISO 8601 format (YYYY-MM-DD) |

All fields are required.

### Example Book

```json
{
  "id": "b1",
  "author": "J.R.R. Tolkien",
  "title": "The Hobbit",
  "publicationDate": "1937-09-21"
}
```

## API Endpoints

### 1. Retrieve All Books

**Method:** GET

**Endpoint:** `/books`

**Success Response:**
- Status: `200 OK`
- Content-Type: `application/json`
- Returns an array containing all books.

Example:

```json
[
  {
    "id": "b1",
    "author": "J.R.R. Tolkien",
    "title": "The Hobbit",
    "publicationDate": "1937-09-21"
  },
  {
    "id": "b2",
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "publicationDate": "1813-01-28"
  }
]
```

**Error Response:**
- Status: `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

### 2. Retrieve One Book by ID

**Method:** GET

**Endpoint:** `/books/:id`

**Success Response:**
- Status: `200 OK`
- Returns the book matching the requested ID.

Example: `/books/b1`

```json
{
  "id": "b1",
  "author": "J.R.R. Tolkien",
  "title": "The Hobbit",
  "publicationDate": "1937-09-21"
}
```

**Not Found Response:**
- Status: `404 Not Found`

```json
{
  "message": "Book not found"
}
```

**Server Error Response:**
- Status: `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

## Security and Error Handling

- Database credentials must be stored in environment variables.
- The `.env` file must not be committed to GitHub.
- Internal database errors and stack traces must not be exposed to API users.
- The API must return clear and consistent JSON error messages.

## Performance and Scope

- The API will retrieve books directly from the MongoDB collection.
- The API is read-only.
- Creating, updating, and deleting books are outside the scope of this version.
- Authentication and authorization are also outside the scope of this assignment.

## Version 1 Evaluation

### 1. What are the shortcomings of Version 1?

Version 1 provides a basic description of the API, but it does not explain all the requirements in enough detail. It does not define the exact database name, collection name, or the expected format of the publication date. It also does not include example JSON responses.

### 2. What security concerns are missing?

Version 1 does not explain how database credentials should be protected. It should specify that environment variables must be used and that the `.env` file must not be uploaded to GitHub. It should also explain that internal errors and stack traces must not be exposed to users.

### 3. What performance considerations are missing?

Version 1 does not discuss how the API retrieves data from MongoDB or how errors should be handled if the database is unavailable. It also does not define consistent response formats.

### 4. What is unclear about the endpoints and errors?

Version 1 does not provide example JSON responses. It mentions a 404 response for a missing book but does not define its error message. It also does not explain what should happen if a server or database error occurs.

## Why Version 2 Is Better

Version 2 improves the specification because it defines the database and collection names, describes every required book field, and provides example JSON responses. It also defines success and error status codes, including 404 and 500 responses. Finally, it includes security requirements for protecting database credentials and internal error information.