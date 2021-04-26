import React from 'react';
import { Header, Left, Body, Right,Title } from 'native-base';


export default function Headers(){
    return (
        <>
        
        <Header androidStatusBarColor="#bb0a1e" style={{backgroundColor:'#bb0a1e'}}>   
            <Left/>
            <Left/>
            <Left/>    
          <Body>
            <Title style={{ fontSize:22}}>Blood App</Title>
          </Body>
          <Right/>
        </Header>
        </>
    
    );
  }