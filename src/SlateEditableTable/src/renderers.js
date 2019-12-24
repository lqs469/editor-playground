import React, { memo, useCallback, useEffect, forwardRef } from 'react';
import { Editor } from "slate";
import {
  useEditor,
} from "slate-react";
import { HistoryEditor } from 'slate-history';
import { ComponentStore } from './store';
import { removeSelection, addSelectionStyle } from './selection';
import { useResizableTable } from './use-resizable';
import { defaultOptions } from './option';
import * as table from './layout';





// 表格组件
const Table = forwardRef((props, tableRef) => {
  const [disableResizing, forceUpdate] = React.useState(false);
  const maxWidth = typeof props.maxWidth === 'undefined' ? 'auto' : props.maxWidth + 'px';
  const editor = useEditor();

  // const onInit = useCallback((values) => {
  //   props.onInit(editor, values);
  // }, [editor]);

  useEffect(() => {
    if (!ref.current) {
      ref.current = props.attributes && props.attributes.ref && props.attributes.ref.current;
    }
    update();
  }, []);

  const onUpdate = useCallback((values) => {
    props.onUpdate(editor, values);
  }, [editor]);

  const onResizeStop = useCallback((e, values) => {
    // editor.blur && editor.blur();
    props.onResizeStop(editor, values);
  }, [editor]);

  const onResizeStart = useCallback((e) => {
    e.stopPropagation();
    // editor.blur && editor.blur();
    removeSelection(editor);
    // props.store.setAnchorCellBlock(null);
    // props.store.setFocusCellBlock(null);
  }, [editor]);

  const { ref, update } = useResizableTable({
    disableResizing,
    maxWidth: props.maxWidth,
    minimumCellWidth: props.minimumCellWidth,
    onResizeStart,
    onResizeStop,
    // onResize,
    // onInit,
    onUpdate,
    onHandleHover: props.onHandleMouseOver,
  });

  

  // useEffect(() => {
  //   props.store.subscribeDisableResizing(editor, v => {
  //     forceUpdate(v);
  //   });
  // }, []);

  // React.useImperativeHandle(tableRef, () => ({
  //   update: () => {
  //     update();
  //   },
  // }));

  // const onDragStart = useCallback((e) => {
  //   e.preventDefault();
  // }, []);

  const [allowSelection, setAllowSelection] = React.useState(true);
  const [prevSelection, setPrevSelection] = React.useState(null);

  useEffect(() => {
    if (
      allowSelection
      &&editor.selection
      && prevSelection !== JSON.stringify(editor.selection)
    ) {
      console.log('💡', prevSelection, JSON.stringify(editor.selection));
      setPrevSelection(JSON.stringify(editor.selection));
      addSelectionStyle(editor);
    }
  }, [editor.selection]);

  const onClearSelection = useCallback(e => {
    console.log('🔥', e.target.attributes['slate-table-element']);
    if (e.target.attributes['slate-table-element']) {
      setAllowSelection(true);
    } else {
      removeSelection(props.editor);
      setAllowSelection(false);
    }
  });

  useEffect(() => {
    window.addEventListener('mousedown', onClearSelection);
    return () => {
      window.removeEventListener('mousedown', onClearSelection);
    }
  }, [])

  return (
    <table
      ref={ref}
      style={{
        ...props.style,
        maxWidth,
      }}
      // {...props.attributes}
      // onDragStart={onDragStart}
      // type={props.type}
      slate-table-element="table"
    >
      {props.children}
    </table>
  );
});






// 表格单元
const Cell = props => {
  // const editor = useEditor()

  // const onMouseUp = useCallback(e => {
  //   props.store.clearCellSelecting(props.editor);
  //   window.removeEventListener('mouseup', onMouseUp);
  // }, []);

  // const onWindowClick = useCallback(e => {
  //     if (!table.findCurrentTable(props.editor, props.opts)) {
  //       removeSelection(props.editor);
  //       props.store.setAnchorCellBlock(null);
  //       props.store.setFocusCellBlock(null);
  //       window.removeEventListener('click', onWindowClick);
  //     }
  //   },
  //   [props.editor, props.opts],
  // );

  // React.useEffect(() => {
  //   return () => {
  //     window.removeEventListener('mouseup', onMouseUp);
  //     window.removeEventListener('click', onWindowClick);
  //   };
  // }, [onMouseUp, onWindowClick]);

  

  const tdStyles = {
    ...props.opts.cellStyle,
    minWidth: `${props.opts.minimumCellWidth}px`,
    width: `${props.node.data.width}px` || 'auto',
    verticalAlign: 'baseline',
    ...(props.node.data.style || {}),
  };

  if (props.node.selectionColor) {
    tdStyles.backgroundColor = props.node.selectionColor;
  }

  return (
    <td
      data-key={props['data-key']}
      // type={props.type}
      {...props.attributes}
      onMouseDown={e => {
        // if (!(e.target instanceof HTMLElement)) return;
        // props.store.setAnchorCellBlock(null);
        // props.store.setFocusCellBlock(null);
        // removeSelection(props.editor);
        // props.store.setCellSelecting(props.editor);
        // const anchorCellBlock = table.findCellBlockByElement(props.editor, e.target, props.opts);
        // props.store.setAnchorCellBlock(anchorCellBlock);
        // window.addEventListener('mouseup', onMouseUp);
        // window.addEventListener('click', onWindowClick);
      }}
      onMouseOver={e => {
        // e.stopPropagation();
        // const anchorCellBlock = props.store.getAnchorCellBlock();
        // if (anchorCellBlock === null) return;
        // if (!(e.target instanceof HTMLElement)) return;
        // if (!props.store.getCellSelecting()) return;
        // const focusCellBlock = table.findCellBlockByElement(props.editor, e.target, props.opts);
        // if (!focusCellBlock) return;
        // const prevFocusBlock = props.store.getFocusCellBlock();
        
        // if (focusCellBlock === prevFocusBlock) return;
        // if (focusCellBlock.key === (prevFocusBlock && prevFocusBlock.key)) return;
        

        // const t = table.TableLayout.create(props.editor, props.opts);
        // if (!t) {
        //   removeSelection(props.editor);
        //   props.store.setAnchorCellBlock(null);
        //   props.store.setFocusCellBlock(null);
        //   return;
        // }
        // props.store.setFocusCellBlock(focusCellBlock);
        // // HACK: Add ::selection style when greater than 1 cells selected.
        // addSelectionStyle(props.editor);

        // const blocks = table.createSelectedBlockMap(props.editor, anchorCellBlock.key, focusCellBlock.key, props.opts);
        
        // HistoryEditor.withoutSaving(editor, () => {
        //   t.table.forEach(row => {
        //     row.forEach(cell => {
        //       if (blocks[cell.key]) {
        //         props.editor.setNodeByKey(cell.key, {
        //           type: cell.block.type,
        //           data: {
        //             ...cell.block.data.toObject(),
        //             selectionColor: props.opts.selectionColor,
        //           },
        //         });
        //       } else {
        //         props.editor.setNodeByKey(cell.key, {
        //           type: cell.block.type,
        //           data: {
        //             ...cell.block.data.toObject(),
        //             selectionColor: null,
        //           },
        //         });
        //       }
        //     });
        //   });
        // });
      }}

      colSpan={props.node.data.colspan}
      rowSpan={props.node.data.rowspan}
      style={tdStyles}
      slate-table-element="td"
    >
      {props.children}
    </td>
  );
};




// 表格文本内容
const Content = memo(({ attributes, children, type }) => {
  return (
    <p
      style={{ margin: 0 }}
      {...attributes}
      type={type}
      slate-table-element="p"
    >{children}</p>
  );
});






const updateWidth = (editor, value) => {
  console.log('[updateWidth]', editor, value);
  if (editor.selection) {
    Object.keys(value).forEach(k => {
      const [block] = Editor.nodes(editor, { match: { key: k } })
      if (!block || !block[0]) return;
  
      const selectedType = block[0].type;
      const selectedData = block[0].data
      Editor.setNodes(editor, {
        type: selectedType,
        data: { ...selectedData, width: value[k] },
      }, {
        match: { key: k }
      });
    });
  } else {
    function fn(node, handler) {
      if (node.key) {
        handler(node);
        return [node];
      }
      
      const nodes = node.children.reduce((p, c) => {
        const validNodes = fn(c, handler);
        return [...p, ...validNodes];
      }, []);
      
      return nodes;
    }
    
    fn(editor, (node) => {
      node.data = { ...node.data, width: value[node.key] };
    });
  }
}

// Table 渲染工厂
export const tableRenderer = (ref) => {
  console.log('渲染工厂');
  const store = new ComponentStore();
  const opts = defaultOptions;
  
  return (props) => {
    const { attributes, children, element } = props;
    const editor = useEditor()

    switch (element.type) {
      case defaultOptions.typeTable: {
        return (
          <Table
            ref={ref}
            // type={element.type}
            editor={editor}
            store={store}
            onInit={updateWidth}
            onUpdate={updateWidth}
            onResizeStop={updateWidth}
            // maxWidth={null}
            minimumCellWidth={opts.minimumCellWidth}
            style={opts.tableStyle}
            attributes={attributes}
          >
            <tbody slate-table-element="tbody">{children}</tbody>
          </Table>
        )
      }
      case defaultOptions.typeRow: {
        return (
          <tr
            {...attributes}
            style={defaultOptions.rowStyle}
            onDrag={e => e.preventDefault()}
            // type={element.type}
          >
            {children}
          </tr>
        );
      }
      
      case defaultOptions.typeCell: {
        return (
          <Cell
            // type={element.type}
            editor={editor}
            store={store}
            node={children.props.node}
            attributes={attributes} 
            opts={opts}
            data-key={element.key}
          >
            {children}
          </Cell>
        );
      }
      
      case defaultOptions.typeContent: {
        return (
          <Content
            // type={element.type}
            attributes={attributes}
          >
            {children}
          </Content>
        );
      }
      
      default:
        debugger
        return;
    }
  }
}