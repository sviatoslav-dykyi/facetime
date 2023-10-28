import { Pressable, View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { router } from "expo-router";
import { supabase } from "../../lib/supabase";

function genRandomString(length: number) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charLength = chars.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

const HomeScreen = () => {
  const client = useStreamVideoClient();

  const onCreateCall = () => {
    if (!client) return;

    const callId = genRandomString(5);
    const call = client.call("default", callId);
    call.join({ create: true });
    router.push("/call");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Facetime" }} />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable onPress={onCreateCall} style={styles.button}>
          <Text>Create Call</Text>
        </Pressable>
        <Pressable onPress={() => router.push("/join")} style={styles.button}>
          <Text>Join Call</Text>
        </Pressable>
      </View>
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  button: {
    backgroundColor: "gainsboro",
    padding: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
});

export default HomeScreen;
