import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Card, TextInput, IconButton, Colors} from 'react-native-paper';

const Account_Form = ({navigation}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [DOB, setDOB] = useState('');

  const saveData = () => {
    const dataOBJ = {name, phone, email, Address, DOB};
    console.log(dataOBJ);
    //navigation.navigate('FormPDF');
    navigation.navigate('FormPDF', {dataOBJ});

    console.log('save pressed');
  };

  return (
    <View>
      <KeyboardAvoidingView>
        <TextInput
          label="Name"
          style={styles.inputStyle}
          value={name}
          //onFocus={()=>setenableShift(false)}

          mode="outlined"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.inputStyle}
          label="phone"
          value={phone}
          keyboardType="number-pad"
          mode="outlined"
          // theme={{colors:{primary:"red"}}}
          onChangeText={(text) => {
            setPhone(text);
          }}
        />

        <TextInput
          style={styles.inputStyle}
          label="email"
          value={email}
          mode="outlined"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <TextInput
          style={styles.inputStyle}
          label="DOB"
          value={DOB}
          mode="outlined"
          onChangeText={(text) => {
            setDOB(text);
          }}
        />

        <TextInput
          style={styles.inputStyle}
          label="Address"
          value={Address}
          mode="outlined"
          onChangeText={(text) => {
            setAddress(text);
          }}
        />
        <Button
          style={styles.inputStyle}
          icon="content-save"
          mode="contained"
          onPress={() => saveData()}>
          Save
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    margin: 5,
  },
});
export default Account_Form;
