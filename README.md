# GStore eCommerce Project

## Overview

This is an eCommerce website for a grocery store built using **Next.js**, **Tailwind CSS**, and **Strapi**. The application allows users to browse categories such as fruits and vegetables, add items to their shopping cart, and proceed to checkout. Payments are handled via **Stripe**. The project also includes user authentication with JWT and order management.

## Features

- **Category Browsing**: Users can explore various product categories like fruits, vegetables and more.
- **Shopping Cart**: Add items to the shopping cart and view them before checkout.
- **Checkout and Payment**: Complete purchases using Stripe's test account for payment processing.
- **Order Management**: View orders on the `myOrder` page after a successful payment.
- **User Authentication**: Sign up and sign in with JWT for secure access.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Strapi**: Headless CMS to manage and retrieve product data. [Strapi Admin Dashboard](https://strapi-ecommerce-store.onrender.com/admin/)
- **PostgreSQL**: Database linked with Strapi via Render.
- **Stripe**: Payment gateway for handling transactions (test account used).
- **JWT**: JSON Web Tokens for user authentication.

## Setup

### Cloning the Repository

1. Clone the repository:
    ```bash
    git clone https://github.com/Anasoud1/nextjs-ecommerce.git
    cd nextjs-ecommerce
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env.local` file in the root directory.
    - Add the necessary environment variables for your application (e.g., Stripe keys, database URL).

### Running the Application

1. Start the development server:
    ```bash
    npm run dev
    ```

2. Open your browser and go to `http://localhost:3000` to view the application.

### Strapi Setup

1. Set up and deploy Strapi separately. You can manage content via the [Strapi Admin Dashboard](https://strapi-ecommerce-store.onrender.com/admin/).
2. Ensure Strapi is connected to PostgreSQL using Render and configured with necessary data models.

## Payment Integration

- The Stripe integration uses a test account. To test payments, use the test card numbers provided by Stripe.

## User Authentication

- Use JWT for secure authentication. Ensure you handle token storage and validation properly in your application.

## Order Management

- Orders are visible on the `myOrder` page after successful payments.

## Deployment

The application is deployed and available at [https://nextjs-ecommerce-gstore.vercel.app](https://nextjs-ecommerce-gstore.vercel.app).

## License

This project is licensed under the MIT License.
