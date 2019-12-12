export default [
  {
    type: "editable_table",
    data: {},
    // children: [{ text: '我是标题🍉' }],
    children: [
        {
            "type": "editable_table_row",
            "children": [
                {
                    "type": "editable_table_cell",
                    "children": [
                        {
                            type: "editable_table_content",
                            children: [
                                {
                                    text: "1"
                                }
                            ]
                        }
                    ],
                    "data": {
                        "width": 15
                    }
                },
                {
                    "type": "editable_table_cell",
                    "children": [
                        {
                            "type": "editable_table_content",
                            "children": [
                                {
                                    "text": "2"
                                }
                            ]
                        }
                    ],
                    "data": {
                        "width": 15
                    }
                }
            ],
            "data": {}
        },
        {
            "type": "editable_table_row",
            "children": [
                {
                    "type": "editable_table_cell",
                    "children": [
                        {
                            "type": "editable_table_content",
                            "children": [
                                {
                                    "text": "3"
                                }
                            ]
                        }
                    ],
                    "data": {
                        "width": 15
                    }
                },
                {
                    "type": "editable_table_cell",
                    "children": [
                        {
                            "type": "editable_table_content",
                            "children": [
                                {
                                    "text": "4"
                                }
                            ]
                        }
                    ],
                    "data": {
                        "width": 15
                    }
                }
            ],
            "data": {}
        }
    ]
  }
]