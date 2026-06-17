import { Image } from "expo-image";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SPACING } from "@/constants/constants";
import { MUTED, TEXT } from "@/constants/theme";
import { TEST_CATEGORIES } from "@/data/selfTestsData";
import { getCompletedTests } from "@/store/selfTestResults";

// Maps test ID → achievement image extracted from the sprite sheet.
// "Layer 1 copy N.png" matches character/N.png from selfTestsData.
const ACHIEVEMENT_IMG: Record<string, number> = {
  tk_apego:           require("@/assets/achievements/Layer 1 copy 5.png"),
  tk_asertividad:     require("@/assets/achievements/Layer 1 copy 9.png"),
  tk_valores:         require("@/assets/achievements/Layer 1 copy 11.png"),
  tk_dialogo:         require("@/assets/achievements/Layer 1 copy 15.png"),
  tk_conflicto:       require("@/assets/achievements/Layer 1 copy 4.png"),
  tk_codependencia:   require("@/assets/achievements/Layer 1 copy 8.png"),
  tk_vinculos:        require("@/assets/achievements/Layer 1 copy 14.png"),
  tk_limites_rel:     require("@/assets/achievements/Layer 1 copy 16.png"),
  tk_estres:          require("@/assets/achievements/Layer 1 copy 6.png"),
  tk_burnout:         require("@/assets/achievements/Layer 1 copy 13.png"),
  tk_autocompasion:   require("@/assets/achievements/Layer 1 copy 17.png"),
  tk_resiliencia:     require("@/assets/achievements/Layer 1 copy 20.png"),
  tk_descanso:        require("@/assets/achievements/Layer 1 copy 21.png"),
  tk_energia:         require("@/assets/achievements/Layer 1 copy 22.png"),
  tk_mindfulness_hab: require("@/assets/achievements/Layer 1 copy 24.png"),
  tk_proposito:       require("@/assets/achievements/Layer 1 copy 25.png"),
};

export function LogrosTab() {
  const [completed, setCompleted] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCompletedTests().then(setCompleted);
    }, []),
  );

  const total = TEST_CATEGORIES.reduce((acc, c) => acc + c.tests.length, 0);

  return (
    <View style={s.container}>
      {/* Summary */}
      <View style={s.summary}>
        <Text style={s.summaryCount}>
          <Text style={s.summaryNum}>{completed.length}</Text>
          <Text style={s.summaryDen}>/{total}</Text>
        </Text>
        <Text style={s.summaryLabel}>evaluaciones completadas</Text>
      </View>

      {TEST_CATEGORIES.map((cat) => {
        const catUnlocked = cat.tests.filter((t) => completed.includes(t.id)).length;
        return (
          <View key={cat.label} style={s.category}>
            {/* Category header */}
            <View style={s.catHeader}>
              <Text style={s.catEmoji}>{cat.emoji}</Text>
              <Text style={s.catLabel}>{cat.label}</Text>
              <View style={s.catPill}>
                <Text style={s.catPillText}>{catUnlocked}/{cat.tests.length}</Text>
              </View>
            </View>

            {/* Badges */}
            <View style={s.badgesRow}>
              {cat.tests.map((test) => {
                const unlocked = completed.includes(test.id);
                const src = ACHIEVEMENT_IMG[test.id];
                return (
                  <View key={test.id} style={s.badgeWrap}>
                    <View
                      style={[
                        s.badge,
                        { backgroundColor: unlocked ? test.color : undefined },
                      ]}
                    >
                      <Image
                        source={src}
                        style={s.badgeImg}
                        contentFit="contain"
                        contentPosition="bottom center"
                        tintColor={unlocked ? undefined : "#1C1B29"}
                      />
                    </View>
                    <Text
                      style={[s.badgeTitle, !unlocked && s.badgeTitleLocked]}
                      numberOfLines={2}
                    >
                      {test.title}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingTop: SPACING * 2,
    paddingBottom: SPACING * 3,
    gap: SPACING * 2.5,
  },

  /* Summary */
  summary: {
    alignItems: "center",
    paddingVertical: SPACING * 1.5,
    marginHorizontal: SPACING * 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#1C1B29",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    gap: 4,
  },
  summaryCount: { lineHeight: 50 },
  summaryNum: {
    fontSize: 42,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -1,
  },
  summaryDen: {
    fontSize: 22,
    fontWeight: "700",
    color: MUTED,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: MUTED,
  },

  /* Category */
  category: {
    gap: SPACING * 1.2,
    paddingHorizontal: SPACING * 2,
  },
  catHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 0.6,
  },
  catEmoji: { fontSize: 13, color: MUTED },
  catLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  catPill: {
    backgroundColor: "#F0EEF8",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  catPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8980B8",
  },

  /* Badges */
  badgesRow: {
    flexDirection: "row",
    gap: 10,
  },
  badgeWrap: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  badge: {
    width: "100%",
    aspectRatio: 0.72,
    borderRadius: 16,
    overflow: "hidden",
  },
  badgeImg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "110%",
  },
  badgeTitle: {
    fontSize: 10,
    fontWeight: "600",
    color: TEXT,
    textAlign: "center",
    lineHeight: 13,
  },
  badgeTitleLocked: {
    color: MUTED,
  },
});
