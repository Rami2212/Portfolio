# Portfolio Project

A modern, dynamic developer portfolio built with Next.js 16, TypeScript, and Tailwind CSS. Features a public-facing showcase and a secure, terminal-themed admin dashboard for content management.

## Features

- **Public Site**:
  - Interactive Hero section with 3D elements (@react-three/fiber).
  - Dynamic Projects showcase with filtering and detailed views.
  - Skills & Experience sections.
  - Dedicated **Certifications** section with responsive slider cards and project-style controls.
  - Reviews/Testimonials.
  - Contact form with email integration.
  - Responsive design with smooth animations (Framer Motion).

- **Admin Dashboard** (`/admin`):
  - **Retro Terminal/CRT Theme**: Unique visual style for the backend interface.
  - **Authentication**: Secure login system.
  - **Content Management**: Full CRUD operations for:
    - **Projects**: Manage titles, descriptions, tech stacks, images, and visibility.
    - **Skills**: Add/Update skills and proficiency levels.
    - **Certifications**: Manage certification name, organization logo URL, issued month/year, optional credential URL, and order.
    - **Reviews**: moderate user-submitted testimonials.
    - **Site Settings**: Toggle features (e.g., GitHub link visibility).
  - **Image Upload**: Integrated with Cloudinary for media assets.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **State/Animations**:
  - [Framer Motion](https://www.framer.com/motion/)
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
  - [tsparticles](https://particles.js.org/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Authentication**: JWT (JSON Web Tokens)

## Folder Structure

```
├── app/
│   ├── (site)/             # Public facing pages (Home, Projects, etc.)
│   ├── admin/              # Admin dashboard pages (Login, CRUD components)
│   ├── api/                # API Routes (Backend logic)
│   │   ├── auth/           # Login & Session endpoints
│   │   ├── projects/       # Projects CRUD
│   │   ├── skills/         # Skills CRUD
│   │   ├── certifications/ # Certifications CRUD
│   │   ├── reviews/        # Reviews & Moderation
│   │   ├── site/           # Site settings
│   │   └── upload/         # Image upload handler
│   └── globals.css         # Global styles & CRT themes
├── lib/                    # Utility functions (DB, Auth, Cloudinary)
├── models/                 # Mongoose Data Models
├── public/                 # Static assets
└── ...config files
```

## API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/login` | Admin login | ❌ |
| `GET` | `/api/projects` | Get all visible projects (Public) | ❌ |
| `GET` | `/api/projects?all=true` | Get all projects (Admin) | ✅ |
| `POST` | `/api/projects` | Create a new project | ✅ |
| `PATCH` | `/api/projects/:id` | Update a project | ✅ |
| `DELETE` | `/api/projects/:id` | Delete a project | ✅ |
| `GET` | `/api/skills` | Get all skills | ❌ |
| `GET` | `/api/certifications` | Get all certifications | ❌ |
| `POST` | `/api/certifications` | Create a certification | ✅ |
| `PATCH` | `/api/certifications/:id` | Update a certification | ✅ |
| `DELETE` | `/api/certifications/:id` | Delete a certification | ✅ |
| `POST` | `/api/contact` | Submit contact form | ❌ |
| `POST` | `/api/upload` | Upload image to Cloudinary | ✅ |

## Theme Details

The Admin dashboard features a custom **CRT / Terminal** theme defined in `globals.css`:
- **Font**: VT323 (Google Fonts)
- **Effects**: Scanlines, text glow, and subtle flicker animations.
- **Colors**: primarily green monochrome with amber accents.

## License

Copyright © 2026 Rami2212. All Rights Reserved.

This source code is the property of Rami2212. Copying, distribution, or modification of this file, in part or in whole, is strictly prohibited without the express written permission of the owner.

