import { SPACING } from "@/constants/constants";
import { BG, MUTED, TEXT } from "@/constants/theme";
import {
  APEGO_QUESTIONS,
  APEGO_STYLE_META,
  computeApegoResult,
} from "@/data/apegoTestData";
import {
  ASERTIVIDAD_QUESTIONS,
  ASERTIVIDAD_STYLE_META,
  computeAsertividadResult,
} from "@/data/asertividadTestData";
import {
  VALOR_QUESTIONS,
  VALOR_STYLE_META,
  computeValoresResult,
} from "@/data/valoresTestData";
import {
  DIALOGO_QUESTIONS,
  DIALOGO_STYLE_META,
  computeDialogoResult,
} from "@/data/dialogoTestData";
import {
  CONFLICTO_QUESTIONS,
  CONFLICTO_STYLE_META,
  computeConflictoResult,
} from "@/data/conflictoTestData";
import {
  CODEPENDENCIA_QUESTIONS,
  CODEPENDENCIA_STYLE_META,
  computeCodependenciaResult,
} from "@/data/codependenciaTestData";
import {
  VINCULOS_QUESTIONS,
  VINCULOS_STYLE_META,
  computeVinculosResult,
} from "@/data/vinculosTestData";
import {
  LIMITES_REL_QUESTIONS,
  LIMITES_REL_STYLE_META,
  computeLimitesRelResult,
} from "@/data/limitesRelTestData";
import {
  ESTRES_QUESTIONS,
  ESTRES_STYLE_META,
  computeEstresResult,
} from "@/data/estresTestData";
import {
  BURNOUT_QUESTIONS,
  BURNOUT_STYLE_META,
  computeBurnoutResult,
} from "@/data/burnoutTestData";
import {
  AUTOCOMPASION_QUESTIONS,
  AUTOCOMPASION_STYLE_META,
  computeAutocompasionResult,
} from "@/data/autocompasionTestData";
import {
  RESILIENCIA_QUESTIONS,
  RESILIENCIA_STYLE_META,
  computeResilienciaResult,
} from "@/data/resilienciaTestData";
import {
  DESCANSO_QUESTIONS,
  DESCANSO_STYLE_META,
  computeDescansoResult,
} from "@/data/descansoTestData";
import {
  ENERGIA_QUESTIONS,
  ENERGIA_STYLE_META,
  computeEnergiaResult,
} from "@/data/energiaTestData";
import {
  MINDFULNESS_HAB_QUESTIONS,
  MINDFULNESS_HAB_STYLE_META,
  computeMindfulnessHabResult,
} from "@/data/mindfulnessHabTestData";
import {
  PROPOSITO_QUESTIONS,
  PROPOSITO_STYLE_META,
  computePropositoResult,
} from "@/data/propositoTestData";
import { router, useLocalSearchParams } from "expo-router";
import { X } from "lucide-react-native";
import { useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: W } = Dimensions.get("window");
const CIRCLE_SIZE = Math.min(52, (W - SPACING * 8) / 5);
const LABELS = ["Totalmente\nen desacuerdo", "Totalmente\nde acuerdo"];

type AnyQuestion = { id: string; text: string; style: string };

function getTestData(testId: string): {
  questions: AnyQuestion[];
  getColor: (style: string) => string;
  compute: (answers: Record<string, number>) => { primary: string; averages: Record<string, number> };
} {
  switch (testId) {
    case "tk_apego":
      return {
        questions: APEGO_QUESTIONS,
        getColor: (s) => (APEGO_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeApegoResult,
      };
    case "tk_asertividad":
      return {
        questions: ASERTIVIDAD_QUESTIONS,
        getColor: (s) => (ASERTIVIDAD_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeAsertividadResult,
      };
    case "tk_valores":
      return {
        questions: VALOR_QUESTIONS,
        getColor: (s) => (VALOR_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeValoresResult,
      };
    case "tk_dialogo":
      return {
        questions: DIALOGO_QUESTIONS,
        getColor: (s) => (DIALOGO_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeDialogoResult,
      };
    case "tk_conflicto":
      return {
        questions: CONFLICTO_QUESTIONS,
        getColor: (s) => (CONFLICTO_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeConflictoResult,
      };
    case "tk_codependencia":
      return {
        questions: CODEPENDENCIA_QUESTIONS,
        getColor: (s) => (CODEPENDENCIA_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeCodependenciaResult,
      };
    case "tk_vinculos":
      return {
        questions: VINCULOS_QUESTIONS,
        getColor: (s) => (VINCULOS_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeVinculosResult,
      };
    case "tk_limites_rel":
      return {
        questions: LIMITES_REL_QUESTIONS,
        getColor: (s) => (LIMITES_REL_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeLimitesRelResult,
      };
    case "tk_estres":
      return {
        questions: ESTRES_QUESTIONS,
        getColor: (s) => (ESTRES_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeEstresResult,
      };
    case "tk_burnout":
      return {
        questions: BURNOUT_QUESTIONS,
        getColor: (s) => (BURNOUT_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeBurnoutResult,
      };
    case "tk_autocompasion":
      return {
        questions: AUTOCOMPASION_QUESTIONS,
        getColor: (s) => (AUTOCOMPASION_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeAutocompasionResult,
      };
    case "tk_resiliencia":
      return {
        questions: RESILIENCIA_QUESTIONS,
        getColor: (s) => (RESILIENCIA_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeResilienciaResult,
      };
    case "tk_descanso":
      return {
        questions: DESCANSO_QUESTIONS,
        getColor: (s) => (DESCANSO_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeDescansoResult,
      };
    case "tk_energia":
      return {
        questions: ENERGIA_QUESTIONS,
        getColor: (s) => (ENERGIA_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeEnergiaResult,
      };
    case "tk_mindfulness_hab":
      return {
        questions: MINDFULNESS_HAB_QUESTIONS,
        getColor: (s) => (MINDFULNESS_HAB_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computeMindfulnessHabResult,
      };
    case "tk_proposito":
      return {
        questions: PROPOSITO_QUESTIONS,
        getColor: (s) => (PROPOSITO_STYLE_META as Record<string, { color: string }>)[s]?.color ?? "#8980B8",
        compute: computePropositoResult,
      };
    default:
      return { questions: [], getColor: () => "#8980B8", compute: () => ({ primary: "", averages: {} }) };
  }
}

export default function SelfTestQuestionScreen() {
  const { testId } = useLocalSearchParams<{ testId: string }>();
  const { top, bottom } = useSafeAreaInsets();

  const { questions, getColor, compute } = useRef(getTestData(testId ?? "")).current;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const processing = useRef(false);

  const fadeOpacity = useSharedValue(1);
  const slideX = useSharedValue(0);

  const current = questions[step];
  const progress = questions.length > 0 ? (step + 1) / questions.length : 0;
  const accentColor = current ? getColor(current.style) : "#8980B8";

  const questionStyle = useAnimatedStyle(() => ({
    opacity: fadeOpacity.value,
    transform: [{ translateX: slideX.value }],
  }));

  const animateTransition = (onDone: () => void) => {
    fadeOpacity.value = withTiming(0, { duration: 160 }, () => {
      slideX.value = -20;
      runOnJS(onDone)();
      slideX.value = withSpring(0, { damping: 20, stiffness: 260 });
      fadeOpacity.value = withTiming(1, { duration: 200 });
    });
  };

  const handleAnswer = (value: number) => {
    if (processing.current) return;
    processing.current = true;
    setSelected(value);

    const newAnswers = { ...answers, [current.id]: value };

    setTimeout(() => {
      animateTransition(() => {
        if (step + 1 >= questions.length) {
          const result = compute(newAnswers);
          router.replace({
            pathname: "/self-test-result",
            params: { testId, result: JSON.stringify(result) },
          });
        } else {
          setStep((s) => s + 1);
          setSelected(null);
          setAnswers(newAnswers);
          processing.current = false;
        }
      });
    }, 260);
  };

  const handleClose = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tab)/explora");
  };

  if (!current) return null;

  return (
    <View style={[s.root, { paddingTop: top }]}>
      {/* Top bar */}
      <View style={s.topBar}>
        <Pressable onPress={handleClose} style={s.iconBtn} hitSlop={12}>
          <Text style={s.backArrow}>←</Text>
        </Pressable>
        <View style={s.progressTrack}>
          <Animated.View
            style={[s.progressFill, { width: `${progress * 100}%`, backgroundColor: accentColor }]}
          />
        </View>
        <Pressable onPress={handleClose} style={s.iconBtn} hitSlop={12}>
          <X size={17} color={MUTED} />
        </Pressable>
      </View>

      <Text style={[s.stepLabel, { color: accentColor }]}>
        {step + 1} / {questions.length}
      </Text>

      <Animated.View style={[s.questionWrap, questionStyle]}>
        <Text style={s.questionText}>{current.text}</Text>
      </Animated.View>

      <View style={{ flex: 1 }} />

      <View style={[s.scaleWrap, { paddingBottom: bottom + SPACING * 2 }]}>
        <View style={s.circlesRow}>
          {[1, 2, 3, 4, 5].map((val) => {
            const isSel = selected === val;
            return (
              <Pressable key={val} onPress={() => handleAnswer(val)} style={s.circleWrap}>
                <View
                  style={[
                    s.circle,
                    { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2 },
                    isSel && { backgroundColor: accentColor, borderColor: accentColor },
                    !isSel && { borderColor: accentColor + "66" },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
        <View style={s.labelsRow}>
          <Text style={s.scaleLabel}>{LABELS[0]}</Text>
          <Text style={[s.scaleLabel, { textAlign: "right" }]}>{LABELS[1]}</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG, paddingHorizontal: SPACING * 2.5 },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 1.2,
    paddingVertical: SPACING * 1.5,
  },
  iconBtn: { padding: 4 },
  backArrow: { fontSize: 20, color: MUTED, fontWeight: "600" },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 99,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 99 },

  stepLabel: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    marginTop: SPACING * 2,
    marginBottom: SPACING * 2.5,
    letterSpacing: 0.3,
  },

  questionWrap: {
    alignItems: "center",
    paddingHorizontal: SPACING,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "800",
    color: TEXT,
    textAlign: "center",
    lineHeight: 32,
    letterSpacing: -0.3,
  },

  scaleWrap: { gap: SPACING * 1.2, paddingHorizontal: SPACING * 0.5 },
  circlesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleWrap: { padding: 6 },
  circle: { borderWidth: 2.5, backgroundColor: "transparent" },
  labelsRow: { flexDirection: "row", justifyContent: "space-between" },
  scaleLabel: {
    fontSize: 11,
    color: MUTED,
    fontWeight: "500",
    lineHeight: 16,
    maxWidth: 110,
  },
});
