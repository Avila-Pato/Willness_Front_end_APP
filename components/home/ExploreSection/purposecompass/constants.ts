import { Compass, Heart, Sparkles, Star } from "lucide-react-native";
import { Dimensions } from "react-native";

export const { width: W, height: H } = Dimensions.get("window");

export const NODE_RADIUS    = 42;
export const SNAP_THRESHOLD = 58;
export const COMPASS_X      = W * 0.5;
export const COMPASS_Y      = H * 0.47;

export const ORBIT: { x: number; y: number }[] = [
  { x: -W * 0.27, y: -H * 0.13 },
  { x:  W * 0.27, y: -H * 0.13 },
  { x: -W * 0.27, y:  H * 0.13 },
  { x:  W * 0.27, y:  H * 0.13 },
];

export const ACCENT        = "#6B5A9E";
export const ACCENT_LIGHT  = "#8B7AB8";
export const ACCENT_MUTED  = "rgba(107,90,158,0.12)";
export const ACCENT_BORDER = "rgba(107,90,158,0.22)";
export const TEXT_DARK     = "#1A1A38";
export const TEXT_MID      = "#585878";
export const TEXT_MUTED    = "#8888A8";
export const CARD_BG       = "rgba(255,255,255,0.82)";
export const CARD_BORDER   = "rgba(170,160,210,0.35)";

export const CARD_W       = W * 0.82;
export const STAT_LABEL_W = 90;
export const STAT_PCT_W   = 34;
export const STAT_BAR_W   = CARD_W - 36 - STAT_LABEL_W - STAT_PCT_W - 12;

export const GRADIENT_COLORS = ["#EAE8F2", "#F2F0F8", "#EBE8F5", "#F0EFF8"] as const;
export const STORAGE_KEY = "purpose_completed_ids";

export type Stat = { label: string; value: number };
export type CompassItem = {
  id: string; title: string; subtitle: string; quote: string;
  reflexion: string; futureAction: string; stats: [Stat, Stat, Stat];
};

export const ITEMS: CompassItem[] = [
  { id: "p1", title: "La Vocación Oculta",      subtitle: "Tu llamado más profundo, antes de que el miedo opinara",   quote: "Quien tiene un porqué para vivir puede soportar casi cualquier cómo. — Viktor Frankl",                                                            reflexion: "Frankl sobrevivió cuatro campos de concentración nazis y en ese infierno descubrió lo que ningún verdugo podía quitarle: la libertad de elegir su actitud. Tu vocación no es lo que haces bien. Es lo que harías incluso si nadie te pagara ni te viera. La tensión que sientes cuando no la sigues no es ansiedad: es brújula.",                                                                                                                               futureAction: "Cierra los ojos. Tu yo de 80 años te mira y pregunta: ¿lo hiciste? Escucha la respuesta. Luego toma hoy una sola decisión que acorte esa distancia.",                                                                                                                  stats: [{ label: "Claridad", value: 78 }, { label: "Autenticidad", value: 92 }, { label: "Impacto", value: 65 }] },
  { id: "p2", title: "El Legado del Futuro",     subtitle: "La huella que dejarás en quienes te importan",             quote: "El hombre no debe preguntar cuál es el sentido de su vida, sino reconocer que es él quien recibe esa pregunta. — Viktor Frankl",                          reflexion: "El Ikigai japonés enseña que el propósito vive en la intersección de cuatro preguntas: qué amas, en qué eres bueno, qué necesita el mundo y por qué te pagarían. Tu legado no es monumental. Es la suma de tus actos cotidianos repetidos con intención. Lo que haces hoy con las personas que amas ya es legado.",                                                                                                                                    futureAction: "Escribe la carta que tu yo de 80 años le envía a tu yo de hoy. Dile qué decisión tomaste que más marcó a quienes amabas. Léela mañana en voz alta.",                                                                                                                 stats: [{ label: "Impacto", value: 88 }, { label: "Trascendencia", value: 81 }, { label: "Continuidad", value: 74 }] },
  { id: "p3", title: "El Porqué Diario",         subtitle: "Tu razón para levantarte cada mañana",                     quote: "Entre el estímulo y la respuesta hay un espacio. En ese espacio está nuestro poder de elegir. — Viktor Frankl",                                             reflexion: "Los ancianos de Okinawa que viven hasta los 100 años no tienen un propósito épico: tienen razones pequeñas y concretas para levantarse cada mañana. Tu porqué no necesita ser grandioso para ser real. Solo necesita ser tuyo. Un café con alguien que quieres, un proyecto que te importa, una planta que regar: todo eso cuenta.",                                                                                                                      futureAction: "Identifica una cosa que harás mañana alineada con tus valores más profundos, no lo urgente sino lo que importa. Comprométete con esa sola cosa. El propósito se construye acto a acto.",                                                                               stats: [{ label: "Constancia", value: 84 }, { label: "Presencia", value: 77 }, { label: "Gratitud", value: 71 }] },
  { id: "p4", title: "La Conexión que Sostiene", subtitle: "Las personas y vínculos que le dan sentido a todo",        quote: "El amor es el objetivo final más alto al que puede aspirar el hombre. — Viktor Frankl",                                                                   reflexion: "Los estudios sobre longevidad y bienestar coinciden en algo inesperado: no es el éxito ni la riqueza lo que hace que una vida se sienta plena. Son los vínculos. Frankl mismo, en el horror de los campos, encontró propósito en el amor que sentía por su esposa, aunque no supiera si seguía viva. La conexión no requiere que la otra persona esté presente; requiere que sea real para ti.",                                                              futureAction: "Piensa en una persona que sientes que has descuidado. Hoy, no mañana, escríbele un mensaje corto y verdadero. No para quedar bien, sino porque el vínculo importa.",                                                                                                  stats: [{ label: "Pertenencia", value: 86 }, { label: "Reciprocidad", value: 73 }, { label: "Presencia", value: 80 }] },
  { id: "p5", title: "El Don que Compartes",     subtitle: "Lo que solo tú puedes dar al mundo",                       quote: "Cada persona tiene su propia vocación específica en la vida. Cada uno debe llevar a cabo una misión concreta que le exige ser cumplida. — Viktor Frankl", reflexion: "Solemos invisibilizar lo que se nos da fácil, porque creemos que si es fácil para nosotros, es fácil para todos. No lo es. Aquello que haces sin esfuerzo y que deja a los demás sin palabras es exactamente tu don. El Ikigai llama a esto el punto donde tus talentos se encuentran con lo que el mundo necesita. No lo subestimes porque te sale natural.",     futureAction: "Pregúntale hoy a alguien de confianza: ¿qué ves en mí que yo no veo? Escucha sin restar ni justificar. Esa respuesta suele apuntar directamente a tu don.",                                                                                                         stats: [{ label: "Autenticidad", value: 90 }, { label: "Generosidad", value: 77 }, { label: "Impacto", value: 83 }] },
  { id: "p6", title: "La Herida que Enseña",     subtitle: "Cómo tu historia difícil se convierte en tu mayor fuerza", quote: "El sufrimiento deja de ser sufrimiento en el momento en que encuentra un sentido. — Viktor Frankl",                                                      reflexion: "Frankl no negó el dolor. Lo atravesó con ojos abiertos y descubrió algo radical: el sufrimiento sin sentido destruye, pero el sufrimiento con sentido transforma. No tienes que agradecer lo que te dolió. Pero sí puedes preguntarte qué te enseñó sobre ti que no hubieras aprendido de otro modo. Ahí, en esa respuesta, suele vivir un propósito que nadie más puede tener porque nadie más vivió exactamente lo que tú viviste.", futureAction: "Escribe en papel: 'Lo más difícil que he vivido me enseñó que soy capaz de...' Termina la frase sin censura. Guárdala. Léela cuando olvides quién eres.",                                                                                                stats: [{ label: "Resiliencia", value: 94 }, { label: "Sabiduría", value: 88 }, { label: "Transformación", value: 79 }] },
];

export const NODE_DEFS = [
  { id: "n1", label: "Lo que amo",  Icon: Heart,    colors: ["#7B6AB0", "#9B8AD0"] as [string, string] },
  { id: "n2", label: "Mis Valores", Icon: Star,     colors: ["#5A7090", "#7A90B0"] as [string, string] },
  { id: "n3", label: "Mi Vocación", Icon: Compass,  colors: ["#7B6AB0", "#9B8AD0"] as [string, string] },
  { id: "n4", label: "Mi Legado",   Icon: Sparkles, colors: ["#6878A8", "#8898C8"] as [string, string] },
];

export const BG_PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  x: (i * 73 + 19) % (W - 10),
  size: (i % 3) + 1,
  duration: 16000 + ((i * 1200) % 8000),
  delay: (i * 700) % 8000,
  color: i % 3 === 0 ? "rgba(160,145,210,0.45)" : i % 3 === 1 ? "rgba(200,195,235,0.35)" : "rgba(140,160,220,0.4)",
}));
