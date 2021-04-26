import React,{useState,useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import { loadAsync } from "expo-font";
import Navigations from './routes/routes'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const [isReady,setAppReady]=useState(false);

  useEffect(() => {
    loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    }).then(() => {
      setAppReady(true)
    })
  }, [])

  if(!isReady){
    return <Text>Loading...</Text>
  }
  else{
    return (
  <Navigations/>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

