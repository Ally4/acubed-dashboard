# Branch Updates

## 🚀 New Features
- **Authentication**
  - Login and Signup functionality added.
  - All routes are protected behind authentication.
- **User Profile**
  - Users can view and manage their profile.
- **Orders**
  - Users can create new orders.
  - Added functionality to view existing orders.
- **Dashboard**
  - Displays a list of available tests and facilities.
- **Responsive Design**
  - All screens are fully responsive across devices.

## 📦 Libraries Added
- [`react-hook-form`](https://react-hook-form.com/) → for simplified and performant form handling.
- [`redux-persist`](https://github.com/rt2zz/redux-persist) → for persisting Redux state across sessions.

## Backend
- For testing purposes, new features use an express js backend connected to a local Postgres DB. The local DB tables follow the same schema as the production acubed backend, so backend calls will need to refactored.

---