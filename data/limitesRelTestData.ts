export type LimitesRelStyle = "bienestar" | "conexion" | "comunicacion" | "conflicto";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const LIMITES_REL_STYLE_META: Record<LimitesRelStyle, StyleMeta> = {
  bienestar: {
    label: "Bienestar y satisfacción",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Bienestar",
    description:
      "Tu relación te genera satisfacción, felicidad y seguridad. Te sientes bien eligiéndola y hay un sentido de que vas en la dirección correcta con tu pareja. Este es el pilar más importante para la salud de una relación a largo plazo.",
    tip: "Sigue invirtiendo en las cosas que te hacen sentir bien en la relación. Nombrar y agradecer lo que funciona también fortalece el vínculo.",
  },
  conexion: {
    label: "Conexión e intimidad",
    color: "#BE185D",
    bg: "#FDF2F8",
    short: "Conexión",
    description:
      "La intimidad emocional, el afecto compartido y el disfrute mutuo son el punto más fuerte de tu relación. Hay complicidad, cariño y momentos de calidad que nutren el vínculo.",
    tip: "Mantén ese espacio de intimidad activo: los rituales pequeños de conexión (salidas, conversaciones, contacto físico) son lo que sostiene el amor cotidiano.",
  },
  comunicacion: {
    label: "Comunicación y respeto",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Comunicación",
    description:
      "La comunicación y el respeto mutuo son las fortalezas de tu relación. Puedes expresarte libremente, sientes que tu pareja te escucha y hay honestidad como base del vínculo.",
    tip: "Cuando surjan desacuerdos, recuerda que el objetivo no es ganar el argumento sino entenderse. Una buena comunicación también es saber cuándo hacer una pausa.",
  },
  conflicto: {
    label: "Señales de tensión",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Tensión",
    description:
      "Hay patrones de conflicto, distancia o dinámicas que te generan malestar. Esto no significa que la relación no tenga futuro, pero sí que hay áreas importantes que requieren atención, conversación o ayuda externa.",
    tip: "No ignores las señales de tensión crónica. Hablar con tu pareja sobre lo que no funciona, o buscar orientación de un terapeuta de pareja, puede abrir caminos que sientas cerrados.",
  },
};

export const LIMITES_REL_STYLE_ORDER: LimitesRelStyle[] = [
  "bienestar",
  "conexion",
  "comunicacion",
  "conflicto",
];

type LimitesRelQuestion = { id: string; text: string; style: LimitesRelStyle };

export const LIMITES_REL_QUESTIONS: LimitesRelQuestion[] = [
  { id: "lr_01", text: "Me siento satisfecho/a con la relación de pareja.", style: "bienestar" },
  { id: "lr_02", text: "Mi pareja me escucha atentamente cuando hablo.", style: "comunicacion" },
  { id: "lr_03", text: "Discutimos frecuentemente sobre los mismos temas.", style: "conflicto" },
  { id: "lr_04", text: "Nos apoyamos mutuamente en los momentos difíciles.", style: "conexion" },
  { id: "lr_05", text: "Me siento querido/a por mi pareja.", style: "bienestar" },
  { id: "lr_06", text: "Mi pareja me critica con frecuencia.", style: "conflicto" },
  { id: "lr_07", text: "Nos divertimos juntos.", style: "conexion" },
  { id: "lr_08", text: "Me siento libre para expresar mis sentimientos.", style: "comunicacion" },
  { id: "lr_09", text: "Mi pareja me respeta.", style: "comunicacion" },
  { id: "lr_10", text: "Me siento frustrado/a con la relación.", style: "conflicto" },
  { id: "lr_11", text: "Mi pareja es comprensiva/o.", style: "comunicacion" },
  { id: "lr_12", text: "Siento que no puedo confiar en mi pareja.", style: "conflicto" },
  { id: "lr_13", text: "Compartimos decisiones importantes.", style: "comunicacion" },
  { id: "lr_14", text: "Me siento valorado/a en la relación.", style: "bienestar" },
  { id: "lr_15", text: "Mi pareja y yo tenemos intereses comunes.", style: "conexion" },
  { id: "lr_16", text: "Mi pareja me hace sentir culpable.", style: "conflicto" },
  { id: "lr_17", text: "Nos apoyamos en nuestras metas personales.", style: "conexion" },
  { id: "lr_18", text: "Discutimos de forma constructiva.", style: "comunicacion" },
  { id: "lr_19", text: "Siento que mi pareja es un/a buen/a compañero/a de vida.", style: "bienestar" },
  { id: "lr_20", text: "Me siento solo/a en la relación.", style: "conflicto" },
  { id: "lr_21", text: "Mi pareja me sorprende positivamente.", style: "conexion" },
  { id: "lr_22", text: "Me siento ignorado/a por mi pareja.", style: "conflicto" },
  { id: "lr_23", text: "Mi pareja tiene en cuenta mis opiniones.", style: "comunicacion" },
  { id: "lr_24", text: "Nos mostramos cariño en público.", style: "conexion" },
  { id: "lr_25", text: "Me siento incomprendido/a.", style: "conflicto" },
  { id: "lr_26", text: "Me siento seguro/a en la relación.", style: "bienestar" },
  { id: "lr_27", text: "Mi pareja me trata con amabilidad.", style: "comunicacion" },
  { id: "lr_28", text: "Me siento atrapado/a en la relación.", style: "conflicto" },
  { id: "lr_29", text: "Mi pareja es honesta/o conmigo.", style: "comunicacion" },
  { id: "lr_30", text: "Me siento satisfecho/a con la vida sexual.", style: "conexion" },
  { id: "lr_31", text: "Mi pareja respeta mis límites.", style: "comunicacion" },
  { id: "lr_32", text: "Discutimos de manera agresiva.", style: "conflicto" },
  { id: "lr_33", text: "Nos reímos juntos frecuentemente.", style: "conexion" },
  { id: "lr_34", text: "Me siento emocionalmente cerca de mi pareja.", style: "conexion" },
  { id: "lr_35", text: "Mi pareja me manipula.", style: "conflicto" },
  { id: "lr_36", text: "Nos damos tiempo de calidad.", style: "conexion" },
  { id: "lr_37", text: "Siento que puedo ser yo mismo/a en la relación.", style: "bienestar" },
  { id: "lr_38", text: "Mi pareja me hace sentir inseguro/a.", style: "conflicto" },
  { id: "lr_39", text: "Me siento respetado/a en mis decisiones.", style: "comunicacion" },
  { id: "lr_40", text: "Siento que mi pareja no me entiende.", style: "conflicto" },
  { id: "lr_41", text: "Discutimos sobre dinero con frecuencia.", style: "conflicto" },
  { id: "lr_42", text: "Mi pareja me apoya en mis proyectos personales.", style: "conexion" },
  { id: "lr_43", text: "Siento que la relación ha empeorado con el tiempo.", style: "conflicto" },
  { id: "lr_44", text: "Me siento feliz en la relación.", style: "bienestar" },
  { id: "lr_45", text: "Mi pareja me hace sentir especial.", style: "conexion" },
];

export function computeLimitesRelResult(answers: Record<string, number>): {
  primary: LimitesRelStyle;
  averages: Record<LimitesRelStyle, number>;
} {
  const sums: Record<LimitesRelStyle, number> = {
    bienestar: 0,
    conexion: 0,
    comunicacion: 0,
    conflicto: 0,
  };
  const counts: Record<LimitesRelStyle, number> = {
    bienestar: 0,
    conexion: 0,
    comunicacion: 0,
    conflicto: 0,
  };

  for (const q of LIMITES_REL_QUESTIONS) {
    const val = answers[q.id];
    if (val !== undefined) {
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<LimitesRelStyle, number>;
  for (const style of LIMITES_REL_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = LIMITES_REL_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
