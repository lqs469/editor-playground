// import { Block, BlockJSON, Text } from 'slate';
import { defaultOptions } from './option';

export function createCell(opts = defaultOptions, text = '') {
  const { typeCell, typeContent, defaultColumnWidth } = opts;

  return {
    type: typeCell,
    children: [
      {
        type: typeContent,
        children: [{
          text
        }],
      },
    ],
    data: {
      width: defaultColumnWidth,
      // ...data,
    },
  };
}