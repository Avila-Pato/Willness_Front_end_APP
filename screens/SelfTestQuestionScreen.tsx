import { SPACING } from "@/constants/constants";
import { BG, MUTED, TEXT } from "@/constants/theme";
import { APEGO_QUESTIONS, ApegoStyle, APEGO_STYLE_META, computeApegoResult } from "@/data/apegoTestData";
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

const STYLE_ORDER: ApegoStyle[] = ["seguro", "ansioso", "evitativo", "desorganizado"];

const LABELS = ["Totalmente\nen desacuerdo", "Totalmente\nde acuerdo"];

function getQuestionsForTest(testId: string) {
  if (testId === "tk_apego") return APEGO_QUESTIONS;
  return [];
}

function computeResult(testId: string, answers: Record<string, number>) {
  if (testId === "tk_apego") return computeApegoResult(answers);
  return null;
}

export default function SelfTestQuestionScreen() {
  const { testId } = useLocalSearchParams<{ testId: string }>();
  const { top, bottom } = useSafeAreaInsets();

  const questions = useRef(getQuestionsForTest(testId ?? "")).current;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const processing = useRef(false);

  const fadeOpacity = useSharedValue(1);
  const slideX = useSharedValue(0);

  const current = questions[step];
  const progress = (step + 1) / questions.length;

  const accentColor =
    current && testId === "tk_apego"
      ? APEGO_STYLE_META[(current as (typeof APEGO_QUESTIONS)[0]).style].color
      : "#8980B8";

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
          const result = computeResult(testId ?? "", newAnswers);
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
