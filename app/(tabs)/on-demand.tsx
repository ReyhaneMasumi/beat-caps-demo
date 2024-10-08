import { Link } from 'expo-router';
import { useAtom } from 'jotai';
import { Button, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';

import { commonStyles as styles } from '@/constants/general-styles';
import { subtitleLinkState, videoLinkState } from '@/atoms';

export default function TabTwoScreen() {
  const [text, onChangeText] = useAtom(videoLinkState);
  const [textCap, onChangeTextCap] = useAtom(subtitleLinkState);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please Enter Music / Video and Caption Link
      </Text>
      <View
        style={styles.separator}
        lightColor='#eee'
        darkColor='rgba(255,255,255,0.1)'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder='Music / Video link'
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeTextCap}
        value={textCap}
        placeholder='Caption link'
      />
      <View style={styles.wrapper}>
        <Link href='/(player)' style={styles.link}>
          Submit
        </Link>
        <Button
          title='Clear'
          onPress={() => {
            onChangeText('');
            onChangeTextCap('');
          }}
        ></Button>
      </View>
    </View>
  );
}
