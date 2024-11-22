import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class InputScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedBookId: '',
      scannedStudentId: '',
      buttonState: 'normal',
    };
  }

  getCameraPermissions = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === 'granted',
      buttonState: id,
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state;

    if (buttonState === 'BookId') {
      this.setState({
        scanned: true,
        scannedBookId: data,
        buttonState: 'normal',
      });
    } else if (buttonState === 'StudentId') {
      this.setState({
        scanned: true,
        scannedStudentId: data,
        buttonState: 'normal',
      });
    }
  };

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    return (      
       <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground
            source={require('../assets/WaterBackground.jpg')}
            style={styles.backgroundImage}>
            <View style={styles.titleBar}>
              <Text style={styles.titleText}>Water Minder</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputBox}
                placeholder="Number of Glasses"
                onChangeText={(text) => this.setState({ scannedBookId: text })}
                value={this.state.scannedBookId}
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                  this.getCameraPermissions('BookId');
                }}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputBox}
                placeholder="Ounces"
                onChangeText={(text) =>
                  this.setState({ scannedStudentId: text })
                }
                value={this.state.scannedStudentId}
              />
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => {
                  this.getCameraPermissions('StudentId');
                }}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
                this.setState({
                  scannedStudentId: '',
                  scannedBookId: '',
                });
                //make a database call
              }}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  inputView: {
    flexDirection: 'row',
    marginTop: 200,
    marginLeft: 30
  },
  inputBox: {
    width: 200,
    height: 40,
    borderWidth: 1.5,
    borderRightWidth: 0,
    fontSize: 20,
  },
  scanButton: {
    backgroundColor: '#2299ff',
    width: 50,
    borderWidth: 1.5,
    borderLeftWidth: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  titleBar: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
  },
});
