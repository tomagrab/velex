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

Currently, Velex relies on one environment variable for the OpenAI API key. To set up the environment variable, create a `.env.local` file in the root directory of the project and add the following:

```bash
    OPENAI_API_KEY=your_openai_api_key
```

**NOTE**: In the future, Velex will use third-party auth providers like Auth0 or Clerk for user authentication. To set up these providers, follow the instructions below:

In the `.env.local` file, add the following environment variables:

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

### Test Promps for the assistant chatbot

<details>
    <summary>Click to expand test prompts - This section is really long</summary>
1. Code Snippet Request:

- Can you show me a JavaScript function that calculates the factorial of a number?
- Expected Markdown: A code block with a JavaScript function.
- Output Example:

```javascript
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
```

2. Headings Request:

   - Explain the lifecycle methods of a React component and categorize them using headings.
   - Expected Markdown: Headings (e.g., ## for sections) for each lifecycle phase.
   - Output Example:

```markdown
## Mounting

    - `constructor()`
    - `componentDidMount()`

## Updating

    - `shouldComponentUpdate()`
    - `componentDidUpdate()`

## Unmounting

    - componentWillUnmount()`
```

3.  Bullet Lists Request:

    - List the key features of Next.js.
    - Expected Markdown: A bullet list.
    - Output Example:

```diff
- File-based routing
- API routes
- Static generation
- Server-side rendering
```

4. Numbered Lists Request:

   - What are the steps to deploy a Next.js app to Vercel?
   - Expected Markdown: A numbered list.
   - Output Example:

```markdown
1. Create a Vercel account.
2. Install the Vercel CLI.
3. Link your project to Vercel.
4. Deploy your project with `vercel` command.
```

5.  Table Request:

    - Can you create a table comparing Next.js and Create React App?
    - Expected Markdown: A table.
    - Output Example:

| Feature                | Next.js | Create React App |
| ---------------------- | ------- | ---------------- |
| Server-side rendering  | Yes     | No               |
| Static site generation | Yes     | No               |
| API Routes             | Yes     | No               |

6. Blockquote Request:

   - Can you provide a motivational blockquote for developers?
   - Expected Markdown: A blockquote.
   - Output Example:

```shell
> "First, solve the problem. Then, write the code." – John Johnson
```

7. Bold and Italic Text Request:

   - Can you emphasize key aspects of learning JavaScript?
   - Expected Markdown: Bold and italic text.
   - Output Example:

- **Variables**: Store data values.
- _Functions_: Define reusable blocks of code.
- **Objects**: Organize related data and functions.

8. Link Request:

   - Can you provide a link to the official React documentation?
   - Expected Markdown: A hyperlink.
   - Output Example:

[React Documentation](https://reactjs.org/)

9. All of the above in one long prompt:

   - Can you provide a JavaScript function that calculates the factorial of a number? Explain the lifecycle methods of a React component and categorize them using headings. List the key features of Next.js. What are the steps to deploy a Next.js app to Vercel? Can you create a table comparing Next.js and Create React App? Can you provide a motivational blockquote for developers? Can you emphasize key aspects of learning JavaScript? Can you provide a link to the official React documentation?
   - Expected Markdown: A combination of all the above prompts.
   - Output Example (I was too lazy to write this one out, so I just console logged a raw response from the assistant, since it sends the response in markdown format lol):

<details>
  <summary>Really Long Example</summary>

### JavaScript Factorial Function

Here is a simple JavaScript function to calculate the factorial of a number:

```javascript
function factorial(n) {
  if (n < 0) return -1; // Factorial is not defined for negative numbers
  if (n === 0) return 1; // The factorial of 0 is 1
  return n * factorial(n - 1);
}

console.log(factorial(5)); // Output: 120
```

### Lifecycle Methods of a React Component

React components have a lifecycle that can be broken down into three main phases:

#### 1. Mounting

- **constructor()**: Initializes state and binds methods.
- **static getDerivedStateFromProps()**: Syncs state to props.
- **render()**: Returns the JSX to render.
- **componentDidMount()**: Invoked immediately after a component is mounted. Ideal for network requests or DOM manipulations.

#### 2. Updating

- **static getDerivedStateFromProps()**: Same as in mounting; used to sync state.
- **shouldComponentUpdate()**: Determines whether component should render after state/props changes.
- **render()**: Re-renders the JSX when state/props change.
- **getSnapshotBeforeUpdate()**: Captures DOM info before update.
- **componentDidUpdate()**: Invoked after an update to handle post-update logic.

#### 3. Unmounting

- **componentWillUnmount()**: Cleanup method to cancel network requests, remove event listeners, etc.

### Key Features of Next.js

- **Server-Side Rendering (SSR)**: Renders pages on the server for improved performance and SEO.
- **Static Site Generation (SSG)**: Pre-renders static pages at build time.
- **Automatic Code Splitting**: Optimizes page loading by automatically dividing code.
- **API Routes**: Allows building of API endpoints within a Next.js app.
- **Built-in CSS Support**: Provides built-in support for CSS and CSS-in-JS solutions like styled-components.
- **Image Optimization**: Automatically optimizes images.
- **File-system Routing**: Uses the filesystem as an API to create routes.

### Steps to Deploy a Next.js App to Vercel

1. **Install Vercel CLI**: If you prefer deploying through the CLI, install it using `npm install -g vercel`.
2. **Login to Vercel**: Run `vercel login` and use your Vercel credentials.
3. **Build Your Next.js App**: Run `npm run build` in your project directory.
4. **Deploy to Vercel**: Run `vercel` and follow the prompts to deploy your project.

Alternatively, you can directly link your Git repository to Vercel, and it will automatically deploy on each push.

### Comparison Table: Next.js vs. Create React App

| Feature                   | Next.js                    | Create React App              |
| ------------------------- | -------------------------- | ----------------------------- |
| **Rendering**             | SSR, SSG, ISR, Client-side | Client-side Only              |
| **Routing**               | File-based Routing         | Manual Routing (react-router) |
| **Deployment**            | Optimized for Vercel       | Generic Frontend Deployment   |
| **API Routes**            | Built-in APIs              | Requires separate server      |
| **Image Optimization**    | Built-in                   | Third-party libraries         |
| **Custom Server Support** | Yes                        | No                            |
| **Static Export**         | Supported                  | Requires additional setup     |

### Motivational Blockquote for Developers

> "The best way to predict the future is to invent it." – Alan Kay

### Key Aspects of Learning JavaScript

- **Understand the Basics**: Grasp fundamental concepts like variables, data types, and control structures.
- **Learn Asynchronous Programming**: Master callback functions, promises, and async/await.
- **Manipulate the DOM**: Interact with and modify the document structure and styles.
- **Master ES6+ Features**: Utilize features like arrow functions, destructuring, spread/rest operators, and modules.
- **Understand Event Handling**: Learn how to handle events and form interactions.
- **Dive into Object-Oriented Programming**: Explore JavaScript's prototype-based OOP approach.

### Link to the Official React Documentation

You can access the official React documentation here: [React Documentation](https://reactjs.org/docs/getting-started.html)

</details>
</details>

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
