import { Alert } from "react-native";
import { collection, getDocs } from "firebase/firestore"; 
import { db } from '../FirebaseConfig';

export const isInputEmpty = (input, inputField) => {
    if ( input.trim() === '' ) {
        Alert.alert('', `${inputField} Should Not Be Empty`);
        return true;
    }

    return false;
}

export const fetchSymbol = async (symbol) => {
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.EXPO_PUBLIC_ALPHA_VANTAGE_API_KEY}`)
    //return fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo')
    .then( ( response ) => response.json())
    .then( ( data ) => {
        if ( data["Global Quote"] && data["Global Quote"]["01. symbol"] ) return data;

        return undefined;
    })
}

export const readPositions = async (setPositions) => {
    const rawData = await getDocs(collection(db, 'positions'));
    const data = rawData.docs.map( doc => ({
        ...doc.data(),
        id: doc.id,
    }) )
    setPositions(data);
}