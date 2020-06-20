import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";

import HTML from "react-native-render-html";
import HTMLView from "react-native-htmlview";
import clap from "../../assets/clap.png";

export default class PoemCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const htmlContent = `<p><span style="font-weight: bold;"> hello </span></p>`;

    let { poemData } = this.props;
    return (
      <View>
        <Text style={styles.poemTitle}>{poemData.title}</Text>

        <View style={styles.item}>
          <View style={styles.poemContainer}>
            <View style={styles.poemView}>
              <HTMLView
                style={styles.poemContent}
                value={poemData.body}
                stylesheet={styles}
              />
              <View style={styles.likesView}>
                <Image style={{ width: 25, height: 25 }} source={clap} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: 300,
    backgroundColor: "#fff",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
  },
  span: {
    fontSize: 16,
  },
  poemContainer: {
    flex: 1,
  },
  poemTitle: {
    fontSize: 20,
    fontWeight: "600",
    height: 30,
    width: "70%",
    marginLeft: 12,
    overflow: "hidden",
    marginBottom: 2,
  },
  poemView: {
    height: 220,
    overflow: "hidden",
    flexDirection: "row",
  },
  poemContent: {
    width: "90%",
  },
  likesView: {
    flex: 1,
    top: 24,
    width: "10%",
  },
});
