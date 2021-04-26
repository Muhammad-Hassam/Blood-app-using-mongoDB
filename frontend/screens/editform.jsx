import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image } from "react-native"
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import * as ImagePicker from 'expo-image-picker'
import Headers from '../components/Header';


export default function Editform() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
    }
  };
 

  return (
    
    <Container>
      <Headers />
      <Content style={{backgroundColor:'rgba(108, 122, 137, 0.15)'}}>
<Text style={styles.signup}>SignUp Form</Text>
        <Form>
        <Image source={{uri:image}} style={{ backgroundColor:'#C0C0C0', borderRadius: 130, width: 180, height: 180, marginTop:40, marginTop: 30, marginLeft: 90 }} />
          <Button block rounded onPress={pickImage} style={styles.image}>
            <Text style={styles.text}>Update Image</Text>
          </Button>

          <Item floatingLabel style={styles.inputs}>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Email (for Login)</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Password (for Login)</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Age</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Gender</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Blood Group</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Location</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Email (for Contact)</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Phone</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Facebook (Optional)</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Twitter (Optional)</Label>
            <Input />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Instagram (Optional)</Label>
            <Input />
          </Item>
          <Button block rounded style={styles.button}>
            <Text style={styles.text}>Update</Text>
          </Button>
        </Form>
      </Content>
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
  signup:{
    paddingTop:20,
    fontSize:30,
    color:'#bb0a1e',
    textAlign:"center",
    textDecorationLine:"underline",

  },
  image:{
    marginLeft: 70,
    marginRight: 70,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#bb0a1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs:{
    borderColor:'#000', 
    marginRight:15,
    marginBottom:10
  }
});