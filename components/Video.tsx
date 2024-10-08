import Video, {
  SelectedTrackType,
  TextTrackType,
  type VideoRef,
} from 'react-native-video';
import { useRef, useState } from 'react';
import { StyleSheet, Vibration } from 'react-native';
import { useAtomValue } from 'jotai';
import { Redirect } from 'expo-router';

import { subtitleLinkState, videoLinkState } from '@/atoms';
import { View } from '@/components/Themed';

export default function VideoPlayer() {
  const ref = useRef<VideoRef>(null);
  const videoLink = useAtomValue(videoLinkState);
  const subtitleLink = useAtomValue(subtitleLinkState);

  const [show, setShow] = useState(false);

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  if (videoLink?.length < 1) return <Redirect href='/(tabs)' />;

  return (
    <View style={styles.contentContainer}>
      {show && <View style={styles.redBall}></View>}
      <Video
        ref={ref}
        controls={true}
        source={{
          uri: videoLink,
          textTracks: [
            {
              title: 'English CC',
              language: 'en',
              type: TextTrackType.VTT, // "text/vtt"
              uri: subtitleLink,
            },
          ],
        }}
        selectedTextTrack={{
          type: SelectedTrackType.TITLE,
          value: 'English CC',
        }}
        onTextTrackDataChanged={(e) => {
          console.log('🚀 ~ VideoPlayer ~ e:', e);
          setShow(true);
          // instead of vibration in Simulator
          setTimeout(() => {
            setShow(false);
          }, 1500);
          Vibration.vibrate(2 * ONE_SECOND_IN_MS);
          Vibration.vibrate(PATTERN);
        }}
        // onSeek={(e) => {
        //   console.log('🚀 ~ VideoPlayer ~ seek:', e);
        // }}
        // onTimedMetadata={(e) => {
        //   console.log('🚀 ~ VideoPlayer ~ meta:', e);
        // }}
        // onError={(error) => {
        //   console.log('🚀 ~ VideoPlayer ~ error:', error);
        // }}
        style={styles.backgroundVideo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 50,
  },
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: '40%',
    top: 200,
  },
  redBall: {
    position: 'absolute',
    top: 150,
    width: 5,
    height: 5,
    borderRadius: 10,
    backgroundColor: 'red',
    padding: 10,
  },
});
