import { SPACING } from "@/constants/constants";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { View, StyleSheet } from "react-native";

export default function HeaderSkeleton() {
  return (
    <View style={s.root}>
      <SkeletonPlaceholder borderRadius={8} speed={1200}>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" gap={SPACING}>
          <SkeletonPlaceholder.Item width={80} height={40} borderRadius={10} />
          <SkeletonPlaceholder.Item width={80} height={40} borderRadius={10} />
          <SkeletonPlaceholder.Item width={80} height={40} borderRadius={10} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING,
  },
});
