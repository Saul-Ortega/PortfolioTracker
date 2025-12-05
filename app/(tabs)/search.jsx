import { View, Text, Pressable, TextInput, Alert } from "react-native";
import { SearchIcon } from "../../components/Icons";
import { useState } from "react";
import { isInputEmpty, fetchSymbol } from "../../functions/Functions";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";

export default function Search() {
    getAuth().onAuthStateChanged(user => {
        if ( !user ) router.replace('/');
    });
    
    const [ symbol, setSymbol ] = useState('');
    const [ position, setPosition ] = useState();

    const handleSearch = async () => {
        if ( isInputEmpty(symbol, "Symbol") ) return setPosition();
        const data = await fetchSymbol(symbol);
        if ( !data ) {Alert.alert('', 'Symbol Not Found');  setPosition(); return};
        setPosition( data );
    }
    return(
        <View className="flex-1 items-center bg-white">
            <Text className="text-7xl text-yellow-500 mt-20">Search</Text>
            <Pressable className="border-black rounded-md border-2 w-[350] h-16 justify-center mt-6">
                <View className="absolute bg-purple-400 rounded-md size-9 border-2 border-black items-center justify-center ml-2">
                    <SearchIcon />
                </View>
                <TextInput 
                className="text-center text-4xl ml-12 w-[280]"
                onChangeText={setSymbol}
                value={symbol}
                placeholder="Symbol"
                />
            </Pressable>
            <Pressable className={`active:opacity-80 bg-purple-500 border-2 border-black rounded-md p-2 w-60 h-15 items-center justify-center mt-10`}
            onPress={handleSearch}
            >
                <Text className="text-3xl text-center font-bold">SEARCH</Text>
            </Pressable>

            {position ? 
            <View className="border-2 border-black rounded-md mt-7 p-6 bg-purple-300">
                <View className="mt-4 border-2 border-black rounded-md p-1 flex flex-row justify-center bg-white">
                    <Text className="text-2xl">Symbol -&#62; </Text>
                    <Text className="text-2xl font-bold">{position["Global Quote"]["01. symbol"]}</Text>
                </View>
                <View className="mt-4 border-2 border-black rounded-md p-1 flex flex-row justify-center bg-white">
                    <Text className="text-2xl">Price -&#62; </Text>
                    <Text className="text-2xl font-bold">{parseFloat(position["Global Quote"]["05. price"]).toFixed(2)}</Text>
                </View>
                <View className="mt-4 border-2 border-black rounded-md p-1 flex flex-row justify-center bg-white">
                    <Text className="text-2xl">Change Percent -&#62; </Text>
                    <Text className="text-2xl font-bold">{parseFloat(position["Global Quote"]["10. change percent"]).toFixed(2)}%</Text>
                </View>
                <View className="mt-4 border-2 border-black rounded-md p-1 flex flex-row justify-center bg-white">
                    <Text className="text-2xl">Date -&#62; </Text>
                    <Text className="text-2xl font-bold">{position["Global Quote"]["07. latest trading day"]}</Text>
                </View>
            </View>
            :
            <></>    
            }
        </View>
    );
}