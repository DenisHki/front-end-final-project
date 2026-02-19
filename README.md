# PersonalTrainer App – Frontend

A React-based dashboard application for managing personal training customers and their training sessions. The frontend connects to a backend API provided by the course instructor and offers a clean interface for viewing, adding, editing, and deleting customers and trainings.

## Team member
- Denis Chuvakov

## Features

- **Customer Management** – View, add, edit, and delete customers. Export customer data to CSV.
- **Training Management** – View and delete training sessions linked to customers.
- **Calendar View** – Visualize all training sessions in a weekly/monthly calendar.
- **Activity Chart** – Bar chart showing total training duration grouped by activity type.

## Architecture

**Frontend** communicates with the backend REST API via HTTP requests. All data is fetched and mutated through the API – the frontend holds no persistent state of its own.

```
Browser → React App (Vite/CRA) → Backend REST API (provided by teacher)
```

**Key technologies:**

| Library | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| MUI (Material UI) | Component library & styling |
| AG Grid | Customer and training data tables |
| React Big Calendar | Calendar view for trainings |
| Recharts | Bar chart for activity statistics |
| Day.js / Moment.js | Date formatting |
| React CSV | CSV export for customer data |

## Data Model (consumed from API)

The frontend works with the following entities served by the backend:

- **Customer** – `firstname`, `lastname`, `streetaddress`, `postcode`, `city`, `email`, `phone`
- **Training** – `activity`, `date`, `duration`, linked to a `customer`

## Developer Guide

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

1. Clone the repository and navigate to the project folder:
   ```bash
   git clone <your-repo-url>
   cd task_4
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
```

This generates an optimized production build in the `build/` folder.

### Running Tests

```bash
npm test
```

## API

The application connects to the backend API hosted at:

```
https://traineeapp.azurewebsites.net/api
```

This is defined in `src/constants.js` and can be updated to point to a local or alternative backend.

Key endpoints used:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/customers` | Fetch all customers |
| POST | `/customers` | Add a new customer |
| PUT | `/customers/:id` | Update a customer |
| DELETE | `/customers/:id` | Delete a customer |
| GET | `/trainings` | Fetch all trainings |
| POST | `/trainings` | Add a new training |
| DELETE | `/trainings/:id` | Delete a training |

## Project Structure

```
src/
├── components/
│   ├── CustomerList.js    # Customer table with CRUD operations
│   ├── TrainingList.js    # Training table with delete
│   ├── AddCustomer.js     # Dialog for adding a customer
│   ├── EditCustomer.js    # Dialog for editing a customer
│   ├── AddTraining.js     # Dialog for adding a training
│   ├── MyCalendar.js      # Calendar view of trainings
│   ├── Chart.js           # Bar chart of activity durations
│   └── NotFound.js        # 404 page
├── App.js                 # Routing and top-level navigation
├── constants.js           # API base URL
└── index.js               # App entry point
```

## Branch Strategy

- Feature branches are used for isolated development of new functionality.
- Pull requests are used for code review before merging into `main`.
- The `main` branch always reflects a working, stable state of the application.
