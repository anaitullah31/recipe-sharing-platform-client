# 🍽️ RecipeHub — Recipe Sharing Platform (Client)

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Stripe](https://img.shields.io/badge/Stripe-Payments-purple)
![Better Auth](https://img.shields.io/badge/Auth-BetterAuth-orange)

## 🔗 Live Website

**Live Site:** https://recipe-sharing-platform-client.vercel.app

---

## 📖 Project Overview

RecipeHub is a modern recipe sharing platform where food enthusiasts can discover, create, manage, purchase, and save recipes. Users can interact with the culinary community, while administrators moderate platform activities through a dedicated dashboard.

The platform supports premium memberships, recipe purchasing, favorites management, content reporting, and administrative moderation tools.

---

## ✨ Key Features

### Public Features

* Browse all recipes
* View recipe details
* Advanced recipe filtering
* Featured recipes section
* Popular recipes section
* Responsive landing page
* Dark / Light theme toggle
* Framer Motion animations

### Authentication

* Email & Password Login
* Google Login
* Better Auth Authentication
* Protected Routes
* Persistent Sessions
* JWT Authentication

### User Features

* Dashboard Overview
* Add Recipes
* Edit Recipes
* Delete Recipes
* Favorite Recipes
* Purchase Premium Membership
* Purchase Recipes
* View Purchased Recipes
* Update Profile
* Premium User Badge
* Unlimited Recipe Creation (Premium Users)

### Admin Features

* Dashboard Analytics
* Manage Users
* Block / Unblock Users
* Manage Recipes
* Feature Recipes
* Review Reports
* Remove Recipes
* Dismiss Reports
* Monitor Transactions

### Payment System

* Stripe Checkout Integration
* Premium Membership Purchase
* Recipe Purchase System
* Payment History
* Payment Success Page

---

## 🛠️ Technologies Used

### Frontend

* Next.js 15 (App Router)
* React 19
* Tailwind CSS
* HeroUI
* Framer Motion
* Better Auth
* React Hook Form
* Stripe
* Axios

### Backend Services

* Node.js
* Express.js
* MongoDB
* JWT
* Stripe API

---

## 📂 Main Pages

### Public Pages

* Home
* Browse Recipes
* Recipe Details
* Login
* Register

### User Dashboard

* Dashboard Overview
* My Recipes
* Add Recipe
* Favorites
* Purchased Recipes
* Profile

### Admin Dashboard

* Dashboard Overview
* Manage Users
* Manage Recipes
* Reports
* Transactions

---

## 🎯 Core Functionalities

### Recipe Management

* Create recipes
* Update recipes
* Delete recipes
* Like recipes
* Feature recipes
* Report recipes

### Premium Membership

Premium users receive:

* Unlimited recipe submissions
* Premium profile badge
* Exclusive platform privileges

### Favorites System

* Save recipes
* Remove recipes
* Manage favorite collection

### Reporting System

Users can report:

* Spam
* Offensive Content
* Copyright Issues

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGO_URI=
NEXT_PUBLIC_IMGBB_API_KEY=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_PREMIUM_PRICE_ID=
```

## 💻 Installation

```bash
git clone CLIENT_REPOSITORY_URL

cd recipehub-client

npm install

npm run dev
```

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

---

## 🚀 Deployment

Deployed using:

* Vercel (Client)

---

## 👨‍💻 Developer

**Anait Ullah**

RecipeHub — Recipe Sharing Platform
