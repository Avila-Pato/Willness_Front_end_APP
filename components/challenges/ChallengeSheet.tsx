import { SPACING } from "@/constants/constants";
import { BG, CARD_BG, MUTED, TEXT } from "@/constants/theme";
import {
  getImprovementQuestionsForChallenge,
  getImprovementQuestionsForConcepts,
} from "@/data/improvementQuestions";
import { Challenge, ChallengeQuestion } from "@/types/challenges";
import { Image } from "expo-image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { height: SCREEN_H } = Dimensions.get("window");
const SHEET_H = SCREEN_H;
const DISMISS_THRESHOLD = SCREEN_H * 0.2;

const CARD_IMAGES = [
  require("@/assets/character/3.png"),
  require("@/assets/character/7.png"),
  require("@/assets/character/11.png"),
  require("@/assets/character/15.png"),
  require("@/assets/character/4.png"),
  require("@/assets/character/9.png"),
  require("@/assets/character/13.png"),
  require("@/assets/character/17.png"),
];
const CARD_ROTATIONS = [-4, 3, -3, 4];

type Props = {
  challenge: Challenge;
  onClose: (correct: number, total: number) => void;
};

type AnswerState = "idle" | "correct" | "wrong";

type ReviewData = { title: string; body: string };

const REVIEWS: Record<string, Record<"high" | "mid" | "low", ReviewData>> = {
  adivina_concepto: {
    high: {
      title: "Dominas los conceptos",
      body: "Reconoces los conceptos de bienestar con facilidad. Tienes una comprensión sólida de la salud mental y el autoconocimiento.",
    },
    mid: {
      title: "Vas por buen camino",
      body: "Identificas bien algunos conceptos pero hay áreas que aún se te mezclan. Profundiza en los temas que menos reconociste.",
    },
    low: {
      title: "Sigue explorando",
      body: "El autoconocimiento toma tiempo. Sigue reflexionando sobre estos conceptos y considera lecturas o recursos de bienestar.",
    },
  },
  identifica_patron: {
    high: {
      title: "Excelente percepción",
      body: "Detectas los patrones con claridad. Tu capacidad de observar dinámicas relacionales es muy buena.",
    },
    mid: {
      title: "Buen ojo, hay más por ver",
      body: "Encuentras algunos patrones pero otros más sutiles se te escapan. Sigue practicando la observación de las dinámicas en tus relaciones.",
    },
    low: {
      title: "La percepción se entrena",
      body: "Reconocer patrones relacionales es una habilidad que se desarrolla con práctica y reflexión. Cada situación es una oportunidad de aprendizaje.",
    },
  },
  verdad_mito: {
    high: {
      title: "Cultura de bienestar sólida",
      body: "Distingues los hechos de los mitos con facilidad. Tu conocimiento sobre salud mental y bienestar está muy bien fundamentado.",
    },
    mid: {
      title: "Buena base, algunos huecos",
      body: "Tienes conocimiento general pero algunos conceptos sobre salud mental aún te confunden. Explorar fuentes confiables te ayudará.",
    },
    low: {
      title: "Hay mitos que te confunden",
      body: "El mundo del bienestar tiene mucha información incorrecta circulando. Fuentes confiables, libros especializados y terapia pueden orientarte.",
    },
  },
  completa_reflexion: {
    high: {
      title: "Dominas los principios",
      body: "Conoces bien los conceptos y reflexiones clave de bienestar. Eso se nota en cada respuesta.",
    },
    mid: {
      title: "Buen camino, hay más por aprender",
      body: "Tu comprensión general es buena pero hay principios específicos que aún te fallan. Sigue explorando estos conceptos.",
    },
    low: {
      title: "Refuerza los fundamentos",
      body: "Los conceptos básicos de bienestar son la base de todo. Tómate el tiempo para leer y reflexionar sobre ellos.",
    },
  },
};

function getReview(id: string, pct: number): ReviewData {
  const level = pct >= 80 ? "high" : pct >= 50 ? "mid" : "low";
  return (
    REVIEWS[id]?.[level] ?? {
      title: level === "high" ? "Muy bien" : "Sigue practicando",
      body: "Continúa practicando para mejorar tu resultado.",
    }
  );
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildPracticeQuestions(
  challengeId: string,
  mainQuestions: ChallengeQuestion[],
  results: boolean[],
): ChallengeQuestion[] {
  const failedIndices = results
    .map((ok, i) => ({ ok, i }))
    .filter((r) => !r.ok)
    .map((r) => r.i);
  if (failedIndices.length === 0) return [];

  if (challengeId === "adivina_concepto") {
    const failedConcepts = [
      ...new Set(
        failedIndices
          .map((i) => (mainQuestions[i] as any).concept as string | undefined)
          .filter(Boolean) as string[],
      ),
    ];
    return getImprovementQuestionsForConcepts(failedConcepts, 3);
  }

  return getImprovementQuestionsForChallenge(challengeId, 3);
}

export function ChallengeSheet({ challenge, onClose }: Props) {
  const { top } = useSafeAreaInsets();
  const translateY = useSharedValue(SHEET_H);
  const backdropOpacity = useSharedValue(0);
  const scrollRef = useRef<ScrollView>(null);

  const [sessionKey, setSessionKey] = useState(0);
  const questions = useMemo<ChallengeQuestion[]>(
    () => shuffle(challenge.questions),
    [sessionKey, challenge.questions],
  );

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  // Práctica de refuerzo
  const [practiceQuestions, setPracticeQuestions] = useState<
    ChallengeQuestion[]
  >([]);
  const [practiceStep, setPracticeStep] = useState(0);
  const [practiceSelected, setPracticeSelected] = useState<number | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [practiceResults, setPracticeResults] = useState<boolean[]>([]);
  const [practiceDone, setPracticeDone] = useState(false);

  const totalSteps = questions.length;
  const currentQ: ChallengeQuestion = questions[step];
  const correctCount = results.filter(Boolean).length;

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 160,
      mass: 0.85,
    });
    backdropOpacity.value = withTiming(1, { duration: 220 });
  }, []);

  const dismiss = useCallback(
    (correct: number, total: number) => {
      translateY.value = withTiming(
        SHEET_H,
        { duration: 420, easing: Easing.in(Easing.cubic) },
        () => runOnJS(onClose)(correct, total),
      );
      backdropOpacity.value = withTiming(0, { duration: 400 });
    },
    [onClose],
  );

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_THRESHOLD || e.velocityY > 1200) {
        runOnJS(dismiss)(done ? correctCount : 0, done ? totalSteps : 0);
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  // ── Main quiz handlers ──────────────────────────────────────────────────
  const handleSelect = (index: number) => {
    if (answerState !== "idle") return;
    setSelected(index);
    setAnswerState(index === currentQ.correctIndex ? "correct" : "wrong");
  };

  const handleNext = () => {
    const isCorrect = selected === currentQ.correctIndex;
    const nextResults = [...results, isCorrect];
    setResults(nextResults);
    scrollRef.current?.scrollTo({ y: 0, animated: false });

    if (step + 1 >= totalSteps) {
      const pqs = buildPracticeQuestions(challenge.id, questions, nextResults);
      setPracticeQuestions(pqs);
      setDone(true);
    } else {
      setStep(step + 1);
      setSelected(null);
      setAnswerState("idle");
    }
  };

  // ── Practice quiz handlers ──────────────────────────────────────────────
  const handlePracticeSelect = (index: number) => {
    if (practiceAnswered) return;
    setPracticeSelected(index);
    setPracticeAnswered(true);
  };

  const handlePracticeNext = () => {
    const isCorrect =
      practiceSelected === practiceQuestions[practiceStep].correctIndex;
    const next = [...practiceResults, isCorrect];
    setPracticeResults(next);
    scrollRef.current?.scrollTo({ y: 0, animated: false });

    if (practiceStep + 1 >= practiceQuestions.length) {
      setPracticeDone(true);
    } else {
      setPracticeStep(practiceStep + 1);
      setPracticeSelected(null);
      setPracticeAnswered(false);
    }
  };

  const handleReplay = () => {
    setSessionKey((k) => k + 1);
    setStep(0);
    setSelected(null);
    setAnswerState("idle");
    setResults([]);
    setDone(false);
    setPracticeQuestions([]);
    setPracticeStep(0);
    setPracticeSelected(null);
    setPracticeAnswered(false);
    setPracticeResults([]);
    setPracticeDone(false);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const isVerdadMito = challenge.id === "verdad_mito";
  const isTrueFalse = (q: ChallengeQuestion) =>
    q.type === "true_false" || isVerdadMito;

  const optionBg = (
    i: number,
    q: ChallengeQuestion,
    sel: number | null,
    state: AnswerState,
  ) => {
    if (state === "idle") return CARD_BG;
    if (i === q.correctIndex) return "#DCFCE7";
    if (i === sel) return "#FEE2E2";
    return CARD_BG;
  };
  const optionBorder = (
    i: number,
    q: ChallengeQuestion,
    sel: number | null,
    state: AnswerState,
  ) => {
    if (state === "idle") return "#E5E7EB";
    if (i === q.correctIndex) return "#059669";
    if (i === sel) return "#DC2626";
    return "#E5E7EB";
  };
  const optionColor = (
    i: number,
    q: ChallengeQuestion,
    sel: number | null,
    state: AnswerState,
  ) => {
    if (state === "idle") return TEXT;
    if (i === q.correctIndex) return "#059669";
    if (i === sel) return "#DC2626";
    return MUTED;
  };

  const pct = done ? Math.round((correctCount / totalSteps) * 100) : 0;
  const review = done ? getReview(challenge.id, pct) : null;
  const pctColor =
    pct >= 80 ? "#059669" : pct >= 50 ? challenge.color : "#DC2626";

  const currentPQ = practiceQuestions[practiceStep];
  const practiceState: AnswerState = practiceAnswered
    ? practiceSelected === currentPQ?.correctIndex
      ? "correct"
      : "wrong"
    : "idle";

  const showButtons = !done || practiceDone || practiceQuestions.length === 0;

  return (
    <Modal transparent animationType="none" statusBarTranslucent>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() =>
            dismiss(done ? correctCount : 0, done ? totalSteps : 0)
          }
        >
          <Animated.View style={[styles.backdrop, backdropStyle]} />
        </Pressable>

        <Animated.View style={[styles.sheet, sheetStyle]}>
          {/* Barra superior: handle de arrastre + botón cerrar + progreso */}
          <GestureDetector gesture={panGesture}>
            <View style={[styles.topBar, { paddingTop: top }]}>
              {/* X absolutamente arriba a la derecha */}
              <Pressable
                style={[
                  styles.closeTopBtn,
                  { position: "absolute", top: top + -16, right: SPACING * 2 },
                ]}
                onPress={() =>
                  dismiss(done ? correctCount : 0, done ? totalSteps : 0)
                }
              >
                <Text style={styles.closeTopBtnText}>✕</Text>
              </Pressable>
              {/* Pill centrada */}
              <View style={styles.handleRow}>
                <View style={styles.handle} />
              </View>
              {!done && (
                <View style={styles.thinProgressTrack}>
                  <View
                    style={[
                      styles.thinProgressFill,
                      {
                        width: `${((step + (answerState !== "idle" ? 1 : 0)) / totalSteps) * 100}%`,
                        backgroundColor: challenge.color,
                      },
                    ]}
                  />
                </View>
              )}
            </View>
          </GestureDetector>

          {done ? (
            /* ── Resultado + Práctica ── */
            <ScrollView
              ref={scrollRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.resultScroll}
            >
              {/* Porcentaje */}
              <View style={styles.pctBlock}>
                <Text style={[styles.pctNumber, { color: pctColor }]}>
                  {pct}
                  <Text style={styles.pctSign}>%</Text>
                </Text>
                <Text style={styles.pctSub}>
                  {correctCount} de {totalSteps} correctas
                </Text>
              </View>

              {/* Dots resumen */}
              <View style={styles.dotsRow}>
                {results.map((ok, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      { backgroundColor: ok ? "#059669" : "#DC2626" },
                    ]}
                  />
                ))}
              </View>

              {/* Review card */}
              {review && (
                <View style={styles.reviewCard}>
                  <Text style={styles.reviewTitle}>{review.title}</Text>
                  <Text style={styles.reviewBody}>{review.body}</Text>
                </View>
              )}

              {/* ── Práctica de refuerzo ── */}
              {practiceQuestions.length > 0 && !practiceDone && (
                <View style={styles.practiceSection}>
                  {/* Hero de práctica */}
                  <View
                    style={[
                      styles.practiceHero,
                      { backgroundColor: challenge.color + "18" },
                    ]}
                  >
                    <View
                      style={[
                        styles.heroDeco,
                        { backgroundColor: challenge.color + "15" },
                      ]}
                    />
                    <View
                      style={[
                        styles.heroChip,
                        { backgroundColor: challenge.color + "28" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.heroChipText,
                          { color: challenge.color },
                        ]}
                      >
                        Refuerzo
                      </Text>
                    </View>
                    <View style={styles.practiceLabelRow}>
                      <View style={styles.practiceLabelDot} />
                      <Text style={styles.practiceLabel}>
                        Refuerza lo que fallaste
                      </Text>
                      <Text style={styles.practiceCounter}>
                        {practiceStep + 1}/{practiceQuestions.length}
                      </Text>
                    </View>
                    <Text style={styles.practiceStatement}>
                      {currentPQ.statement}
                    </Text>
                  </View>

                  {currentPQ.code && (
                    <View style={styles.codeBlock}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      >
                        <Text style={styles.codeText}>{currentPQ.code}</Text>
                      </ScrollView>
                    </View>
                  )}

                  {/* Verdad / Mito práctica */}
                  {currentPQ.type === "true_false" && (
                    <View
                      style={[styles.optionsRow, { marginBottom: SPACING }]}
                    >
                      {currentPQ.options.map((opt, i) => {
                        const bg = optionBg(
                          i,
                          currentPQ,
                          practiceSelected,
                          practiceState,
                        );
                        const border = optionBorder(
                          i,
                          currentPQ,
                          practiceSelected,
                          practiceState,
                        );
                        const color = optionColor(
                          i,
                          currentPQ,
                          practiceSelected,
                          practiceState,
                        );
                        return (
                          <Pressable
                            key={i}
                            style={[
                              styles.optionBig,
                              { backgroundColor: bg, borderColor: border },
                            ]}
                            onPress={() => handlePracticeSelect(i)}
                          >
                            <Text style={[styles.vmIcon, { color }]}>
                              {opt === "Verdad" ? "✓" : "✗"}
                            </Text>
                            <Text style={[styles.optionBigText, { color }]}>
                              {opt}
                            </Text>
                            {practiceAnswered &&
                              i === currentPQ.correctIndex && (
                                <Text style={styles.optionCheck}>✓</Text>
                              )}
                            {practiceAnswered &&
                              i === practiceSelected &&
                              i !== currentPQ.correctIndex && (
                                <Text style={styles.optionX}>✗</Text>
                              )}
                          </Pressable>
                        );
                      })}
                    </View>
                  )}

                  {/* Grid 2×2 imagen práctica — adivina_concepto */}
                  {currentPQ.type !== "true_false" &&
                    challenge.id === "adivina_concepto" && (
                      <View style={styles.optionsGrid}>
                        {currentPQ.options.map((opt, i) => {
                          const border = optionBorder(
                            i,
                            currentPQ,
                            practiceSelected,
                            practiceState,
                          );
                          const color = optionColor(
                            i,
                            currentPQ,
                            practiceSelected,
                            practiceState,
                          );
                          const isCorrect = i === currentPQ.correctIndex;
                          const isWrong = i === practiceSelected && !isCorrect;
                          const letter = String.fromCharCode(65 + i);
                          const img =
                            CARD_IMAGES[
                              (practiceStep * 4 + i) % CARD_IMAGES.length
                            ];
                          const rotation = CARD_ROTATIONS[i];
                          return (
                            <Pressable
                              key={i}
                              style={[
                                styles.optionImgCard,
                                {
                                  borderColor: border,
                                  transform: [{ rotate: `${rotation}deg` }],
                                },
                              ]}
                              onPress={() => handlePracticeSelect(i)}
                            >
                              <View
                                style={[
                                  styles.optionImgArea,
                                  { backgroundColor: challenge.color + "20" },
                                ]}
                              >
                                <Image
                                  source={img}
                                  style={styles.optionImg}
                                  contentFit="contain"
                                />
                                <View
                                  style={[
                                    styles.optionImgBadge,
                                    {
                                      backgroundColor: practiceAnswered
                                        ? isCorrect
                                          ? "#059669"
                                          : isWrong
                                            ? "#DC2626"
                                            : "rgba(0,0,0,0.12)"
                                        : challenge.color + "CC",
                                    },
                                  ]}
                                >
                                  <Text style={styles.optionImgLetter}>
                                    {letter}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={[
                                  styles.optionImgBody,
                                  {
                                    backgroundColor:
                                      practiceAnswered && isCorrect
                                        ? "#DCFCE7"
                                        : practiceAnswered && isWrong
                                          ? "#FEE2E2"
                                          : "#fff",
                                  },
                                ]}
                              >
                                <Text
                                  style={[styles.optionImgText, { color }]}
                                  numberOfLines={3}
                                >
                                  {opt}
                                </Text>
                              </View>
                              {practiceAnswered && isCorrect && (
                                <View style={styles.optionImgResultBadge}>
                                  <Text style={styles.optionImgResultText}>
                                    ✓
                                  </Text>
                                </View>
                              )}
                              {practiceAnswered && isWrong && (
                                <View
                                  style={[
                                    styles.optionImgResultBadge,
                                    { backgroundColor: "#DC2626" },
                                  ]}
                                >
                                  <Text style={styles.optionImgResultText}>
                                    ✗
                                  </Text>
                                </View>
                              )}
                            </Pressable>
                          );
                        })}
                      </View>
                    )}

                  {/* Grid imagen práctica — identifica_patron / completa_reflexion */}
                  {currentPQ.type !== "true_false" &&
                    challenge.id !== "adivina_concepto" && (
                      <View style={styles.optionsGrid}>
                        {currentPQ.options.map((opt, i) => {
                          const border = optionBorder(
                            i,
                            currentPQ,
                            practiceSelected,
                            practiceState,
                          );
                          const color = optionColor(
                            i,
                            currentPQ,
                            practiceSelected,
                            practiceState,
                          );
                          const isCorrect = i === currentPQ.correctIndex;
                          const isWrong = i === practiceSelected && !isCorrect;
                          const letter = String.fromCharCode(65 + i);
                          const img =
                            CARD_IMAGES[
                              (practiceStep * 4 + i + 4) % CARD_IMAGES.length
                            ];
                          const rotation = CARD_ROTATIONS[i];
                          return (
                            <Pressable
                              key={i}
                              style={[
                                styles.optionImgCard,
                                {
                                  borderColor: border,
                                  transform: [{ rotate: `${rotation}deg` }],
                                },
                              ]}
                              onPress={() => handlePracticeSelect(i)}
                            >
                              <View
                                style={[
                                  styles.optionImgArea,
                                  { backgroundColor: challenge.color + "20" },
                                ]}
                              >
                                <Image
                                  source={img}
                                  style={styles.optionImg}
                                  contentFit="contain"
                                />
                                <View
                                  style={[
                                    styles.optionImgBadge,
                                    {
                                      backgroundColor: practiceAnswered
                                        ? isCorrect
                                          ? "#059669"
                                          : isWrong
                                            ? "#DC2626"
                                            : "rgba(0,0,0,0.12)"
                                        : challenge.color + "CC",
                                    },
                                  ]}
                                >
                                  <Text style={styles.optionImgLetter}>
                                    {letter}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={[
                                  styles.optionImgBody,
                                  {
                                    backgroundColor:
                                      practiceAnswered && isCorrect
                                        ? "#DCFCE7"
                                        : practiceAnswered && isWrong
                                          ? "#FEE2E2"
                                          : "#fff",
                                  },
                                ]}
                              >
                                <Text
                                  style={[styles.optionImgText, { color }]}
                                  numberOfLines={4}
                                >
                                  {opt}
                                </Text>
                              </View>
                              {practiceAnswered && isCorrect && (
                                <View style={styles.optionImgResultBadge}>
                                  <Text style={styles.optionImgResultText}>
                                    ✓
                                  </Text>
                                </View>
                              )}
                              {practiceAnswered && isWrong && (
                                <View
                                  style={[
                                    styles.optionImgResultBadge,
                                    { backgroundColor: "#DC2626" },
                                  ]}
                                >
                                  <Text style={styles.optionImgResultText}>
                                    ✗
                                  </Text>
                                </View>
                              )}
                            </Pressable>
                          );
                        })}
                      </View>
                    )}

                  {practiceAnswered && (
                    <>
                      <View style={styles.explanationBox}>
                        <Text style={styles.explanationTitle}>
                          {practiceSelected === currentPQ.correctIndex
                            ? "Correcto"
                            : "Incorrecto"}
                        </Text>
                        <Text style={styles.explanationText}>
                          {currentPQ.explanation}
                        </Text>
                      </View>
                      <Pressable
                        style={[
                          styles.nextBtn,
                          { backgroundColor: challenge.color },
                        ]}
                        onPress={handlePracticeNext}
                      >
                        <Text style={styles.nextBtnText}>
                          {practiceStep + 1 >= practiceQuestions.length
                            ? "Finalizar práctica"
                            : "Siguiente pregunta"}
                        </Text>
                      </Pressable>
                    </>
                  )}
                </View>
              )}

              {/* Resumen práctica completada */}
              {practiceDone && practiceResults.length > 0 && (
                <View style={styles.practiceSummary}>
                  <Text style={styles.practiceSummaryTitle}>
                    Práctica completada
                  </Text>
                  <Text style={styles.practiceSummaryText}>
                    {practiceResults.filter(Boolean).length} de{" "}
                    {practiceResults.length} correctas en el refuerzo.
                  </Text>
                </View>
              )}

              {/* Botones finales */}
              {showButtons && (
                <View style={styles.resultBtns}>
                  <Pressable
                    style={[styles.replayBtn, { borderColor: challenge.color }]}
                    onPress={handleReplay}
                  >
                    <Text
                      style={[styles.replayBtnText, { color: challenge.color }]}
                    >
                      Intentar de nuevo
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.closeBtn,
                      { backgroundColor: challenge.color },
                    ]}
                    onPress={() => dismiss(correctCount, totalSteps)}
                  >
                    <Text style={styles.closeBtnText}>Listo</Text>
                  </Pressable>
                </View>
              )}
            </ScrollView>
          ) : (
            /* ── Pregunta principal ── */
            <ScrollView
              ref={scrollRef}
              style={{ flex: 1 }}
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              {/* Chip + contador centrados */}
              <View style={styles.questionMeta}>
                <View
                  style={[
                    styles.questionChip,
                    { backgroundColor: challenge.color + "25" },
                  ]}
                >
                  <Text
                    style={[
                      styles.questionChipText,
                      { color: challenge.color },
                    ]}
                  >
                    {challenge.title}
                  </Text>
                </View>
                <Text style={styles.questionCounter}>
                  {step + 1} / {totalSteps}
                </Text>
              </View>

              {/* Pregunta centrada */}
              <Text style={styles.statement}>{currentQ.statement}</Text>

              {currentQ.code && (
                <View style={styles.codeBlock}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text style={styles.codeText}>{currentQ.code}</Text>
                  </ScrollView>
                </View>
              )}

              {/* Verdad / Mito */}
              {isTrueFalse(currentQ) && (
                <View
                  style={[styles.optionsRow, { marginBottom: SPACING * 2 }]}
                >
                  {currentQ.options.map((opt, i) => {
                    const isVerdad = opt === "Verdad";
                    const bg =
                      answerState === "idle"
                        ? isVerdad
                          ? "#ECFDF5"
                          : "#FEF2F2"
                        : optionBg(i, currentQ, selected, answerState);
                    const border =
                      answerState === "idle"
                        ? isVerdad
                          ? "#6EE7B7"
                          : "#FCA5A5"
                        : optionBorder(i, currentQ, selected, answerState);
                    const textColor =
                      answerState === "idle"
                        ? isVerdad
                          ? "#059669"
                          : "#DC2626"
                        : optionColor(i, currentQ, selected, answerState);
                    return (
                      <Pressable
                        key={i}
                        style={[
                          styles.optionBig,
                          { backgroundColor: bg, borderColor: border },
                        ]}
                        onPress={() => handleSelect(i)}
                      >
                        <Text style={[styles.vmIcon, { color: textColor }]}>
                          {isVerdad ? "✓" : "✗"}
                        </Text>
                        <Text
                          style={[styles.optionBigText, { color: textColor }]}
                        >
                          {opt}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}

              {/* Grid 2×2 imagen — adivina_concepto */}
              {!isTrueFalse(currentQ) &&
                challenge.id === "adivina_concepto" && (
                  <View style={styles.optionsGrid}>
                    {currentQ.options.map((opt, i) => {
                      const border = optionBorder(
                        i,
                        currentQ,
                        selected,
                        answerState,
                      );
                      const color = optionColor(
                        i,
                        currentQ,
                        selected,
                        answerState,
                      );
                      const isAnswered = answerState !== "idle";
                      const isCorrect = i === currentQ.correctIndex;
                      const isWrong = i === selected && !isCorrect;
                      const letter = String.fromCharCode(65 + i);
                      const img =
                        CARD_IMAGES[(step * 4 + i) % CARD_IMAGES.length];
                      const rotation = CARD_ROTATIONS[i];
                      return (
                        <Pressable
                          key={i}
                          style={[
                            styles.optionImgCard,
                            {
                              borderColor: border,
                              transform: [{ rotate: `${rotation}deg` }],
                            },
                          ]}
                          onPress={() => handleSelect(i)}
                        >
                          {/* Imagen */}
                          <View
                            style={[
                              styles.optionImgArea,
                              { backgroundColor: challenge.color + "20" },
                            ]}
                          >
                            <Image
                              source={img}
                              style={styles.optionImg}
                              contentFit="contain"
                            />
                            {/* Badge de letra — se ilumina al seleccionar */}
                            <View
                              style={[
                                styles.optionImgBadge,
                                {
                                  backgroundColor: isAnswered
                                    ? isCorrect
                                      ? "#059669"
                                      : isWrong
                                        ? "#DC2626"
                                        : "rgba(0,0,0,0.12)"
                                    : challenge.color + "CC",
                                },
                              ]}
                            >
                              <Text style={styles.optionImgLetter}>
                                {letter}
                              </Text>
                            </View>
                          </View>

                          {/* Texto de la opción */}
                          <View
                            style={[
                              styles.optionImgBody,
                              {
                                backgroundColor:
                                  isAnswered && isCorrect
                                    ? "#DCFCE7"
                                    : isAnswered && isWrong
                                      ? "#FEE2E2"
                                      : "#fff",
                              },
                            ]}
                          >
                            <Text
                              style={[styles.optionImgText, { color }]}
                              numberOfLines={3}
                            >
                              {opt}
                            </Text>
                          </View>

                          {/* Indicador correcto/incorrecto */}
                          {isAnswered && isCorrect && (
                            <View style={styles.optionImgResultBadge}>
                              <Text style={styles.optionImgResultText}>✓</Text>
                            </View>
                          )}
                          {isAnswered && isWrong && (
                            <View
                              style={[
                                styles.optionImgResultBadge,
                                { backgroundColor: "#DC2626" },
                              ]}
                            >
                              <Text style={styles.optionImgResultText}>✗</Text>
                            </View>
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                )}

              {/* Grid imagen — identifica_patron / completa_reflexion */}
              {!isTrueFalse(currentQ) &&
                challenge.id !== "adivina_concepto" && (
                  <View style={styles.optionsGrid}>
                    {currentQ.options.map((opt, i) => {
                      const border = optionBorder(
                        i,
                        currentQ,
                        selected,
                        answerState,
                      );
                      const color = optionColor(
                        i,
                        currentQ,
                        selected,
                        answerState,
                      );
                      const isAnswered = answerState !== "idle";
                      const isCorrect = i === currentQ.correctIndex;
                      const isWrong = i === selected && !isCorrect;
                      const letter = String.fromCharCode(65 + i);
                      const img =
                        CARD_IMAGES[(step * 4 + i + 4) % CARD_IMAGES.length];
                      const rotation = CARD_ROTATIONS[i];
                      return (
                        <Pressable
                          key={i}
                          style={[
                            styles.optionImgCard,
                            {
                              borderColor: border,
                              transform: [{ rotate: `${rotation}deg` }],
                            },
                          ]}
                          onPress={() => handleSelect(i)}
                        >
                          <View
                            style={[
                              styles.optionImgArea,
                              { backgroundColor: challenge.color + "20" },
                            ]}
                          >
                            <Image
                              source={img}
                              style={styles.optionImg}
                              contentFit="contain"
                            />
                            <View
                              style={[
                                styles.optionImgBadge,
                                {
                                  backgroundColor: isAnswered
                                    ? isCorrect
                                      ? "#059669"
                                      : isWrong
                                        ? "#DC2626"
                                        : "rgba(0,0,0,0.12)"
                                    : challenge.color + "CC",
                                },
                              ]}
                            >
                              <Text style={styles.optionImgLetter}>
                                {letter}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={[
                              styles.optionImgBody,
                              {
                                backgroundColor:
                                  isAnswered && isCorrect
                                    ? "#DCFCE7"
                                    : isAnswered && isWrong
                                      ? "#FEE2E2"
                                      : "#fff",
                              },
                            ]}
                          >
                            <Text
                              style={[styles.optionImgText, { color }]}
                              numberOfLines={4}
                            >
                              {opt}
                            </Text>
                          </View>
                          {isAnswered && isCorrect && (
                            <View style={styles.optionImgResultBadge}>
                              <Text style={styles.optionImgResultText}>✓</Text>
                            </View>
                          )}
                          {isAnswered && isWrong && (
                            <View
                              style={[
                                styles.optionImgResultBadge,
                                { backgroundColor: "#DC2626" },
                              ]}
                            >
                              <Text style={styles.optionImgResultText}>✗</Text>
                            </View>
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                )}

              {answerState !== "idle" && (
                <View style={styles.explanationBox}>
                  <Text
                    style={[
                      styles.explanationTitle,
                      {
                        color:
                          answerState === "correct" ? "#059669" : "#DC2626",
                      },
                    ]}
                  >
                    {answerState === "correct"
                      ? "✓  Correcto"
                      : "✗  Incorrecto"}
                  </Text>
                  <Text style={styles.explanationText}>
                    {currentQ.explanation}
                  </Text>
                </View>
              )}

              {answerState !== "idle" && (
                <Pressable
                  style={[styles.nextBtn, { backgroundColor: challenge.color }]}
                  onPress={handleNext}
                >
                  <Text style={styles.nextBtnText}>
                    {step + 1 >= totalSteps ? "Ver resultado" : "Siguiente"}
                  </Text>
                </Pressable>
              )}

              <View style={{ height: 32 }} />
            </ScrollView>
          )}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_H,
    backgroundColor: BG,
    overflow: "hidden",
  },
  topBar: {
    paddingHorizontal: SPACING * 2,
    paddingBottom: SPACING,
  },
  handleRow: {
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: SPACING * 1.5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
  },
  closeTopBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeTopBtnText: {
    fontSize: 14,
    color: MUTED,
    fontWeight: "700",
  },
  thinProgressTrack: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  thinProgressFill: {
    height: 4,
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: SPACING * 2,
    paddingTop: 0,
    paddingBottom: SPACING * 2,
  },
  // question
  questionMeta: {
    alignItems: "center",
    gap: SPACING * 0.8,
    paddingTop: SPACING * 3,
    paddingBottom: SPACING * 2,
  },
  questionChip: {
    paddingHorizontal: SPACING * 1.4,
    paddingVertical: SPACING * 0.5,
    borderRadius: 20,
  },
  questionChipText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: "600",
    color: MUTED,
  },
  heroDeco: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    right: -50,
    bottom: -70,
  },
  heroChip: {
    alignSelf: "flex-start",
    paddingHorizontal: SPACING * 1.2,
    paddingVertical: SPACING * 0.4,
    borderRadius: 20,
  },
  heroChipText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  practiceHero: {
    marginHorizontal: -SPACING * 2.5,
    marginTop: -SPACING * 2.5,
    paddingHorizontal: SPACING * 2.5,
    paddingTop: SPACING * 2.5,
    paddingBottom: SPACING * 2.5,
    marginBottom: SPACING * 1.5,
    gap: SPACING * 1.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  statement: {
    fontSize: 20,
    fontWeight: "800",
    color: TEXT,
    lineHeight: 30,
    textAlign: "center",
    marginBottom: SPACING * 2.5,
  },
  codeBlock: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: SPACING * 1.5,
    marginBottom: SPACING * 2,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#E2E8F0",
    lineHeight: 22,
  },
  optionsRow: { flexDirection: "row", gap: SPACING, marginBottom: SPACING * 2 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    padding: SPACING * 1.6,
    gap: SPACING * 1.2,
  },
  optionBig: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    paddingVertical: SPACING * 3,
    gap: SPACING * 0.5,
  },
  vmIcon: {
    fontSize: 32,
    fontWeight: "900",
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLetterText: { fontSize: 12, fontWeight: "800" },
  optionText: { fontSize: 14, fontWeight: "600", lineHeight: 22 },

  /* Grid 2×2 imagen (adivina_concepto) */
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginBottom: SPACING * 2,
    paddingHorizontal: SPACING * 0.5,
  },
  optionImgCard: {
    width: "47%",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#1C1B29",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  optionImgArea: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING * 0.8,
  },
  optionImg: {
    width: "85%",
    height: "85%",
  },
  optionImgBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 26,
    height: 26,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  optionImgLetter: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
  },
  optionImgBody: {
    paddingHorizontal: SPACING * 1.2,
    paddingVertical: SPACING * 1,
  },
  optionImgText: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    color: TEXT,
  },
  optionImgResultBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#059669",
    alignItems: "center",
    justifyContent: "center",
  },
  optionImgResultText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },

  optionBigText: { fontSize: 18, fontWeight: "900" },
  optionCheck: {
    fontSize: 16,
    color: "#059669",
    fontWeight: "900",
    marginLeft: "auto",
  },
  optionX: {
    fontSize: 16,
    color: "#DC2626",
    fontWeight: "900",
    marginLeft: "auto",
  },
  explanationBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: SPACING * 1.5,
    marginBottom: SPACING * 1.5,
  },
  explanationTitle: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  explanationText: { fontSize: 13, color: MUTED, lineHeight: 20 },
  nextBtn: {
    borderRadius: 16,
    paddingVertical: SPACING * 1.6,
    alignItems: "center",
    marginBottom: SPACING,
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  // ── Resultado ──────────────────────────────────────────────────
  resultScroll: {
    paddingHorizontal: SPACING * 2.5,
    paddingTop: SPACING,
    paddingBottom: SPACING * 4,
    gap: SPACING * 2,
  },
  pctBlock: {
    alignItems: "center",
    gap: SPACING * 0.5,
    paddingVertical: SPACING * 2,
  },
  pctNumber: {
    fontSize: 80,
    fontWeight: "800",
    letterSpacing: -3,
    lineHeight: 84,
  },
  pctSign: { fontSize: 36, fontWeight: "700", letterSpacing: 0 },
  pctSub: {
    fontSize: 14,
    color: MUTED,
    fontWeight: "600",
    marginTop: SPACING * 0.5,
  },
  dotsRow: { flexDirection: "row", gap: 6, justifyContent: "center" },
  dot: { width: 10, height: 10, borderRadius: 5 },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: SPACING * 2,
    gap: SPACING * 0.8,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.3,
  },
  reviewBody: { fontSize: 14, color: MUTED, lineHeight: 22 },

  // ── Sección práctica ───────────────────────────────────────────
  practiceSection: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: SPACING * 2.5,
    gap: SPACING * 1.8,
  },
  practiceLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 0.8,
    marginBottom: SPACING * 0.5,
  },
  practiceLabelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F59E0B",
  },
  practiceLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  practiceCounter: { fontSize: 12, fontWeight: "700", color: MUTED },
  practiceStatement: {
    fontSize: 16,
    fontWeight: "700",
    color: TEXT,
    lineHeight: 26,
  },

  practiceSummary: {
    backgroundColor: "#F0FDF4",
    borderRadius: 14,
    padding: SPACING * 1.5,
    gap: 4,
  },
  practiceSummaryTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#15803D",
  },
  practiceSummaryText: { fontSize: 13, color: "#166534", lineHeight: 20 },

  resultBtns: { gap: SPACING },
  replayBtn: {
    borderRadius: 16,
    paddingVertical: SPACING * 1.6,
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  replayBtnText: { fontSize: 15, fontWeight: "800" },
  closeBtn: {
    borderRadius: 16,
    paddingVertical: SPACING * 1.6,
    alignItems: "center",
  },
  closeBtnText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
