# Real Estates Web App (MERN Stack)

This repository contains the source code for a Real Estates web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, Firebase, and Tailwind CSS.

## Overview

This web application allows users to browse, search, and filter real estate listings. Users can also create accounts, save favorite listings, and contact agents for more information.

## Technologies Used

### Frontend

- _React.js_: A JavaScript library for building user interfaces.
- _Redux_: A predictable state container for JavaScript apps.
- _React Router_: A routing library for React.
- _Axios_: Promise-based HTTP client for the browser and Node.js.
- _Material-UI_: A popular React UI framework for building responsive and customizable UI components.
- _Tailwind CSS_: A utility-first CSS framework for rapidly building custom designs.
- _Firebase_: A platform developed by Google for creating mobile and web applications.
- _React Persist_: A library for persisting Redux state to local storage.
- _React Icons_: A library of popular icons for React applications.

### Backend

- _Node.js_: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- _Express.js_: A minimal and flexible Node.js web application framework.
- _MongoDB_: A NoSQL database program.
- _Mongoose_: An elegant MongoDB object modeling tool for Node.js.
- _Dotenv_: A module to load environment variables from a .env file into process.env.
- _Bcrypt.js_: A library to hash passwords.

### Authentication

- _JWT (JSON Web Tokens)_: A compact, URL-safe means of representing claims to be transferred between two parties.
- _Passport.js_: An authentication middleware for Node.js.
- _Firebase Authentication_: A service that can authenticate users using only client-side code.
- _Google OAuth_: A system for authenticating users via Google accounts.

### Testing

- _Insomnia_: A powerful REST API client for testing APIs.

## Deployment

- _Render_: A cloud platform for building and running web applications and services.

## Installation

1. Clone the repository:

   git clone https://github.com/Joeeazy/Real-Estates.git

2. Navigate to the project directory:

   cd Real_Estates

3. Install dependencies for both the frontend and backend:

   cd frontend
   npm install
   cd ../api
   npm install

4. Set up MongoDB:

   - Install MongoDB locally or use a cloud-based MongoDB service.
   - Create a .env file in the backend directory and add your MongoDB connection URI:

     MONGODB_URI=your_mongodb_connection_uri

5. Create a .env file in the backend directory and add the following variables:

   JWT_SECRET=my_jwt_secret
   GOOGLE_CLIENT_ID=my_google_client_id
   GOOGLE_CLIENT_SECRET=my_google_client_secret

6. Start the development server:

   cd api
   npm run dev
   cd ../frontend
   npm run dev

7. Open your browser and navigate to http://localhost:3000 to view the application.

## Contributing

Contributions are welcome! Please create a pull request for any changes or improvements you'd like to make.
