import axios from "axios";
const http=axios.create({
    baseURL:"https://api-hmzs.itheima.net/api/",
})
http.interceptors.request.use(config=>{
    if(localStorage.getItem("token")){
        config.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
    }
    return config
})
http.interceptors.response.use(res=>{
    return res
})
export default http;