# OTA (Online Travel Agency)

## Overview
OTA (Online Travel Agency) is a web application built with ASP.NET Core that allows users to search for flights, book tickets, and make payments. The application provides a user-friendly interface to search for flights based on airports and dates, display real-time flight information, and manage bookings.

## Features
- **Flight Search**: Users can search for flights by entering departure and arrival airports along with the departure date.
- **Real-time Flight Information**: Display real-time flight information fetched from external APIs.
- **Flight Booking**: Users can select flights and proceed with booking.
- **Payment Integration**: Secure payment gateway integration for processing payments.
- **User Authentication**: User registration and login system.
- **Notifications**: Email and SMS notifications for booking confirmations.

## Technologies Used
- ASP.NET Core
- Entity Framework Core
- Razor Pages
- External Flight APIs (e.g., Skyscanner, Amadeus)
- Payment Gateway (e.g., PayPal, Stripe)
- Bootstrap for UI design

## Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/ota.git
    cd ota
    ```

2. **Set Up the Database**:
    - Update the `appsettings.json` file with your database connection string.
    - Run the following command to apply migrations and create the database:
        ```bash
        dotnet ef database update
        ```

3. **API Keys**:
    - Obtain API keys from the flight data providers (e.g., Skyscanner, Amadeus).
    - Update the `appsettings.json` file with your API keys.

4. **Run the Application**:
    ```bash
    dotnet run
    ```

5. **Access the Application**:
    - Open your browser and navigate to `https://localhost:5001` to access the application.

## Project Plan
### Timeline
1. **Initial Planning and Requirements Definition**: 2 weeks
2. **Design Phase**: 3 weeks
3. **Development Phase**: 8 weeks
4. **Integration and Testing**: 4 weeks
5. **Marketing and Launch Preparation**: 3 weeks

### Budget
1. **Development**: $15,000 - $20,000
2. **API Integration**: $5,000 - $8,000
3. **Infrastructure**: $3,000 - $5,000
4. **Design**: $3,000 - $5,000
5. **Payment Gateway**: $2,000 - $3,000
6. **Marketing & Promotion**: $3,000 - $5,000

**Total Budget**: $31,000 - $46,000

## Contributing
We welcome contributions to the OTA project! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Create a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any questions or inquiries, please contact us at [t-ally@outlook.com].

---

**Enjoy your seamless travel booking experience with OTA!**
