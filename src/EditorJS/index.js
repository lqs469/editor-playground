import React from 'react';
import EditorJS from '@editorjs/editorjs';
import defaultData from './data';
// import LinkTool from '@editorjs/link';
import Header from '@editorjs/header';
import RawTool from '@editorjs/raw';
import SimpleImage from '@editorjs/simple-image';
import Checklist from '@editorjs/checklist';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import Warning from '@editorjs/warning';
import Table from '@editorjs/table';
import AttachesTool from '@editorjs/attaches';

export default () => {
  const data = defaultData;

  const editor = new EditorJS({
    holderId: 'codex-editor-root',
    placeholder: '在此处输入',
    tools: {
      // linkTool: LinkTool,
      header: {
        class: Header,
        inlineToolbar: ['link'],
        config: {
          placeholder: 'Header'
        },
        shortcut: 'CMD+SHIFT+H'
      },
      raw: {
        class: RawTool,
        config: {
          placeholder: 'Hello World 😃 This is Editor playground of Editor-js',
        },
      },
      image: {
        class: SimpleImage,
        inlineToolbar: ['link'],
        toolbox: {
          title: 'Image',
          icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
        },
      },
      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
      embed: Embed,
      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: '在这里输入引用',
          captionPlaceholder: 'Quote\'s author',
        },
        shortcut: 'CMD+SHIFT+O'
      },
      Marker,
      code: {
        class: CodeTool,
        placeholder: '在这写代码',
      },
      delimiter: Delimiter,
      inlineCode: InlineCode,
      warning: Warning,
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 3,
          cols: 3,
        },
      },
      attaches: {
        class: AttachesTool,
        config: {
          endpoint: 'http://localhost:8008/uploadFile',
          buttonText: '上传文件',
        }
      }
    },
    data,
    onReady() {
      handleSave();
    },
    onChange() {
      console.log('something changed');
    }
  });

  const handleSave = () => {
    editor.save().then((savedData) => {
      console.log('[savedData]', savedData);
    });
  }

  return (
    <div>
      <div style={{ height: '100%', width: 750, margin: '20px auto', background: '#fff' }}>
        <div id="codex-editor-root" style={{ }}>
        </div>
      </div>
    </div>
  )
}