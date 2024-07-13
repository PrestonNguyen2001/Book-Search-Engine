# Book Search Engine

A full-stack web application for searching books using the Google Books API. The application allows users to search for books, view details, and save their favorite books.

## Table of Contents

- [Description](#description)
    - [User Story](#user-story)
    - [Acceptance Criteria](#acceptance-criteria)
- [Requirements and Technologies Used](#requirements-and-technologies-used)
- [Installation](#installation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

The Book Search Engine is a web application that enables users to search for books using the Google Books API. It provides detailed information about each book and allows users to save their favorite books to a personal list. The application features user authentication and authorization to manage user data securely.

### User Story

```markdown
AS a user,
I WANT to search for books and view details,
SO THAT I can find interesting books and save my favorites.
```


### Acceptance Criteria

- Users can search for books using the Google Books API.
- Users can view detailed information about each book.
- Users can save their favorite books to a personal list.
- User authentication and authorization are implemented.

## Requirements and Technologies Used

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running on your local machine.

### Technologies Used

- **Frontend:**
  - Vite
  - React
  - Axios
- **Backend:**
  - Node.js
  - Express
  - Mongoose
- **Database:**
  - MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/PrestonNguyen2001/Book-Search-Engine.git
    cd Book-Search-Engine
    ```

2. Install server dependencies:

    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:

    ```bash
    cd ../client
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    touch .env
    ```

   Inside `.env`, add:
    ```dotenv
    MONGODB_URI=mongodb://127.0.0.1:27017/your-database-name
    JWT_SECRET=your_generated_secret_key
    JWT_EXPIRATION=2h
    NODE_ENV=development
    ```

## Deployment

1. Ensure MongoDB is running:

    ```bash
    brew services start mongodb/brew/mongodb-community
    ```

2. Start the application:

    ```bash
    npm run develop
    ```

    This will concurrently start the server and the client. The client will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2. Use the search bar to find books.
3. View detailed information about each book by clicking on it.
4. Save your favorite books to your personal list.

## Features

- Search for books using the Google Books API.
- View detailed information about each book.
- Save favorite books to a personal list.
- User authentication and authorization.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Name**: Preston Nguyen
- **Email**: [prestonnguyen2001@gmail.com](mailto:prestonnguyen2001@gmail.com)
- **GitHub**: [PrestonNguyen2001](https://github.com/PrestonNguyen2001)
