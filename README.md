Express.js Web Server

A simple and structured Express.js web server project demonstrating routing, middleware, logging, serving static files, and basic REST API functionality.
🚀 Features

    ✅ Express.js server setup
    ✅ Custom middleware
    ✅ Request & error logging
    ✅ Serving static HTML pages
    ✅ Routing with subdirectories
    ✅ JSON API responses
    ✅ Modular project structure

📁 Project Structure


tut06-expressjs/
│
├── public/               # Static assets (CSS, images, etc.)
├── views/                # HTML pages served by the server
├── data/                 # JSON/text data used by the app
├── logs/                 # Request & error logs
│   ├── eventLog.txt
│   └── errLog.txt
│
├── middleware/           # Custom middleware
│   ├── logEvents.js
│   └── errorHandler.js
│
├── server.js             # Entry point of the application
├── package.json
└── .gitignore

📦 Installation

Clone the repository:

git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

Install dependencies:

npm install

▶️ Running the Server

Start the development server:

npm start

Or manually:

node server.js

Server will run at:

http://localhost:3500

(If port is different in your code, adjust accordingly.)
🧩 API Endpoints (Examples)
Method 	Endpoint 	Description
GET 	/ 	Home page
GET 	/about 	About page
GET 	/data 	Returns JSON data
GET 	/subdir 	Renders a subdirectory HTML page

(Add more endpoints if your project has them.)
📝 Logging

This project uses a custom logger:

    Every request is logged to /logs/eventLog.txt
    Errors are logged to /logs/errLog.txt

Middleware included:

const logger = require('./middleware/logEvents');
app.use(logger);

⚠️ Error Handling

Custom error handler middleware:

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

Ensures consistent error responses and proper logging.
✅ Dependencies

Main packages:

    express
    uuid (if used)
    date-fns

Install manually if needed:

npm install express uuid date-fns

📜 License

This project is open source and available under the MIT License.
👤 Author

Vipanchi GitHub: https://github.com/vip23anchib
