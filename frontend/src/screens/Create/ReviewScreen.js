import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";
import * as ImageManipulator from "expo-image-manipulator";
import { postService } from "../../_services";
import axios from "axios";

class ReviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: "",
      image: null,
    };
  }

  componentDidMount() {
    // console.log(this.props.route.params);
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    this.setState({ uri: photo.uri, image: photo });
    console.log(photo);
  };

  _compressImage = async (pickerResult) => {
    console.log("compress");

    const manipResult = await ImageManipulator.manipulateAsync(
      pickerResult.uri,
      [{ resize: { width: 800 } }],
      { compress: 0.5, format: "jpeg", base64: false }
    );
    console.log("compress after");
    this._handleImagePicked(manipResult);
  };

  async handleUpload() {
    let { poemTitle, poemText, userToken } = this.props.route.params;

    let formdata = new FormData();
    formdata.append("title", poemTitle);
    formdata.append("body", poemText);
    formdata.append("image", {
      uri: this.state.uri,
      name: new Date().getTime() + ".jpg",
      type: "multipart/form-data",
    });

    await postService.CreateNewPost(formdata, userToken);

    Alert.alert(
      "Succes !",
      "Story Published!",
      [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.openImagePickerAsync}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.handleUpload()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default ReviewScreen;
