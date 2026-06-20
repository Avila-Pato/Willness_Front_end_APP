import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_COMPLETED = "selftest_completed";
const KEY_RESULTS   = "selftest_results";

export type StoredResult = {
  primary: string;
  averages: Record<string, number>;
  completedAt: string;
};

export async function markTestCompleted(testId: string): Promise<void> {
  const raw = await AsyncStorage.getItem(KEY_COMPLETED);
  const list: string[] = raw ? JSON.parse(raw) : [];
  if (!list.includes(testId)) {
    await AsyncStorage.setItem(KEY_COMPLETED, JSON.stringify([...list, testId]));
  }
}

export async function getCompletedTests(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEY_COMPLETED);
  return raw ? JSON.parse(raw) : [];
}

export async function saveTestResult(
  testId: string,
  result: { primary: string; averages: Record<string, number> },
): Promise<void> {
  const raw = await AsyncStorage.getItem(KEY_RESULTS);
  const map: Record<string, StoredResult> = raw ? JSON.parse(raw) : {};
  map[testId] = { ...result, completedAt: new Date().toISOString() };
  await AsyncStorage.setItem(KEY_RESULTS, JSON.stringify(map));
}

export async function getTestResult(testId: string): Promise<StoredResult | null> {
  const raw = await AsyncStorage.getItem(KEY_RESULTS);
  if (!raw) return null;
  const map: Record<string, StoredResult> = JSON.parse(raw);
  return map[testId] ?? null;
}
