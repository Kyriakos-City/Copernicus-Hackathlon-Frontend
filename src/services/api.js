import axios from 'axios';
const provider = process.env.NODE_ENV == 'production' ? "" : "http://localhost:8000/post/farms/";
module.exports ={

    async getFarms() {
        
        const res = await axios.get (provider)
        console.log(res);
        return res;
    },
    async sendFarm() {
        const res = await axios.post(provider, [{
            name: this.name,
            type: this.select,
            coords: this.edited === null ? this.paths[0] : this.edited[0],
          }]
          );
          return res;
    }
}