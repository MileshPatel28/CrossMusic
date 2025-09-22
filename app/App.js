import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textDefault}>CrossMusic!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'rgba(21, 21, 21, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDefault: {
    color: 'rgba(61, 108, 255, 1)',
  }
});
