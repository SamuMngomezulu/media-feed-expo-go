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
  Modal,
  TextInput, // New import for the search input
} from "react-native";
import { fetchPosts } from "./src/api/mockApi";
import { Post } from "./src/data/posts";
import { PostCard } from "./src/components/PostCard";
import {
  requestNotifPermissions,
  scheduleReminder,
  addResponseListener,
} from "./src/notifications";
import { formatZar } from "./src/utils/money";

export default function App() {
  const [items, setItems] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

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

  // Filter items based on searchQuery
  const filteredItems = useMemo(() => {
    if (!searchQuery) {
      return items;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.supplier.toLowerCase().includes(lowerCaseQuery)
    );
  }, [items, searchQuery]);

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
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search posts..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {filteredItems.length === 0 && loading ? (
        <View style={styles.centered}>
          <ActivityIndicator />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={filteredItems} // Use filteredItems here
          keyExtractor={(it) => it.id}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              onOpen={(p) => setOpenedId(p.id)}
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

      <Modal
        animationType="slide"
        transparent={false}
        visible={!!selected}
        onRequestClose={() => {
          setOpenedId(null);
        }}
      >
        {selected && (
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selected.title}</Text>
            <Text style={styles.modalSupplier}>{selected.supplier}</Text>
            <Text style={styles.modalAmount}>{formatZar(selected.amountZar)}</Text>
            <Pressable onPress={() => setOpenedId(null)} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>Close</Text>
            </Pressable>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalSupplier: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  modalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  closeBtn: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeTxt: {
    color: "#fff",
    fontWeight: "600",
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});