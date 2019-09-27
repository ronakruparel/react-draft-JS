import React from "react";
import { Editor, EditorState, Modifier } from "draft-js";
import ReactDOM from "react-dom";

const HANDLED = "handled";

class AwesomeFixEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  handleOnChange = editorState => this.setState({ editorState });

  handleBeforeInput = (chars, editorState) => {
    const currentContentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    this.handleOnChange(
      EditorState.push(
        editorState,
        Modifier.replaceText(currentContentState, selectionState, chars)
      )
    );

    return HANDLED;
  };

  render() {
    const { editorState } = this.state;

    return (
      <div style={{ minHeight: "8.5in",border: "1px solid black" }}>
        <Editor
          editorState={editorState}
          handleBeforeInput={this.handleBeforeInput}
          onChange={this.handleOnChange}
          placeholder="Start typig here"
        />
      </div>
    );
  }
}
ReactDOM.render(<AwesomeFixEditor />, document.getElementById("root"));
