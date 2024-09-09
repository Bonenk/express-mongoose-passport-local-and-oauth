# Express, Mongoose, Passport Local and Oauth Example

This project implements a simple authentication system using Express.js, Passport.js, MongoDB, and Nunjucks templating engine. It supports both local authentication and Google OAuth2.0 sign-in.

## Features

- User registration and login with email and password
- Google OAuth2.0 sign-in
- Session management with express-session
- Password hashing with bcrypt
- Flash messages for user feedback
- MongoDB integration for user data storage
- Nunjucks templating engine for server-side rendering
- Basic styling with Pico CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- MongoDB instance (local or cloud-based)
- Google OAuth2.0 credentials (for Google Sign-In)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Bonenk/express-mongoose-passport-local-and-oauth.git
   cd express-mongoose-passport-local-and-oauth
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

1. Navigate to `http://localhost:3000` in your web browser.
2. Register a new account or log in with existing credentials.
3. You can also use the "Sign in with Google" option for OAuth authentication.
4. Once logged in, you'll be redirected to the dashboard.

## Project Structure

- `app.js`: Main application file
- `config/`: Configuration files (passport setup, authentication middleware)
- `models/`: MongoDB schema definitions
- `routes/`: Express route handlers
- `views/`: Nunjucks template files
- `public/`: Static assets (if any)

## Contributing

Contributions to this project are welcome. To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Express.js
- Passport.js
- MongoDB
- Nunjucks
- Pico CSS

---

For any questions or issues, please open an issue in the GitHub repository.