import { HabitosProfile } from "@/components/profile/HabitosProfile";
import { HumorTab } from "@/components/profile/HumorTab";
import { LogrosTab } from "@/components/profile/LogrosTab";
import { ProgresoTab } from "@/components/profile/ProgresoTab";
import { SPACING, TAB_ITEM_SIZE } from "@/constants/constants";
import { ARCHETYPE, AREA_META } from "@/constants/diagnosticData";
import { BG, BORDER, MUTED, TEXT } from "@/constants/theme";
import { getAllProgress } from "@/store/challengeProgress";
import { getMoodHistory, MoodHistory } from "@/store/moodHistory";
import { useUserStore } from "@/store/useUserStore";
import { Image } from "expo-image";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { AlignJustify, X } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Modal,
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

type Tab = "progreso" | "Mis Habitos" | "humor" | "logros";

const TABS: { id: Tab; label: string }[] = [
  { id: "progreso", label: "Progreso" },
  { id: "Mis Habitos", label: "Hábitos" },
  { id: "humor", label: "Humor" },
  { id: "logros", label: "Logros" },
];

export default function ProfileScreen() {
  const { bottom } = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("progreso");
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [moodHistory, setMoodHistory] = useState<MoodHistory>({});
  const [showAbout, setShowAbout] = useState(false);

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
        contentContainerStyle={{
          paddingBottom: BAR_HEIGHT + bottom + SPACING * 2,
        }}
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
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: archetype.color + "55" },
            ]}
          />

          {/* Nav row */}
          <SafeAreaView edges={["top"]} style={s.bannerNav}>
            <Pressable style={s.navBtn} onPress={() => setShowAbout(true)}>
              <AlignJustify size={20} color="#fff" strokeWidth={1.8} />
            </Pressable>
          </SafeAreaView>
        </View>

        {/* ── Avatar card superpuesta ── */}
        <View style={s.avatarCardWrap}>
          <View style={[s.avatarCard, { borderColor: archetype.color + "30" }]}>
            <View
              style={[
                s.avatarInner,
                { backgroundColor: archetype.color + "18" },
              ]}
            >
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
            <View
              style={[s.areaTag, { backgroundColor: areaMeta.color + "18" }]}
            >
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
                <Text
                  style={[s.tabLabel, active && { color: archetype.color }]}
                >
                  {t.label}
                </Text>
                {active && (
                  <View
                    style={[
                      s.tabUnderline,
                      { backgroundColor: archetype.color },
                    ]}
                  />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* ── Content ── */}
        {tab === "progreso" && (
          <ProgresoTab progress={progress} topArea={topArea} />
        )}
        {tab === "Mis Habitos" && <HabitosProfile />}
        {tab === "humor" && <HumorTab moodHistory={moodHistory} />}
        {tab === "logros" && <LogrosTab />}
      </ScrollView>

      {/* ── About modal ── */}
      <Modal
        visible={showAbout}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAbout(false)}
      >
        <Pressable
          style={s.modalBackdrop}
          onPress={() => setShowAbout(false)}
        />
        <View style={s.modalSheet}>
          <View style={s.modalHandle} />

          <Image
            source={require("@/assets/logo.png")}
            style={s.modalLogo}
            contentFit="contain"
          />

          <Text style={s.modalAppName}>Lumina</Text>
          <Text style={s.modalTagline}>Tu espacio de bienestar personal</Text>

          <View style={s.modalDivider} />

          <Text style={s.modalDesc}>
            Lumina es una app de bienestar y autoconocimiento que te acompaña a
            explorar tus emociones, construir hábitos saludables y entender
            mejor cómo piensas, sientes y te relacionas con el mundo.
          </Text>

          <View style={s.modalDivider} />

          <View style={s.modalRow}>
            <Text style={s.modalRowLabel}>Desarrollado por</Text>
            <Text style={s.modalRowValue}>Patricio Avila</Text>
          </View>
          <View style={s.modalRow}>
            <Text style={s.modalRowLabel}>Versión</Text>
            <Text style={s.modalRowValue}>1.0.0</Text>
          </View>

          <Pressable style={s.modalClose} onPress={() => setShowAbout(false)}>
            <X size={18} color={MUTED} strokeWidth={2} />
            <Text style={s.modalCloseTxt}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
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
    justifyContent: "flex-end",
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

  /* About modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: SPACING * 2.5,
    paddingBottom: SPACING * 4,
    paddingTop: SPACING,
    alignItems: "center",
    gap: SPACING * 1.2,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: BORDER,
    marginBottom: SPACING,
  },
  modalLogo: {
    width: 80,
    height: 80,
  },
  modalAppName: {
    fontSize: 26,
    fontWeight: "900",
    color: TEXT,
    letterSpacing: -0.6,
    marginTop: -SPACING * 0.5,
  },
  modalTagline: {
    fontSize: 13,
    color: MUTED,
    textAlign: "center",
    marginTop: -SPACING * 0.5,
  },
  modalDivider: {
    width: "100%",
    height: 1,
    backgroundColor: BORDER,
    marginVertical: SPACING * 0.4,
  },
  modalDesc: {
    fontSize: 14,
    color: TEXT,
    lineHeight: 22,
    textAlign: "center",
  },
  modalRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING * 0.4,
  },
  modalRowLabel: {
    fontSize: 13,
    color: MUTED,
    fontWeight: "500",
  },
  modalRowValue: {
    fontSize: 13,
    color: TEXT,
    fontWeight: "700",
  },
  modalClose: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 0.6,
    marginTop: SPACING,
    paddingVertical: SPACING,
    paddingHorizontal: SPACING * 2,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
  },
  modalCloseTxt: {
    fontSize: 14,
    fontWeight: "600",
    color: MUTED,
  },
});
