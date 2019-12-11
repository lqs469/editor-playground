export default [
  {
    type: 'paragraph',
    children: [
      {
        text: 'A line of text in a paragraph.',
      },
    ],
  },
  {
    children: [
      {
        text: 'In addition to block nodes, you can create inline nodes, like ',
      },
      {
        type: 'link',
        url: 'https://en.wikipedia.org/wiki/Hypertext',
        children: [{ text: 'hyperlinks' }],
      },
      {
        text: '!',
      },
    ],
  }
]