export type DescansoStyle = "ambiente" | "rutina" | "habitos";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const DESCANSO_STYLE_META: Record<DescansoStyle, StyleMeta> = {
  ambiente: {
    label: "Entorno de sueño",
    color: "#2563EB",
    bg: "#EFF6FF",
    short: "Entorno",
    description:
      "Tu mayor fortaleza en el sueño es tu entorno: mantienes una habitación con buenas condiciones de temperatura, oscuridad y silencio. Un espacio bien preparado es una de las bases más sólidas para un sueño reparador.",
    tip: "Refuerza ese entorno con pequeños ajustes: cortinas opacas, temperatura entre 16–20 °C y silencio o ruido blanco si hay distracciones externas. Un dormitorio bien preparado hace la mitad del trabajo.",
  },
  rutina: {
    label: "Rutina nocturna",
    
    color: "#7C3AED",
    bg: "#F5F3FF",
    short: "Rutina",
    description:
      "Tu punto fuerte es la consistencia: tienes horarios regulares de sueño, una rutina de relajación antes de dormir y buenos hábitos de desconexión. La regularidad es lo que más influye en la calidad del sueño a largo plazo.",
    tip: "Mantén ese ritmo incluso los fines de semana — los cambios bruscos de horario afectan al reloj biológico. Si algún día te desvelas, evita compensar con siestas largas al día siguiente.",
  },
  habitos: {
    label: "Hábitos de vida",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Hábitos",
    description:
      "Tu fortaleza está en los hábitos diarios que facilitan el sueño: ejercicio regular, alimentación equilibrada y control del alcohol y la cafeína. Estos factores de estilo de vida tienen un impacto directo en la profundidad y continuidad del sueño.",
    tip: "Si ya tienes buenos hábitos generales, el siguiente paso es afinarlos: evita la cafeína después de las 14h, deja al menos 2h entre la cena y acostarte, y prioriza el ejercicio por la mañana o al mediodía.",
  },
};

export const DESCANSO_STYLE_ORDER: DescansoStyle[] = [
  "ambiente",
  "rutina",
  "habitos",
];

type DescansoQuestion = {
  id: string;
  text: string;
  style: DescansoStyle;
  reversed?: boolean;
};

export const DESCANSO_QUESTIONS: DescansoQuestion[] = [
  { id: "ds_01", text: "Trato de mantener mi habitación fresca por la noche.", style: "ambiente" },
  { id: "ds_02", text: "A menudo necesito una bebida con cafeína al final de la tarde.", style: "habitos", reversed: true },
  { id: "ds_03", text: "Rara vez siento la necesidad de tomar una siesta durante el día.", style: "habitos" },
  { id: "ds_04", text: "Normalmente como mi última comida varias horas antes de acostarme.", style: "habitos" },
  { id: "ds_05", text: "Trato de acostarme a la misma hora todas las noches.", style: "rutina" },
  { id: "ds_06", text: "Me levanto de la cama poco después de despertarme.", style: "rutina" },
  { id: "ds_07", text: "A menudo hay ruidos que me distraen en mi habitación por la noche.", style: "ambiente", reversed: true },
  { id: "ds_08", text: "Hago ejercicio al menos varias veces por semana.", style: "habitos" },
  { id: "ds_09", text: "Mi habitación está muy oscura por la noche.", style: "ambiente" },
  { id: "ds_10", text: "En general, mi dieta incluye muchos granos integrales, vegetales y proteínas magras.", style: "habitos" },
  { id: "ds_11", text: "No miro el teléfono ni otros dispositivos electrónicos en la cama.", style: "rutina" },
  { id: "ds_12", text: "Si no puedo conciliar el sueño, me levanto de la cama en lugar de quedarme acostado.", style: "rutina" },
  { id: "ds_13", text: "Tengo una rutina nocturna establecida que uso para relajarme.", style: "rutina" },
  { id: "ds_14", text: "Trato de salir al exterior cada mañana poco después de despertarme.", style: "rutina" },
  { id: "ds_15", text: "A menudo hago cosas como responder correos electrónicos desde la cama.", style: "rutina", reversed: true },
  { id: "ds_16", text: "Evito las bebidas alcohólicas por la noche.", style: "habitos" },
  { id: "ds_17", text: "Casi nunca me duermo con la televisión encendida.", style: "ambiente" },
  { id: "ds_18", text: "Empiezo a relajarme aproximadamente a la misma hora todas las noches.", style: "rutina" },
  { id: "ds_19", text: "Mi cama es cómoda para mí.", style: "ambiente" },
  { id: "ds_20", text: "Tiendo a preocuparme por las tareas pendientes del día siguiente mientras trato de dormirme.", style: "rutina", reversed: true },
];

export function computeDescansoResult(answers: Record<string, number>): {
  primary: DescansoStyle;
  averages: Record<DescansoStyle, number>;
} {
  const sums: Record<DescansoStyle, number> = { ambiente: 0, rutina: 0, habitos: 0 };
  const counts: Record<DescansoStyle, number> = { ambiente: 0, rutina: 0, habitos: 0 };

  for (const q of DESCANSO_QUESTIONS) {
    let val = answers[q.id];
    if (val !== undefined) {
      if (q.reversed) val = 6 - val;
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<DescansoStyle, number>;
  for (const style of DESCANSO_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = DESCANSO_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
