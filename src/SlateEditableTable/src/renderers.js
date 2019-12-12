import React, { memo, useCallback } from 'react';
import {
  useEditor,
} from "slate-react";
import { ComponentStore } from './store';
import { removeSelection, addSelectionStyle } from './selection';
import { useResizableTable } from './use-resizable';
import { defaultOptions } from './option';
import * as table from './layout';






export const InnerTable = React.forwardRef((props, tableRef) => {
  const [disableResizing, forceUpdate] = React.useState(false);
  const maxWidth = typeof props.maxWidth === 'undefined' ? 'auto' : props.maxWidth + 'px';
  const onInit = React.useCallback(
    (values) => {
      props.onInit(props.editor, values);
    },
    [props.editor],
  );

  const onUpdate = React.useCallback(
    (values) => {
      props.onUpdate(props.editor, values);
    },
    [props.editor],
  );

  const onResizeStop = React.useCallback(
    (e, values) => {
      props.editor.blur();
      props.onResizeStop(props.editor, values);
    },
    [props.editor],
  );

  const onResizeStart = React.useCallback(
    (e) => {
      e.stopPropagation();
      props.editor.blur();
      removeSelection(props.editor);
      props.store.setAnchorCellBlock(null);
      props.store.setFocusCellBlock(null);
    },
    [props.editor],
  );

  const { ref, update } = useResizableTable({
    disableResizing,
    maxWidth: props.maxWidth,
    minimumCellWidth: props.minimumCellWidth,
    onResizeStart,
    // onResize,
    onResizeStop,
    onInit,
    onUpdate,
    onHandleHover: props.onHandleMouseOver,
  });

  React.useEffect(() => {
    props.store.subscribeDisableResizing(props.editor, v => {
      forceUpdate(v);
    });
  }, []);

  React.useEffect(() => {
    if (!ref.current) {
      ref.current = props.attributes && props.attributes.ref && props.attributes.ref.current;
    }
    update();
  }, []);

  React.useImperativeHandle(tableRef, () => ({
    update: () => {
      update();
    },
  }));

  const onDragStart = React.useCallback((e) => {
    e.preventDefault();
  }, []);

  const tableStyle = {
    borderSpacing: 0,
    Layout: 'fixed',
    wordBreak: 'break-word',
  };

  return (
    <table
      ref={ref}
      style={{ ...props.style, ...tableStyle, maxWidth }}
      {...props.attributes}
      onDragStart={onDragStart}
    >
      {props.children}
    </table>
  );
});

const Table = React.memo(InnerTable);





const Content = memo(({ attributes, children }) => {
  return (
    <p style={{ margin: 0 }} {...attributes}>{children}</p>
  );
});

const Cell = memo(props => {
  console.log('[🔥Cell props]:', props);
  const editor = useEditor()

  const width = typeof props.node.data.width === 'undefined'
    ? 'auto'
    : `${props.node.data.width}px`;

  const style = props.node.data.style || {};

  const onMouseUp = useCallback(e => {
    props.store.clearCellSelecting(props.editor);
    window.removeEventListener('mouseup', onMouseUp);
  }, []);

  const onWindowClick = useCallback(e => {
      if (!table.findCurrentTable(props.editor, props.opts)) {
        removeSelection(props.editor);
        props.store.setAnchorCellBlock(null);
        props.store.setFocusCellBlock(null);
        window.removeEventListener('click', onWindowClick);
      }
    },
    [props.editor, props.opts],
  );

  React.useEffect(() => {
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('click', onWindowClick);
    };
  }, [onMouseUp, onWindowClick]);

  const tdStyles = {
    ...props.opts.cellStyle,
    width,
    minWidth: `${props.opts.minimumCellWidth}px`,
    verticalAlign: 'baseline',
    ...style,
  };

  if (props.node.data.selectionColor) {
    tdStyles.backgroundColor = props.node.data.selectionColor;
  }

  return (
    <td
      {...props.attributes}
      onMouseDown={e => {
        if (!(e.target instanceof HTMLElement)) return;
        props.store.setAnchorCellBlock(null);
        props.store.setFocusCellBlock(null);
        removeSelection(props.editor);
        props.store.setCellSelecting(props.editor);
        const anchorCellBlock = table.findCellBlockByElement(props.editor, e.target, props.opts);
        props.store.setAnchorCellBlock(anchorCellBlock);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('click', onWindowClick);
      }}
      onMouseOver={e => {
        e.stopPropagation();
        const anchorCellBlock = props.store.getAnchorCellBlock();
        if (anchorCellBlock === null) return;
        if (!(e.target instanceof HTMLElement)) return;
        if (!props.store.getCellSelecting()) return;
        const focusCellBlock = table.findCellBlockByElement(props.editor, e.target, props.opts);
        if (!focusCellBlock) return;
        const prevFocusBlock = props.store.getFocusCellBlock();
        if (focusCellBlock.key === (prevFocusBlock && prevFocusBlock.key)) return;
        const t = table.TableLayout.create(props.editor, props.opts);
        if (!t) {
          removeSelection(props.editor);
          props.store.setAnchorCellBlock(null);
          props.store.setFocusCellBlock(null);
          return;
        }
        props.store.setFocusCellBlock(focusCellBlock);
        // HACK: Add ::selection style when greater than 1 cells selected.
        addSelectionStyle();

        const blocks = table.createSelectedBlockMap(props.editor, anchorCellBlock.key, focusCellBlock.key, props.opts);
        
        props.editor.withoutSaving(() => {
          t.table.forEach(row => {
            row.forEach(cell => {
              if (blocks[cell.key]) {
                props.editor.setNodeByKey(cell.key, {
                  type: cell.block.type,
                  data: {
                    ...cell.block.data.toObject(),
                    selectionColor: props.opts.selectionColor,
                  },
                });
              } else {
                props.editor.setNodeByKey(cell.key, {
                  type: cell.block.type,
                  data: { ...cell.block.data.toObject(), selectionColor: null },
                });
              }
            });
          });
        });
      }}
      colSpan={props.node.data.colspan}
      rowSpan={props.node.data.rowspan}
      style={tdStyles}
    >
      {props.children}
    </td>
  );
});



function updateWidth(editor, value) {
  Object.keys(value).forEach(k => {
    const n = editor.value.document.getNode(k);
    console.log('⛔️[updateWidth] -> [isBlock]', n);
    // if (!isBlock(n)) return;
    editor.setNodeByKey(k, {
      type: n.type,
      data: { ...n.data.toObject(), width: value[k] },
    });
  });
}

export const tableRenderer = props => {
  console.log('💡[tableRenderer]', props);
  const { attributes, children, element } = props;
  
  const opts = defaultOptions;
  const store = new ComponentStore();
  
  return () => {
    const editor = useEditor()

    switch (element.type) {
      case defaultOptions.typeTable: {
        debugger
        return (
          <Table
            // ref={ref}
            editor={editor}
            store={store}
            onInit={updateWidth}
            onUpdate={updateWidth}
            onResizeStop={updateWidth}
            maxWidth={children.props.node.data.maxWidth}
            minimumCellWidth={opts.minimumCellWidth}
            style={opts.tableStyle}
            attributes={attributes}
          />
        )
      }
      case defaultOptions.typeRow: {
        debugger
        return (
          <tr
            {...attributes}
            style={defaultOptions.rowStyle}
            onDrag={e => e.preventDefault()}
          >
            {children}
          </tr>
        );
      }
      
      case defaultOptions.typeCell: {
        debugger
        return (
          <Cell
            editor={editor}
            store={store}
            node={props.children.props.node}
            attributes={attributes} 
            opts={opts}
          >
            {props.children}
          </Cell>
        );
      }
      
      case defaultOptions.typeContent: {
        debugger
        return <Content attributes={attributes}> {children}</Content>;
      }
      
      default:
        debugger
        return;
    }
  }
}