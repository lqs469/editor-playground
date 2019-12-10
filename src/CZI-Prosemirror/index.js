import React from 'react';
// import { createEmptyEditorState, RichTextEditor } from 'czi-prosemirror';

// export default class CZIEditor extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       editorState: createEmptyEditorState(),
//     };
//   }

//   _onChange = (editorState) => {
//     this.setState({editorState});
//   };

//   render() {
//     const { editorState, editorView} = this.state;

//     return (
//       <RichTextEditor
//         editorState={editorState}
//         onChange={this._onChange}
//       />
//     );
//   }
// }

export default () => (
  <div style={{ height: "100%" }}>
    <strong>这个库还在开发中，不建议使用，但插件可以参考</strong>
    <iframe title="czi" src="https://cdn.summitlearning.org/assets/czi_prosemirror_0_0_1_b_index.html" width="100%" height="100%"></iframe>
  </div>
)