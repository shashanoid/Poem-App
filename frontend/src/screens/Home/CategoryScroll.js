import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";

const data = [
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Sonnet",
    color: "#6E19DB",
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Haiku",
    color: "#279CB6",
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Vilanelle",
    color: "#F29100",
  },
  {
    imageUrl: "http://via.placeholder.com/160x160",
    title: "Poem",
    color: "red",
  },
];

class CategoryScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      navigateTO: "Category",
    };
  }

  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={this.state.data}
        renderItem={({ item: rowData }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                // this.props.navigate(this.state.navigateTO, {
                //   // id: item["id"],
                //   // title: item["title"],
                //   // top_image: item["top_image"],
                //   // token: this.state.token,
                //   // lan: this.state.lan,
                //   // type: this.state.type,
                // })
                this.props.navigation.navigate(this.state.navigateTO, {
                  categoryName: rowData.title
                })
              }
            >
              <Card
                title={null}
                containerStyle={{
                  width: 140,
                  height: 140,
                  borderRadius: 5,
                  borderWidth: 0,
                  shadowColor: "transparent",
                  marginLeft: 1,

                }}
              >
                <View
                  style={{
                    backgroundColor: `${rowData.color}`,
                    width: 12,
                    height: 12,
                    borderRadius: 50,
                  }}
                ></View>

                <View>
                  <Text style={categoryStyles.cardTitle}>{rowData.title}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const categoryStyles = StyleSheet.create({
  cardTitle: {
    top: 80,
    fontFamily: "WorkSansRegular",
    fontSize: 16,
  },
});

export default CategoryScroll;
