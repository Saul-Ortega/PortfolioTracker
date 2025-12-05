import { View, Text, Pressable, TextInput } from "react-native";
import { fetchSymbol } from "../functions/Functions";
import { useEffect, useState } from "react";

export default function PositionCard({ symbol, quantity, buyPrice }) {
    const [ lastPrice, setLastPrice ] = useState();

    useEffect( () => {
        const fetchLastPrice = async () => {
            const data = await fetchSymbol(symbol);
            if ( data ) setLastPrice(data["Global Quote"]["05. price"]);
        }

        fetchLastPrice();
    }, [symbol]);

    return (
        <View className="flex-row p-6 items-center justify-center bg-white">
            <Text className="text-2xl w-[87] text-center">{symbol}</Text>
            <Text className="text-2xl w-[87] text-center">{parseFloat(quantity).toFixed(2)}</Text>
            <Text className="text-2xl w-[87] text-center">{parseFloat(buyPrice).toFixed(2)}</Text>
            <Text className="text-2xl w-[87] text-center">{lastPrice ? parseFloat(lastPrice).toFixed(2) : ''}</Text>
        </View>
    );
}