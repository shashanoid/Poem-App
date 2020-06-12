import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { postService } from "../_services";
import autoBind from "auto-bind";
import LoadingScreen from "../screens/Loading/LoadingScreen";
import PoemCard from "../components/PoemCard";

export default class TopTab extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: Array(50)
        .fill()
        .map((_, index) => ({ id: index })),
      posts: [],
    };

    autoBind(this);
  }

  async componentDidMount() {
    let { type } = this.props;
    this.fetchPosts(type);
  }

  async fetchPosts(type) {
    await postService.getNewPosts().then(
      (response) => {
        let data = response.data;
        this.setState({ isLoading: false, posts: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, marginTop: "30%" }}>
          <LoadingScreen />
        </View>
      );
    }

    return (
      <FlatList
        style={styles.wrapper}
        data={this.state.posts}
        renderItem={this._renderRow}
        keyExtractor={(item) => item.id.toString()}
        // tabRoute={this.props.route.key}
        renderItem={({ item }) => <PoemCard poemData={item} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
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
