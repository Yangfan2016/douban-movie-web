import axios from "axios";

const BASE_URL = "/api/movie";
const API_KEY = "0b2bdeda43b5688921839c8ecb20399b";

let instance = axios.create({
    baseURL: BASE_URL,
    timeout: 3e4,
    params:{
        "apikey": API_KEY,
    }
});

// 热映
export function getHotShowing(params?:any) {
    return instance.get("/in_theaters",{
        params
    });
}

// top250
export function getTop250() {
    return instance.get("/top250");
}

// 新片
export function getNew() {
    return instance.get("/new_movies");
}

// 电影详情
export function getDetail(id: string) {
    return instance.get(`/subject/${id}`);
}