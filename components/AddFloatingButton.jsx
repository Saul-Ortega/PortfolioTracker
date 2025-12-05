import React, {useState} from 'react';
import { View, Text, Pressable, TextInput } from "react-native";
import { AddIcon } from "./Icons";
import PositionModal from "./PositionModal";
import { readPositions } from '../functions/Functions';

export default function AddFloatingButton({ setPositions }) {
    const [ showModal, setShowModal ] = useState(false);

    return(
        <>
            <Pressable className="active:opacity-80 rounded-full border-2 border-black bg-purple-400 absolute right-2 bottom-6 size-20 justify-center items-center"
            onPress={() => setShowModal(true)}
            >
                <AddIcon size={60} />
            </Pressable>
    
            <PositionModal 
            showModal={showModal}
            setShowModal={setShowModal}
            newPosition={true}
            readPositions={() => readPositions(setPositions)}
            />
        </>
        
    );
}