import { router } from "expo-router";
import { auth } from "../../FirebaseConfig";
import { getAuth } from "firebase/auth";
import { View, Text, Pressable } from "react-native";
import { ProfileIcon } from "../../components/Icons";

export default function User() {
    getAuth().onAuthStateChanged(user => {
        if ( !user ) router.replace('/');
    });

    const user = {
        email: getAuth().currentUser.email || '',
        date: `${new Date(getAuth().currentUser.metadata.creationTime).getFullYear()}-${new Date(getAuth().currentUser.metadata.creationTime).getMonth() + 1}-${new Date(getAuth().currentUser.metadata.creationTime).getDate()}` || ''
    }

    return(
        <View className="flex-1 items-center bg-white">
            <Text className="text-7xl text-yellow-500 mt-20">User</Text>
            <View className="rounded-full border-2 border-black mt-10">
                <ProfileIcon size={180} />
            </View>
            <View className="border-2 rounded-md mt-10 w-[280] h-12 items-center justify-center">
                <Text className="text-3xl">{user.email}</Text>
            </View>
            <View className="border-2 rounded-md mt-10 w-[280] h-12 items-center justify-center">
                <Text className="text-3xl">{user.date}</Text>
            </View>
            <Pressable className="active:opacity-80 border-2 border-red-800 rounded-md bg-red-500 mt-10 w-40"
            onPress={() => auth.signOut()}
            >
                <Text className="text-3xl text-center">Exit</Text>
            </Pressable>
        </View>
    );
}