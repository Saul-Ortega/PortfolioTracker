import { View, Text, Pressable, ScrollView } from "react-native";
import PositionCard from "../../components/PositionCard";
import AddFloatingButton from "../../components/AddFloatingButton";
import { useEffect, useState } from "react";
import PositionModal from "../../components/PositionModal";
import { readPositions } from "../../functions/Functions";
import { getAuth } from "firebase/auth";
import { router } from "expo-router";

export default function Portfolio() {
    getAuth().onAuthStateChanged(user => {
        if ( !user ) router.replace('/');
    });

    const [ positions, setPositions ] = useState();
    const [ showModal, setShowModal ] = useState(false);
    const [ selectedPosition, setSelectedPosition ] = useState('');

    const showPositionModal = (selectedPosition) => {
        setSelectedPosition(selectedPosition);
        setShowModal(true);
    }

    useEffect( () => {
        readPositions(setPositions);
    }, [])
    return(
        <View className="flex-1 items-center bg-white">
            <Text className="text-7xl text-yellow-500 mt-20">Portfolio</Text>

            <View className="border-2 border-black rounded-md bg-yellow-200 w-[350]">
                <View className="flex-row p-6 items-center justify-center">
                    <Text className="text-xl w-[80] text-center font-bold">{"Symbol"}</Text>
                    <Text className="text-xl w-[87] text-center font-bold">{"Quantity"}</Text>
                    <Text className="text-xl w-[87] text-center font-bold">{"Buy Price"}</Text>
                    <Text className="text-xl w-[87] text-center font-bold">{"Last Price"}</Text>
                </View>
                <ScrollView>
                { positions && positions.map( position => (
                    <Pressable
                    key={position.id}
                    onPress={ () => showPositionModal(position) }
                    >
                        <PositionCard key={position.id} symbol={position.symbol} quantity={position.quantity} buyPrice={position.buyPrice} />
                    </Pressable>
                ) )}
                </ScrollView>
            </View>

            <AddFloatingButton setPositions={setPositions} />

            {showModal && selectedPosition && 
            <PositionModal
            showModal={showModal}
            setShowModal={setShowModal}
            newPosition={false}
            currentId={selectedPosition.id}
            currentSymbol={selectedPosition.symbol}
            currentQuantity={selectedPosition.quantity}
            currentBuyPrice={selectedPosition.buyPrice}
            readPositions={() => readPositions(setPositions)}
            />
            }
        </View>
    );
}