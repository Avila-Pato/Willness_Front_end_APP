import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { AREA_COLORS, DeckCard, buildDeck } from "@/data/cardDeckData";
import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

// Cada mensaje tiene su propio timestamp — "Casi listo" dura ~2.5 s
const MSG_SCHEDULE = [
  { at: 0,    text: "Analizando tus respuestas..." },
  { at: 1800, text: "Identificando tus patrones..." },
  { at: 3800, text: "Construyendo tu perfil..." },
  { at: 5800, text: "Calculando tus fortalezas..." },
  { at: 7800, text: "Evaluando tu bienestar..." },
  { at: 9500, text: "Casi listo..." },           // se queda ~2.5 s
];
const ANALYSIS_DURATION = 12000;

function AnimDot({ delay }: { delay: number }) {
  const s = useSharedValue(0.4);
  useEffect(() => {
    s.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: delay || 1 }),
        withTiming(1,   { duration: 500 }),
        withTiming(0.4, { duration: 500 }),
      ),
      -1,
      false,
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const style = useAnimatedStyle(() => ({ opacity: s.value }));
  return <Animated.View style={[ao.dot, style]} />;
}

function AnalysisOverlay() {
  const [msg, setMsg] = useState(MSG_SCHEDULE[0].text);
  const barWidth   = useSharedValue(0);
  const msgOpacity = useSharedValue(1);
  const logoY      = useSharedValue(14);
  const logoOpacity = useSharedValue(0);
  const logoRotate  = useSharedValue(0);
  const timersRef  = useRef<ReturnType<typeof setTimeout>[]>([]);

  const flipTo = (text: string) => {
    msgOpacity.value = withTiming(0, { duration: 220 });
    timersRef.current.push(
      setTimeout(() => {
        setMsg(text);
        msgOpacity.value = withTiming(1, { duration: 320 });
      }, 230),
    );
  };

  useEffect(() => {
    // Logo entra y rota continuamente
    logoY.value       = withTiming(0, { duration: 600 });
    logoOpacity.value = withTiming(1, { duration: 700 });
    logoRotate.value  = withRepeat(
      withTiming(360, { duration: 3200, easing: Easing.linear }),
      -1,
      false,
    );

    // Barra con pausas/stutters — secuencia de ~12 s
    barWidth.value = withSequence(
      withTiming(8,   { duration: 500 }),
      withTiming(8,   { duration: 350 }),   // pausa
      withTiming(18,  { duration: 600 }),
      withTiming(18,  { duration: 450 }),   // pausa
      withTiming(28,  { duration: 700 }),
      withTiming(28,  { duration: 350 }),   // pausa
      withTiming(38,  { duration: 580 }),
      withTiming(38,  { duration: 600 }),   // stutter largo
      withTiming(48,  { duration: 650 }),
      withTiming(48,  { duration: 900 }),   // pausa muy larga — suspense
      withTiming(57,  { duration: 450 }),
      withTiming(57,  { duration: 480 }),   // pausa
      withTiming(65,  { duration: 500 }),
      withTiming(65,  { duration: 350 }),   // pausa
      withTiming(72,  { duration: 580 }),
      withTiming(72,  { duration: 850 }),   // pausa larga
      withTiming(80,  { duration: 420 }),
      withTiming(80,  { duration: 560 }),   // pausa
      withTiming(88,  { duration: 480 }),
      withTiming(88,  { duration: 520 }),   // pausa
      withTiming(94,  { duration: 380 }),
      withTiming(94,  { duration: 440 }),   // pausa final
      withTiming(100, { duration: 310 }),
    );

    // Mensajes en sus tiempos específicos (excepto el primero que ya está)
    MSG_SCHEDULE.slice(1).forEach(({ at, text }) => {
      timersRef.current.push(setTimeout(() => flipTo(text), at));
    });

    return () => timersRef.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const barStyle  = useAnimatedStyle(() => ({ width: `${barWidth.value}%` as any }));
  const msgStyle  = useAnimatedStyle(() => ({ opacity: msgOpacity.value }));
  const logoStyle = useAnimatedStyle(() => ({
    opacity:   logoOpacity.value,
    transform: [
      { translateY: logoY.value },
      { rotate: `${logoRotate.value}deg` },
    ],
  }));

  return (
    <View style={ao.root}>
      {/* Logo rotando */}
      <Animated.View style={[ao.logoWrap, logoStyle]}>
        <Image
          source={require("@/assets/logo.png")}
          style={ao.logo}
          contentFit="contain"
        />
      </Animated.View>

      {/* Dots */}
      <View style={ao.dotsRow}>
        <AnimDot delay={0} />
        <AnimDot delay={200} />
        <AnimDot delay={400} />
      </View>

      {/* Mensaje */}
      <Animated.Text style={[ao.msg, msgStyle]}>{msg}</Animated.Text>

      {/* Barra de progreso */}
      <View style={ao.barTrack}>
        <Animated.View style={[ao.barFill, barStyle]} />
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window");
const CARD_W = width * 0.84;
const CARD_H = 240;

const SCALE = [1, 0.94, 0.88];
const Y_OFF = [0, 18, 34];
const DURATION = 320;

function CardFace({ card }: { card: DeckCard }) {
  const colors = AREA_COLORS[card.area] ?? { accent: "#8980B8" };
  return (
    <View style={styles.cardContent}>
      <Text style={[styles.cardAreaLabel, { color: colors.accent }]}>
        {card.areaLabel}
      </Text>
      <Text style={styles.cardText}>{card.text}</Text>
    </View>
  );
}

function AnimatedCard({
  card,
  position,
  isExiting,
  exitRight,
}: {
  card: DeckCard;
  position: number;
  isExiting: boolean;
  exitRight: boolean;
}) {
  const initScale = SCALE[position] ?? 0.82;
  const initY = Y_OFF[position] ?? 48;

  const scaleV = useSharedValue(initScale);
  const yV = useSharedValue(initY);
  const xV = useSharedValue(0);
  const opacityV = useSharedValue(position <= 2 ? 1 : 0);

  useEffect(() => {
    if (isExiting) {
      scaleV.value = withTiming(0.95, { duration: 180 });
      xV.value = withTiming(exitRight ? width + 80 : -(width + 80), {
        duration: 360,
      });
      opacityV.value = withTiming(0, { duration: 300 });
    } else {
      scaleV.value = withTiming(SCALE[position] ?? 0.82, { duration: DURATION });
      yV.value = withTiming(Y_OFF[position] ?? 48, { duration: DURATION });
      opacityV.value = withTiming(1, { duration: DURATION });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, isExiting]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: xV.value },
      { translateY: yV.value },
      { scale: scaleV.value },
    ],
    opacity: opacityV.value,
    zIndex: isExiting ? 10 : (3 - position),
  }));

  const bg = AREA_COLORS[card.area]?.bg ?? "#EDE9F5";

  return (
    <Animated.View style={[styles.card, style, { backgroundColor: bg }]}>
      <CardFace card={card} />
    </Animated.View>
  );
}

export default function CardDeckScreen() {
  const params = useLocalSearchParams<{
    startNode?: string;
    formacion?: string;
    ramas?: string;
  }>();

  const { saveDiagnostic } = useUserStore();

  const areas = useMemo(
    () => params.ramas?.split(",").filter(Boolean) ?? ["emociones"],
    [params.ramas],
  );

  const cards = useMemo(() => buildDeck(areas), [areas]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [exitingInfo, setExitingInfo] = useState<{
    idx: number;
    right: boolean;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChoice = (resonates: boolean) => {
    if (busy) return;
    setBusy(true);

    const thisIdx = currentIdx;
    const card = cards[thisIdx];
    const newScores = { ...scores };
    if (resonates) {
      newScores[card.area] = (newScores[card.area] ?? 0) + 1;
      setScores(newScores);
    }

    const nextIdx = thisIdx + 1;
    const isDone = nextIdx >= cards.length;

    setExitingInfo({ idx: thisIdx, right: resonates });
    if (!isDone) setCurrentIdx(nextIdx);

    setTimeout(() => {
      setExitingInfo(null);
      setBusy(false);

      if (isDone) {
        const strengths = areas.filter((a) => (newScores[a] ?? 0) <= 1);
        const challenges = areas.filter((a) => (newScores[a] ?? 0) >= 2);
        saveDiagnostic({ scores: newScores, strengths, challenges });
        setIsAnalyzing(true);
        setTimeout(() => {
          router.replace({
            pathname: "/(onboarding)/results",
            params: {
              startNode: params.startNode ?? "",
              formacion: params.formacion ?? "",
              ramas: params.ramas ?? "",
            },
          });
        }, ANALYSIS_DURATION);
      }
    }, 400);
  };

  const progress = (currentIdx + 1) / cards.length;

  // Build the list of cards to render
  const visibleSlots: { card: DeckCard; idx: number; position: number }[] = [];

  if (exitingInfo && cards[exitingInfo.idx]) {
    visibleSlots.push({
      card: cards[exitingInfo.idx],
      idx: exitingInfo.idx,
      position: 0,
    });
  }

  for (let i = 0; i < 3; i++) {
    const idx = currentIdx + i;
    if (idx < cards.length && idx !== exitingInfo?.idx) {
      visibleSlots.push({ card: cards[idx], idx, position: i });
    }
  }

  if (isAnalyzing) return <AnalysisOverlay />;

  return (
    <View style={styles.root}>
      <OnboardingProgress step={3} />

      <View style={styles.header}>
        <Text style={styles.title}>
          ¿Con cuál <Text style={{ color: "#8980B8" }}>resuenas?</Text>
        </Text>
        <Text style={styles.subtitle}>
          Toca la que mejor describe cómo te sientes ahora
        </Text>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {currentIdx + 1}/{cards.length}
        </Text>
      </View>

      <View style={styles.stackWrap}>
        {visibleSlots.map(({ card, idx, position }) => (
          <AnimatedCard
            key={idx}
            card={card}
            position={position}
            isExiting={exitingInfo?.idx === idx}
            exitRight={exitingInfo?.right ?? true}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.btnNo}
          onPress={() => handleChoice(false)}
          activeOpacity={0.75}
        >
          <Text style={styles.btnNoText}>No tanto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSi}
          onPress={() => handleChoice(true)}
          activeOpacity={0.82}
        >
          <Ionicons name="heart" size={16} color="#fff" />
          <Text style={styles.btnSiText}>Resuena</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAF8F5",
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: 28,
    gap: 6,
  },
  title: {
    color: "#1C1B29",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -1,
    lineHeight: 38,
  },
  subtitle: {
    color: "#8A8A9A",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 20,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    marginTop: 20,
    gap: 10,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(137,128,184,0.15)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8980B8",
    borderRadius: 2,
  },
  progressLabel: {
    color: "#8A8A9A",
    fontSize: 12,
    fontWeight: "600",
    minWidth: 32,
    textAlign: "right",
  },
  stackWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  card: {
    position: "absolute",
    width: CARD_W,
    height: CARD_H,
    borderRadius: 24,
    shadowColor: "#1C1B29",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  cardContent: {
    flex: 1,
    padding: 28,
    gap: 16,
    justifyContent: "center",
  },
  cardAreaLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  cardText: {
    color: "#1C1B29",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 26,
    letterSpacing: -0.3,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 28,
    paddingBottom: 64,
    paddingTop: 20,
    gap: 12,
  },
  btnNo: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(137,128,184,0.25)",
  },
  btnNoText: {
    color: "#8A8A9A",
    fontSize: 15,
    fontWeight: "600",
  },
  btnSi: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#8980B8",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  btnSiText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});

const ao = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAF8F5",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    paddingHorizontal: 48,
  },
  logoWrap: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  logo: {
    width: 130,
    height: 130,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: -8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8980B8",
  },
  msg: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B4B6A",
    textAlign: "center",
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  barTrack: {
    width: "100%",
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(137,128,184,0.15)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#8980B8",
  },
});
