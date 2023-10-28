npx create-expo-app@latest Facetime -t

npx expo install expo-dev-client
npx expo prebuild
npm run ios

npx expo install @stream-io/video-react-native-sdk
npx expo install @stream-io/react-native-webrtc
npx expo install @config-plugins/react-native-webrtc
npx expo install react-native-incall-manager
npx expo install react-native-svg
npx expo install @react-native-community/netinfo
npx expo install @notifee/react-native

npx expo prebuild --clean
npx expo run:ios --device

#db supabase
#db pass: 9h-66y%!?p5&nkS

npx expo install @supabase/supabase-js

npx supabase functions new stream-token
npx supabase functions deploy stream-token --project-ref zdmdpmqatefodnkfmfwx

npx supabase secrets set --env-file supabase/.env

#inside lambda folder
npm i stream-chat
npm i @supabase/supabase-js
zip -r deployment .