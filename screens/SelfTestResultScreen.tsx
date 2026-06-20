import { SPACING } from "@/constants/constants";
import { BG, MUTED, TEXT } from "@/constants/theme";
import { APEGO_STYLE_META } from "@/data/apegoTestData";
import { ASERTIVIDAD_STYLE_META } from "@/data/asertividadTestData";
import { VALOR_STYLE_META, VALOR_STYLE_ORDER } from "@/data/valoresTestData";
import { DIALOGO_STYLE_META, DIALOGO_STYLE_ORDER } from "@/data/dialogoTestData";
import { CONFLICTO_STYLE_META, CONFLICTO_STYLE_ORDER } from "@/data/conflictoTestData";
import { CODEPENDENCIA_STYLE_META, CODEPENDENCIA_STYLE_ORDER } from "@/data/codependenciaTestData";
import { VINCULOS_STYLE_META, VINCULOS_STYLE_ORDER } from "@/data/vinculosTestData";
import { LIMITES_REL_STYLE_META, LIMITES_REL_STYLE_ORDER } from "@/data/limitesRelTestData";
import { ESTRES_STYLE_META, ESTRES_STYLE_ORDER } from "@/data/estresTestData";
import { BURNOUT_STYLE_META, BURNOUT_STYLE_ORDER } from "@/data/burnoutTestData";
import { AUTOCOMPASION_STYLE_META, AUTOCOMPASION_STYLE_ORDER } from "@/data/autocompasionTestData";
import { RESILIENCIA_STYLE_META, RESILIENCIA_STYLE_ORDER } from "@/data/resilienciaTestData";
import { DESCANSO_STYLE_META, DESCANSO_STYLE_ORDER } from "@/data/descansoTestData";
import { ENERGIA_STYLE_META, ENERGIA_STYLE_ORDER } from "@/data/energiaTestData";
import { MINDFULNESS_HAB_STYLE_META, MINDFULNESS_HAB_STYLE_ORDER } from "@/data/mindfulnessHabTestData";
import { PROPOSITO_STYLE_META, PROPOSITO_STYLE_ORDER } from "@/data/propositoTestData";
import { TEST_CATEGORIES } from "@/data/selfTestsData";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { getCompletedTests, markTestCompleted, saveTestResult } from "@/store/selfTestResults";

const ACHIEVEMENT_IMG: Record<string, number> = {
  tk_apego:           require("@/assets/achievements/Layer 1 copy 5.png"),
  tk_asertividad:     require("@/assets/achievements/Layer 1 copy 9.png"),
  tk_valores:         require("@/assets/achievements/Layer 1 copy 11.png"),
  tk_dialogo:         require("@/assets/achievements/Layer 1 copy 15.png"),
  tk_conflicto:       require("@/assets/achievements/Layer 1 copy 4.png"),
  tk_codependencia:   require("@/assets/achievements/Layer 1 copy 8.png"),
  tk_vinculos:        require("@/assets/achievements/Layer 1 copy 14.png"),
  tk_limites_rel:     require("@/assets/achievements/Layer 1 copy 16.png"),
  tk_estres:          require("@/assets/achievements/Layer 1 copy 6.png"),
  tk_burnout:         require("@/assets/achievements/Layer 1 copy 13.png"),
  tk_autocompasion:   require("@/assets/achievements/Layer 1 copy 17.png"),
  tk_resiliencia:     require("@/assets/achievements/Layer 1 copy 20.png"),
  tk_descanso:        require("@/assets/achievements/Layer 1 copy 21.png"),
  tk_energia:         require("@/assets/achievements/Layer 1 copy 22.png"),
  tk_mindfulness_hab: require("@/assets/achievements/Layer 1 copy 24.png"),
  tk_proposito:       require("@/assets/achievements/Layer 1 copy 25.png"),
};

type StyleMeta = {
  label: string;
  color: string;
  bg: string;
  short: string;
  description: string;
  tip: string;
};

const STYLE_REGISTRY: Record<string, Record<string, StyleMeta>> = {
  tk_apego:        APEGO_STYLE_META as Record<string, StyleMeta>,
  tk_asertividad:  ASERTIVIDAD_STYLE_META as Record<string, StyleMeta>,
  tk_valores:      VALOR_STYLE_META as Record<string, StyleMeta>,
  tk_dialogo:      DIALOGO_STYLE_META as Record<string, StyleMeta>,
  tk_conflicto:    CONFLICTO_STYLE_META as Record<string, StyleMeta>,
  tk_codependencia: CODEPENDENCIA_STYLE_META as Record<string, StyleMeta>,
  tk_vinculos:      VINCULOS_STYLE_META as Record<string, StyleMeta>,
  tk_limites_rel:   LIMITES_REL_STYLE_META as Record<string, StyleMeta>,
  tk_estres:        ESTRES_STYLE_META as Record<string, StyleMeta>,
  tk_burnout:       BURNOUT_STYLE_META as Record<string, StyleMeta>,
  tk_autocompasion: AUTOCOMPASION_STYLE_META as Record<string, StyleMeta>,
  tk_resiliencia:   RESILIENCIA_STYLE_META as Record<string, StyleMeta>,
  tk_descanso:      DESCANSO_STYLE_META as Record<string, StyleMeta>,
  tk_energia:       ENERGIA_STYLE_META as Record<string, StyleMeta>,
  tk_mindfulness_hab: MINDFULNESS_HAB_STYLE_META as Record<string, StyleMeta>,
  tk_proposito:       PROPOSITO_STYLE_META as Record<string, StyleMeta>,
};

const STYLE_ORDER: Record<string, string[]> = {
  tk_apego:        ["seguro", "ansioso", "evitativo", "desorganizado"],
  tk_asertividad:  ["asertivo", "pasivo", "analitico", "empatico"],
  tk_valores:      VALOR_STYLE_ORDER,
  tk_dialogo:      DIALOGO_STYLE_ORDER,
  tk_conflicto:    CONFLICTO_STYLE_ORDER,
  tk_codependencia: CODEPENDENCIA_STYLE_ORDER,
  tk_vinculos:      VINCULOS_STYLE_ORDER,
  tk_limites_rel:   LIMITES_REL_STYLE_ORDER,
  tk_estres:        ESTRES_STYLE_ORDER,
  tk_burnout:       BURNOUT_STYLE_ORDER,
  tk_autocompasion: AUTOCOMPASION_STYLE_ORDER,
  tk_resiliencia:   RESILIENCIA_STYLE_ORDER,
  tk_descanso:      DESCANSO_STYLE_ORDER,
  tk_energia:       ENERGIA_STYLE_ORDER,
  tk_mindfulness_hab: MINDFULNESS_HAB_STYLE_ORDER,
  tk_proposito:       PROPOSITO_STYLE_ORDER,
};

const TEST_TITLES: Record<string, string> = {
  tk_apego:        "Tu estilo de apego",
  tk_asertividad:  "Tu estilo de comunicación",
  tk_valores:      "Tu mapa de valores",
  tk_dialogo:      "Tu diálogo interno",
  tk_conflicto:    "Tu estilo ante el conflicto",
  tk_codependencia: "Señales de codependencia",
  tk_vinculos:      "¿Qué tipo de vínculos formas?",
  tk_limites_rel:   "Calidad de tu relación de pareja",
  tk_estres:        "Dónde te impacta el estrés",
  tk_burnout:       "Señales de burnout",
  tk_autocompasion: "¿Te tratas con compasión?",
  tk_resiliencia:   "Tu pilar de resiliencia",
  tk_descanso:      "Tus hábitos de sueño",
  tk_energia:       "Tu mayor fuente de energía",
  tk_mindfulness_hab: "Tu dimensión de presencia plena",
  tk_proposito:       "Tu claridad de propósito",
};

interface TestResult {
  primary: string;
  averages: Record<string, number>;
}

export default function SelfTestResultScreen() {
  const { testId, result: raw } = useLocalSearchParams<{ testId: string; result: string }>();
  const { bottom } = useSafeAreaInsets();

  const result: TestResult = raw
    ? JSON.parse(raw)
    : { primary: "", averages: {} };

  const { primary, averages } = result;
  const styleMeta = STYLE_REGISTRY[testId ?? ""] ?? {};
  const styleOrder = STYLE_ORDER[testId ?? ""] ?? Object.keys(averages);
  const primaryMeta: StyleMeta | undefined = styleMeta[primary];
  const title = TEST_TITLES[testId ?? ""] ?? "Tu resultado";
  const maxVal = Math.max(...Object.values(averages), 1);

  const testMeta = TEST_CATEGORIES.flatMap((c) => c.tests).find((t) => t.id === testId);
  const achieveImg = testId ? ACHIEVEMENT_IMG[testId] : undefined;

  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const achieveScale = useSharedValue(0.6);
  const achieveOpacity = useSharedValue(0);

  // Loading dots animation
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);
  const loadingOpacity = useSharedValue(1);

  useEffect(() => {
    // Animate loading dots
    const bounce = { damping: 8, stiffness: 120 };
    dot1.value = withRepeat(withSequence(withSpring(-10, bounce), withSpring(0, bounce)), -1, false);
    dot2.value = withDelay(140, withRepeat(withSequence(withSpring(-10, bounce), withSpring(0, bounce)), -1, false));
    dot3.value = withDelay(280, withRepeat(withSequence(withSpring(-10, bounce), withSpring(0, bounce)), -1, false));
  }, []);

  useEffect(() => {
    if (!testId) return;
    // Comprobar si ya estaba completado ANTES de marcar
    getCompletedTests().then((list) => {
      const wasCompleted = list.includes(testId);
      setAlreadyCompleted(wasCompleted);
      void markTestCompleted(testId);
      void saveTestResult(testId, { primary, averages });

      // Mostrar loading ~1.8s luego revelar resultado
      setTimeout(() => {
        loadingOpacity.value = withTiming(0, { duration: 350 }, () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
        });
        setTimeout(() => {
          setLoading(false);
          if (!wasCompleted) {
            achieveScale.value = withDelay(600, withSpring(1, { damping: 14, stiffness: 110 }));
            achieveOpacity.value = withDelay(600, withTiming(1, { duration: 450 }));
          } else {
            achieveScale.value = 1;
            achieveOpacity.value = 1;
          }
        }, 350);
      }, 1800);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  const achieveAnimStyle = useAnimatedStyle(() => ({
    opacity: achieveOpacity.value,
    transform: [{ scale: achieveScale.value }],
  }));

  const dot1Style = useAnimatedStyle(() => ({ transform: [{ translateY: dot1.value }] }));
  const dot2Style = useAnimatedStyle(() => ({ transform: [{ translateY: dot2.value }] }));
  const dot3Style = useAnimatedStyle(() => ({ transform: [{ translateY: dot3.value }] }));
  const loadingFadeStyle = useAnimatedStyle(() => ({ opacity: loadingOpacity.value }));

  const handleDone = () => {
    if (router.canGoBack()) {
      router.back();
      router.back();
    } else {
      router.replace("/(tab)/explora");
    }
  };

  const handleRestart = () => {
    router.replace({
      pathname: "/self-test-question",
      params: { testId: testId ?? "" },
    });
  };

  if (!primaryMeta && !loading) return null;

  if (loading) {
    return (
      <Animated.View style={[s.loadingScreen, loadingFadeStyle]}>
        {testMeta && (
          <View style={[s.loadingIconWrap, { backgroundColor: testMeta.color }]}>
            <Image
              source={testMeta.character}
              style={s.loadingIcon}
              contentFit="contain"
              contentPosition="bottom center"
            />
          </View>
        )}
        <Text style={s.loadingTitle}>Analizando tus respuestas</Text>
        <Text style={s.loadingSub}>Preparando tu resultado personalizado…</Text>
        <View style={s.dotsRow}>
          <Animated.View style={[s.dot, dot1Style, { backgroundColor: primaryMeta?.color ?? "#8980B8" }]} />
          <Animated.View style={[s.dot, dot2Style, { backgroundColor: primaryMeta?.color ?? "#8980B8" }]} />
          <Animated.View style={[s.dot, dot3Style, { backgroundColor: primaryMeta?.color ?? "#8980B8" }]} />
        </View>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={s.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[s.scroll, { paddingBottom: bottom + SPACING * 10 }]}
      >
        {/* Header */}
        <View style={s.header}>
          <Text style={s.headerSub}>Resultado de tu test</Text>
          <Text style={s.headerTitle}>{title}</Text>
        </View>

        {/* Primary style card */}
        <View style={[s.primaryCard, { backgroundColor: primaryMeta.bg, borderColor: primaryMeta.color + "40" }]}>
          <View style={[s.primaryBadge, { backgroundColor: primaryMeta.color + "20" }]}>
            <Text style={[s.primaryBadgeText, { color: primaryMeta.color }]}>Perfil principal</Text>
          </View>
          <Text style={[s.primaryStyle, { color: primaryMeta.color }]}>{primaryMeta.label}</Text>
          <Text style={s.primaryDesc}>{primaryMeta.description}</Text>
        </View>

        {/* Breakdown */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Distribución de tu perfil</Text>
          <Text style={s.cardSub}>Promedio de tus respuestas (escala 1–5)</Text>
          <View style={s.bars}>
            {styleOrder.map((style) => {
              const meta = styleMeta[style];
              if (!meta) return null;
              const avg = averages[style] ?? 0;
              const pct = maxVal > 0 ? avg / maxVal : 0;
              const isPrimary = style === primary;
              return (
                <View key={style} style={s.barRow}>
                  <Text style={[s.barLabel, isPrimary && { fontWeight: "800", color: meta.color }]}>
                    {meta.short}
                  </Text>
                  <View style={s.barTrack}>
                    <View
                      style={[
                        s.barFill,
                        { width: `${Math.round(pct * 100)}%`, backgroundColor: meta.color },
                        !isPrimary && { opacity: 0.4 },
                      ]}
                    />
                  </View>
                  <Text style={[s.barValue, { color: meta.color }]}>{avg.toFixed(1)}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Tip */}
        <View style={s.tipCard}>
          <Text style={[s.tipLabel, { color: primaryMeta.color }]}>Qué puedes hacer</Text>
          <Text style={s.tipText}>{primaryMeta.tip}</Text>
        </View>

        {/* Achievement */}
        {achieveImg && testMeta && (
          <Animated.View
            style={[s.achieveCard, { borderColor: primaryMeta.color + "40" }, achieveAnimStyle]}
          >
            <Text style={[s.achieveTag, { color: primaryMeta.color }]}>
              {alreadyCompleted ? "✦ Logro ya ganado" : "✦ Logro desbloqueado"}
            </Text>
            <View style={[s.achieveBadge, { backgroundColor: testMeta.color }]}>
              <Image
                source={achieveImg}
                style={s.achieveImg}
                contentFit="contain"
                contentPosition="bottom center"
              />
            </View>
            {alreadyCompleted ? (
              <>
                <Text style={s.achieveTitle}>Ya lo tienes</Text>
                <Text style={s.achieveDesc}>
                  Este logro ya está en tu perfil. Puedes volver a hacerlo cuando quieras.
                </Text>
              </>
            ) : (
              <>
                <Text style={s.achieveTitle}>¡Felicidades!</Text>
                <Text style={s.achieveDesc}>
                  Completaste <Text style={{ fontWeight: "800" }}>{title}</Text> y
                  ganaste este logro. Encuéntralo en tu perfil.
                </Text>
              </>
            )}
          </Animated.View>
        )}

        <Text style={s.disclaimer}>
          Este test es orientativo y no reemplaza una evaluación clínica. Los resultados reflejan tendencias en tus respuestas, no diagnósticos.
        </Text>
      </ScrollView>

      <View style={[s.footer, { paddingBottom: bottom + SPACING }]}>
        <Pressable style={s.restartBtn} onPress={handleRestart}>
          <Text style={[s.restartBtnText, { color: primaryMeta.color }]}>
            Reiniciar test
          </Text>
        </Pressable>
        <Pressable
          style={[s.doneBtn, { backgroundColor: primaryMeta.color }]}
          onPress={handleDone}
        >
          <Text style={s.doneBtnText}>Listo →</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  scroll: { gap: SPACING * 2, paddingHorizontal: SPACING * 2 },

  header: { paddingTop: SPACING * 2, gap: SPACING * 0.3 },
  headerSub: {
    fontSize: 12,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.8,
    lineHeight: 36,
  },

  primaryCard: {
    borderRadius: 24,
    padding: SPACING * 2.5,
    gap: SPACING * 1.2,
    borderWidth: 1.5,
  },
  primaryBadge: {
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: SPACING,
    paddingVertical: 4,
  },
  primaryBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  primaryStyle: { fontSize: 26, fontWeight: "900", letterSpacing: -0.5 },
  primaryDesc: { fontSize: 14, color: "#333", lineHeight: 22 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: SPACING * 2,
    gap: SPACING * 1.5,
  },
  cardTitle: { fontSize: 16, fontWeight: "800", color: TEXT, letterSpacing: -0.3 },
  cardSub: { fontSize: 12, color: MUTED, marginTop: -SPACING * 0.8 },
  bars: { gap: SPACING * 1.2 },
  barRow: { flexDirection: "row", alignItems: "center", gap: SPACING },
  barLabel: { width: 80, fontSize: 13, fontWeight: "600", color: MUTED },
  barTrack: { flex: 1, height: 10, backgroundColor: "#F3F4F6", borderRadius: 99, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 99 },
  barValue: { width: 28, fontSize: 12, fontWeight: "700", textAlign: "right" },

  tipCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: SPACING * 2,
    gap: SPACING * 0.6,
  },
  tipLabel: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6 },
  tipText: { fontSize: 14, color: TEXT, lineHeight: 22 },

  /* Achievement unlock card */
  achieveCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    borderWidth: 1.5,
    padding: SPACING * 2.5,
    alignItems: "center",
    gap: SPACING * 1.2,
    shadowColor: "#1C1B29",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  achieveTag: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  achieveBadge: {
    width: 130,
    height: 150,
    borderRadius: 22,
    overflow: "hidden",
  },
  achieveImg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "110%",
  },
  achieveTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.5,
  },
  achieveDesc: {
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
    lineHeight: 19,
  },

  disclaimer: {
    fontSize: 11,
    color: MUTED,
    lineHeight: 17,
    textAlign: "center",
    paddingHorizontal: SPACING,
  },

  /* Loading screen */
  loadingScreen: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING * 1.5,
    paddingHorizontal: SPACING * 4,
  },
  loadingIconWrap: {
    width: 110,
    height: 130,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: SPACING,
  },
  loadingIcon: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "110%",
  },
  loadingTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  loadingSub: {
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
    lineHeight: 19,
  },
  dotsRow: {
    flexDirection: "row",
    gap: SPACING * 0.8,
    marginTop: SPACING,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

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
  restartBtn: {
    borderRadius: 18,
    paddingVertical: SPACING * 1.4,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  restartBtnText: {
    fontSize: 15,
    fontWeight: "700",
  },
  doneBtn: {
    borderRadius: 18,
    paddingVertical: SPACING * 1.8,
    alignItems: "center",
  },
  doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
