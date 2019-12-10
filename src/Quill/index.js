import React, { useRef, useEffect, useState } from 'react'
import Quill from 'quill'
import data from './data'

import './index.css'

const Delta = Quill.import('delta');
const toolbarOptions = [
  [{ 'font': [] }],
  [{ 'align': [] }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  ['blockquote', 'code-block'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],


  ['clean'],                                        // remove formatting button
  ['link', 'image']
];

export default () => {
  const [html, setHTML] = useState('');

  let quillEditorRef = useRef(null);
  
  const quillGetHTML = () => {
    let quillEditor = quillEditorRef.current;
    var tempCont = document.createElement("div");
    (new Quill(tempCont)).setContents(quillEditor.getContents());
    const quillDOM = tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    console.log(quillDOM);
    setHTML(quillDOM);
  };

  useEffect(() => {
    let change = new Delta();
    let quillEditor = quillEditorRef.current = new Quill('#quill-editor', {
      modules: {
        toolbar: toolbarOptions
      },
      placeholder: '在这里输入',
      theme: 'snow'
    });

    quillEditor.setContents(data);
    
    quillEditor.on('text-change', (delta) => {
      change = change.compose(delta);
      console.log('[quill change]', change);
    });
  }, [])

  return (
    <div>
      <div id='quill-editor'>
        <p>Hello World!</p>
      </div>

      <button onClick={quillGetHTML}>export HTML</button>
      <p>{ html }</p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  )
}