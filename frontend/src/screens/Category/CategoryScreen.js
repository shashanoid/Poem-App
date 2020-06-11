import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/Ionicons";

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { categoryName } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backbutton}
          >
            <Icon name="ios-arrow-back" color="white" size={32} />
            <Text style={styles.headerTitle}>{categoryName}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CategoryScreen;
