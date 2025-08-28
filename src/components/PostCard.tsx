import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { Post } from "../data/posts";
import { isDueWithin24h } from "../utils/time";
import { formatZar } from "../utils/money";

type Props = {
  post: Post;
  onRemind?: (post: Post) => void;
  onOpen?: (post: Post) => void;
};

export const PostCard: React.FC<Props> = ({ post, onRemind, onOpen }) => {
  const [loaded, setLoaded] = useState(false);

  // Prefetch full image once mounted
  useEffect(() => {
    Image.prefetch(post.imageUrl).catch(() => {});
  }, [post.imageUrl]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${post.title}`}
      onPress={() => onOpen?.(post)}
      style={styles.card}
    >
      <View style={styles.imageWrap}>
        {!loaded && (
          <View style={styles.placeholder}>
            <ActivityIndicator />
          </View>
        )}
        <Image
          style={styles.image}
          source={{ uri: post.imageUrl }}
          placeholder={{ uri: post.thumbnailUrl }}
          transition={200}
          cachePolicy="disk"
          onLoad={() => setLoaded(true)}
          contentFit="cover"
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
  image: {
    width: "100%",
    height: "100%",
  },
  meta: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  sub: {
    color: "#666",
  },
  remindBtn: {
    marginTop: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#43b0a1",
    borderRadius: 8,
  },
  remindTxt: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});