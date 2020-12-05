
import {useState, useEffect} from 'react';
import React from 'react';
import { StyleSheet, TouchableOpacity,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Registration from './src/screens/Registration';

import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDptcr__DxEb0RmxwJbXhQPTuZvxVJ82oc",
    authDomain: "todoapp-reactnative-870cb.firebaseapp.com",
    databaseURL: "https://todoapp-reactnative-870cb.firebaseio.com",
    projectId: "todoapp-reactnative-870cb",
    storageBucket: "todoapp-reactnative-870cb.appspot.com",
    messagingSenderId: "794829582334",
    appId: "1:794829582334:web:d5dacf37c60d9a886b5aaf",
    measurementId: "G-PSBJPH5KGM"
  };
  // Initialize Firebase
 const Firebase = firebase.initializeApp(firebaseConfig);

 const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  const logout1 = () =>{
    firebase.auth().signOut().then(function() {
        navigation.navigate('Login')
      }).catch(function(error) {
        // An error happened.
      });
}
  return (
    <NavigationContainer>
    <Stack.Navigator
       screenOptions={{
        headerStyle: {
          backgroundColor: 'purple'
        },
        headerTintColor: '#fff',
      }}>
      { user ? (
        <Stack.Screen name="Home" options={{
          headerRight: () => (
            <TouchableOpacity
            style={styles.logoutbtn}
            onPress={logout1}
            >
              <Text style={styles.logoutbtntxt}>Logout</Text>
            </TouchableOpacity>
          )}}>
          {props => <Home {...props} extraData={user} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
    

  );

  
}

export{
  Firebase,
  App
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutbtn:{
marginRight:20,
backgroundColor:'purple',
borderWidth:3,
borderColor:'#fff',
padding:9,
fontSize:15,
borderBottomLeftRadius: 9,
borderTopRightRadius: 9,


  },
  logoutbtntxt:{
    color:'#fff',
    fontWeight:'bold',
  
  }
});
