import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function LogoutComponent() {
    const router = useRouter();

    function logout() {
        router.replace("/login")
    }

    return <Pressable onPress={logout}>
        <FontAwesome name="sign-out" size={24} style={{ marginRight: 16}}></FontAwesome>
    </Pressable>
}