import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { fetchPosts } from "./src/api/mockApi";
import { Post } from "./src/data/posts";
import { PostCard } from "./src/components/PostCard";
import {
  requestNotifPermissions,
  scheduleReminder,
  addResponseListener,
} from "./src/notifications";

export default function App() {
  // Added types for state variables to catch potential issues before runtime
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openedId, setOpenedId] = useState<string | null>(null);

  useEffect(() => {
    requestNotifPermissions().catch(() => {});
    const sub = addResponseListener((postId) => setOpenedId(postId));
    return () => sub.remove();
  }, []);

  const load = useCallback(
    async (p: number, mode: "append" | "replace") => {
      if (loading) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPosts(p);
        setNextPage(res.nextPage);
        setItems((prev) => {
          const merged = mode === "replace" ? res.items : [...prev, ...res.items];
          // dedupe by id
          const map = new Map(merged.map((x) => [x.id, x]));
          return Array.from(map.values());
        });
        setPage(p);
      } catch (e: any) {
        setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    load(1, "replace");
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    load(1, "replace").finally(() => setRefreshing(false));
  }, [load]);

  const onEndReached = useCallback(() => {
    if (nextPage && !loading) {
      load(nextPage, "append");
    }
  }, [nextPage, loading, load]);

  const selected = useMemo(
    () => items.find((i) => i.id === openedId) || null,
    [items, openedId]
  );

  const footer = () => (
    <View style={styles.footer}>
      {loading && <ActivityIndicator />}
      {!nextPage && !loading && items.length > 0 && (
        <Text style={styles.footerText}>No more items</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Media Feed</Text>
        {error ? (
          <Pressable onPress={() => load(page, "append")}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        ) : null}
      </View>
      {items.length === 0 && loading ? (
        <View style={styles.centered}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={items}
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onOpen={(p) => setOpenedId(p.id)}
              // This provides immediate visual confirmation to the user, improving UX.
              onRemind={async (p) => {
                const when = p.dueAt
                  ? new Date(p.dueAt)
                  : new Date(Date.now() + 5000);
                await scheduleReminder(p.id, p.title, when);
                alert(`Reminder scheduled for "${p.title}"!`); 
              }}
            />
          )}
          ListFooterComponent={footer}
          onEndReachedThreshold={0.6}
          onEndReached={onEndReached}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {selected && (
        <View style={styles.detailPanel}>
          <Text style={styles.detailTitle}>{selected.title}</Text>
          <Text style={styles.detailSub}>{selected.supplier}</Text>
          <Pressable onPress={() => setOpenedId(null)} style={styles.closeBtn}>
            <Text style={styles.closeTxt}>Close</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

// Best practices: Using StyleSheet for better performance and organization
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
  },
  retryText: {
    color: "crimson",
    fontWeight: "600",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#666",
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 8,
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  footerText: {
    color: "#666",
  },
  detailPanel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailTitle: {
    fontWeight: "700",
    fontSize: 16,
  },
  detailSub: {
    color: "#666",
    marginTop: 4,
  },
  closeBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  closeTxt: {
    color: "#43b0a1",
    fontWeight: "600",
  },
});