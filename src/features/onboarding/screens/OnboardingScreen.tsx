import Screen from '@shared/ui/Screen';
import Text from '@shared/ui/Text';

export default function OnboardingScreen() {
  return (
    <Screen style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text tx="settings.title" variant="h2" />
      <Text variant="caption" color="text">v1.0.0</Text>
      <Text tx="common.ok" variant="bodyItalic" />
    </Screen>
  );
}
