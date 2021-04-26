import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, View } from "react-native"
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';
import * as ImagePicker from 'expo-image-picker'
import Headers from '../components/Header';
import profiles from '../assets/profile.png'
import * as Location from 'expo-location';
import Storage from "../config/frebase"
import axios from "axios";

export default function Donorsform() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [donor, setDonor] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodgroup: "",
    email: "",
    phone: "",
    imageURL: "",
    latitude: "",
    longitude: "",
    address: "",
  })


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setDonor((prev) => ({ ...prev, latitude: location.coords.latitude, longitude: location.coords.longitude }))
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


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
    const imageName = Math.random() * 2000 * 1223234;
    const response = await fetch(result.uri);
    const blob = await response.blob()
    var ref = Storage.ref("picture/" + imageName);
    return ref.put(blob).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((URL) => {
        setImageURL(URL);
      })
    })
  };

  const register = () => {
    axios({
      method: 'post',
      url: "http://192.168.0.107:3009/donorsdata",
      data: {
        fullname: donor.fullName,
        email: donor.email,
        bloodgroup: donor.bloodgroup,
        gender: donor.gender,
        age: donor.age,
        phone: donor.phone,
        imageURL: donor.imageURL,
        latitude: donor.latitude,
        longitude: donor.longitude,
      },
      withCredentials: true,
    }).then((res) => {
      navigation.navigate("Donation")
    }).catch((err) => {
      console.log(err);
    })
  }


  return (

    <Container>
      <Headers />
      <Content style={{ backgroundColor: 'rgba(108, 122, 137, 0.15)' }}>
        <Text style={styles.signup}>Donate Your Blood</Text>
        <Form>
          <Image source={{ uri: image }} style={{ backgroundColor: '#C0C0C0', borderRadius: 130, width: 180, height: 180, marginTop: 40, marginTop: 30, marginLeft: 90 }} />
          <Button block rounded onPress={pickImage} style={styles.image}>
            <Text style={styles.text}>Upload Image</Text>
          </Button>

          <Item floatingLabel style={styles.inputs}>
            <Label>Name</Label>
            <Input keyboardType='default' onChangeText={(data) => setDonor(prev => ({ ...prev, fullName: data }))} />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Age</Label>
            <Input keyboardType='numeric' onChangeText={(data) => setDonor(prev => ({ ...prev, age: data }))} />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Gender</Label>
            <Input keyboardType='default' onChangeText={(data) => setDonor(prev => ({ ...prev, gender: data }))} />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Blood Group</Label>
            <Input keyboardType="default" onChangeText={(data) => setData(prev => ({ ...prev, bloodgroup: data.toUpperCase() }))} />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Location</Label>
            <Input keyboardType="default" onChangeText={(data) => setData(prev => ({ ...prev, address: data }))} />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Email (for Contact)</Label>
            <Input keyboardType='email-address' onChangeText={(data) => setData(prev => ({ ...prev, email: data.toLowerCase() }))} />
          </Item>
          <Item floatingLabel style={styles.inputs}>
            <Label>Phone</Label>
            <Input keyboardType='phone-pad' onChangeText={(data) => setData(prev => ({ ...prev, phone: data }))} />
          </Item>
          <Button block rounded style={styles.button} onPress={register}>
            <Text style={styles.text}>Register</Text>
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
  signup: {
    paddingTop: 20,
    fontSize: 30,
    color: '#bb0a1e',
    textAlign: "center",
    textDecorationLine: "underline",

  },
  image: {
    marginLeft: 70,
    marginRight: 70,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#bb0a1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    borderColor: '#000',
    marginRight: 15,
    marginBottom: 10
  }
});