import React, { Component } from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleAddTodo } from "../reducers";

class AddTodo extends Component {
  state = {
    text: ""
  };

  handleChangeText = text => {
    this.setState({ text });
  };

  onHandleAddTodo = event => {
    event.preventDefault();
    const { text } = this.state;
    if (!text.trim()) {
      return;
    }
    const payload = { text };
    const cleanup = () => {
      this.setState({ text: "" });
    };
    this.props.handleAddTodo(payload, cleanup);
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={this.state.text}
          placeholder={"What to get done?"}
          onChangeText={this.handleChangeText}
          maxLength={25}
          returnKeyType="go"
          onSubmitEditing={this.onHandleAddTodo}
          {...(Platform.OS === "ios"
            ? { clearButtonMode: "while-editing" }
            : {})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: 15,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textInput: {
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleAddTodo }, dispatch);
};

AddTodo = connect(
  null,
  mapDispatchToProps
)(AddTodo);

export default AddTodo;
