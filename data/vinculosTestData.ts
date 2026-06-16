export type VinculoStyle = "seguro" | "ansioso" | "evitativo";

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const VINCULOS_STYLE_META: Record<VinculoStyle, StyleMeta> = {
  seguro: {
    label: "Vínculo seguro",
    color: "#059669",
    bg: "#F0FDF4",
    short: "Seguro",
    description:
      "Te sientes cómodo/a con la intimidad y la dependencia mutua. Confías en tu pareja y en ti mismo/a, puedes expresar lo que sientes y toleras bien la distancia sin que te genere angustia. Es el patrón más saludable y adaptativo en las relaciones románticas.",
    tip: "Sigue cultivando la comunicación abierta y la confianza. Si tienes pareja con un estilo diferente, tu estabilidad puede ser un recurso valioso para la relación.",
  },
  ansioso: {
    label: "Vínculo ansioso",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Ansioso",
    description:
      "Las relaciones ocupan mucho espacio en tu mente. Temes el abandono, buscas constante reafirmación y la posibilidad de perder al otro te genera angustia intensa. Esto puede llevar a comportamientos que alejan justo lo que más deseas: cercanía y seguridad.",
    tip: "Trabaja en identificar cuándo tu ansiedad interpreta señales que no están ahí. La terapia de apego y las técnicas de regulación emocional pueden ayudarte a sentirte más seguro/a desde dentro.",
  },
  evitativo: {
    label: "Vínculo evitativo",
    color: "#0284C7",
    bg: "#F0F9FF",
    short: "Evitativo",
    description:
      "Valoras mucho tu independencia y te incomoda la cercanía emocional. Tiendes a desconectarte cuando los vínculos se vuelven intensos, o a priorizar la autosuficiencia sobre el compromiso. Esto puede protegerte del dolor, pero también te aleja de la intimidad real.",
    tip: "Observa si tu necesidad de distancia es una preferencia genuina o una defensa. Permitirte ser vulnerable con alguien de confianza, poco a poco, puede ampliar tu capacidad de conexión sin perder tu autonomía.",
  },
};

export const VINCULOS_STYLE_ORDER: VinculoStyle[] = ["seguro", "ansioso", "evitativo"];

type VinculoQuestion = { id: string; text: string; style: VinculoStyle };

export const VINCULOS_QUESTIONS: VinculoQuestion[] = [
  { id: "vn_01", text: "A menudo me inquieta la posibilidad de que mi pareja deje de amarme.", style: "ansioso" },
  { id: "vn_02", text: "Me resulta fácil demostrar cariño a mi pareja.", style: "seguro" },
  { id: "vn_03", text: "Temo que si alguien llega a conocerme a fondo, no le guste lo que descubra.", style: "ansioso" },
  { id: "vn_04", text: "Me recupero rápidamente cuando una relación termina. Me resulta extraño la facilidad con que puedo quitarme a alguien de la cabeza.", style: "evitativo" },
  { id: "vn_05", text: "Cuando no tengo pareja, me siento angustiado/a e incompleto/a.", style: "ansioso" },
  { id: "vn_06", text: "Me cuesta apoyar emocionalmente a mi pareja cuando atraviesa un mal momento.", style: "evitativo" },
  { id: "vn_07", text: "Cuando mi pareja no está a mi lado, temo que se interesa por otra persona.", style: "ansioso" },
  { id: "vn_08", text: "Me siento cómodo/a con la idea de depender de mi pareja sentimental.", style: "seguro" },
  { id: "vn_09", text: "Para mí, la independencia es más importante que las relaciones.", style: "evitativo" },
  { id: "vn_10", text: "Prefiero no compartir mis sentimientos más íntimos con mi pareja.", style: "evitativo" },
  { id: "vn_11", text: "Temo que mi pareja no me corresponda si le demuestro lo que siento por ella.", style: "ansioso" },
  { id: "vn_12", text: "Por lo general, mis relaciones me satisfacen.", style: "seguro" },
  { id: "vn_13", text: "No siento la necesidad de demostrar mis sentimientos en el contexto de las relaciones afectivas.", style: "evitativo" },
  { id: "vn_14", text: "Pienso mucho en mis relaciones.", style: "ansioso" },
  { id: "vn_15", text: "Me cuesta depender de mis parejas sentimentales.", style: "evitativo" },
  { id: "vn_16", text: "Tiendo a vincularme con rapidez a mi pareja sentimental.", style: "ansioso" },
  { id: "vn_17", text: "Me resulta difícil expresarle a mi pareja mis necesidades y deseos.", style: "evitativo" },
  { id: "vn_18", text: "A veces me enfado o me impaciento con mi pareja sin saber por qué.", style: "ansioso" },
  { id: "vn_19", text: "Estoy muy pendiente de los estados de ánimo de mi pareja.", style: "ansioso" },
  { id: "vn_20", text: "Creo que la mayoría de las personas son básicamente honradas y de fiar.", style: "seguro" },
  { id: "vn_21", text: "Prefiero el sexo ocasional con alguien que acabo de conocer a intimar con un compañero/a fijo.", style: "evitativo" },
  { id: "vn_22", text: "No me incomoda compartir mis pensamientos y sentimientos íntimos con mi pareja.", style: "seguro" },
  { id: "vn_23", text: "Temo que mi pareja me abandone si conoce a otra persona.", style: "ansioso" },
  { id: "vn_24", text: "Me pone nervioso/a que mi pareja se acerque demasiado a mí.", style: "evitativo" },
  { id: "vn_25", text: "En caso de conflicto, tiendo a hacer o decir cosas por impulso de las que más tarde me arrepiento, en lugar de hablar las cosas con calma.", style: "ansioso" },
  { id: "vn_26", text: "Por lo general, las discusiones con mi pareja no me hacen cuestionar toda la relación.", style: "seguro" },
  { id: "vn_27", text: "Mi pareja a menudo desea que me muestre más cariñoso/a de lo que a mí me gustaría.", style: "evitativo" },
  { id: "vn_28", text: "Me preocupa no ser lo bastante atractivo/a.", style: "ansioso" },
  { id: "vn_29", text: "A veces las personas se cansan de mí porque tiendo a provocar pequeños dramas en mis relaciones.", style: "ansioso" },
  { id: "vn_30", text: "Echo de menos a mi pareja cuando estamos separados, pero cuando vuelvo a verla siento la necesidad de escapar.", style: "evitativo" },
  { id: "vn_31", text: "Cuando disiento con alguien, no me cuesta expresar mi opinión.", style: "seguro" },
  { id: "vn_32", text: "Odio tener la sensación de que otras personas dependen de mí.", style: "evitativo" },
  { id: "vn_33", text: "Si alguien que me interesa se fija en otras personas, no dejo que me perturbe. Tal vez sienta una punzada de celos, pero la sensación es pasajera.", style: "seguro" },
  { id: "vn_34", text: "Si alguien que me interesa se fija en otras personas, me siento aliviado/a. Significa que no pretende entablar una relación de exclusividad.", style: "evitativo" },
  { id: "vn_35", text: "Si alguien que me interesa se fija en otras personas, me deprimo.", style: "ansioso" },
  { id: "vn_36", text: "Si mi pareja se muestra fría y distante, me pregunto qué le pasa, pero no comprendo que su actitud probablemente no tiene nada que ver conmigo.", style: "ansioso" },
  { id: "vn_37", text: "Si mi pareja se muestra fría y distante, lo más probable es que su actitud no me afecte. Tal vez incluso me sienta aliviado/a.", style: "evitativo" },
  { id: "vn_38", text: "Si mi pareja se muestra fría y distante, pienso que he hecho algo mal.", style: "ansioso" },
  { id: "vn_39", text: "Si mi pareja quisiera romper conmigo, haría lo posible por demostrarle lo que se pierde.", style: "ansioso" },
  { id: "vn_40", text: "Si alguien con quien llevo saliendo varios meses quisiera dejar de verme, me sentiría herido/a al principio, pero lo superaría.", style: "seguro" },
  { id: "vn_41", text: "A veces, cuando consigo lo que quiero de una persona, ya no estoy seguro/a de lo que quiero.", style: "evitativo" },
  { id: "vn_42", text: "No me importaría seguir en contacto con mi ex (en términos platónicos). Al fin y al cabo, tenemos mucho en común.", style: "seguro" },
];

export function computeVinculosResult(answers: Record<string, number>): {
  primary: VinculoStyle;
  averages: Record<VinculoStyle, number>;
} {
  const sums: Record<VinculoStyle, number> = { seguro: 0, ansioso: 0, evitativo: 0 };
  const counts: Record<VinculoStyle, number> = { seguro: 0, ansioso: 0, evitativo: 0 };

  for (const q of VINCULOS_QUESTIONS) {
    const val = answers[q.id];
    if (val !== undefined) {
      sums[q.style] += val;
      counts[q.style]++;
    }
  }

  const averages = {} as Record<VinculoStyle, number>;
  for (const style of VINCULOS_STYLE_ORDER) {
    averages[style] = counts[style] > 0 ? sums[style] / counts[style] : 0;
  }

  const primary = VINCULOS_STYLE_ORDER.reduce((a, b) =>
    averages[a] >= averages[b] ? a : b
  );

  return { primary, averages };
}
