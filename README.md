Los requerimientos del proyecto son tener instalado nodeJs y correr el servidor a travez de Xampp que administra el servidor MySql puede encontrar las librerias y programa requerido en :


https://nodejs.org/en 


https://www.apachefriends.org/es/index.html&ved=2ahUKEwj19eqqnpKNAxX6ppUCHbj-LDEQFnoECA0QAQ&usg=AOvVaw070QKlFA3sQkVc8GooErl2

Tambien se necesita tener acceso a el servidor privado de 

Credenciales hosting:

    User: victor.duran@ug.uchile.cl

    Pass: BlueHosting_Charo4422

para usar el Hositng se tiene:

    -Setup NodeJs para configurar el servidor
    -Administrador de archivos sonde se sube el proyecto compilado en "public_html"
    -phpAdmin para administrar la base de datos 







🗂️ Archivos del Proyecto

🗂️Archivos Raiz
Los rachivos mas relevantes son:
index.html	Archivo HTML base que Vite usa como punto de entrada.
jsconfig.json	Configuración de JavaScript para mejorar soporte en editores como VSCode.
package.json	Lista de dependencias, scripts y metadatos del proyecto.
package-lock.json	Registro de versiones exactas de dependencias instaladas.


Los modulos que se usan en "package.json" se pueden reinstalar con "npm intall"

Para poder correr el front en local se encesita el comando

    npm run dev

    
Para compilar el archivo  y subir al servidor BlueHosting se utiliza el comando

    npm run build
    

🗂️ Carpeta backend/
Archivo/Carpeta	Descripción

server.ts, server.js	Servidores escritos en JavaScript.
Acá se encuentra el servidor que se debe instalar en la pagina blue hosting y que recibe todas las peticiones desde el front.



🗂️ Carpeta dist/ 
Esta carpeta contiene las 3 cosas que deben subirse al servidor privado



🗂️ Carpeta public/

    Contiene imágenes estáticas accesibles públicamente (sin importar en el build).

    

🗂️ Carpeta src/ (Frontend principal)

Componentes (src/components/)
Archivo	Descripción
ChoiceQuestion.tsx	Pregunta tipo elección.
LikertQuestion.tsx	Pregunta tipo escala Likert.(preguntas tipo doble seleccion)
PercentageQuestion.tsx	Pregunta tipo porcentaje.(desarrollada)
VideoRecorder.tsx	Componente para grabar video (usa Webcam API).

    Esta el codigo principal de la camara la cual hay que manejar con cuidado debido a conflitos con el uso de la camara en los navegadores.

    
IntroStep.tsx, Layout.tsx, etc.	Elementos de UI reutilizables.

QuestionGroup.tsx, QuestionStep.tsx	Agrupan o gestionan lógica de flujo de preguntas.

Configuración (src/config/)

    questions.ts: Define preguntas utilizadas en los formularios. Aca se modifica el contenido de las Video Preguntas


Páginas (src/pages/)

    Aca esta el diseño de cada uno de las paginas, en la parte de preguntas 
    



IntroPage.tsx, QuestionPage.tsx	Flujo del cuestionario.
ReviewPage.tsx, SuccessPage.tsx	Resultados y fin del cuestionario.

api.ts	Funciones de comunicación con el backend.


    Acá está la parte crucial para la comunicación con el servidor, ya que se debe sincronizar el envío y la respuesta para el correcto funcionamiento del proyecto.

Otra parte importante es la definición de parámetros globales para la interacción entre el frontend y el backend.
formStore.ts: Store de Zustand para manejar el estado global del formulario.

Otros detalles a nivel usuario son las credenciales y donde se encuentra todo en el hosting:




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
