import React,{ useEffect, useState } from 'react'
import { StyleSheet, FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
// importing firebase 
import firebase from "firebase";


export default function Home(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id


    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

  
    const renderList = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <View >
                <Text style={styles.entityText}>
                <Icon style={styles.deleteentity} onPress={()=>{deleteitem(index)}}  name="minus-square" size={25} color="purple" /> {item.text}
                </Text>

                </View>
               <View>
            
               </View>
               
            </View>
        )
    }



  
    
    return (
      
        <View style={styles.container}>
        <View style={styles.formContainer}>
            <TextInput
                style={styles.input}
                placeholder='Add new entity'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEntityText(text)}
                value={entityText}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
        { entities && (
            <View style={styles.listContainer}>
                <FlatList
                    data={entities}
                    renderItem={renderList}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={true}
                />
            </View>
        )}
    </View>
 
    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderWidth:3,
        borderColor:'purple',
        borderBottomLeftRadius: 9,
        borderTopRightRadius: 9,
        backgroundColor: 'white',
        width: 80,
        alignItems: "center",
        justifyContent: 'center',
        marginRight:5
    },
    buttonText: {
        color: 'purple',
        fontSize: 16,
        fontWeight:'bold'
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        display:'flex',
        width:300,
        marginTop: 16,
        borderBottomColor: 'purple',
        paddingTop: 6,
        padding: 6,
        // height:50,
        borderWidth:3,
        borderColor:'purple',
        borderBottomLeftRadius: 9,
        borderTopRightRadius: 9,

    },
    entityText: {
        fontSize: 20,
        color: 'purple',
    },
   
})