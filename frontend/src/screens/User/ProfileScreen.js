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
import { userService } from "../../_services/user.service";

//Redux utils
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { testAction } from "../../_actions/testAction";
import { userDataAction } from "../../_actions/userDataAction";
import * as SecureStore from "expo-secure-store";
import SignUpScreen from "./SignUpScreen";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userData: null,
    };
  }

  componentDidMount = async () => {
    let { userData } = this.props;
    if (Object.keys(userData).length === 0) {
      this.setState({ isLoggedIn: false });
    } else {
      this.setState({ isLoggedIn: true, userData: userData.userData });
    }
  };

  async handleLogout() {
    await SecureStore.deleteItemAsync("token");
    this.props.navigation.push("SignUp");
  }

  renderProfile() {
    let { isLoggedIn, userData } = this.state;

    if (isLoggedIn) {
      return (
        <View style={styles.profileContainer}>
          <View style={styles.profileInfoContainer}>
            <Text>{userData.username}</Text>
            <Text>{userData.email}</Text>
            <Button onPress={() => this.handleLogout()} title="Logout"></Button>
          </View>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  render() {
    let { isLoggedIn } = this.state;

    if (!isLoggedIn) {
      return <SignUpScreen navigation={this.props.navigation} />;
    } else {
      return this.renderProfile();
    }
  }
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "#E6E6E6",
    padding: 40,
  },
  profileInfoContainer: {
    marginTop: 24,
    flex: 1,
    backgroundColor: "red",
  },
});

// export default SignIn;
const mapStateToProps = (state) => {
  const { signUp, signIn, userData } = state;
  return { signUp, signIn, userData };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ testAction, userDataAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
