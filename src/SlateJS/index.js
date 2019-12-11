import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import isUrl from 'is-url';
import imageExtensions from 'image-extensions'
import {
  Slate,
  Editable,
  useSlate,
  useEditor,
  useSelected,
  useFocused,
  withReact,
} from "slate-react";
import { Editor, Range, Point, createEditor } from "slate";
import { withHistory } from "slate-history";
import { css } from 'emotion';
import { Button, Icon, Toolbar } from "./components";
import initialValue from "./data";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underlined",
  "mod+`": "code"
};

const TEXT_FORMATS = ["bold", "italic", "underlined", "code"];
const LIST_FORMATS = ["numbered-list", "bulleted-list"];
const BLOCK_FORMATS = [
  ...LIST_FORMATS,
  "heading-one",
  "heading-two",
  "block-quote"
];

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
}

const withRichText = editor => {
  const { exec, isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element)
  }

  editor.exec = command => {
    const { selection } = editor
    let text = ''

    switch (command.type) {
      case 'insert_data':
      case 'insert_text': {
        if (command.type === 'insert_data') {
          text = command.data.getData('text/plain')
          const { files } = command.data

          if (files && files.length > 0) {
            for (const file of files) {
              const reader = new FileReader()
              const [mime] = file.type.split('/')

              if (mime === 'image') {
                reader.addEventListener('load', () => {
                  const url = reader.result
                  editor.exec({ type: 'insert_image', url })
                })

                reader.readAsDataURL(file)
              }
            }
          } else if (isImageUrl(text)) {
            editor.exec({ type: 'insert_image', url: text })
          } else if (text && isUrl(text)) {
            wrapLink(editor, text)
          }
        } else if (command.type === 'insert_text') {
          text = command.text

          if (
            text === ' ' &&
            selection &&
            Range.isCollapsed(selection)
          ) {
            const { anchor } = selection
            const [block] = Editor.nodes(editor, { match: 'block' })
            const path = block ? block[1] : []
            const start = Editor.start(editor, path)
            const range = { anchor, focus: start }
            const beforeText = Editor.text(editor, range)
            const type = SHORTCUTS[beforeText]
      
            if (type) {
              Editor.select(editor, range)
              Editor.delete(editor)
              Editor.setNodes(editor, { type }, { match: 'block' })
      
              if (type === 'list-item') {
                const list = { type: 'bulleted-list', children: [] }
                Editor.wrapNodes(editor, list, { match: { type: 'list-item' } })
              }
      
              return
            }
          }
        }

        exec(command)
        break
      }

      case 'delete_backward': {
        if (
          selection &&
          Range.isCollapsed(selection)
        ) {
          const [match] = Editor.nodes(editor, { match: 'block' })
    
          if (match) {
            const [block, path] = match
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

      case 'insert_image': {
        const { url } = command
        const text = { text: '' }
        const image = { type: 'image', url, children: [text] }
        Editor.insertNodes(editor, image)
        break
      }

      case 'insert_link': {
        const { url } = command

        if (selection) {
          wrapLink(editor, url)
        }

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

const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: { type: 'link' } })
  return !!link
}

const isImageUrl = url => {
  if (!url) return false
  if (!isUrl(url)) return false
  const ext = new URL(url).pathname.split('.').pop()
  return imageExtensions.includes(ext)
}

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    Editor.unwrapNodes(editor, { match: { type: 'link' } })
    return
  }

  const link = { type: 'link', url, children: [] }
  Editor.wrapNodes(editor, link, { split: true })
  Editor.collapse(editor, { edge: 'end' })
}

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

const LinkButton = () => {
  const editor = useSlate()
  const isActive = isLinkActive(editor);
  const [link] = Editor.nodes(editor, { match: { type: 'link' } })
  const linkValue = link && link[0] ? link[0].url : ''

  return (
    <Button
      active={isActive}
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:', linkValue);
        editor.exec({ type: 'insert_link', url })
      }}
    >
      <Icon>link</Icon>
    </Button>
  )
}

const InsertImageButton = () => {
  const editor = useEditor()
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('请输入图片链接')
        if (!url) return
        editor.exec({ type: 'insert_image', url })
      }}
    >
      <Icon>image</Icon>
    </Button>
  )
}

export default () => {
  const [value, setValue] = useState(initialValue);
  const [selection, setSelection] = useState(null);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withRichText(withHistory(withReact(createEditor()))),
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
          <FormatButton format="block-quote" icon="format_quote" />
          <FormatButton format="numbered-list" icon="format_list_numbered" />
          <FormatButton format="bulleted-list" icon="format_list_bulleted" />
          <LinkButton />
          <InsertImageButton />
        </Toolbar>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="在这里输入..."
          spellCheck
          autoFocus
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                editor.exec({ type: "toggle_format", format: HOTKEYS[hotkey] });
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const Element = props => {
  const { attributes, children, element } = props

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
    case 'link':
      return <a {...attributes} href={element.url}>{children}</a>;
    case 'image':
      return <ImageElement {...props} />
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

const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          alt={element.url}
          src={element.url}
          className={css`
            display: block;
            max-width: 100%;
            max-height: 20em;
            box-shadow: ${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'};
          `}
        />
      </div>
      {children}
    </div>
  )
}