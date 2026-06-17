import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const MOMENTS = [
  {
    situation: "En una\ndiscusión",
    tip: "Pausa · Respira · Responde",
    color: "#C45E7A",
    bg: require("@/assets/background/1.jpg"),
    img: require("@/assets/abstracts/Group-2.png"),
  },
  {
    situation: "Bajo\npresión",
    tip: "Foco en lo que controlas",
    color: "#4A80C4",
    bg: require("@/assets/background/5.jpg"),
    img: require("@/assets/abstracts/Group-4.png"),
  },
  {
    situation: "Al\ndesperar",
    tip: "Una intención para el día",
    color: "#C49030",
    bg: require("@/assets/background/12.jpg"),
    img: require("@/assets/abstracts/Group-6.png"),
  },
  {
    situation: "Cuando\nestás solo/a",
    tip: "Conecta primero contigo",
    color: "#7B68BF",
    bg: require("@/assets/background/6.jpg"),
    img: require("@/assets/abstracts/Group-8.png"),
  },
];

export function IntroVisualMoment() {
  return (
    <View style={s.momentsGrid}>
      <View style={s.momentsCol}>
        {MOMENTS.slice(0, 2).map((m, i) => (
          <View key={i} style={s.momentCard}>
            <Image source={m.bg} style={StyleSheet.absoluteFill} contentFit="cover" />
            <Image source={m.img} style={s.momentImg} contentFit="contain" />
            <Text style={[s.momentSituation, { color: m.color }]}>{m.situation}</Text>
            <Text style={s.momentTip}>{m.tip}</Text>
          </View>
        ))}
      </View>
      <View style={[s.momentsCol, { marginTop: 28 }]}>
        {MOMENTS.slice(2, 4).map((m, i) => (
          <View key={i} style={s.momentCard}>
            <Image source={m.bg} style={StyleSheet.absoluteFill} contentFit="cover" />
            <Image source={m.img} style={s.momentImg} contentFit="contain" />
            <Text style={[s.momentSituation, { color: m.color }]}>{m.situation}</Text>
            <Text style={s.momentTip}>{m.tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  momentsGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    paddingHorizontal: 4,
  },
  momentsCol: { flex: 1, gap: 10 },
  momentCard: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
    overflow: "hidden",
  },
  momentImg: { width: 80, height: 72, marginBottom: 12 },
  momentSituation: {
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 4,
  },
  momentTip: {
    fontSize: 10,
    color: "rgba(28,27,41,0.5)",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 14,
  },
});
