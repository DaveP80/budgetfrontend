<div id='davidpaquette'><h1>Budget App</h1><p>This is a budget tracking application built with React. It allows users to manage their financial transactions by adding new entries, editing existing transactions, and viewing a table of all transactions.</p><h2>Paths</h2><p>The application provides the following paths:</p><ul><li><code>/transactions/start</code>: Starts a session by setting the initial bank balance.</li><li><code>/transactions</code>: Displays a table of all transactions.</li><li><code>/transactions/:id</code>: Shows details of a specific transaction.</li><li><code>/transactions/new</code>: Allows users to create new transaction entries.</li><li><code>/transactions/:id/edit</code>: Allows users to edit an existing transaction.</li></ul><h2>API</h2><p>The application interacts with a backend API to perform CRUD (Create, Read, Update, Delete) operations on the transactions. The API URL is <code>https://budgetserver-lvjq.onrender.com/</code>. All the necessary data for the application's functionality is obtained from this API.</p><h2>Getting Started</h2><p>To run the budget app locally, follow these steps:</p><ol><li>Clone the repository: <code>git clone &lt;repository-url&gt;</code></li><li>Install dependencies: <code>npm install</code></li><li>Start the development server: <code>npm start</code></li><li>Access the app in your browser at <code>http://localhost:3000</code></li></ol></div>

## Features
### Selecting Categories
The application allows users to select categories for their transactions. They can choose from predefined categories or add custom categories to suit their needs.

### Running Money Total in the Nav Bar
The nav bar displays the current running total of the user's budget. This provides a quick overview of their financial status.

### Helpful Error Pages
The application includes helpful error pages to guide users in case they encounter any issues or navigate to incorrect URLs. These error pages provide clear messages and instructions on how to proceed.

### Prompting Users to the Correct Page
The application includes prompts and redirects to guide users to the appropriate pages based on their actions. This helps them navigate the application efficiently.
<div><p>Make sure to have Node.js and npm installed on your machine.</p><h2>Dependencies</h2><p>The project uses the following dependencies:</p><ul><li>React</li><li>React Router</li><li>Axios</li></ul><p>These dependencies are managed by npm and will be installed automatically when running <code>npm install</code>.</p><h2>Contributing</h2><p>Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.</p><h2>License</h2><p>This project is licensed under the <a href="LICENSE" target="_new">MIT License</a>.</p></div>
