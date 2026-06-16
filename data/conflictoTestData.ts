export type ConflictoStyle =
  | "competidor"
  | "colaborador"
  | "comprometido"
  | "evasivo"
  | "complaciente";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const CONFLICTO_STYLE_META: Record<ConflictoStyle, StyleMeta> = {
  competidor: {
    label: "Competidor",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Competidor",
    description:
      "En el conflicto tiendes a defender tu posición con firmeza y apuntas a ganar. Eres directo, decidido y no renuncias fácilmente a tus objetivos. Esto puede ser muy efectivo en situaciones críticas, aunque puede desgastar las relaciones si es tu único modo.",
    tip: "Practica escuchar las necesidades del otro antes de exponer las tuyas. Ganar la discusión no siempre significa ganar en la relación.",
  },
  colaborador: {
    label: "Colaborador",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Colaborador",
    description:
      "Buscas soluciones donde todos ganen. Inviertes tiempo en entender las preocupaciones del otro y en encontrar respuestas creativas. Es el estilo más constructivo para conflictos complejos donde la relación importa.",
    tip: "No todas las situaciones requieren una solución perfecta. A veces el tiempo y la energía que inviertes en colaborar pueden no ser proporcionales al problema.",
  },
  comprometido: {
    label: "Comprometido",
    color: "#D97706",
    bg: "#FFFBEB",
    short: "Comprometido",
    description:
      "Buscas un punto medio donde todos ceden algo y ganan algo. Valoras la equidad y la practicidad por encima del perfeccionismo. Es una estrategia útil cuando el tiempo apremia o el acuerdo total no es posible.",
    tip: "Asegúrate de que el compromiso no sea siempre tu primera respuesta. Algunas situaciones merecen que defiendas tus necesidades completamente o que exploren una solución más creativa.",
  },
  evasivo: {
    label: "Evasivo",
    color: "#6B7280",
    bg: "#F9FAFB",
    short: "Evasivo",
    description:
      "Tiendes a esquivar el conflicto, posponer la confrontación o no tomar partido. Esto puede ser prudente para temas triviales o cuando el momento no es el adecuado, pero a largo plazo acumula tensiones sin resolver.",
    tip: "Practica identificar cuándo evitar el conflicto es estratégico y cuándo es solo evitar el malestar. Hablar a tiempo suele ser más fácil que hacerlo cuando la situación ya escala.",
  },
  complaciente: {
    label: "Complaciente",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Complaciente",
    description:
      "Priorizas la relación y el bienestar del otro sobre tus propios intereses. Este estilo puede ser generoso y construir confianza, pero si lo usas sistemáticamente, corres el riesgo de silenciar tus propias necesidades.",
    tip: "Cuidar la relación no exige renunciar a lo que necesitas. Practica expresar tu posición antes de ceder, incluso si al final decides aceptar la del otro.",
  },
};

export const CONFLICTO_STYLE_ORDER: ConflictoStyle[] = [
  "colaborador",
  "comprometido",
  "complaciente",
  "evasivo",
  "competidor",
];

type ConflictoQuestion = { id: string; text: string; style: ConflictoStyle };

export const CONFLICTO_QUESTIONS: ConflictoQuestion[] = [
  // Situación 1
  { id: "cf_01", text: "Hay oportunidades en que dejo que otros asuman la responsabilidad para resolver el problema.", style: "evasivo" },
  { id: "cf_02", text: "En vez de negociar los puntos en desacuerdo, trato de enfatizar los aspectos en que concordamos.", style: "complaciente" },
  // Situación 2
  { id: "cf_03", text: "Trato de buscar una solución de compromiso.", style: "comprometido" },
  { id: "cf_04", text: "Trato de tomar en cuenta todos los puntos que me preocupan a mí y al otro.", style: "colaborador" },
  // Situación 3
  { id: "cf_05", text: "Habitualmente, soy decidido para lograr mis objetivos.", style: "competidor" },
  { id: "cf_06", text: "Puedo tratar de limar las asperezas y mantener la relación.", style: "complaciente" },
  // Situación 4
  { id: "cf_07", text: "Trato de encontrar una solución de compromiso.", style: "comprometido" },
  { id: "cf_08", text: "A veces sacrifico mis propios deseos en favor de los del otro.", style: "complaciente" },
  // Situación 5
  { id: "cf_09", text: "Consistentemente, busco la ayuda del otro para encontrar una solución.", style: "colaborador" },
  { id: "cf_10", text: "Trato de hacer lo que pueda para evitar tensiones inútiles.", style: "evasivo" },
  // Situación 6
  { id: "cf_11", text: "Trato de evitarme desagrados.", style: "evasivo" },
  { id: "cf_12", text: "Trato de imponer mi posición.", style: "competidor" },
  // Situación 7
  { id: "cf_13", text: "Trato de postergar el tema hasta que haya tenido tiempo para meditarlo.", style: "evasivo" },
  { id: "cf_14", text: "Cedo en algunos puntos a cambio de lograr otros.", style: "comprometido" },
  // Situación 8
  { id: "cf_15", text: "Soy decidido para lograr mis objetivos.", style: "competidor" },
  { id: "cf_16", text: "Trato que todas las dudas y problemas salgan a la superficie en forma inmediata.", style: "colaborador" },
  // Situación 9
  { id: "cf_17", text: "Siento que no siempre vale la pena preocuparse de las diferencias.", style: "evasivo" },
  { id: "cf_18", text: "Hago esfuerzo para salirme con la mía.", style: "competidor" },
  // Situación 10
  { id: "cf_19", text: "Soy decidido para lograr mis objetivos.", style: "competidor" },
  { id: "cf_20", text: "Trato de encontrar una solución de compromiso.", style: "comprometido" },
  // Situación 11
  { id: "cf_21", text: "Trato que todas las dudas y problemas salgan a la luz en forma inmediata.", style: "colaborador" },
  { id: "cf_22", text: "Puedo tratar de limar asperezas y mantener la relación.", style: "complaciente" },
  // Situación 12
  { id: "cf_23", text: "A veces evito tomar posiciones que puedan crear controversia.", style: "evasivo" },
  { id: "cf_24", text: "Le acepto al otro algunos de sus argumentos si él me permite mantener algunos de los míos.", style: "comprometido" },
  // Situación 13
  { id: "cf_25", text: "Propongo una posición intermedia.", style: "comprometido" },
  { id: "cf_26", text: "Hago presión por mis puntos de vista.", style: "competidor" },
  // Situación 14
  { id: "cf_27", text: "Le expreso mis ideas y solicito las suyas.", style: "colaborador" },
  { id: "cf_28", text: "Trato de demostrarle la lógica y los beneficios de mi posición.", style: "competidor" },
  // Situación 15
  { id: "cf_29", text: "Puedo tratar de limar asperezas y mantener la relación.", style: "complaciente" },
  { id: "cf_30", text: "Trato de hacer lo que sea necesario para evitar tensiones.", style: "evasivo" },
  // Situación 16
  { id: "cf_31", text: "Trato de no herir los sentimientos del otro.", style: "complaciente" },
  { id: "cf_32", text: "Trato de convencer a la otra persona sobre los méritos de mi posición.", style: "competidor" },
  // Situación 17
  { id: "cf_33", text: "Habitualmente, soy decidido para lograr mis objetivos.", style: "competidor" },
  { id: "cf_34", text: "Trato de hacer lo que pueda para evitar tensiones inútiles.", style: "evasivo" },
  // Situación 18
  { id: "cf_35", text: "Si hace feliz a la otra persona, podría dejarlo mantener sus puntos de vista.", style: "complaciente" },
  { id: "cf_36", text: "Le acepto al otro algunos de sus argumentos si él me permite mantener alguno de los míos.", style: "comprometido" },
  // Situación 19
  { id: "cf_37", text: "Trato que todas las dudas y problemas salgan a la superficie en forma inmediata.", style: "colaborador" },
  { id: "cf_38", text: "Trato de postergar el tema hasta que haya tenido tiempo para meditarlo.", style: "evasivo" },
  // Situación 20
  { id: "cf_39", text: "Trato de resolver nuestras diferencias en forma inmediata.", style: "colaborador" },
  { id: "cf_40", text: "Trato de encontrar una combinación justa de ganancias y pérdidas para ambos.", style: "comprometido" },
  // Situación 21
  { id: "cf_41", text: "Al iniciar negociaciones trato de ser considerado respecto de los deseos de la otra persona.", style: "complaciente" },
  { id: "cf_42", text: "Siempre me inclino por una discusión directa del problema.", style: "colaborador" },
  // Situación 22
  { id: "cf_43", text: "Trato de encontrar una posición que sea intermedia entre la mía y la de él.", style: "comprometido" },
  { id: "cf_44", text: "Impongo mis deseos.", style: "competidor" },
  // Situación 23
  { id: "cf_45", text: "A menudo me preocupo de satisfacer todos nuestros deseos.", style: "colaborador" },
  { id: "cf_46", text: "Hay oportunidades en que dejo que otros asuman la responsabilidad para resolver el problema.", style: "evasivo" },
  // Situación 24
  { id: "cf_47", text: "Si la posición de la otra persona parece ser importante, trato de cumplir sus deseos.", style: "complaciente" },
  { id: "cf_48", text: "Trato de que él se avenga a una solución de compromiso.", style: "comprometido" },
  // Situación 25
  { id: "cf_49", text: "Trato de demostrarle la lógica y los beneficios de mi posición.", style: "competidor" },
  { id: "cf_50", text: "Al iniciar negociaciones trato de ser considerado respecto de los deseos de la otra persona.", style: "complaciente" },
  // Situación 26
  { id: "cf_51", text: "Propongo una solución intermedia.", style: "comprometido" },
  { id: "cf_52", text: "Casi siempre me preocupo de satisfacer todos nuestros deseos.", style: "colaborador" },
  // Situación 27
  { id: "cf_53", text: "A veces evito tomar posiciones que puedan crear controversia.", style: "evasivo" },
  { id: "cf_54", text: "Si hace feliz a la otra persona, podría dejarlo mantener sus puntos de vista.", style: "complaciente" },
  // Situación 28
  { id: "cf_55", text: "Habitualmente, soy decidido para lograr mis objetivos.", style: "competidor" },
  { id: "cf_56", text: "Habitualmente, busco la ayuda del otro para encontrar una solución.", style: "colaborador" },
  // Situación 29
  { id: "cf_57", text: "Propongo una posición intermedia.", style: "comprometido" },
  { id: "cf_58", text: "Siento que no siempre vale la pena preocuparse.", style: "evasivo" },
  // Situación 30
  { id: "cf_59", text: "Trato de no herir los sentimientos del otro.", style: "complaciente" },
  { id: "cf_60", text: "Siempre comparto el problema con la otra persona de manera que podamos resolverlo.", style: "colaborador" },
];

export function computeConflictoResult(answers: Record<string, number>): {
  primary: ConflictoStyle;
  averages: Record<ConflictoStyle, number>;
} {
  const sums: Record<ConflictoStyle, number> = {
    competidor: 0,
    colaborador: 0,
    comprometido: 0,
    evasivo: 0,
    complaciente: 0,
  };
  const counts: Record<ConflictoStyle, number> = {
    competidor: 0,
    colaborador: 0,
    comprometido: 0,
    evasivo: 0,
    complaciente: 0,
  };

  for (const q of CONFLICTO_QUESTIONS) {
    const val = answers[q.id];
    if (val !== undefined) {
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<ConflictoStyle, number>;
  for (const style of CONFLICTO_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = CONFLICTO_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
