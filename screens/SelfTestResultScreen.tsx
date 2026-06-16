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
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

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

  const handleDone = () => {
    if (router.canGoBack()) {
      router.back();
      router.back();
    } else {
      router.replace("/(tab)/explora");
    }
  };

  if (!primaryMeta) return null;

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
        <View style={[s.tipCard, { borderLeftColor: primaryMeta.color }]}>
          <Text style={[s.tipLabel, { color: primaryMeta.color }]}>Qué puedes hacer</Text>
          <Text style={s.tipText}>{primaryMeta.tip}</Text>
        </View>

        <Text style={s.disclaimer}>
          Este test es orientativo y no reemplaza una evaluación clínica. Los resultados reflejan tendencias en tus respuestas, no diagnósticos.
        </Text>
      </ScrollView>

      <View style={[s.footer, { paddingBottom: bottom + SPACING }]}>
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
    borderLeftWidth: 4,
    gap: SPACING * 0.6,
  },
  tipLabel: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.6 },
  tipText: { fontSize: 14, color: TEXT, lineHeight: 22 },

  disclaimer: {
    fontSize: 11,
    color: MUTED,
    lineHeight: 17,
    textAlign: "center",
    paddingHorizontal: SPACING,
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
  doneBtn: {
    borderRadius: 18,
    paddingVertical: SPACING * 1.8,
    alignItems: "center",
  },
  doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
