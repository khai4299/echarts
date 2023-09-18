import distinctColors from "distinct-colors";
import { EChartsOption } from "echarts";
const cellgroups = [
    "FIB-A",
    "FIB-B",
    "FIB-C",
    "FIB-D",
    "FIB-E",
    "FIB-F",
    "FIB-G",
    "FIB-H",
    "FIB-I",
    "MYL-A",
    "MYL-B",
    "MYL-C",
    "MYL-D",
    "MYL-E",
    "ENDO-A",
    "ENDO-B",
    "ENDO-C",
    "ENDO-D",
    "ENDO-E",
    "ENDO-F",
    "TC",
    "BC",
    "SCH",
    "DC",
    "LYME",
];
export const categories: { name: string; id: string }[] = [];
const x = [];
const y = [];
export const data: any = [];
export const links: any = [];
const n = 25;

export const palette = distinctColors({
    count: n,
}).map((color) => ({
    hex: color.hex(),
    rgb: `rgb(${color.rgb().join(",")})`,
}));

for (let i = 0; i < n; i++) {
    x[i] = 0 + 50 * Math.cos((i * 2 * Math.PI) / n);
    y[i] = 0 + 50 * Math.sin((i * 2 * Math.PI) / n);
    data.push({
        id: i.toString(),
        category: i,
        name: cellgroups?.[i] || "Node " + i,
        x: x[i],
        y: y[i],
        symbolSize: (i + 10) * 1.5,
        itemStyle: {
            color: palette[i].hex,
        },
    });
    categories.push({
        id: i.toString(),
        name: cellgroups?.[i] || "Node " + i,
    });
    for (let j = 0; j < n; j++) {
        const r = Math.floor(Math.random() * 3);
        if (!r) {
            links.push({
                lineStyle: {
                    width: j < 10 ? j + 1 : (j + 1) * 0.2,
                },
                source: i.toString(),
                target: j.toString(),
            });
        }
    }
}
// export const optionCircle: EChartsOption = {
//     title: {
//         text: "Basic Graph",
//         bottom: 10,
//         right: 10,
//     },
//     color: palette.map((item) => item.hex),
//     legend: [
//         {
//             orient: "vertical",
//             left: 10,
//             data: categories.map(function (a) {
//                 return a.name;
//             }),
//         },
//     ],
//     tooltip: {},
//     series: [
//         {
//             type: "graph",
//             layout: "none",
//             symbolSize: 50,
//             roam: false,
//             label: {
//                 show: true,
//             },
//             edgeSymbol: ["circle", "arrow"],
//             edgeSymbolSize: [4, 10],
//             edgeLabel: {
//                 fontSize: 20,
//             },
//             lineStyle: {
//                 color: "source",
//                 curveness: 0.2,
//             },
//             emphasis: {
//                 focus: "adjacency",
//                 lineStyle: {
//                     width: 3,
//                 },
//             },
//             data: [...data],
//             links: [...links],
//             categories: categories,
//         },
//     ],
// };
