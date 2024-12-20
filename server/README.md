# Blogging Server

This is the backend server for the Blogging application, providing RESTful APIs for user authentication and blog management.

## Features

- **User Authentication**: Sign up, log in, log out, and email verification functionalities.
- **Blog Management**: Create, update, delete, and retrieve blog posts.

## Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine. You can download it from the [official Node.js website](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database to store user and blog data.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MrImaginatory/Blogging.git
   ```

2. **Navigate to the server directory**:

   ```bash
   cd Blogging/server
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the `server` directory with the following variables:

   ```env
   # EXPRESS
      PORT = 3001
      
      # MONGODB
      MONGO_URI = ""
      DB_NAME = ""
      
      # JSONWEBTOKEN
      JWT_SECRET_KEY = ""
      
      # NODEMAILER
      EMAIL_FROM = ""
      EMAIL_HOST = ""
      EMAIL_PORT = 
      EMAIL_SECURE = 
      EMAIL_USER = ""
      EMAIL_PASS = ""
   ```

5. **Start the server**:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3001`.

## API Endpoints

### Authentication

- **Login**: `POST /authentication/login`
- **Sign Up**: `POST /authentication/signup`
- **Logout**: `POST /authentication/logout`
- **Verify Email**: `GET /authentication/verify/:id`

### Blog Management

- **Get All Blogs**: `GET /blog/allBlogs`
- **Create Blog**: `POST /blog/create`
- **Update Blog**: `PUT /blog/update/:id`
- **Delete Blog**: `DELETE /blog/delete/:id`

## Usage

- **Authentication**: Users can sign up, log in, and log out. Email verification is required after sign-up.
- **Blog Operations**: Authenticated users can create, update, delete, and view blog posts.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

For more information, visit the [GitHub repository](https://github.com/MrImaginatory/Blogging/). 
