# Roxiler Assessment

## Backend Task

### Data Source
- **Third-Party API URL:** [Product Transactions](https://s3.amazonaws.com/roxiler.com/product_transaction.json)
- **Request Method:** `GET`
- **Response Format:** JSON

### Task Overview
You need to create APIs for handling and processing the product transactions fetched from the third-party API. The APIs should meet the following requirements:

#### 1. Initialize Database
- Fetch the JSON data from the third-party API.
- Seed the database with the fetched data.
- Design an efficient table/collection structure to store the data.

#### 2. APIs to Develop

1. **List All Transactions**
   - **Method:** `GET`
   - **Features:**
     - Return a list of all transactions.
     - Support search and pagination.
     - Search parameters should match `title`, `description`, or `price`.
     - Default pagination values: `page = 1`, `per_page = 10`.

2. **Statistics**
   - **Method:** `GET`
   - **Features:**
     - Return the following for the selected month:
       - Total sale amount.
       - Total number of sold items.
       - Total number of not sold items.

3. **Bar Chart**
   - **Method:** `GET`
   - **Features:**
     - Return price ranges and the number of items in each range for the selected month:
       - 0-100
       - 101-200
       - 201-300
       - 301-400
       - 401-500
       - 501-600
       - 601-700
       - 701-800
       - 801-900
       - 901 and above.

4. **Pie Chart**
   - **Method:** `GET`
   - **Features:**
     - Return unique categories and the number of items in each category for the selected month.

5. **Combined Response**
   - **Method:** `GET`
   - **Features:**
     - Fetch data from the above APIs.
     - Combine the responses and send a single JSON response.

---

## Frontend Task

### Requirements
Using the APIs created in the backend, implement the following features on a single-page application:

1. **Transactions Table**
   - **Features:**
     - Display transactions in a table.
     - Include a month selection dropdown (options: January to December, default: March).
     - Implement search functionality:
       - Match input text with `title`, `description`, or `price`.
       - Display matching transactions.
       - Clear the search box to reset the transaction list.
     - Add pagination:
       - Load next/previous page data using API.

2. **Transaction Statistics**
   - **Features:**
     - Display total sale amount, total sold items, and total not sold items for the selected month.

3. **Transactions Bar Chart**
   - **Features:**
     - Display price ranges and the number of items in each range.
     - Apply the selected month filter.

4. **Transactions Pie Chart**
   - **Features:**
     - Display unique categories and the number of items in each category.

---


## Notes
- Ensured all APIs take a `month` parameter and filter data based on the `dateOfSale` field (irrespective of year).
- Use efficient database queries and handle large data gracefully.
- Ensure the frontend is responsive and user-friendly.
