import { StreamVideoClient, User } from "@stream-io/video-react-native-sdk";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY || "";
const userId = "sviatoslav";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic3ZpYXRvc2xhdiJ9.h6jY6loU9DNAB8wlRHa8sD5-bpoC9lGb0GfzwVGHfOU";
const user: User = { id: userId };

// в системі створиться два юзака - перший який залогінився на стрім в браузері
// другий - це юзак який ми вказала в userId
export const client = new StreamVideoClient({ apiKey, user, token });
