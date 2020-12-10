import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

export default function Header() {
  return (
    <View style={Styles.header}>
      <View>
        <Image
          style={{width: 80, height: 30}}
          source={require('../IMG/TsowTextLight.png')}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:"grey"
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
});

/*<Image
  style={{ width: 50, height: 50 }}
  source={{uri:'https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80'}}
 />*/
