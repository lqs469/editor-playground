import {
  Editor,
} from 'slate';
import { createTable } from '../create-table';
// import { Option } from '../option';

function insertTable(editor, opts, columns = 2, rows = 2) {
  // if (editor.selection.anchor.offset) return false;

  const table = createTable(opts, columns, rows);
  // const text = {
  //   object: 'block',
  //   type: 'paragraph',
  //   nodes: [Text.create('').toJSON()],
  // };
  
  // return editor
  //   .insertBlock(Block.fromJSON(text))
  //   .moveToStartOfPreviousBlock()
  //   .insertBlock(Block.fromJSON(text))
  //   .insertBlock(table);

  // const { url } = command
  Editor.insertNodes(editor, table);
}

export default insertTable;