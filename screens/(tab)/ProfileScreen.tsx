import { AjustesTab } from "@/components/profile/AjustesTab";
import { HabitosProfile } from "@/components/profile/HabitosProfile";
import { HumorTab } from "@/components/profile/HumorTab";
import { ProgresoTab } from "@/components/profile/ProgresoTab";
import { SPACING, TAB_ITEM_SIZE } from "@/constants/constants";
import { ARCHETYPE, AREA_META } from "@/constants/diagnosticData";
import { BG, BORDER, MUTED, TEXT } from "@/constants/theme";
import { getAllProgress } from "@/store/challengeProgress";
import { getMoodHistory, MoodHistory } from "@/store/moodHistory";
import { useUserStore } from "@/store/useUserStore";
import { Image } from "expo-image";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { AlignJustify } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
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
const BANNER_H = 220;
const AVATAR_CARD = 148;

type Tab = "progreso" | "Mis Habitos" | "humor" | "ajustes";

const TABS: { id: Tab; label: string }[] = [
  { id: "progreso", label: "Progreso" },
  { id: "Mis Habitos", label: "Hábitos" },
  { id: "humor", label: "Humor" },
  { id: "ajustes", label: "Ajustes" },
];

export default function ProfileScreen() {
  const { bottom } = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("progreso");
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [moodHistory, setMoodHistory] = useState<MoodHistory>({});

  const diagnostic = useUserStore((s) => s.diagnostic);
  const scores = diagnostic?.scores ?? {};
  const sortedAreas = Object.entries(scores)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a);
  const topArea = sortedAreas[0]?.[0] ?? "emociones";
  const archetype = ARCHETYPE[topArea] ?? ARCHETYPE.emociones;
  const areaMeta = AREA_META[topArea];

  const params = useLocalSearchParams<{ nombre: string; formacion?: string }>();
  const userNombre = params.nombre || "Invitado";

  useFocusEffect(
    useCallback(() => {
      setProgress(getAllProgress());
      getMoodHistory().then(setMoodHistory);
    }, []),
  );


  return (
    <SafeAreaView edges={["left", "right"]} style={s.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: BAR_HEIGHT + bottom + SPACING * 2 }}
      >
        {/* ── Banner ── */}
        <View style={s.bannerWrap}>
          <Image
            source={require("@/assets/background/1.jpg")}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          {/* Dark overlay */}
          <View style={[StyleSheet.absoluteFill, s.bannerOverlay]} />
          {/* Colored tint */}
          <View style={[StyleSheet.absoluteFill, { backgroundColor: archetype.color + "55" }]} />

          {/* Nav row */}
          <SafeAreaView edges={["top"]} style={s.bannerNav}>
            <Pressable style={s.navBtn} />
            <Pressable style={s.navBtn}>
              <AlignJustify size={20} color="#fff" strokeWidth={1.8} />
            </Pressable>
          </SafeAreaView>
        </View>

        {/* ── Avatar card superpuesta ── */}
        <View style={s.avatarCardWrap}>
          <View style={[s.avatarCard, { borderColor: archetype.color + "30" }]}>
            <View style={[s.avatarInner, { backgroundColor: archetype.color + "18" }]}>
              <Text style={[s.avatarInitial, { color: archetype.color }]}>
                {userNombre.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Info ── */}
        <View style={s.infoSection}>
          <Text style={s.name}>{userNombre}</Text>
          <Text style={[s.archetypeType, { color: archetype.color }]}>
            {archetype.tipo}
          </Text>
          <Text style={s.tagline}>{archetype.tagline}</Text>

          {areaMeta && (
            <View style={[s.areaTag, { backgroundColor: areaMeta.color + "18" }]}>
              <Text style={[s.areaTagText, { color: areaMeta.color }]}>
                {areaMeta.label}
              </Text>
            </View>
          )}

        </View>

        {/* ── Tabs ── */}
        <View style={s.tabBar}>
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <Pressable
                key={t.id}
                style={s.tabItem}
                onPress={() => setTab(t.id)}
              >
                <Text style={[s.tabLabel, active && { color: archetype.color }]}>
                  {t.label}
                </Text>
                {active && (
                  <View style={[s.tabUnderline, { backgroundColor: archetype.color }]} />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* ── Content ── */}
        {tab === "progreso" && (
          <ProgresoTab progress={progress} topArea={topArea} />
        )}
        {tab === "Mis Habitos" && <HabitosProfile progress={progress} />}
        {tab === "humor" && <HumorTab moodHistory={moodHistory} />}
        {tab === "ajustes" && <AjustesTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  /* Banner */
  bannerWrap: {
    height: BANNER_H,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: "hidden",
  },
  bannerOverlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  bannerNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Avatar card */
  avatarCardWrap: {
    alignItems: "center",
    marginTop: -(AVATAR_CARD / 2),
    zIndex: 10,
  },
  avatarCard: {
    width: AVATAR_CARD,
    height: AVATAR_CARD,
    borderRadius: 28,
    backgroundColor: "#fff",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1C1B29",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 20,
    elevation: 8,
  },
  avatarInner: {
    width: AVATAR_CARD - 24,
    height: AVATAR_CARD - 24,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: { fontSize: 48, fontWeight: "800" },

  /* Info */
  infoSection: {
    alignItems: "center",
    backgroundColor: BG,
    paddingTop: SPACING * 1.5,
    paddingBottom: SPACING * 2,
    gap: SPACING * 0.5,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.5,
  },
  archetypeType: { fontSize: 13, fontWeight: "700", letterSpacing: 0.2 },
  tagline: {
    fontSize: 12,
    color: MUTED,
    fontStyle: "italic",
    fontWeight: "500",
  },
  areaTag: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 14,
    marginTop: SPACING * 0.4,
  },
  areaTagText: { fontSize: 11, fontWeight: "700" },

  /* Stats */
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING * 1.4,
    gap: SPACING * 3,
  },
  statItem: { alignItems: "center", gap: 2 },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.5,
  },
  statLabel: { fontSize: 11, color: MUTED, fontWeight: "500" },
  statDivider: { width: 1, height: 32, backgroundColor: BORDER },

  /* Tabs */
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: BORDER,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SPACING * 1.4,
    position: "relative",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: MUTED,
    letterSpacing: 0.2,
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    left: 8,
    right: 8,
    height: 2.5,
    borderRadius: 2,
  },
});
