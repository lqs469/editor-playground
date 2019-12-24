export default [
  {
    type: "editable_table",
    data: {},
    children: [
        {
            "type": "editable_table_row",
            key: 'row_0',
            "children": [
                {
                    type: "editable_table_cell",
                    key: 'cell_0',
                    data: {
                        "width": 200,
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
                    key: 'cell_1',
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
            key: 'row_1',
            "children": [
                {
                    "type": "editable_table_cell",
                    key: 'cell_2',
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
                    key: 'cell_3',
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
                        "width": 200
                    }
                }
            ],
            "data": {}
        }
    ]
  }
]