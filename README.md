# FinTrack - Smart Expense Tracker with Analytics Dashboard

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for tracking personal finances with beautiful analytics and visualizations.

![FinTrack Dashboard](https://img.shields.io/badge/Status-Production%20Ready-success)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![React](https://img.shields.io/badge/React-18-blue)

## ✨ Features

### 🔐 Authentication & Security

- JWT-based authentication with secure token management
- Password hashing using bcrypt
- Protected routes and middleware
- Auto-logout on token expiration
- Secure password validation

### 💰 Transaction Management

- Add, edit, and delete transactions
- Support for both Income and Expense types
- Categorize transactions (Food, Transport, Shopping, etc.)
- Add notes to transactions
- Date-based transaction tracking

### 📊 Analytics Dashboard

- **Summary Cards**: Total Income, Total Expense, and Balance
- **Pie Chart**: Category-wise expense breakdown
- **Bar Chart**: Monthly income and expense comparison
- Real-time analytics using MongoDB aggregation pipeline

### 🎨 User Interface

- Modern, clean, and professional design
- Fully responsive and mobile-friendly
- Dark/Light mode toggle
- Smooth animations and transitions
- Beautiful color gradients
- Loading states and empty states
- Toast notifications for user feedback
- Budget warning alerts

### 🔍 Advanced Filtering

- Filter by transaction type (Income/Expense)
- Filter by category
- Filter by month and year
- Clear all filters option

### 📱 Responsive Design

- Mobile-first approach
- Works seamlessly on desktop, tablet, and mobile
- Collapsible mobile menu

## 🛠️ Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **colors** - Terminal logging colors

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **React Router DOM** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **React Toastify** - Notifications

## 📁 Project Structure

```
FinTrack/
├── server/                  # Backend
│   ├── config/
│   │   └── db.js           # Database configuration
│   ├── controllers/
│   │   ├── authController.js
│   │   └── transactionController.js
│   ├── middleware/
│   │   ├── auth.js         # JWT authentication
│   │   ├── errorHandler.js # Error handling
│   │   └── logger.js       # Request logging
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Transaction.js  # Transaction schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env                # Environment variables
│   ├── .env.example        # Example env file
│   ├── .gitignore
│   ├── package.json
│   └── server.js           # Entry point
│
└── client/                 # Frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── CategoryPieChart.jsx
    │   │   ├── Loading.jsx
    │   │   ├── MonthlyBarChart.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── SummaryCard.jsx
    │   │   ├── TransactionFilters.jsx
    │   │   ├── TransactionModal.jsx
    │   │   └── TransactionTable.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── utils/
    │   │   ├── api.js          # API client
    │   │   └── helpers.js      # Utility functions
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/lokeshbabugorrepati/FinTrack.git
cd FinTrack
```

2. **Set up the Backend**

```bash
cd server
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the `server` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/fintrack
JWT_SECRET=your_super_secret_jwt_key_change_in_production
CLIENT_URL=http://localhost:5173
```

4. **Start MongoDB**

Make sure MongoDB is running on your system:

```bash
# Windows (if installed as service)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

5. **Run the Backend Server**

```bash
npm run dev
```

The server will start on `http://localhost:5000`

6. **Set up the Frontend**

Open a new terminal:

```bash
cd client
npm install
```

7. **Run the Frontend**

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📚 API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Transaction Endpoints

#### Get All Transactions

```http
GET /api/transactions?type=Expense&category=Food&month=1&year=2026
Authorization: Bearer <token>
```

#### Get Single Transaction

```http
GET /api/transactions/:id
Authorization: Bearer <token>
```

#### Create Transaction

```http
POST /api/transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 50.00,
  "type": "Expense",
  "category": "Food & Dining",
  "date": "2026-02-27",
  "note": "Lunch at restaurant"
}
```

#### Update Transaction

```http
PUT /api/transactions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 55.00,
  "category": "Food & Dining"
}
```

#### Delete Transaction

```http
DELETE /api/transactions/:id
Authorization: Bearer <token>
```

#### Get Analytics

```http
GET /api/transactions/analytics
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "data": {
    "summary": {
      "totalIncome": 5000,
      "totalExpense": 3200,
      "balance": 1800
    },
    "categoryBreakdown": [
      { "_id": "Food & Dining", "total": 800, "count": 15 },
      { "_id": "Transportation", "total": 500, "count": 10 }
    ],
    "monthlyExpenses": [
      { "_id": { "year": 2026, "month": 2 }, "total": 3200, "count": 45 }
    ],
    "monthlyIncome": [
      { "_id": { "year": 2026, "month": 2 }, "total": 5000, "count": 2 }
    ]
  }
}
```

## 🎨 Features in Detail

### Dark Mode

Toggle between light and dark themes. Preference is saved in localStorage.

### Budget Alerts

Automatic alerts when expenses exceed income.

### Data Validation

- Backend validation for all inputs
- Frontend form validation
- Secure password requirements (minimum 6 characters)
- Email format validation

### Error Handling

- Global error handler middleware
- Meaningful error messages
- Toast notifications for user feedback
- Automatic logout on token expiration

### Logging

Clean terminal logs with colors:

- Server start information
- Database connection status
- API request logs with method and endpoint
- Success and error messages

## 🔒 Security Features

- Passwords are hashed using bcrypt with salt rounds
- JWT tokens with 30-day expiration
- Protected routes requiring authentication
- Password field never returned in API responses
- CORS configuration
- Input validation and sanitization
- MongoDB injection prevention

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Lokesh Babu Gorrepati**

- GitHub: [@lokeshbabugorrepati](https://github.com/lokeshbabugorrepati)
- Email: lokeshbabugorrepati@gmail.com

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- UI inspired by modern fintech applications

## 📞 Support

For support, email lokeshbabugorrepati@gmail.com or create an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
