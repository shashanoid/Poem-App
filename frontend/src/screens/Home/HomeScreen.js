import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./styles";

import menuslidernew from "../../../assets/menuslidernew.png";
import CategoryScroll from "./CategoryScroll";
import TopTab from "../../components/TopTab";
import NewTab from "../../components/NewTab";

//Redux utils
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userDataAction } from "../../_actions/userDataAction";
import { userService } from "../../_services";
import * as SecureStore from "expo-secure-store";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "top",
      isTopSelected: true,
      isNewSelected: false,
    };
  }

  async componentDidMount() {
    try {
      let token = await SecureStore.getItemAsync("token");
      if (token) {
        let userData = await userService.getUserInfo(token);
        await this.props.userDataAction(userData);
      }
    } catch (error) {
      return;
    }
  }

  handleTabChange(tabType) {
    this.setState({ currentTab: tabType });
  }

  renderTabView() {
    let { currentTab } = this.state;

    return (
      <View style={styles.postTabView}>
        <TouchableOpacity
          style={[
            { width: 60 },
            currentTab === "top" ? styles.tabItem : styles.tabItemDisabled,
          ]}
          onPress={() => this.handleTabChange("top")}
        >
          <Text
            style={currentTab === "top" ? styles.tabTitle : styles.diabledText}
          >
            Top
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            { marginLeft: 20, width: 60 },
            currentTab === "new" ? styles.tabItem : styles.tabItemDisabled,
          ]}
          onPress={() => this.handleTabChange("new")}
        >
          <Text
            style={currentTab === "new" ? styles.tabTitle : styles.diabledText}
          >
            New
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let { currentTab } = this.state;

    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        style={styles.container}
        alwaysBounceVertical={false}
      >
        <View style={styles.headerContainer}></View>
        <TouchableOpacity
          onPress={() => this.props.navigation.openDrawer()}
          style={styles.sliderMenu}
        >
          <Image style={{ width: 64, height: 25 }} source={menuslidernew} />
        </TouchableOpacity>
        <View style={styles.categoryContainer}>
          <CategoryScroll navigation={this.props.navigation} />
        </View>

        {this.renderTabView()}

        <View style={styles.postsView}>
          {currentTab === "top" ? <TopTab type={currentTab} /> : null}
          {currentTab === "new" ? <NewTab type={currentTab} /> : null}
        </View>
      </ScrollView>
    );
  }
}

// export default SignIn;
const mapStateToProps = (state) => {
  const { userData } = state;
  return { userData };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ userDataAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
