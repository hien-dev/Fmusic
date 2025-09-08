import { OnboardingScreen } from "@features/onboarding";
import { useRouter } from "expo-router";

export default function OnboardingRoute() {
  const router = useRouter();
  return <OnboardingScreen onNext={() => router.push("/(tabs)/search")} />;
}
