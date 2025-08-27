ByteShifted

This repository contains solutions for two tasks: a frontend (Task 1) and a backend with frontend (Task 2).

1. Frontend (Task 1)
This folder contains the solution for Task 1, converting Figma designs to code.
Hosted demo: https://byte-shifted-figma.vercel.app/

Setup:
- Open the folder in VS Code or any IDE.
- Install dependencies:
  npm i
- Start the development server:
  npm run dev
  or
  npm start

2. Backend (Task 2)
This contains both a Next.js frontend and a Flask backend.

a. Frontend
Hosted demo: https://byte-shifted.vercel.app/

Setup:
- Open the folder in VS Code or any IDE.
- Install dependencies:
  npm i
- Start the development server:
  npm run dev
  or
  npm start

b. Backend (Flask)

Setup:
- Create a PostgreSQL database named "byteshited_products".
- In the backend folder, create a .env file with the following content:

RACKBEAT_API_KEY=YOUR_RACKBEAT_API_KEY
DB_HOST=localhost
DB_NAME=byteshited_products
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD

- Install dependencies:
  pip install -r requirements.txt
- Run the Flask server:
  python main.py

Notes:
- Currently fetching 500 products from Rackbeat.
- To change the number of products fetched, update total_limit and limit_per_page in main.py.
