# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

<div id='davidpaquette'><h1>Budget App</h1><p>This is a budget tracking application built with React. It allows users to manage their financial transactions by adding new entries, editing existing transactions, and viewing a table of all transactions.</p><h2>Paths</h2><p>The application provides the following paths:</p><ul><li><code>/transactions/start</code>: Starts a session by setting the initial bank balance.</li><li><code>/transactions</code>: Displays a table of all transactions.</li><li><code>/transactions/:id</code>: Shows details of a specific transaction.</li><li><code>/transactions/new</code>: Allows users to create new transaction entries.</li><li><code>/transactions/:id/edit</code>: Allows users to edit an existing transaction.</li></ul><h2>API</h2><p>The application interacts with a backend API to perform CRUD (Create, Read, Update, Delete) operations on the transactions. The API URL is <code>https://budgetserver-lvjq.onrender.com/</code>. All the necessary data for the application's functionality is obtained from this API.</p><h2>Getting Started</h2><p>To run the budget app locally, follow these steps:</p><ol><li>Clone the repository: <code>git clone &lt;repository-url&gt;</code></li><li>Install dependencies: <code>npm install</code></li><li>Start the development server: <code>npm start</code></li><li>Access the app in your browser at <code>http://localhost:3000</code></li></ol><p>Make sure to have Node.js and npm installed on your machine.</p><h2>Dependencies</h2><p>The project uses the following dependencies:</p><ul><li>React</li><li>React Router</li><li>Axios</li></ul><p>These dependencies are managed by npm and will be installed automatically when running <code>npm install</code>.</p><h2>Contributing</h2><p>Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.</p><h2>License</h2><p>This project is licensed under the <a href="LICENSE" target="_new">MIT License</a>.</p></div>