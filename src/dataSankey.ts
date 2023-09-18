import distinctColors from "distinct-colors";

export const palette = distinctColors({
    count: 25,
}).map((color) => ({
    hex: color.hex(),
    rgb: `rgb(${color.rgb().join(",")})`,
}));

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
const patterns = [
    "Pattern 1",
    "Pattern 2",
    "Pattern 3",
    "Pattern 4",
    "Pattern 5",
];
const data = [
    ...cellgroups.map((c, i) => ({
        name: c,
        itemStyle: {
            color: palette[i]?.hex,
        },
        label: {
            position: "left",
        },
    })),
    ...patterns.map((c, i) => ({
        name: c,
        itemStyle: {
            color: palette[i]?.hex,
        },
    })),
];
const links: any = [];
cellgroups.forEach((cell) => {
    patterns.forEach((pat, i) => {
        const r = Math.floor(Math.random() * 5);
        if (r) {
            links.push({
                source: cell,
                target: pat,
                value: i + 1,
            });
        }
    });
});
export const optionSankey = {
    singleAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Cell groups", "Patterns"],
        axisLine: {
            show: false,
        },
    },
    series: {
        layoutIterations: 0,
        singleAxisIndex: 0,
        coordinateSystem: "singleAxis",
        type: "sankey",
        layout: "none",
        left: 70,
        right: 70,
        bottom: 100,
        emphasis: {
            focus: "adjacency",
        },
        lineStyle: {
            color: "source",
            curveness: 0.5,
        },
        draggable: false,

        label: {
            show: true,
        },
        data: data,
        links: links,
    },
};
