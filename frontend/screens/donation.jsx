import React, { useState,useEffect} from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,Icon } from 'native-base';
import {TouchableOpacity} from 'react-native'
import profile from '../assets/profile.png'
import axios from 'axios'
export default function Donation() {

  const [donorData,setDonordata]=useState([]);

  useEffect(()=>{
    axios({
      method: 'get',
      url: "http://192.168.0.107:3009/donorsdata",
      withCredentials: true
  }).then((res) => {
      if (!res.data.status === 200) {
        console.log(res.data.message)
      }
      else {
        setDonordata(res.data.data)
          console.log(res.data.data)
      }
  }).catch((err) => {
      console.log(err)
  })
  },[])

  const prf=profile;
    return (
      <Container>
        <Content>
          <List >
            <ListItem thumbnail>
              <Left style={{marginTop:25}}>
                <Thumbnail  source={profile} />
              </Left>
              <TouchableOpacity>
              <Body style={{marginTop:10}}>
                <Text>Hassam</Text>
                <Text note numberOfLines={1}>Its time to build a difference ...</Text>
              </Body>
              </TouchableOpacity>
              <Right>
              <Button transparent style={{marginLeft:15}}>
                        <Icon iconLeft type="FontAwesome" name="map-marker" style={{ fontSize: 40, color: '#bb0a1e' }} />
                    </Button>
              
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
