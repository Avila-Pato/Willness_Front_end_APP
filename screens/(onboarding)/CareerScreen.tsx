import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { TEXT_FONT_SIZE } from "@/constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const GOALS = [
  {
    id: "crecimiento",
    icon: "leaf-outline" as const,
    label: "Conocerme mejor",
    desc: "Quiero entender mis emociones y crecer como persona",
    startNode: "crecimiento_personal",
    bg: require("@/assets/background/10.jpg"),
  },
  {
    id: "relaciones",
    icon: "people-outline" as const,
    label: "Mejorar mis relaciones",
    desc: "Quiero trabajar mis vínculos, límites y comunicación",
    startNode: "relaciones_vinculos",
    bg: require("@/assets/background/4.jpg"),
  },
  {
    id: "equilibrio",
    icon: "sunny-outline" as const,
    label: "Encontrar equilibrio",
    desc: "Quiero reducir el estrés y cuidar mi bienestar diario",
    startNode: "equilibrio_bienestar",
    bg: require("@/assets/background/2.jpg"),
  },
  {
    id: "autoestima",
    icon: "star-outline" as const,
    label: "Fortalecer mi autoestima",
    desc: "Quiero sentirme más seguro y valorarme como soy",
    startNode: "crecimiento_personal",
    bg: require("@/assets/background/8.jpg"),
  },
  {
    id: "sanacion",
    icon: "heart-outline" as const,
    label: "Sanar y soltar",
    desc: "Quiero superar heridas del pasado y seguir adelante",
    startNode: "equilibrio_bienestar",
    bg: require("@/assets/background/12.jpg"),
  },
];

function GoalCard({
  goal,
  selected,
  onPress,
  index,
}: {
  goal: (typeof GOALS)[number];
  selected: boolean;
  onPress: () => void;
  index: number;
}) {
  const progress = useSharedValue(selected ? 1 : 0);
  const entryOpacity = useSharedValue(0);
  const entryY = useSharedValue(60);

  useEffect(() => {
    const delay = 200 + index * 120;
    entryOpacity.value = withDelay(delay, withTiming(1, { duration: 350 }));
    entryY.value = withDelay(delay, withSpring(0, { damping: 16, stiffness: 100 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, { duration: 260 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const entryStyle = useAnimatedStyle(() => ({
    opacity: entryOpacity.value,
    transform: [{ translateY: entryY.value }],
  }));

  const bgOpacityStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return (
    <Animated.View style={entryStyle}>
      <TouchableOpacity
        style={[styles.card, selected && styles.cardSelected]}
        onPress={onPress}
        activeOpacity={0.78}
      >
        <Animated.View style={[StyleSheet.absoluteFill, bgOpacityStyle]}>
          <Image source={goal.bg} style={StyleSheet.absoluteFill} resizeMode="cover" />
        </Animated.View>
        <View style={[styles.cardIcon, selected && styles.cardIconSelected]}>
          <Ionicons name={goal.icon} size={22} color="#8980B8" />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardLabel}>{goal.label}</Text>
          <Text style={styles.cardDesc}>{goal.desc}</Text>
        </View>
        <Ionicons
          name={selected ? "checkmark-circle" : "ellipse-outline"}
          size={20}
          color={selected ? "#8980B8" : "rgba(137,128,184,0.3)"}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function GoalScreen() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(30);
  const btnOpacity = useSharedValue(0);
  const btnY = useSharedValue(24);

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 400 });
    titleY.value = withSpring(0, { damping: 18, stiffness: 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedGoals.length > 0) {
      btnOpacity.value = withTiming(1, { duration: 280 });
      btnY.value = withSpring(0, { damping: 16, stiffness: 130 });
    } else {
      btnOpacity.value = withTiming(0, { duration: 200 });
      btnY.value = withTiming(24, { duration: 200 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGoals.length]);

  const handleCardPress = (id: string, node: string) => {
    void node;
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const handleNext = () => {
    if (selectedGoals.length === 0) return;
    const firstNode =
      GOALS.find((g) => g.id === selectedGoals[0])?.startNode ??
      "crecimiento_personal";
    router.push({
      pathname: "/career-ramas",
      params: { startNode: firstNode, formacion: selectedGoals.join(",") },
    });
  };

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));
  const btnStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
    transform: [{ translateY: btnY.value }],
  }));

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <OnboardingProgress step={1} />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={[styles.header, titleStyle]}>
          <Text style={styles.title}>
            <Text style={{ color: "black" }}>Comenzemos</Text>
            {"\n"}
            <Text style={{ color: "#8980B8" }}>¿Qué te trae aquí?</Text>
          </Text>
          <Text style={styles.subtitle}>
            {selectedGoals.length === 0
              ? "Puedes seleccionar más de una"
              : selectedGoals.length === 1
                ? "1 seleccionada"
                : `${selectedGoals.length} seleccionadas`}
          </Text>
        </Animated.View>

        <View style={styles.cards}>
          {GOALS.map((goal, i) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              selected={selectedGoals.includes(goal.id)}
              onPress={() => handleCardPress(goal.id, goal.startNode)}
              index={i}
            />
          ))}
        </View>

        <Animated.View style={[styles.btnWrapper, btnStyle]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleNext}
            activeOpacity={0.82}
          >
            <View style={styles.btnInner}>
              {selectedGoals.length > 0 && (
                <View style={styles.btnBadge}>
                  <Text style={styles.btnBadgeText}>
                    {selectedGoals.length}
                  </Text>
                </View>
              )}
              <Text style={styles.btnText}>Siguiente →</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#FAF8F5" },
  scroll: {
    paddingHorizontal: 28,
    paddingVertical: 40,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: { marginBottom: 24 },
  title: {
    color: "#1C1B29",
    fontSize: TEXT_FONT_SIZE,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#8A8A9A",
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
    textAlign: "center",
  },
  cards: { gap: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F2FB",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(137,128,184,0.2)",
    gap: 12,
    overflow: "hidden",
  },
  cardSelected: {
    borderColor: "#8980B8",
    backgroundColor: "rgba(137,128,184,0.06)",
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(137,128,184,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardIconSelected: { backgroundColor: "rgba(137,128,184,0.18)" },
  cardText: { flex: 1 },
  cardLabel: {
    color: "#1C1B29",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  cardDesc: {
    color: "#8A8A9A",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  btnWrapper: { marginTop: 16 },
  btn: {
    backgroundColor: "#8980B8",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btnBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 20,
    minWidth: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  btnBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
