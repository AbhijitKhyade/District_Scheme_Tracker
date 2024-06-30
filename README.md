# DistrictSchemeTracker
## Empowering districts, transforming lives.

### Table of Contents
Introduction
Features
Tech Stack
Installation
Usage
Screenshots
Contributing
License
Introduction
DistrictSchemeTracker is a MERN stack application designed to streamline the implementation of government schemes at the district level. It provides a centralized platform for administration, monitoring, and citizen engagement.

![Screenshot 2024-06-30 235632](https://github.com/AbhijitKhyade/District_Scheme_Tracker/assets/129264746/2d45ec69-4810-4bce-878a-99536c3e635c)



## Features
### Admin
📊 Admin Scheme Dashboard: Displays district scheme progress.
🧑‍💼 Officer Management: Assign districts to officers, and edit, add, delete, and view all assigned officers.
🛠️ Scheme Management: Create, edit, and delete schemes.
📈 Progress Monitoring: View the implementation progress of any district and individual schemes.
📝 Citizen Feedback: View feedback provided by citizens on scheme implementation.

### District Officers
🏢 District Assigned Dashboard: View assigned district information.
📑 Scheme Details: View all schemes and their parameters.
📅 Scheme Monitoring: Fill in scheme parameters monthly to track implementation progress.
🔍 Citizen Feedback: View feedback provided by citizens.

### Citizen
🌐 Citizen Dashboard: View all available schemes.
🔎 Implementation Details: View the implementation status of individual schemes.
📊 Scheme Summary: See summaries of all schemes in progress.
🤖 AI-Powered Exploration: Explore scheme details with AI-powered responses.
✍️ Feedback: Provide feedback on individual schemes.

### Authentication
🛡️ Officer Registration: Officers can register only if assigned to a district, get verified, and log in.
🛡️ Citizen Registration: Citizens can register with a citizen role and respective district.

## Tech Stack
Frontend: React.js, React Router, Axios, Material Tailwind, Tailwind CSS
State Management: Redux Toolkit
Backend: Node.js, Express.js, MongoDB, Mongoose
Deployment: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)
Authentication: JWT and bcrypt


## Installation
Clone the repository:
git clone https://github.com/yourusername/DistrictSchemeTracker.git
Navigate to the project directory:

cd DistrictSchemeTracker
Install frontend dependencies:
cd client
npm install
Install backend dependencies:
cd ../server
npm install
Usage
Start the backend server:
bash
Copy code
cd server
npm start
Start the frontend application:
bash
Copy code
cd ../client
npm start
Open your browser and navigate to http://localhost:3000.
