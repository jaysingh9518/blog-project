const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;
const mongoUrl = process.env.MONGODB_URI;

const app = express();
app.use(cookieParser());

// Configure session middleware with 1 minute expiration
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    rolling: true, // Auto-renew the session on each request
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        ttl: 60, // 1 minute in seconds
    }),
    cookie: { maxAge: 60 * 1000 } // 1 minute in milliseconds
}));

/**
 * Middleware to check JWT and session expiration
 */
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Retrieve token from cookies

    if (!token) {
        return res.send(`
            <script>
                alert('You are not authorized');
                window.location.href = '/admin';
            </script>
        `);
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.send(`
            <script>
                alert('You are not authorized');
                window.location.href = '/admin';
            </script>
        `);
    }
};

/**
 * GET
 * Admin - Login Page
 */
router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: 'Admin',
            description: 'This is my first blogging page',
        }

        res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST
 * Admin - Check Login
 */
router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token that expires in 1 minute
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1m' });
        res.cookie('token', token, { httpOnly: true, maxAge: 60 * 1000 }); // 1 minute in milliseconds
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET
 * Admin - Dashboard
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Dashboard',
            description: 'This is my first blogging page',
        }

        let perPage = 10;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('admin/dashboard', {
            locals,
            data,
            layout: adminLayout,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET
 * Admin - Create New Post
 */
router.get('/add-post', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Add Post',
            description: 'This is my first blogging page',
        }

        const data = await Post.find();
        res.render('admin/add-post', {
            locals,
            layout: adminLayout,
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST
 * Admin - Create New Post
 */
router.post('/add-post', authMiddleware, async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body
        });

        await Post.create(newPost);
        console.log('Post saved successfully');
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET
 * Admin - Edit Post
 */
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        const locals = {
            title: 'Edit Post',
            description: 'This is my first blogging page',
        }

        const data = await Post.findOne({ _id: req.params.id });

        res.render('admin/edit-post', {
            data,
            locals,
            layout: adminLayout
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * PUT
 * Admin - Edit Post
 */
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/edit-post/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
});

/**
 * DELETE
 * Admin - Delete Post
 */
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET
 * Admin - Logout
 */
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.redirect('/');
    });
});

/**
 * POST
 * Admin - Register
 */
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User created', user });
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'Username already exists' });
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;