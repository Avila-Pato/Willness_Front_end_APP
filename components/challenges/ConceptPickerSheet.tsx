import { SPACING } from "@/constants/constants";
import { BG, MUTED, TEXT } from "@/constants/theme";
import { CONCEPT_GROUPS } from "@/data/languageQuestions";
import { useCallback, useEffect, useState } from "react";
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

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get("window");
const SHEET_H = SCREEN_H * 0.85;
const DISMISS_THRESHOLD = SHEET_H * 0.25;
const CARD_W = SCREEN_W * 0.5;
const SIDE_MARGIN = SPACING * 2;
const PIN_SIZE = 18;

const allConcepts = CONCEPT_GROUPS.flatMap((g) => g.items);

type Props = {
  onConfirm: (concepts: string[]) => void;
  onClose: () => void;
};

export function ConceptPickerSheet({ onConfirm, onClose }: Props) {
  const translateY = useSharedValue(SHEET_H);
  const backdropOpacity = useSharedValue(0);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 20, stiffness: 160, mass: 0.85 });
    backdropOpacity.value = withTiming(1, { duration: 220 });
  }, []);

  const dismiss = useCallback(
    (callback: () => void) => {
      translateY.value = withTiming(
        SHEET_H,
        { duration: 380, easing: Easing.in(Easing.cubic) },
        () => runOnJS(callback)(),
      );
      backdropOpacity.value = withTiming(0, { duration: 360 });
    },
    [],
  );

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_THRESHOLD || e.velocityY > 1200) {
        runOnJS(dismiss)(onClose);
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

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  function handleConfirm() {
    dismiss(() => onConfirm(selected));
  }

  return (
    <Modal transparent animationType="none" onRequestClose={() => dismiss(onClose)}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable style={{ flex: 1 }} onPress={() => dismiss(onClose)} />
        </Animated.View>

        <Animated.View style={[styles.sheet, sheetStyle]}>
          <GestureDetector gesture={panGesture}>
            <View>
              {/* Handle */}
              <View style={styles.handle} />

              {/* Header */}
              <View style={styles.headerPad}>
                <Text style={styles.title}>¿Qué áreas quieres explorar?</Text>
                <Text style={styles.subtitle}>
                  Elige uno o más temas — las preguntas se adaptarán a ellos
                </Text>
              </View>
            </View>
          </GestureDetector>

            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
            >
              {/* Zigzag pinboard layout */}
              <View style={styles.zigzagOuter}>
                {/* Center connecting line */}
                <View style={styles.centerLine} pointerEvents="none" />

                {allConcepts.map((concept, index) => {
                  const isLeft = index % 2 === 0;
                  const active = selected.includes(concept.id);
                  const num = String(index + 1).padStart(2, "0");

                  return (
                    <View
                      key={concept.id}
                      style={[
                        styles.zigzagRow,
                        isLeft ? styles.rowLeft : styles.rowRight,
                      ]}
                    >
                      <Pressable
                        style={({ pressed }) => [
                          styles.zigzagCard,
                          {
                            backgroundColor: active ? concept.bg : "#fff",
                            transform: [{ rotate: isLeft ? "-1.5deg" : "1.5deg" }],
                          },
                          active && { borderColor: concept.color, borderWidth: 2 },
                          pressed && { opacity: 0.88 },
                        ]}
                        onPress={() => toggle(concept.id)}
                      >
                        {/* Number + pin row */}
                        <View
                          style={[
                            styles.cardTopRow,
                            { flexDirection: isLeft ? "row" : "row-reverse" },
                          ]}
                        >
                          <Text style={[styles.cardNum, { color: concept.color }]}>
                            {num}
                          </Text>
                          <View
                            style={[
                              styles.pinCircle,
                              {
                                backgroundColor: active
                                  ? concept.color
                                  : concept.color + "28",
                                borderColor: concept.color,
                              },
                            ]}
                          />
                        </View>

                        {/* Title */}
                        <Text
                          style={[
                            styles.cardTitle,
                            { textAlign: isLeft ? "left" : "right" },
                          ]}
                        >
                          {concept.id}
                        </Text>

                        {/* Description */}
                        <Text
                          style={[
                            styles.cardDesc,
                            { textAlign: isLeft ? "left" : "right" },
                          ]}
                          numberOfLines={2}
                        >
                          {concept.description}
                        </Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <Pressable
                style={[styles.btn, selected.length < 1 && styles.btnDisabled]}
                onPress={handleConfirm}
                disabled={selected.length < 1}
              >
                <Text
                  style={[
                    styles.btnText,
                    selected.length < 1 && styles.btnTextDisabled,
                  ]}
                >
                  {selected.length < 1
                    ? "Elige al menos un área"
                    : `Explorar ${selected.length} área${selected.length > 1 ? "s" : ""} →`}
                </Text>
              </Pressable>
            </View>
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: SHEET_H,
    backgroundColor: BG,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: SPACING,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
    alignSelf: "center",
    marginBottom: SPACING * 1.5,
  },
  headerPad: {
    paddingHorizontal: SPACING * 2,
    gap: SPACING * 0.4,
    marginBottom: SPACING * 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: MUTED,
    lineHeight: 19,
  },
  scroll: {
    paddingBottom: SPACING * 2,
  },

  /* ── Zigzag ── */
  zigzagOuter: {
    position: "relative",
    paddingVertical: SPACING * 0.5,
  },
  centerLine: {
    position: "absolute",
    left: SCREEN_W / 2,
    top: 0,
    bottom: 0,
    width: 1.5,
    backgroundColor: "#C4C4D0",
    opacity: 0.45,
  },
  zigzagRow: {
    paddingVertical: SPACING * 0.9,
  },
  rowLeft: {
    paddingLeft: SIDE_MARGIN,
    alignItems: "flex-start",
  },
  rowRight: {
    paddingRight: SIDE_MARGIN,
    alignItems: "flex-end",
  },
  zigzagCard: {
    width: CARD_W,
    borderRadius: 20,
    padding: SPACING * 1.5,
    paddingTop: SPACING * 1.2,
    gap: SPACING * 0.55,
    borderWidth: 1.5,
    borderColor: "#EBEBF0",
    backgroundColor: "#fff",
    shadowColor: "#1C1B29",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.09,
    shadowRadius: 14,
    elevation: 4,
  },
  cardTopRow: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING * 0.2,
  },
  cardNum: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    opacity: 0.85,
  },
  pinCircle: {
    width: PIN_SIZE,
    height: PIN_SIZE,
    borderRadius: PIN_SIZE / 2,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 3,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.3,
    lineHeight: 20,
  },
  cardDesc: {
    fontSize: 11.5,
    color: MUTED,
    lineHeight: 16,
  },

  /* ── Footer ── */
  footer: {
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING * 1.5,
    paddingBottom: SPACING * 3,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  btn: {
    backgroundColor: "#7C3AED",
    borderRadius: 16,
    paddingVertical: SPACING * 1.7,
    alignItems: "center",
  },
  btnDisabled: {
    backgroundColor: "#F3F4F6",
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  btnTextDisabled: {
    color: MUTED,
  },
});
