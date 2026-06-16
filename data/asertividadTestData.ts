export type AsertividadStyle = "asertivo" | "pasivo" | "analitico" | "empatico";

export type AsertividadQuestion = {
  id: string;
  text: string;
  style: AsertividadStyle;
};

export type AsertividadStyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const ASERTIVIDAD_STYLE_META: Record<AsertividadStyle, AsertividadStyleMeta> = {
  asertivo: {
    label: "Comunicación asertiva",
    short: "Asertivo",
    color: "#059669",
    bg: "#F0FDF4",
    description:
      "Te expresas con claridad y seguridad. Sabes lo que quieres y lo comunicas de forma directa sin agredir. Eres socialmente activo y te resulta natural hablar por ti mismo y ocupar espacio en las conversaciones.",
    tip: "Aprovecha tu capacidad de expresión para conectar y liderar. Asegúrate de reservar espacio para escuchar profundamente antes de responder.",
  },
  pasivo: {
    label: "Comunicación pasiva",
    short: "Pasivo",
    color: "#DC2626",
    bg: "#FEF2F2",
    description:
      "Eres reflexivo y consideras mucho a los demás, pero a veces te cuesta expresar tus propias necesidades. Puedes suprimir lo que piensas o sientes para evitar el conflicto o el rechazo.",
    tip: "Practicar la expresión de tus necesidades en situaciones de bajo riesgo puede ayudarte a fortalecer tu voz. El desacuerdo no tiene por qué romper la relación.",
  },
  analitico: {
    label: "Estilo analítico",
    short: "Analítico",
    color: "#0284C7",
    bg: "#E0F2FE",
    description:
      "Eres lógico, estructurado y orientado a resultados. Valoras la eficiencia y la independencia. Tu comunicación es precisa y directa en los temas que te importan.",
    tip: "Tu fortaleza está en la claridad y el análisis. Integrar más atención a las emociones —propias y ajenas— puede potenciar tu impacto en las relaciones.",
  },
  empatico: {
    label: "Estilo empático",
    short: "Empático",
    color: "#BE185D",
    bg: "#FDF2F8",
    description:
      "Eres cálido, comprensivo y flexible. Conectas profundamente con las emociones de los demás y priorizas el bienestar relacional por encima de imponer tu punto de vista.",
    tip: "Tu inteligencia emocional es una fortaleza. Trabajar en defender tus propias necesidades con la misma energía que das a los demás puede equilibrar tus vínculos.",
  },
};

export const ASERTIVIDAD_QUESTIONS: AsertividadQuestion[] = [
  { id: "as_01", style: "asertivo",   text: "Te resulta fácil hacer nuevos amigos." },
  { id: "as_02", style: "analitico",  text: "Podrías pasar días aprendiendo sobre cosas aleatorias que te interesan." },
  { id: "as_03", style: "empatico",   text: "Cuando los demás están tristes, tú también te sientes triste." },
  { id: "as_04", style: "asertivo",   text: "No eres de los que tienen planes de respaldo." },
  { id: "as_05", style: "asertivo",   text: "Te mantienes fresco, tranquilo y sereno incluso cuando estás bajo mucho estrés." },
  { id: "as_06", style: "pasivo",     text: "Cuando estás fuera de casa, no sueles presentarte a gente nueva, prefieres charlar con gente que ya conoces." },
  { id: "as_07", style: "analitico",  text: "No te gusta empezar un nuevo proyecto hasta que el primero esté terminado." },
  { id: "as_08", style: "empatico",   text: "Eres una persona sentimental." },
  { id: "as_09", style: "analitico",  text: "Te gusta usar listas y horarios." },
  { id: "as_10", style: "pasivo",     text: "Cometer un pequeño error puede hacer que cuestiones tus conocimientos sobre un tema." },
  { id: "as_11", style: "asertivo",   text: "Inicias fácilmente una conversación con un desconocido." },
  { id: "as_12", style: "analitico",  text: "Te encanta hablar y analizar obras creativas." },
  { id: "as_13", style: "empatico",   text: "Sigues más a tu corazón que a tu cabeza." },
  { id: "as_14", style: "analitico",  text: "Tiendes a preferir seguir una rutina diaria en lugar de simplemente hacer lo que sea." },
  { id: "as_15", style: "pasivo",     text: "Cuando conoces gente nueva, te preocupa si has causado una buena primera impresión." },
  { id: "as_16", style: "pasivo",     text: "Prefieres las actividades a solas a las actividades en grupo." },
  { id: "as_17", style: "analitico",  text: "Te encanta ver películas que te permitan interpretar el final tú mismo." },
  { id: "as_18", style: "analitico",  text: "Obtienes más felicidad al lograr cosas por ti mismo que al ayudar a los demás." },
  { id: "as_19", style: "pasivo",     text: "No te interesan muchas cosas." },
  { id: "as_20", style: "pasivo",     text: "A menudo te preocupas por el peor escenario posible en cualquier situación dada." },
  { id: "as_21", style: "asertivo",   text: "Te encanta asumir roles de liderazgo." },
  { id: "as_22", style: "empatico",   text: "Eres una persona de tipo artístico." },
  { id: "as_23", style: "empatico",   text: "El mundo estaría mejor si la gente tomara más decisiones con sus sentimientos." },
  { id: "as_24", style: "pasivo",     text: "Prefieres relajarte antes de ponerte a hacer tareas." },
  { id: "as_25", style: "asertivo",   text: "No te importa que otras personas tengan una discusión tensa delante de ti." },
  { id: "as_26", style: "asertivo",   text: "Te gusta ser el centro de atención." },
  { id: "as_27", style: "asertivo",   text: "Tu estado de ánimo es generalmente bastante estable." },
  { id: "as_28", style: "empatico",   text: "Tienes mucha paciencia con las personas que no son tan eficientes como tú." },
  { id: "as_29", style: "asertivo",   text: "Eres espontáneo." },
  { id: "as_30", style: "analitico",  text: "Siempre te ha fascinado la pregunta de qué pasa, si es que pasa algo, después de la muerte." },
  { id: "as_31", style: "pasivo",     text: "Prefieres estar solo que con otros." },
  { id: "as_32", style: "analitico",  text: "Te encantan los debates teóricos y podrías participar en ellos durante días." },
  { id: "as_33", style: "analitico",  text: "Te cuesta empatizar con personas que tienen un estilo de vida muy diferente al tuyo." },
  { id: "as_34", style: "asertivo",   text: "Cuando hay que tomar una decisión, quieres tomarla de inmediato." },
  { id: "as_35", style: "pasivo",     text: "Tiendes a dudar de las decisiones que tomas." },
  { id: "as_36", style: "pasivo",     text: "Socializar te agota rápidamente." },
  { id: "as_37", style: "empatico",   text: "Disfrutas ir a museos de arte." },
  { id: "as_38", style: "analitico",  text: "Te cuesta entender lo que sienten los demás." },
  { id: "as_39", style: "analitico",  text: "Te gusta tener una lista de tareas para cada día." },
  { id: "as_40", style: "pasivo",     text: "A menudo te sientes inseguro." },
  { id: "as_41", style: "asertivo",   text: "Prefieres hablar con la gente por teléfono que enviarles mensajes de texto." },
  { id: "as_42", style: "empatico",   text: "Cuando alguien tiene una perspectiva diferente a la tuya sobre un tema, intentas genuinamente entender su punto de vista." },
  { id: "as_43", style: "asertivo",   text: "Crees que decir la cruda verdad es más importante que ser discreto." },
  { id: "as_44", style: "asertivo",   text: "Te adaptas bien cuando tus planes se ven interrumpidos." },
  { id: "as_45", style: "pasivo",     text: "Te sientes con energía después de pasar tiempo a solas, realizando actividades solitarias como leer o reflexionar." },
  { id: "as_46", style: "asertivo",   text: "Prefieres confiar en tus instintos en lugar de aferrarte estrictamente a un plan o horario establecido." },
  { id: "as_47", style: "analitico",  text: "A menudo te encuentras contemplando profundamente los significados e implicaciones reales de las cosas en lugar de centrarte únicamente en los detalles superficiales." },
  { id: "as_48", style: "analitico",  text: "Al tomar decisiones, priorizas la lógica y el análisis objetivo por encima de considerar cómo podría afectar a los sentimientos de los demás." },
  { id: "as_49", style: "pasivo",     text: "A menudo te preocupas por los posibles resultados futuros o por lo que podría salir mal en una situación dada, incluso si las cosas parecen ir bien en este momento." },
  { id: "as_50", style: "asertivo",   text: "A menudo te sientes atraído por nuevas experiencias y disfrutas explorando lugares desconocidos o probando nuevas actividades." },
  { id: "as_51", style: "asertivo",   text: "Tiendes a confiar en tus instintos y en tu intuición cuando te enfrentas a decisiones difíciles, en lugar de basarte únicamente en el análisis lógico." },
  { id: "as_52", style: "empatico",   text: "Sientes una gran empatía hacia los demás y a menudo te afectan sus emociones, incluso si no te involucran directamente." },
  { id: "as_53", style: "analitico",  text: "Prefieres tener un plan bien estructurado en lugar de dejar las cosas al azar o a la improvisación." },
  { id: "as_54", style: "asertivo",   text: "Prosperas en entornos dinámicos y de ritmo rápido, y te sientes revitalizado por situaciones desafiantes que requieren rapidez mental y adaptabilidad." },
  { id: "as_55", style: "analitico",  text: "Cuando te enfrentas a un problema, te inclinas más por buscar soluciones prácticas que por detenerte en teorías abstractas o escenarios hipotéticos." },
  { id: "as_56", style: "empatico",   text: "Disfrutas participando en conversaciones profundas y significativas con otros, explorando ideas complejas e intercambiando perspectivas." },
  { id: "as_57", style: "empatico",   text: "A menudo te encuentras reflexionando sobre experiencias pasadas y considerando cómo han moldeado tus creencias y valores." },
  { id: "as_58", style: "asertivo",   text: "Tiendes a tomar el mando en entornos grupales, asumiendo roles de liderazgo y guiando a otros hacia el logro de objetivos comunes." },
  { id: "as_59", style: "analitico",  text: "Te sientes más cómodo cuando tu entorno está organizado y estructurado, y puedes sentirte estresado o inquieto en situaciones caóticas o impredecibles." },
  { id: "as_60", style: "pasivo",     text: "Prefieres pasar tiempo con un pequeño grupo de amigos cercanos en lugar de asistir a grandes reuniones sociales." },
  { id: "as_61", style: "empatico",   text: "Cuando se te presentan múltiples opciones, tiendes a seguir a tu corazón y a tomar decisiones basadas en lo que se siente bien en el momento." },
  { id: "as_62", style: "analitico",  text: "Disfrutas explorando nuevas ideas y conceptos, a menudo buscando oportunidades para ampliar tu conocimiento y comprensión del mundo." },
  { id: "as_63", style: "asertivo",   text: "Te resulta fácil adaptarte a los cambios de planes o a las situaciones inesperadas, a menudo viéndolos como oportunidades de crecimiento y aprendizaje." },
  { id: "as_64", style: "analitico",  text: "Cuando trabajas en un proyecto, valoras la eficiencia y te esfuerzas por completar las tareas de forma rápida y eficaz." },
  { id: "as_65", style: "asertivo",   text: "A menudo buscas oportunidades para desafiarte a ti mismo y superar tus límites, ya sea a través de actividades físicas o intelectuales." },
  { id: "as_66", style: "asertivo",   text: "Prefieres centrarte en el momento presente en lugar de recrearte en remordimientos pasados o preocuparte por incertidumbres futuras." },
  { id: "as_67", style: "asertivo",   text: "Disfrutas participando en debates y discusiones, compartiendo tus opiniones y perspectivas con los demás, al tiempo que escuchas diferentes puntos de vista." },
  { id: "as_68", style: "analitico",  text: "Tienes un fuerte deseo de estructura y orden en tu vida diaria, sintiéndote más a gusto cuando sigues una rutina o un horario claro." },
  { id: "as_69", style: "asertivo",   text: "Tiendes a ser proactivo en la búsqueda de nuevas experiencias y oportunidades, abrazando el cambio como una parte natural de la vida." },
  { id: "as_70", style: "asertivo",   text: "Te sientes con energía y entusiasmo por las interacciones sociales, a menudo buscando oportunidades para conocer gente nueva y participar en actividades grupales." },
  { id: "as_71", style: "analitico",  text: "Al tomar decisiones, priorizas el razonamiento lógico y el análisis objetivo, considerando los hechos y la evidencia antes de llegar a una conclusión." },
  { id: "as_72", style: "pasivo",     text: "Tiendes a ser muy autocrítico e introspectivo, reflexionando frecuentemente sobre tus acciones y decisiones, y esforzándote por mejorar." },
  { id: "as_73", style: "empatico",   text: "A menudo te encuentras empatizando con las emociones de los demás, incluso si no has experimentado la misma situación, y te esfuerzas por ofrecer apoyo y comprensión." },
  { id: "as_74", style: "analitico",  text: "Prefieres tener un plan y una dirección claros en la vida, estableciendo metas específicas y trabajando diligentemente para alcanzarlas." },
];

export function computeAsertividadResult(answers: Record<string, number>) {
  const sums: Record<AsertividadStyle, number> = { asertivo: 0, pasivo: 0, analitico: 0, empatico: 0 };
  const counts: Record<AsertividadStyle, number> = { asertivo: 0, pasivo: 0, analitico: 0, empatico: 0 };

  for (const q of ASERTIVIDAD_QUESTIONS) {
    const score = answers[q.id];
    if (score === undefined) continue;
    sums[q.style] += score;
    counts[q.style]++;
  }

  const averages: Record<AsertividadStyle, number> = { asertivo: 0, pasivo: 0, analitico: 0, empatico: 0 };
  for (const style of Object.keys(sums) as AsertividadStyle[]) {
    averages[style] = counts[style] > 0 ? Math.round((sums[style] / counts[style]) * 10) / 10 : 0;
  }

  const primary = (Object.entries(averages).sort(([, a], [, b]) => b - a)[0][0]) as AsertividadStyle;

  return { averages, primary };
}
