# Getting Started

This guide helps you set up and run the Crypto Tracker project.

## Prerequisites

- Node.js v18+
- npm v8+ or yarn v1.22+
- Git

## Web Application Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/crypto-tracker.git
    cd crypto-tracker/web-app/application
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at `http://localhost:3001`.

4.  **Build for production:**

    ```bash
    npm run build
    npm run start
    # or
    yarn build
    yarn start
    ```

## Mobile Application Setup

*Coming soon*

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# API Keys
COINGECKO_API_KEY=your_api_key_here  # Optional, for higher rate limits