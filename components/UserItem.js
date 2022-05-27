import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableHighlight,
  Modal,
} from 'react-native';
import database from '@react-native-firebase/database';

// database()
//   .ref('/App/User2')
//   .update({
//     Name: 'CR8',
//   })
//   .then(() => console.log('Data update.'));

const UserItem = props => {
  const [Name, setName] = useState(props.Name);
  const [Age, setAge] = useState(props.Age);
  const [Gender, setGender] = useState(props.Gender);
  const [showPop, setShowPop] = useState(false);

  const Delete = () => {
    database()
      .ref('App/' + props.ID)
      .remove();
  };

  const Update = () => {
    database()
      .ref('/App/' + props.ID)
      .update({Name: Name, Age: Age, Gender: Gender});
      alert("Update success");
      setShowPop(false);
  };

  return (
    <View style={styles.task}>
      <View style={styles.taskLeft}>
        <View style={styles.header}></View>
        <Text style={styles.text}>Name: {props.Name}</Text>
        <TouchableHighlight
          style={styles.update}
          underlayColor="transparent"
          onPress={() => setShowPop(true)}>
          <Image
            source={require('../assets/icons8-edit-120.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.delete}
          underlayColor="transparent"
          onPress={() => {
            Delete();
          }}>
          <Image
            source={require('../assets/icons8-xbox-x-90.png')}
            style={{height: 30, width: 30}}
          />
        </TouchableHighlight>
      </View>
      <Modal transparent={true} visible={showPop}>
        <View style={styles.popup}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textTitle}>Name: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setName(text)}>
              {props.Name}
            </TextInput>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textTitle}>Age: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setAge(text)}>
              {props.Age}
            </TextInput>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textTitle}>Gender: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => setGender(text)}>
              {props.Gender}
            </TextInput>
          </View>

          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <TouchableHighlight
              style={styles.save}
              underlayColor="transparent"
              onPress={() => Update()}>
              <Text style={{fontSize: 18, color: 'blue', fontWeight: '700'}}>
                SAVE
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.cancel}
              underlayColor="transparent"
              onPress={() => setShowPop(false)}>
              <Text style={{fontSize: 18, color: 'blue', fontWeight: '700'}}>
                CANCEL
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  task: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  header: {
    height: 16,
    width: 16,
    backgroundColor: '#92cbdf',
    borderRadius: 15,
    marginRight: 20,
    opacity: 0.8,
  },
  text: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 20,
    maxWidth: '80%',
  },
  delete: {
    borderRadius: 15,
    marginLeft: 30,
    height: 30,
    width: 30,
  },
  update: {
    borderRadius: 15,
    marginLeft: 50,
    height: 30,
    width: 30,
  },
  cancel: {
    marginLeft: 120,
    width: 70,
    height: 30,
    borderRadius: 10,
  },
  save: {
    marginLeft: 30,
    width: 50,
    height: 30,
    borderRadius: 10,
  },
  popup: {
    marginTop: 300,
    alignContent: 'flex-end',
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
});
