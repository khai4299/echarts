import { Select } from "antd";
import { EChartsOption } from "echarts";
import {
    default as EChartsReact,
    default as ReactECharts,
} from "echarts-for-react";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
    categories as ct,
    data as dt,
    links as l,
    palette,
} from "./dataCircle";
import { optionHeatmap } from "./dataHeatmap";
import { formatCirclePlot } from "./ultis";
import { optionSankey } from "./dataSankey";
import { optionDotPlot } from "./dataDotPlot";

interface Link {
    source: string | number;
    target: string | number;
}
interface Categogy {
    name: string;
    id: string;
}
export interface Data {
    id: string;
    category: number;
    name: string;
    x: number;
    y: number;
    symbolSize: number;
    itemStyle: ItemStyle;
    sourceId?: string;
}

export interface ItemStyle {
    color: string;
}
function App() {
    const ref = useRef<EChartsReact | null>(null);
    const [defaultData, setDefaultData] = useState<Data[]>([]);
    const [defaultLinks, setDefaultLinks] = useState<Link[]>([]);
    const [links, setLinks] = useState<Link[]>([]);
    const [data, setData] = useState<Data[]>([]);
    const [categories, setCategories] = useState<Categogy[]>([]);
    const [source, setSource] = useState<string[]>(ct.map((item) => item.id));
    useEffect(() => {
        const { data: newData, links: newLinks } = formatCirclePlot(dt, l);
        setDefaultData(newData);
        setDefaultLinks(newLinks);
        setLinks(newLinks);
        setData(newData);
        setCategories(ct);
    }, []);
    useEffect(() => {
        const option: EChartsOption = {
            color: palette.map((item) => item.hex),
            legend: [
                {
                    selectedMode: false,
                    orient: "vertical",
                    left: 10,
                    top: "center",
                    data: categories.map(function (a) {
                        return a.name;
                    }),
                },
            ],
            series: [
                {
                    type: "graph",
                    layout: "none",
                    symbolSize: 50,
                    roam: false,
                    label: {
                        show: true,
                    },
                    edgeSymbol: ["circle", "arrow"],
                    edgeSymbolSize: [4, 10],
                    lineStyle: {
                        color: "source",
                        curveness: 0.2,
                    },
                    emphasis: {
                        focus: "adjacency",
                        lineStyle: {
                            width: 3,
                        },
                    },
                    data: data,
                    links: links,
                    categories: categories,
                },
            ],
        };
        if (option) {
            ref?.current?.getEchartsInstance().setOption(option);
        }
    }, [links, data, categories]);

    const handleChange = (value: string[]) => {
        const filterNode = categories
            ?.filter((item) => !value.includes(item.id))
            .map((item) => item.id);
        const newData = defaultData.filter(
            (item, index) =>
                !item.sourceId || !filterNode.includes(item.sourceId)
        );
        const newLinks = defaultLinks.filter(
            (link: any) =>
                !filterNode.includes(link.source) &&
                !filterNode.includes(link.target)
        );
        setData(newData);
        setLinks(newLinks);
        setSource(value);
    };

    return (
        <>
            <ReactECharts
                ref={ref}
                style={{ width: "100vw", height: "100vh" }}
                option={{
                    title: {
                        text: "Basic Graph",
                        bottom: 10,
                        right: 10,
                    },
                    // tooltip: {},
                }}
            />

            <Select
                allowClear
                mode="tags"
                value={source}
                style={{ width: "100%" }}
                onChange={handleChange}
                tokenSeparators={[","]}
                options={categories?.map((cate) => ({
                    value: cate.id,
                    label: cate.name,
                }))}
            />
            <ReactECharts style={{ height: "700px" }} option={optionHeatmap} />
            <ReactECharts style={{ height: "700px" }} option={optionSankey} />
            <ReactECharts style={{ height: "700px" }} option={optionDotPlot} />
        </>
    );
}

export default App;
