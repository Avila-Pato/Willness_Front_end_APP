import { ChallengeQuestion } from "@/types/challenges";

export type ReflexionGroup = {
  id: string;
  title: string;
  description: string;
  color: string;
  bg: string;
  questions: ChallengeQuestion[];
};

const q = (
  id: string,
  statement: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): ChallengeQuestion => ({ id, statement, options, correctIndex, explanation });

export const COMPLETA_REFLEXION_GROUPS: ReflexionGroup[] = [
  {
    id: "cr_limites",
    title: "El límite sano",
    description: "Completa frases de Nedra Tawwab y otros sobre poner límites",
    color: "#7C3AED",
    bg: "#EDE9FE",
    questions: [
      q(
        "crl1",
        "Según Nedra Tawwab, los límites son una expresión de ___ propio, no de rechazo hacia los demás.",
        ["amor", "enojo", "miedo", "indiferencia"],
        0,
        "En 'Pon límites, encuentra la paz', Tawwab explica que establecer límites es una forma de amor propio. Protegen tu energía, tu tiempo y tus valores sin necesitar la aprobación de los demás.",
      ),
      q(
        "crl2",
        "Un límite no se pone para controlar al otro, sino para proteger tu ___ y tus valores.",
        ["bienestar", "imagen", "perfección", "estatus"],
        0,
        "Los límites son herramientas de autocuidado, no de control ajeno. Comunicarlos con claridad y respeto permite que las relaciones sean más honestas y sostenibles.",
      ),
      q(
        "crl3",
        "Los límites sanos no son muros; son ___ que protegen sin aislar.",
        ["puertas", "reglas", "contratos", "castigos"],
        0,
        "La metáfora de la puerta refleja que los límites sanos permiten elegir quién entra y quién no, sin cerrarse completamente. La rigidez y la apertura total son los dos extremos a evitar.",
      ),
      q(
        "crl4",
        "Mantener un límite con alguien que no lo respeta requiere ___, no negociación continua.",
        ["consistencia", "silencio", "resignación", "flexibilidad"],
        0,
        "Cuando un límite se cede ante la presión, el otro aprende que puede ignorarlo. La consistencia al mantenerlo, sin necesidad de justificarlo repetidamente, es lo que lo hace efectivo.",
      ),
    ],
  },
  {
    id: "cr_autoconocimiento",
    title: "Crecer desde adentro",
    description: "Completa ideas sobre conocerte y transformarte",
    color: "#4D8B7A",
    bg: "#E8F0EE",
    questions: [
      q(
        "cra1",
        "Un hombre es literalmente lo que ___, su carácter siendo la suma de todos sus pensamientos. — James Allen",
        ["piensa", "siente", "dice", "hace"],
        0,
        "En 'Como el Hombre Piensa', James Allen sostiene que los pensamientos moldean el carácter y el destino. Cambiar el pensamiento es el primer paso para transformar la vida.",
      ),
      q(
        "cra2",
        "El ___ es el primer paso hacia el cambio personal: sin conocerte, no puedes transformarte.",
        ["autoconocimiento", "éxito", "esfuerzo", "talento"],
        0,
        "Conocerse a uno mismo —fortalezas, limitaciones, emociones, patrones— es la base del crecimiento personal. Sin autoconocimiento, los cambios suelen ser superficiales o temporales.",
      ),
      q(
        "cra3",
        "Observar tus patrones sin juzgarlos es la base de la ___ y el crecimiento consciente.",
        ["autoconciencia", "perfección", "comparación", "disciplina"],
        0,
        "La autoconciencia permite ver los propios patrones como observador, sin que el juicio los amplifique. Desde ese lugar neutral es posible elegir responder de forma diferente.",
      ),
      q(
        "cra4",
        "La autocrítica severa suele generar ___, vergüenza y evitación, no mejora ni aprendizaje.",
        ["parálisis", "claridad", "motivación", "crecimiento"],
        0,
        "La autocrítica dura activa el sistema de amenaza, lo que dificulta el aprendizaje. La autocompasión, en cambio, activa la motivación de crecimiento sin el costo del autoataque.",
      ),
    ],
  },
  {
    id: "cr_bienestar",
    title: "Tu salud mental",
    description: "Completa conceptos clave de psicología y bienestar",
    color: "#D97706",
    bg: "#FEF3C7",
    questions: [
      q(
        "crb1",
        "La comunicación asertiva te permite expresar lo que sientes y necesitas sin ___ a los demás.",
        ["atacar", "escuchar", "respetar", "ayudar"],
        0,
        "La asertividad busca el equilibrio entre expresar las propias necesidades y respetar las del otro. Decir lo que sientes sin atacar ni someterte es la base de toda relación sana.",
      ),
      q(
        "crb2",
        "Practicar la ___ de forma regular reduce el estrés, activa emociones positivas y mejora la perspectiva.",
        ["gratitud", "comparación", "perfección", "exigencia"],
        0,
        "Estudios en psicología positiva muestran que la práctica deliberada de la gratitud activa emociones positivas, reduce el estrés y mejora la perspectiva sobre la propia vida.",
      ),
      q(
        "crb3",
        "El bienestar real convive con toda la gama emocional. Intentar estar feliz todo el tiempo genera más ___.",
        ["sufrimiento", "calma", "resiliencia", "conexión"],
        0,
        "La supresión emocional tiene un costo real en el bienestar. La clave está en la capacidad de procesar todas las emociones, no en eliminar las difíciles.",
      ),
      q(
        "crb4",
        "La OMS define la salud como bienestar físico, mental y ___. Cuidar solo uno de ellos es insuficiente.",
        ["social", "espiritual", "económico", "intelectual"],
        0,
        "El bienestar integral requiere atender las tres dimensiones. Descuidar la dimensión social, por ejemplo, impacta directamente la salud mental y física.",
      ),
    ],
  },
  {
    id: "cr_relaciones",
    title: "El vínculo sano",
    description: "Completa ideas sobre comunicación y relaciones que nutren",
    color: "#BE185D",
    bg: "#FDF2F8",
    questions: [
      q(
        "crr1",
        "Los vínculos seguros se construyen con ___, honestidad y confianza a lo largo del tiempo.",
        ["consistencia", "intensidad", "pasión", "distancia"],
        0,
        "El apego seguro se desarrolla cuando hay presencia consistente, honestidad y confianza mutua. No surge de la intensidad, sino de la constancia.",
      ),
      q(
        "crr2",
        "En una relación sana, el amor no elimina el conflicto; enseña a ___ con respeto y empatía.",
        ["gestionarlo", "ignorarlo", "evitarlo", "suprimirlo"],
        0,
        "Los conflictos son inevitables en toda relación cercana. Lo que define la salud de un vínculo es cómo se gestionan: con escucha, respeto y voluntad de encontrar soluciones juntos.",
      ),
      q(
        "crr3",
        "La dependencia emocional se distingue del amor porque genera ___ ante la ausencia del otro.",
        ["ansiedad", "calma", "crecimiento", "confianza"],
        0,
        "El amor sano permite la autonomía de ambas personas. La dependencia emocional genera ansiedad ante la ausencia y dificultad para funcionar de forma independiente.",
      ),
      q(
        "crr4",
        "Escuchar activamente implica prestar atención plena sin ___ ni preparar tu respuesta mientras el otro habla.",
        ["interrumpir", "responder", "pensar", "sentir"],
        0,
        "La escucha activa requiere estar presente de verdad: sin interrumpir, sin preparar la respuesta, sin juzgar. Es uno de los actos más poderosos de conexión y reconocimiento.",
      ),
    ],
  },
];
