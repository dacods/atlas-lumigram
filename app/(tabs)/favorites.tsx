import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { useAuth } from "@/components/AuthProvider";
import firestore from "@/lib/firestore";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const { width } = Dimensions.get('window');

export default function Tab() {
  const auth = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [showCaptions, setShowCaptions] = useState<{ [key: string]: boolean }>({});

  const loadFavorites = useCallback(async () => {
    if (!auth.user) return;

    setRefreshing(true);
    const { posts: newPosts, lastDoc: newLastDoc } = await firestore.getUserFavorites(auth.user.uid);
    setPosts(newPosts);
    setLastDoc(newLastDoc);
    setRefreshing(false);
  }, [auth.user]);

  const loadMore = async () => {
    if (!auth.user || loadingMore || !lastDoc) return;

    setLoadingMore(true);
    const { posts: morePosts, lastDoc: newLastDoc } = await firestore.getUserFavorites(auth.user.uid, lastDoc);
    setPosts((prev) => [...prev, ...morePosts]);
    setLastDoc(newLastDoc);
    setLoadingMore(false);
  };

  useEffect(() => {
    loadFavorites();
  }, [auth.user]);

  const handleLongPress = (item: any) => {
    setShowCaptions((prev) => ({ ...prev, [item.id]: true }));
  };

  const handleDoubleTap = (item: any) => {
    Alert.alert("Double tapped!", `Image ID: ${item.id}`);
  };

  return (
    <FlashList
      data={posts}
      estimatedItemSize={400}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadFavorites} />}
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
          <TapGestureHandler numberOfTaps={2} onActivated={() => handleDoubleTap(item)}>
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
