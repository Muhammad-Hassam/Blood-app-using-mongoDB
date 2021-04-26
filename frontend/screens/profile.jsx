import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, ImageBackground, } from "react-native"
import { Container, Content, Icon, Button, List, ListItem } from 'native-base';
import bgpic from "../assets/red.jpg"
import profilepic from "../assets/profile.png"
import axios from "axios"




export default function Profiles({navigation}) {

    const [user,setUser]=useState("");

  

    useEffect(()=>{
        axios({
            method:'get',
            url: "http://192.168.0.107:3009/profile",
            withCredentials:true,
          }).then((res)=>{
              if(!res.status===200){
                  console.log(res.err)
              }
                const data = res.data;
                setUser(data); 
          }).catch((err)=>{
            console.log(err)
          })}, [])
    
const editbtn=()=>{
    navigation.navigate("Editform");
}
const donorbtn=()=>{
    navigation.navigate("Donorsform");
}
    const bgimage = bgpic;
    return (

        <Container>
            <Content style={{ backgroundColor: 'rgba(108, 122, 137, 0.15)' }}>
                <ImageBackground source={bgimage} style={{ resizeMode: "cover" }}>
                    <Image source={profilepic} style={styles.profilpic} />
                </ImageBackground>
                <Text style={styles.names}>{user.name}</Text>
               <Button block rounded style={styles.button} onPress={donorbtn}><Text style={styles.text}>Registered as Donor</Text></Button>

                <List>
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Age: </Text><Text style={{fontSize:20}}>{user.age}</Text>
            </ListItem>
                     
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Gender: </Text><Text style={{fontSize:20}}>{user.gender}</Text>
            </ListItem>

            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Blood Group: </Text><Text style={{fontSize:20}}>{user.bloodgroup}</Text>
            </ListItem>
                     
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Location: </Text><Text style={{fontSize:20}}>23</Text>
            </ListItem>
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Email: </Text><Text style={{fontSize:20}}>{user.email}</Text>
            </ListItem>
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Phone: </Text><Text style={{fontSize:20}}>{user.phone}</Text>
            </ListItem>
                </List>
                <Button  onPress={editbtn} block rounded style={styles.button}><Text style={styles.text}>Edit Profile</Text></Button>

            </Content>
        </Container>
    );

}
const styles = StyleSheet.create({
    names: {
        marginTop: 90,
        textAlign: "center",
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom:10
    },
    text: {
        color: '#fff',
        fontSize: 20,
      },
    button: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 25,
        marginBottom: 20,
        backgroundColor: '#bb0a1e',
        alignItems: 'center',
        justifyContent: 'center',

    },

    profilpic: {
        backgroundColor: '#C0C0C0',
        borderRadius: 130,
        width: 180,
        height: 180,
        top: 80,
        marginLeft: 90,

    },

});