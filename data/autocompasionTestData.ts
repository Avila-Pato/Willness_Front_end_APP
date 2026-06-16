export type AutocompasionStyle = "amabilidad" | "humanidad" | "ecuanimidad";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const AUTOCOMPASION_STYLE_META: Record<AutocompasionStyle, StyleMeta> = {
  amabilidad: {
    label: "Amabilidad contigo mismo",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Amabilidad",
    description:
      "Tu mayor fortaleza es la forma en que te hablas y te tratas cuando sufres. En lugar de criticarte duramente, tiendes a ser comprensivo contigo mismo y a reconocer que mereces el mismo cuidado que darías a alguien que quieres.",
    tip: "Sigue cultivando esa voz interna amable. Cuando notes autocrítica, pregúntate: ¿cómo le hablaría a un amigo que está pasando por esto?",
  },
  humanidad: {
    label: "Humanidad compartida",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Humanidad",
    description:
      "Tienes una capacidad especial para recordar que el sufrimiento, el fracaso y la imperfección son parte de la experiencia humana compartida. Esto te ayuda a no sentirte solo en los momentos difíciles y a conectar con los demás desde la empatía.",
    tip: "Cuando te sientas solo en algo difícil, recuerda que hay personas que ahora mismo sienten algo similar. Esa conexión invisible es real y reconfortante.",
  },
  ecuanimidad: {
    label: "Ecuanimidad y presencia",
    color: "#9333EA",
    bg: "#FAF5FF",
    short: "Ecuanimidad",
    description:
      "Tu fortaleza está en tu capacidad de mantener una perspectiva equilibrada ante el dolor emocional: ni lo exageras ni lo suprimes. Puedes observar tus pensamientos y emociones con apertura en lugar de dejarte arrastrar por ellos.",
    tip: "Cuando notes que un pensamiento doloroso te absorbe, prueba a observarlo con curiosidad: '¿Qué estoy sintiendo ahora?' en lugar de fusionarte con la emoción.",
  },
};

export const AUTOCOMPASION_STYLE_ORDER: AutocompasionStyle[] = [
  "amabilidad",
  "humanidad",
  "ecuanimidad",
];

type AutocompasionQuestion = {
  id: string;
  text: string;
  style: AutocompasionStyle;
  reversed?: boolean;
};

export const AUTOCOMPASION_QUESTIONS: AutocompasionQuestion[] = [
  // Presented in original SCS order (1–26), reversals handled in compute
  { id: "ac_01", text: "Suelo estar desaprobando y criticando mis defectos y mis propias carencias.", style: "amabilidad", reversed: true },
  { id: "ac_02", text: "Cuando me siento deprimido, tiendo a obsesionarme y fijarme en todo lo que está mal.", style: "ecuanimidad", reversed: true },
  { id: "ac_03", text: "Cuando las cosas me van mal, veo las dificultades como parte de la vida y pienso que a todo el mundo le pasa de vez en cuando.", style: "humanidad" },
  { id: "ac_04", text: "Cuando pienso en mis insuficiencias, me siento separado y aislado del resto del mundo.", style: "humanidad", reversed: true },
  { id: "ac_05", text: "Trato de ser amigable conmigo mismo cuando siento algo de dolor emocional.", style: "amabilidad" },
  { id: "ac_06", text: "Cuando fallo en algo importante, me siento embargado por sentimientos de carencia.", style: "ecuanimidad", reversed: true },
  { id: "ac_07", text: "Cuando estoy triste y abatido, me acuerdo de que hay muchas otras personas en el mundo que sienten lo mismo que yo.", style: "humanidad" },
  { id: "ac_08", text: "Cuando hay momentos complicados o duros, tiendo a ser severo conmigo mismo.", style: "amabilidad", reversed: true },
  { id: "ac_09", text: "Cuando algo me molesta, lo trato con ecuanimidad y mantengo mis emociones en equilibrio.", style: "ecuanimidad" },
  { id: "ac_10", text: "Cuando me siento fuera de lugar, trato de recordarme que esos sentimientos de incomodidad son compartidos por mucha gente.", style: "humanidad" },
  { id: "ac_11", text: "Soy intolerante e impaciente con aquellos aspectos de mi personalidad que no me gustan.", style: "amabilidad", reversed: true },
  { id: "ac_12", text: "Cuando estoy pasando por un momento muy duro, me aporto el amor y la ternura que necesito.", style: "amabilidad" },
  { id: "ac_13", text: "Cuando me siento deprimido, tiendo a sentir que hay muchas personas con mayor felicidad que yo.", style: "humanidad", reversed: true },
  { id: "ac_14", text: "Cuando sucede algo doloroso, trato de tener una perspectiva equilibrada de ese momento.", style: "ecuanimidad" },
  { id: "ac_15", text: "Trato de ver mis defectos como parte de la naturaleza humana.", style: "humanidad" },
  { id: "ac_16", text: "Cuando veo aspectos de mi persona que no me gustan, me hundo en la tristeza.", style: "amabilidad", reversed: true },
  { id: "ac_17", text: "Cuando fallo en algo importante en mi vida, trato de verlo desde una amplia perspectiva.", style: "ecuanimidad" },
  { id: "ac_18", text: "Cuando estoy invirtiendo mucho esfuerzo en algo, tiendo a sentir que otras personas lo consiguen sin dificultad.", style: "humanidad", reversed: true },
  { id: "ac_19", text: "Soy amable conmigo mismo cuando estoy experimentando cualquier tipo de sufrimiento.", style: "amabilidad" },
  { id: "ac_20", text: "Cuando algo me molesta, siento que me arrastran y que me sobrepasan mis emociones.", style: "ecuanimidad", reversed: true },
  { id: "ac_21", text: "Cuando estoy experimentando algo de sufrimiento, puedo ser un poco insensible conmigo mismo.", style: "amabilidad", reversed: true },
  { id: "ac_22", text: "Cuando me siento deprimido, trato de acercarme a mis sentimientos con curiosidad y apertura.", style: "ecuanimidad" },
  { id: "ac_23", text: "Soy tolerante con mis propios defectos y carencias.", style: "amabilidad" },
  { id: "ac_24", text: "Cuando sucede algo doloroso, tiendo a magnificar el incidente de manera desproporcionada.", style: "ecuanimidad", reversed: true },
  { id: "ac_25", text: "Cuando fallo en algo que es importante en mi vida, tiendo a sentirme solo en mi fracaso.", style: "humanidad", reversed: true },
  { id: "ac_26", text: "Trato de ser comprensivo y paciente hacia aquellos aspectos de mi personalidad que no me gustan.", style: "amabilidad" },
];

export function computeAutocompasionResult(answers: Record<string, number>): {
  primary: AutocompasionStyle;
  averages: Record<AutocompasionStyle, number>;
} {
  const sums: Record<AutocompasionStyle, number> = { amabilidad: 0, humanidad: 0, ecuanimidad: 0 };
  const counts: Record<AutocompasionStyle, number> = { amabilidad: 0, humanidad: 0, ecuanimidad: 0 };

  for (const q of AUTOCOMPASION_QUESTIONS) {
    let val = answers[q.id];
    if (val !== undefined) {
      if (q.reversed) val = 6 - val;
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<AutocompasionStyle, number>;
  for (const style of AUTOCOMPASION_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = AUTOCOMPASION_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
