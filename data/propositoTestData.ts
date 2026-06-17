export type PropositoStyle = "orientacion" | "valores" | "claridad";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const PROPOSITO_STYLE_META: Record<PropositoStyle, StyleMeta> = {
  orientacion: {
    label: "Orientación vital",
    color: "#7C3AED",
    bg: "#F5F3FF",
    short: "Orientación",
    description:
      "Tu mayor claridad de propósito se expresa en cómo te orientas en la vida: sabes si prefieres estructuras o libertad, liderazgo o servicio, rutina o creatividad. Esa conciencia de tu estilo de vida ideal es una brújula poderosa para tomar decisiones alineadas.",
    tip: "Usa esa claridad sobre tu orientación para evaluar tus decisiones cotidianas: ¿este proyecto, trabajo o compromiso encaja con cómo quiero vivir? Cuando la respuesta es sí, la energía y el propósito aparecen solos.",
  },
  valores: {
    label: "Valores fundamentales",
    color: "#D97706",
    bg: "#FFFBEB",
    short: "Valores",
    description:
      "Tu propósito tiene raíces profundas en lo que valoras: ya sea ayudar a otros, construir familia, buscar autonomía o crear. Conoces qué es lo que más te importa en la vida, y eso es la base de cualquier propósito auténtico.",
    tip: "Escribe los 3 valores que aparecen una y otra vez en tus respuestas. Luego pregúntate: ¿cuánto tiempo y energía real dedico a cada uno? La brecha entre lo que valoras y lo que haces es donde empieza el cambio.",
  },
  claridad: {
    label: "Claridad de propósito",
    color: "#7C3AED",
    bg: "#F5F3FF",
    short: "Claridad",
    description:
      "Tu fortaleza está en la conciencia activa de tu propósito: sabes qué quieres lograr, ya estás trabajando en ello y te sientes dueño/a de tu trayectoria. Esa claridad y agencia personal son los factores que más predicen bienestar y satisfacción vital a largo plazo.",
    tip: "La claridad de propósito se sostiene revisándola: una vez al mes, pregúntate si lo que estás haciendo todavía refleja lo que más te importa. Los propósitos evolucionan — y está bien que lo hagan.",
  },
};

export const PROPOSITO_STYLE_ORDER: PropositoStyle[] = [
  "orientacion",
  "valores",
  "claridad",
];

type PropositoQuestion = {
  id: string;
  text: string;
  style: PropositoStyle;
  reversed?: boolean;
};

export const PROPOSITO_QUESTIONS: PropositoQuestion[] = [
  // Orientación vital (cómo prefieren estructurar su vida/trabajo)
  { id: "pr_01", text: "Prefiero un trabajo con instrucciones claras sobre qué hacer y cómo hacerlo, con horario fijo.", style: "orientacion" },
  { id: "pr_02", text: "Una parte importante de mi vida quiero dedicarla a la creatividad.", style: "orientacion" },
  { id: "pr_03", text: "Prefiero hacer las cosas de una manera conocida antes que buscar constantemente nuevas formas.", style: "orientacion" },
  { id: "pr_04", text: "Elegiría un trabajo con horario flexible y amplio margen para la creatividad.", style: "orientacion" },
  { id: "pr_05", text: "Me veo liderando a otros: orientarlos, organizarlos y tomar decisiones.", style: "orientacion" },
  { id: "pr_06", text: "Me siento más cómodo/a cumpliendo tareas que liderando a otras personas.", style: "orientacion" },
  { id: "pr_07", text: "Soy bueno/a organizando distintas actividades y coordinando esfuerzos.", style: "orientacion" },
  { id: "pr_08", text: "Con más frecuencia prefiero el papel de colaborador antes que el de líder.", style: "orientacion" },
  // Valores fundamentales (qué es lo más importante en la vida)
  { id: "pr_09", text: "La tarea más importante de mi vida es ayudar a otras personas.", style: "valores" },
  { id: "pr_10", text: "Lo más importante para mí es disfrutar la vida y satisfacer mis propios deseos.", style: "valores" },
  { id: "pr_11", text: "Formar una familia o vivir en familia es una de las metas más importantes de mi vida.", style: "valores" },
  { id: "pr_12", text: "Me concentro en mi propio bienestar más que en el de los demás.", style: "valores" },
  // Claridad de propósito (qué tan definido y activo está el propósito personal)
  { id: "pr_13", text: "Me considero dueño/a de mi destino y de las decisiones que tomo.", style: "claridad" },
  { id: "pr_14", text: "Tengo claro cuál es mi propósito principal en la vida.", style: "claridad" },
  { id: "pr_15", text: "Mi trayectoria vital parece depender más de las circunstancias externas que de mí.", style: "claridad", reversed: true },
  { id: "pr_16", text: "Mi propósito en la vida me resulta confuso o poco definido.", style: "claridad", reversed: true },
  { id: "pr_17", text: "Creo que cada persona tiene un propósito único que le corresponde descubrir y vivir.", style: "claridad" },
  { id: "pr_18", text: "A lo largo de la vida, una persona suele cumplir varias grandes tareas vitales distintas.", style: "claridad" },
  { id: "pr_19", text: "Confío en que podré cumplir mi propósito principal en la vida.", style: "claridad" },
  { id: "pr_20", text: "Ya estoy trabajando activamente en mis principales metas de vida.", style: "claridad" },
  { id: "pr_21", text: "En general me centro en resolver tareas cotidianas sin conectarlas con un propósito mayor.", style: "claridad", reversed: true },
  { id: "pr_22", text: "Haga lo que haga, vuelvo a reflexionar sobre qué quiero hacer con mi vida y qué es lo que más me importa.", style: "claridad" },
];

export function computePropositoResult(answers: Record<string, number>): {
  primary: PropositoStyle;
  averages: Record<PropositoStyle, number>;
} {
  const sums: Record<PropositoStyle, number> = { orientacion: 0, valores: 0, claridad: 0 };
  const counts: Record<PropositoStyle, number> = { orientacion: 0, valores: 0, claridad: 0 };

  for (const q of PROPOSITO_QUESTIONS) {
    let val = answers[q.id];
    if (val !== undefined) {
      if (q.reversed) val = 6 - val;
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<PropositoStyle, number>;
  for (const style of PROPOSITO_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = PROPOSITO_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
