const path = require('path');
const express = require('express');
const app = express();
const {logger}=require('./middleware/logEvents');
const errorHandler=require('./middleware/errorHandler');
const cors= require('cors');
//----------------------------------------------------------------------------------------------------------------------------------
//PORT configuration
const PORT = process.env.PORT || 3500;

// //process.env.PORT → means: check if there’s a port number defined in the environment variables.
// This is common in production (like on hosting platforms such as Render, Vercel, or Heroku).
// Those platforms automatically assign a port number for your app to use.
// || 3500 → means: if no environment port is provided, use 3500 by default.
//----------------------------------------------------------------------------------------------------------------------------------

//our custom middleware 
app.use(logger);
const whiteList = ['https://www.google.com', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));// to enable Cross origin resource sharing
//----------------------------------------------------------------------------------------------------------------------------------

//built-in middleware to handle urlencoded data
//in other words, form data:  'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));// to handle form data

//built-in middleware to handle json data
app.use(express.json());// to handle json data

//serve static files
app.use(express.static(path.join(__dirname, 'public')));// to serve static files like css, images, js etc from public folder

app.use('/subdir', require('./routes/subdir'));// to use the router defined in subdir.js for routes starting with /subdir



//ROUTE HANDLERS
app.get(['/', '/index', '/index.html'], (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });// file path should be absolute not relative hence we use root: __dirname
    res.sendFile(path.join(__dirname,'views','index.html'));// another way to send absolute path using path.join
// to make .html optional we can use regex ^/$ | /index(.html)?
});


app.get(['/new-page', '/new-page.html'], (req, res) => {
    res.sendFile(path.join(__dirname,'views','new-page.html'));// another way to send absolute path using path.join
});

//to re-direct from old-page to new-page
app.get(['/old-page','/old-page.html'], (req, res) => {
    res.redirect(301, '/new-page');// 301 → permanent redirection
});


//ROUTE HANDLER FOR ALL OTHER PAGES - 404 PAGE
app.get(['/hello.html','/hello'], (req, res,next) => {
    console.log("attempted to load hello.html");    
    next();// to pass control to next route handler
},(req,res)=>{
    res.send("Hello World!");
});

//chaining route handlers using next()
const one = (req, res, next) => {
    console.log('one');
    next();
};

const two = (req, res, next) => {
    console.log('two');
    next();
};

const three = (req, res) => {
    console.log('three');
    res.send('Finished!');
};

app.get(['/chain', '/chain.html'], [one, two, three]);

// 404 PAGE - for all other routes not defined above



app.all(/.*/, (req, res) => {
  res.status(404);
  
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  }
    else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  }
  else {
    res.type('txt').send('404 Not Found');
  }
});

//global error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
