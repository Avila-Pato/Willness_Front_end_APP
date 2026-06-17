import { AREA_META } from "@/constants/diagnosticData";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

const BAR_H = 20;

interface HBarProps {
  area: string;
  score: number;
  maxScore: number;
  delay: number;
  isTop: boolean;
}

function HBar({ area, score, maxScore, delay, isTop }: HBarProps) {
  const meta = AREA_META[area];
  const targetPct = maxScore > 0 && score > 0 ? score / maxScore : 0;

  const widthAnim = useRef(new Animated.Value(0)).current;
  const rowFade  = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(widthAnim, {
          toValue: targetPct,
          duration: 680,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: false,
        }),
        Animated.timing(rowFade, {
          toValue: 1,
          duration: 320,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      if (isTop && score > 0) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, { toValue: 1, duration: 1100, useNativeDriver: false }),
            Animated.timing(glowAnim, { toValue: 0, duration: 1100, useNativeDriver: false }),
          ]),
        ).start();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!meta) return null;

  const barWidthPct = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1.0],
  });

  const labelColor =
    isTop && score > 0
      ? meta.color
      : score > 0
      ? "rgba(28,27,41,0.48)"
      : "rgba(28,27,41,0.18)";

  return (
    <Animated.View style={[hb.row, { opacity: rowFade }]}>
      <Text
        style={[hb.label, { color: labelColor, fontWeight: isTop && score > 0 ? "700" : "500" }]}
        numberOfLines={1}
      >
        {meta.short}
      </Text>

      <View style={hb.track}>
        {score > 0 && (
          <Animated.View style={[hb.fill, { width: barWidthPct }]}>
            {isTop ? (
              <Animated.View style={[StyleSheet.absoluteFill, { opacity: glowOpacity }]}>
                <LinearGradient
                  colors={[meta.color + "BB", meta.color, meta.color + "DD"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            ) : (
              <View style={[StyleSheet.absoluteFill, { backgroundColor: meta.color + "88" }]} />
            )}
          </Animated.View>
        )}
      </View>

      <Text
        style={[
          hb.scoreVal,
          {
            color: score > 0 ? meta.color : "rgba(28,27,41,0.15)",
            fontWeight: isTop && score > 0 ? "800" : "500",
          },
        ]}
      >
        {score > 0 ? score : "–"}
      </Text>
    </Animated.View>
  );
}

interface Props {
  areas: [string, number][];
}

export function AreaBarChart({ areas }: Props) {
  const maxScore = Math.max(...areas.map(([, v]) => v), 1);

  return (
    <View style={s.root}>
      {areas.map(([area, score], i) => (
        <HBar
          key={area}
          area={area}
          score={score}
          maxScore={maxScore}
          delay={i * 65}
          isTop={i === 0}
        />
      ))}
    </View>
  );
}

const hb = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 32,
  },
  label: {
    width: 60,
    fontSize: 11,
    textAlign: "right",
  },
  track: {
    flex: 1,
    height: BAR_H,
    borderRadius: BAR_H / 2,
    backgroundColor: "rgba(137,128,184,0.07)",
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: BAR_H / 2,
    overflow: "hidden",
  },
  scoreVal: {
    width: 22,
    fontSize: 11,
    textAlign: "right",
  },
});

const s = StyleSheet.create({
  root: { gap: 4 },
});
