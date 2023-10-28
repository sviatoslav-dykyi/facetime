import { ActivityIndicator } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthProvider";

const AppLayout = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 100 }} />;
  }

  if (!session) {
    return <Redirect href={"/auth"} />;
  }

  return <Stack />;
};

export default AppLayout;
