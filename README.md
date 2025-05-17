# Auto-Acad Project

This project is a React-based web application built with modern web technologies. The development work is being done in the `dev` branch.

## Tech Stack

- React 18.3.1
- React Router DOM v6
- SASS for styling
- Formik for form handling
- React Quill for rich text editing
- EmailJS for email functionality
- React Icons for iconography
- React Scroll for smooth scrolling
- React Toastify for notifications
- Jotai for state management

## Project Structure

```
auto-acad/
├── src/           # Source files
├── public/        # Public assets
├── G103/          # Project specific files
└── node_modules/  # Dependencies
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd auto-acad
```

2. Switch to the dev branch:
```bash
git checkout dev
```

3. Install dependencies:
```bash
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Key Features

- Modern React with functional components
- Responsive design
- Form handling with validation
- Rich text editing capabilities
- Email integration
- Smooth scrolling navigation
- Toast notifications
- State management with Jotai

## Development

All development work is being done in the `dev` branch. Please make sure to:
1. Always work on feature branches created from `dev`
2. Follow the project's coding standards
3. Write meaningful commit messages
4. Create pull requests to merge back into `dev`

## Dependencies

### Core Dependencies
- react: ^18.3.1
- react-dom: ^18.3.1
- react-router-dom: ^6.26.2
- react-scripts: 5.0.1

### UI and Styling
- sass: ^1.79.4
- react-icons: ^5.3.0
- react-scroll: ^1.9.0
- react-toastify: ^11.0.5

### Form and Data Handling
- formik: ^2.4.6
- react-quill: ^2.0.0
- jotai: ^2.12.4

### Communication
- @emailjs/browser: ^4.4.1
- axios: ^1.7.8
- nodemailer: ^6.9.16

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the terms included in the LICENSE file.