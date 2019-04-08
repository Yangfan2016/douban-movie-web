import axios from "axios";


const BASE_URL="/api";
let instance=axios.create({
    baseURL:BASE_URL,
    timeout:3e4,
});

// 热映
export function getHotShowing() {
    return instance.get("/movie/in_theaters");
}