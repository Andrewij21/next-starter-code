# Next.js Application Template

This is a modern Next.js 14 application template designed for building scalable and robust web applications. It follows best practices for data fetching, state management, and component architecture.

---

## 🚀 Key Technologies

- **Next.js 14 (App Router)**: The React framework for production.
- **TypeScript**: Ensures type-safe code and improves developer experience.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TanStack Query**: Manages server state and data fetching.
- **Zod**: Provides a robust schema validation for API requests and responses.
- **React Hook Form**: Handles form state and validation.
- **Shadcn/ui**: A collection of reusable components built with Tailwind CSS.

---

## 📂 Project Structure

This template uses a clear, organized file structure to separate concerns and promote scalability.

```
/src
├── /app                  # Next.js App Router for all pages and layouts
│   └── /(protected)      # Protected routes that require authentication
│       ├── layout.tsx    # Shared layout for protected pages
│       └── /users
│           └── page.tsx
│
├── /components           # Reusable UI components
│   ├── /ui                   # Shadcn/ui components
│   ├── /layouts              # Reusable layout components
│   │   ├── AppHeader.tsx
│   │   ├── AppLayout.tsx
│   │   └── AppSidebar.tsx
│   └── /auth                 # Auth-specific UI components
│       └── LoginForm.tsx
│
├── /lib                  # Back-end and shared utilities
│   ├── /api                  # API client setup
│   ├── /queries              # Centralized data fetching hooks
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   └── query-keys.ts     # Centralized TanStack Query keys
│   └── /utils                # Helper functions (e.g., breadcrumb logic)
│       └── breadcrumbs.ts
│
├── /providers                # Context providers
│   ├── AuthProvider.tsx
│   └── QueryProvider.tsx
│
├── /schemas                  # Zod schemas for data validation
│   ├── user.ts
│   └── auth.ts
│
└── middleware.ts             # Middleware file (at the root of the src folder)
```

---

## 📋 Core Concepts & Best Practices

### Data Management with TanStack Query

All data fetching and mutation logic is centralized in the `queries` folder. We follow a clear pattern:

- **Centralized Query Keys**: All TanStack Query keys are defined in a single file (`query-keys.ts`) to prevent typos and enable efficient cache invalidation.
- **CRUD Hooks**: Each resource (e.g., `user`) has its own file with dedicated hooks for Create, Read, Update, and Delete operations.

### Component & File Architecture

- **Separation of Concerns**: UI components (`/components`) are separate from their data logic (`/queries`). This keeps components focused on presentation and makes data logic reusable.
- **Shared Layouts**: The `(protected)` folder uses a shared `layout.tsx` file to apply the `AppLayout` to all nested routes, ensuring a consistent UI without code duplication.

### Dynamic Navigation

- **Centralized Breadcrumbs**: Breadcrumbs are automatically generated based on the URL pathname. This logic is contained in `lib/utils/breadcrumbs.ts`, eliminating the need to manually set breadcrumbs on every page.
- **Dynamic Labels**: The breadcrumb utility function supports **custom labels** for path segments (e.g., `/user` becomes `Petani`). It can also handle **dynamic routes** like `/users/12312312`, replacing the ID with a hardcoded label like `User`.

---

## 🔧 Getting Started

1.  **Clone the repository**:

    ```bash
    git clone [your-repo-url]
    cd [your-project-name]
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  **Open in your browser**:
    The application will be running at `http://localhost:3000`.
