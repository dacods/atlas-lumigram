import { useAuth } from "@/components/AuthProvider";
import { Link, useRouter } from "expo-router";
import { use, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();

    async function login() {
        try {
            await auth.login(email, password);
            router.replace("/(tabs)");
        } catch (error) {
            alert("Email or password is incorrect.");
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#00003A" }}>
            <Image source={require("../assets/images/logo.png")} style={{ height: 100, width: 260, alignItems: "center", marginBottom: 40}} resizeMode="contain"></Image>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 15}}>Login</Text>
            <TextInput placeholder="Email" placeholderTextColor="#ccc" keyboardType="email-address" autoCapitalize="none" style={{width: "95%", borderWidth: 3, borderColor: "#00E2B6", borderRadius: 6, padding: 16, marginBottom: 12, color: "white"}} value={email} onChangeText={setEmail}></TextInput>
            <TextInput placeholder="Password" placeholderTextColor="#ccc" secureTextEntry autoCapitalize="none" style={{width: "95%", borderWidth: 3, borderColor: "#00E2B6", borderRadius: 6, padding: 16, marginBottom: 25, color: "white"}} value={password} onChangeText={setPassword}></TextInput>
            <Pressable onPress={login} style={{width: "95%", backgroundColor: "#00E2B6", padding: 12, borderRadius: 6, alignItems: "center", justifyContent: "center", marginBottom: 12}}>
                <Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Sign in</Text>
            </Pressable>
            <Link href="/register" replace style={{width: "95%", padding: 12, borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "black"}}>
                <Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Create a new account</Text>
            </Link>
            
        </View>
    )
}
