import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthProvider";
import { User } from "@supabase/supabase-js";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { router } from "expo-router";
import { genRandomString } from "../../utils";

const ContactsScreen = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const { session } = useAuth();
  const client = useStreamVideoClient();

  useEffect(() => {
    const fetchProfiles = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*");
      if (!profiles || error) return;
      setProfiles(profiles?.filter((p) => p.id !== session?.user.id));
    };
    fetchProfiles();
  }, [session]);

  const onUserPressed = (user: User) => {
    if (!client || !session) return;

    const callId = genRandomString(5);

    client.call("default", callId).getOrCreate({
      ring: true,
      data: { members: [{ user_id: session?.user.id }, { user_id: user.id }] },
    });

    const call = client.call("default", callId);
    call.join({ create: true });
    router.push("/call");
  };

  return (
    <FlatList
      data={profiles}
      renderItem={({ item, index }) => (
        <Text
          onPress={() => onUserPressed(item)}
          style={{
            padding: 10,
            margin: 5,
            backgroundColor: "#fff",
            fontSize: 16,
          }}
        >
          {item.id}
        </Text>
      )}
      ListHeaderComponent={() => <Text>My id: {session?.user.id}</Text>}
    />
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({});
