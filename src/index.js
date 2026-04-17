import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Must export a component named "App" for Expo Go compatibility
export function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
