import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';
import database from '@react-native-firebase/database';

// database()
//   .ref('/App/User1')
//   .set({
//     Name: 'Hung',
//     Age: 23,
//   })
//   .then(() => console.log('Data set.'));

const AddUser = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Age, setAge] = useState('');
  const [Gender, setGender] = useState('');

  const handleAdd = () => {
    if (isNaN(Age)) {
      alert('Age must be a number');
      return;
    }
    const newReference = database().ref('/App').push();
    newReference
      .set({
        Name: Name,
        Age: Age,
        Gender: Gender,
      })
      .then(() => alert('Add user successful'));
    setName('');
    setAge('');
    setGender('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={Name}
        placeholder="Enter Your Name"
        underlineColorAndroid="transparent"
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        value={Age}
        placeholder="Enter Your Age"
        underlineColorAndroid="transparent"
        onChangeText={text => setAge(text)}
      />
      <TextInput
        style={styles.input}
        value={Gender}
        placeholder="Enter Your Gender"
        underlineColorAndroid="transparent"
        onChangeText={text => setGender(text)}
      />
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.replace('Home')}>
          <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
            BACK
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => handleAdd()}>
          <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}}>
            ADD
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 50,
    marginLeft: 50,
    padding: 10,
    fontSize: 20,
    borderRadius: 8,
    borderColor: 'blue',
    color: 'black',
    borderWidth: 1,
    width: 300,
  },
  button: {
    margin: 50,
    backgroundColor: 'green',
    opacity: 0.7,
    height: 50,
    width: 90,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
