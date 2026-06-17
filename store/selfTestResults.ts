import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "selftest_completed";

export async function markTestCompleted(testId: string): Promise<void> {
  const raw = await AsyncStorage.getItem(KEY);
  const list: string[] = raw ? JSON.parse(raw) : [];
  if (!list.includes(testId)) {
    await AsyncStorage.setItem(KEY, JSON.stringify([...list, testId]));
  }
}

export async function getCompletedTests(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : [];
}
