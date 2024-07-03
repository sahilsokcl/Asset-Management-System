**ReadMe:**

# AssetSphere: Comprehensive Asset Management Solutions

Welcome to **AssetSphere**, the ultimate solution for managing and tracking office assets efficiently. Developed for OKCL (Odisha Knowledge Corporation Limited), AssetSphere offers a robust, user-friendly interface designed to simplify asset management for both employees and administrators.

## Features

- **Dashboard**: Overview of key metrics and recent activity.
- **Assets**: Comprehensive asset management with detailed asset records and assignment tracking.
- **Components**: Inventory management for all components and peripherals.
- **Maintenances**: Schedule and log maintenance activities, with complete maintenance history.
- **Depreciations**: Calculate and record asset depreciation over time.
- **Asset Types**: Manage different categories of assets.
- **Brands**: List and manage asset brands.
- **Suppliers**: Track suppliers and their performance.
- **Locations**: Manage asset storage and usage locations.
- **Employees**: Assign assets to employees and track their asset history.
- **Departments**: Allocate and track assets by department.
- **Reports**: Generate custom and scheduled reports, with export options.
- **Settings**: User management, system configuration, and data backup options.

## Technology Stack

- **Frontend**: React, Tailwind CSS, Material UI
- **Backend**: PHP
- **Database**: MySQL

## Getting Started

### Prerequisites

- Node.js and npm installed
- PHP and MySQL installed
- Apache or Nginx web server

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/AssetSphere.git
   cd AssetSphere
   ```

2. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**

   ```bash
   cd ../backend
   composer install
   ```

4. **Set up the database:**

   - Create a new MySQL database.
   - Import the provided SQL schema (`schema.sql`) into your database.
   - Update the database connection details in `backend/config.php`.

5. **Start the development server:**

   - For the frontend:
     ```bash
     cd frontend
     npm start
     ```

   - For the backend:
     ```bash
     cd ../backend
     php -S localhost:8000
     ```

## Usage

- **Login:** Secure login for employees and administrators.
- **Dashboard:** View key metrics and recent activities.
- **Manage Assets:** Add, update, and track assets and their assignments.
- **Maintenance:** Schedule and log maintenance activities.
- **Reporting:** Generate and export reports.

## Contributing

We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any queries or support, please contact:

- **Email:** support@okcl.com
- **Website:** [OKCL](http://www.okcl.org)

---

By including this description and readme in your repository, you'll provide a clear and comprehensive overview of your project, helping other developers understand its purpose, features, and how to get started with it.
