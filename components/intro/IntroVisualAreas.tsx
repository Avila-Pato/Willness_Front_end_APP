import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const AREAS = [
  {
    label: "Emociones",
    tag: "Siente más",
    color: "#C45E7A",
    bg: require("@/assets/background/1.jpg"),
    img: require("@/assets/abstracts/Group-1.png"),
  },
  {
    label: "Relaciones",
    tag: "Conecta mejor",
    color: "#7B68BF",
    bg: require("@/assets/background/4.jpg"),
    img: require("@/assets/abstracts/Group-3.png"),
  },
  {
    label: "Límites",
    tag: "Protégete",
    color: "#4A80C4",
    bg: require("@/assets/background/5.jpg"),
    img: require("@/assets/abstracts/Group-5.png"),
  },
  {
    label: "Autoestima",
    tag: "Cree en ti",
    color: "#C49030",
    bg: require("@/assets/background/8.jpg"),
    img: require("@/assets/abstracts/Group-7.png"),
  },
  {
    label: "Estrés",
    tag: "Encuentra calma",
    color: "#C46030",
    bg: require("@/assets/background/9.jpg"),
    img: require("@/assets/abstracts/Group-9.png"),
  },
  {
    label: "Mindfulness",
    tag: "Vive el momento",
    color: "#3B9A5A",
    bg: require("@/assets/background/2.jpg"),
    img: require("@/assets/abstracts/Group-11.png"),
  },
];

export function IntroVisualAreas() {
  return (
    <View style={s.areasGrid}>
      <View style={s.areasCol}>
        {AREAS.slice(0, 3).map((area, i) => (
          <View key={i} style={s.areaCard}>
            <Image source={area.bg} style={StyleSheet.absoluteFill} contentFit="cover" />
            <Image source={area.img} style={s.areaAbstract} contentFit="contain" />
            <Text style={[s.areaName, { color: area.color }]}>{area.label}</Text>
            <Text style={s.areaTag}>{area.tag}</Text>
          </View>
        ))}
      </View>
      <View style={[s.areasCol, { marginTop: 28 }]}>
        {AREAS.slice(3, 6).map((area, i) => (
          <View key={i} style={s.areaCard}>
            <Image source={area.bg} style={StyleSheet.absoluteFill} contentFit="cover" />
            <Image source={area.img} style={s.areaAbstract} contentFit="contain" />
            <Text style={[s.areaName, { color: area.color }]}>{area.label}</Text>
            <Text style={s.areaTag}>{area.tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  areasGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 24,
    paddingHorizontal: 4,
  },
  areasCol: { flex: 1, gap: 10 },
  areaCard: {
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 6,
    overflow: "hidden",
  },
  areaAbstract: {
    width: 64,
    height: 60,
    alignSelf: "center",
    marginBottom: 6,
  },
  areaName: { fontSize: 13, fontWeight: "800", marginTop: 2 },
  areaTag: { fontSize: 10, color: "rgba(28,27,41,0.45)", fontWeight: "500" },
});
