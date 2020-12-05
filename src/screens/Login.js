import  React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
// Importing firebase
import firebase from "firebase";

export default function Login({navigation}) {

  // Destructuring email and password
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');


  // Firebase Login
const onLoginPress = () => {
  firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                      // Check if user exist
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        // get data and navigation to HOME
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
}

  return (
    <View style={styles.container}>
      {/*------- Icon ToDo---------- */}
    <Icon style={styles.icon} name="th-list" size={100} color="purple" />
    {/*--------- Email Input---------- */}
    <TextInput
      style={styles.input}
      placeholder=" Enter Email"
      placeholderTextColor="#aaaaaa"
      onChangeText={(text) => setEmail(text)}
      value={email}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
    />
   {/*--------- Password Input---------- */}
    <TextInput
      style={styles.input}
      style={styles.input}
      placeholderTextColor="#aaaaaa"
      secureTextEntry
      placeholder=" Password"
      onChangeText={(text) => setPassword(text)}
      value={password}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
    />
    {/*--------- Login Buuton---------- */}
    <TouchableOpacity style={styles.buttonLogin} onPress={() => onLoginPress()}>
      <Text style={styles.buttonTitle}>Log in</Text>
    </TouchableOpacity>
    {/*--------- Nvigation to registration---------- */}
    <View style={styles.footerView}>
      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text
          onPress={() => navigation.navigate("Registration")}
          style={styles.footerLink}
        >
          Sign up
        </Text>
      </Text>
    </View>
  </View>
  

  );
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
    marginBottom: 15,
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
