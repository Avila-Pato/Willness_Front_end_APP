export type BurnoutStyle = "agotamiento" | "distanciamiento" | "eficacia";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const BURNOUT_STYLE_META: Record<BurnoutStyle, StyleMeta> = {
  agotamiento: {
    label: "Agotamiento emocional",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Agotamiento",
    description:
      "El área más afectada es tu energía emocional. Tu trabajo te consume por dentro: terminas la jornada vacío/a, te cuesta desconectar y empiezas cada día sintiéndote ya cansado. Es la señal más directa de que tu sistema está sobrecargado.",
    tip: "Prioriza el descanso activo: tiempo sin obligaciones, sin pantallas, sin estar 'disponible'. No es pereza — es recuperación necesaria. Si es posible, habla con alguien de confianza sobre lo que estás cargando.",
  },
  distanciamiento: {
    label: "Distanciamiento y cinismo",
    color: "#9333EA",
    bg: "#FAF5FF",
    short: "Distanciamiento",
    description:
      "Tu burnout se manifiesta a través de una distancia creciente con tu trabajo y con quienes te rodean. El cinismo, la irritabilidad y la automatización son mecanismos de defensa ante una sobrecarga que ya no puedes procesar emocionalmente.",
    tip: "El distanciamiento es una señal de autoprotección, no de mala actitud. Busca pequeñas razones para reconectar con lo que hacías antes con interés — y considera hablar con un profesional si el cinismo persiste.",
  },
  eficacia: {
    label: "Pérdida de propósito",
    color: "#D97706",
    bg: "#FFFBEB",
    short: "Propósito",
    description:
      "Lo que más te pesa es la sensación de que ya no rindes como antes y que tu trabajo ha perdido sentido. Esta pérdida de eficacia percibida y de propósito es uno de los efectos más duraderos del burnout y el más difícil de nombrar.",
    tip: "Recuerda por qué empezaste. Si ese propósito ya no te mueve, puede que sea momento de explorar qué sí lo hace — con un coach, terapeuta o simplemente dándote permiso de replantearlo.",
  },
};

export const BURNOUT_STYLE_ORDER: BurnoutStyle[] = [
  "agotamiento",
  "distanciamiento",
  "eficacia",
];

type BurnoutQuestion = { id: string; text: string; style: BurnoutStyle };

export const BURNOUT_QUESTIONS: BurnoutQuestion[] = [
  // Bloque A — Agotamiento emocional (6 items)
  { id: "bu_01", text: "Me siento emocionalmente agotado/a por mi trabajo.", style: "agotamiento" },
  { id: "bu_02", text: "Siento que no puedo más al final de la jornada laboral.", style: "agotamiento" },
  { id: "bu_03", text: "Me levanto cansado/a incluso antes de empezar a trabajar.", style: "agotamiento" },
  { id: "bu_04", text: "Siento que mi trabajo me consume demasiada energía emocional.", style: "agotamiento" },
  { id: "bu_05", text: "Me cuesta desconectar mentalmente del trabajo cuando termino.", style: "agotamiento" },
  { id: "bu_06", text: "Siento que mi carga de trabajo es demasiado pesada.", style: "agotamiento" },
  // Bloque B — Distanciamiento y cinismo (5 items)
  { id: "bu_07", text: "Me siento más irritable o impaciente con compañeros o personas de mi entorno.", style: "distanciamiento" },
  { id: "bu_08", text: "He empezado a aislarme o a evitar interacciones en el trabajo.", style: "distanciamiento" },
  { id: "bu_09", text: "Siento que me estoy volviendo más automático/a o distante en mi trabajo.", style: "distanciamiento" },
  { id: "bu_10", text: "A veces siento que mi trabajo ya no me importa tanto como antes.", style: "distanciamiento" },
  { id: "bu_11", text: "Me sorprendo respondiendo con cinismo, ironía o frialdad.", style: "distanciamiento" },
  // Bloque C — Eficacia y propósito (5 items)
  { id: "bu_12", text: "Siento que rindo menos o que mi trabajo es menos eficaz que antes.", style: "eficacia" },
  { id: "bu_13", text: "Dudo con frecuencia de mi propia capacidad profesional.", style: "eficacia" },
  { id: "bu_14", text: "Siento que mi trabajo tiene cada vez menos sentido o propósito.", style: "eficacia" },
  { id: "bu_15", text: "Me cuesta sentir orgullo o satisfacción por lo que hago.", style: "eficacia" },
  { id: "bu_16", text: "Tengo la sensación de estar apagándome en lo profesional.", style: "eficacia" },
];

export function computeBurnoutResult(answers: Record<string, number>): {
  primary: BurnoutStyle;
  averages: Record<BurnoutStyle, number>;
} {
  const sums: Record<BurnoutStyle, number> = { agotamiento: 0, distanciamiento: 0, eficacia: 0 };
  const counts: Record<BurnoutStyle, number> = { agotamiento: 0, distanciamiento: 0, eficacia: 0 };

  for (const q of BURNOUT_QUESTIONS) {
    const val = answers[q.id];
    if (val !== undefined) {
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<BurnoutStyle, number>;
  for (const style of BURNOUT_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = BURNOUT_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
