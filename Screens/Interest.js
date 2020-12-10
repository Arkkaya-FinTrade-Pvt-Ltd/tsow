import React, {useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {Button, Card, TextInput, IconButton, Colors} from 'react-native-paper';

const Interest = ({navigation}) => {
  let addcount = 20;
  const goHome = () => {
    navigation.navigate('Home');
  };
  const addInterest = () => {
    alert('added');
  };
  return (
    <View style={styles.root}>
      <Text style={{fontSize: 30}}>Add Your Interest</Text>
      <ScrollView>
        <Card style={{width: '100%', height: '80%', marginTop: 10}}>
          <Card
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 8,
              padding: 10,
            }}>
            <Text style={styles.cardtext}>Arjit singh</Text>
            <Button style={styles.addButton}>ADD</Button>
          </Card>
          <Card
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 8,
              padding: 10,
            }}>
            <Text style={styles.cardtext}>Arjit singh</Text>
            <Button style={styles.addButton} onPress={() => addInterest()}>
              ADD
            </Button>
          </Card>
        </Card>
      </ScrollView>
      <Card style={styles.nextbutton}>
        <Text>Add Atleast 5 Interest to Go Next</Text>
        {addcount >= 5 ? (
          <IconButton
            style={{left: 250}}
            icon="page-next-outline"
            color={Colors.red500}
            size={50}
            onPress={() => goHome()}
          />
        ) : (
          <Button disabled={true}></Button>
        )}
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },

  cardtext: {
    fontSize: 20,
    padding: 10,
  },
  addButton: {
    fontSize: 10,
    marginTop: 10,
    left: 150,
  },
  nextbutton: {
    margin: 10,
    bottom: 0,
  },
});
export default Interest;
