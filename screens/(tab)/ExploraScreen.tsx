import { SPACING, TAB_ITEM_SIZE } from "@/constants/constants";
import { BG, MUTED, TEXT } from "@/constants/theme";
import { SelfTest, TEST_CATEGORIES } from "@/data/selfTestsData";
import { ABSTRACT_IMAGES, TIPS } from "@/data/tipsData";
import { Image } from "expo-image";
import { router } from "expo-router";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const BAR_HEIGHT = TAB_ITEM_SIZE + SPACING * 1.5;
const SCREEN_W = Dimensions.get("window").width;
const TEST_CARD_W = SCREEN_W * 0.46;

const getDailyTip = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000);
  return TIPS[dayOfYear % TIPS.length];
};

const dailyTip = getDailyTip();
const dailyTipImage =
  ABSTRACT_IMAGES[(parseInt(dailyTip.id) - 1) % ABSTRACT_IMAGES.length];

export default function ExploraScreen() {
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={s.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.scroll,
          { paddingBottom: BAR_HEIGHT + bottom + SPACING * 2 },
        ]}
      >
        {/* ── Page title ── */}
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>{"Explora\ntu bienestar"}</Text>
        </View>

        {/* ── Featured tip card ── */}
        <View style={s.tipCard}>
          <View style={s.tipLeft}>
            <Text style={s.tipLabel}>{dailyTip.label}</Text>
            <Text style={s.tipTitle}>{dailyTip.title}</Text>
            <Text style={s.tipDesc}>{dailyTip.desc}</Text>
          </View>
          <Image
            source={dailyTipImage}
            style={s.tipImage}
            contentFit="contain"
          />
        </View>

        {/* ── Tests de autoconocimiento ── */}
        <View style={s.testsHeader}>
          <Text style={s.testsTitle}>{"Evaluaciones"}</Text>
          <Text style={s.testsSub}>
            {"Conócete mejor con estas autoevaluaciones de bienestar"}
          </Text>
        </View>

        {TEST_CATEGORIES.map((cat) => (
          <View key={cat.label} style={s.catBlock}>
            <View style={s.catLabelRow}>
              <Text style={s.catEmoji}>{cat.emoji}</Text>
              <Text style={s.catLabel}>{cat.label}</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.catScroll}
            >
              {cat.tests.map((test: SelfTest) => (
                <Pressable
                  key={test.id}
                  style={({ pressed }) => [
                    s.testCard,
                    pressed && { opacity: 0.88 },
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: "/self-test-detail",
                      params: { testId: test.id },
                    })
                  }
                >
                  <View
                    style={[s.testCardImg, { backgroundColor: test.color }]}
                  >
                    <Image
                      source={test.character}
                      style={s.testCharacter}
                      contentFit="contain"
                      contentPosition="bottom center"
                    />
                  </View>

                  <View style={s.testCardBody}>
                    <Text style={s.testCardTitle} numberOfLines={2}>
                      {test.title}
                    </Text>
                    <Text style={s.testCardDesc} numberOfLines={2}>
                      {test.desc}
                    </Text>
                    <View style={s.testCardMeta}>
                      <View
                        style={[
                          s.metaBadge,
                          { backgroundColor: test.accent + "18" },
                        ]}
                      >
                        <Text style={[s.metaBadgeText, { color: test.accent }]}>
                          {`${test.minutes} min`}
                        </Text>
                      </View>
                      <View
                        style={[
                          s.metaBadge,
                          { backgroundColor: test.accent + "18" },
                        ]}
                      >
                        <Text style={[s.metaBadgeText, { color: test.accent }]}>
                          {`${test.questions} preguntas`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  scroll: { gap: SPACING * 2 },

  pageHeader: {
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING * 2,
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -1.2,
    lineHeight: 42,
  },

  tipCard: {
    marginHorizontal: SPACING * 2,
    backgroundColor: "#fff",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING * 2,
    gap: SPACING,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  tipLeft: { flex: 1, gap: SPACING * 0.6 },
  tipLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  tipDesc: {
    fontSize: 12,
    color: MUTED,
    lineHeight: 17,
  },
  tipImage: { width: 100, height: 100, flexShrink: 0 },

  testsHeader: {
    paddingHorizontal: SPACING * 2,
    gap: SPACING * 0.4,
  },
  testsTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.5,
  },
  testsSub: {
    fontSize: 13,
    color: MUTED,
    lineHeight: 19,
  },
  catBlock: {
    gap: SPACING * 1.2,
  },
  catLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 0.6,
    paddingHorizontal: SPACING * 2,
  },
  catEmoji: {
    fontSize: 14,
    color: MUTED,
  },
  catLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  catScroll: {
    paddingHorizontal: SPACING * 2,
    gap: SPACING * 1.2,
  },
  testCard: {
    width: TEST_CARD_W,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#291b1b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  testCardImg: {
    height: 130,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  testCharacter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  testCardBody: {
    padding: SPACING * 1.4,
    paddingBottom: SPACING * 1.8,
    gap: SPACING * 0.6,
  },
  testCardTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  testCardDesc: {
    fontSize: 11,
    color: MUTED,
    lineHeight: 15,
  },
  testCardMeta: {
    flexDirection: "row",
    gap: SPACING * 0.6,
    marginTop: SPACING * 0.4,
  },
  metaBadge: {
    borderRadius: 8,
    paddingHorizontal: SPACING * 0.8,
    paddingVertical: 3,
  },
  metaBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
});
