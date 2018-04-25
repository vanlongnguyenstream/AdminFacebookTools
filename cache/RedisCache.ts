const redis = require("redis");
const {promisify} = require('util');
export const RKEYS ={
    uploading:'uploading',
    block:'block',
    blockToChangeFilesEnoughOnFacebook:'blockToChangeFilesEnoughOnFacebook',
    filesEnoughOnFacebook:'filesEnoughOnFacebook',
    linkstream:'linkstream',
    blockCheckToken:'blockCheckToken',
    dieTokens:'dieTokens'
}
export class Redis {
    private client;
    public delAsync;
    public hdelAsync;
    public getAsync;
    public hgetAsync;
    public setAsync;
    public setnxAsync;
    public hsetAsync;
    public rpopAsync;
    public lpopAsync;
    public rpushAsync;
    public lrangeAsync;
    constructor(host, port, db) {
        this.client = redis.createClient({
            host: host,
            db: db,
            port: port
        });
        this.client.on("error", function (err) {
            console.log(`Error when connect to redis of ${host + ':' + port}`, err);
        });
        this.delAsync = promisify(this.client.del).bind(this.client);
        this.hdelAsync = promisify(this.client.hdel).bind(this.client);
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.set).bind(this.client);
        this.setnxAsync = promisify(this.client.setnx).bind(this.client);
        this.hsetAsync = promisify(this.client.hset).bind(this.client);
        this.hgetAsync = promisify(this.client.hget).bind(this.client);
        this.rpopAsync = promisify(this.client.rpop).bind(this.client);
        this.lpopAsync = promisify(this.client.lpop).bind(this.client);
        this.rpushAsync = promisify(this.client.lpush).bind(this.client);
        this.lrangeAsync = promisify(this.client.lrange).bind(this.client);
    }

}
export const RedisCache = new Redis('127.0.0.1', 6379, 0);//db = 0


