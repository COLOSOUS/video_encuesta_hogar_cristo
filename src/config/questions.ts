import { QuestionGroup } from '../types';  // Importar el tipo correcto
// Aquí defines los rasgos de personalidad, como ya lo tenías
const personalityTraits = [
  ['  Amable  ', '  Persuasivo  ', '  Humilde  ', '  Original  '],
  ['  Atractivo/a  ', '  Tímido  ', '  Obstinado  ', '  Dulce  '],
  ['  Muy influenciable  ', '  Resuelto/a  ', '  Leal  ', '  Encantador  '],
  ['  Imparcial  ', '  Complaciente  ', '  Determinado/a  ', '  De buen humor  '],
  ['  Jovial  ', '  Preciso/a  ', '  Nervioso/a  ', '  Ecuánime  '],
  ['  Competidor/a  ', '  Considerado/a  ', '  Divertido/a  ', '  Armonioso/a  '],
  ['  Exigente  ', '  Obediente  ', '  Indomable  ', '  Juguetón  '],
  ['  Valiente  ', '  Inspirador/a  ', '  Sumiso/a  ', '  Tímido/a  '],
  ['  Sociable  ', '  Paciente  ', '  Seguro de sí  ', '  De voz suave  '],
  ['  Aventurero  ', '  Receptivo/a  ', '  Cordial  ', '  Moderado/a  '],
  ['  Hablador/a  ', '  Dominio sobre sí  ', '  Convencional  ', '  Decisivo/a  '],
  ['  Refinado  ', '  Atrevido/a  ', '  Diplomático/a  ', '  Satisfecho/a  '],
  ['  Agresivo/a  ', '  Alma de la fiesta  ', '  Crédulo  ', '  Miedoso/a  '],
  ['  Cauteloso/a  ', '  Resuelto/a  ', '  Convincente  ', '  Afable  '],
  ['  Dispuesto/a  ', '  Ansioso/a  ', '  Agradable  ', '  Animoso/a  '],
  ['  Lleno/a de confianza  ', '  Compasivo/a  ', '  Tolerante  ', '  Enérgico/a  '],
  ['  Disciplinado/a  ', '  Generoso/a  ', '  Vivaz  ', '  Persistente  '],
  ['  Admirable  ', '  Bondadoso/a  ', '  Resignado/a  ', '  Imperioso/a  '],
  ['  Respetuoso/a  ', '  Pionero/a  ', '  Optimista  ', '  Servicial  '],
  ['  Argumentador/a  ', '  Adaptable  ', '  Indiferente  ', '  Alegre  '],
  ['  Confiado/a  ', '  Satisfecho/a  ', '  Seguro/a  ', '  Pacífico  '],
  ['  Llevarse bien  ', '  Culto/a  ', '  Vigoroso/a  ', '  Indulgente  '],
  ['  Simpático  ', '  Exacto/a  ', '  Franco/a  ', '  Comedido  '],
  ['  Inquieto/a  ', '  Amistoso/a  ', '  Popular  ', '  Piadoso/a  '],
];

// Ahora definimos los grupos de preguntas con sus configuraciones
export const questionGroups: QuestionGroup[] = [
    
  {
    id: 'video1',
    title: 'Simulación de Captación - Parte 1',
    description: '',
    questions: [
      {
        id: 'video1',
        type: 'video',
        label: ' Ves a esta pareja en la calle.\\n ¿Qué le dirías para que se detenga a escucharte? \\n \\n Piensa un momento tu respuesta y luego graba.        Graba como si le fueras a hablar a ella directamente.\\n Tu respuesta puede durar lo que estimes conveniente para lograr que la persona se detenga a escucharte.',
        imageUrl: '/images/imagen5.png',
        groupId: 'video1'
      }
    ]
  },
  {
    id: 'video2',
    title: 'Simulación de Captación - Parte 2',
    description: '',
    questions: [
      {
        id: 'video2',
        type: 'video',
        label:    '¿Qué les dirías para que se detengan a escucharte?\\n Piensa un momento tu respuesta y luego grábala. \\n \\n Piensa un momento tu respuesta y luego grábala.\\n Graba como si les fueras a hablar a ellos directamente.\\n Tu respuesta puede durar lo que estimes conveniente para lograr que la pareja se detenga a escucharte. ',
          imageUrl: '/images/imagen6.png',
        groupId: 'video2'
      }
    ]
  },
  {
    id: 'video3',
    title: 'Simulación de Captación - Parte 3',
    description: '',
    questions: [
      {
        id: 'video3',
        type: 'video',
        label: 'Imagina que ya lograste que esta persona se detuviera a escucharte. Ahora debes hablarle para persuadirla para que se haga socia del Hogar.\\n \\n Piensa un momento tu respuesta y luego grábala.\\nGraba como si le fueras a hablar a ella directamente.\\n Tu respuesta puede durar lo que estimes conveniente para lograr que la persona se detenga a escucharte.',
        imageUrl: '/images/imagen1.jpg',
        groupId: 'video3'
      }
    ]
  },
  {
    id: 'video4',
    title: 'Simulación de Captación - Parte 4',
    description: '',
    questions: [
      {
        id: 'video4',
        type: 'video',
        label: 'Imagina que ya lograste que esta persona se detuviera a escucharte. Ahora debes hablarle para persuadirla para que se haga socia del Hogar.\\n \\n Piensa un momento tu respuesta y luego grábala.\\n Graba como si le fueras a hablar a ella directamente.\\n Tu respuesta puede durar lo que estimes conveniente para lograr que la persona se detenga a escucharte.',
        imageUrl: '/images/imagen3.jpg',
        groupId: 'video4'
      }
    ]
  },
  
  {
    id: 'experience',
    title: 'Experiencia en Captación',
    description: '',
    questions: [
      {
        id: 'tactics_percentage',
        type: 'percentage',
        label: `¿Qué porcentaje de las tácticas/estrategias para captar socios has desarrollado tú mismo 
              (es decir, a través de tu propia experiencia) en comparación a lo que has aprendido de 
              otras personas en el Hogar De Cristo? (supervisores u otros captadores)`, groupId: 'experience'
      }
    ]
  },
  {
    id: 'personality',
    title: 'Evaluación de Personalidad',
    description: 'Se te presentarán 24 grupos de cuatro palabras cada uno. \\n En cada grupo, debes escoger dos palabras: \\n La que más te representa, marcándola en la columna "Más". \\n La que menos te representa, marcándola en la columna "Menos". \\n No hay respuestas correctas ni incorrectas.',
    questions: personalityTraits.map((traits, index) => ({
      id: `trait_${index + 1}`,
      type: 'choice',
      label: '¿Cuál de estas palabras te describe mejor?',
      options: traits,
      groupId: 'personality'
    }))
  }
  
  // El resto de los grupos de preguntas se mantienen igual
];

export const questions = questionGroups.flatMap(group => group.questions);