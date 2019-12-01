import axios from 'axios';
const provider = process.env.NODE_ENV == 'production' ? "" : "http://10.0.0.93:8000/post/farms/";
module.exports ={

    async getFarms() {
        
        const res = await axios.get (provider)
        console.log(res);
        return res;
    }
}