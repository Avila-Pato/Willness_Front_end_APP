import { SPACING, TAB_ITEM_SIZE } from "@/constants/constants";
import { BG, MUTED, TEXT } from "@/constants/theme";
import { HABITS } from "@/data/habitsData";
import { SelfTest, TEST_CATEGORIES } from "@/data/selfTestsData";
import { ABSTRACT_IMAGES, TIPS } from "@/data/tipsData";
import { useUserStore } from "@/store/useUserStore";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
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
const DARK = "#1A1244";
const SCREEN_W = Dimensions.get("window").width;
const TEST_CARD_W = SCREEN_W * 0.46;
const CARD_H = 210;
const PEEK = 14;

// funcion para obtener el tip del dia basado en el dia del año
const getDailyTip = () => {
  const now = new Date(); // Obtiene la fecha y hora actual
  const start = new Date(now.getFullYear(), 0, 0); // Crea una fecha para el inicio del año (1 de enero)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86_400_000); // Calcula el día del año (0-365)
  return TIPS[dayOfYear % TIPS.length]; // Devuelve el tip correspondiente
};

const dailyTip = getDailyTip();
// funciona el id con la imagen
const dailyTipImage =
  ABSTRACT_IMAGES[(parseInt(dailyTip.id) - 1) % ABSTRACT_IMAGES.length];

export default function ExploraScreen() {
  const { bottom } = useSafeAreaInsets();
  const [shuffled] = useState(() =>
    [...HABITS].sort(() => Math.random() - 0.5),
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const addedIds = useUserStore((s) => s.habits);
  const addHabit = useUserStore((s) => s.addHabit);

  const next = () => setCurrentIdx((i) => (i + 1) % shuffled.length);

  const stack = [0, 1, 2].map(
    (offset) => shuffled[(currentIdx + offset) % shuffled.length],
  );
  const top = stack[0];

  const handleAdd = () => {
    addHabit(top.id);
    next();
  };

  const handleSkip = () => next();

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

        {/* ── Dark CTA ── */}
        <Pressable
          style={({ pressed }) => [s.ctaBtn, pressed && { opacity: 0.82 }]}
        >
          <Text style={s.ctaBtnText}>{"Explorar tu bienestar"}</Text>
        </Pressable>

        {/* ── Habits section header ── */}
        <View style={s.habitsHeader}>
          <Text style={s.habitsTitle}>{"Nuevos hábitos para ti"}</Text>
          <Text style={s.habitsDesc}>
            {
              "Agrega estos hábitos a tu rutina. Al presionar + se guardan en tu perfil para que puedas seguirlos."
            }
          </Text>
        </View>

        {/* ── Deck de cartas ── */}
        {true ? (
          <View style={s.deckArea}>
            {/* Carta del fondo (3ª) */}
            {stack[2] && (
              <View
                style={[
                  s.deckBehind,
                  {
                    backgroundColor: stack[2].color,
                    top: PEEK * 2,
                    left: 20,
                    right: 20,
                  },
                ]}
              />
            )}
            {/* Carta del medio (2ª) */}
            {stack[1] && (
              <View
                style={[
                  s.deckBehind,
                  {
                    backgroundColor: stack[1].color,
                    top: PEEK,
                    left: 10,
                    right: 10,
                    zIndex: 2,
                  },
                ]}
              />
            )}
            {/* Carta superior — interactiva */}
            <View
              style={[s.deckTop, { backgroundColor: top.color, zIndex: 3 }]}
            >
              <Image
                source={top.image}
                style={s.habitImage}
                contentFit="contain"
              />
              <View style={s.habitContent}>
                <Text style={[s.habitTitle, { color: top.accent }]}>
                  {top.title}
                </Text>
                <Text style={[s.habitDuration, { color: top.accent + "AA" }]}>
                  {top.category}
                </Text>
                <Text style={s.habitDesc}>{top.desc}</Text>
              </View>
              <View style={s.habitBtns}>
                <Pressable
                  style={[s.habitBtnFill, { backgroundColor: top.accent }]}
                  onPress={handleAdd}
                >
                  <Text style={s.habitBtnFillTxt}>{"+"}</Text>
                </Pressable>
                <Pressable
                  style={[
                    s.habitBtnOutline,
                    { borderColor: top.accent + "55" },
                  ]}
                  onPress={handleSkip}
                >
                  <Text style={[s.habitBtnOutlineTxt, { color: top.accent }]}>
                    {"›"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <View style={s.emptyDeck}>
            <Text style={s.emptyEmoji}>{"🎉"}</Text>
            <Text style={s.emptyTitle}>{"¡Añadiste todos los hábitos!"}</Text>
            <Text style={s.emptyDesc}>
              {"Revisa tu perfil para ver tu progreso."}
            </Text>
          </View>
        )}

        {/* Contador */}
        <Text style={s.deckCounter}>
          {`${addedIds.length} de ${HABITS.length} hábitos añadidos`}
        </Text>

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
                  onPress={() => router.push({ pathname: "/self-test-detail", params: { testId: test.id } })}
                >
                  {/* Image area */}
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

                  {/* Body */}
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

  /* ── Page header ── */
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

  /* ── Featured tip ── */
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

  /* ── CTA ── */
  ctaBtn: {
    marginHorizontal: SPACING * 2,
    backgroundColor: DARK,
    borderRadius: 18,
    paddingVertical: SPACING * 1.8,
    alignItems: "center",
  },
  ctaBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },

  /* ── Habits header ── */
  habitsHeader: {
    paddingHorizontal: SPACING * 2,
    gap: SPACING * 0.5,
  },
  habitsTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.5,
  },
  habitsDesc: {
    fontSize: 13,
    color: MUTED,
    lineHeight: 19,
  },

  /* ── Deck ── */
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
    top: 0,
    left: 0,
    right: 0,
    height: CARD_H,
    borderRadius: 24,
    padding: SPACING * 2,
    gap: SPACING * 0.8,
    overflow: "hidden",
  },

  /* Card content */
  habitImage: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 100,
    height: 100,
    opacity: 0.3,
  },
  habitContent: { gap: SPACING * 0.25, flex: 1 },
  habitTitle: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  habitDuration: { fontSize: 13, fontWeight: "600" },
  habitDesc: {
    fontSize: 12,
    color: "#444",
    lineHeight: 18,
    maxWidth: "75%",
  },
  habitBtns: {
    flexDirection: "row",
    gap: SPACING * 0.8,
  },
  habitBtnFill: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  habitBtnFillTxt: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 28,
  },
  habitBtnOutline: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  habitBtnOutlineTxt: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 28,
  },

  /* Counter */
  deckCounter: {
    textAlign: "center",
    fontSize: 12,
    color: MUTED,
    fontWeight: "500",
  },

  /* ── Tests de autoconocimiento ── */
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
    overflow: "hidden",
    shadowColor: "#1C1B29",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  testCardImg: {
    height: 130,
    overflow: "hidden",
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

  /* Empty state */
  emptyDeck: {
    marginHorizontal: SPACING * 2,
    alignItems: "center",
    gap: SPACING * 0.5,
    paddingVertical: SPACING * 3,
  },
  emptyEmoji: { fontSize: 36 },
  emptyTitle: { fontSize: 16, fontWeight: "800", color: TEXT },
  emptyDesc: { fontSize: 13, color: MUTED },
});
