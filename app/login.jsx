import { useState } from "react";
import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { UserIcon, PasswordIcon } from "../components/Icons";
import { router } from "expo-router";
import { auth } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { isInputEmpty } from "../functions/Functions";

export default function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const isValidLogin = () => {
        if ( isInputEmpty(email, 'Email') ) return;
        if ( isInputEmpty(password, 'Password') ) return;

        if ( !email.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) ) {
            Alert.alert('', 'Invalid Email');
            return false;
        }

        if ( password.length < 6 ) {
            Alert.alert('', 'Password Should Be Larger');
            return false;
        }

        return true;
    }

    const signIn = async () => {
        try {
            if ( isValidLogin() ) {
                const user = await signInWithEmailAndPassword(auth, email, password);
                if ( user ) router.replace('/user');
            }
        } catch ( error ) {
            Alert.alert('', 'Incorrect Email Or Password');
        }
    }

    const signUp = async () => {
        try {
            if ( isValidLogin() ) {
                const user = await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert('', 'You Have Been Signed Up!')
            }
        } catch ( error ) {
            Alert.alert('', 'Sign Up Failed');
        }
    }

    return(
        <View className="flex-1 items-center bg-white">
            <Text className="text-7xl h-20 text-yellow-500 mt-20">Login</Text>
            <Pressable className="border-black rounded-md border-2 w-[350] h-16 justify-center mt-32">
                <View className="absolute bg-purple-400 rounded-md size-9 border-2 border-black items-center justify-center ml-2">
                    <UserIcon />
                </View>
                <TextInput 
                className="text-center text-4xl ml-12 w-[280]"
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
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
            <Pressable className={`active:opacity-80 bg-purple-500 border-2 border-black rounded-md p-2 w-60 h-15 items-center justify-center mt-10`}
            onPress={signIn}
            >
                <Text className="text-3xl text-center font-bold">SIGN IN</Text>
            </Pressable>
            <Pressable className={`active:opacity-80 bg-yellow-500 border-2 border-black rounded-md p-2 w-60 h-15 items-center justify-center mt-10`}
            onPress={signUp}
            >
                <Text className="text-3xl text-center font-bold">SIGN UP</Text>
            </Pressable>
        </View>
    );
}