import {Text, View, Animated, PanResponder} from 'react-native';
import React from 'react';
import Header from './Header';
const Animation = () => {
  const position = new Animated.ValueXY({x: 0, y: 0}); //initial position of animation box
  // Animated.timing(position, {
  //   toValue: {x: 300, y: 400},
  //   duration: 2000, //timing of change value
  // }).start();

  const scrollY = new Animated.Value(0); //for hidding the header at scrolling down
  const translateY = scrollY.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });
  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {dx: position.x, dy: position.y}, //assing the our finger position the animation to change potion by moving tuch
      //also we have anothe option to same we pass gesture.x and y value to it
      // e return information about event handle and c retutn the touch info position
      // console.log(e, c); //it show the guesture information after touch
    ]),
    onPanResponderRelease: () => {
      position.setValue({x: 0, y: 0});
    },
  });
  const rotate = position.x.interpolate({
    inputRange: [0, 100], //rotation speed
    outputRange: ['0deg', '360deg'], //rotation degree
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={{
          // its for hide headerat scroll down
          transform: [{translateY: translateY}],
        }}>
        <Header />
      </Animated.View>
      <Animated.View
        {...pan.panHandlers} //link the panResponder with View
        style={{
          height: 100,
          width: 80,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue',
          transform: [
            {translateX: position.x},
            {translateY: position.y},
            {rotate: rotate},
          ], //set th potion in transform
        }}></Animated.View>
    </View>
  );
};

export default Animation;

// <Button onPress={navigation.navigate('Router')}>go next</Button>
