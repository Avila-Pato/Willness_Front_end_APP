export type ValorStyle =
  | "excelencia"
  | "conexion"
  | "logro"
  | "creatividad"
  | "conocimiento"
  | "seguridad"
  | "libertad"
  | "poder"
  | "armonia"
  | "servicio";

export type ValorQuestion = {
  id: string;
  text: string;
  style: ValorStyle;
};

export type ValorStyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

export const VALOR_STYLE_META: Record<ValorStyle, ValorStyleMeta> = {
  excelencia: {
    label: "Excelencia",
    short: "Excelencia",
    color: "#7C3AED",
    bg: "#F5F3FF",
    description:
      "Valoras la precisión, la calidad y la mejora continua. Eres tu propio crítico más exigente y estableces estándares elevados tanto para ti como para quienes te rodean.",
    tip: "Tu compromiso con la calidad es tu mayor fortaleza. Recuerda que 'suficientemente bueno' también tiene valor: la perfección rara vez es necesaria para que algo sea excelente.",
  },
  conexion: {
    label: "Conexión",
    short: "Conexión",
    color: "#EC4899",
    bg: "#FDF2F8",
    description:
      "Las relaciones son el centro de tu vida. Encuentras sentido en el cuidado y el amor hacia los demás, y tu felicidad está profundamente ligada al bienestar de quienes quieres.",
    tip: "Tu capacidad de conectar y nutrir relaciones es valiosa. Asegúrate de que tus propias necesidades emocionales también reciban la atención que mereces.",
  },
  logro: {
    label: "Logro",
    short: "Logro",
    color: "#D97706",
    bg: "#FFFBEB",
    description:
      "Eres orientado a metas y encuentras satisfacción profunda en alcanzar objetivos y ser reconocido por tus resultados. El éxito define gran parte de tu identidad.",
    tip: "Tu ambición es un motor poderoso. Reflexionar sobre qué significa el éxito más allá del reconocimiento externo puede abrirte a una satisfacción más duradera.",
  },
  creatividad: {
    label: "Creatividad",
    short: "Creatividad",
    color: "#9333EA",
    bg: "#FAF5FF",
    description:
      "Valoras la autoexpresión, la originalidad y la belleza. Necesitas espacios para crear y manifestar tu visión única del mundo de una forma que nadie más puede replicar.",
    tip: "Tu sensibilidad y creatividad son dones auténticos. Compartir tu mundo interior puede crear conexiones profundas y genuinas con los demás.",
  },
  conocimiento: {
    label: "Conocimiento",
    short: "Conocimiento",
    color: "#0284C7",
    bg: "#E0F2FE",
    description:
      "Valoras la comprensión profunda, el análisis y la independencia intelectual. Prefieres observar antes de actuar y buscar los patrones subyacentes en lo complejo.",
    tip: "Tu mente analítica es una fortaleza. Aprender a compartir tu conocimiento antes de sentirte completamente 'preparado' puede abrirte a nuevas oportunidades.",
  },
  seguridad: {
    label: "Seguridad",
    short: "Seguridad",
    color: "#16A34A",
    bg: "#F0FDF4",
    description:
      "Valoras la estabilidad, la lealtad y la previsibilidad. Eres una persona comprometida que analiza los riesgos con cuidado antes de dar un paso adelante.",
    tip: "Tu compromiso y lealtad son cualidades profundas. Trabajar la confianza en ti mismo puede ayudarte a actuar con más decisión frente a la incertidumbre.",
  },
  libertad: {
    label: "Libertad",
    short: "Libertad",
    color: "#F59E0B",
    bg: "#FFFBEB",
    description:
      "Valoras las posibilidades, la espontaneidad y la experiencia. Te aburres del statu quo y buscas constantemente nuevas aventuras, ideas y formas de crecer.",
    tip: "Tu optimismo y apertura son contagiosos. Comprometerte con algunas cosas en profundidad puede darte una satisfacción que va más allá de la búsqueda constante.",
  },
  poder: {
    label: "Poder",
    short: "Poder",
    color: "#DC2626",
    bg: "#FEF2F2",
    description:
      "Valoras la fuerza, el liderazgo y la capacidad de proteger e influir. Eres directo, asertivo y no temes el conflicto cuando es necesario para defender lo que crees.",
    tip: "Tu seguridad y liderazgo son notables. Integrar la escucha activa y la vulnerabilidad puede ampliar tu impacto de forma significativa.",
  },
  armonia: {
    label: "Armonía",
    short: "Armonía",
    color: "#059669",
    bg: "#ECFDF5",
    description:
      "Valoras la paz, la inclusión y el entendimiento mutuo. Eres un mediador natural que prioriza las resoluciones pacíficas y el bienestar de todos en el grupo.",
    tip: "Tu capacidad de ver todos los puntos de vista es muy valiosa. Recuerda que tus propias necesidades también importan: expresarlas no rompe la armonía.",
  },
  servicio: {
    label: "Servicio",
    short: "Servicio",
    color: "#BE185D",
    bg: "#FDF2F8",
    description:
      "Encuentras sentido profundo en ser útil para los demás. La sensación de que te necesitan y de marcar la diferencia en la vida de otros es central para tu identidad.",
    tip: "Tu generosidad es una fortaleza genuina. Cuidar también de tus propias necesidades no es egoísmo: es lo que te permite seguir dando a los demás de forma sostenible.",
  },
};

export const VALOR_STYLE_ORDER: ValorStyle[] = [
  "excelencia", "conexion", "logro", "creatividad", "conocimiento",
  "seguridad", "libertad", "poder", "armonia", "servicio",
];

export const VALOR_QUESTIONS: ValorQuestion[] = [
  // Excelencia
  { id: "vl_01", style: "excelencia",  text: "Me esfuerzo por lograr que todas mis tareas sean exactas y precisas." },
  { id: "vl_02", style: "excelencia",  text: "Me doy cuenta hasta de las más pequeñas incoherencias y errores en mi trabajo." },
  { id: "vl_03", style: "excelencia",  text: "Soy capaz de mantener unos estándares altos incluso con plazos ajustados." },
  { id: "vl_04", style: "excelencia",  text: "Reviso con frecuencia mi trabajo para asegurarme de que se ajuste a los estándares necesarios." },
  { id: "vl_05", style: "excelencia",  text: "Mejorar y perfeccionar los sistemas o procesos es una prioridad para mí." },
  { id: "vl_06", style: "excelencia",  text: "Puedo ser crítico/a conmigo o con los demás cuando se cometen errores." },
  { id: "vl_07", style: "excelencia",  text: "Para mí es importante asegurarme de que todos los detalles sean correctos antes de completar una tarea." },
  { id: "vl_08", style: "excelencia",  text: "A menudo encuentro formas de mejorar métodos que ya se consideran eficaces." },
  { id: "vl_09", style: "excelencia",  text: "Cuando me dan feedback, me centro en los detalles para entender cómo mejorar." },
  { id: "vl_10", style: "excelencia",  text: "Mi entorno de trabajo está bien organizado y cada cosa tiene un lugar específico." },
  { id: "vl_11", style: "excelencia",  text: "Me siento responsable de corregir las imprecisiones en beneficio de los demás." },
  { id: "vl_12", style: "excelencia",  text: "A menudo soy la persona en la que los demás confían para encontrar y subsanar errores." },

  // Conexión
  { id: "vl_13", style: "conexion",    text: "Noto de forma natural cuando alguien necesita apoyo emocional." },
  { id: "vl_14", style: "conexion",    text: "Tomo medidas activas para ayudar a los demás sin esperar nada a cambio." },
  { id: "vl_15", style: "conexion",    text: "Hacer que los demás se sientan queridos es una prioridad en mis relaciones." },
  { id: "vl_16", style: "conexion",    text: "Me resulta fácil entablar y mantener relaciones estrechas y personales." },
  { id: "vl_17", style: "conexion",    text: "Suelo anteponer las necesidades de los demás a las mías." },
  { id: "vl_18", style: "conexion",    text: "Me siento cómodo/a expresando afecto y cariño hacia los demás." },
  { id: "vl_19", style: "conexion",    text: "Mi felicidad está íntimamente ligada al bienestar de las personas que me importan." },
  { id: "vl_20", style: "conexion",    text: "A menudo acuden a mí personas que buscan consuelo o consejo." },
  { id: "vl_21", style: "conexion",    text: "Ayudar a los demás me hace sentir valorado/a y realizado/a." },
  { id: "vl_22", style: "conexion",    text: "Para mí es importante que valoren mis contribuciones." },

  // Logro
  { id: "vl_23", style: "logro",       text: "Marcarse objetivos y alcanzarlos es una parte fundamental de mi forma de definir el éxito." },
  { id: "vl_24", style: "logro",       text: "Me mueve la ambición y el deseo de tener éxito." },
  { id: "vl_25", style: "logro",       text: "Me gusta que reconozcan mis logros." },
  { id: "vl_26", style: "logro",       text: "Soy adaptable y destaco en una gran variedad de tareas y roles." },
  { id: "vl_27", style: "logro",       text: "Busco constantemente formas de mejorar mi eficacia y productividad." },
  { id: "vl_28", style: "logro",       text: "Que los demás me vean como una persona con éxito es una motivación importante para mí." },
  { id: "vl_29", style: "logro",       text: "Me fijo y persigo activamente nuevos objetivos una vez alcanzados los actuales." },
  { id: "vl_30", style: "logro",       text: "Adapto mi enfoque si ello implica lograr un objetivo de forma más eficaz." },

  // Creatividad
  { id: "vl_31", style: "creatividad", text: "Mi creatividad suele ser fruto de mis experiencias emocionales." },
  { id: "vl_32", style: "creatividad", text: "Necesito expresar mi individualidad en el trabajo o en iniciativas artísticas." },
  { id: "vl_33", style: "creatividad", text: "Me atrae la belleza y me rodeo de cosas bonitas que me inspiren." },
  { id: "vl_34", style: "creatividad", text: "Me siento más vivo/a al crear algo nuevo y original." },
  { id: "vl_35", style: "creatividad", text: "Mi estilo individual es un fiel reflejo de mi personalidad única." },
  { id: "vl_36", style: "creatividad", text: "A menudo encuentro inspiración creativa en lugares que otras personas pueden pasar por alto." },
  { id: "vl_37", style: "creatividad", text: "Confío en mis habilidades creativas y en mi visión particular." },
  { id: "vl_38", style: "creatividad", text: "Solicito feedback activamente para perfeccionar y mejorar mis proyectos creativos." },

  // Conocimiento
  { id: "vl_39", style: "conocimiento",text: "Prefiero observar y analizar antes de involucrarme en una situación." },
  { id: "vl_40", style: "conocimiento",text: "Recopilo y analizo datos para tomar decisiones con conocimiento de causa." },
  { id: "vl_41", style: "conocimiento",text: "Me gusta resolver problemas complejos llevando a cabo un análisis y una labor de investigación minuciosos." },
  { id: "vl_42", style: "conocimiento",text: "Soy prudente a la hora de compartir mis ideas hasta que no he examinado a fondo una cuestión." },
  { id: "vl_43", style: "conocimiento",text: "Valoro la riqueza y la complejidad en mis áreas de interés o especialización." },
  { id: "vl_44", style: "conocimiento",text: "Puedo adoptar un enfoque objetivo al analizar situaciones o problemas." },
  { id: "vl_45", style: "conocimiento",text: "A menudo busco principios o patrones subyacentes para entender cómo funcionan las cosas." },
  { id: "vl_46", style: "conocimiento",text: "Para mí, es esencial contar con privacidad y tiempo a solas para pensar." },
  { id: "vl_47", style: "conocimiento",text: "Me interesan más las ideas y los conceptos que la interacción social." },

  // Seguridad
  { id: "vl_48", style: "seguridad",   text: "Me mantengo alerta ante posibles riesgos y siempre planifico para hacer frente a imprevistos." },
  { id: "vl_49", style: "seguridad",   text: "Deseo encontrar seguridad y estabilidad en mi entorno y relaciones." },
  { id: "vl_50", style: "seguridad",   text: "Soy una persona leal y comprometida, sobre todo con la gente en quien confío." },
  { id: "vl_51", style: "seguridad",   text: "Antes de tomar decisiones, sopeso todas las posibles consecuencias y riesgos." },
  { id: "vl_52", style: "seguridad",   text: "Prefiero contar con directrices y expectativas claras para sentirme seguro/a en mi puesto de trabajo." },
  { id: "vl_53", style: "seguridad",   text: "A veces dudo a la hora de actuar por temor a equivocarme." },
  { id: "vl_54", style: "seguridad",   text: "Valoro la previsibilidad y la rutina, ya que proporcionan una sensación de estabilidad." },
  { id: "vl_55", style: "seguridad",   text: "Suelo pedir consejo o que otras personas me reafirmen antes de seguir adelante." },

  // Libertad
  { id: "vl_56", style: "libertad",    text: "Acepto el cambio y me adapto con facilidad a nuevas situaciones." },
  { id: "vl_57", style: "libertad",    text: "A menudo busco experiencias nuevas y estimulantes para que la vida siga siendo interesante." },
  { id: "vl_58", style: "libertad",    text: "Las tareas rutinarias me dan la oportunidad de encontrar formas creativas de involucrarme." },
  { id: "vl_59", style: "libertad",    text: "Me aburro rápidamente del statu quo y busco formas de innovar." },
  { id: "vl_60", style: "libertad",    text: "Planificar con demasiada antelación me parece restrictivo; prefiero la espontaneidad." },
  { id: "vl_61", style: "libertad",    text: "Soy optimista y suelo ver el lado positivo en las situaciones difíciles." },
  { id: "vl_62", style: "libertad",    text: "Me muevo bien en entornos que me dan libertad y capacidad de elección." },
  { id: "vl_63", style: "libertad",    text: "Se me da bien pensar sobre la marcha y sacar el máximo partido a los cambios inesperados." },
  { id: "vl_64", style: "libertad",    text: "Los nuevos proyectos e ideas me estimulan más que la implementación o el seguimiento." },
  { id: "vl_65", style: "libertad",    text: "Prefiero mantener abiertas mis opciones antes que comprometerme con una única forma de actuar." },
  { id: "vl_66", style: "libertad",    text: "Explorar y descubrir el mundo es una prioridad para mí." },

  // Poder
  { id: "vl_67", style: "poder",       text: "Asumo el mando de las situaciones y tengo confianza a la hora de tomar decisiones." },
  { id: "vl_68", style: "poder",       text: "Soy una persona asertiva a la hora de expresar mis opiniones y defender una postura." },
  { id: "vl_69", style: "poder",       text: "Proteger a las personas que me importan es tan importante como hacerme valer a mí mismo/a." },
  { id: "vl_70", style: "poder",       text: "No tengo miedo a la confrontación y me enfrento a los conflictos sin vacilar." },
  { id: "vl_71", style: "poder",       text: "Asumo de forma natural roles de liderazgo en entornos grupales." },
  { id: "vl_72", style: "poder",       text: "Las injusticias o la falta de equidad me incitan a actuar y me hacen alzar la voz." },
  { id: "vl_73", style: "poder",       text: "Respeto la fortaleza en los demás y me atraen las personas que también son asertivas." },
  { id: "vl_74", style: "poder",       text: "Soy autosuficiente y prefiero depender de mis propias aptitudes." },
  { id: "vl_75", style: "poder",       text: "Me siento cómodo/a con el poder y con utilizarlo para lograr cambios." },

  // Armonía
  { id: "vl_76", style: "armonia",     text: "Me esfuerzo por mantener la armonía en mis relaciones y en el entorno." },
  { id: "vl_77", style: "armonia",     text: "Suelo entender los múltiples puntos de vista de una cuestión e intento mediar en los desacuerdos." },
  { id: "vl_78", style: "armonia",     text: "Suele resultarme más cómodo evitar tensiones y conflictos que hacer frente a los problemas." },
  { id: "vl_79", style: "armonia",     text: "Trabajo para que todo el mundo se sienta escuchado e incluido en las conversaciones." },
  { id: "vl_80", style: "armonia",     text: "Se me da bien ayudar a los demás a encontrar un punto en común y llegar a un compromiso." },
  { id: "vl_81", style: "armonia",     text: "Para mí, tienen más importancia las resoluciones pacíficas que salir victorioso/a de una discusión." },
  { id: "vl_82", style: "armonia",     text: "A menudo soy yo quien pone paz en mi grupo de amigos o en el trabajo." },
  { id: "vl_83", style: "armonia",     text: "Prefiero escuchar y entender todos los puntos de vista antes de expresar el mío." },
  { id: "vl_84", style: "armonia",     text: "Me resulta difícil tomar decisiones cuando existe la posibilidad de que surja un conflicto." },
  { id: "vl_85", style: "armonia",     text: "A menudo sigo la corriente para no desequilibrar una situación." },
  { id: "vl_86", style: "armonia",     text: "Valoro un entorno tranquilo y sosegado en el que los conflictos sean mínimos." },
  { id: "vl_87", style: "armonia",     text: "Estoy dispuesto/a a renunciar a mis preferencias en aras de la armonía del grupo." },
  { id: "vl_88", style: "armonia",     text: "Para mí es importante que los conflictos se resuelvan de forma amistosa y sin resentimiento." },
  { id: "vl_89", style: "armonia",     text: "A veces quito importancia a mis propias necesidades para mantener la paz en mis relaciones." },
  { id: "vl_90", style: "armonia",     text: "Afronto los desacuerdos con el objetivo de encontrar una solución que satisfaga a todo el mundo." },
  { id: "vl_91", style: "armonia",     text: "Creo que preservar una relación es más importante que salir victorioso/a de una discusión." },

  // Servicio
  { id: "vl_92", style: "servicio",    text: "Busco activamente formas de apoyar y motivar a los demás." },
  { id: "vl_93", style: "servicio",    text: "Para mí es importante que los demás me consideren una persona atenta y amable." },
  { id: "vl_94", style: "servicio",    text: "A menudo ofrezco ayuda antes de que me la pidan." },
  { id: "vl_95", style: "servicio",    text: "Mi estado de ánimo se ve afectado por los estados emocionales de quienes me rodean." },
  { id: "vl_96", style: "servicio",    text: "Siento una gran satisfacción cuando logro hacerle la vida más fácil a alguien." },
  { id: "vl_97", style: "servicio",    text: "Que otras personas me necesiten me hace sentirme realizado/a." },
  { id: "vl_98", style: "servicio",    text: "Doy prioridad a las relaciones en las que puedo ser útil y marcar la diferencia." },
  { id: "vl_99", style: "servicio",    text: "Respondo con rapidez a las necesidades de mi familia y amigos." },
  { id: "vl_100", style: "servicio",   text: "A menudo antepongo el bienestar de los demás al mío propio." },
];

export function computeValoresResult(answers: Record<string, number>) {
  const sums: Record<ValorStyle, number> = {
    excelencia: 0, conexion: 0, logro: 0, creatividad: 0, conocimiento: 0,
    seguridad: 0, libertad: 0, poder: 0, armonia: 0, servicio: 0,
  };
  const counts: Record<ValorStyle, number> = {
    excelencia: 0, conexion: 0, logro: 0, creatividad: 0, conocimiento: 0,
    seguridad: 0, libertad: 0, poder: 0, armonia: 0, servicio: 0,
  };

  for (const q of VALOR_QUESTIONS) {
    const score = answers[q.id];
    if (score === undefined) continue;
    sums[q.style] += score;
    counts[q.style]++;
  }

  const averages: Record<ValorStyle, number> = {
    excelencia: 0, conexion: 0, logro: 0, creatividad: 0, conocimiento: 0,
    seguridad: 0, libertad: 0, poder: 0, armonia: 0, servicio: 0,
  };
  for (const style of Object.keys(sums) as ValorStyle[]) {
    averages[style] = counts[style] > 0 ? Math.round((sums[style] / counts[style]) * 10) / 10 : 0;
  }

  const primary = (Object.entries(averages).sort(([, a], [, b]) => b - a)[0][0]) as ValorStyle;

  return { averages, primary };
}
