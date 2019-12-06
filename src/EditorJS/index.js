import React from 'react';
import EditorJS from '@editorjs/editorjs';
import defaultData from './data';
import Header from '@editorjs/header';
// import LinkTool from '@editorjs/link';
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

export default () => {
  const data = defaultData;

  new EditorJS({
    holderId: 'codex-editor-root',
    placeholder: '点我写',
    tools: {
      header: Header,
      // linkTool: LinkTool,
      raw: {
        class: RawTool,
        config: {
          placeholder: 'Hello World 😃 This is Editor playground of Editor-js',
        },
      },
      image: {
        class: SimpleImage,
        // inlineToolbar: true, // 是否开启在图片插件内使用工具条（编辑图片配文）
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
      embed: {
        class: Embed,
        // config: {
        //   services: {}
        // }
        // https://codepen.io/bali_balo/full/yJOmgv/
      },
      quote: {
        class: Quote,
        inlineToolbar: true,
        config: {
          quotePlaceholder: 'Enter a quote',
          captionPlaceholder: 'Quote\'s author',
        },
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
          rows: 2,
          cols: 3,
        },
      },
    },
    data,
  });

  return (
    <div style={{ height: '100%' }}>
      <div id="codex-editor-root" style={{ width: 750, margin: '0 auto', padding: '20px', background: '#fff' }}>
      </div>
    </div>
  )
}