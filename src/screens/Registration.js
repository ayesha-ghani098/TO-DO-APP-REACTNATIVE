import React, { useState } from 'react';
import {StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
// importing firebase 
import firebase from "firebase";

export default function Registration({navigation}){

    // Destructuring
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    

    // Registration Submit Button
    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    navigation.navigate('Home', {user: data})
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
    }
    return(
      <View style={styles.container}>
      <Icon style={styles.icon} name="th-list" size={100} color="purple" />
      {/* Input Namw */}
      <TextInput
        style={styles.input}
        placeholder="  Full Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
    
      {/* Input Email */}
      <TextInput
        style={styles.input}
        placeholder="  Enter Email"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      {/* Input Password */}
      <TextInput
        style={styles.input}
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="  Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      {/* Input SetPassword */}
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaaaaa"
        secureTextEntry
        placeholder="  Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.buttonLogin}
        onPress={() => onRegisterPress()}
      >
        <Text style={styles.buttonTitle}>Register</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text style={styles.footerText}>
          Already have an account?
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.footerLink}
          >
            {" "}
            Log in
          </Text>
        </Text>
      </View>
    </View>
    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon:{
        marginBottom:20
          },
    input:{
      width: "80%",
      height:40,
      backgroundColor: 'white',
      color: 'black',
      marginBottom: 10,
      shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 3,
  },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,
  
  elevation: 7,
    }
  ,
  buttonLogin: {
    backgroundColor:'purple',
    borderBottomLeftRadius: 9,
    borderTopRightRadius: 9,
     marginLeft: 30,
     marginRight: 30,
     marginBottom: 10,
     height: 44,
     width:"80%",
     borderRadius: 5,
     alignItems: "center",
     justifyContent: 'center'
   },
   buttonTitle: {
     color: 'white',
     fontSize: 16,
     fontWeight: "bold"
   },
  footerView: {
  
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: "purple",
    fontWeight: "bold",
    fontSize: 16
  }
  });
  