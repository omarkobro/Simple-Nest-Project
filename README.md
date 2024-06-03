
# Overview
- This is a Simple Nest Project and backend application built using the NestJS framework. It provides authentication and user management services. The application allows users to sign up, verify their email, log in, and manage their user profile, including updating details and deleting their account.

# Key Features
 Authentication Services:
- Sign Up: Users can register with their name, email, password, and role. The service checks for existing email, hashes the password, sends a confirmation email with a token, and creates a new user.
- Email Verification: Users can verify their email using a token sent to them. The service checks the token and updates the user's email verification status.
- Login: Users can log in with their email and password. The service validates credentials and generates a JWT token for authenticated sessions.
# User Services:

- Get User Profile: Users can retrieve their profile details, excluding the password.
- Update Account: Users can update their name and email. The service checks for email uniqueness and updates the user details.
- Delete Account: Users can delete their account. The service verifies the user's existence before deletion.
# Technologies Used
- NestJS Framework: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- TypeScript: A statically typed superset of JavaScript used for writing the application code.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, used to interact with the MongoDB database.
- bcrypt: A library for hashing passwords.
- JWT (Json Web Token): Used for securely transmitting information between parties as a JSON object.
- Nodemailer: A module for sending emails.
