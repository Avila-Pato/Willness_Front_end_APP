export type EnergiaStyle = "fisico" | "social" | "mental";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const ENERGIA_STYLE_META: Record<EnergiaStyle, StyleMeta> = {
  fisico: {
    label: "Energía física",
    color: "#9333EA",
    bg: "#FAF5FF",
    short: "Física",
    description:
      "Tu mayor reserva de energía viene del cuidado del cuerpo: tienes buenos hábitos de sueño, ejercicio y alimentación. Estas rutinas son la base fisiológica que sostiene tu capacidad de respuesta ante el estrés y las exigencias del día.",
    tip: "Mantén esa base y añade pequeñas mejoras donde notes más desgaste: las pausas activas a lo largo del día pueden marcar una diferencia notable en tu energía de tarde.",
  },
  social: {
    label: "Energía relacional",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Social",
    description:
      "Tu energía se nutre del vínculo con los demás: tienes relaciones de apoyo, te sientes valorado/a y sabes cuándo necesitas espacio. La calidad de tus conexiones personales y laborales actúa como un regulador emocional muy potente.",
    tip: "Cuida especialmente las relaciones que te recargan, no solo las que te necesitan. Invertir tiempo en vínculos de calidad es una de las formas más efectivas de recuperar energía emocional.",
  },
  mental: {
    label: "Energía mental",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Mental",
    description:
      "Tu fortaleza está en la gestión interna: te concentras con facilidad, sabes organizarte, desconectas del trabajo y mantienes una actitud orientada a soluciones. Esa capacidad cognitiva y emocional es lo que te permite sostenerte bajo presión.",
    tip: "Protege esa energía mental reduciendo la multitarea y creando rituales de cierre al terminar el día — pequeños actos que le indican al cerebro que es hora de soltar.",
  },
};

export const ENERGIA_STYLE_ORDER: EnergiaStyle[] = [
  "fisico",
  "social",
  "mental",
];

type EnergiaQuestion = {
  id: string;
  text: string;
  style: EnergiaStyle;
  reversed?: boolean;
};

export const ENERGIA_QUESTIONS: EnergiaQuestion[] = [
  { id: "en_01", text: "Hago ejercicio físico de forma habitual.", style: "fisico" },
  { id: "en_02", text: "Duermo suficiente y me levanto con sensación de haber descansado.", style: "fisico" },
  { id: "en_03", text: "Mi alimentación es equilibrada y la hago en horarios regulares.", style: "fisico" },
  { id: "en_04", text: "Hago pausas durante el día para resetear y recuperar energía.", style: "fisico" },
  { id: "en_05", text: "No necesito tomar ansiolíticos, antiinflamatorios u otros medicamentos de forma habitual.", style: "fisico" },
  { id: "en_06", text: "Comparto tiempo con las personas que son importantes para mí.", style: "social" },
  { id: "en_07", text: "Me siento valorado/a en mi trabajo.", style: "social" },
  { id: "en_08", text: "Tengo personas de confianza con quienes puedo hablar de mis problemas o retos.", style: "social" },
  { id: "en_09", text: "Cuando necesito estar solo/a, me permito ese espacio sin culpa.", style: "social" },
  { id: "en_10", text: "Cuando alguien me habla, soy capaz de centrarme en lo que me está contando.", style: "social" },
  { id: "en_11", text: "Tengo una buena relación con mi familia.", style: "social" },
  { id: "en_12", text: "Tengo una buena relación con mis compañeros y superiores en el trabajo.", style: "social" },
  { id: "en_13", text: "Evito quejarme en exceso y me centro en lo que depende de mí.", style: "mental" },
  { id: "en_14", text: "La presión no me sobrepasa y le doy la importancia justa a cada cosa.", style: "mental" },
  { id: "en_15", text: "Puedo concentrarme con facilidad en el trabajo o los estudios.", style: "mental" },
  { id: "en_16", text: "Sé organizarme y planificar mis tareas con antelación.", style: "mental" },
  { id: "en_17", text: "Veo el lado positivo de las situaciones y me enfoco en las soluciones.", style: "mental" },
  { id: "en_18", text: "Soy capaz de desconectar del trabajo al terminar mi jornada.", style: "mental" },
  { id: "en_19", text: "Dedico tiempo a actividades de ocio o cosas que me hacen sentir bien.", style: "mental" },
  { id: "en_20", text: "Dedico tiempo a reflexionar sobre lo que es importante para mí y a tomar decisiones alineadas con eso.", style: "mental" },
];

export function computeEnergiaResult(answers: Record<string, number>): {
  primary: EnergiaStyle;
  averages: Record<EnergiaStyle, number>;
} {
  const sums: Record<EnergiaStyle, number> = { fisico: 0, social: 0, mental: 0 };
  const counts: Record<EnergiaStyle, number> = { fisico: 0, social: 0, mental: 0 };

  for (const q of ENERGIA_QUESTIONS) {
    let val = answers[q.id];
    if (val !== undefined) {
      if (q.reversed) val = 6 - val;
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<EnergiaStyle, number>;
  for (const style of ENERGIA_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = ENERGIA_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
