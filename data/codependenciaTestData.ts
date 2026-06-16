export type CodependenciaStyle =
  | "complacencia"
  | "dependencia"
  | "autoestima"
  | "rescate";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const CODEPENDENCIA_STYLE_META: Record<CodependenciaStyle, StyleMeta> = {
  complacencia: {
    label: "Complacencia",
    color: "#BE185D",
    bg: "#FDF2F8",
    short: "Complacencia",
    description:
      "Tiendes a priorizar las necesidades de los demás por encima de las tuyas, te resulta difícil decir no y evitas el conflicto a cualquier costo. Cuidas mucho las relaciones, pero a veces a expensas de ti mismo/a.",
    tip: "Practica poner un límite pequeño cada semana. Decir no no te hace egoísta — te hace honesto/a contigo mismo/a y con los demás.",
  },
  dependencia: {
    label: "Dependencia emocional",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Dependencia",
    description:
      "Tus relaciones tienen un peso emocional muy grande: el miedo a la pérdida, la dificultad para decidir por ti mismo/a y los patrones que se repiten sugieren que buscas en el otro una seguridad que aún no encuentras en ti.",
    tip: "Trabaja en identificar qué necesitas tú, independientemente de lo que el otro piense o haga. La autonomía emocional se construye de a poco.",
  },
  autoestima: {
    label: "Autoestima frágil",
    color: "#9333EA",
    bg: "#FAF5FF",
    short: "Autoestima",
    description:
      "Te resulta difícil recibir reconocimiento, ocultas partes de ti mismo/a y sientes culpa cuando te cuidas. Tu valor como persona parece estar condicionado a lo que haces por otros, no a quién eres.",
    tip: "Empieza por permitirte recibir: un cumplido, un descanso, una ayuda. La autoestima sana no se gana — se practica.",
  },
  rescate: {
    label: "Enfoque en el otro",
    color: "#D97706",
    bg: "#FFFBEB",
    short: "Rescate",
    description:
      "Tu atención tiende a centrarse en los problemas de los demás, incluso al punto de descuidar los tuyos. Sientes que el cambio en tu vida depende de que otros cambien primero.",
    tip: "Pregúntate: ¿qué pasaría si esta situación no cambiara? Trabajar desde dentro, no desde fuera, es lo que te da poder real.",
  },
};

export const CODEPENDENCIA_STYLE_ORDER: CodependenciaStyle[] = [
  "complacencia",
  "dependencia",
  "autoestima",
  "rescate",
];

type CodependenciaQuestion = { id: string; text: string; style: CodependenciaStyle };

export const CODEPENDENCIA_QUESTIONS: CodependenciaQuestion[] = [
  { id: "cd_01", text: "Me cuesta mucho tomar decisiones.", style: "dependencia" },
  { id: "cd_02", text: "Me resulta difícil decir «no».", style: "complacencia" },
  { id: "cd_03", text: "Me resulta difícil aceptar cumplidos de otras personas.", style: "autoestima" },
  { id: "cd_04", text: "A veces casi me siento aburrido/a o vacío/a si no tengo problemas en los que concentrarme.", style: "rescate" },
  { id: "cd_05", text: "Por lo general, termino haciendo por otras personas cosas que ellas podrían hacer por sí mismas.", style: "rescate" },
  { id: "cd_06", text: "Cuando hago algo bueno por mí mismo/a, generalmente me siento culpable.", style: "autoestima" },
  { id: "cd_07", text: "Tiendo a minimizar mis propios problemas y a decirme que no son para tanto.", style: "autoestima" },
  { id: "cd_08", text: "Me digo que las cosas mejorarán cuando las personas en mi vida cambien.", style: "rescate" },
  { id: "cd_09", text: "Parece que siempre estoy ahí para los demás, pero ellos rara vez están ahí para mí.", style: "complacencia" },
  { id: "cd_10", text: "A veces me concentro tanto en una persona que descuido mis otras relaciones y responsabilidades.", style: "rescate" },
  { id: "cd_11", text: "Parece que siempre termino en relaciones que me resultan dolorosas.", style: "dependencia" },
  { id: "cd_12", text: "Normalmente no dejo que los demás vean mi verdadero yo.", style: "autoestima" },
  { id: "cd_13", text: "Cuando alguien me molesta, lo guardo por mucho tiempo, pero de vez en cuando exploto.", style: "autoestima" },
  { id: "cd_14", text: "Generalmente haré lo que sea para evitar el conflicto.", style: "complacencia" },
  { id: "cd_15", text: "A menudo tengo una sensación de temor o de pérdida en mis relaciones.", style: "dependencia" },
  { id: "cd_16", text: "Suelo poner las necesidades de los demás por delante de las mías.", style: "complacencia" },
];

export function computeCodependenciaResult(answers: Record<string, number>): {
  primary: CodependenciaStyle;
  averages: Record<CodependenciaStyle, number>;
} {
  const sums: Record<CodependenciaStyle, number> = {
    complacencia: 0,
    dependencia: 0,
    autoestima: 0,
    rescate: 0,
  };
  const counts: Record<CodependenciaStyle, number> = {
    complacencia: 0,
    dependencia: 0,
    autoestima: 0,
    rescate: 0,
  };

  for (const q of CODEPENDENCIA_QUESTIONS) {
    const val = answers[q.id];
    if (val !== undefined) {
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<CodependenciaStyle, number>;
  for (const style of CODEPENDENCIA_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = CODEPENDENCIA_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
