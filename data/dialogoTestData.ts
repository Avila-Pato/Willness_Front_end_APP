export type DialogoStyle = "reflexivo" | "anticipatorio" | "conflictivo" | "rumiativo";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const DIALOGO_STYLE_META: Record<DialogoStyle, StyleMeta> = {
  reflexivo: {
    label: "Diálogo reflexivo",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Reflexivo",
    description:
      "Tu voz interna trabaja a tu favor: la usas para entenderte, tomar decisiones y encontrar sentido a lo que te pasa. Es una herramienta genuina de autoconocimiento.",
    tip: "Cuida no quedarte solo en la reflexión. Conecta tus insights internos con acciones concretas en el mundo exterior.",
  },
  anticipatorio: {
    label: "Diálogo anticipatorio",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Anticipatorio",
    description:
      "Tu mente se prepara constantemente para el encuentro con los demás. Ensayas conversaciones, imaginas respuestas y planificas antes de actuar. Esto puede darte seguridad, aunque a veces te aleja del presente.",
    tip: "Practica dejar que algunas conversaciones fluyan sin guión previo. La espontaneidad también es una forma de conexión real.",
  },
  conflictivo: {
    label: "Diálogo en conflicto",
    color: "#9333EA",
    bg: "#FAF5FF",
    short: "Conflictivo",
    description:
      "Tu mundo interior está habitado por voces que no siempre se ponen de acuerdo. Esta tensión puede ser señal de una psique rica y compleja, aunque también puede agotarte cuando no encuentras resolución.",
    tip: "Aprende a observar ese diálogo interno sin identificarte con ninguna voz en particular. La escritura o la meditación pueden ayudarte a integrar esas partes.",
  },
  rumiativo: {
    label: "Diálogo rumiativo",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Rumiativo",
    description:
      "Tu voz interna tiende a repetir, analizar en exceso y quedarse atrapada en escenas pasadas o conversaciones inconclusas. Esto puede generarte angustia y dificultad para concentrarte.",
    tip: "Cuando notes que tu mente entra en bucle, intenta interrumpirlo con actividad física. El cuerpo puede ser un ancla eficaz para salir de la rumiación.",
  },
};

export const DIALOGO_STYLE_ORDER: DialogoStyle[] = [
  "reflexivo",
  "anticipatorio",
  "conflictivo",
  "rumiativo",
];

type DialogoQuestion = { id: string; text: string; style: DialogoStyle };

export const DIALOGO_QUESTIONS: DialogoQuestion[] = [
  { id: "dl_01", text: "Me gusta anticipar lo que dirán otras personas y responderles mentalmente.", style: "anticipatorio" },
  { id: "dl_02", text: "A menudo estoy dividido(a) entre distintos pensamientos.", style: "conflictivo" },
  { id: "dl_03", text: "A menudo mantengo mentalmente una discusión con argumentos de la parte contraria.", style: "conflictivo" },
  { id: "dl_04", text: "A veces, mi «yo bueno» discute con mi «yo malo».", style: "conflictivo" },
  { id: "dl_05", text: "A veces, al prepararme para hablar con alguien, ensayo mentalmente la conversación con antelación.", style: "anticipatorio" },
  { id: "dl_06", text: "A veces continúo mentalmente conversaciones inacabadas con otras personas.", style: "rumiativo" },
  { id: "dl_07", text: "A veces discuto con mi yo auténtico.", style: "conflictivo" },
  { id: "dl_08", text: "A menudo me doy cuenta de que, cuando estoy solo/a, mantengo una conversación mental con alguien.", style: "anticipatorio" },
  { id: "dl_09", text: "Cuando no puedo hablar en persona con alguien cercano, mantengo conversaciones con esa persona en mi mente.", style: "anticipatorio" },
  { id: "dl_10", text: "A menudo, después de una conversación, imagino un escenario diferente de cómo podría haber sido.", style: "rumiativo" },
  { id: "dl_11", text: "A menudo debato mis problemas internos en discusiones conmigo mismo.", style: "reflexivo" },
  { id: "dl_12", text: "En mis conversaciones mentales conmigo mismo, trato de encontrar sentido a los acontecimientos de mi vida.", style: "reflexivo" },
  { id: "dl_13", text: "Cuando me enfrento a una elección difícil, analizo conmigo mismo/a distintas opciones de solución desde diferentes puntos de vista.", style: "reflexivo" },
  { id: "dl_14", text: "Hablo conmigo mismo sobre lo que es importante para mí.", style: "reflexivo" },
  { id: "dl_15", text: "Mantengo diálogos internos que por dentro me destruyen.", style: "rumiativo" },
  { id: "dl_16", text: "Antes de una conversación importante, planifico lo que voy a decir, imaginando quién dirá qué.", style: "anticipatorio" },
  { id: "dl_17", text: "Los diálogos que mantengo en mi mente me impiden concentrarme en lo que tengo que hacer.", style: "rumiativo" },
  { id: "dl_18", text: "Algunos diálogos que mantengo mentalmente me angustian.", style: "rumiativo" },
  { id: "dl_19", text: "Gracias a mis diálogos internos, me conozco mejor y puedo responder a la pregunta de quién soy.", style: "reflexivo" },
  { id: "dl_20", text: "Después de un fracaso, me justifico mentalmente ante mí mismo/a y pienso en cómo podría haber salido mejor.", style: "reflexivo" },
  { id: "dl_21", text: "Me resulta más fácil decidirme a hacer algo si antes tomo una decisión mental en mi diálogo interno.", style: "reflexivo" },
  { id: "dl_22", text: "A menudo tengo la impresión de que en mí hay dos personalidades diferentes que discuten entre sí, quieren cosas distintas y se enfrentan entre ellas.", style: "conflictivo" },
  { id: "dl_23", text: "Los diálogos que mantengo en mi mente me atormentan.", style: "rumiativo" },
  { id: "dl_24", text: "A veces discuto con la parte de mí que no me gusta.", style: "conflictivo" },
  { id: "dl_25", text: "Me molesta que, en mis pensamientos, discuta conmigo mismo.", style: "rumiativo" },
  { id: "dl_26", text: "Mediante mis diálogos internos, a menudo llego a alguna verdad sobre mi vida y sobre mí mismo.", style: "reflexivo" },
];

export function computeDialogoResult(answers: Record<string, number>): {
  primary: DialogoStyle;
  averages: Record<DialogoStyle, number>;
} {
  const sums: Record<DialogoStyle, number> = { reflexivo: 0, anticipatorio: 0, conflictivo: 0, rumiativo: 0 };
  const counts: Record<DialogoStyle, number> = { reflexivo: 0, anticipatorio: 0, conflictivo: 0, rumiativo: 0 };

  for (const q of DIALOGO_QUESTIONS) {
    const val = answers[q.id];
    if (val !== undefined) {
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<DialogoStyle, number>;
  for (const style of DIALOGO_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = DIALOGO_STYLE_ORDER.reduce((a, b) => (averages[a] >= averages[b] ? a : b));

  return { primary, averages };
}
