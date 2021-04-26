import React from 'react';
import {  Container, Tab, Tabs } from 'native-base';
import Profile from './profile';
import Messages from './messages';
import Donation from './donation';
import Header from '../components/Header'
export default function AllTtabs({navigation}){
    return (
      <Container>
        <Header hasTabs />
      <Tabs>
          <Tab heading="Profile" tabStyle={{backgroundColor: '#bb0a1e'}} activeTabStyle={ { backgroundColor: '#bb0a1e',}}>
            <Profile navigation={navigation}/>
          </Tab>
          <Tab heading="Chats" tabStyle={{backgroundColor: '#bb0a1e'}} activeTabStyle={ { backgroundColor: '#bb0a1e',}}>
            <Messages navigation={navigation}/>
          </Tab>
          <Tab heading="Donors" tabStyle={{backgroundColor: '#bb0a1e'}} activeTabStyle={ { backgroundColor: '#bb0a1e',}}>
            <Donation/>
          </Tab>
        </Tabs>
      </Container>
    );
  }