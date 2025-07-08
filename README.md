
# EDEN KITCHEN – Smart Stove Monitoring Dashboard (Frontend)

This is the frontend implementation for **EDEN KITCHEN**, a group project focused on developing a smart stove interface powered by solar and biogas energy. The dashboard is built using React and Material UI, designed to interact with a Node.js + Express backend and a MySQL database.

---

## Key Features

- Token-based authentication with protected routes  
- Real-time sensor monitoring (battery, temperature)  
- Fuel mode toggling (solar ↔ biogas)  
- Device management (formerly "Chapters")  
- User management and role-based access  
- Clean, responsive UI using Material UI  
- Integration with RESTful backend APIs  

---

## Project Structure

├── public/                # Static assets (favicon, etc.)
├── src/
│   ├── assets/            # Logos, illustrations
│   ├── components/        # Battery, Temperature, FuelMode, etc.
│   ├── layouts/           # Layout templates (ModernLayout)
│   ├── pages/             # Dashboard, Login, Devices, Users
│   ├── utils/             # API logic and helpers (api.js)
│   ├── App.jsx            # Root component with router
│   ├── AppRouter.jsx      # Route definitions with token protection
│   └── main.jsx           # Vite entry point
├── .env                   # Environment variables (e.g., backend URL)
├── package.json           # Project metadata
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation

---

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)  
- npm or yarn  
- Backend server running at `http://localhost:3000` or configured in `.env`  

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open your browser and navigate to http://localhost:5173.

### Authentication Flow

On successful login, a JWT token is stored in localStorage.

Protected routes such as /dashboard, /devices, and /users are accessible only with a valid token.

Axios automatically attaches the token in requests using the Authorization header:

```
Authorization: Bearer <token>
```

### API Integration

The frontend communicates with the backend via the following RESTful endpoints:

- `POST /api/login` – Authenticate user and return JWT  
- `GET /api/users` – Fetch list of users (token required)  
- `GET /api/devices` – Fetch smart stove devices (renamed from /api/chapters)  
- `POST /api/devices/toggle-mode` – Toggle fuel mode (solar ↔ biogas)  

The API base URL is defined in `src/utils/api.js` and can be overridden using environment variables in `.env`.

### Customization

- **Components**: Modular components such as Battery, FuelMode, and Temperature are located in `src/components/`.  
- **Theming**: The UI is styled with Material UI and can be customized via global themes.  
- **Extension**: The system is extensible for additional sensors, device types, and visual features.  

---

## Contribution Guidelines

1. Fork the repository.  
2. Create a new branch for your feature or fix:  
   ```bash
   git checkout -b feature/device-control-panel
   ```  
3. Commit your changes with clear messages.  
4. Open a pull request with a summary of your contribution.  

---

## License

This project is licensed under the MIT License.

---

## Current Status

- Dashboard UI is functional  
- Battery, Temperature, and FuelMode components integrated  
- Token-based authentication is fully implemented  
- Users and Devices pages are protected and operational  
- Error handling implemented for missing/invalid data  
- Backend and frontend optimizations are ongoing  
