import React, { useState, useEffect } from 'react';
import { Text, StyleSheet,TouchableOpacity,Alert} from "react-native"
import { Container, Content, Form, Item, Input, Label, Button, View } from 'native-base';
import Headers from '../components/Header';
import axios from 'axios';
import bgpic from '../assets/red.jpg';


export default function Login({navigation}){
 
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    


const signup=()=>{
navigation.navigate('Signup');
}
const login=()=>{
    axios({
        method:'post',
        url: "http://192.168.0.107:3009/login",
        data:{
                email:email,
                password:password,
        },
        withCredentials:true,
      }).then((res)=>{
          if(!res.status===400){
              console.log("data is not comming")
          }
          else{
            navigation.navigate('Tabs');
          }
      }).catch((err)=>{
        console.log(err)
      })
    }
const bgimage=bgpic;

    return (
        <Container>
            <Headers />
            <Content style={{backgroundColor:'rgba(108, 122, 137, 0.15)'}}>
                <Text style={styles.signup}>Login Form</Text>
                <View style={styles.main}>
                <Form>
                    <Item floatingLabel style={{borderColor:'#000', marginRight:15,marginBottom:10}}>
                        <Label>Email</Label>
                        <Input keyboardType="email-address" onChangeText={emails=>setEmail(emails)}/>
                    </Item>
                    <Item floatingLabel style={{borderColor:'#000', marginRight:15,marginBottom:10}}>
                        <Label>Password</Label>
                        <Input secureTextEntry onChangeText={passwords=>setPassword(passwords)}/>
                    </Item>
                    <Button block rounded style={styles.button} onPress={login}>
                        <Text style={styles.text}>Login</Text>
                    </Button>
                </Form>
               <TouchableOpacity onPress={signup}><Text style={styles.sign}>New here? Sign Up</Text></TouchableOpacity>
                </View>
            </Content>
        </Container>
    );

}
const styles = StyleSheet.create({
    main:{
   marginTop:70
    },
    button: {
        marginLeft: 30,
        marginRight: 30,
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
    signup:{
        paddingTop:30,
        fontSize:30,
        color:'#bb0a1e',
        textAlign:"center",
        textDecorationLine:"underline",
    
      },
      sign:{
          marginLeft:130,
          marginTop:20,
          color:"#000",
          marginBottom:15,
      }
});