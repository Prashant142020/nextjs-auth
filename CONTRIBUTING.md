Contributing to Review App
Thank you for your interest in contributing to Review App! We welcome contributions from the community to help improve and enhance the project. Please take a moment to read through the following guidelines to get started.

Table of Contents
Getting Started
Contributing Guidelines
Setting Up the Development Environment
Submitting a Pull Request (PR)
Backend Reference Link
Code of Conduct
Getting Started
Before you start contributing to the frontend, make sure you have:

A GitHub account.
Git installed on your local machine.
Node.js and npm (Node Package Manager) installed on your local machine.
Yarn installed on your local machine.
Contributing Guidelines
We follow these guidelines for contributing:

Fork the frontend repository to your GitHub account.

Clone your forked repository to your local machine:

git clone https://github.com/yourusername/review-app.git
Navigate to the frontend project directory:

cd review-app
Create a new branch for your contribution:

git checkout -b feature-name
Make your changes and ensure your code follows our coding standards and practices.

Test your changes locally to ensure they work as expected.

Commit your changes with clear and concise commit messages:

git commit -m "Add feature: your feature description"
Push your changes to your GitHub fork:

git push origin feature-name
Create a pull request (PR) to the main repository's main branch.

Setting Up the Development Environment
To set up the development environment locally, follow these steps:

Clone the frontend repository:

git clone https://github.com/yourusername/review-app.git
cd review-app
Install project dependencies using Yarn:

yarn install
Create a file named .env.local in the root directory of the frontend project and add the following environment variables:

NEXT_PUBLIC_AWS_API_URL=http://localhost:8000/local
NEXT_PUBLIC_APP_DASHBOARD_DOMAIN=app
NEXT_PUBLIC_APP_DOMAIN=localhost:3000
You can also find similar environment variables in .env.example.

Start the development server:

yarn dev
The project will be accessible at http://localhost:3000.

Submitting a Pull Request (PR)
When you're ready to submit your changes, create a pull request (PR) following our guidelines. Be sure to provide a clear description of your changes in the PR, and one of our maintainers will review it.

Backend Reference Link
You can find the reference link to the backend of the reivew-app here: https://github.com/piyushgarg-dev/review-app-api

Code of Conduct
Please note that we have a Code of Conduct that we expect all contributors to follow. Ensure you read and adhere to it throughout your contribution journey.

We appreciate your contributions and look forward to collaborating with you!