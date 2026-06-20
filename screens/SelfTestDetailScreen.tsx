import { SPACING } from "@/constants/constants";
import { BG, MUTED, TEXT } from "@/constants/theme";
import { TEST_CATEGORIES, SelfTest } from "@/data/selfTestsData";
import { getCompletedTests, getTestResult, StoredResult } from "@/store/selfTestResults";
import { Image } from "expo-image";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Clock } from "lucide-react-native";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const TEST_ACCENT: Record<string, string> = {
  tk_apego:           "#7C3AED",
  tk_asertividad:     "#0284C7",
  tk_valores:         "#D97706",
  tk_dialogo:         "#059669",
  tk_conflicto:       "#BE185D",
  tk_codependencia:   "#EA580C",
  tk_vinculos:        "#BE185D",
  tk_limites_rel:     "#4F46E5",
  tk_estres:          "#DC2626",
  tk_burnout:         "#7C3AED",
  tk_autocompasion:   "#059669",
  tk_resiliencia:     "#D97706",
  tk_descanso:        "#2563EB",
  tk_energia:         "#9333EA",
  tk_mindfulness_hab: "#059669",
  tk_proposito:       "#7C3AED",
};

const TEST_STEPS: Record<string, string[]> = {
  tk_apego: [
    "Responde honestamente, sin pensar demasiado",
    "No hay respuestas correctas ni incorrectas",
    "Descubre tu estilo de vinculación al terminar",
  ],
  tk_asertividad: [
    "Responde con la primera impresión que tengas",
    "No hay respuestas correctas ni incorrectas",
    "Descubre tu estilo de comunicación al terminar",
  ],
  tk_valores: [
    "Responde según cómo te sientes, no cómo quisieras ser",
    "No hay valores mejores ni peores",
    "Descubre qué principios mueven realmente tus decisiones",
  ],
  tk_dialogo: [
    "Responde pensando en cómo eres habitualmente, no en casos puntuales",
    "No hay formas correctas ni incorrectas de dialogar contigo mismo",
    "Descubre el patrón de tu voz interna al terminar",
  ],
  tk_conflicto: [
    "Piensa en cómo reaccionas habitualmente ante situaciones de tensión",
    "No hay estilos mejores ni peores, todos tienen su lugar",
    "Descubre tu patrón de respuesta al conflicto al terminar",
  ],
  tk_codependencia: [
    "Responde según cómo te sientes en tus relaciones habituales",
    "Este test es de autoconocimiento, no de diagnóstico",
    "Descubre qué señales de codependencia están más presentes en ti",
  ],
  tk_vinculos: [
    "Piensa en cómo eres habitualmente en tus relaciones románticas",
    "No hay estilos mejores ni peores — todos pueden trabajarse",
    "Descubre qué patrón de apego caracteriza tus vínculos",
  ],
  tk_limites_rel: [
    "Responde pensando en tu relación de pareja actual o más reciente",
    "Sé honesto/a — no hay respuestas correctas ni incorrectas",
    "Descubre en qué áreas tu relación está más fuerte y cuáles necesitan atención",
  ],
  tk_estres: [
    "Responde pensando en cómo te has sentido en los últimos días o semanas",
    "Hay preguntas sobre síntomas cognitivos, emocionales y físicos",
    "Descubre en qué área el estrés está impactando más tu vida",
  ],
  tk_burnout: [
    "Piensa en cómo te sientes habitualmente en tu contexto laboral o de responsabilidades",
    "No hay respuestas correctas ni incorrectas — es un ejercicio de autoconocimiento",
    "Descubre qué dimensión del burnout está más presente en ti",
  ],
  tk_autocompasion: [
    "Responde pensando en cómo te tratas habitualmente, no solo en los buenos momentos",
    "Algunas preguntas son sobre cómo te criticas y otras sobre cómo te cuidas",
    "Descubre qué dimensión de la autocompasión es tu mayor fortaleza",
  ],
  tk_resiliencia: [
    "Responde con honestidad — cómo eres, no cómo quisieras ser",
    "Algunas preguntas son sobre situaciones concretas, otras sobre actitudes habituales",
    "Descubre cuál es tu mayor pilar de resiliencia al terminar",
  ],
  tk_descanso: [
    "Responde según cómo son realmente tus hábitos, no cómo te gustaría que fueran",
    "Las preguntas cubren tu entorno, tu rutina nocturna y tus hábitos de vida diarios",
    "Descubre en qué área ya tienes buenas bases y cuál puedes mejorar",
  ],
  tk_energia: [
    "Responde pensando en cómo te sientes habitualmente, no solo en los últimos días",
    "Las preguntas cubren tu cuerpo, tus relaciones y tu gestión mental del día a día",
    "Descubre cuál es tu mayor fuente de energía y cuál necesita más atención",
  ],
  tk_mindfulness_hab: [
    "Responde según cómo eres habitualmente, no cómo te gustaría ser",
    "Todas las frases describen situaciones de distracción o piloto automático",
    "Descubre cuál es tu mayor dimensión de atención plena al terminar",
  ],
  tk_proposito: [
    "Responde con honestidad — no hay respuestas mejores ni peores",
    "Las preguntas exploran tu estilo de vida, lo que más valoras y tu claridad de dirección",
    "Descubre cuál es el eje central de tu propósito vital al terminar",
  ],
};

const TEST_STYLES_COUNT: Record<string, number> = {
  tk_apego:           4,
  tk_asertividad:     4,
  tk_valores:        10,
  tk_dialogo:         4,
  tk_conflicto:       5,
  tk_codependencia:   4,
  tk_vinculos:        3,
  tk_limites_rel:     4,
  tk_estres:          4,
  tk_burnout:         3,
  tk_autocompasion:   3,
  tk_resiliencia:     5,
  tk_descanso:        3,
  tk_energia:         3,
  tk_mindfulness_hab: 3,
  tk_proposito:       3,
};

const DEFAULT_STEPS = [
  "Responde con la primera impresión que tengas",
  "No hay respuestas correctas ni incorrectas",
  "Obtén tu resultado personalizado al terminar",
];

function findTest(id: string): SelfTest | undefined {
  for (const cat of TEST_CATEGORIES) {
    const t = cat.tests.find((t) => t.id === id);
    if (t) return t;
  }
  return undefined;
}

export default function SelfTestDetailScreen() {
  const { testId } = useLocalSearchParams<{ testId: string }>();
  const { bottom } = useSafeAreaInsets();

  const test = useMemo(() => findTest(testId ?? ""), [testId]);

  const [completed, setCompleted] = useState(false);
  const [storedResult, setStoredResult] = useState<StoredResult | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!testId) return;
      Promise.all([getCompletedTests(), getTestResult(testId)]).then(([list, result]) => {
        setCompleted(list.includes(testId));
        setStoredResult(result);
      });
    }, [testId]),
  );

  if (!test) return null;

  const accent = TEST_ACCENT[test.id] ?? "#8980B8";
  const steps = TEST_STEPS[test.id] ?? DEFAULT_STEPS;
  const stylesCount = TEST_STYLES_COUNT[test.id] ?? 4;

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tab)/explora");
  };

  const handleStart = () => {
    router.push({ pathname: "/self-test-question", params: { testId: test.id } });
  };

  const handleViewResult = () => {
    if (!storedResult) return;
    router.push({
      pathname: "/self-test-result",
      params: { testId: test.id, result: JSON.stringify(storedResult) },
    });
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={s.root}>
      <Pressable style={s.backBtn} onPress={handleBack}>
        <ChevronLeft size={22} color={TEXT} />
        <Text style={s.backText}>Evaluaciones</Text>
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scroll, { paddingBottom: bottom + SPACING * 10 }]}
      >
        {/* Hero */}
        <View style={[s.hero, { backgroundColor: test.color }]}>
          <Image
            source={test.character}
            style={s.heroCharacter}
            contentFit="contain"
            contentPosition="bottom center"
          />
          <View style={s.heroOverlay} />
          <Text style={[s.heroTitle, { color: accent }]}>{test.title}</Text>
          <Text style={s.heroDesc}>{test.desc}</Text>
        </View>

        {/* Stats */}
        <View style={s.statsCard}>
          <View style={s.statItem}>
            <Text style={[s.statValue, { color: accent }]}>{test.questions}</Text>
            <Text style={s.statLabel}>preguntas</Text>
          </View>
          <View style={s.statDivider} />
          <View style={s.statItem}>
            <Text style={[s.statValue, { color: accent }]}>{test.minutes} min</Text>
            <Text style={s.statLabel}>duración aprox.</Text>
          </View>
          <View style={s.statDivider} />
          <View style={s.statItem}>
            <Text style={[s.statValue, { color: accent }]}>{stylesCount}</Text>
            <Text style={s.statLabel}>estilos posibles</Text>
          </View>
        </View>

        {/* Steps */}
        <View style={s.stepsCard}>
          <Text style={s.stepsTitle}>¿Cómo funciona?</Text>
          {steps.map((text, i) => (
            <View key={i} style={s.step}>
              <View style={[s.stepBullet, { backgroundColor: accent + "22" }]}>
                <Text style={[s.stepNum, { color: accent }]}>{i + 1}</Text>
              </View>
              <Text style={s.stepText}>{text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[s.footer, { paddingBottom: bottom + SPACING }]}>
        <View style={s.timeRow}>
          <Clock size={13} color={MUTED} />
          <Text style={s.timeText}>~{test.minutes} min · responde a tu ritmo</Text>
        </View>
        {completed && storedResult ? (
          <Pressable
            style={[s.startBtn, { backgroundColor: accent }]}
            onPress={handleViewResult}
          >
            <Text style={s.startBtnText}>Ver mi resultado →</Text>
          </Pressable>
        ) : (
          <Pressable
            style={[s.startBtn, { backgroundColor: accent }]}
            onPress={handleStart}
          >
            <Text style={s.startBtnText}>Comenzar test →</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING,
    gap: 4,
  },
  backText: { fontSize: 15, fontWeight: "600", color: TEXT },

  scroll: { gap: SPACING * 2 },

  hero: {
    marginHorizontal: SPACING * 2,
    borderRadius: 24,
    height: 240,
    overflow: "hidden",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    padding: SPACING * 2.5,
    gap: SPACING * 0.6,
  },
  heroCharacter: {
    position: "absolute",
    right: -8,
    bottom: 0,
    width: 160,
    height: 220,
    opacity: 0.7,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.5,
    lineHeight: 32,
  },
  heroDesc: {
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
    maxWidth: "72%",
  },

  statsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: SPACING * 2,
    paddingVertical: SPACING * 1.8,
    paddingHorizontal: SPACING * 2,
  },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statValue: { fontSize: 20, fontWeight: "800", letterSpacing: -0.5 },
  statLabel: { fontSize: 11, color: MUTED, fontWeight: "500" },
  statDivider: { width: 1, backgroundColor: "#F3F4F6", marginVertical: 4 },

  stepsCard: {
    marginHorizontal: SPACING * 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: SPACING * 2,
    gap: SPACING * 1.5,
  },
  stepsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: SPACING * 0.5,
  },
  step: { flexDirection: "row", alignItems: "center", gap: SPACING * 1.2 },
  stepBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum: { fontSize: 13, fontWeight: "800" },
  stepText: { flex: 1, fontSize: 13, color: TEXT, lineHeight: 19, fontWeight: "500" },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING,
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: SPACING,
  },
  timeText: { fontSize: 12, color: MUTED, fontWeight: "500" },
  startBtn: {
    borderRadius: 18,
    paddingVertical: SPACING * 1.8,
    alignItems: "center",
  },
  startBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
  restartBtn: {
    paddingVertical: SPACING * 1.2,
    alignItems: "center",
  },
  restartBtnText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
