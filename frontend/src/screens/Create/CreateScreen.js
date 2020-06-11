import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Permissions, ImagePicker } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import CNRichTextEditor, {
  CNToolbar,
  getDefaultStyles,
  convertToObject,
} from "react-native-cn-richtext-editor";
import styles from "./styles";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext,
  MenuProvider,
  renderers,
} from "react-native-popup-menu";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "native-base";

const { SlideInMenu } = renderers;

const IS_IOS = Platform.OS === "ios";
const { width, height } = Dimensions.get("window");
const defaultStyles = getDefaultStyles();

class CreateScreen extends Component {
  constructor(props) {
    super(props);
    this.customStyles = {
      ...defaultStyles,
      body: { fontSize: 16 },
      heading: { fontSize: 24 },
      title: { fontSize: 20 },
      ol: { fontSize: 12 },
      ul: { fontSize: 12 },
      bold: { fontSize: 12, fontWeight: "bold", color: "" },
    };
    this.state = {
      selectedTag: "body",
      selectedColor: "default",
      selectedHighlight: "default",
      colors: ["red", "green", "blue"],
      highlights: [
        "yellow_hl",
        "pink_hl",
        "orange_hl",
        "green_hl",
        "purple_hl",
        "blue_hl",
      ],
      selectedStyles: [],
      // value: [getInitialObject()] get empty editor
      normal: null,
      value: convertToObject(
        "<div><p><span></span></p></div>",
        this.customStyles
      ),
      title: null,
    };

    this.editor = null;
  }

  onStyleKeyPress = (toolType) => {
    if (toolType == "image") {
      return;
    } else {
      this.editor.applyToolbar(toolType);
    }
  };

  onSelectedTagChanged = (tag) => {
    this.setState({
      selectedTag: tag,
    });
  };

  onSelectedStyleChanged = (styles) => {
    const colors = this.state.colors;
    const highlights = this.state.highlights;
    let sel = styles.filter((x) => colors.indexOf(x) >= 0);

    let hl = styles.filter((x) => highlights.indexOf(x) >= 0);
    this.setState({
      selectedStyles: styles,
      selectedColor: sel.length > 0 ? sel[sel.length - 1] : "default",
      selectedHighlight: hl.length > 0 ? hl[hl.length - 1] : "default",
    });
  };

  onTitleChange = (titleText) => {
    this.setState({
      title: titleText,
    });
  };

  onValueChanged = (value) => {
    this.setState({
      value: value,
    });
  };

  insertImage(url) {
    this.editor.insertImage(url);
  }

  askPermissionsAsync = async () => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    this.setState({
      hasCameraPermission: camera.status === "granted",
      hasCameraRollPermission: cameraRoll.status === "granted",
    });
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: false,
    });

    this.insertImage(result.uri);
  };

  useCameraHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: false,
    });
    console.log(result);

    this.insertImage(result.uri);
  };

  onImageSelectorClicked = (value) => {
    if (value == 1) {
      this.useCameraHandler();
    } else if (value == 2) {
      this.useLibraryHandler();
    }
  };

  onColorSelectorClicked = (value) => {
    if (value === "default") {
      this.editor.applyToolbar(this.state.selectedColor);
    } else {
      this.editor.applyToolbar(value);
    }

    this.setState({
      selectedColor: value,
    });
  };

  onHighlightSelectorClicked = (value) => {
    if (value === "default") {
      this.editor.applyToolbar(this.state.selectedHighlight);
    } else {
      this.editor.applyToolbar(value);
    }

    this.setState({
      selectedHighlight: value,
    });
  };

  onRemoveImage = ({ url, id }) => {
    // do what you have to do after removing an image
    console.log(`image removed (url : ${url})`);
  };

  renderImageSelector() {
    return (
      <Menu renderer={SlideInMenu} onSelect={this.onImageSelectorClicked}>
        <MenuTrigger>
          <MaterialCommunityIcons name="image" size={28} color="#737373" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption value={1}>
            <Text style={styles.menuOptionText}>Take Photo</Text>
          </MenuOption>
          <View style={styles.divider} />
          <MenuOption value={2}>
            <Text style={styles.menuOptionText}>Photo Library</Text>
          </MenuOption>
          <View style={styles.divider} />
          <MenuOption value={3}>
            <Text style={styles.menuOptionText}>Cancel</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }

  renderColorMenuOptions = () => {
    let lst = [];

    if (defaultStyles[this.state.selectedColor]) {
      lst = this.state.colors.filter((x) => x !== this.state.selectedColor);
      lst.push("default");
      lst.push(this.state.selectedColor);
    } else {
      lst = this.state.colors.filter((x) => true);
      lst.push("default");
    }

    return lst.map((item) => {
      let color = defaultStyles[item] ? defaultStyles[item].color : "black";
      return (
        <MenuOption value={item} key={item}>
          <MaterialCommunityIcons
            name="format-color-text"
            color={color}
            size={28}
          />
        </MenuOption>
      );
    });
  };

  renderHighlightMenuOptions = () => {
    let lst = [];

    if (defaultStyles[this.state.selectedHighlight]) {
      lst = this.state.highlights.filter(
        (x) => x !== this.state.selectedHighlight
      );
      lst.push("default");
      lst.push(this.state.selectedHighlight);
    } else {
      lst = this.state.highlights.filter((x) => true);
      lst.push("default");
    }

    return lst.map((item) => {
      let bgColor = defaultStyles[item]
        ? defaultStyles[item].backgroundColor
        : "black";
      return (
        <MenuOption value={item} key={item}>
          <MaterialCommunityIcons name="marker" color={bgColor} size={26} />
        </MenuOption>
      );
    });
  };

  renderColorSelector() {
    let selectedColor = "#737373";
    if (defaultStyles[this.state.selectedColor]) {
      selectedColor = defaultStyles[this.state.selectedColor].color;
    }

    return (
      <Menu renderer={SlideInMenu} onSelect={this.onColorSelectorClicked}>
        <MenuTrigger>
          <MaterialCommunityIcons
            name="format-color-text"
            color={selectedColor}
            size={28}
            style={{
              top: 2,
            }}
          />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          {this.renderColorMenuOptions()}
        </MenuOptions>
      </Menu>
    );
  }

  renderHighlight() {
    let selectedColor = "#737373";
    if (defaultStyles[this.state.selectedHighlight]) {
      selectedColor =
        defaultStyles[this.state.selectedHighlight].backgroundColor;
    }
    return (
      <Menu renderer={SlideInMenu} onSelect={this.onHighlightSelectorClicked}>
        <MenuTrigger>
          <MaterialCommunityIcons
            name="marker"
            color={selectedColor}
            size={24}
            style={{}}
          />
        </MenuTrigger>
        <MenuOptions customStyles={highlightOptionsStyles}>
          {this.renderHighlightMenuOptions()}
        </MenuOptions>
      </Menu>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={IS_IOS ? 0 : 0}
        style={styles.root}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "WorkSansLight",
                marginBottom: 12,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => console.log(this.state.title)}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "WorkSansRegular",
                marginBottom: 12,
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
        <MenuProvider style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
            <View style={styles.main}>
              <View style={styles.titleContainer}>
                <TextInput
                  placeholder={"Title"}
                  style={styles.titleText}
                  onChangeText={(text) => this.onTitleChange(text)}
                />
              </View>
              <CNRichTextEditor
                ref={(input) => (this.editor = input)}
                onSelectedTagChanged={this.onSelectedTagChanged}
                onSelectedStyleChanged={this.onSelectedStyleChanged}
                value={this.state.value}
                style={styles.editor}
                styleList={this.customStyles}
                foreColor="dimgray" // optional (will override default fore-color)
                onValueChanged={this.onValueChanged}
                onRemoveImage={this.onRemoveImage}
                placeholder={"Create something..."}
              />
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.toolbarContainer}>
            <CNToolbar
              style={{
                height: 35,
              }}
              iconSetContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
              size={28}
              iconSet={[
                {
                  type: "tool",
                  iconArray: [
                    {
                      toolTypeText: "bold",
                      buttonTypes: "style",
                      iconComponent: (
                        <MaterialCommunityIcons name="format-bold" />
                      ),
                    },
                    {
                      toolTypeText: "italic",
                      buttonTypes: "style",
                      iconComponent: (
                        <MaterialCommunityIcons name="format-italic" />
                      ),
                    },
                    {
                      toolTypeText: "underline",
                      buttonTypes: "style",
                      iconComponent: (
                        <MaterialCommunityIcons name="format-underline" />
                      ),
                    },
                    {
                      toolTypeText: "lineThrough",
                      buttonTypes: "style",
                      iconComponent: (
                        <MaterialCommunityIcons name="format-strikethrough-variant" />
                      ),
                    },
                  ],
                },
                {
                  type: "seperator",
                },
                {
                  type: "tool",
                  iconArray: [
                    {
                      toolTypeText: "body",
                      buttonTypes: "tag",
                      iconComponent: (
                        <MaterialCommunityIcons name="format-text" />
                      ),
                    },
                    {
                      toolTypeText: "title",
                      buttonTypes: "tag",
                      iconComponent: (
                        <MaterialCommunityIcons name="format-header-1" />
                      ),
                    },
                    {
                      toolTypeText: "heading",
                      buttonTypes: "tag",
                      iconComponent: (
                        <MaterialCommunityIcons name="format-header-3" />
                      ),
                    },
                  ],
                },
                // {
                //   type: "seperator",
                // },
                {
                  type: "tool",
                  iconArray: [
                    // {
                    //   toolTypeText: "image",
                    //   iconComponent: this.renderImageSelector(),
                    // },
                    // {
                    //   toolTypeText: "color",
                    //   iconComponent: this.renderColorSelector(),
                    // },
                    // {
                    //   toolTypeText: "highlight",
                    //   iconComponent: this.renderHighlight(),
                    // },
                  ],
                },
              ]}
              selectedTag={this.state.selectedTag}
              selectedStyles={this.state.selectedStyles}
              onStyleKeyPress={this.onStyleKeyPress}
              backgroundColor="" // optional (will override default backgroundColor)
              color="gray" // optional (will override default color)
              selectedColor="white" // optional (will override default selectedColor)
              selectedBackgroundColor="black" // optional (will override default selectedBackgroundColor)
            />
          </View>
        </MenuProvider>
      </KeyboardAvoidingView>
    );
  }
}

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "yellow",
    padding: 0,
    width: 40,
    marginLeft: width - 40 - 30,
    alignItems: "flex-end",
  },
  optionsWrapper: {
    //width: 40,
    backgroundColor: "white",
  },
  optionWrapper: {
    //backgroundColor: 'yellow',
    margin: 2,
  },
  optionTouchable: {
    underlayColor: "gold",
    activeOpacity: 70,
  },
  // optionText: {
  //   color: 'brown',
  // },
};

const highlightOptionsStyles = {
  optionsContainer: {
    backgroundColor: "transparent",
    padding: 0,
    width: 40,
    marginLeft: width - 40,

    alignItems: "flex-end",
  },
  optionsWrapper: {
    //width: 40,
    backgroundColor: "white",
  },
  optionWrapper: {
    //backgroundColor: 'yellow',
    margin: 2,
  },
  optionTouchable: {
    underlayColor: "gold",
    activeOpacity: 70,
  },
  // optionText: {
  //   color: 'brown',
  // },
};

export default CreateScreen;