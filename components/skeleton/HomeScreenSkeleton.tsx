import { SPACING } from "@/constants/constants";
import { ACCENT, BG } from "@/constants/theme";
import { View, StyleSheet } from "react-native";
import SkeletonBox from "./SkeletonBox";

export default function HomeScreenSkeleton() {
  return (
    <View style={s.root}>
      {/* ── Hero (purple) ── */}
      <View style={s.hero}>
        {/* top bar */}
        <View style={s.row}>
          <SkeletonBox width={100} height={14} borderRadius={6} style={s.heroSkel} />
          <SkeletonBox width={40} height={40} borderRadius={20} style={s.heroSkel} />
        </View>

        {/* greeting */}
        <SkeletonBox width={200} height={28} borderRadius={8} style={[s.mt16, s.heroSkel]} />
        {/* question */}
        <SkeletonBox width="90%" height={18} borderRadius={6} style={[s.mt10, s.heroSkel]} />
        <SkeletonBox width="70%" height={18} borderRadius={6} style={[s.mt6, s.heroSkel]} />

        {/* mic bar */}
        <SkeletonBox width="100%" height={52} borderRadius={16} style={[s.mt20, s.heroSkel]} />

        {/* mood label */}
        <SkeletonBox width={120} height={13} borderRadius={6} style={[s.mt20, s.heroSkel]} />
        {/* mood row */}
        <View style={[s.row, s.mt10]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonBox key={i} width={54} height={70} borderRadius={14} style={s.heroSkel} />
          ))}
        </View>
      </View>

      {/* ── Body (white rounded) ── */}
      <View style={s.body}>
        {/* Explora hoy title */}
        <SkeletonBox width={120} height={16} borderRadius={6} />

        {/* Category cards row */}
        <View style={[s.row, s.mt12]}>
          {[0, 1, 2].map((i) => (
            <SkeletonBox key={i} width={100} height={120} borderRadius={20} />
          ))}
        </View>

        {/* Quote card */}
        <SkeletonBox width="100%" height={130} borderRadius={20} style={s.mt20} />

        {/* Desafío title */}
        <SkeletonBox width={140} height={16} borderRadius={6} style={s.mt20} />
        {/* Challenge card */}
        <SkeletonBox width="100%" height={80} borderRadius={18} style={s.mt12} />

        {/* Tu espacio title */}
        <SkeletonBox width={100} height={16} borderRadius={6} style={s.mt20} />
        {/* Quick grid */}
        <View style={[s.row, s.mt12]}>
          <SkeletonBox height={130} borderRadius={18} style={s.flex1} />
          <SkeletonBox height={130} borderRadius={18} style={s.flex1} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: ACCENT },
  hero: {
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING * 1.5,
    paddingBottom: SPACING * 7,
  },
  body: {
    backgroundColor: BG,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    marginTop: -48,
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING * 2.5,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING,
  },
  heroSkel: { opacity: 0.45 },
  flex1: { flex: 1 },
  mt6:  { marginTop: 6 },
  mt10: { marginTop: 10 },
  mt12: { marginTop: 12 },
  mt16: { marginTop: 16 },
  mt20: { marginTop: 20 },
});
