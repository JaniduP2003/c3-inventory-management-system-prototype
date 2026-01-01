# C3 Inventory Management System

A modern, full-featured inventory management system built with Next.js and React. This system provides comprehensive tools for managing inventory, suppliers, accounts, and bills with an intuitive user interface.

## 🚀 Features

- **Inventory Management**: Track and manage inventory items with a powerful table interface
- **Supplier Management**: Maintain supplier records and relationships
- **Account Management**: Hierarchical account tree structure for financial tracking
- **Bill Processing**: Create and manage bills with line items and expense tracking
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Type-Safe**: Written in TypeScript for better code quality and developer experience

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 16.0.10 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📁 Project Structure

```
c3-inventory-management-system/
├── frontend/
│   ├── app/                    # Next.js app directory
│   │   ├── accounts/          # Account management pages
│   │   ├── bills/             # Bill management pages
│   │   ├── suppliers/         # Supplier management pages
│   │   └── table/             # Inventory table page
│   ├── components/            # React components
│   │   ├── accounts/          # Account-related components
│   │   ├── bills/             # Bill-related components
│   │   ├── layout/            # Layout components (sidebar, nav)
│   │   ├── suppliers/         # Supplier components
│   │   ├── table/             # Table components
│   │   └── ui/                # Reusable UI components
│   ├── lib/                   # Utility functions and types
│   └── public/                # Static assets
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JaniduP2003/c3-inventory-management-system.git
cd c3-inventory-management-system
```

2. Navigate to the frontend directory:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

In the `frontend` directory:

- `npm run dev` - Starts the development server
- `npm run build` - Creates an optimized production build
- `npm start` - Runs the production server
- `npm run lint` - Runs ESLint to check code quality

## 🎨 UI Components

The project uses shadcn/ui components including:

- Tables, Forms, Dialogs
- Buttons, Inputs, Select dropdowns
- Cards, Badges, Tabs
- Popovers, Dropdowns, Calendars
- And many more...

## 📱 Features Overview

### Inventory Table

- Comprehensive inventory viewing and management
- Advanced filtering and sorting capabilities
- Responsive table design

### Supplier Management

- Add, edit, and manage supplier information
- Supplier dialog interface for quick actions

### Account Management

- Hierarchical account tree structure
- Account form dialog for creating/editing accounts
- Visual representation of account relationships

### Bill Management

- Create new bills with multiple line items
- Expense tracking and categorization
- Form validation and error handling

## 🚀 Deployment

### Deploying to Netlify with GitHub Actions

This project includes a GitHub Actions workflow for automatic deployment to Netlify.

#### Setup Instructions:

1. **Create a Netlify Account** (if you don't have one):

   - Go to [netlify.com](https://www.netlify.com/) and sign up

2. **Create a New Site on Netlify**:

   - Log in to Netlify
   - Click "Add new site" > "Import an existing project"
   - Or create an empty site for manual deployment

3. **Get Your Netlify Credentials**:

   - **NETLIFY_AUTH_TOKEN**:

     - Go to User Settings > Applications > Personal access tokens
     - Click "New access token"
     - Give it a name and copy the token

   - **NETLIFY_SITE_ID**:
     - Go to your site's Settings > General > Site details
     - Copy the "Site ID" (also called "API ID")

4. **Add Secrets to GitHub**:

   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Add two secrets:
     - Name: `NETLIFY_AUTH_TOKEN`, Value: (your auth token)
     - Name: `NETLIFY_SITE_ID`, Value: (your site ID)

5. **Deploy**:
   - Push to the `main` branch or create a pull request
   - GitHub Actions will automatically build and deploy your application
   - Check the "Actions" tab in your GitHub repository to monitor the deployment

#### Manual Deployment:

Alternatively, you can deploy manually using the Netlify CLI:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from the project root
netlify deploy --prod
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Janidu Perera**

- GitHub: [@JaniduP2003](https://github.com/JaniduP2003)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
  Inventory Management System for C3, designed to manage products, stock levels, suppliers, and transactions with a secure and scalable architecture.
