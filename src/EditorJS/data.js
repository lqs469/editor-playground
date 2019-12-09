export default {
  "version" : "2.16.0",
  "time" : 1575640898155,
  "blocks" : [
    {
        "type" : "header",
        "data" : {
            "text" : "Editor.js",
            "level" : 2
        }
    },
    {
        "type" : "paragraph",
        "data" : {
            "text" : "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
        }
    },
    {
      "type" : "header",
      "data" : {
          "text" : "这是一个表格，可以在表格中任意插入行列",
          "level" : 3
      }
    },
    {
      "type" : "table",
      "data" : {
          "content" : [ ["Kine", "1 pcs", "100$"], ["Pigs", "3 pcs", "200$"], ["Chickens", "12 pcs", "150$"] ]
      }
    },
    {
        "type" : "header",
        "data" : {
            "text" : "这是一个无序列表，点击右边的`...`可以变成有序列表",
            "level" : 3
        }
    },
    {
        "type" : "list",
        "data" : {
            "style" : "unordered",
            "items" : [
                "It is a block-styled editor",
                "It returns clean data output in JSON",
                "Designed to be extendable and pluggable with a simple API"
            ]
        }
    },
    {
        "type" : "header",
        "data" : {
            "text" : "带有高亮、链接、代码块的段落",
            "level" : 3
        }
    },
    {
        "type" : "paragraph",
        "data" : {
            "text" : "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\"cdx-marker\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core. There are dozens of <a href=\"https://github.com/editor-js\">ready-to-use Blocks</a> and the <a href=\"https://editorjs.io/creating-a-block-tool\">simple API</a> for creation any Block you need. For example, you can imple<code class=\"inline-code\">ment Blocks </code>for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games."
        }
    },
    {
        "type" : "paragraph",
        "data" : {
            "text" : "Given data can be used as you want: render with HTML for <code class=\"inline-code\">Web clients</code>, render natively for <code class=\"inline-code\">mobile apps</code>, create markup for <code class=\"inline-code\">Facebook Instant Articles</code> or <code class=\"inline-code\">Google AMP</code>, generate an <code class=\"inline-code\">audio version</code> and so on."
        }
    },
    {
        "type" : "delimiter",
        "data" : {}
    },
    {
        "type" : "image",
        "data" : {
            "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
            "caption" : "图片示例",
            "withBorder" : true,
            "stretched" : false,
            "withBackground" : true,
        }
    },
    {
      "type" : "attaches",
      "data" : {
          "file": {
              "url" : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
              "size": 91,
              "name": "文件示例.jpg",
              "extension": "jpg"
          },
          "title": "文件示例（文件名可编辑）"
      }
    },
    {
      "type" : "embed",
      "data" : {
        "service" : "codepen",
        "source" : "https://codepen.io/lqs469/embed/zYxvvLq",
        "embed" : "https://codepen.io/lqs469/embed/zYxvvLq?height=265&theme-id=default&default-tab=result",
        "width" : '100%',
        "height" : 320,
        "caption" : "嵌入 embed 示例"
      }
    },
    {
      "type" : "header",
      "data" : {
          "text" : "Checklist 示例",
          "level" : 3
      }
    },
    {
      "type" : "checklist",
      "data" : {
          "items" : [
              {
                "text" : "This is a block-styled editor",
                "checked" : true
              },
              {
                "text" : "Clean output data",
                "checked" : false
              },
              {
                "text" : "Simple and powerful API",
                "checked" : true
              }
          ]
      }
    },
    {
      "type" : "warning",
      "data" : {
          "title" : "Note:",
          "message" : "Avoid using this method just for lulz. It can be very dangerous opposite your daily fun stuff."
      }
    },
  ],
}