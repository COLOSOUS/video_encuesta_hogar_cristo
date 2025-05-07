

Guía de Instalación y Estructura del Proyecto
Requerimientos

Para ejecutar correctamente este proyecto, es necesario contar con:

    Node.js instalado en el sistema:
    https://nodejs.org/en

    XAMPP para gestionar el servidor MySQL:
    https://www.apachefriends.org/es/index.html

También se requiere acceso al servidor privado de hosting.
Credenciales de Hosting

Usuario: victor.duran@ug.uchile.cl  
Contraseña: BlueHosting_Charo4422

El hosting dispone de las siguientes herramientas:

    Node.js Setup: para configurar y ejecutar el servidor.

    Administrador de Archivos: para subir el proyecto compilado dentro de la carpeta public_html.

    phpMyAdmin: para gestionar la base de datos MySQL.

Archivos del Proyecto
Archivos en la raíz
Archivo	Descripción
index.html	Archivo HTML base que Vite usa como punto de entrada.
jsconfig.json	Configuración de JavaScript para mejorar el soporte en editores como VSCode.
package.json	Lista de dependencias, scripts y metadatos del proyecto.
package-lock.json	Registro de versiones exactas de las dependencias instaladas.

Para instalar las dependencias, ejecutar:

npm install

Comandos útiles

    Para ejecutar el frontend en desarrollo local:

npm run dev

    Para compilar el proyecto y subirlo al servidor BlueHosting:

npm run build

Estructura de Carpetas
/backend

Contiene los archivos del servidor. Los más relevantes son:

    server.ts, server.js: código del servidor que recibe las peticiones del frontend.
    Este servidor debe ser instalado y ejecutado en el hosting.

    config/: configuración de base de datos (tanto en Python como en TypeScript).

    routes/: definición de rutas del backend (main.ts).

/dist

Carpeta generada tras ejecutar npm run build.
Esta carpeta debe subirse al hosting, incluye:

    Archivos HTML y JavaScript compilados.

    Archivos estáticos e imágenes requeridas para el funcionamiento del frontend.

/public

Contiene imágenes estáticas accesibles públicamente (no se ven afectadas por el proceso de compilación).
/src (Frontend principal)
components/
Componente	Descripción
ChoiceQuestion.tsx	Componente para preguntas de selección múltiple.
LikertQuestion.tsx	Componente para preguntas de tipo escala Likert.
PercentageQuestion.tsx	Componente para preguntas de tipo porcentaje.
VideoRecorder.tsx	Componente que permite grabar video mediante la API de la cámara.

    ⚠️ El uso de la cámara debe manejarse con cuidado, debido a posibles conflictos en distintos navegadores.

Otros componentes:
IntroStep.tsx, Layout.tsx, QuestionGroup.tsx, QuestionStep.tsx
Estos definen estructuras reutilizables y la lógica del flujo de preguntas.
config/

    questions.ts: archivo donde se definen las preguntas utilizadas en los formularios.
    Aquí se puede modificar el contenido de las preguntas con video.

pages/

Define la estructura y diseño de las distintas páginas del sistema.
Página	Función
IntroPage.tsx	Página de introducción.
QuestionPage.tsx	Página de preguntas del cuestionario.
ReviewPage.tsx	Página de revisión de respuestas.
SuccessPage.tsx	Página de finalización.
services/

    api.ts: contiene las funciones que gestionan la comunicación entre el frontend y el backend.
    Esta capa es crucial para el correcto funcionamiento del proyecto.

store/

    formStore.ts: contiene la lógica de estado global utilizando Zustand, útil para compartir datos entre componentes.

Información Adicional

Todos los archivos y recursos se encuentran dentro del hosting indicado.
Se recomienda revisar el contenido de la carpeta dist/ antes de cada subida, asegurando que el build esté actualizado.



Detalles tecnicos del proyecto
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
