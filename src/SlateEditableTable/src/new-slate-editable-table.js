import React from 'react';
import {
  useSlate,
} from "slate-react";
import { defaultOptions } from './option';
import commands from './commands';
import { tableRenderer } from './renderers';

const withTable = editor => {
  const { exec, isVoid } = editor

  editor.isVoid = element => {
    return {
      table: true,
      'table-row': true,
      'table-cell': true,
      'table-content': true,
    }[element.type] || isVoid(element)
  }

  editor.exec = command => {
    if (command.type === 'table_handler') {

      commands[command.method](editor);
      // const removeTable = () => editor.removeTable();
      // const insertTable = () => editor.insertTable(3, 3, { columnWidth: 200, maxWidth: 500 });
      // const insertLeft = () => editor.insertLeft();
      // const insertRight = () => editor.insertRight();
      // const insertAbove = () => editor.insertAbove();
      // const insertBelow = () => editor.insertBelow();
      // const removeColumn = () => editor.removeColumn();
      // const removeRow = () => editor.removeRow();
      // const mergeSelection = () => editor.mergeSelection();
      // const splitCell = () => editor.splitCell();
      // const enableResizing = () => editor.enableResizing();
      // const disableResizing = () => editor.disableResizing();
    } else {
      exec(command)
    }
  }

  return editor
}

const TableToolbar = () => {
  const editor = useSlate();

  const TableToolbarBtn = ({ method, children }) => {
    return (
      <button onMouseDown={event => {
        event.preventDefault();
        editor.exec({ type: "table_handler", method });
      }}>{children}</button>
    )
  }

  return (
    <div>
      <TableToolbarBtn method="insertTable">Insert Table</TableToolbarBtn>
      <TableToolbarBtn method="insertAbove">Insert Above</TableToolbarBtn>
      <TableToolbarBtn method="insertBelow">Insert Below</TableToolbarBtn>
      <TableToolbarBtn method="insertLeft">Insert Left</TableToolbarBtn>
      <TableToolbarBtn method="insertRight">Insert Right</TableToolbarBtn>
      <TableToolbarBtn method="mergeSelection">merge selection</TableToolbarBtn>
      <TableToolbarBtn method="splitCell">split cell</TableToolbarBtn>
      <TableToolbarBtn method="removeColumn">Remove Column</TableToolbarBtn>
      <TableToolbarBtn method="removeRow">Remove Row</TableToolbarBtn>
      <TableToolbarBtn method="removeTable">Remove Table</TableToolbarBtn>
      <TableToolbarBtn method="disableResizing">disable resizing</TableToolbarBtn>
      <TableToolbarBtn method="enableResizing">enable resizing</TableToolbarBtn>
    </div>
  )
}

export {
  tableRenderer,
  withTable,
  TableToolbar,
  defaultOptions,
}