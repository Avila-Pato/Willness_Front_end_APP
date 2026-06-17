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

  return (
    <View style={s.container}>
      {/* Info hint */}
      <Text style={s.hint}>
        Completa las evaluaciones del Explora para desbloquear tus logros
      </Text>

      {TEST_CATEGORIES.map((cat) => (
          <View key={cat.label} style={s.category}>
            {/* Category header */}
            <View style={s.catHeader}>
              <Text style={s.catEmoji}>{cat.emoji}</Text>
              <Text style={s.catLabel}>{cat.label}</Text>
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
        )
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingTop: SPACING * 2,
    paddingBottom: SPACING * 3,
    gap: SPACING * 2.5,
  },

  /* Info hint */
  hint: {
    fontSize: 13,
    color: MUTED,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: SPACING * 3,
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
