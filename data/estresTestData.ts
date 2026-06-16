export type EstresStyle = "cognitivo" | "agotamiento" | "emocional" | "fisico";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const ESTRES_STYLE_META: Record<EstresStyle, StyleMeta> = {
  cognitivo: {
    label: "Impacto cognitivo",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Cognitivo",
    description:
      "El estrés se manifiesta principalmente en tu mente: te resulta difícil concentrarte, sientes que pierdes el control y cuestionas el sentido de lo que haces. Es la forma en que tu sistema nervioso pide un cambio de ritmo urgente.",
    tip: "Haz pausas activas sin pantalla de 5 minutos durante el día. El cerebro bajo estrés crónico necesita ventanas de no-hacer para recuperar claridad y foco.",
  },
  agotamiento: {
    label: "Agotamiento y desgaste",
    color: "#D97706",
    bg: "#FFFBEB",
    short: "Agotamiento",
    description:
      "Tu estrés se expresa como un vaciamiento profundo: sin energía, sin motivación, sin perspectivas. No es pereza — es tu cuerpo y tu mente diciéndote que llevan demasiado tiempo funcionando por encima de sus límites.",
    tip: "Antes de agregar compromisos, prioriza eliminar. El agotamiento crónico no se resuelve descansando un fin de semana — requiere cambios sostenidos en cómo distribuyes tu energía.",
  },
  emocional: {
    label: "Desbordamiento emocional",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Emocional",
    description:
      "El estrés se filtra a través de tus emociones: irritabilidad, deseos de aislarte, dificultad para superar decepciones y una sensación de inquietud que no te suelta. Son señales de que tu capacidad de regulación emocional está bajo presión.",
    tip: "No ignores estas señales. Hablar con alguien de confianza o con un profesional puede aliviar parte de esa carga — no tienes que cargarlo solo.",
  },
  fisico: {
    label: "Síntomas físicos",
    color: "#9333EA",
    bg: "#FAF5FF",
    short: "Físico",
    description:
      "Tu cuerpo está hablando: dolores frecuentes, cansancio fácil, problemas digestivos, menor deseo sexual. El estrés crónico tiene un precio físico real, y estas señales merecen atención antes de que se intensifiquen.",
    tip: "Consulta con un médico si los síntomas son frecuentes. Mientras tanto, el movimiento suave y el sueño suficiente son las dos palancas más efectivas para reducir el estrés somático.",
  },
};

export const ESTRES_STYLE_ORDER: EstresStyle[] = [
  "cognitivo",
  "agotamiento",
  "emocional",
  "fisico",
];

type EstresQuestion = { id: string; text: string; style: EstresStyle };

export const ESTRES_QUESTIONS: EstresQuestion[] = [
  // Bloque 1 — cognitivo (7 items)
  { id: "es_01", text: "Me resulta difícil concentrarme.", style: "cognitivo" },
  { id: "es_02", text: "No me gusta hacer mi trabajo.", style: "cognitivo" },
  { id: "es_03", text: "Me siento cada vez con menos control de mi vida.", style: "cognitivo" },
  { id: "es_04", text: "En ocasiones me pregunto: ¿Para qué sirve todo esto?", style: "cognitivo" },
  { id: "es_05", text: "No me siento valorado por las personas de mi entorno.", style: "cognitivo" },
  { id: "es_06", text: "No me satisface mi propio rendimiento.", style: "cognitivo" },
  { id: "es_07", text: "Me cuesta trabajo decir que no.", style: "cognitivo" },
  // Bloque 2 — agotamiento (7 items)
  { id: "es_08", text: "Siento que siempre termino haciendo demasiado.", style: "agotamiento" },
  { id: "es_09", text: "Muchas cosas terminan sobrepasándome.", style: "agotamiento" },
  { id: "es_10", text: "Me siento desmotivado, incluso al principio del día.", style: "agotamiento" },
  { id: "es_11", text: "No veo perspectivas para mí.", style: "agotamiento" },
  { id: "es_12", text: "Con frecuencia me siento vacío y sin impulso.", style: "agotamiento" },
  { id: "es_13", text: "No tengo energía para hacer más de lo que tengo que hacer.", style: "agotamiento" },
  { id: "es_14", text: "Echo de menos mi sentido de creatividad e imaginación.", style: "agotamiento" },
  // Bloque 3 — emocional (7 items)
  { id: "es_15", text: "Desde hace un tiempo dudo cada vez más de mis habilidades.", style: "emocional" },
  { id: "es_16", text: "Pasar tiempo con otra gente me resulta agotador y estresante.", style: "emocional" },
  { id: "es_17", text: "Me siento muy irritable.", style: "emocional" },
  { id: "es_18", text: "Me resulta difícil sobreponerme a las decepciones.", style: "emocional" },
  { id: "es_19", text: "Siento una creciente sensación de inquietud interior.", style: "emocional" },
  { id: "es_20", text: "Siento el impulso de esconderme y que me dejen en paz.", style: "emocional" },
  { id: "es_21", text: "Me resulta difícil relajarme.", style: "emocional" },
  // Bloque 4 — físico (9 items)
  { id: "es_22", text: "Me resfrío o enfermo con facilidad.", style: "fisico" },
  { id: "es_23", text: "Suelen dolerme la cabeza o el cuello.", style: "fisico" },
  { id: "es_24", text: "Me canso con facilidad.", style: "fisico" },
  { id: "es_25", text: "Mi apetito sexual ha disminuido.", style: "fisico" },
  { id: "es_26", text: "Tengo tendencia a los dolores de espalda.", style: "fisico" },
  { id: "es_27", text: "Noto tensión o molestias en el pecho o el corazón.", style: "fisico" },
  { id: "es_28", text: "Sufro problemas digestivos o gastrointestinales.", style: "fisico" },
  { id: "es_29", text: "Tengo antojos de dulces o como demasiado rápido cuando estoy estresado.", style: "fisico" },
  { id: "es_30", text: "Recurro al alcohol u otras sustancias para relajarme.", style: "fisico" },
];

export function computeEstresResult(answers: Record<string, number>): {
  primary: EstresStyle;
  averages: Record<EstresStyle, number>;
} {
  const sums: Record<EstresStyle, number> = { cognitivo: 0, agotamiento: 0, emocional: 0, fisico: 0 };
  const counts: Record<EstresStyle, number> = { cognitivo: 0, agotamiento: 0, emocional: 0, fisico: 0 };

  for (const q of ESTRES_QUESTIONS) {
    const val = answers[q.id];
    if (val !== undefined) {
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<EstresStyle, number>;
  for (const style of ESTRES_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = ESTRES_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
