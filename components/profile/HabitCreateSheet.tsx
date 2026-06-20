import { SPACING } from "@/constants/constants";
import { MUTED, TEXT } from "@/constants/theme";
import { HABIT_ICONS } from "@/data/habitIcons";
import { CustomHabit } from "@/store/useUserStore";
import { Image } from "expo-image";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const PALETTE: [string, string][] = [
  ["#E8F4EE", "#4D8B7A"],
  ["#EDE9FE", "#7C3AED"],
  ["#FEF3C7", "#D97706"],
  ["#E0F2FE", "#0284C7"],
  ["#FCE7F3", "#9D174D"],
  ["#CCFBF1", "#0F766E"],
  ["#ECFCCB", "#65A30D"],
  ["#FFE4E6", "#BE185D"],
  ["#E0E7FF", "#4338CA"],
  ["#FEE2E2", "#DC2626"],
];


const DEFAULT_TITLE = "Nombre de hábito";

interface Props {
  visible: boolean;
  onClose: () => void;
  onAddCustom: (habit: CustomHabit) => void;
}

export function HabitCreateSheet({ visible, onClose, onAddCustom }: Props) {
  const { top, bottom } = useSafeAreaInsets();

  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [editingTitle, setEditingTitle] = useState(false);
  const [iconIdx, setIconIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
const [showIconPicker, setShowIconPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [bg, accent] = PALETTE[colorIdx];
  const titleIsPlaceholder = title === DEFAULT_TITLE;

  const reset = () => {
    setTitle(DEFAULT_TITLE);
    setEditingTitle(false);
    setIconIdx(0);
    setColorIdx(0);
setShowIconPicker(false);
    setShowColorPicker(false);
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSave = () => {
    if (!title.trim() || titleIsPlaceholder) return;
    onAddCustom({
      id: `custom_${Date.now()}`,
      title: title.trim(),
      iconIndex: iconIdx,
      color: bg,
      accent,
      days: "all",
      time: "any",
      goalEnabled: false,
    });
    reset();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={s.root}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header */}
        <View style={[s.header, { paddingTop: top + SPACING }]}>
          <Pressable style={s.backBtn} onPress={handleClose} hitSlop={12}>
            <Text style={s.backBtnTxt}>✕</Text>
          </Pressable>
          <Text style={s.headerTitle}>Crea un hábito</Text>
          <View style={s.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[s.scrollContent, { paddingBottom: bottom + SPACING * 4 }]}
        >
          {/* Icon hero */}
          <View style={[s.iconHero, { backgroundColor: bg }]}>
            <Image source={HABIT_ICONS[iconIdx]} style={s.iconHeroImg} contentFit="contain" />
          </View>

          {/* Título editable */}
          <View style={s.titleSection}>
            {editingTitle ? (
              <TextInput
                style={s.titleInput}
                value={title === DEFAULT_TITLE ? "" : title}
                placeholder={DEFAULT_TITLE}
                placeholderTextColor="rgba(17,24,39,0.28)"
                onChangeText={setTitle}
                autoFocus
                onBlur={() => { setEditingTitle(false); if (!title.trim()) setTitle(DEFAULT_TITLE); }}
                returnKeyType="done"
                onSubmitEditing={() => { setEditingTitle(false); if (!title.trim()) setTitle(DEFAULT_TITLE); }}
                selectionColor={accent}
                textAlign="center"
              />
            ) : (
              <Pressable onPress={() => setEditingTitle(true)} style={s.titleRow}>
                <Text style={[s.titleText, titleIsPlaceholder && s.titlePlaceholder]}>
                  {title}
                </Text>
                <Text style={s.editEmoji}>✏️</Text>
              </Pressable>
            )}
            <Text style={s.titleSub}>Hábito asiduo</Text>
          </View>

          {/* Icono & Color */}
          <View style={s.card}>
            <Pressable
              style={s.settingRow}
              onPress={() => { setShowIconPicker(!showIconPicker); setShowColorPicker(false); }}
            >
              <Text style={s.settingLabel}>Icono</Text>
              <View style={s.settingRight}>
                <View style={[s.iconPreview, { backgroundColor: bg }]}>
                  <Image source={HABIT_ICONS[iconIdx]} style={s.iconPreviewImg} contentFit="contain" />
                </View>
                <Text style={s.arrow}>›</Text>
              </View>
            </Pressable>

            {showIconPicker && (
              <View style={s.pickerGrid}>
                {HABIT_ICONS.map((src, i) => (
                  <Pressable
                    key={i}
                    style={[s.iconOption, iconIdx === i && { backgroundColor: bg, borderColor: accent }]}
                    onPress={() => { setIconIdx(i); setShowIconPicker(false); }}
                  >
                    <Image source={src} style={s.iconOptionImg} contentFit="contain" />
                  </Pressable>
                ))}
              </View>
            )}

            <View style={s.rowSep} />

            <Pressable
              style={s.settingRow}
              onPress={() => { setShowColorPicker(!showColorPicker); setShowIconPicker(false); }}
            >
              <Text style={s.settingLabel}>Color</Text>
              <View style={s.settingRight}>
                <View style={[s.colorDot, { backgroundColor: accent }]} />
                <Text style={s.arrow}>›</Text>
              </View>
            </Pressable>

            {showColorPicker && (
              <View style={s.pickerGrid}>
                {PALETTE.map(([c, a], i) => (
                  <Pressable
                    key={i}
                    style={[
                      s.colorSwatch,
                      { backgroundColor: c },
                      colorIdx === i && { borderColor: a, borderWidth: 2.5 },
                    ]}
                    onPress={() => { setColorIdx(i); setShowColorPicker(false); }}
                  >
                    <View style={[s.colorSwatchInner, { backgroundColor: a }]} />
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Guardar */}
          <TouchableOpacity
            style={[s.saveBtn, { backgroundColor: accent }, titleIsPlaceholder ? s.saveBtnDisabled : undefined]}
            onPress={handleSave}
            activeOpacity={0.82}
          >
            <Text style={s.saveBtnTxt}>Guardar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FAFAF9" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
    paddingBottom: SPACING * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: "#F0EFED",
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnTxt: { fontSize: 14, color: MUTED, fontWeight: "600" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: TEXT,
    letterSpacing: -0.3,
  },
  headerSpacer: { width: 32 },

  scrollContent: {
    paddingHorizontal: SPACING * 2,
    paddingTop: SPACING * 2,
    gap: SPACING * 0.5,
  },

  /* Icon hero */
  iconHero: {
    alignSelf: "center",
    width: 88,
    height: 88,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING,
  },
  iconHeroImg: { width: 52, height: 52 },

  /* Title */
  titleSection: { alignItems: "center", marginBottom: SPACING * 2 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: SPACING * 0.6 },
  titleText: {
    fontSize: 24,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.6,
    textAlign: "center",
  },
  titlePlaceholder: { color: "rgba(17,24,39,0.3)" },
  titleInput: {
    fontSize: 24,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.6,
    paddingVertical: 0,
    minWidth: 200,
  },
  editEmoji: { fontSize: 16 },
  titleSub: { fontSize: 13, color: MUTED, marginTop: 4 },

  /* Card */
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: SPACING * 1.5,
    marginBottom: SPACING * 1.5,
    borderWidth: 1,
    borderColor: "#F0EFED",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING * 1.4,
  },
  settingLabel: { fontSize: 15, fontWeight: "600", color: TEXT },
  settingRight: { flexDirection: "row", alignItems: "center", gap: SPACING * 0.6 },
  settingValue: { fontSize: 14, color: MUTED },
  arrow: { fontSize: 20, color: MUTED, lineHeight: 24 },
  rowSep: { height: 1, backgroundColor: "#F0EFED" },

  /* Icon preview */
  iconPreview: {
    width: 32, height: 32, borderRadius: 10,
    alignItems: "center", justifyContent: "center",
  },
  iconPreviewImg: { width: 20, height: 20 },

  /* Color */
  colorDot: { width: 22, height: 22, borderRadius: 11 },

  /* Pickers */
  pickerGrid: {
    flexDirection: "row", flexWrap: "wrap",
    paddingVertical: SPACING, gap: SPACING * 0.8,
  },
  iconOption: {
    width: 52, height: 52, borderRadius: 14,
    alignItems: "center", justifyContent: "center",
    backgroundColor: "#F5F4F2",
    borderWidth: 1.5, borderColor: "transparent",
  },
  iconOptionImg: { width: 30, height: 30 },

  colorSwatch: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1.5, borderColor: "transparent",
  },
  colorSwatchInner: { width: 22, height: 22, borderRadius: 11 },

  /* Section label */
  sectionLabel: {
    fontSize: 11, fontWeight: "700", color: MUTED,
    textTransform: "uppercase", letterSpacing: 0.8,
    marginBottom: SPACING * 0.8, marginTop: SPACING * 0.5,
  },

  /* Time grid */
  timeGrid: {
    flexDirection: "row", flexWrap: "wrap",
    gap: SPACING * 0.8, marginBottom: SPACING * 1.5,
  },
  timeBtn: {
    width: "47.5%", paddingVertical: SPACING * 1.2,
    borderRadius: 14, alignItems: "center", gap: SPACING * 0.4,
    backgroundColor: "#F5F4F2", borderWidth: 1.5, borderColor: "transparent",
  },
  timeBtnIcon: { fontSize: 22 },
  timeBtnLabel: {
    fontSize: 13, fontWeight: "500", color: MUTED,
    textAlign: "center", lineHeight: 17,
  },

  /* Save */
  saveBtn: {
    borderRadius: 16, paddingVertical: 16,
    alignItems: "center", marginTop: SPACING,
  },
  saveBtnDisabled: { opacity: 0.35 },
  saveBtnTxt: { fontSize: 16, fontWeight: "800", color: "#fff", letterSpacing: 0.2 },
});
