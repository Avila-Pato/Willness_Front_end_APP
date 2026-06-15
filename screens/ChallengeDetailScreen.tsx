import { ChallengeSheet } from "@/components/challenges/ChallengeSheet";
import { TagPickerSheet, TagItem } from "@/components/challenges/TagPickerSheet";
import { SPACING } from "@/constants/constants";
import { BG, MUTED, TEXT } from "@/constants/theme";
import { COMPLETA_REFLEXION_GROUPS } from "@/data/completaReflexionGroups";
import { IDENTIFICA_PATRON_GROUPS } from "@/data/identificaPatronGroups";
import { CONCEPT_GROUPS, getQuestionsForConcepts } from "@/data/languageQuestions";
import { VERDAD_MITO_TOPICS } from "@/data/verdadMitoTopics";
import { WEEKLY_CHALLENGES } from "@/data/weeklyData";
import { getBestScore, recordResult } from "@/store/challengeProgress";
import { Challenge, ChallengeQuestion, ChallengeType } from "@/types/challenges";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Clock } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";


const DESCRIPTIONS: Record<ChallengeType, string> = {
  adivina_concepto:
    "Identifica el concepto de bienestar a partir de una situación. Las preguntas cambian según las áreas que elijas.",
  identifica_patron:
    "Analiza la situación y elige qué patrón de comportamiento se está dando. Entrena tu percepción.",
  verdad_mito:
    "Elige un tema y pon a prueba lo que crees saber sobre emociones, límites, relaciones y bienestar. ¿Verdad o mito?",
  completa_reflexion:
    "Elige la opción correcta para completar la reflexión o concepto de bienestar.",
};

const TAG_CONFIG: Record<
  ChallengeType,
  { heading: string; subheading: string; confirmLabel: (n: number) => string }
> = {
  adivina_concepto: {
    heading: "¿Qué áreas quieres explorar?",
    subheading: "Elige uno o más temas — las preguntas se adaptarán a ellos",
    confirmLabel: (n) => `Explorar ${n} área${n > 1 ? "s" : ""} →`,
  },
  verdad_mito: {
    heading: "¿Qué temas quieres poner a prueba?",
    subheading: "Elige uno o más — combinamos las preguntas de cada tema",
    confirmLabel: (n) => `Explorar ${n} tema${n > 1 ? "s" : ""} →`,
  },
  identifica_patron: {
    heading: "¿Qué patrones quieres identificar?",
    subheading: "Elige uno o más tipos de patrón para personalizar el reto",
    confirmLabel: (n) => `Identificar ${n} patrón${n > 1 ? "es" : ""} →`,
  },
  completa_reflexion: {
    heading: "¿Qué reflexiones quieres completar?",
    subheading: "Elige uno o más temas para tu sesión de reflexión",
    confirmLabel: (n) => `Completar ${n} tema${n > 1 ? "s" : ""} →`,
  },
};

const H_PAD = SPACING * 2;

function BlobChar({ color, size, rotate }: { color: string; size: number; rotate: string }) {
  const blob: ViewStyle = {
    width: size,
    height: size * 0.92,
    backgroundColor: color,
    borderTopLeftRadius: size * 0.55,
    borderTopRightRadius: size * 0.72,
    borderBottomLeftRadius: size * 0.68,
    borderBottomRightRadius: size * 0.52,
    transform: [{ rotate }],
    alignItems: "center",
    justifyContent: "center",
  };
  const eye = Math.max(4, Math.round(size * 0.057));
  return (
    <View style={blob}>
      <View style={{ flexDirection: "row", gap: size * 0.1, marginTop: size * 0.06 }}>
        <View style={{ width: eye, height: eye, borderRadius: eye / 2, backgroundColor: "#1C1B2988" }} />
        <View style={{ width: eye, height: eye, borderRadius: eye / 2, backgroundColor: "#1C1B2988" }} />
      </View>
    </View>
  );
}

function getEstimatedTime(challengeId: ChallengeType): string {
  switch (challengeId) {
    case "adivina_concepto":   return "~7 min";
    case "verdad_mito":        return "2–15 min";
    case "identifica_patron":  return "2–8 min";
    case "completa_reflexion": return "2–8 min";
  }
}

const STEPS: Record<ChallengeType, string[]> = {
  adivina_concepto:   ["Elige las áreas que quieres explorar", "Identifica el concepto en cada situación", "Descubre tu resultado al terminar"],
  verdad_mito:        ["Elige los temas que te interesan", "Decide si cada afirmación es verdad o mito", "Lee la explicación de cada respuesta"],
  identifica_patron:  ["Elige qué tipo de patrón explorar", "Analiza la situación y elige el patrón", "Aprende a reconocerlos en tu vida diaria"],
  completa_reflexion: ["Elige los temas de reflexión", "Completa la frase con la opción correcta", "Incorpora conceptos clave de bienestar"],
};

function getTagItems(challengeId: ChallengeType): TagItem[] {
  switch (challengeId) {
    case "adivina_concepto":
      return CONCEPT_GROUPS.flatMap((g) =>
        g.items.map((item) => ({
          id: item.id,
          title: item.id,
          description: item.description,
          color: item.color,
          bg: item.bg,
        })),
      );
    case "verdad_mito": {
      const MYTH_LABELS: Record<string, { title: string; description: string }> = {
        vm_limites:      { title: "¿Límites = egoísmo?",          description: "¿Poner límites te hace mala persona? Descúbrelo" },
        vm_emociones:    { title: "¿Las emociones debilitan?",     description: "Lo que crees sobre sentir: ¿verdad o mito?" },
        vm_autoestima:   { title: "Quererte sin culpa",            description: "Mitos sobre la autoestima y el amor propio" },
        vm_comunicacion: { title: "¿Asertivo o agresivo?",        description: "Lo que confundimos sobre comunicarnos bien" },
        vm_relaciones:   { title: "El amor sano",                  description: "Creencias sobre los vínculos: ¿cuáles son falsas?" },
        vm_felicidad:    { title: "¿Qué tan real es ser feliz?",   description: "Mitos sobre la felicidad y el bienestar" },
      };
      return VERDAD_MITO_TOPICS.map((t) => ({
        id: t.id,
        title: MYTH_LABELS[t.id]?.title ?? t.title,
        description: MYTH_LABELS[t.id]?.description ?? t.description,
        color: t.color,
        bg: t.bg,
      }));
    }
    case "identifica_patron":
      return IDENTIFICA_PATRON_GROUPS.map((g) => ({
        id: g.id,
        title: g.title,
        description: g.description,
        color: g.color,
        bg: g.bg,
      }));
    case "completa_reflexion":
      return COMPLETA_REFLEXION_GROUPS.map((g) => ({
        id: g.id,
        title: g.title,
        description: g.description,
        color: g.color,
        bg: g.bg,
      }));
  }
}

function getTotalQuestions(challengeId: ChallengeType): number {
  switch (challengeId) {
    case "adivina_concepto":
      return 15;
    case "verdad_mito":
      return VERDAD_MITO_TOPICS.reduce((s, t) => s + t.questions.length, 0);
    case "identifica_patron":
      return IDENTIFICA_PATRON_GROUPS.reduce((s, g) => s + g.questions.length, 0);
    case "completa_reflexion":
      return COMPLETA_REFLEXION_GROUPS.reduce((s, g) => s + g.questions.length, 0);
  }
}

export default function ChallengeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bottom } = useSafeAreaInsets();

  const challenge: Challenge | undefined = useMemo(
    () => WEEKLY_CHALLENGES.find((c) => c.id === id),
    [id],
  );

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetChallenge, setSheetChallenge] = useState<Challenge | null>(null);
  const [tagPickerOpen, setTagPickerOpen] = useState(false);
  const [stat, setStat] = useState(() => getBestScore(id ?? ""));

  if (!challenge) return null;

  const bestPct = Math.round(stat.bestScore * 100);
  const totalAvailable = getTotalQuestions(challenge.id as ChallengeType);
  const tagItems = getTagItems(challenge.id as ChallengeType);
  const cfg = TAG_CONFIG[challenge.id as ChallengeType];

  const handleSheetClose = (correct: number, sessionTotal: number) => {
    if (sessionTotal > 0) {
      recordResult(challenge.id, correct, sessionTotal);
      setStat(getBestScore(challenge.id));
    }
    setSheetOpen(false);
    setSheetChallenge(null);
  };

  const handleTagConfirm = (selectedIds: string[]) => {
    let questions: ChallengeQuestion[] = [];
    switch (challenge.id as ChallengeType) {
      case "adivina_concepto":
        questions = getQuestionsForConcepts(selectedIds, 15);
        break;
      case "verdad_mito":
        questions = VERDAD_MITO_TOPICS.filter((t) =>
          selectedIds.includes(t.id),
        ).flatMap((t) => t.questions);
        break;
      case "identifica_patron":
        questions = IDENTIFICA_PATRON_GROUPS.filter((g) =>
          selectedIds.includes(g.id),
        ).flatMap((g) => g.questions);
        break;
      case "completa_reflexion":
        questions = COMPLETA_REFLEXION_GROUPS.filter((g) =>
          selectedIds.includes(g.id),
        ).flatMap((g) => g.questions);
        break;
    }
    setTagPickerOpen(false);
    setSheetChallenge({ ...challenge, questions });
    setSheetOpen(true);
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tab)/two");
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.root}>
      <Pressable style={styles.backBtn} onPress={handleBack}>
        <ChevronLeft size={22} color={TEXT} />
        <Text style={styles.backText}>Retos</Text>
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: bottom + SPACING * 10 },
        ]}
      >
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: challenge.color + "12" }]}>
          <View style={styles.blobRow}>
            <BlobChar color={challenge.color + "50"} size={72} rotate="-10deg" />
            <BlobChar color={challenge.color + "99"} size={96} rotate="0deg" />
            <BlobChar color={challenge.color + "40"} size={68} rotate="8deg" />
          </View>
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.description}>{DESCRIPTIONS[challenge.id as ChallengeType]}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalAvailable}+</Text>
            <Text style={styles.statLabel}>preguntas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: challenge.color }]}>
              {stat.timesPlayed > 0 ? `${bestPct}%` : "—"}
            </Text>
            <Text style={styles.statLabel}>mejor resultado</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stat.timesPlayed}</Text>
            <Text style={styles.statLabel}>jugadas</Text>
          </View>
        </View>

        {/* Steps */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>¿Cómo funciona?</Text>
          {STEPS[challenge.id as ChallengeType].map((text, i) => (
            <View key={i} style={styles.step}>
              <View style={[styles.stepBullet, { backgroundColor: challenge.color + "22" }]}>
                <Text style={[styles.stepNum, { color: challenge.color }]}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: bottom + SPACING }]}>
        <View style={styles.timeRow}>
          <Clock size={13} color={MUTED} />
          <Text style={styles.timeText}>
            {getEstimatedTime(challenge.id as ChallengeType)} según los temas que elijas
          </Text>
        </View>
        <Pressable
          style={[styles.startBtn, { backgroundColor: challenge.color }]}
          onPress={() => setTagPickerOpen(true)}
        >
          <Text style={styles.startBtnText}>
            {stat.timesPlayed > 0 ? "Jugar de nuevo →" : "Elegir temas →"}
          </Text>
        </Pressable>
      </View>

      {tagPickerOpen && (
        <TagPickerSheet
          items={tagItems}
          heading={cfg.heading}
          subheading={cfg.subheading}
          confirmLabel={cfg.confirmLabel}
          onConfirm={handleTagConfirm}
          onClose={() => setTagPickerOpen(false)}
        />
      )}

      {sheetOpen && sheetChallenge && (
        <ChallengeSheet challenge={sheetChallenge} onClose={handleSheetClose} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING,
    gap: 4,
  },
  backText: { fontSize: 15, fontWeight: "600", color: TEXT },

  scrollContent: {
    gap: SPACING * 2,
  },

  hero: {
    alignItems: "center",
    paddingVertical: SPACING * 3,
    paddingHorizontal: SPACING * 3,
    gap: SPACING * 1.2,
    marginHorizontal: H_PAD,
    borderRadius: 24,
  },
  blobRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: SPACING * 1.2,
    marginBottom: SPACING * 0.5,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: TEXT,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    color: MUTED,
    lineHeight: 21,
    textAlign: "center",
  },

  statsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: SPACING * 2,
    paddingVertical: SPACING * 1.8,
    paddingHorizontal: SPACING * 2,
  },
  statItem: { flex: 1, alignItems: "center", gap: 4 },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.5,
  },
  statLabel: { fontSize: 11, color: MUTED, fontWeight: "500" },
  statDivider: { width: 1, backgroundColor: "#F3F4F6", marginVertical: 4 },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING,
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  startBtn: {
    borderRadius: 18,
    paddingVertical: SPACING * 1.8,
    alignItems: "center",
  },
  startBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: SPACING,
  },
  timeText: { fontSize: 12, color: MUTED, fontWeight: "500" },

  stepsCard: {
    marginHorizontal: SPACING * 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: SPACING * 2,
    gap: SPACING * 1.5,
  },
  stepsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: MUTED,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: SPACING * 0.5,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING * 1.2,
  },
  stepBullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNum: { fontSize: 13, fontWeight: "800" },
  stepText: { flex: 1, fontSize: 13, color: TEXT, lineHeight: 19, fontWeight: "500" },
});
