import { useAuthContext } from "@/src/auth/authContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PostImage from "@/assets/images/post-it.png";

const HomeScreen = () => {
  const router = useRouter();

  const { user, loading } = useAuthContext();
  useEffect(() => {
    if (!loading && user) {
      router.replace("/notes");
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          <Image source={PostImage} style={styles.image} />
          <Text style={styles.title}>Welcome to Notes App.</Text>
          <Text style={styles.subtitle}>
            Capture your thoughts anytime, anywhere.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/notes")}
          >
            <Text style={styles.buttonText}>get started</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#f3f3f3",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default HomeScreen;
