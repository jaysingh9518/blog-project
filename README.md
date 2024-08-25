# My Blog Project

A full-featured blog application built using Node.js, Express, and MongoDB. This project serves as a personal blog where you can create, edit, delete, and manage blog posts, authenticate users, and manage a simple admin interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Overview

This blog project is a server-side web application designed to provide a seamless blogging experience. It allows users to create, edit, and delete posts, as well as manage content via an admin interface. The project is built with Node.js for the backend, Express as the web framework, and MongoDB as the database.

## Features

- User authentication (login/logout)
- Admin dashboard for managing posts
- Create, edit, and delete blog posts
- Responsive design using EJS templates
- Middleware for route protection
- Search functionality for blog posts
- Pagination for listing blog posts

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for ODM)
- **Templating**: EJS (Embedded JavaScript)
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Middleware**: Express sessions, cookie-parser, method-override
- **CSS Framework**: Bootstrap (or any other if used)
- **Version Control**: Git
- **Deployment**: Docker (Optional), Coolify (Optional)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jaysingh9518/blog-project.git
   cd my-blog-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=5000
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

4. **Start the application**:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:5000`.

## Configuration

Ensure you have MongoDB running locally or provide a connection string for a remote MongoDB instance. The `.env` file must contain the `MONGODB_URI`, `PORT`, and `JWT_SECRET` for security and configuration purposes.

## Usage

- Visit `http://localhost:5000/admin` to access the admin dashboard.
- Use the signup and login forms to create a user account and authenticate.
- Create, edit, or delete blog posts through the admin interface.
- View all posts on the main blog page and search through posts.

## API Endpoints

- **GET** `/` - Home page showing all blog posts
- **GET** `/admin` - Admin login page
- **POST** `/admin` - Admin login form submission
- **GET** `/dashboard` - Admin dashboard (requires authentication)
- **GET** `/add-post` - Form to add a new blog post (requires authentication)
- **POST** `/add-post` - Submit a new blog post (requires authentication)
- **GET** `/edit-post/:id` - Form to edit a blog post (requires authentication)
- **PUT** `/edit-post/:id` - Submit changes to a blog post (requires authentication)
- **DELETE** `/delete-post/:id` - Delete a blog post (requires authentication)
- **GET** `/logout` - Logout the user

## Screenshots

Here are some screenshots of the application:

### Home Page

![Home Page](screenshots/home-page.png)

### Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

### Add Post Page

![Add Post](screenshots/add-post.png)

*(Replace the placeholders with actual paths to your screenshots)*

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Create a new Pull Request.

Please make sure your code adheres to the project's coding conventions and standards.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any issues or questions, please reach out via:

- Email: jaysingh9518@gmail.com
- GitHub Issues: [https://github.com/jaysingh9518/blog-project/issues](https://github.com/jaysingh9518/blog-project/issues)

```
