import React from 'react';
import { Text, StyleSheet,ImageBackground,View} from "react-native"
import { Container, Content, Button} from 'native-base';
import Headers from '../components/Header';
import bgpic from '../assets/red.jpg';

export default function Home({navigation}){

  const enter=()=>{
    navigation.navigate('Login')
  }
    const pic=bgpic
    return(
        <Container>
        <ImageBackground source={pic} style={{resizeMode: "cover",flex:1,}}>
            <View style={{backgroundColor:'rgba(0, 0, 0, 0.5)',flex:1,alignItems:'center',justifyContent:'center'}}>
           <Text style={{color:'#fff',fontSize:55,textDecorationLine:'underline'}}>BLOOD BANK</Text>
           <Text style={{color:'#fff',fontSize:21,color:'rgba(255, 255, 255, 0.7)'}}>Donate blood share life</Text>
           <Button rounded block style={styles.button} onPress={enter}><Text style={styles.text}>Enter Now</Text></Button>
           </View>
        </ImageBackground>
    </Container>
    );
}
const styles = StyleSheet.create({
    button: {
      marginLeft: 40,
      marginRight: 40,
      marginTop: 40,
      marginBottom: 20,
      backgroundColor: '#bb0a1e',
      alignItems: 'center',
      justifyContent: 'center',
  
    },
     text: {
    color: '#fff',
    fontSize: 20,
  },
})