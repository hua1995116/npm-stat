import { ChartData } from './compoments/Charts';

export const getParams = (href: string) => {
    const search = new URL(href).search;
    const query = search.split('?')[1];
    return query && query.split('&').reduce((query: any, item) => {
        const key = item.split('=')[0];
        const value = item.split('=')[1];
        query[key] = value;
        return query
    }, {});
}

export const sliceWeek = (array: ChartData[], size: number): ChartData[] => {
    const result = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
        let start = i * size;
        let end = start + size;
        const week = {
            downloads: array.slice(start, end).reduce((sum, item) => (sum + item.downloads), 0),
            day: `w${i+1}`,
        }
        result.push(week);
    }
    return result;
}

export interface MonthType {
    [key: string]: {
        day: string
        downloads: number
    }
}

export const sliceMonth = (array: ChartData[]): ChartData[] => {
    const result = {} as MonthType;
    array.forEach(item => {
        const date = new Date(item.day);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;
        if (!result[key]) {
            result[key] = {
                day: key,
                downloads: item.downloads
            }
        } else {
            result[key].downloads = result[key].downloads + item.downloads;
        }
    })
    return Object.keys(result).map(item => result[item]);
}