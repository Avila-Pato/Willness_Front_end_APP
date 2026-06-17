import { ImageSourcePropType } from "react-native";

export type SelfTest = {
  id: string;
  title: string;
  desc: string;
  minutes: number;
  questions: number;
  color: string;
  accent: string;
  character: ImageSourcePropType;
};

export type TestCategory = {
  label: string;
  emoji: string;
  tests: SelfTest[];
};

export const TEST_CATEGORIES: TestCategory[] = [
  {
    label: "Autoconocimiento",
    emoji: "✦",
    tests: [
      {
        id: "tk_apego",
        title: "Tu estilo de apego",
        desc: "Descubre cómo te vinculas emocionalmente y qué tan seguros te sientes en tus relaciones cercanas.",
        minutes: 15,
        questions: 48,
        color: "#EDE9FE", // color fondo de tarjeta
        accent: "#898989", // color de acento para detalles y texto destacado
        character: require("@/assets/character/5.png"),
      },
      {
        id: "tk_asertividad",
        title: "¿Qué tan asertivo eres?",
        desc: "Evalúa tu capacidad de expresar lo que piensas y necesitas sin agredir ni ceder por presión.",
        minutes: 20,
        questions: 74,
        color: "#E0F2FE",
        accent: "#898989",
        character: require("@/assets/character/9.png"),
      },
      {
        id: "tk_valores",
        title: "Mapa de tus valores",
        desc: "Identifica qué principios guían realmente tus decisiones y si tu vida está alineada con ellos.",
        minutes: 25,
        questions: 100,
        color: "#FEF3C7",
        accent: "#898989",
        character: require("@/assets/character/11.png"),
      },
      {
        id: "tk_dialogo",
        title: "Tu diálogo interno",
        desc: "Explora los patrones de tu voz interna y descubre si te hablas con dureza o con compasión.",
        minutes: 8,
        questions: 26,
        color: "#F0FDF4",
        accent: "#898989",
        character: require("@/assets/character/15.png"),
      },
    ],
  },
  {
    label: "Relaciones",
    emoji: "❤",
    tests: [
      {
        id: "tk_conflicto",
        title: "¿Cómo manejas el conflicto?",
        desc: "Conoce tu patrón de respuesta cuando hay tensión: ¿evitas, atacas o resuelves?",
        minutes: 20,
        questions: 60,
        color: "#FDF2F8",
        accent: "#898989",
        character: require("@/assets/character/4.png"),
      },
      {
        id: "tk_codependencia",
        title: "Señales de codependencia",
        desc: "Descubre si hay dinámicas en tus vínculos que te desgastan o anulan tu autonomía.",
        minutes: 6,
        questions: 16,
        color: "#FFF7ED",
        accent: "#898989",
        character: require("@/assets/character/8.png"),
      },
      {
        id: "tk_vinculos",
        title: "¿Qué tipo de vínculos formas?",
        desc: "Descubre tu patrón de apego romántico y cómo influye en la forma en que te relacionas sentimentalmente.",
        minutes: 12,
        questions: 42,
        color: "#FDF2F8",
        accent: "#898989",
        character: require("@/assets/character/14.png"),
      },
      {
        id: "tk_limites_rel",
        title: "Calidad de tu relación de pareja",
        desc: "Explora qué tan sana, conectada y satisfactoria es tu relación actual en las áreas que más importan.",
        minutes: 15,
        questions: 45,
        color: "#EEF2FF",
        accent: "#898989",
        character: require("@/assets/character/16.png"),
      },
    ],
  },
  {
    label: "Bienestar mental",
    emoji: "◈",
    tests: [
      {
        id: "tk_estres",
        title: "Nivel de estrés crónico",
        desc: "Identifica si el estrés acumulado está afectando tu cuerpo, tus relaciones y tu rendimiento.",
        minutes: 10,
        questions: 30,
        color: "#FEE2E2",
        accent: "#898989",
        character: require("@/assets/character/6.png"),
      },
      {
        id: "tk_burnout",
        title: "Señales de burnout",
        desc: "Detecta si estás experimentando agotamiento emocional, despersonalización o pérdida de propósito.",
        minutes: 8,
        questions: 16,
        color: "#F5F3FF",
        accent: "#898989",
        character: require("@/assets/character/13.png"),
      },
      {
        id: "tk_autocompasion",
        title: "¿Te tratas con compasión?",
        desc: "Mide qué tan amable eres contigo mismo cuando cometes errores o atraviesas momentos difíciles.",
        minutes: 9,
        questions: 26,
        color: "#F0FDF4",
        accent: "#898989",
        character: require("@/assets/character/17.png"),
      },
      {
        id: "tk_resiliencia",
        title: "Tu nivel de resiliencia",
        desc: "Descubre qué tan bien recuperas tu equilibrio después de adversidades o cambios inesperados.",
        minutes: 20,
        questions: 50,
        color: "#FFFBEB",
        accent: "#898989",
        character: require("@/assets/character/20.png"),
      },
    ],
  },
  {
    label: "Hábitos y rutinas",
    emoji: "◇",
    tests: [
      {
        id: "tk_descanso",
        title: "Test de hábitos de sueño",
        desc: "Evalúa la calidad de tu sueño y cómo el descanso —o la falta de él— impacta tu bienestar.",
        minutes: 8,
        questions: 20,
        color: "#EFF6FF",
        accent: "#898989",
        character: require("@/assets/character/21.png"),
      },
      {
        id: "tk_energia",
        title: "Descubre tu nivel de energía",
        desc: "Descubre si tu ritmo de vida cotidiano respeta o agota tus recursos mentales y emocionales.",
        minutes: 8,
        questions: 20,
        color: "#FDF4FF",
        accent: "#898989",
        character: require("@/assets/character/22.png"),
      },
      {
        id: "tk_mindfulness_hab",
        title: "¿Qué tan presente estás?",
        desc: "Mide tu capacidad de prestar atención plena al momento presente en tu vida cotidiana.",
        minutes: 6,
        questions: 15,
        color: "#F0FDF4",
        accent: "#898989",
        character: require("@/assets/character/24.png"),
      },
      {
        id: "tk_proposito",
        title: "Claridad de propósito",
        desc: "Explora qué tan conectado estás con un sentido de dirección y significado en tu vida.",
        minutes: 9,
        questions: 22,
        color: "#EDE9FE",
        accent: "#898989",
        character: require("@/assets/character/25.png"),
      },
    ],
  },
];
