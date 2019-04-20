import axios from "axios";

const BASE_URL = "/api/movie";
const API_KEY = "0b2bdeda43b5688921839c8ecb20399b";

let instance = axios.create({
    baseURL: BASE_URL,
    timeout: 3e4,
    params: {
        "apikey": API_KEY,
    }
});

// 热映
export function getHotShowing(params?: any) {
    return instance.get("/in_theaters", {
        params
    });
}

// top250
export function getTop250(params?:any) {
    return instance.get("/top250",{
        params,
    });
}

// 新片
export function getNew() {
    return instance.get("/new_movies");
}

// 电影详情
export function getDetail(id: string) {
    return instance.get(`/subject/${id}`);
}

// 北美票房榜
export function getGoodbox() {
    return instance.get("/us_box");
}

// 搜索条目
export function getContentBySearch(str: string, params?: any) {
    return instance.get(`/search?q=${str}`, {
        params
    });
}

// 口碑榜
export function getWeeklyMovie() {
    return instance.get("/weekly");
}