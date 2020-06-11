import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default class PoemCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { poemData } = this.props;
    return (
      <View style={styles.item}>
        <Text>{poemData.user.username}</Text>
        <Text>{poemData.body}</Text>
        <Text>{poemData.votes_count}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 150,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderRadius: 4,
  },
});
