🗂️ Raíz del Proyecto
Archivo/Carpeta	Descripción
.env	Variables de entorno globales (por ejemplo, claves API, URLs, etc.).
.gitignore	Indica qué archivos deben ser ignorados por Git (e.g. node_modules, .env).
eslint.config.js	Configuración para ESLint (herramienta de linting/corrección de código JS/TS).
index.html	Archivo HTML base que Vite usa como punto de entrada.
jsconfig.json	Configuración de JavaScript para mejorar soporte en editores como VSCode.
package.json	Lista de dependencias, scripts y metadatos del proyecto.
package-lock.json	Registro de versiones exactas de dependencias instaladas.
postcss.config.js	Configuración para PostCSS (procesador de CSS, usado por TailwindCSS).
README.md	Documento de presentación del proyecto.
tailwind.config.js	Configuración de TailwindCSS (colores, fuentes, etc.).
tsconfig.json	Configuración principal de TypeScript.
tsconfig.app.json, tsconfig.node.json	Subconfiguraciones específicas para frontend y backend.
vite.config.js / vite.config.ts	Configuración del bundler Vite (build y dev server).
vite.config.ts.timestamp-*.mjs	Archivo temporal generado automáticamente (puede eliminarse).
🗂️ Carpeta backend/
Archivo/Carpeta	Descripción
.env	Variables de entorno para el backend.
run.py, test.py	Scripts en Python (probablemente para pruebas o utilidades).
server.ts, server.js	Servidores escritos en TypeScript/JavaScript.
config.py	Configuración general o de entorno para scripts Python.
requirements.txt	Lista de paquetes Python requeridos.
package.json, package-lock.json	Dependencias si el backend también usa Node.js.
config/	Archivos de configuración para la base de datos (database.ts y .py).
routes/	Rutas del backend (por ejemplo, endpoints en main.ts).
🗂️ Carpeta dist/

    Contiene los archivos generados tras compilar el proyecto (build).

    No se edita manualmente.

    assets/: Archivos estáticos procesados.

    images/: Copia de las imágenes usadas en la app.

🗂️ Carpeta home/project/src/

    App.tsx: Punto de entrada de la app en esta subcarpeta.

    pages/: Página QuestionPage.tsx, probablemente duplicada de src/pages.

🗂️ Carpeta public/

    Contiene imágenes estáticas accesibles públicamente (sin importar en el build).

    No se transpilan ni optimizan como los archivos de src.

🗂️ Carpeta src/ (Frontend principal)
Archivos raíz
Archivo	Descripción
App.tsx	Componente raíz principal.
index.css	Estilos globales.
main.tsx / main.js	Punto de entrada para montar la app React.
vite-env.d.ts	Tipado necesario para trabajar con Vite y TypeScript.
Componentes (src/components/)
Archivo	Descripción
ChoiceQuestion.tsx	Pregunta tipo elección.
LikertQuestion.tsx	Pregunta tipo escala Likert.
PercentageQuestion.tsx	Pregunta tipo porcentaje.
VideoRecorder.tsx	Componente para grabar video (usa Webcam API).
IntroStep.tsx, Layout.tsx, etc.	Elementos de UI reutilizables.
QuestionGroup.tsx, QuestionStep.tsx	Agrupan o gestionan lógica de flujo de preguntas.
Configuración (src/config/)

    questions.ts: Define preguntas utilizadas en los formularios.

Páginas (src/pages/)
Página	Propósito
AdminLogin.tsx, AdminDashboard.tsx	Interfaz de administración.
IntroPage.tsx, QuestionPage.tsx	Flujo del cuestionario.
ReviewPage.tsx, SuccessPage.tsx	Resultados y fin del cuestionario.
Servicios (src/services/)
Archivo	Función
api.ts	Funciones de comunicación con el backend.
auth.ts, admin.ts	Funciones relacionadas a autenticación o administración.
downloads.ts	Descarga de datos, posiblemente resultados en CSV o ZIP.
Almacenamiento (src/store/)

    formStore.ts: Store de Zustand para manejar el estado global del formulario.

Tipos (src/types/)

    index.ts: Interfaces y tipos TypeScript usados en la aplicación.


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Video Survey Application

A comprehensive video survey platform built with React, Express, and MySQL, designed for collecting and managing video responses and questionnaires.

## 🏗 Architecture Overview

### Frontend (React + TypeScript)

#### Core Technologies
- **React 18.3.1**: Modern UI framework with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Vite**: Fast, modern build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **React Router**: Client-side routing
- **React Webcam**: Video recording capabilities

#### Key Components

```
src/
├── components/         # Reusable UI components
│   ├── VideoRecorder  # Video recording functionality
│   ├── QuestionGroup  # Question rendering and management
│   └── PercentageSlider # Interactive slider component
├── pages/             # Route-based page components
├── services/          # API communication layer
├── store/             # Zustand state management
└── types/             # TypeScript type definitions
```

#### State Management
- Uses Zustand for global state
- Manages form data, videos, and session progress
- Handles auto-save and session recovery

#### Features
- Video recording with preview
- Multi-step form navigation
- Progress persistence
- Session recovery
- Admin dashboard
- Real-time progress tracking

### Backend (Express + MySQL)

#### Core Technologies
- **Express**: Node.js web framework
- **MySQL**: Relational database
- **multer**: File upload handling
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment configuration

#### Database Schema

```sql
-- Key Tables
submissions     # Stores form submissions
videos          # Stores recorded videos
answers         # Stores question responses
sessions        # Manages user sessions
users           # Admin user management
```

#### API Endpoints

```
/api
├── /submit              # Form submission
├── /sessions
│   ├── /init           # Start/resume session
│   ├── /:id/progress   # Update progress
│   ├── /:id/videos     # Save videos
│   └── /:id/answers    # Save answers
├── /admin
│   ├── /submissions    # View submissions
│   ├── /download       # Download media
│   └── /delete         # Delete submissions
└── /auth               # Authentication
```

#### Security Features
- JWT authentication
- File type validation
- CORS configuration
- Environment variable protection

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Configure environment variables:
```bash
# Backend (.env)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=video_survey
PORT=5000
FRONTEND_URL=http://localhost:5173

# Frontend (.env)
VITE_API_URL=http://localhost:5000
```

5. Initialize database:
```bash
# Run MySQL migrations
mysql -u root -p video_survey < schema.sql
```

### Development

Start backend server:
```bash
cd backend
npm run dev
```

Start frontend development server:
```bash
cd frontend
npm run dev
```

## 📦 Project Structure

```
project/
├── frontend/          # React application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── vite.config.ts # Vite configuration
├── backend/          # Express server
│   ├── routes/      # API routes
│   ├── config/      # Configuration
│   ├── app/         # Application logic
│   └── uploads/     # Media storage
└── database/        # Database migrations
```

## 🔒 Security Considerations

1. **Authentication**
   - JWT-based authentication
   - Secure password hashing
   - Session management

2. **File Upload Security**
   - File type validation
   - Size limits
   - Secure storage

3. **Database Security**
   - Prepared statements
   - Input validation
   - Transaction management

## 🔄 Session Management

The application implements a robust session management system:

1. **Session Tracking**
   - Unique session per RUT
   - Progress tracking (0-5 steps)
   - Auto-save functionality

2. **Progress States**
   - 0: Not started
   - 1: Personality questions
   - 2: Experience questions
   - 3: First video set
   - 4: Second video set
   - 5: Completed

3. **Data Persistence**
   - Automatic progress saving
   - Response overwriting protection
   - Session recovery

## 👥 User Types

1. **Survey Participants**
   - Complete video surveys
   - Save and resume progress
   - Review submissions

2. **Administrators**
   - View all submissions
   - Download media files
   - Manage user data

## 🛠 Development Guidelines

1. **Code Style**
   - ESLint configuration
   - Prettier formatting
   - TypeScript strict mode

2. **Component Structure**
   - Functional components
   - Custom hooks
   - Props typing

3. **State Management**
   - Zustand store organization
   - Action creators
   - Type safety

## 📱 Responsive Design

The application is fully responsive across devices:
- Mobile-first approach
- Tailwind breakpoints
- Flexible layouts

## 🔍 Testing

1. **Unit Tests**
   - Component testing
   - Store testing
   - API testing

2. **Integration Tests**
   - Form submission
   - Video recording
   - Session management

## 🚀 Deployment

1. **Frontend**
   - Build optimization
   - Asset compression
   - Environment configuration

2. **Backend**
   - Process management
   - Error handling
   - Logging

## 📈 Performance Optimization

1. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization

2. **Backend**
   - Connection pooling
   - Query optimization
   - Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
