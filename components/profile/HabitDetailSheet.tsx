import { SPACING } from "@/constants/constants";
import { MUTED, TEXT } from "@/constants/theme";
import { HABIT_STEPS } from "@/data/habitSteps";
import { Habit } from "@/data/habitsData";
import { Image } from "expo-image";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  habit: Habit | null;
  added: boolean;
  onClose: () => void;
  onAdd: () => void;
  onRemove: () => void;
}

export function HabitDetailSheet({ habit, added, onClose, onAdd, onRemove }: Props) {
  const { bottom } = useSafeAreaInsets();
  const steps = habit ? (HABIT_STEPS[habit.id] ?? []) : [];

  return (
    <Modal
      visible={!!habit}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={s.backdrop} onPress={onClose} />

      <View style={[s.sheet, { paddingBottom: bottom + SPACING * 2 }]}>
        {/* Pill */}
        <View style={s.pill} />

        {/* Header coloreado */}
        {habit && (
          <View style={[s.hero, { backgroundColor: habit.color }]}>
            <Image source={habit.image} style={s.heroImg} contentFit="contain" />
            <View style={s.heroContent}>
              <View style={[s.catChip, { backgroundColor: habit.accent + "22" }]}>
                <Text style={[s.catChipTxt, { color: habit.accent }]}>{habit.category}</Text>
              </View>
              <Text style={[s.heroTitle, { color: habit.accent }]}>{habit.title}</Text>
            </View>
          </View>
        )}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={s.scroll}
        >
          {/* Descripción */}
          {habit && (
            <>
              <Text style={s.desc}>{habit.desc}</Text>

              {steps.length > 0 && (
                <>
                  <Text style={s.stepsTitle}>{"Cómo hacerlo"}</Text>
                  {steps.map((step, i) => (
                    <View key={i} style={s.stepRow}>
                      <View style={[s.stepNum, { backgroundColor: habit.accent }]}>
                        <Text style={s.stepNumTxt}>{i + 1}</Text>
                      </View>
                      <Text style={s.stepTxt}>{step}</Text>
                    </View>
                  ))}
                </>
              )}
            </>
          )}
        </ScrollView>

        {/* Botón */}
        {habit && (
          <TouchableOpacity
            style={[s.addBtn, { backgroundColor: added ? habit.accent + "22" : habit.accent }]}
            onPress={added ? onRemove : onAdd}
            activeOpacity={0.82}
          >
            <Text style={[s.addBtnTxt, added && { color: habit.accent }]}>
              {added ? "✓ Añadido" : "Añadir hábito"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#FAFAF9",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "82%",
    overflow: "hidden",
  },
  pill: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
    alignSelf: "center",
    marginTop: SPACING * 1.2,
    marginBottom: SPACING,
  },

  /* Hero */
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 1.5,
    marginHorizontal: SPACING * 2,
    borderRadius: 20,
    padding: SPACING * 1.8,
    marginBottom: SPACING * 2,
    overflow: "hidden",
  },
  heroImg: {
    width: 60,
    height: 60,
    flexShrink: 0,
  },
  heroContent: { flex: 1, gap: SPACING * 0.5 },
  catChip: {
    alignSelf: "flex-start",
    paddingHorizontal: SPACING,
    paddingVertical: 3,
    borderRadius: 8,
  },
  catChipTxt: { fontSize: 11, fontWeight: "700", letterSpacing: 0.4 },
  heroTitle: { fontSize: 20, fontWeight: "900", letterSpacing: -0.5, lineHeight: 24 },

  /* Scroll */
  scroll: {
    paddingHorizontal: SPACING * 2,
    paddingBottom: SPACING * 2,
    gap: SPACING * 0.8,
  },
  desc: {
    fontSize: 14,
    color: MUTED,
    lineHeight: 22,
    marginBottom: SPACING,
  },

  /* Steps */
  stepsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.3,
    marginBottom: SPACING * 0.5,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING * 1.2,
    paddingVertical: SPACING * 0.8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EFED",
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumTxt: { fontSize: 12, fontWeight: "800", color: "#fff" },
  stepTxt: { flex: 1, fontSize: 13, color: TEXT, lineHeight: 20 },

  /* Button */
  addBtn: {
    marginHorizontal: SPACING * 2,
    marginTop: SPACING,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  addBtnTxt: { fontSize: 16, fontWeight: "800", color: "#fff", letterSpacing: 0.1 },
});
