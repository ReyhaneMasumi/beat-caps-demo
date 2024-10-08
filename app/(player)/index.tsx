import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import VideoPlayer from '@/components/Video';

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      <VideoPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
