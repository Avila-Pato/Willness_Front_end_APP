import { HabitCreateSheet } from "@/components/profile/HabitCreateSheet";
import { HabitDetailSheet } from "@/components/profile/HabitDetailSheet";
import { SPACING } from "@/constants/constants";
import { MUTED, TEXT } from "@/constants/theme";
import { HABITS, Habit } from "@/data/habitsData";
import { HABIT_ICONS } from "@/data/habitIcons";
import { useUserStore } from "@/store/useUserStore";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CARD_H = 210;
const PEEK = 14;

// Group all predefined habits by category
const ALL_BY_CAT = HABITS.reduce<Record<string, typeof HABITS>>((acc, h) => {
  (acc[h.category] ??= []).push(h);
  return acc;
}, {});
const ALL_CATS = Object.keys(ALL_BY_CAT).sort();

export function HabitosProfile() {
  const habitIds = useUserStore((s) => s.habits);
  const addHabit = useUserStore((s) => s.addHabit);
  const removeHabit = useUserStore((s) => s.removeHabit);
  const customHabits = useUserStore((s) => s.customHabits);
  const addCustomHabit = useUserStore((s) => s.addCustomHabit);
  const removeCustomHabit = useUserStore((s) => s.removeCustomHabit);

  const [shuffled] = useState(() => [...HABITS].sort(() => Math.random() - 0.5));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [detailHabit, setDetailHabit] = useState<Habit | null>(null);

  const stack = [0, 1, 2].map((offset) => shuffled[(currentIdx + offset) % shuffled.length]);
  const top = stack[0];

  const myHabits = HABITS.filter((h) => habitIds.includes(h.id));
  const byCategory = myHabits.reduce<Record<string, typeof myHabits>>((acc, h) => {
    (acc[h.category] ??= []).push(h);
    return acc;
  }, {});
  const myCategories = Object.keys(byCategory).sort();
  const totalHabits = habitIds.length + customHabits.length;

  return (
    <View style={s.root}>
      {/* ── Deck ── */}
      <View style={s.sectionHead}>
        <Text style={s.sectionTitle}>{"Descubre los hábitos más comunes"}</Text>
      </View>

      <View style={s.deckArea}>
        {stack[2] && (
          <View style={[s.deckBehind, { backgroundColor: stack[2].color, top: PEEK * 2, left: 20, right: 20 }]} />
        )}
        {stack[1] && (
          <View style={[s.deckBehind, { backgroundColor: stack[1].color, top: PEEK, left: 10, right: 10, zIndex: 2 }]} />
        )}
        <View style={[s.deckTop, { backgroundColor: top.color, zIndex: 3 }]}>
          <Image source={top.image} style={s.cardImage} contentFit="contain" />
          <View style={s.cardContent}>
            <Text style={[s.cardTitle, { color: top.accent }]}>{top.title}</Text>
            <Text style={[s.cardCategory, { color: top.accent + "AA" }]}>{top.category}</Text>
            <Text style={s.cardDesc}>{top.desc}</Text>
          </View>
          <TouchableOpacity
            style={[s.shuffleBtn, { backgroundColor: top.accent + "22" }]}
            onPress={() => setCurrentIdx((i) => (i + 1) % shuffled.length)}
            activeOpacity={0.7}
          >
            <Text style={[s.shuffleBtnTxt, { color: top.accent }]}>{"↻"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={s.deckCounter}>{`${totalHabits} de ${HABITS.length} hábitos añadidos`}</Text>

      {/* ── Botón crea uno propio ── */}
      <TouchableOpacity style={s.createBtn} onPress={() => setShowCreate(true)} activeOpacity={0.8}>
        <Text style={s.createBtnIcon}>✦</Text>
        <Text style={s.createBtnTxt}>{"Crea uno propio"}</Text>
      </TouchableOpacity>

      {/* ── Categorías predefinidas ── */}
      <Text style={s.predSectionLabel}>{"O elige de los predefinidos"}</Text>

      {ALL_CATS.map((cat) => {
        const habits = ALL_BY_CAT[cat];
        const rep = habits[0];
        const isOpen = expandedCat === cat;
        return (
          <View key={cat} style={s.catBlock}>
            <TouchableOpacity
              style={s.catCard}
              onPress={() => setExpandedCat(isOpen ? null : cat)}
              activeOpacity={0.82}
            >
              <View style={[s.catCardIcon, { backgroundColor: rep.color }]}>
                <Image source={rep.image} style={s.catCardImg} contentFit="contain" />
              </View>
              <View style={s.catCardInfo}>
                <Text style={[s.catCardName, { color: rep.accent }]}>{cat}</Text>
                <Text style={s.catCardCount}>{habits.length} hábitos</Text>
              </View>
              <Text style={[s.catCardArrow, { color: rep.accent }]}>{isOpen ? "∨" : "›"}</Text>
            </TouchableOpacity>

            {isOpen && (
              <View style={s.habitsList}>
                {habits.map((h) => {
                  const added = habitIds.includes(h.id);
                  return (
                    <View key={h.id} style={[s.predefRow, { borderLeftColor: h.accent }]}>
                      <Pressable style={s.predefInfo} onPress={() => setDetailHabit(h)}>
                        <Text style={[s.predefTitle, { color: h.accent }]}>{h.title}</Text>
                        <Text style={s.predefDesc} numberOfLines={1}>{h.desc}</Text>
                      </Pressable>
                      <TouchableOpacity
                        style={[s.addBtn, added && { backgroundColor: h.accent + "22" }]}
                        onPress={() => { if (!added) addHabit(h.id); }}
                        hitSlop={8}
                        activeOpacity={0.7}
                      >
                        <Text style={[s.addBtnTxt, { color: added ? h.accent : "#9CA3AF" }]}>
                          {added ? "✓" : "+"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}

      {/* ── Mis hábitos ── */}
      {(myCategories.length > 0 || customHabits.length > 0) && (
        <>
          <View style={s.divider} />
          <Text style={s.myHabitsTitle}>{"Mis hábitos"}</Text>

          {myCategories.map((cat) => (
            <View key={cat} style={s.catSection}>
              <Text style={s.catLabel}>{cat}</Text>
              {byCategory[cat].map((h) => (
                <View key={h.id} style={[s.habitRow, { borderLeftColor: h.accent }]}>
                  <Image source={h.image} style={s.habitImg} contentFit="contain" />
                  <View style={s.habitInfo}>
                    <Text style={[s.habitTitle, { color: h.accent }]}>{h.title}</Text>
                  </View>
                  <Pressable style={s.removeBtn} onPress={() => removeHabit(h.id)} hitSlop={8}>
                    <Text style={s.removeBtnTxt}>{"×"}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ))}

          {customHabits.length > 0 && (
            <View style={s.catSection}>
              <Text style={s.catLabel}>{"Personalizados"}</Text>
              {customHabits.map((h) => (
                <View key={h.id} style={[s.habitRow, { borderLeftColor: h.accent }]}>
                  <View style={[s.customIconBox, { backgroundColor: h.color }]}>
                    <Image source={HABIT_ICONS[h.iconIndex]} style={s.customIconImg} contentFit="contain" />
                  </View>
                  <View style={s.habitInfo}>
                    <Text style={[s.habitTitle, { color: h.accent }]}>{h.title}</Text>
                  </View>
                  <Pressable style={s.removeBtn} onPress={() => removeCustomHabit(h.id)} hitSlop={8}>
                    <Text style={s.removeBtnTxt}>{"×"}</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          )}
        </>
      )}

      {myCategories.length === 0 && customHabits.length === 0 && (
        <Text style={s.empty}>{"Los hábitos que añadas aparecerán aquí."}</Text>
      )}

      <HabitCreateSheet
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        onAddCustom={(habit) => { addCustomHabit(habit); setShowCreate(false); }}
      />

      <HabitDetailSheet
        habit={detailHabit}
        added={detailHabit ? habitIds.includes(detailHabit.id) : false}
        onClose={() => setDetailHabit(null)}
        onAdd={() => { if (detailHabit) { addHabit(detailHabit.id); setDetailHabit(null); } }}
        onRemove={() => { if (detailHabit) { removeHabit(detailHabit.id); setDetailHabit(null); } }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: { paddingTop: SPACING * 2, paddingBottom: SPACING * 6 },

  sectionHead: {
    paddingHorizontal: SPACING * 2,
    marginBottom: SPACING * 1.5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.5,
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
    top: 0, left: 0, right: 0,
    height: CARD_H,
    borderRadius: 24,
    padding: SPACING * 2,
    gap: SPACING * 0.8,
    overflow: "hidden",
  },
  cardImage: {
    position: "absolute",
    top: -8, right: -8,
    width: 100, height: 100,
    opacity: 0.3,
  },
  shuffleBtn: {
    position: "absolute",
    bottom: SPACING * 1.2,
    right: SPACING * 1.2,
    width: 36, height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  shuffleBtnTxt: { fontSize: 20, fontWeight: "700", lineHeight: 24 },
  cardContent: { gap: SPACING * 0.25, flex: 1 },
  cardTitle: { fontSize: 22, fontWeight: "900", letterSpacing: -0.5, lineHeight: 26 },
  cardCategory: { fontSize: 13, fontWeight: "600" },
  cardDesc: { fontSize: 12, color: "#444", lineHeight: 18, maxWidth: "75%" },

  deckCounter: {
    textAlign: "center",
    fontSize: 12,
    color: MUTED,
    fontWeight: "500",
    marginBottom: SPACING * 2,
  },

  /* Create button */
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING * 0.6,
    marginHorizontal: SPACING * 2,
    marginBottom: SPACING * 2.5,
    paddingVertical: SPACING * 1.4,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#4D8B7A55",
    backgroundColor: "#E8F4EE",
  },
  createBtnIcon: { fontSize: 13, color: "#4D8B7A" },
  createBtnTxt: { fontSize: 14, fontWeight: "700", color: "#4D8B7A", letterSpacing: 0.1 },

  /* Predefined section */
  predSectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginHorizontal: SPACING * 2,
    marginBottom: SPACING * 1.2,
  },

  catBlock: { marginBottom: SPACING * 0.8 },

  catCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 1.2,
    marginHorizontal: SPACING * 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: SPACING * 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  catCardIcon: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  catCardImg: { width: 28, height: 28 },
  catCardInfo: { flex: 1, gap: 2 },
  catCardName: { fontSize: 15, fontWeight: "800", letterSpacing: -0.3 },
  catCardCount: { fontSize: 12, color: MUTED },
  catCardArrow: { fontSize: 22, fontWeight: "700", lineHeight: 26 },

  /* Expanded habits list */
  habitsList: {
    marginHorizontal: SPACING * 2,
    marginTop: 2,
    backgroundColor: "#FAFAF9",
    borderRadius: 12,
    overflow: "hidden",
    borderLeftWidth: 2,
    borderLeftColor: "#E5E7EB",
  },
  predefRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING,
    paddingHorizontal: SPACING * 1.5,
    paddingVertical: SPACING * 1.1,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EFED",
    borderLeftWidth: 3,
    borderLeftColor: "transparent",
  },
  predefInfo: { flex: 1, gap: 2 },
  predefTitle: { fontSize: 13, fontWeight: "700" },
  predefDesc: { fontSize: 11, color: MUTED, lineHeight: 15 },
  addBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: "#F3F4F6",
    alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  addBtnTxt: { fontSize: 18, fontWeight: "700", lineHeight: 22 },

  /* Divider */
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: SPACING * 2,
    marginVertical: SPACING * 2.5,
  },

  /* My habits */
  myHabitsTitle: {
    fontSize: 20, fontWeight: "900", color: TEXT,
    letterSpacing: -0.5,
    paddingHorizontal: SPACING * 2, marginBottom: SPACING,
  },
  catSection: { marginBottom: SPACING * 2 },
  catLabel: {
    fontSize: 11, fontWeight: "700", color: MUTED,
    textTransform: "uppercase", letterSpacing: 0.8,
    marginHorizontal: SPACING * 2, marginBottom: SPACING,
  },
  habitRow: {
    flexDirection: "row", alignItems: "center",
    gap: SPACING * 1.2,
    paddingHorizontal: SPACING * 2, paddingVertical: SPACING * 1.2,
    borderBottomWidth: 1, borderBottomColor: "#F0EFED",
    borderLeftWidth: 3,
  },
  habitImg: { width: 36, height: 36, flexShrink: 0 },
  habitInfo: { flex: 1, gap: 2 },
  habitTitle: { fontSize: 14, fontWeight: "700" },
  removeBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center", justifyContent: "center",
  },
  removeBtnTxt: { fontSize: 18, color: MUTED, lineHeight: 22 },

  /* Custom habits */
  customIconBox: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  customIconImg: { width: 22, height: 22 },

  empty: {
    fontSize: 13, color: MUTED, textAlign: "center",
    marginTop: SPACING * 2, paddingHorizontal: SPACING * 2,
  },
});
