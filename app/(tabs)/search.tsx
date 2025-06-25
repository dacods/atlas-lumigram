import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Text>Tab [Search]</Text>
      <Link href="/profile/1"><Text>Profile 1</Text></Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
