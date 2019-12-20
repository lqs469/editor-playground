
import React, { useCallback, useMemo, useState } from "react";
import {
  Slate,
  Editable,
  useSlate,
  // useEditor,
  // useSelected,
  // useFocused,
  // useReadOnly,
  withReact,
  // ReactEditor
} from "slate-react";
import { Editor, Range, Point, createEditor } from "slate";
import { withHistory } from "slate-history";
// import { css } from 'emotion';
import { Button, Icon, Toolbar } from "../SlateJS/components";
import '../SlateJS/index.css';
import initialValue from './initialValue';

import { tableRenderer, withTable, TableToolbar, defaultOptions } from './src/new-slate-editable-table';

const TEXT_FORMATS = ["bold", "italic", "underlined", "code"];
const LIST_FORMATS = ["numbered-list", "bulleted-list"];
const BLOCK_FORMATS = [
  ...LIST_FORMATS,
  "heading-one",
  "heading-two",
  "heading-three",
  "heading-four",
  "heading-five",
  "heading-six",
  "block-quote"
];

const withRichText = editor => {
  const { exec, isInline, isVoid } = editor;

  editor.isInline = element => {
    const inlineSet = new Set([]);

    return inlineSet.has(element.type) || isInline(element)
  }

  editor.isVoid = element => {
    const voidSet = new Set([]);

    return voidSet.has(element.type) || isVoid(element)
  }

  editor.exec = command => {
    const { selection } = editor
    switch (command.type) {
      case 'insert_data':
      case 'insert_text': {
        exec(command)
        break
      }

      case 'delete_backward': {
        if (
          selection &&
          Range.isCollapsed(selection)
        ) {
          const [matchBlock] = Editor.nodes(editor, { match: 'block' })
          if (matchBlock) {
            const [block, path] = matchBlock
            const start = Editor.start(editor, path)
    
            if (
              block.type !== 'paragraph' &&
              Point.equals(selection.anchor, start)
            ) {
              Editor.setNodes(editor, { type: 'paragraph' })
    
              if (block.type === 'list-item') {
                Editor.unwrapNodes(editor, { match: { type: 'bulleted-list' } })
              }
    
              return
            }
          }
        }

        exec(command)
        break
      }

      case 'toggle_format': {
        const { format } = command;
        const isActive = isFormatActive(editor, format);
        const isList = LIST_FORMATS.includes(format);

        if (TEXT_FORMATS.includes(format)) {
          Editor.setNodes(
            editor,
            { [format]: isActive ? null : true },
            { match: "text", split: true }
          );
        }

        if (BLOCK_FORMATS.includes(format)) {
          for (const f of LIST_FORMATS) {
            Editor.unwrapNodes(editor, { match: { type: f }, split: true });
          }

          Editor.setNodes(editor, {
            type: isActive ? "paragraph" : isList ? "list-item" : format
          });

          if (!isActive && isList) {
            Editor.wrapNodes(editor, { type: format, children: [] });
          }
        }

        break
      }

      default: {
        exec(command)
      }
    }
  };

  return editor;
};

const isFormatActive = (editor, format) => {
  if (TEXT_FORMATS.includes(format)) {
    const [match] = Editor.nodes(editor, {
      match: { [format]: true },
      mode: "all"
    });

    return !!match;
  }

  if (BLOCK_FORMATS.includes(format)) {
    const [match] = Editor.nodes(editor, {
      match: { type: format },
      mode: "all"
    });

    return !!match;
  }

  return false;
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isFormatActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        editor.exec({ type: "toggle_format", format });
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default () => {
  const [value, setValue] = useState(initialValue);
  const [selection, setSelection] = useState(null);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withTable(withRichText(withHistory(withReact(createEditor())))),
    []
  );

  return (
    <div  style={{ width: '700px', margin: '20px auto' }}>
      <Slate
        editor={editor}
        value={value}
        selection={selection}
        onChange={(value, selection) => {
          setValue(value);
          setSelection(selection);
        }}
      >
        <Toolbar>
          <FormatButton format="bold" icon="format_bold" />
          <FormatButton format="italic" icon="format_italic" />
          <FormatButton format="underlined" icon="format_underlined" />
          <FormatButton format="code" icon="code" />
          <FormatButton format="heading-one" icon="looks_one" />
          <FormatButton format="heading-two" icon="looks_two" />
          <FormatButton format="heading-three" icon="looks_3" />
          <FormatButton format="heading-four" icon="looks_4" />
          <FormatButton format="heading-five" icon="looks_5" />
          <FormatButton format="heading-six" icon="looks_6" />
          <FormatButton format="block-quote" icon="format_quote" />
          <FormatButton format="numbered-list" icon="format_list_numbered" />
          <FormatButton format="bulleted-list" icon="format_list_bulleted" />
          <TableToolbar />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="在这里输入..."
          spellCheck
          autoFocus
        />
      </Slate>
    </div>
  );
};


const ref = React.createRef();
const TableRenderer = tableRenderer(ref);

const Element = props => {
  const { attributes, children, element } = props
  console.log(element.type)

  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case defaultOptions.typeTable:
    case defaultOptions.typeRow:
    case defaultOptions.typeCell:
    case defaultOptions.typeContent:
      console.log('😎', props);
      
      return <TableRenderer {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
