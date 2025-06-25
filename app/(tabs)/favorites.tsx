import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { favoritesFeed } from '../../placeholder';

const { width } = Dimensions.get('window');

export default function Tab() {
  const [showCaptions, setShowCaptions] = useState<{ [key: string]: boolean }>({});

  const handleLongPress = (item: any) => {
    setShowCaptions((prev) => ({ ...prev, [item.id]: true }));
  };

  const handleDoubleTap = (item: any) => {
    Alert.alert('Double tapped!', `Image ID: ${item.id}`);
  };

  return (
    <FlashList
      data={favoritesFeed}
      estimatedItemSize={400}
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
      renderItem={({ item }) => (
        <LongPressGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              handleLongPress(item);
            }
          }}
          minDurationMs={500}
        >
          <TapGestureHandler
            numberOfTaps={2}
            onActivated={() => handleDoubleTap(item)}
          >
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              {showCaptions[item.id] && (
                <View style={styles.captionOverlay}>
                  <Text style={styles.captionText}>{item.caption}</Text>
                </View>
              )}
            </View>
          </TapGestureHandler>
        </LongPressGestureHandler>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 12,
    backgroundColor: '#fff',
  },
  image: {
    width: width - 24,
    height: width - 24,
    borderRadius: 16,
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 6,
    borderRadius: 6,
  },
  captionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
