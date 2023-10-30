import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Platform, StyleSheet, Text } from "react-native";
import { View } from "../../components/Themed";
import {
  CallContent,
  CallTopView,
  RingingCallContent,
  StreamCall,
  useCalls,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";
import { router } from "expo-router";

const callId = "default_4b1928cb-cc10-44dc-9e8c-ece6d1e1fa32";

export default function CallScreen() {
  // 4 types of a call

  const calls = useCalls();
  const call = calls[0];

  // const [call] = useState(() => client?.call("default", callId));

  // useEffect(() => {
  //   // if callId is already exists it will join or it will create new call
  //   call?.join({ create: true });
  // }, [call]);

  if (!call) {
    return <Text>Call not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <StreamCall call={call}>
        <RingingCallContent
          CallTopView={() => <CallTopView title={`ID: ${call.id}`} />}
          //onHangupCallHandler={() => router.back()}
        />
      </StreamCall>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
