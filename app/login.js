import { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { UserIcon, PasswordIcon } from "../components/Icons";
import { Link } from "expo-router";

export default function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return(
        <View className="flex-1 items-center">
            <Text className="text-7xl text-yellow-500 mt-28">Login</Text>
            <Pressable className="border-black rounded-md border-2 w-[350] h-16 justify-center mt-32">
                <View className="absolute bg-purple-400 rounded-md size-9 border-2 border-black items-center justify-center ml-2">
                    <UserIcon />
                </View>
                <TextInput 
                className="text-center text-4xl ml-12 w-[280]"
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                />
            </Pressable>
            <Pressable className="border-black rounded-md border-2 w-[350] h-16 justify-center mt-6">
                <View className="absolute bg-purple-400 rounded-md size-9 border-2 border-black items-center justify-center ml-2">
                    <PasswordIcon />
                </View>
                <TextInput 
                className="text-center text-4xl ml-12 w-[280]"
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                />
            </Pressable>
            <Link href="/" asChild className="mt-10">
                <Pressable className={`active:opacity-80 bg-purple-500 border-2 border-black rounded-md p-2 w-60 h-15 items-center justify-center`}>
                    <Text className="text-3xl text-center font-bold">LOGIN</Text>
                </Pressable>
            </Link>
        </View>
    );
}