import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Image, ImageErrorEventData, ImageLoadEventData } from "expo-image";
import { Post } from "../data/posts";
import { isDueWithin24h } from "../utils/time";
import { formatZar } from "../utils/money";
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Assuming this icon library is available

type Props = {
  post: Post;
  onRemind?: (post: Post) => void;
  onOpen?: (post: Post) => void;
};

export const PostCard: React.FC<Props> = ({ post, onRemind, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Prefetch full image once mounted.
  // Add a catch to the prefetch to prevent app crash on invalid URL.
  useEffect(() => {
    Image.prefetch(post.imageUrl).catch(() => {});
  }, [post.imageUrl]);

  /**
   * @xml
   * @file PostCard.tsx
   * @description Handles image loading and error states.
   * We use the `onLoad` and `onError` callbacks to manage the `loaded` and `isError` state.
   * This allows us to display a loading indicator, and if that fails, an error message.
   * @change
   * Added `onLoad` and `onError` callbacks to the `Image` component.
   * Introduced a new `isError` state to control the visibility of the error placeholder.
   * @endxml
   */
  const handleLoad = (event: ImageLoadEventData) => {
    setLoaded(true);
    setIsError(false);
  };

  const handleError = (event: ImageErrorEventData) => {
    setLoaded(true);
    setIsError(true);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${post.title}`}
      onPress={() => onOpen?.(post)}
      style={styles.card}
    >
      <View style={styles.imageWrap}>
        {!loaded && !isError && (
          <View style={styles.placeholder}>
            <ActivityIndicator />
          </View>
        )}
        {isError && (
          <View style={styles.errorPlaceholder}>
            <MaterialCommunityIcons name="image-broken-variant" size={48} color="#aaa" />
            <Text style={styles.errorText}>Failed to load image</Text>
          </View>
        )}
        <Image
          style={styles.image}
          source={{ uri: post.imageUrl }}
          placeholder={{ uri: post.thumbnailUrl }}
          transition={500}
          contentFit="cover"
          onLoad={handleLoad}
          onError={handleError}
        />
      </View>
      <View style={styles.meta}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.sub}>
          {post.supplier} - {formatZar(post.amountZar)}
        </Text>
        {isDueWithin24h(post.dueAt) && (
          <Pressable
            onPress={() => onRemind?.(post)}
            accessibilityRole="button"
            accessibilityLabel={`Remind me for ${post.title}`}
            style={styles.remindBtn}
          >
            <Text style={styles.remindTxt}>Remind me</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 2,
  },
  imageWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#eee",
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  errorPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    marginTop: 8,
    color: '#aaa',
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  meta: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: "#666",
  },
  remindBtn: {
    marginTop: 8,
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  remindTxt: {
    color: "#fff",
    fontWeight: "bold",
  },
});