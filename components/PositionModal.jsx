import React, { useEffect, useState } from 'react';
import {Alert, Modal, Text, Pressable, View, TextInput} from 'react-native';
import { CloseIcon } from './Icons';
import { db } from '../FirebaseConfig';
import { collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { isInputEmpty, fetchSymbol } from '../functions/Functions';

export default function PositionModal({ showModal, setShowModal, readPositions, newPosition, currentId, currentSymbol, currentQuantity, currentBuyPrice }) {
    const [ symbol, setSymbol ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [ buyPrice, setBuyPrice ] = useState('');

    const savePosition = async () => {
        try {
            if ( isInputEmpty(symbol, 'Symbol') ) return;
            if ( isInputEmpty(quantity, 'Quantity') ) return;
            if ( isInputEmpty(buyPrice, 'Buy Price') ) return;
            if ( !parseFloat(quantity) ) return Alert.alert('', 'Quantity Should Be A Number');
            if ( !parseFloat(buyPrice) ) return Alert.alert('', 'Buy Price Should Be A Number');

            const data = await fetchSymbol(symbol);
            if ( !data ) {Alert.alert('', 'Symbol Not Found');  setSymbol(); return};

            const docRef = await addDoc(collection(db, 'positions'), {
                symbol: symbol.toUpperCase(),
                quantity: quantity,                    
                buyPrice: buyPrice
            });
            setSymbol('');
            setQuantity('');
            setBuyPrice('');
            Alert.alert('', 'Position Inserted');
            setShowModal(false);
            await readPositions();
        } catch ( error ) {
            console.error("Error adding document: ", error);
        }
    }

    const updatePosition = async () => {
        try {
            const docRef = doc(db, 'positions', currentId)
            await updateDoc(docRef, {
                symbol: symbol.toUpperCase(),
                quantity: quantity,
                buyPrice: buyPrice
            });
            setShowModal(false);
            setSymbol(''); 
            setQuantity(''); 
            setBuyPrice('');
            Alert.alert('', 'Position Updated');
            await readPositions();
        } catch ( error ) {
            console.error("Error deleting document: ", error);
        }
    }

    const deletePosition = async () => {
        try {
            await deleteDoc(doc(db, 'positions', currentId));
            setShowModal(false);
            setSymbol(''); 
            setQuantity(''); 
            setBuyPrice('');
            Alert.alert('', 'Position Deleted');
            await readPositions();
        } catch ( error ) {
            console.error("Error deleting document: ", error);
        }
    }

    useEffect( () => {
        if ( !newPosition ) {
            setSymbol(currentSymbol);
            setQuantity(currentQuantity);
            setBuyPrice(currentBuyPrice);
        }
    }, [newPosition, currentSymbol, currentQuantity, currentBuyPrice])

    return(
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setShowModal(!showModal);
          }}>
            <View className='flex-1 items-center justify-center bg-white'>
                <Pressable className='absolute right-2 top-4'
                onPress={ () => {
                    setShowModal(false); 
                    if ( newPosition ) {
                        setSymbol(''); 
                        setQuantity(''); 
                        setBuyPrice(''); 
                    }
                }}
                >
                    <CloseIcon size={75} />
                </Pressable>
                <Pressable className="border-black rounded-md border-2 w-[350] h-16 justify-center mt-10">
                    <TextInput
                    className="text-center text-4xl ml-12 w-[280]"
                    onChangeText={setSymbol}
                    value={symbol}
                    placeholder='Symbol'
                    />
                </Pressable>
                <Pressable className="border-black rounded-md border-2 w-[350] h-16 justify-center mt-10">
                    <TextInput
                    className="text-center text-4xl ml-12 w-[280]"
                    onChangeText={setQuantity}
                    value={quantity}
                    placeholder='Quantity'
                    />
                </Pressable>
                <Pressable className="border-black rounded-md border-2 w-[350] h-16 justify-center mt-10">
                    <TextInput
                    className="text-center text-4xl ml-12 w-[280]"
                    onChangeText={setBuyPrice}
                    value={buyPrice}
                    placeholder='Buy Price'
                    />
                </Pressable>

                {newPosition &&
                <Pressable className={`active:opacity-80 bg-yellow-500 border-2 border-black rounded-md p-2 w-60 h-15 items-center justify-center mt-10`}
                onPress={savePosition}
                >
                    <Text className="text-3xl text-center font-bold">SAVE</Text>
                </Pressable>
                }
                {!newPosition && 
                <Pressable className={`active:opacity-80 bg-yellow-500 border-2 border-black rounded-md p-2 w-60 h-15 items-center justify-center mt-10`}
                onPress={updatePosition}
                >
                    <Text className="text-3xl text-center font-bold">UPDATE</Text>
                </Pressable>
                }
                {!newPosition && 
                <Pressable className={`active:opacity-80 border-red-800 border-2 bg-red-500 rounded-md p-2 w-60 h-15 items-center justify-center mt-10`}
                onPress={deletePosition}
                >
                    <Text className="text-3xl text-center font-bold">DELETE</Text>
                </Pressable>
                }
            </View>
          </Modal>
    );
}