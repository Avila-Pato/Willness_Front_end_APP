import { SPACING } from "@/constants/constants";
import { BG } from "@/constants/theme";
import { View, StyleSheet } from "react-native";
import SkeletonBox from "./SkeletonBox";

export default function ResultSkeleton() {
  return (
    <View style={s.root}>
      {/* Header */}
      <View style={s.section}>
        <SkeletonBox width={120} height={14} borderRadius={6} />
        <SkeletonBox width="80%" height={30} borderRadius={8} style={s.mt8} />
      </View>

      {/* Primary card */}
      <SkeletonBox width="100%" height={160} borderRadius={24} />

      {/* Breakdown card */}
      <View style={s.card}>
        <SkeletonBox width={160} height={16} borderRadius={6} />
        <SkeletonBox width={200} height={12} borderRadius={6} style={s.mt8} />
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={[s.barRow, s.mt12]}>
            <SkeletonBox width={70} height={12} borderRadius={6} />
            <SkeletonBox height={10} borderRadius={99} style={s.barFlex} />
            <SkeletonBox width={28} height={12} borderRadius={6} />
          </View>
        ))}
      </View>

      {/* Tip card */}
      <SkeletonBox width="100%" height={90} borderRadius={16} />

      {/* Achievement card */}
      <SkeletonBox width="100%" height={220} borderRadius={24} />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING * 4,
    gap: SPACING * 2,
  },
  section: { gap: 8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: SPACING * 2,
    gap: 0,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING,
  },
  barFlex: { flex: 1 },
  mt8: { marginTop: 8 },
  mt12: { marginTop: 12 },
});
