import { SPACING } from "@/constants/constants";
import { BORDER, MUTED, TEXT } from "@/constants/theme";
import { HABITS } from "@/data/habitsData";
import { useUserStore } from "@/store/useUserStore";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CARD_H = 210;
const PEEK = 14;

export function HabitosProfile() {
  const habitIds = useUserStore((s) => s.habits);
  const addHabit = useUserStore((s) => s.addHabit);
  const removeHabit = useUserStore((s) => s.removeHabit);

  const [shuffled] = useState(() => [...HABITS].sort(() => Math.random() - 0.5));
  const [currentIdx, setCurrentIdx] = useState(0);

  const next = () => setCurrentIdx((i) => (i + 1) % shuffled.length);

  const stack = [0, 1, 2].map((offset) => shuffled[(currentIdx + offset) % shuffled.length]);
  const top = stack[0];

  const handleAdd = () => {
    addHabit(top.id);
    next();
  };

  const myHabits = HABITS.filter((h) => habitIds.includes(h.id));
  const byCategory = myHabits.reduce<Record<string, typeof myHabits>>(
    (acc, h) => {
      (acc[h.category] ??= []).push(h);
      return acc;
    },
    {},
  );
  const categories = Object.keys(byCategory).sort();

  return (
    <View style={s.root}>
      {/* ── Nuevos hábitos ── */}
      <View style={s.sectionHead}>
        <Text style={s.sectionTitle}>{"Nuevos hábitos para ti"}</Text>
        <Text style={s.sectionDesc}>
          {"Presiona + para añadir un hábito a tu rutina"}
        </Text>
      </View>

      {/* Deck de cartas */}
      <View style={s.deckArea}>
        {stack[2] && (
          <View
            style={[
              s.deckBehind,
              { backgroundColor: stack[2].color, top: PEEK * 2, left: 20, right: 20 },
            ]}
          />
        )}
        {stack[1] && (
          <View
            style={[
              s.deckBehind,
              { backgroundColor: stack[1].color, top: PEEK, left: 10, right: 10, zIndex: 2 },
            ]}
          />
        )}
        <View style={[s.deckTop, { backgroundColor: top.color, zIndex: 3 }]}>
          <Image source={top.image} style={s.cardImage} contentFit="contain" />
          <View style={s.cardContent}>
            <Text style={[s.cardTitle, { color: top.accent }]}>{top.title}</Text>
            <Text style={[s.cardCategory, { color: top.accent + "AA" }]}>{top.category}</Text>
            <Text style={s.cardDesc}>{top.desc}</Text>
          </View>
          <View style={s.cardBtns}>
            <Pressable
              style={[s.btnFill, { backgroundColor: top.accent }]}
              onPress={handleAdd}
            >
              <Text style={s.btnFillTxt}>{"+"}</Text>
            </Pressable>
            <Pressable
              style={[s.btnOutline, { borderColor: top.accent + "55" }]}
              onPress={next}
            >
              <Text style={[s.btnOutlineTxt, { color: top.accent }]}>{"›"}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Text style={s.deckCounter}>
        {`${habitIds.length} de ${HABITS.length} hábitos añadidos`}
      </Text>

      {/* ── Mis hábitos añadidos ── */}
      {categories.length === 0 ? (
        <Text style={s.empty}>{"Los hábitos que añadas aparecerán aquí."}</Text>
      ) : (
        <>
          <View style={s.divider} />
          <Text style={s.myHabitsTitle}>{"Mis hábitos"}</Text>
          {categories.map((cat) => (
            <View key={cat} style={s.catSection}>
              <Text style={s.catLabel}>{cat}</Text>
              {byCategory[cat].map((h) => (
                <View
                  key={h.id}
                  style={[s.habitRow, { borderLeftColor: h.accent }]}
                >
                  <Image source={h.image} style={s.habitImg} contentFit="contain" />
                  <View style={s.habitInfo}>
                    <Text style={[s.habitTitle, { color: h.accent }]}>{h.title}</Text>
                  </View>
                  <Pressable
                    style={s.removeBtn}
                    onPress={() => removeHabit(h.id)}
                    hitSlop={8}
                  >
                    <Text style={s.removeBtnTxt}>{"×"}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ))}
        </>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: { paddingTop: SPACING * 2, paddingBottom: SPACING * 4 },

  /* Section header */
  sectionHead: {
    paddingHorizontal: SPACING * 2,
    gap: SPACING * 0.4,
    marginBottom: SPACING * 1.5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.5,
  },
  sectionDesc: {
    fontSize: 13,
    color: MUTED,
    lineHeight: 18,
  },

  /* Deck */
  deckArea: {
    marginHorizontal: SPACING * 2,
    height: CARD_H + PEEK * 2,
    position: "relative",
    marginBottom: SPACING,
  },
  deckBehind: {
    position: "absolute",
    borderRadius: 24,
    height: CARD_H,
    zIndex: 1,
  },
  deckTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: CARD_H,
    borderRadius: 24,
    padding: SPACING * 2,
    gap: SPACING * 0.8,
    overflow: "hidden",
  },

  /* Card content */
  cardImage: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 100,
    height: 100,
    opacity: 0.3,
  },
  cardContent: { gap: SPACING * 0.25, flex: 1 },
  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  cardCategory: { fontSize: 13, fontWeight: "600" },
  cardDesc: {
    fontSize: 12,
    color: "#444",
    lineHeight: 18,
    maxWidth: "75%",
  },
  cardBtns: { flexDirection: "row", gap: SPACING * 0.8 },
  btnFill: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  btnFillTxt: { fontSize: 24, fontWeight: "700", color: "#fff", lineHeight: 28 },
  btnOutline: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  btnOutlineTxt: { fontSize: 24, fontWeight: "700", lineHeight: 28 },

  /* Counter */
  deckCounter: {
    textAlign: "center",
    fontSize: 12,
    color: MUTED,
    fontWeight: "500",
    marginBottom: SPACING * 2,
  },

  /* Divider */
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginHorizontal: SPACING * 2,
    marginBottom: SPACING * 2,
  },

  /* My habits */
  myHabitsTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.5,
    paddingHorizontal: SPACING * 2,
    marginBottom: SPACING,
  },
  catSection: { marginBottom: SPACING * 2 },
  catLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginHorizontal: SPACING * 2,
    marginBottom: SPACING,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 1.2,
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING * 1.2,
    borderBottomWidth: 1,
    borderColor: BORDER,
    borderLeftWidth: 3,
  },
  habitImg: { width: 36, height: 36, flexShrink: 0 },
  habitInfo: { flex: 1, gap: 2 },
  habitTitle: { fontSize: 14, fontWeight: "700" },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnTxt: { fontSize: 18, color: MUTED, lineHeight: 22 },

  empty: {
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
    marginTop: SPACING * 2,
    paddingHorizontal: SPACING * 2,
  },
});
