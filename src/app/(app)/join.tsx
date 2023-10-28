import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { router } from "expo-router";

const JoinCallScreen = () => {
  const [callId, setCallId] = useState("");
  const client = useStreamVideoClient();
  const onJoin = async () => {
    if (!client) return;

    const call = client.call("default", callId);
    try {
      await call.join();
      router.push("/call");
    } catch (error: any) {
      Alert.alert("Failed to join", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join call by id</Text>
      <TextInput
        value={callId}
        onChangeText={setCallId}
        placeholder="call id"
        style={styles.input}
      />
      <Button title="Join" onPress={onJoin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 20, fontWeight: "500", alignItems: "center" },
  input: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 10,
    fontSize: 16,
  },
});

export default JoinCallScreen;
