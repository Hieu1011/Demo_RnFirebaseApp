import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';
import UserItem from '../components/UserItem';
import database from '@react-native-firebase/database';

// database()
//   .ref('/App/User2')
//   .update({
//     Name: 'CR8',
//   })
//   .then(() => console.log('Data update.'));

const db = database().ref('/App/');

const HomeScreen = ({navigation}) => {
  const [ID, setID] = useState('');
  const [Name, setName] = useState('');
  const [Age, setAge] = useState('');
  const [Gender, setGender] = useState('');
  const [List, setList] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [IndexCurrent, setIndexCurrent] = useState();

  useEffect(() => {
    db.on('value', snapshot => {
      const arr = [];
      snapshot.forEach(user => {
        arr.push({
          ID: user.key,
          Name: user.val().Name,
          Age: user.val().Age,
          Gender: user.val().Gender,
        });
      });
      setList(arr);
    });
  }, []);

  const handleAdd = () => {
    navigation.replace('AddUser', {List});
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasks}>
        {List.map((item, index) => {
          return (
            <TouchableHighlight
              underlayColor={'none'}
              key={index}
              onPress={() =>
                setIndexCurrent(index === IndexCurrent ? null : index)
              }>
              <View>
                <UserItem
                  ID={item.ID}
                  Name={item.Name}
                  Age={item.Age}
                  Gender={item.Gender}
                />
                {index === IndexCurrent && (
                  <View style={styles.item}>
                    {/* <Text style={styles.text}>ID: {item.ID}</Text> */}
                    <Text style={styles.text}>Name: {item.Name}</Text>
                    <Text style={styles.text}>Age: {item.Age}</Text>
                    <Text style={styles.text}>Gender: {item.Gender}</Text>
                  </View>
                )}
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
      <TouchableHighlight
        style={styles.add}
        underlayColor="transparent"
        onPress={() => handleAdd()}>
        <Image
          source={require('../assets/icons8-add-96.png')}
          style={{height: 50, width: 50}}
        />
      </TouchableHighlight>
      {/* <Modal transparent={true} visible={showPop}>
        <View style={styles.popup}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textTitle}>Name: </Text>
            <TextInput style={styles.textInput}></TextInput>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textTitle}>Age: </Text>
            <TextInput style={styles.textInput}></TextInput>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textTitle}>Gender: </Text>
            <TextInput style={styles.textInput}></TextInput>
          </View>
          <TouchableHighlight
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              width: 40,
              height: 30,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'blue', fontWeight: '700'}}>
              ADD
            </Text>
          </TouchableHighlight>
        </View>
      </Modal> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: 'flex-start',
  },
  tasks: {
    margin: 30,
  },
  item: {
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
  },
  popup: {
    flex: 0.5,
    marginVertical: 200,
    marginHorizontal: 50,
    borderRadius: 15,
    backgroundColor: '#ffdada',
  },
  textTitle: {
    marginTop: 10,
    marginLeft: 10,
    width: 70,
    fontSize: 18,
  },
  textInput: {
    fontSize: 18,
    minWidth: 270,
    alignSelf: 'flex-start',
  },
  add: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 30,
    right: 0,
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 30,
  },
});
