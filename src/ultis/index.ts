interface Link {
    source: string | number;
    target: string | number;
    symbol: any;
    lineStyle?: any;
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
export const formatXY = (x: number, y: number) => {
    const add = 8;
    if (Math.abs(x) < 30) {
        return {
            x,
            y: y > 0 ? y + add : y - add,
        };
    }
    return {
        x: x > 0 ? x + add : x - add,
        y,
    };
};
export const formatCirclePlot = (data: Data[], links: Link[]) => {
    const newData: any = [...data];
    const newLinks: any = [...links];
    links.forEach((li) => {
        if (li.source === li.target) {
            const item = data.find((it) => it.id === li.source);
            if (item) {
                const id = newData.length as unknown as string;
                const position = formatXY(item.x, item.y);
                newData.push({
                    ...item,
                    ...position,
                    id: newData.length.toString(),
                    symbolSize: 0,
                    sourceId: item.id,
                    name: "",
                    emphasis: {
                        disabled: true,
                    },
                });
                newLinks.push({
                    source: li.source,
                    symbol: ["none", "none"],
                    target: id.toString(),
                    lineStyle: {
                        width: 3,
                        curveness: 0.7,
                    },
                    emphasis: {
                        disabled: true,
                    },
                    blur: {
                        lineStyle: {
                            opacity: 0.05,
                        },
                    },
                });
                newLinks.push({
                    source: id.toString(),
                    symbol: ["none", "arrow"],
                    target: li.source,
                    lineStyle: {
                        width: 3,
                        curveness: 0.7,
                    },
                    emphasis: {
                        disabled: true,
                    },
                    blur: {
                        lineStyle: {
                            opacity: 0.05,
                        },
                    },
                });
            }
        }
    });
    return {
        data: newData,
        links: newLinks,
    };
};
