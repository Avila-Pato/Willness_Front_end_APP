import { ChallengeQuestion } from "@/types/challenges";

export type ConceptQuestion = ChallengeQuestion & { concept: string };

export const CONCEPT_QUESTIONS: ConceptQuestion[] = [
  // ── Límites ────────────────────────────────────────────────────
  {
    id: "lim1",
    concept: "Límites",
    statement:
      "Lucía le dijo a su amiga: 'No puedo ayudarte esta semana, tengo demasiado en mi plato. Podría hacer tiempo la próxima.' Su amiga lo entendió. ¿Qué tipo de límite es?",
    options: ["Límite rígido", "Falta de límite", "Límite sano", "Límite difuso"],
    correctIndex: 2,
    explanation:
      "Un límite sano comunica claramente lo que puedes y no puedes hacer, con amabilidad y sin culpa. No requiere justificaciones extensas ni agresividad.",
  },
  {
    id: "lim2",
    concept: "Límites",
    statement:
      "Carlos dice que sí a todo lo que le piden, incluso cuando sabe que no tiene tiempo ni energía. Luego se siente resentido. ¿Qué refleja este patrón?",
    options: ["Límite sano", "Generosidad extrema", "Dificultad para poner límites", "Asertividad"],
    correctIndex: 2,
    explanation:
      "Decir sí compulsivamente —aunque genere resentimiento— es señal de que los límites no están siendo comunicados. El resentimiento es frecuentemente una señal de un límite que necesita ser puesto.",
  },
  {
    id: "lim3",
    concept: "Límites",
    statement:
      "Ana siente que no puede negarse a ninguna petición de su pareja aunque eso la haga sentir mal. Si lo hace, siente una culpa enorme. ¿Qué concepto describe mejor esto?",
    options: ["Amor incondicional", "Límite difuso o ausente", "Comunicación asertiva", "Empatía"],
    correctIndex: 1,
    explanation:
      "No poder decir no sin sentir culpa intensa indica que los límites están difusos o ausentes. Los límites no son contrarios al amor; son parte de una relación sana y respetuosa.",
  },

  // ── Comunicación ───────────────────────────────────────────────
  {
    id: "com1",
    concept: "Comunicación",
    statement:
      "En una discusión, Carlos dice: 'Tú nunca me haces caso' en lugar de 'Me siento ignorado cuando no me respondes'. ¿Qué diferencia hay?",
    options: [
      "No hay diferencia real",
      "El primero es asertivo, el segundo pasivo",
      "El primero acusa; el segundo expresa sin atacar",
      "El segundo es más agresivo",
    ],
    correctIndex: 2,
    explanation:
      "El lenguaje en primera persona ('yo siento...') comunica el impacto sin acusar directamente. Genera menos defensividad y más apertura para resolver el conflicto.",
  },
  {
    id: "com2",
    concept: "Comunicación",
    statement:
      "Sofía escucha sin interrumpir, mantiene contacto visual y asiente mientras su amiga habla sobre un problema. ¿Qué práctica muestra?",
    options: ["Pasividad", "Escucha activa", "Empatía proyectada", "Comunicación pasiva"],
    correctIndex: 1,
    explanation:
      "La escucha activa implica prestar atención plena: sin interrupciones, con señales de presencia y sin preparar la respuesta mientras el otro habla. Es una de las habilidades más valoradas en las relaciones.",
  },
  {
    id: "com3",
    concept: "Comunicación",
    statement:
      "Luis no dice que está molesto pero usa el silencio y respuestas cortantes para mostrar su malestar. ¿Qué tipo de comunicación es?",
    options: [
      "Comunicación asertiva",
      "Introspección sana",
      "Comunicación pasivo-agresiva",
      "Límite verbal",
    ],
    correctIndex: 2,
    explanation:
      "La comunicación pasivo-agresiva evita el conflicto directo pero lo expresa de forma indirecta. No resuelve nada; genera tensión y distancia en las relaciones.",
  },

  // ── Autoestima ─────────────────────────────────────────────────
  {
    id: "aut1",
    concept: "Autoestima",
    statement:
      "Laura necesita que le digan constantemente que hizo bien su trabajo para sentirse competente. Sin esa validación, duda de sí misma. ¿Qué refleja?",
    options: [
      "Autoestima alta",
      "Dependencia de validación externa",
      "Autocompasión",
      "Autoevaluación objetiva",
    ],
    correctIndex: 1,
    explanation:
      "Depender de la aprobación ajena refleja una autoestima que no está anclada internamente. La autoestima sana incluye un criterio propio que no colapsa con la ausencia de elogios.",
  },
  {
    id: "aut2",
    concept: "Autoestima",
    statement:
      "Después de un error, Diego se dice: 'Soy un fracasado, nunca hago nada bien'. ¿Qué tipo de pensamiento es?",
    options: [
      "Autocrítica constructiva",
      "Autoconocimiento",
      "Autoexigencia sana",
      "Diálogo interno negativo",
    ],
    correctIndex: 3,
    explanation:
      "El diálogo interno negativo y global ('nunca', 'siempre fracaso') daña la autoestima. La autocrítica sana es específica ('en esta situación no lo hice bien') y busca aprender, no atacar.",
  },
  {
    id: "aut3",
    concept: "Autoestima",
    statement:
      "Después de un error, Ana piensa: 'Eso no estuvo bien. ¿Qué puedo hacer diferente la próxima vez?' ¿Qué muestra?",
    options: ["Autocompasión", "Autocrítica constructiva", "Negación", "Perfeccionismo"],
    correctIndex: 1,
    explanation:
      "Reconocer el error sin juzgarse globalmente y buscar aprendizaje es autocrítica constructiva. Fortalece la autoestima porque separa el error del valor propio.",
  },

  // ── Relaciones ─────────────────────────────────────────────────
  {
    id: "rel1",
    concept: "Relaciones",
    statement:
      "Camila solo se siente bien cuando está con su pareja. Cuando están separados, siente ansiedad intensa y no puede concentrarse en nada. ¿Qué concepto describe esto?",
    options: ["Amor incondicional", "Dependencia emocional", "Apego seguro", "Compatibilidad"],
    correctIndex: 1,
    explanation:
      "La dependencia emocional genera ansiedad intensa ante la ausencia de la otra persona y dificulta el funcionamiento autónomo. Es diferente del amor sano, que permite que ambas personas mantengan su identidad.",
  },
  {
    id: "rel2",
    concept: "Relaciones",
    statement:
      "Andrés y su pareja tienen conflictos, pero los resuelven hablando con respeto y llegando a acuerdos que funcionan para ambos. ¿Cómo se describe esta relación?",
    options: [
      "Relación perfecta",
      "Relación con comunicación sana",
      "Codependencia",
      "Evasión del conflicto",
    ],
    correctIndex: 1,
    explanation:
      "Los conflictos son normales en toda relación cercana. Lo que define la salud de un vínculo es cómo se gestionan: con respeto, escucha y disposición a resolver, no evitando el problema.",
  },
  {
    id: "rel3",
    concept: "Relaciones",
    statement:
      "Rosa constantemente intenta cambiar a su pareja para que sea como ella necesita que sea, en lugar de aceptarlo como es. ¿Qué dinámica se da?",
    options: ["Amor romántico", "Control en la relación", "Límite sano", "Comunicación asertiva"],
    correctIndex: 1,
    explanation:
      "Intentar controlar o cambiar a la otra persona genera resentimiento y sofoca la autonomía. El amor sano acepta a la persona tal como es, aunque establece límites sobre conductas que lastiman.",
  },

  // ── Emociones ──────────────────────────────────────────────────
  {
    id: "emo1",
    concept: "Emociones",
    statement:
      "Tomás está triste, fuerza una sonrisa y dice 'estoy bien' aunque por dentro se siente mal. ¿Qué mecanismo está usando?",
    options: [
      "Regulación emocional",
      "Represión emocional",
      "Inteligencia emocional",
      "Resiliencia",
    ],
    correctIndex: 1,
    explanation:
      "Reprimir emociones —fingir que no existen— no las elimina; las acumula. Reconocer y expresar lo que sentimos, aunque sea en un momento apropiado, es parte de la salud emocional.",
  },
  {
    id: "emo2",
    concept: "Emociones",
    statement:
      "Natalia identifica cuándo empieza a ponerse ansiosa y hace una pausa para respirar antes de responder. ¿Qué habilidad practica?",
    options: [
      "Evitación emocional",
      "Impulsividad",
      "Regulación emocional",
      "Represión",
    ],
    correctIndex: 2,
    explanation:
      "Reconocer las señales de una emoción temprano y actuar de forma consciente antes de reaccionar impulsivamente es una habilidad clave de regulación emocional.",
  },
  {
    id: "emo3",
    concept: "Emociones",
    statement:
      "El miedo que siente Miguel antes de una presentación lo lleva a prepararse mejor y estar más alerta. ¿Cómo se puede interpretar este miedo?",
    options: [
      "Ansiedad patológica",
      "Emoción adaptativa",
      "Fobia específica",
      "Trastorno de pánico",
    ],
    correctIndex: 1,
    explanation:
      "Las emociones, incluso las incómodas, cumplen funciones adaptativas. Una dosis de miedo puede aumentar el rendimiento y la preparación. Solo se convierte en problema cuando es desproporcionado o paralizante.",
  },

  // ── Mindfulness ────────────────────────────────────────────────
  {
    id: "min1",
    concept: "Mindfulness",
    statement:
      "Isabel apaga el teléfono durante el desayuno y saborea cada bocado, notando los colores y texturas sin pensar en lo que tiene que hacer después. ¿Qué práctica es?",
    options: [
      "Distracción consciente",
      "Atención plena (mindfulness)",
      "Meditación trascendental",
      "Rutina automática",
    ],
    correctIndex: 1,
    explanation:
      "El mindfulness es prestar atención deliberada al momento presente sin juzgar. No requiere meditación formal; puede aplicarse en cualquier actividad cotidiana.",
  },
  {
    id: "min2",
    concept: "Mindfulness",
    statement:
      "Felipe nota que su mente se fue al pasado mientras trabaja y gentilmente redirige su atención a lo que está haciendo ahora. ¿Qué está haciendo?",
    options: [
      "Distracción controlada",
      "Práctica de atención plena",
      "Memoria involuntaria",
      "Ansiedad",
    ],
    correctIndex: 1,
    explanation:
      "Notar que la mente divagó y regresar suavemente al presente —sin juzgarse— es la esencia del mindfulness. La mente divaga; la práctica está en el regresar.",
  },
  {
    id: "min3",
    concept: "Mindfulness",
    statement:
      "Carmen se da cuenta de que mientras su amigo habla, ella está pensando en lo que va a responder en lugar de escuchar. ¿Qué lo opuesto a esto?",
    options: [
      "Escucha con mente errante",
      "Escucha activa con atención plena",
      "Empatía proyectada",
      "Introspección",
    ],
    correctIndex: 1,
    explanation:
      "La escucha con atención plena implica estar presente en la conversación sin preparar la respuesta mientras el otro habla. Ese tipo de presencia genera una conexión más genuina.",
  },
];

// ── Preguntas Verdad / Mito por concepto ──────────────────────────────────────
const tf = (
  id: string,
  concept: string,
  statement: string,
  correctIndex: 0 | 1,
  explanation: string,
): ConceptQuestion => ({
  id,
  concept,
  type: "true_false",
  statement,
  options: ["Verdad", "Mito"],
  correctIndex,
  explanation,
});

export const CONCEPT_TF_QUESTIONS: ConceptQuestion[] = [
  // Límites
  tf("lim_tf1", "Límites",
    "Es posible poner límites con amabilidad, sin enojo ni culpa.",
    0, "Los límites sanos se comunican con calma y claridad. No necesitan agresividad ni disculpas para ser válidos."),
  tf("lim_tf2", "Límites",
    "Para que un límite sea válido, necesitas dar una explicación detallada de tus razones.",
    1, "Un límite no necesita justificarse. 'No puedo' es suficiente. Dar demasiadas explicaciones a veces abre la puerta a la negociación."),
  tf("lim_tf3", "Límites",
    "Poner límites puede mejorar la calidad de tus relaciones.",
    0, "Los límites generan relaciones más honestas y menos resentimiento. Cuando comunicas lo que puedes y no puedes, construyes vínculos más sanos."),

  // Autoestima
  tf("aut_tf1", "Autoestima",
    "La autocompasión es más efectiva que la autocrítica severa para mejorar y crecer.",
    0, "Tratar los propios errores con amabilidad —como lo harías con un amigo— genera más motivación para cambiar que la autocrítica dura, que solo produce vergüenza."),
  tf("aut_tf2", "Autoestima",
    "Tener autoestima alta significa nunca dudar de uno mismo.",
    1, "La autoestima sana no implica ausencia de dudas. Significa que puedes enfrentar la incertidumbre sin que tu valor como persona se derrumbe."),
  tf("aut_tf3", "Autoestima",
    "La autoestima puede fortalecerse a lo largo de toda la vida.",
    0, "A diferencia del CI, la autoestima es moldeable. El autoconocimiento, la terapia y las relaciones sanas pueden transformarla en cualquier etapa."),

  // Emociones
  tf("emo_tf1", "Emociones",
    "Las emociones difíciles como la tristeza o el miedo tienen información valiosa para ti.",
    0, "Todas las emociones son señales. La tristeza indica una pérdida o necesidad no cubierta; el miedo señala un peligro percibido. Ignorarlas suprime la información."),
  tf("emo_tf2", "Emociones",
    "Ignorar las emociones hace que desaparezcan más rápido.",
    1, "Las emociones ignoradas se acumulan y emergen con más intensidad. Reconocerlas y procesarlas —aunque sea brevemente— es la vía más efectiva."),
  tf("emo_tf3", "Emociones",
    "La inteligencia emocional se puede desarrollar con práctica.",
    0, "A diferencia del coeficiente intelectual, la inteligencia emocional es altamente entrenable a través de la reflexión, la terapia o el mindfulness."),

  // Comunicación
  tf("com_tf1", "Comunicación",
    "Escuchar activamente es tan importante como saber hablar en una conversación.",
    0, "La escucha activa —atención plena sin interrumpir— es fundamental para la comprensión real. Muchos problemas de comunicación vienen de no escuchar bien, no de no hablar bien."),
  tf("com_tf2", "Comunicación",
    "Ser asertivo significa imponer tu opinión sobre los demás.",
    1, "La asertividad es expresar lo que piensas y necesitas con respeto, sin agredir ni someterte. No es imposición; es comunicación honesta con cuidado del otro."),
  tf("com_tf3", "Comunicación",
    "Hablar en primera persona ('yo siento...') reduce el conflicto comparado con acusar ('tú siempre...').",
    0, "El lenguaje en primera persona genera menos defensividad en el otro y abre más espacio para resolver el problema real."),

  // Relaciones
  tf("rel_tf1", "Relaciones",
    "Los conflictos son inevitables incluso en relaciones sanas.",
    0, "El conflicto no es señal de una relación rota; es parte natural de cualquier vínculo cercano. Lo que importa es cómo se gestionan: con respeto o con daño."),
  tf("rel_tf2", "Relaciones",
    "El amor verdadero no debería requerir esfuerzo ni trabajo.",
    1, "Esta idea romántica es un mito dañino. Las relaciones sanas requieren comunicación, elecciones conscientes y esfuerzo mutuo. La facilidad permanente es ficción."),
  tf("rel_tf3", "Relaciones",
    "Sentirte solo emocionalmente es posible incluso rodeado de muchas personas.",
    0, "La soledad emocional surge de la falta de conexión significativa, no de la cantidad de personas alrededor. Extrovertidos también pueden sentirse profundamente solos."),

  // Mindfulness
  tf("min_tf1", "Mindfulness",
    "La práctica de atención plena puede reducir los niveles de estrés.",
    0, "Múltiples estudios respaldan que la práctica regular de mindfulness reduce el cortisol y mejora la respuesta al estrés crónico."),
  tf("min_tf2", "Mindfulness",
    "Practicar mindfulness requiere vaciar la mente de pensamientos.",
    1, "El mindfulness no trata de tener una mente en blanco. Se trata de observar los pensamientos sin engancharse en ellos, con curiosidad y sin juicio."),
  tf("min_tf3", "Mindfulness",
    "El mindfulness solo funciona si se practica en meditación formal sentada.",
    1, "La atención plena puede aplicarse en cualquier momento: comiendo, caminando, escuchando. La meditación formal ayuda a entrenarlo, pero no es la única forma."),
];

CONCEPT_QUESTIONS.push(...CONCEPT_TF_QUESTIONS);

export type ConceptItem = {
  id: string;
  description: string;
  color: string;
  bg: string;
};

export const CONCEPT_GROUPS: { label: string; items: ConceptItem[] }[] = [
  {
    label: "Bienestar personal",
    items: [
      { id: "Límites", description: "Define tu espacio y aprende a decir no", color: "#7C3AED", bg: "#F5F3FF" },
      { id: "Autoestima", description: "Construye una relación positiva contigo mismo", color: "#0284C7", bg: "#EFF6FF" },
      { id: "Emociones", description: "Reconoce y gestiona lo que sientes", color: "#D97706", bg: "#FFFBEB" },
    ],
  },
  {
    label: "Relaciones y comunicación",
    items: [
      { id: "Comunicación", description: "Exprésate con claridad y empatía", color: "#4D8B7A", bg: "#F0FDF4" },
      { id: "Relaciones", description: "Cultiva vínculos sanos y significativos", color: "#BE185D", bg: "#FDF2F8" },
      { id: "Mindfulness", description: "Conecta con el presente y contigo mismo", color: "#8980B8", bg: "#EEF2FF" },
    ],
  },
];

export function getQuestionsForConcepts(
  concepts: string[],
  count = 5,
): (ChallengeQuestion & { concept: string })[] {
  const pool = CONCEPT_QUESTIONS.filter((q) => concepts.includes(q.concept));
  if (pool.length === 0) return [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
