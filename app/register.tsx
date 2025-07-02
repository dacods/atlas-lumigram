import { useAuth } from "@/components/AuthProvider";
import { Link, router, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const router = useRouter();

    async function register() {
        try {
        await auth.register(email, password);
        router.replace("/(tabs)");
        }catch (error) {
            alert("Unable to create account.");
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#00003A" }}>
            <Image source={require("../assets/images/logo.png")} style={{ height: 100, width: 260, alignItems: "center", marginBottom: 40}} resizeMode="contain"></Image>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 15}}>Register</Text>
            <TextInput placeholder="Email" placeholderTextColor="#ccc" keyboardType="email-address" autoCapitalize="none" style={{width: "95%", borderWidth: 3, borderColor: "#00E2B6", borderRadius: 6, padding: 16, marginBottom: 12, color: "white"}} value={email} onChangeText={setEmail}></TextInput>
            <TextInput placeholder="Password" placeholderTextColor="#ccc" keyboardType="email-address" autoCapitalize="none" style={{width: "95%", borderWidth: 3, borderColor: "#00E2B6", borderRadius: 6, padding: 16, marginBottom: 25, color: "white"}} value={password} onChangeText={setPassword}></TextInput>
            <Pressable onPress={register} style={{width: "95%", backgroundColor: "#00E2B6", padding: 12, borderRadius: 6, alignItems: "center", justifyContent: "center", marginBottom: 12}}>
                <Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Create Account</Text>
            </Pressable>
            <Link href="/login" replace style={{width: "95%", padding: 12, borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "black"}}>
                <Text style={{color: "white", fontWeight: "bold", textAlign: "center"}}>Login to existing account</Text>
            </Link>
        </View>
    )
}