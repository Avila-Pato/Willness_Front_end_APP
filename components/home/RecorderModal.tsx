import { FloatingParticle } from "@/components/home/reflection/FloatingParticle";
import { GRADIENT_COLORS, PARTICLES } from "@/components/home/reflection/constants";
import {
  BACKEND_URL,
  buildResultFromCategoria,
  buildResultFromText,
  classifyText,
  useAudioJournalStore,
} from "@/store/useAudioJournalStore";
import type { CategoriaDetectada } from "@/store/useAudioJournalStore";
import { MOODS } from "@/data/moods";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import { LinearGradient } from "expo-linear-gradient";
import { Square, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width: W } = Dimensions.get("window");

// ── Mood mapping ───────────────────────────────────────────────────────────────

const CATEGORIA_MOOD: Record<CategoriaDetectada, number> = {
  ESTRES_ANSIEDAD:      0,
  TRISTEZA_MELANCOLIA:  1,
  CANSANCIO_APATIA:     2,
  CALMA_BIENESTAR:      3,
  ALEGRIA_MOTIVACION:   4,
};

// ── Voice Orb ──────────────────────────────────────────────────────────────────

const ORB_SIZE = 160;
const ORB_CX   = ORB_SIZE / 2;
const RING_R   = 64;

const DOT_COLORS  = ["#9DC4A0", "#F2B8A4", "#96B8D4", "#EAD4A8", "#C8A8D0", "#F4C4A0"];
const DOT_R_OFF   = [0, 6, -3, 8, -4, 5, -2, 7, -5, 3, 1, 7, -3, 6, -4, 4, -2, 8, -5, 2];
const DOT_SZ_LIST = [7, 9, 7, 8, 6, 9, 7, 8, 7, 9, 6, 8, 7, 9, 7, 8, 6, 9, 7, 8];

type DotCfg = { x: number; y: number; color: string; sz: number; phaseMs: number };

const ORB_DOTS: DotCfg[] = Array.from({ length: 20 }, (_, i) => {
  const ang = (i / 20) * Math.PI * 2 - Math.PI / 2;
  const r   = RING_R + DOT_R_OFF[i];
  const sz  = DOT_SZ_LIST[i];
  return {
    x: ORB_CX + r * Math.cos(ang) - sz / 2,
    y: ORB_CX + r * Math.sin(ang) - sz / 2,
    color: DOT_COLORS[i % DOT_COLORS.length],
    sz,
    phaseMs: Math.round((i / 20) * 560),
  };
});

function AnimDot({ x, y, color, sz, phaseMs, active }: DotCfg & { active: boolean }) {
  const scale = useSharedValue(1);
  const opac  = useSharedValue(0.5);

  useEffect(() => {
    if (active) {
      opac.value  = withTiming(1, { duration: 250 });
      scale.value = withDelay(
        phaseMs,
        withRepeat(
          withSequence(
            withTiming(1.45, { duration: 420 }),
            withTiming(0.7,  { duration: 380 }),
          ),
          -1,
          true,
        ),
      );
    } else {
      opac.value  = withTiming(0.5, { duration: 400 });
      scale.value = withTiming(1,   { duration: 300 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opac.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        ob.dot,
        { left: x, top: y, width: sz, height: sz, borderRadius: sz / 2, backgroundColor: color },
        aStyle,
      ]}
    />
  );
}

function VoiceOrb({ active }: { active: boolean }) {
  const glowScale = useSharedValue(1);

  useEffect(() => {
    glowScale.value = withRepeat(
      withSequence(
        withTiming(active ? 1.22 : 1.05, { duration: active ? 560 : 2400 }),
        withTiming(active ? 0.80 : 0.95, { duration: active ? 500 : 2400 }),
      ),
      -1,
      true,
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const glowAnim = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
  }));

  // Blob centers cluster around (ORB_CX, ORB_CX) with slight offsets
  // Green:  center ≈ (68, 88)  → left=68-39=29,  top=88-39=49
  // Peach:  center ≈ (90, 80)  → left=90-37=53,  top=80-37=43
  // Blue:   center ≈ (82, 70)  → left=82-36=46,  top=70-36=34
  return (
    <View style={ob.container}>
      <Animated.View style={[StyleSheet.absoluteFill, glowAnim]}>
        <View style={[ob.blob, { backgroundColor: "#B8D8A8", width: 78, height: 78, borderRadius: 39, left: 29, top: 49 }]} />
        <View style={[ob.blob, { backgroundColor: "#F2C0A4", width: 74, height: 74, borderRadius: 37, left: 53, top: 43 }]} />
        <View style={[ob.blob, { backgroundColor: "#A4C4DC", width: 72, height: 72, borderRadius: 36, left: 46, top: 34 }]} />
      </Animated.View>

      {ORB_DOTS.map((d, i) => (
        <AnimDot key={i} {...d} active={active} />
      ))}
    </View>
  );
}

const ob = StyleSheet.create({
  container: { width: ORB_SIZE, height: ORB_SIZE },
  blob: { position: "absolute", opacity: 0.55 },
  dot: { position: "absolute" },
});

// ── Web Speech API ─────────────────────────────────────────────────────────────

type SpeechRec = {
  continuous: boolean; interimResults: boolean; lang: string;
  onresult: ((e: any) => void) | null; onend: (() => void) | null;
  start: () => void; stop: () => void;
};

function createSpeechRec(): SpeechRec | null {
  if (typeof window === "undefined") return null;
  const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR() as SpeechRec;
  r.continuous = true; r.interimResults = true; r.lang = "es-ES";
  return r;
}

// ── Backend ────────────────────────────────────────────────────────────────────

async function sendAudio(uri: string): Promise<{ categoria: string; transcripcion: string }> {
  const fd = new FormData();
  if (Platform.OS === "web") {
    const blob = await (await fetch(uri)).blob();
    fd.append("file", blob, "audio.webm");
  } else {
    fd.append("file", { uri, name: "audio.m4a", type: "audio/m4a" } as unknown as Blob);
  }
  const res = await fetch(`${BACKEND_URL}/audio/analyze`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(`${res.status}`);
  const json = await res.json();
  return { categoria: json.categoria as string, transcripcion: (json.transcripcion as string) ?? "" };
}

// ── Component ──────────────────────────────────────────────────────────────────

interface Props { visible: boolean; onClose: () => void; }

export function RecorderModal({ visible, onClose }: Props) {
  const { setRecording, setAnalyzing, setResult, setError } = useAudioJournalStore();
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recRef = useRef<SpeechRec | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [detectedMood, setDetectedMood] = useState<CategoriaDetectada | null>(null);
  const transcriptRef = useRef("");

  useEffect(() => {
    transcriptRef.current = transcript;
    if (transcript.trim().length > 3) {
      setDetectedMood(classifyText(transcript) ?? null);
    } else {
      setDetectedMood(null);
    }
  }, [transcript]);

  useEffect(() => {
    if (!visible) { setIsRecording(false); setTranscript(""); setDetectedMood(null); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const startRecording = async () => {
    try {
      if (Platform.OS !== "web") {
        const { granted } = await AudioModule.requestRecordingPermissionsAsync();
        if (!granted) { setError("Permiso denegado"); onClose(); return; }
        await recorder.prepareToRecordAsync();
        recorder.record();
      } else {
        const rec = createSpeechRec();
        if (rec) {
          rec.onresult = (e: any) => {
            let t = "";
            for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript + " ";
            setTranscript(t.trim());
          };
          rec.onend = () => { try { rec.start(); } catch { /* ignorar */ } };
          rec.start();
          recRef.current = rec;
        }
      }
      setIsRecording(true);
      setRecording();
    } catch {
      setError("No se pudo iniciar la grabación");
      onClose();
    }
  };

  const stopRecording = async () => {
    const savedTranscript = transcriptRef.current;
    setIsRecording(false);
    recRef.current?.stop();
    recRef.current = null;

    if (Platform.OS === "web") {
      onClose();
      setResult(buildResultFromText(savedTranscript));
      return;
    }

    try { await recorder.stop(); } catch { /* ya estaba detenido */ }
    const uri = recorder.uri;
    onClose();
    setAnalyzing();

    try {
      if (!uri) throw new Error("Sin URI");
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 20000)
      );
      const { categoria, transcripcion: tx } = await Promise.race([sendAudio(uri), timeout]);
      setResult(buildResultFromCategoria(categoria as any, tx));
    } catch {
      if (savedTranscript.trim().length > 2) {
        setResult(buildResultFromText(savedTranscript));
      } else {
        setResult(buildResultFromCategoria("CANSANCIO_APATIA"));
      }
    }
  };

  const handleClose = async () => {
    recRef.current?.stop();
    recRef.current = null;
    if (Platform.OS !== "web" && isRecording) {
      try { await recorder.stop(); } catch { /* ignorar */ }
    }
    setIsRecording(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="none" statusBarTranslucent>
      <Animated.View style={s.overlay}>
        <LinearGradient colors={GRADIENT_COLORS} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={StyleSheet.absoluteFill} />
        <View style={s.blob1} pointerEvents="none" />
        <View style={s.blob2} pointerEvents="none" />
        <View style={s.blob3} pointerEvents="none" />
        {PARTICLES.map((p, i) => <FloatingParticle key={i} {...p} />)}

        <Pressable style={s.closeBtn} onPress={handleClose} hitSlop={12}>
          <X size={19} color="#8B7BAB" strokeWidth={2} />
        </Pressable>

        <View style={s.center}>
          <BlurView intensity={50} tint="light" style={s.card}>
            {/* Ornamento */}
            <View style={s.ornament}>
              <View style={s.oDot} />
              <View style={s.oLine} />
              <View style={s.oDot} />
            </View>

            <Text style={s.cardLabel}>{"REFLEXIÓN DEL MOMENTO"}</Text>

            <Text style={s.phrase}>{"Cuéntame cómo\nte sientes hoy."}</Text>

            <View style={s.separator} />

            {/* Voice Orb */}
            <View style={s.orbWrap}>
              <VoiceOrb active={isRecording} />
              <Text style={s.orbHint}>
                {transcript ? "" : isRecording ? "Escuchando tu voz..." : "Presiona el botón para comenzar"}
              </Text>
            </View>

            {/* Transcripción */}
            {transcript.length > 0 && (
              <Text style={s.transcript} numberOfLines={3}>{transcript}</Text>
            )}

            {/* Tu humor de hoy */}
            <Text style={s.moodLabel}>{"Tu humor de hoy"}</Text>
            <View style={s.moodRow}>
              {MOODS.map((m, i) => {
                const active = detectedMood !== null && CATEGORIA_MOOD[detectedMood] === i;
                return (
                  <View key={i} style={[s.moodItem, active && { backgroundColor: m.color + "55" }]}>
                    <Image
                      source={m.image}
                      style={[s.moodImg, !active && s.moodImgDim]}
                      contentFit="contain"
                    />
                    <Text style={[s.moodItemLabel, active && s.moodItemLabelActive]}>
                      {m.label}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Botón iniciar / terminar */}
            {isRecording ? (
              <Pressable style={s.stopBtn} onPress={stopRecording}>
                <Square size={14} color="#fff" fill="#fff" strokeWidth={0} />
                <Text style={s.stopTxt}>{"Terminar reflexión"}</Text>
              </Pressable>
            ) : (
              <Pressable style={s.startBtn} onPress={startRecording}>
                <Text style={s.stopTxt}>{"Iniciar reflexión"}</Text>
              </Pressable>
            )}
          </BlurView>
        </View>
      </Animated.View>
    </Modal>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  overlay: { flex: 1, alignItems: "center", justifyContent: "center" },

  blob1: { position: "absolute", width: 300, height: 300, borderRadius: 150, backgroundColor: "rgba(210,195,240,0.38)", top: -80, left: -80 },
  blob2: { position: "absolute", width: 240, height: 240, borderRadius: 120, backgroundColor: "rgba(255,205,185,0.30)", bottom: 60, right: -70 },
  blob3: { position: "absolute", width: 180, height: 180, borderRadius: 90, backgroundColor: "rgba(190,215,255,0.25)", bottom: 220, left: 10 },

  closeBtn: { position: "absolute", top: 56, right: 22, width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.65)", alignItems: "center", justifyContent: "center", zIndex: 10 },

  center: { width: "100%", paddingHorizontal: 24, alignItems: "center" },

  card: { width: W - 48, borderRadius: 28, padding: 26, backgroundColor: "rgba(255,255,255,0.52)", borderWidth: 1.2, borderColor: "rgba(255,255,255,0.88)", overflow: "hidden" },

  ornament: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 },
  oDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: "#C8B0DC" },
  oLine: { width: 44, height: 1, backgroundColor: "#D8C8EC" },

  cardLabel: { fontSize: 9, fontFamily: "Poppins-SemiBold", letterSpacing: 2.2, color: "#A895C8", textAlign: "center", marginBottom: 16 },

  phrase: { fontSize: 19, fontFamily: "Playfair-ExtraBold", color: "#2D1F60", lineHeight: 30, textAlign: "center", marginBottom: 18 },

  separator: { height: 1, backgroundColor: "rgba(180,155,215,0.28)", marginBottom: 18 },

  orbWrap: { alignItems: "center", marginBottom: 6 },
  orbHint: { fontSize: 12, fontFamily: "Poppins-Regular", color: "#A895C8", marginTop: 10, fontStyle: "italic" },

  transcript: { fontSize: 14, fontFamily: "Poppins-Regular", color: "#2D1F60", lineHeight: 22, marginBottom: 14, fontStyle: "italic", textAlign: "center" },

  stopBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#7B6BB5", borderRadius: 16, paddingVertical: 14, marginTop: 4 },
  startBtn: { alignItems: "center", justifyContent: "center", backgroundColor: "#7B6BB5", borderRadius: 16, paddingVertical: 14, marginTop: 4 },
  stopTxt: { fontSize: 14, fontFamily: "Poppins-SemiBold", color: "#fff" },

  moodLabel: { fontSize: 10, fontFamily: "Poppins-SemiBold", letterSpacing: 1.6, color: "#A895C8", textAlign: "center", marginBottom: 10 },
  moodRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  moodItem: { alignItems: "center", gap: 4, borderRadius: 12, paddingVertical: 6, paddingHorizontal: 8, flex: 1, marginHorizontal: 2 },
  moodImg: { width: 34, height: 34 },
  moodImgDim: { opacity: 0.35 },
  moodItemLabel: { fontSize: 9, fontFamily: "Poppins-Medium", color: "#B0A0CC" },
  moodItemLabelActive: { color: "#5A3FA0", fontFamily: "Poppins-SemiBold" },
});
