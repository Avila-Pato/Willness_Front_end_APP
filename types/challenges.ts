import { ImageSourcePropType } from "react-native";

export type ChallengeType =
  | "adivina_concepto"
  | "identifica_patron"
  | "verdad_mito"
  | "completa_reflexion";

export type QuestionType = "multiple_choice" | "true_false";

export type ChallengeQuestion = {
  id: string;
  type?: QuestionType; // default: "multiple_choice"
  statement: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Challenge = {
  id: ChallengeType;
  title: string;
  emoji: ImageSourcePropType;
  color: string;
  questions: ChallengeQuestion[];
  borderColor: string;
};
