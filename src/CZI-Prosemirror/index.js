import React, { useState, useEffect } from 'react';
import html from './rawHtml.txt';

// import './dist.js';

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

export default () => {
  let [rawHtml, setRawHtml] = useState('');

  useEffect(() => {
    fetch(html).then(res => res.text()).then(data => {
      setRawHtml(data);
    })
  });

  return (
    <div style={{ height: "100%" }} id="czi-root">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <strong>这个库还在开发中，不建议使用，但插件可以参考</strong>
      <iframe title="czi" srcDoc={rawHtml} style={{ width: "100%", height: "100%" }}></iframe>
    </div>
  )
}