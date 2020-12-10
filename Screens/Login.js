import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
//import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  StyleSheet,
  View,
  Modal,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
// import { GoogleSignin,GoogleSigninButton,statusCodes, } from '@react-native-community/google-signin';

const Login = ({navigation}) => {
  //const [phone, setPhone] = useState('');
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState(''); //setEmail(data)
  const [First_Name, setFirstName] = useState('');
  const [Last_Name, setLastName] = useState('');
  const [userInfo, setUserInfo] = useState(null); // for get info of google login
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [loading, setLoading] = useState(false); // to check login or not

  const openAccount = () => {
    navigation.navigate('Account_Form');
  };
  const goNext = () => {
    // alert(`welcome ${phone}`);
    navigation.navigate('Interest');
  };
  //this comes from google cloud platform console
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: 'ENTER YOUR CLIENT_ID',
      offlineAccess: true,
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);
  //check sign in or not
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signIn();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  //call after click on "login with google" button
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // this comes from @react-native-community/google-signin
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setuserInfo({userInfo});
      setLoading(true);
      // console.log(userInfo);
      navigation.navigate('Interest'); //this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  /*// Handle Login with Google button tap
  loginWithGoogle = () => openURL('https://localhost:3000/auth/google');

  Open URL in a browser
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };
*/
  const saveData = () => {
    fetch('http://localhost:3000/savedata', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: First_Name,
        lastname: Last_Name,
        //phone: phone,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //Alert.alert(`${data.name} is saved successfull`);
        //navigate to the Home Screen
        navigation.navigate('Interest');
      })
      .catch((err) => {
        console.log(err);
      });

    // alert(`thank you ${First_Name}`);
    setModal(false);
  };

  return (
    <View style={styles.rootView}>
      <View style={{height: '30%'}}>
        <Text style={{textAlign: 'center', fontSize: 30}}>TSOW</Text>
        <Text style={{textAlign: 'center', fontSize: 30}}>
          "Your At Right Place"
        </Text>
      </View>

      <Card>
        <TextInput
          style={{marginBottom: 25, marginTop: 10}}
          label="phone"
          keyboardType="number-pad"
          mode="outlined"
          // theme={{colors:{primary:"red"}}}
          onChangeText={(text) => setPhone(text)}
        />
        <Button icon="page-next" mode="contained" onPress={() => goNext()}>
          Continue
        </Button>
      </Card>

      <View style={{marginTop: 10}}>
        <GoogleSigninButton
          style={{width: '80%', height: 60}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
          //disabled={isSigninInProgress}
        />
        {loading ? (
          <View>
            <Text>{userInfo.user.name}</Text>
            <Text>{userInfo.user.email}</Text>
            <Image
              style={{width: '100', height: '100'}}
              source={{uri: userInfo.user.photo}}
            />
          </View>
        ) : (
          <Text>Not Signed</Text>
        )}
      </View>
      <Card onPress={() => setModal(true)}>
        <Button
          style={{alignItems: 'center', marginTop: 5}}
          icon="page-next"
          mode="contained">
          Sign-Up
        </Button>
      </Card>
      <Card onPress={() => openAccount()}>
        <Button
          style={{alignItems: 'center', marginTop: 5}}
          icon="page-next"
          mode="contained">
          Open Account
        </Button>
      </Card>
      <Modal
        //modal used for pop-up
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.modalView}>
          <View>
            <TextInput
              label="First  Name"
              value={First_Name}
              mode="outlined"
              onChangeText={(text) => {
                setFirstName(text);
              }}
            />
            <TextInput
              label="Last_Name"
              value={Last_Name}
              mode="outlined"
              // theme={{colors:{primary:"red"}}}
              onChangeText={(text) => {
                setLastName(text);
              }}
            />

            <TextInput
              label="email"
              value={email}
              mode="outlined"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </View>
          <Button
            //it set the modal false for close the pop_up
            onPress={() => saveData()}>
            Continue
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flexDirection: 'column',
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default Login;
/*

  <Button mode="outlined" onPress={() => loginWithGoogle()}>
          <Icon name="google" size={30} color="#4F8EF7" />
          Login With Google
        </Button> */
// const postDataUsingSimplePostCall = () => {
//   axios
//     .post('https://localhost:3000/posts', {
//       title: 'user',
//       body: '',
//       userId: 1,
//     })
//     .then(function (response) {
//       // handle success
//       alert(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       // handle error
//       alert(error.message);
//     });
// };
