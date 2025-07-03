# EDEN KITCHEN – Smart Stove Monitoring Dashboard (Frontend)

This is the frontend implementation for **EDEN KITCHEN**, a group project focused on developing a smart stove interface powered by solar and biogas energy. The dashboard is built using React and Material UI, designed to interact with a Node.js + Express backend and a MySQL database.

---

## Key Features

- Token-based authentication with protected routes  
- Real-time sensor monitoring (battery, temperature)  
- Fuel mode toggling (solar ↔ biogas)  
- Device management (formerly "Chapters")  
- User management and role-based access  
- Clean, responsive UI using Material-UI  
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
- Backend server running on `http://localhost:3000` or a configured URL  

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

Open your browser and navigate to http://localhost:5173.

## Authentication Flow

- On successful login, a JWT token is stored in `localStorage`.
- Protected routes such as `/dashboard`, `/devices`, and `/users` are accessible only with a valid token.
- Axios HTTP requests automatically attach the token in the `Authorization` header:
  
---

## API Integration

The frontend interacts with a Node.js + Express backend through the following RESTful endpoints:

- `POST /api/login` – Authenticate user and return JWT
- `GET /api/users` – Fetch list of registered users (requires token)
- `GET /api/devices` – Fetch list of stove devices (formerly `/api/chapters`)
- `POST /api/devices/toggle-mode` – Switch between solar and biogas modes

> 🔧 Base URL is configured in `src/utils/api.js` and can be overridden via `.env`.

---

## Customization

- **Components**  
Modularized components like `Battery`, `Temperature`, and `FuelMode` are located in `src/components/`.

- **Theming**  
Material UI (MUI) theming supports customization of colors, fonts, and layout responsiveness.

- **Extension**  
Device logic can be extended to support new hardware integrations, sensor types, or control protocols.

---

## Contribution Guidelines

1. **Fork** the repository.
2. **Create a new branch** for your feature or fix:
 ```bash
 git checkout -b feature/device-control-panel
3. Commit your changes with clear messages.

4. Submit a pull request with a short summary and any relevant context.

## License
This project is licensed under the MIT License.

## Current Status
✅ Dashboard UI is functional

✅ Battery, Temperature, and FuelMode sensors integrated

✅ Token-based authentication with route protection

✅ Users and Devices pages implemented

✅ Graceful error handling on frontend and backend

⚙️ Backend and UI optimizations in progress