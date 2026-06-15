import { ChallengeQuestion } from "@/types/challenges";

export type PatronGroup = {
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

export const IDENTIFICA_PATRON_GROUPS: PatronGroup[] = [
  {
    id: "ip_comunicacion",
    title: "Cómo hablas",
    description: "Detecta patrones en la forma en que te expresas con otros",
    color: "#D97706",
    bg: "#FEF3C7",
    questions: [
      q(
        "ipc1",
        "Marco le dice a Laura 'No me importa, haz lo que quieras' pero después la ignora todo el día y responde con monosílabos. ¿Qué patrón muestra?",
        ["Comunicación asertiva", "Comunicación pasivo-agresiva", "Escucha activa", "Límite sano"],
        1,
        "La comunicación pasivo-agresiva evita el conflicto directo pero lo expresa de forma indirecta: silencios, frialdad, respuestas cortantes. No resuelve el problema; lo prolonga.",
      ),
      q(
        "ipc2",
        "Valeria le cuenta su malestar a otras personas en vez de hablar directamente con quien la afectó. ¿Qué patrón es?",
        ["Asertividad", "Comunicación indirecta", "Empatía profunda", "Confrontación sana"],
        1,
        "Comunicar el malestar a terceros en lugar de a la persona involucrada es comunicación indirecta. Alivia en el corto plazo pero no resuelve el conflicto y puede generar más tensión.",
      ),
      q(
        "ipc3",
        "Marta le dice a su pareja: 'Si me quisieras, sabrías lo que necesito sin que yo lo diga'. ¿Qué patrón muestra?",
        ["Límite sano", "Expectativa de lectura mental", "Comunicación asertiva", "Empatía"],
        1,
        "Esperar que otros adivinen nuestras necesidades sin comunicarlas genera frustración y malentendidos. La comunicación directa y clara es la alternativa sana a este patrón.",
      ),
      q(
        "ipc4",
        "Jorge interrumpe frecuentemente a sus compañeros creyendo que sus ideas son más urgentes. ¿Qué patrón de comunicación muestra?",
        ["Liderazgo asertivo", "Escucha activa", "Comunicación dominante", "Asertividad"],
        2,
        "La comunicación dominante busca controlar la conversación sin dar espacio al otro. Dificulta la escucha genuina y daña la confianza y el respeto mutuo en las relaciones.",
      ),
    ],
  },
  {
    id: "ip_pensamientos",
    title: "Cómo piensas",
    description: "Identifica los sesgos cognitivos que distorsionan tu realidad",
    color: "#0284C7",
    bg: "#E0F2FE",
    questions: [
      q(
        "ipp1",
        "Sofía piensa 'nunca hago nada bien' y 'siempre me equivoco' tras cometer un solo error en el trabajo. ¿Qué patrón cognitivo muestra?",
        ["Pensamiento realista", "Generalización excesiva", "Autoconocimiento", "Reflexión constructiva"],
        1,
        "La generalización excesiva usa palabras absolutas como 'nunca', 'siempre', 'jamás' para sacar conclusiones globales de eventos aislados. Es un patrón cognitivo que distorsiona la realidad.",
      ),
      q(
        "ipp2",
        "Diego no envía su proyecto porque piensa: 'Si no es perfecto, mejor no presentarlo'. ¿Qué patrón cognitivo lo detiene?",
        ["Pensamiento todo-o-nada", "Autocompasión", "Resiliencia", "Asertividad"],
        0,
        "El pensamiento todo-o-nada ve las situaciones en extremos sin matices: todo es éxito total o fracaso total. Suele generar parálisis, perfeccionismo y evitación.",
      ),
      q(
        "ipp3",
        "Cuando su jefe no la saluda por la mañana, Ana piensa inmediatamente: 'Me van a despedir'. ¿Qué distorsión cognitiva ocurre?",
        ["Pensamiento realista", "Catastrofismo", "Autoconocimiento", "Reflexión objetiva"],
        1,
        "El catastrofismo consiste en imaginar el peor escenario posible como si fuera el más probable. Genera ansiedad y dificulta la toma de decisiones desde la calma.",
      ),
      q(
        "ipp4",
        "Carlos se siente responsable de que su amigo esté de mal humor, aunque no tenga nada que ver con él. ¿Qué sesgo muestra?",
        ["Personalización", "Empatía profunda", "Autocompasión", "Comunicación asertiva"],
        0,
        "La personalización es el sesgo de creerse responsable de los estados emocionales ajenos sin evidencia real. Genera culpa innecesaria y desgaste emocional.",
      ),
    ],
  },
  {
    id: "ip_vinculos",
    title: "Cómo te vinculas",
    description: "Dinámicas que moldean la forma en que te conectas con otros",
    color: "#BE185D",
    bg: "#FDF2F8",
    questions: [
      q(
        "ipv1",
        "Laura cancela sus propios planes siempre que alguien le pide ayuda, aunque la soliciten con poca anticipación. ¿Qué patrón muestra?",
        ["Empatía sana", "Complacencia / dificultad para decir no", "Asertividad", "Autoconocimiento"],
        1,
        "La complacencia excesiva surge del miedo al rechazo o la necesidad de aprobación. Con el tiempo genera resentimiento y agotamiento. Decir no también es un acto de cuidado propio.",
      ),
      q(
        "ipv2",
        "En los conflictos, Pedro siempre cede para evitar el malestar del otro, aunque después quede resentido. ¿Qué patrón de vínculo es?",
        ["Límite sano", "Comunicación asertiva", "Conflicto evitado / codependencia", "Resiliencia"],
        2,
        "Ceder sistemáticamente para evitar el conflicto alivia el momento pero acumula resentimiento. La forma sana es expresar el desacuerdo con respeto y buscar una solución conjunta.",
      ),
      q(
        "ipv3",
        "Ana siente que solo vale si los demás la necesitan, y se esfuerza por hacerse indispensable en sus relaciones. ¿Qué patrón describe esto?",
        ["Empatía profunda", "Autoestima sana", "Rol de rescatador / codependencia", "Asertividad"],
        2,
        "El rol de rescatador lleva a asumir las cargas ajenas para sentirse valioso. Este patrón suele surgir de una autoestima condicionada a la utilidad percibida por los demás.",
      ),
      q(
        "ipv4",
        "Cuando su pareja no responde rápido, Marco le envía varios mensajes seguidos. Después se siente culpable por ello. ¿Qué patrón de apego muestra?",
        ["Apego seguro", "Apego ansioso / preocupado", "Autonomía emocional", "Límite sano"],
        1,
        "El apego ansioso se activa ante la ausencia del otro y genera urgencia por restablecer el contacto. No refleja falta de amor; refleja inseguridad que puede trabajarse con autoconocimiento.",
      ),
    ],
  },
  {
    id: "ip_emociones",
    title: "Cómo sientes",
    description: "Reconoce los hábitos y respuestas en tu vida emocional",
    color: "#059669",
    bg: "#F0FDF4",
    questions: [
      q(
        "ipe1",
        "Cuando Ana se siente triste, se distrae con series, redes sociales o trabajo para no sentirlo. ¿Qué patrón emocional es?",
        ["Regulación emocional sana", "Evitación emocional", "Autocompasión", "Resiliencia"],
        1,
        "La evitación emocional aplaza el procesamiento de lo que sentimos. Las emociones no procesadas no desaparecen; se acumulan y suelen emerger de formas más intensas en otro momento.",
      ),
      q(
        "ipe2",
        "Luis está furioso con su jefe pero descarga esa rabia con su familia al llegar a casa. ¿Cómo se llama este patrón?",
        ["Asertividad", "Desplazamiento emocional", "Empatía", "Gestión emocional sana"],
        1,
        "El desplazamiento emocional redirige una emoción hacia alguien que no fue su causa original. Suele ocurrir cuando no es seguro o posible expresar la emoción donde surge.",
      ),
      q(
        "ipe3",
        "Valeria se ríe y dice 'no me afecta' ante algo que claramente le duele. ¿Qué mecanismo de defensa usa?",
        ["Inteligencia emocional", "Negación", "Autoconocimiento", "Regulación emocional"],
        1,
        "La negación es un mecanismo de defensa que protege de una realidad dolorosa. A corto plazo reduce el impacto, pero a largo plazo dificulta el procesamiento y la elaboración emocional.",
      ),
      q(
        "ipe4",
        "Cuando algo le preocupa, Sofía imagina el peor escenario posible y queda paralizada sin poder actuar. ¿Qué patrón emocional es?",
        ["Catastrofismo / rumiación emocional", "Resiliencia", "Reflexión constructiva", "Autocompasión"],
        0,
        "La rumiación catastrófica mantiene la mente atrapada en el peor escenario posible. Es útil identificarla para redirigir la atención hacia lo que sí se puede controlar o hacer.",
      ),
    ],
  },
];
