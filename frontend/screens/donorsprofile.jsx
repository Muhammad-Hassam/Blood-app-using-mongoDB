import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, ImageBackground, } from "react-native"
import { Container, Content, Icon, Button, List, ListItem } from 'native-base';
import bgpic from "../assets/red.jpg"
import profilepic from "../assets/profile.png"




export default function Donorsprofile() {



    const bgimage = bgpic;
    return (

        <Container>
            <Content style={{ backgroundColor: 'rgba(108, 122, 137, 0.15)' }}>
                <ImageBackground source={bgimage} style={{ resizeMode: "cover", }}>
                    <Image source={profilepic} style={styles.profilpic} />
                </ImageBackground>
                <Text style={styles.names}>Muhammad Hassam</Text>
                <Button iconLeft block rounded style={styles.button}>
            <Icon type="FontAwesome" name="map-marker" />
            <Text style={styles.text}>Donor's Location</Text>
          </Button>
                <List>
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Age: </Text><Text style={{fontSize:20}}>23</Text>
            </ListItem>
                     
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Gender: </Text><Text style={{fontSize:20}}>23</Text>
            </ListItem>

            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Blood Group: </Text><Text style={{fontSize:20}}>23</Text>
            </ListItem>
                     
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Email: </Text><Text style={{fontSize:20}}>23</Text>
            </ListItem>
            <ListItem itemDivider style={{marginBottom:15}}>
            <Text style={{fontWeight:'bold',fontSize:20}}>Phone: </Text><Text style={{fontSize:20}}>23</Text>
            </ListItem>
                </List>

            </Content>
        </Container>
    );

}
const styles = StyleSheet.create({
    names: {
        marginTop: 90,
        textAlign: "center",
        fontSize: 26,
        fontWeight: 'bold'

    },
    text: {
        color: '#fff',
        fontSize: 20,
        paddingLeft:10,
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