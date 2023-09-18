var datas = [
    {
        nodes: [
            {
                id: "0",
            },
            {
                id: "1",
            },
            {
                id: "2",
            },
            {
                id: "3",
            },
            {
                id: "4",
            },
            {
                id: "5",
            },
            {
                id: "6",
            },
            {
                id: "7",
            },
            {
                id: "8",
            },
            {
                id: "9",
            },
            {
                id: "10",
            },
            {
                id: "11",
            },
            {
                id: "12",
            },
            {
                id: "13",
            },
            {
                id: "14",
            },
            {
                id: "15",
            },
            {
                id: "16",
            },
        ],
        edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
            [6, 7],
            [7, 8],
            [8, 9],
            [9, 10],
            [10, 11],
            [11, 12],
            [12, 13],
            [13, 14],
            [14, 15],
            [15, 16],
            [16, 0],
            [17, 16],
        ],
    },
];
export const option = {
    tooltip: {},
    series: datas.map(function (item, idx) {
        return {
            type: "graph",
            layout: "force",
            animation: false,
            data: item.nodes.map((i) => ({ ...i, value: i.id })),
            roam: true,
            force: {
                repulsion: 500,
                edgeLength: 2,
            },
            label: {
                position: "right",
                formatter: "{b}",
            },
            edges: item.edges.map(function (e) {
                return {
                    source: e[0] + "",
                    target: e[1] + "",
                };
            }),
        };
    }),
};
