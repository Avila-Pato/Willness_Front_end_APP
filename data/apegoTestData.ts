export type ApegoStyle = "seguro" | "ansioso" | "evitativo" | "desorganizado";

export type ApegoQuestion = {
  id: string;
  text: string;
  style: ApegoStyle;
};

export type ApegoStyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const APEGO_STYLE_META: Record<ApegoStyle, ApegoStyleMeta> = {
  seguro: {
    label: "Apego seguro",
    short: "Seguro",
    color: "#059669",
    bg: "#F0FDF4",
    description:
      "Te sientes cómodo con la cercanía y confías en los demás. Puedes depender de otros sin perder tu autonomía, y disfrutas de relaciones equilibradas donde hay tanto intimidad como espacio personal.",
    tip: "Continúa cultivando esa seguridad en tus vínculos. Tu capacidad de confiar y conectar puede ser un ancla emocional para quienes te rodean.",
  },
  ansioso: {
    label: "Apego ansioso",
    short: "Ansioso",
    color: "#DC2626",
    bg: "#FEF2F2",
    description:
      "Buscas mucha cercanía y a veces te preocupa que los demás no te quieran tanto como tú a ellos. Puedes sentir ansiedad cuando hay distancia o ambigüedad en tus relaciones.",
    tip: "Trabajar la autoestima y aprender a calmarte en la incertidumbre relacional puede ayudarte a sentirte más seguro sin necesitar validación constante.",
  },
  evitativo: {
    label: "Apego evitativo",
    short: "Evitativo",
    color: "#0284C7",
    bg: "#E0F2FE",
    description:
      "Valoras mucho tu independencia y tiendes a mantener distancia emocional. Puede costarte depender de otros o mostrar vulnerabilidad, incluso cuando en el fondo deseas conexión.",
    tip: "Aprender a confiar gradualmente y permitirte ser vulnerable puede abrirte a relaciones más profundas y satisfactorias sin que sientas que pierdes autonomía.",
  },
  desorganizado: {
    label: "Apego desorganizado",
    short: "Desorganizado",
    color: "#9333EA",
    bg: "#F5F3FF",
    description:
      "Anhelas conexión pero también te asusta. Puedes oscilar entre querer acercarte a alguien y alejarlo cuando se acerca demasiado. Esto suele surgir de experiencias relacionales complejas en el pasado.",
    tip: "Con el acompañamiento adecuado es posible desarrollar más seguridad en los vínculos y romper el ciclo de acercamiento y alejamiento.",
  },
};

export const APEGO_QUESTIONS: ApegoQuestion[] = [
  { id: "ape_01", style: "seguro",        text: "Sé que puedo contar con mis amigos si estoy pasando por un momento difícil." },
  { id: "ape_02", style: "ansioso",       text: "A veces siento que no soy lo suficientemente bueno para mis seres queridos." },
  { id: "ape_03", style: "evitativo",     text: "Me siento incómodo cuando mis amigos o familiares actúan como si dependieran de mí." },
  { id: "ape_04", style: "evitativo",     text: "Siempre doy el primer paso, pero normalmente pierdo el interés después de conseguir lo que quiero." },
  { id: "ape_05", style: "seguro",        text: "Sé que puedo mostrar mi verdadero yo en las relaciones una vez que tengo suficiente tiempo para sentirme cómodo." },
  { id: "ape_06", style: "desorganizado", text: "A veces me freno en las relaciones porque siento que, si comparto demasiado sobre mí, podría salir herido." },
  { id: "ape_07", style: "ansioso",       text: "Tiendo a preocuparme de que mis seres queridos no me quieran tanto como yo a ellos." },
  { id: "ape_08", style: "seguro",        text: "Me considero un buen amigo y una buena pareja." },
  { id: "ape_09", style: "evitativo",     text: "Me mantengo alejado de las relaciones a largo plazo." },
  { id: "ape_10", style: "ansioso",       text: "A veces, estar solo me asusta." },
  { id: "ape_11", style: "seguro",        text: "Me gusta salir con amigos y familiares, pero sigo valorando mi tiempo y espacio personal." },
  { id: "ape_12", style: "evitativo",     text: "No me gusta depender de los demás, y así evito decepcionarme." },
  { id: "ape_13", style: "evitativo",     text: "Me resulta difícil expresar amor, incluso cuando lo siento." },
  { id: "ape_14", style: "evitativo",     text: "Prefiero las aventuras casuales a las relaciones serias." },
  { id: "ape_15", style: "ansioso",       text: "Evito las discusiones con mis parejas, amigos o familiares, para evitar la posibilidad de perderlos." },
  { id: "ape_16", style: "desorganizado", text: "A veces quiero estar completamente solo, y de repente cambio a sentir que necesito estar rodeado de gente." },
  { id: "ape_17", style: "ansioso",       text: "Nunca doy el primer paso en una posible relación por miedo a ser rechazado." },
  { id: "ape_18", style: "evitativo",     text: "Mis amigos y familiares a menudo me dicen que sienten que realmente no me conocen." },
  { id: "ape_19", style: "seguro",        text: "Si mi pareja se fuera de viaje sin mí, le echaría de menos, pero en última instancia me alegraría de que disfrute." },
  { id: "ape_20", style: "ansioso",       text: "Una gran parte de mi autoestima proviene de mis relaciones con otras personas." },
  { id: "ape_21", style: "desorganizado", text: "A veces, cuando siento que me estoy acercando demasiado a alguien, me asusto y empiezo a alejarlo." },
  { id: "ape_22", style: "ansioso",       text: "Me siento mal cuando mis seres queridos hacen cosas sin invitarme." },
  { id: "ape_23", style: "seguro",        text: "Confío en que las personas a las que quiero quieren lo mejor para mí." },
  { id: "ape_24", style: "evitativo",     text: "Prefiero estar solo, pero asistiré a eventos sociales si es necesario." },
  { id: "ape_25", style: "seguro",        text: "Incluso cuando las cosas se ponen difíciles, confío en que mi pareja me apoyará y superaremos los desafíos juntos." },
  { id: "ape_26", style: "ansioso",       text: "A menudo me encuentro sobreanalizando las interacciones con mi pareja, preguntándome si realmente entienden mis sentimientos e intenciones." },
  { id: "ape_27", style: "desorganizado", text: "A veces alejo a la gente cuando se acerca demasiado, aunque en el fondo anhelo conexión e intimidad." },
  { id: "ape_28", style: "ansioso",       text: "Me cuesta relajarme en las relaciones porque siempre me preocupa si mis seres queridos realmente se preocupan por mí." },
  { id: "ape_29", style: "evitativo",     text: "Prefiero guardarme mis emociones, creyendo que la vulnerabilidad solo conduce a complicaciones innecesarias y a una posible decepción." },
  { id: "ape_30", style: "seguro",        text: "Disfruto pasando tiempo con mis amigos y familiares, sabiendo que podemos compartir tanto los buenos como los malos momentos." },
  { id: "ape_31", style: "evitativo",     text: "Me siento incómodo cuando la gente se acerca demasiado a mí emocionalmente; valoro mi independencia y mi espacio personal." },
  { id: "ape_32", style: "seguro",        text: "Saber que tengo un sólido sistema de apoyo de amigos y familiares me da la confianza para afrontar los retos de la vida con optimismo y resiliencia." },
  { id: "ape_33", style: "ansioso",       text: "Me preocupa que, si muestro vulnerabilidad o expreso mis necesidades en las relaciones, termine siendo rechazado o abandonado." },
  { id: "ape_34", style: "seguro",        text: "Agradezco el equilibrio entre independencia y cercanía en mis relaciones, lo que me permite perseguir mis propios intereses sin dejar de sentirme conectado con los demás." },
  { id: "ape_35", style: "ansioso",       text: "A menudo me siento ansioso por el estado de mis relaciones, buscando constantemente la confirmación de mi pareja o amigos para aliviar mis dudas." },
  { id: "ape_36", style: "evitativo",     text: "Prefiero manejar mis problemas por mi cuenta en lugar de depender de otros para obtener apoyo o consejo." },
  { id: "ape_37", style: "ansioso",       text: "Mi mente a menudo se acelera con pensamientos sobre posibles conflictos o malentendidos en mis relaciones, lo que dificulta disfrutar plenamente de los momentos de conexión sin preocuparme por el futuro." },
  { id: "ape_38", style: "seguro",        text: "Cuando me enfrento a desafíos, me siento reconfortado sabiendo que mis amigos me ofrecerán su apoyo y ánimo sin juzgarme." },
  { id: "ape_39", style: "ansioso",       text: "Tiendo a buscar constantemente la validación de mis amigos y parejas románticas para reafirmarme en su amor y compromiso." },
  { id: "ape_40", style: "evitativo",     text: "Tiendo a restar importancia a las relaciones románticas en mi vida, centrándome en cambio en mis objetivos e intereses individuales." },
  { id: "ape_41", style: "desorganizado", text: "A pesar de anhelar la intimidad y la conexión, me cuesta confiar plenamente en los demás y a menudo me freno por miedo a ser herido o abandonado." },
  { id: "ape_42", style: "seguro",        text: "Valoro la confianza y el respeto mutuos en mis relaciones, lo que me permite ser auténtico sin miedo al rechazo." },
  { id: "ape_43", style: "seguro",        text: "Pasar tiempo de calidad con mis seres queridos me llena de una sensación de calidez y seguridad, sabiendo que nos apoyamos mutuamente pase lo que pase." },
  { id: "ape_44", style: "desorganizado", text: "Tengo tendencia a alejar a la gente cuando intenta acercarse a mí, temiendo que permitirles entrar solo conduzca a la decepción o a la traición." },
  { id: "ape_45", style: "ansioso",       text: "A pesar de mis esfuerzos, me cuesta sacudirme la sensación de inseguridad que persiste en mi mente, cuestionando si realmente soy valorado y amado por mis seres más cercanos." },
  { id: "ape_46", style: "desorganizado", text: "Me resulta difícil abrirme a los demás sobre mis pensamientos y sentimientos más íntimos, prefiriendo mantener una cierta distancia para protegerme de un posible rechazo." },
  { id: "ape_47", style: "desorganizado", text: "El miedo al rechazo o a la traición a veces me impide invertir plenamente en las relaciones, lo que me hace sentir atrapado en un ciclo de anhelo de conexión y, al mismo tiempo, de temor a ella." },
  { id: "ape_48", style: "evitativo",     text: "La independencia es importante para mí, y priorizo mantener la autonomía en mis relaciones, evitando a menudo depender demasiado de los demás para obtener apoyo emocional o validación." },
];

export function computeApegoResult(answers: Record<string, number>) {
  const sums: Record<ApegoStyle, number> = { seguro: 0, ansioso: 0, evitativo: 0, desorganizado: 0 };
  const counts: Record<ApegoStyle, number> = { seguro: 0, ansioso: 0, evitativo: 0, desorganizado: 0 };

  for (const q of APEGO_QUESTIONS) {
    const score = answers[q.id];
    if (score === undefined) continue;
    sums[q.style] += score;
    counts[q.style]++;
  }

  const averages: Record<ApegoStyle, number> = { seguro: 0, ansioso: 0, evitativo: 0, desorganizado: 0 };
  for (const style of Object.keys(sums) as ApegoStyle[]) {
    averages[style] = counts[style] > 0 ? Math.round((sums[style] / counts[style]) * 10) / 10 : 0;
  }

  const primary = (Object.entries(averages).sort(([, a], [, b]) => b - a)[0][0]) as ApegoStyle;

  return { averages, primary };
}
