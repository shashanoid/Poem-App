import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button,
} from "react-native";

//Redux utils
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { testAction } from "../../_actions/testAction";
import * as SecureStore from "expo-secure-store";
import SignUpScreen from "./SignUpScreen";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount = async () => {
    let token = await SecureStore.getItemAsync("token");
    if (token) {
      this.setState({ isLoggedIn: true });
    }
  };

  render() {
    let { isLoggedIn } = this.state;
    if (!isLoggedIn) {
      return <SignUpScreen navigation={this.props.navigation} />;
    }

    return <View style={styles.profileContainer}></View>;
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "blue",
  },
});

// export default SignIn;
const mapStateToProps = (state) => {
  const { signUp, signIn } = state;
  return { signUp, signIn };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ testAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
