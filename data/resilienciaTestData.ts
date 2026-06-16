export type ResilienciaStyle =
  | "optimismo"
  | "adaptabilidad"
  | "autoconfianza"
  | "regulacion"
  | "conexion";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const RESILIENCIA_STYLE_META: Record<ResilienciaStyle, StyleMeta> = {
  optimismo: {
    label: "Optimismo y fortaleza",
    color: "#D97706",
    bg: "#FFFBEB",
    short: "Optimismo",
    description:
      "Tu mayor pilar de resiliencia es tu capacidad de mantener una visión positiva incluso ante la adversidad. Ves las dificultades como retos temporales, te recuperas con actitud y confías en que las cosas pueden mejorar.",
    tip: "Cultiva ese optimismo realista: la diferencia entre esperar que todo salga bien y actuar para que así sea. Compartir esa energía refuerza también los vínculos con quienes te rodean.",
  },
  adaptabilidad: {
    label: "Adaptabilidad y creatividad",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Adaptabilidad",
    description:
      "Tu resiliencia se expresa a través de la flexibilidad ante el cambio y la capacidad de encontrar soluciones creativas. Te adaptas con fluidez a las novedades, aprendes de los errores y no te bloqueas cuando las cosas no salen como esperabas.",
    tip: "Ante cada obstáculo, pregúntate: ¿qué hay en esta situación que todavía no he considerado? A veces las limitaciones abren caminos inesperados.",
  },
  autoconfianza: {
    label: "Autoconfianza y autonomía",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Autoconfianza",
    description:
      "Tu pilar de resiliencia es la confianza en ti mismo/a: tienes claro quién eres, puedes tomar decisiones bajo presión y no te dejas arrastrar fácilmente por las circunstancias. Esa seguridad interior es una base sólida para cualquier adversidad.",
    tip: "Recuerda que la autoconfianza no es ausencia de dudas — es actuar a pesar de ellas. Cada decisión difícil que tomas refuerza esa base.",
  },
  regulacion: {
    label: "Regulación emocional",
    color: "#9333EA",
    bg: "#FAF5FF",
    short: "Regulación",
    description:
      "Tu resiliencia destaca por tu capacidad de gestionar las emociones difíciles: sabes esperar el momento adecuado, no te dejas llevar por los impulsos y eres capaz de recuperarte emocionalmente con relativa rapidez.",
    tip: "La regulación emocional es un músculo: cuanto más la practicas, más natural se vuelve. La pausa antes de responder y el movimiento físico como válvula de escape son dos herramientas muy efectivas.",
  },
  conexion: {
    label: "Red de apoyo y empatía",
    color: "#BE185D",
    bg: "#FDF2F8",
    short: "Conexión",
    description:
      "Tu fortaleza resiliente está en las personas: tienes vínculos de confianza, sabes pedir ayuda, te importan los demás y construyes relaciones cálidas. La conexión social es uno de los factores de resiliencia más poderosos que existen.",
    tip: "Recurrir a tu red cuando las cosas se ponen difíciles no es debilidad — es inteligencia emocional. Y ofrecerte tú también como apoyo fortalece esos lazos de manera recíproca.",
  },
};

export const RESILIENCIA_STYLE_ORDER: ResilienciaStyle[] = [
  "optimismo",
  "adaptabilidad",
  "autoconfianza",
  "regulacion",
  "conexion",
];

type ResilienciaQuestion = {
  id: string;
  text: string;
  style: ResilienciaStyle;
  reversed?: boolean;
};

export const RESILIENCIA_QUESTIONS: ResilienciaQuestion[] = [
  { id: "rs_01", text: "Habitualmente soy optimista: considero que las dificultades son retos temporales y creo que las cosas saldrán bien.", style: "optimismo" },
  { id: "rs_02", text: "En un momento de crisis o situación caótica, me tranquilizo y me centro en las acciones útiles que puedo emprender.", style: "adaptabilidad" },
  { id: "rs_03", text: "Me siento seguro en el entorno en que vivo y trabajo.", style: "autoconfianza" },
  { id: "rs_04", text: "Soy capaz de dar mi opinión, aunque ésta no coincida con las personas de las que dependo.", style: "autoconfianza" },
  { id: "rs_05", text: "Puedo delegar con confianza en otros sin sentir la necesidad de controlar constantemente si lo que hacen es lo correcto.", style: "autoconfianza" },
  { id: "rs_06", text: "Me inquieta el futuro y recuerdo más lo negativo que lo positivo.", style: "optimismo", reversed: true },
  { id: "rs_07", text: "Habitualmente me siento contento cuando me esfuerzo por lograr mis objetivos, aunque tenga que superar obstáculos.", style: "optimismo" },
  { id: "rs_08", text: "En mi trabajo puedo tolerar niveles elevados de incertidumbre y ambigüedad sin bloquear mi rendimiento.", style: "adaptabilidad" },
  { id: "rs_09", text: "Me adapto rápidamente a las novedades sorteando los reveses y dificultades sin que me suponga malestar psicológico.", style: "adaptabilidad" },
  { id: "rs_10", text: "Tengo la costumbre de aprender de mis aciertos y errores, sabiendo que no siempre ni todo tiene que salirme bien.", style: "adaptabilidad" },
  { id: "rs_11", text: "Soy una persona con buen autoconcepto y segura de sí misma.", style: "autoconfianza" },
  { id: "rs_12", text: "Pienso que, en general, tengo una vida satisfactoria y me siento feliz.", style: "optimismo" },
  { id: "rs_13", text: "Soy responsable y tengo voluntad para llevar hasta el final los proyectos superando las dificultades o el poco reconocimiento.", style: "autoconfianza" },
  { id: "rs_14", text: "Puedo decir que soy un modelo positivo para otras personas.", style: "autoconfianza" },
  { id: "rs_15", text: "Puedo cambiar de opinión cuando lo veo razonable y no pienso que actuar así vulnera mi reputación.", style: "adaptabilidad" },
  { id: "rs_16", text: "Cuando siento soledad o incomprensión, puedo racionalizar ese sentimiento para que no me afecte en la conducta.", style: "regulacion" },
  { id: "rs_17", text: "Pienso que mi familia siempre me apoya.", style: "conexion" },
  { id: "rs_18", text: "Soy capaz de recuperarme emocionalmente del fracaso y las adversidades en un corto plazo de tiempo.", style: "regulacion" },
  { id: "rs_19", text: "Soy capaz de sonreír aunque tenga el alma dolorida.", style: "optimismo" },
  { id: "rs_20", text: "Soy creativo/a y me gusta intentar nuevas maneras de hacer las cosas.", style: "adaptabilidad" },
  { id: "rs_21", text: "Con frecuencia me siento inquieto/a, impaciente y tenso/a, con dificultad para descansar y disfrutar.", style: "regulacion", reversed: true },
  { id: "rs_22", text: "Procuro resolver los problemas pensando en soluciones creativas y prácticas sin esperar que el tiempo arregle los conflictos.", style: "adaptabilidad" },
  { id: "rs_23", text: "Soy eficiente organizando y resolviendo situaciones, por lo que a veces me piden que gestione proyectos.", style: "autoconfianza" },
  { id: "rs_24", text: "Los cambios me incomodan y estresan hasta que compruebo resultados positivos.", style: "adaptabilidad", reversed: true },
  { id: "rs_25", text: "A menudo me dejo influir por el ambiente y las personas que me rodean, dejando de lado mis propios deseos.", style: "adaptabilidad", reversed: true },
  { id: "rs_26", text: "Me gusta tener libertad para desarrollar mis tareas y decidir cómo llevarlas a cabo en cada situación.", style: "autoconfianza" },
  { id: "rs_27", text: "Cuando me enfrento a una situación incómoda o ridícula, soy capaz de utilizar el humor y reírme de mí mismo/a.", style: "regulacion" },
  { id: "rs_28", text: "Tengo seguridad para tomar decisiones y contagio esa seguridad a los demás.", style: "autoconfianza" },
  { id: "rs_29", text: "Siento que no tengo personas de confianza a quienes recurrir cuando tengo problemas.", style: "conexion", reversed: true },
  { id: "rs_30", text: "Procuro escuchar y conocer los intereses de los demás para tratar de conciliar mis objetivos con los del otro.", style: "conexion" },
  { id: "rs_31", text: "Me siento cómodo/a con distintos tipos de personas y no tiendo a prejuzgar sus intenciones o apariencias.", style: "conexion" },
  { id: "rs_32", text: "Me siento capaz de afrontar los momentos difíciles confiando en mi capacidad de superación.", style: "autoconfianza" },
  { id: "rs_33", text: "Tengo habilidad para motivar a otros en el trabajo implicándolos en el proyecto.", style: "conexion" },
  { id: "rs_34", text: "Me gusta apoyar a otros cuando tienen problemas.", style: "conexion" },
  { id: "rs_35", text: "Soy capaz de ser eficaz en mi trabajo aunque esté bajo mucha presión.", style: "autoconfianza" },
  { id: "rs_36", text: "Me he hecho más fuerte y he mejorado a partir de experiencias difíciles.", style: "optimismo" },
  { id: "rs_37", text: "Hay veces que persigo el éxito personal por encima de los sentimientos de otras personas.", style: "conexion", reversed: true },
  { id: "rs_38", text: "Soy constante en buscar el equilibrio personal, familiar y laboral.", style: "regulacion" },
  { id: "rs_39", text: "En el trabajo me gusta establecer relaciones de amistad y dedico tiempo a conocer las circunstancias personales de mis compañeros.", style: "conexion" },
  { id: "rs_40", text: "Si pudiera, cambiaría muchas cosas de mí mismo/a.", style: "optimismo", reversed: true },
  { id: "rs_41", text: "Cuando alguien critica mi trabajo no tolero la frustración que me produce.", style: "regulacion", reversed: true },
  { id: "rs_42", text: "Soy capaz de aguantar mi necesidad de desahogo si considero que ese no es el momento oportuno.", style: "regulacion" },
  { id: "rs_43", text: "Tengo amigos con los que puedo hablar y expresar mis sentimientos, pidiéndoles ayuda cuando lo necesito.", style: "conexion" },
  { id: "rs_44", text: "Cumplo lo que prometo y no me dejo llevar frecuentemente por los impulsos del momento aunque me desvíen de mis objetivos.", style: "regulacion" },
  { id: "rs_45", text: "Cuando supero una adversidad, aprendo a mejorar con la experiencia aunque haya sido negativa.", style: "regulacion" },
  { id: "rs_46", text: "Me cuesta enfrentarme a las consecuencias que en el futuro pueda tener una decisión actual.", style: "autoconfianza", reversed: true },
  { id: "rs_47", text: "Me siento más capaz de hacer un gran esfuerzo un día que de mantener pequeños esfuerzos a diario.", style: "regulacion", reversed: true },
  { id: "rs_48", text: "Sé responder sin agresividad cuando alguien ironiza o hace bromas sobre mí.", style: "regulacion" },
  { id: "rs_49", text: "Cuando algo sale mal, me vence la tendencia de dar vueltas y buscar culpables en vez de resolver el problema cuanto antes.", style: "adaptabilidad", reversed: true },
  { id: "rs_50", text: "Siento que me falta tiempo y genero ansiedad por mi tendencia a dejar las tareas para más tarde.", style: "regulacion", reversed: true },
];

export function computeResilienciaResult(answers: Record<string, number>): {
  primary: ResilienciaStyle;
  averages: Record<ResilienciaStyle, number>;
} {
  const sums: Record<ResilienciaStyle, number> = {
    optimismo: 0, adaptabilidad: 0, autoconfianza: 0, regulacion: 0, conexion: 0,
  };
  const counts: Record<ResilienciaStyle, number> = {
    optimismo: 0, adaptabilidad: 0, autoconfianza: 0, regulacion: 0, conexion: 0,
  };

  for (const q of RESILIENCIA_QUESTIONS) {
    let val = answers[q.id];
    if (val !== undefined) {
      if (q.reversed) val = 6 - val;
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<ResilienciaStyle, number>;
  for (const style of RESILIENCIA_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = RESILIENCIA_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
