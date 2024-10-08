import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { Button, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';

import { commonStyles as styles } from '@/constants/general-styles';
import { videoLinkState } from '@/atoms';

export default function TabOneScreen() {
  const [text, onChangeText] = useAtom(videoLinkState);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please Enter a HLS Stream Link</Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder='HLS stream link'
      />
      <View style={styles.wrapper}>
        <Link href='/(player)' style={styles.link}>
          Submit
        </Link>
        <Button title='Clear' onPress={() => onChangeText('')}></Button>
      </View>
    </View>
  );
}
