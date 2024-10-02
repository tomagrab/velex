# Velex

**Velex** is an all-in-one support center platform aimed at streamlining employee management, ticketing, asset management, and internal analytics. The platform includes a GPT-powered chatbot designed for internal use to assist employees in accessing relevant information. Velex offers a robust framework to handle both internal operations and external customer interactions in future versions.

### Roadmap

#### Alpha (v1.0)

- Employee Management: Full CRUD capabilities for managing employee information.
- Ticketing System: Implement a ticket management system for handling internal support tickets.
- Asset Management: Track and manage organizational assets.
- Analytics: Generate insightful reports and metrics for internal performance.
  vInternal GPT-powered Chatbot: A domain-specific chatbot to assist employees with accessing relevant internal information efficiently.
- Auth Implementation: Passwordless Single Sign-On (SSO) authentication using Microsoft accounts, with a strong emphasis on role-based access control (RBAC).

#### Beta (v1.0)

- All features from Alpha, with the addition of:
  - Customer Management: CRUD operations, contact information, and login capabilities for customers to track their assets.
  - Incoming/Outgoing Communication: Support for calls, emails, and other forms of customer interaction.
  - Enhanced GPT-powered Chatbot: Now capable of interacting with employees and customers, retrieving relevant documentation and interfacing with multiple data sources.

#### Full Release (v1.0)

- Includes all features from Alpha and Beta phases, delivering a full-fledged support center platform.

#

### Setup Instructions

#### 1. Prerequisites

Make sure you have the following installed on your machine:

- [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) (optional, but recommended for managing Node.js versions)
- [Node.js](https://nodejs.org/en) (>= 14.x) (do not install Node.js if you are using nvm; nvm will manage Node for you. Please read the nvm docs for more information.)
- [npm](https://www.npmjs.com/) (>= 6.x) (no install required; npm comes with Node.js) or [yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)

#### 2. Cloning the Repository

```bash
    git clone https://github.com/tomagrab/velex.git
    cd velex
```

#### 3. Installing Dependencies

Install the project dependencies using either npm or yarn.

- Using npm:

```bash
    npm install
```

- Using yarn:

```bash
    yarn install
```

#### 4. Environment Variables

**NOTE**: As of writing this, Velex does not use any environment variables. However, this will change in the future. Below are the general steps to set up environment variables for the project along with common variables for Auth0 and Clerk.

Create a `.env.local` file in the root directory of the project. Add the following environment variables:

- Auth0

```bash
    NEXT_PUBLIC_AUTH0_DOMAIN=your_auth0_domain
    NEXT_PUBLIC_AUTH0_CLIENT_ID=your_auth0_client_id
    NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000/api/auth/callback
    NEXT_PUBLIC_AUTH0_LOGOUT_REDIRECT_URI=http://localhost:3000/
```

- Clerk

```bash
    NEXT_PUBLIC_CLERK_FRONTEND_API_KEY=your_clerk_frontend_api_key
    NEXT_PUBLIC_CLERK_SIGN_IN_REDIRECT_URL=http://localhost:3000/api/auth/callback
    NEXT_PUBLIC_CLERK_SIGN_OUT_REDIRECT_URL=http://localhost:3000/
    NEXT_PUBLIC_CLERK_API_URL=http://localhost:3001
```

#### 5. Running the Development Server

Once your dependencies are installed, you can start the development server:

- Using npm:

```bash
    npm run dev
```

- Using yarn:

```bash
    yarn dev
```

Your Next.js app should now be running at http://localhost:3000

#### 6. Building for Production

To create an optimized production build, run:

- Using npm:

```bash
    npm run build
```

- Using yarn:

```bash
    yarn build
```

After building the project, you can start the production server:

- Using npm:

```bash
    npm run start
```

- Using yarn:

```bash
    yarn start
```

#### 8. Setting Up Authentication

Velex will use either Clerk or Auth0 for user authentication, however, as of writing this, one has not been chosen or implemented over the other. If you would like to implement your own solution before this repo officially makes a decision, follow the steps below to configure authentication:

#### Auth0 Setup:

1. Sign up for an Auth0 account at [Auth0](https://auth0.com/signup?place=header&type=button&text=sign%20up)
2. Create a new application in the [Auth0 dashboard](https://manage.auth0.com/dashboard).
3. Add your Auth0 domain and client ID to your .env.local file.
4. Configure SSO with Microsoft accounts within your Auth0 settings.

**NOTE**: Steps 3 and 4 are general guidelines. Please refer to the official [Auth0 documentation](https://auth0.com/docs/quickstart/webapp/nextjs/interactive) for detailed instructions.

#### Clerk Setup:

1. Sign up for a Clerk account at [Clerk](https://dashboard.clerk.com/sign-up?redirect_url=https%3A%2F%2Fdashboard.clerk.com%2F).
2. Create a new application in the [Clerk dashboard](https://dashboard.clerk.com/).
3. Add your Clerk frontend API key to the .env.local file.
4. Enable SSO with Microsoft accounts within Clerk’s settings.

**NOTE**: Steps 3 and 4 are general guidelines. Please refer to the official [Clerk documentation](https://clerk.com/docs/quickstarts/nextjs) for detailed instructions.

#

### Key Features

#### Ticketing System

Track support tickets for internal use, allowing employees to submit and resolve issues.

#### Asset Management

Maintain records of company assets, including their status, location, and lifecycle.

#### Analytics

Provide key performance insights and data visualizations to improve internal decision-making.

#### Internal GPT-powered Chatbot

A domain-specific chatbot built with GPT-3 to assist employees in retrieving relevant information quickly.

#### Authentication

SSO authentication using Microsoft accounts, with role-based access controls ensuring different user types can access the appropriate features.

#

### Milestones

Features are organized into milestones. Major features should be labeled as major feature in GitHub Issues.

#

### License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/tomagrab/velex/blob/dev/LICENSE.md) file for more information.