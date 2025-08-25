# Clothify - E-commerce

Quick start:

1. Install dependencies
   npm install

2. Set environment
   cp .env.example .env

3. Initialize database
   npx prisma migrate dev --name init
   npm run db:seed

4. Run dev server
   npm run dev

Features:
- Product listing and details
- Cart with Zustand (client)
- Checkout creates orders (simulated payment)
- Admin CRUD for products and categories

