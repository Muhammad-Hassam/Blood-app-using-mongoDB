import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,Icon } from 'native-base';
import {TouchableOpacity} from 'react-native'
import profile from '../assets/profile.png'
export default function Messages() {
  
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
                <Text note numberOfLines={1}>Its time to build a difference . . .</Text>
              </Body>
              </TouchableOpacity>
              <Right>
              <Button transparent>
              <Text style={{color:'#bb0a1e'}}>View</Text>
                    </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
