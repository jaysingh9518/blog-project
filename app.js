require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Secret key for signing the session ID cookie
    resave: false, // Prevents session from being saved back to the session store if it hasn't been modified
    saveUninitialized: false, // Prevents uninitialized sessions from being saved to the store
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI, // MongoDB connection string
        ttl: 60, // Time to live for session in seconds (1 minute)
    }),
    cookie: {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures the cookie is sent only over HTTPS
        maxAge: 60 * 1000, // Session cookie expiration time (1 minute in milliseconds)
    }
}));

// Middleware to check session expiration and redirect
app.use((req, res, next) => {
    if (!req.session || !req.session.id) {
        return res.redirect('/admin');
    }
    next();
});

// Static Files
app.use(express.static('public'));

// Template Engine Setup
app.use(expressLayout);
app.set('layout', './layouts/main'); // Default layout
app.set('view engine', 'ejs'); // Set EJS as the templating engine

// Set local variables for templates
app.locals.isActiveRoute = isActiveRoute;

// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

// Start Server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
