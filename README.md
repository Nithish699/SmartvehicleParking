# Smart Parkg

A comprehensive smart vehicle parking management system designed to streamline parking operations, improve efficiency, and enhance user experience through real-time availability tracking and seamless booking.

## Features

- **Real-time Parking Slot Availability** - Live updates on available parking spaces
- **Slot Booking System** - Reserve parking spaces in advance
- **Multiple Payment Methods** - Flexible payment options for users
- **Home page for information
- ** easy navigation 
- **Mobile-Friendly Interface** - Responsive design for all devices
- **number plate validation
- ** slots count in real time

## Technologies Used

- **Frontend:** React.js, Redux (state management)
- **Backend:** Java with Spring Boot, REST APIs
- **Database:** SQL (MySQL/PostgreSQL)
- **Build Tools:** Maven, npm
## Description

Smart park is an intelligent parking management solution that addresses the growing challenges of urban parking congestion. The system leverages modern web technologies to provide a seamless experience for both users and administrators.

This project enables users to view real-time parking slot availability, book spaces in advance, and make secure payments through multiple methods. The intuitive mobile-friendly interface ensures accessibility across all devices, while the robust backend infrastructure guarantees reliability and scalability.

The system is built with React.js for a responsive frontend, Spring Boot for a powerful backend API, and MySQL/PostgreSQL for secure data management. and comprehensive parking management tools.

Key benefits include reduced parking search time, improved traffic flow, enhanced user convenience, and better parking lot utilization. The application follows REST API standards for seamless integration and maintains high security standards for user data and payment processing.

Designed for modern urban environments, Smart Vehicle Parking serves as a complete solution for parking facility operators and users seeking efficient, technology-driven parking management.
## Project Structure

```
SmartvehicleParking/
├── frontend/          # React.js application
├── backend/           # Spring Boot application
└── database/          # SQL scripts
```

## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/Nithish699/SmartvehicleParking.git
    cd SmartvehicleParking
    ```

2. **Install frontend dependencies**
    ```bash
    cd frontend
    npm install
    ```

3. **Set up backend**
    - Ensure Java (JDK 11+) and Maven are installed
    - Navigate to the backend directory:
      ```bash
      cd backend
      mvn install
      mvn spring-boot:run
      ```
    - Backend runs on `http://localhost:8080`

4. **Run the frontend**
    ```bash
    cd frontend
    npm run dev
    ```
    - Frontend runs on `http://localhost:3000`

## Usage

- Visit the frontend URL to book parking slots
- Admins can access the dashboard for system management
- Users receive confirmation emails for bookings

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact [nithish699734@gmail.com](mailto:nithish699734@gmail.com).