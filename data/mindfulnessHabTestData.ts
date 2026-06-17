export type MindfulnessHabStyle = "atencion" | "automatismo" | "presencia";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const MINDFULNESS_HAB_STYLE_META: Record<MindfulnessHabStyle, StyleMeta> = {
  atencion: {
    label: "Atención consciente",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Atención",
    description:
      "Tu mayor fortaleza en la presencia plena es la atención consciente: eres capaz de notar lo que ocurre en tu cuerpo, en tu entorno y en tus pensamientos sin dejar que pasen desapercibidos. Esa capacidad de darte cuenta es la base del mindfulness.",
    tip: "Refuerza esa atención con micro-pausas a lo largo del día: antes de empezar una tarea, dedica 30 segundos a notar tu respiración y el estado de tu cuerpo. Esos momentos breves de conciencia cambian el tono de toda la jornada.",
  },
  automatismo: {
    label: "Acción intencional",
    color: "#7C3AED",
    bg: "#F5F3FF",
    short: "Intención",
    description:
      "Sobresales en la capacidad de actuar con intención en lugar de en 'piloto automático': tus acciones cotidianas tienen más deliberación y conciencia que lo habitual. Eso reduce errores, mejora la calidad de tu trabajo y aumenta la satisfacción con las cosas que haces.",
    tip: "Para mantener esa intencionalidad, elige una actividad rutinaria al día —como comer o ducharte— y hazla con atención total, sin pantallas ni distracciones. Esos anclajes de consciencia se transfieren al resto del día.",
  },
  presencia: {
    label: "Presencia mental",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Presencia",
    description:
      "Tu punto fuerte es la presencia mental: eres capaz de estar donde estás, escuchar sin dividir la atención y no quedar atrapado/a en preocupaciones sobre el futuro o el pasado. Esa capacidad de anclarte al presente es uno de los pilares del bienestar emocional.",
    tip: "Cuando notes que tu mente viaja a otro lado durante una conversación o tarea, simplemente nómbralo: 'Me he ido'. Esa toma de conciencia sin juicio es ya un acto de mindfulness en sí misma.",
  },
};

export const MINDFULNESS_HAB_STYLE_ORDER: MindfulnessHabStyle[] = [
  "atencion",
  "automatismo",
  "presencia",
];

type MindfulnessHabQuestion = {
  id: string;
  text: string;
  style: MindfulnessHabStyle;
  reversed?: boolean;
};

// All items are negatively worded (lack of mindfulness) → all reversed so high score = more mindful
export const MINDFULNESS_HAB_QUESTIONS: MindfulnessHabQuestion[] = [
  { id: "mh_01", text: "Puedo sentir una emoción y no darme cuenta de ella hasta mucho después.", style: "atencion", reversed: true },
  { id: "mh_02", text: "Rompo o derramo cosas por descuido, porque no estoy poniendo atención.", style: "automatismo", reversed: true },
  { id: "mh_03", text: "Me cuesta permanecer concentrado/a en lo que está sucediendo en el momento.", style: "atencion", reversed: true },
  { id: "mh_04", text: "Camino rápido para llegar a donde tengo que ir, sin prestar atención a lo que pasa alrededor.", style: "automatismo", reversed: true },
  { id: "mh_05", text: "Tiendo a no notar la tensión física o el malestar que siento hasta que son muy evidentes.", style: "atencion", reversed: true },
  { id: "mh_06", text: "Se me olvida el nombre de las personas justo después de que me las presentan.", style: "presencia", reversed: true },
  { id: "mh_07", text: "Parece como si funcionara en modo automático, sin darme cuenta realmente de lo que estoy haciendo.", style: "automatismo", reversed: true },
  { id: "mh_08", text: "Me apresuro a terminar mis tareas sin prestarles realmente mucha atención.", style: "automatismo", reversed: true },
  { id: "mh_09", text: "Me concentro tanto en la meta que quiero alcanzar que pierdo contacto con lo que estoy haciendo para conseguirla.", style: "atencion", reversed: true },
  { id: "mh_10", text: "Realizo tareas de forma automática, sin ponerles mucha atención.", style: "automatismo", reversed: true },
  { id: "mh_11", text: "Escucho a alguien con un oído mientras hago otra cosa al mismo tiempo.", style: "presencia", reversed: true },
  { id: "mh_12", text: "Llego a un lugar en «piloto automático» y luego me pregunto qué iba a hacer allí.", style: "automatismo", reversed: true },
  { id: "mh_13", text: "Me preocupo por cosas que pueden pasar en el futuro o por asuntos del pasado.", style: "presencia", reversed: true },
  { id: "mh_14", text: "Hago cosas sin ponerles realmente atención.", style: "atencion", reversed: true },
  { id: "mh_15", text: "Como entre comidas sin ser consciente de que estoy comiendo.", style: "automatismo", reversed: true },
];

export function computeMindfulnessHabResult(answers: Record<string, number>): {
  primary: MindfulnessHabStyle;
  averages: Record<MindfulnessHabStyle, number>;
} {
  const sums: Record<MindfulnessHabStyle, number> = { atencion: 0, automatismo: 0, presencia: 0 };
  const counts: Record<MindfulnessHabStyle, number> = { atencion: 0, automatismo: 0, presencia: 0 };

  for (const q of MINDFULNESS_HAB_QUESTIONS) {
    let val = answers[q.id];
    if (val !== undefined) {
      if (q.reversed) val = 6 - val;
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<MindfulnessHabStyle, number>;
  for (const style of MINDFULNESS_HAB_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = MINDFULNESS_HAB_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
