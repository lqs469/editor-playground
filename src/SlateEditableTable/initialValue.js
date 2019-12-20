export default [
  {
    type: "editable_table",
    data: {},
    children: [
        {
            "type": "editable_table_row",
            "children": [
                {
                    type: "editable_table_cell",
                    key: '0',
                    data: {
                        "width": 100,
                        // rowspan: '2',
                        // colspan: '2',
                    },
                    children: [
                        {
                            type: "editable_table_content",
                            children: [
                                {
                                    text: "a1"
                                }
                            ]
                        }
                    ],
                },
                {
                    "type": "editable_table_cell",
                    key: '1',
                    "children": [
                        {
                            "type": "editable_table_content",
                            "children": [
                                {
                                    "text": "a2"
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
                    key: '2',
                    "children": [
                        {
                            "type": "editable_table_content",
                            "children": [
                                {
                                    "text": "a3"
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
                    key: '3',
                    "children": [
                        {
                            "type": "editable_table_content",
                            "children": [
                                {
                                    "text": "a4"
                                }
                            ]
                        }
                    ],
                    "data": {
                        "width": 150
                    }
                }
            ],
            "data": {}
        }
    ]
  }
]