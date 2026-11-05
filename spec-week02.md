# Books API Week 02 Specification

# Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

### Goal
Create an authors collection and provide all CRUD operations for authors. Every author route must be documented and testable in Swagger.

### Data Model
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: number, required, integer

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by their custom id.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Jane Austen",
      "birthYear": 1775
    }

Success:
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing or invalid
- `400` if the author id already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author.

Request body:

    {
      "name": "Jane Austen Updated",
      "birthYear": 1776
    }

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing or invalid
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no author exists with that id
- `409` if the author still has books associated with them
- `500` if an unexpected server or database error occurs

### Relationship to Books
Before deleting an author, the API must check whether any books reference that author through `authorId`.

If books still reference the author, the API must reject the deletion with `409 Conflict`. The books must not be deleted automatically.

### Swagger Documentation
Swagger must document every author route, including request bodies, successful responses, and possible errors.

### Deployment Expectations
After implementation, all author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

---

# Evaluation of Version 1

## 1. Bugs or Short-Sighted Decisions
- Using `400` for duplicate IDs is not as clear as using `409 Conflict`.
- The API should validate that birthYear is an integer and that name is not empty.
- The API should validate that publicationDate has a valid date format.
- PUT should require all editable fields so the update behavior is predictable.
- The API should prevent deleting authors who still have books.

## 2. Security Considerations
- Validate all request body fields on the server.
- Do not allow clients to modify MongoDB internal `_id` values.
- Do not pass request bodies directly into MongoDB update operations.
- Do not expose database credentials or internal error details in API responses.
- Use safe and consistent error messages.

## 3. Efficiency Concerns
- Create indexes for custom `id` fields in both collections.
- Create an index for `authorId` in the books collection to make relationship checks faster.
- For a larger collection, pagination should be considered for GET all routes.
- Check the author reference before inserting or updating a book.

## 4. Unclear Response Examples or Error Behaviors
- Error responses should use a consistent JSON structure.
- A duplicate ID should return `409 Conflict`.
- A missing resource should return `404 Not Found`.
- A request with missing or invalid fields should return `400 Bad Request`.
- A failed attempt to delete an author with associated books should return `409 Conflict`.

---

# Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the Week 01 Books API to support creating, reading, updating, and deleting books. Each book must reference an existing author through `authorId`. All routes must be documented and testable using Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required fields:
- `id`: string, required, unique custom identifier such as `b1`
- `authorId`: string, required, references an existing author's custom `id`
- `title`: string, required, non-empty
- `publicationDate`: string, required, valid date in `YYYY-MM-DD` format

MongoDB `_id` will remain internal and will not be used as the public route identifier.

### Relationship to Authors
- Every book must reference an existing author using `authorId`.
- The API must verify the author exists before creating or updating a book.
- If the author does not exist, return `400 Bad Request`.
- The API must not automatically delete books when an author is deleted.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- `200 OK`
- Response body: an array of book objects.

Errors:
- `500 Internal Server Error` if an unexpected server or database error occurs.

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- `200 OK`
- Response body: the matching book object.

Errors:
- `404 Not Found` if the book does not exist.
- `500 Internal Server Error` if an unexpected server or database error occurs.

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- `201 Created`
- Response body: the newly created book object.

Errors:
- `400 Bad Request` if a required field is missing or invalid, or if the author does not exist.
- `409 Conflict` if the custom book id already exists.
- `500 Internal Server Error` if an unexpected server or database error occurs.

#### PUT /books/:id
Purpose: Replace the editable information of an existing book identified by its custom id. All editable fields are required.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- `200 OK`
- Response body: the updated book object.

Errors:
- `400 Bad Request` if a required field is missing or invalid, or if the author does not exist.
- `404 Not Found` if the book does not exist.
- `500 Internal Server Error` if an unexpected server or database error occurs.

#### DELETE /books/:id
Purpose: Delete an existing book by its custom id.

Success:
- `204 No Content`
- No response body.

Errors:
- `404 Not Found` if the book does not exist.
- `500 Internal Server Error` if an unexpected server or database error occurs.

### Validation and Security
- Validate all incoming data on the server.
- Only update the allowed book fields: `authorId`, `title`, and `publicationDate`.
- Do not accept MongoDB operators or client-provided `_id` values.
- Do not expose database credentials or internal error details.
- Use a unique index on `id` and an index on `authorId`.

### Swagger Documentation
Swagger must document all five book routes. Each route must include its purpose, parameters, request body when applicable, success response, and possible error responses. The documented response codes must match the actual API behavior.

### Deployment Expectations
All book routes must work locally and on Render. The deployed `/api-docs` page must allow users to test every book route.

---

## Feature 2: Author CRUD Operations

### Goal
Create an authors collection and provide all CRUD operations for authors. Books will reference authors through their custom ids. All author routes must be documented and testable using Swagger.

### Data Model
Author documents will be stored in the `authors` collection.

Required fields:
- `id`: string, required, unique custom identifier such as `a1`
- `name`: string, required, non-empty
- `birthYear`: number, required, integer

MongoDB `_id` will remain internal and will not be used as the public route identifier.

Example author:

    {
      "id": "a1",
      "name": "Jane Austen",
      "birthYear": 1775
    }

### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- `200 OK`
- Response body: an array of author objects.

Errors:
- `500 Internal Server Error` if an unexpected server or database error occurs.

#### GET /authors/:id
Purpose: Return one author by their custom id.

Success:
- `200 OK`
- Response body: the matching author object.

Errors:
- `404 Not Found` if the author does not exist.
- `500 Internal Server Error` if an unexpected server or database error occurs.

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Jane Austen",
      "birthYear": 1775
    }

Success:
- `201 Created`
- Response body: the newly created author object.

Errors:
- `400 Bad Request` if a required field is missing or invalid.
- `409 Conflict` if the custom author id already exists.
- `500 Internal Server Error` if an unexpected server or database error occurs.

#### PUT /authors/:id
Purpose: Replace the editable information of an existing author identified by their custom id. All editable fields are required.

Request body:

    {
      "name": "Jane Austen Updated",
      "birthYear": 1776
    }

Success:
- `200 OK`
- Response body: the updated author object.

Errors:
- `400 Bad Request` if a required field is missing or invalid.
- `404 Not Found` if the author does not exist.
- `500 Internal Server Error` if an unexpected server or database error occurs.

#### DELETE /authors/:id
Purpose: Delete an author by their custom id.

Success:
- `204 No Content`
- No response body.

Errors:
- `404 Not Found` if the author does not exist.
- `409 Conflict` if one or more books still reference the author through `authorId`.
- `500 Internal Server Error` if an unexpected server or database error occurs.

### Relationship to Books
Before deleting an author, the API must search the `books` collection for documents with the author's custom id in `authorId`.

If at least one book references the author:
- Do not delete the author.
- Return `409 Conflict`.
- Return a JSON error message explaining that the author cannot be deleted while books reference them.

If no books reference the author, delete the author and return `204 No Content`.

### Validation and Security
- Validate all incoming data on the server.
- The name must be a non-empty string.
- The birthYear must be an integer.
- Only update the allowed author fields: `name` and `birthYear`.
- Do not accept MongoDB operators or client-provided `_id` values.
- Do not expose database credentials or internal error details.
- Use a unique index on the custom `id` field.

### Standard Error Response
All error responses must use a consistent JSON format:

    {
      "error": "A clear and safe error message"
    }

Examples:
- `400`: `{ "error": "Invalid or missing author information." }`
- `404`: `{ "error": "Author not found." }`
- `409`: `{ "error": "Cannot delete an author who has associated books." }`
- `500`: `{ "error": "An unexpected server error occurred." }`

### Swagger Documentation
Swagger must document all five author routes. Each route must include its purpose, parameters, request body when applicable, success response, and possible error responses. The documented response codes and JSON structures must match the actual API behavior.

### Deployment Expectations
All author routes must work locally and on Render. The deployed `/api-docs` page must allow users to test every author route.

---

# Implementation Checklist

- [ ] Update the book data model to include `authorId`.
- [ ] Create the `authors` collection.
- [ ] Implement GET, GET by id, POST, PUT, and DELETE for books.
- [ ] Implement GET, GET by id, POST, PUT, and DELETE for authors.
- [ ] Validate required fields and data types.
- [ ] Verify author references before creating or updating books.
- [ ] Prevent deleting authors that still have associated books.
- [ ] Add indexes for custom ids and book author references.
- [ ] Document every route in Swagger.
- [ ] Test every route using Swagger UI.
- [ ] Deploy the updated API to Render.
- [ ] Test the deployed `/api-docs` page.