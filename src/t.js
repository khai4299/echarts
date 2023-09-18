const alpha = ["A", "B", "C", "D", "E", "F"];
const category = alpha.map((item) => ({
    name: "FIB-" + item,
}));
export const option = {
    parallel: {
        parallelAxisDefault: {
            axisLine: {
                show: false,
            },
        },
    },
    parallelAxis: [
        { dim: 0, name: "Source" },
        { dim: 1, name: "Target" },
        { dim: 2, name: "Source" },
    ],
    title: {
        text: "Basic Graph",
    },
    tooltip: {},
    series: [
        {
            type: "parallel",
            lineStyle: {
                width: 4,
            },
        },
        {
            type: "graph",
            layout: "none",
            symbolSize: 50,
            roam: true,
            label: {
                show: true,
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20,
            },
            lineStyle: {
                color: "source",
                curveness: 0.3,
            },
            emphasis: {
                focus: "adjacency",
                lineStyle: {
                    width: 2,
                },
            },
            data: [
                {
                    category: 0,
                    name: "Node 1",
                    x: 1,
                    y: 3,
                },
                {
                    category: 2,
                    name: "Node 2",
                    x: 3,
                    y: 3,
                },
                {
                    category: 1,
                    name: "Node 3",
                    x: 2,
                    y: 3,
                },
                {
                    category: 3,
                    name: "Node 4",
                    x: 1,
                    y: 2,
                },
                {
                    category: 4,
                    name: "Node 5",
                    x: 1,
                    y: 1,
                },
            ],
            links: [
                {
                    source: "Node 1",
                    target: "Node 3",
                },
                {
                    source: "Node 2",
                    target: "Node 3",
                },
                {
                    source: "Node 4",
                    target: "Node 3",
                },
                {
                    source: "Node 5",
                    target: "Node 3",
                },
            ],
            categories: category,
        },
    ],
};
