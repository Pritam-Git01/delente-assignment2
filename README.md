# Next.js User List App

This project is a Next.js application that fetches a list of users from an external API and displays their names and emails. The application is built using TypeScript for better type safety and maintainability.

## Features

- Fetches user data from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users).
- Displays user names and emails in a clean, responsive layout.
- Type-safe user data using TypeScript interfaces.

## Technologies Used

- [Next.js](https://nextjs.org) - React framework for server-side rendering and static site generation.
- [TypeScript](https://www.typescriptlang.org) - A typed superset of JavaScript that compiles to plain JavaScript.
- [React](https://reactjs.org) - JavaScript library for building user interfaces.

## Getting Started

### Prerequisites

- Node.js (version 12 or above)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the app in action.

## API Endpoints

The application fetches user data from the following endpoint:

- `GET https://jsonplaceholder.typicode.com/users`

## Code Structure

- `app/` - Contains the main application code.
- `components/` - Contains React components.
- `types/` - Contains TypeScript interfaces for type safety.
- `pages/` - Contains Next.js pages.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize any part of the README to better fit your project's specifics or personal preferences!