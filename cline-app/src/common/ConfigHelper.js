import http from 'axios';
//读取路由配置
class ConfigHelper{
    constructor(){
    }
    //读取config配置信息
    get(path){
        let data=this.config;
        console.log(data);
        path.forEach(p=>{
            if(!data) return null;
             data =data[p];
        }) 
        return data;
    }
    //初始化读取配置文件
    init(){
        return new Promise(resolve=>{
            http
            .get(`/config.json`)
            .then(res => {
                console.log(res);
                this.config = res.data;
                this.storage = window[res.data.StorageType];
                resolve();
            })
        })
    }
}

export default new ConfigHelper();