import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image,Alert } from "react-native"
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import * as ImagePicker from 'expo-image-picker'
import Headers from '../components/Header';
import Storage from "../config/frebase"
import axios from 'axios';

export default function Signup({navigation}){

  const [image, setImage] = useState(null);
  const [imageURL,setImageURL]=useState("");
  const [uname,setUname]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [blood,setBlood]=useState("");
  const [gender,setGender]=useState("");
  const [age,setAge]=useState("");
  const [phone,setPhone]=useState("");


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
    const imageName = Math.random() * 2000*1223234;
    const response = await fetch(result.uri);
    const blob = await response.blob()
    var ref = Storage.ref("picture/"+imageName);
    return ref.put(blob).then((snapshot) => {
   snapshot.ref.getDownloadURL().then((URL) => {
        setImageURL(URL);
      })
    });
  };


const signup=()=>{
axios({
  method:'post',
  url: "http://192.168.0.107:3009/signup",
  data:{
    name:uname,
          email:email,
          password:password,
          bloodgroup:blood,
          gender:gender,
          age:age,
          phone:phone,
          imageURL:imageURL,
  },
  withCredentials:true,
}).then((res)=>{
  navigation.navigate("Login")
}).catch((err)=>{
  console.log(err);
})
}

  return (
    <Container>
      <Headers />
      <Content style={{backgroundColor:'rgba(108, 122, 137, 0.15)'}}>
<Text style={styles.signup}>SignUp Form</Text>
        <Form>
        <Image source={{uri:image}} style={{ backgroundColor:'#C0C0C0', borderRadius: 130, width: 180, height: 180, marginTop:40, marginTop: 30, marginLeft: 90 }} />
          <Button block rounded onPress={pickImage} style={styles.image}>
            <Text style={styles.text}>Upload Image</Text>
          </Button>
          <Item floatingLabel style={styles.inputs} >
            <Label>Username</Label>
            <Input keyboardType='default' onChangeText={name=>setUname(name)} />
          </Item>
          <Item floatingLabel style={styles.inputs} >
            <Label>Email (for Login)</Label>
            <Input keyboardType="email-address" onChangeText={emails=>setEmail(emails.toLowerCase())} />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Password (for Login)</Label>
            <Input onChangeText={passwords=>setPassword(passwords)} secureTextEntry/>
          </Item>
          <Item floatingLabel style={styles.inputs} >
            <Label>Age</Label>
            <Input keyboardType="numeric" onChangeText={ages=>setAge(ages)}/>
          </Item>
          <Item floatingLabel style={styles.inputs} >
            <Label>Gender</Label>
            {/* genders.charAt(0).toUpperCase().concat(genders.slice(1).toLowerCase())) */}
            <Input keyboardType="default" onChangeText={genders=>setGender(genders.toLowerCase())}/>
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Blood Group (use Capital word e.g A+)</Label>
            <Input keyboardType='ascii-capable' onChangeText={groups=>setBlood(groups.toUpperCase())}/>
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Phone</Label>
            <Input keyboardType="phone-pad" onChangeText={phones=>setPhone(phones)}/>
          </Item>
          <Button block rounded onPress={signup} style={styles.button}>
            <Text style={styles.text}>Signup</Text>
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