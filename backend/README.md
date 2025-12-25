🐾 FurEverHelp – Pet Crowdfunding Platform

📌 Problem Statement
Many pet owners, animal shelters, and NGOs struggle to raise funds for medical emergencies, rescues, shelter care, and adoption support. Existing crowdfunding platforms are generic and lack transparency specific to animal welfare.

💡 Solution
FurEverHelp is a pet-only crowdfunding platform that enables transparent, secure, and emotionally driven fundraising for animals in need.

🛠️ Tech Stack
Frontend: React, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Payments: Razorpay
Media Storage: Cloudinary
Authentication: JWT

👥 User Roles
Donor – Donate and track contributions
Pet Owner / Shelter – Create and manage campaigns
Admin – Approve campaigns and verify documents

✨ Key Features
Pet medical & rescue fundraising
Secure online donations
Admin approval system
Fund usage transparency (bills, updates)
Campaign progress tracking
Role-based dashboards

📁 Project Structure
FurEverHelp/
├── backend/
├── frontend/
├── README.md

▶️ How to Run Backend
cd backend
npm install
npm run dev

🚀 Future Enhancements
Direct payments to pet clinics
Adoption workflow
Geo-based pet discovery
Donor badges & certificates

❤️ Conclusion
FurEverHelp aims to create a trusted ecosystem for animal welfare fundraising, ensuring that every donation truly helps a life in need.

🐾 FurEverHelp
Day 1 – Backend Setup
📅 Day 1 Overview

Objective:
Set up the backend foundation for the FurEverHelp pet crowdfunding platform by initializing the project, configuring the Express server, connecting MongoDB, and verifying the setup using a test API route.


✅ Tasks Completed (Day 1 Checklist)
✔ Project folder created
✔ Git repository initialized
✔ Express server configured and running
✔ MongoDB database connected successfully
✔ Test API route working

🛠️ Technologies Used (Day 1)
Node.js
Express.js
MongoDB Atlas
Mongoose
dotenv
nodemon

📁 Backend Folder Structure (Day 1)
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json


⚙️ Implementation Details

1️⃣ Project Initialization
Created the root project folder FurEverHelp
Initialized Git for version control
Set up a separate backend workspace

2️⃣ Express Server Setup
Configured Express application using app.js
Added basic middleware (CORS, JSON parsing)
Created a test route (/) to confirm server functionality

3️⃣ MongoDB Connection
Used MongoDB Atlas for cloud database
Connected MongoDB using Mongoose
Stored connection URI securely in .env file
Ensured successful connection logging

4️⃣ Environment Configuration
Used dotenv to load environment variables
Configured:
Server port
MongoDB connection string

🧪 Verification & Testing
Server Start
npm run dev

Successful Console Output
✅ MongoDB connected successfully
🚀 Server is running on port 2204