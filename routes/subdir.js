/*
You use router instead of app when you want to organize your routes into separate files, 
not put everything in server.js.
❗ app is the entire server.

const app = express();
this creates one global Express app that actually runs your server:
listens on a port
handles all requests
is the main application
You should NOT create multiple app instances

✅ router is a mini version of app
const router = express.Router();

router lets you:
group related routes together
move them to separate files
attach them to the main app

It does NOT run the server by itself.
It’s like a sub-application.
*/

const express=require('express');
const path=require('path');
const router=express.Router();

router.get( ['/index', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','subdir','index.html'));// another way to send absolute path using path.join
}   );
router.get( ['/test', '/test.html'], (req, res) => {
    res.sendFile(path.join(__dirname,'..','views','subdir','test.html'));// another way to send absolute path using path.join
}   );
module.exports = router;




