import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";


type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;
    public clicksCounter: number;
    public secondUrl: string;

    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length >100){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków.');
        }
        if(obj.description.length > 1024){
            throw new ValidationError('Opis nie może być dłuższy niż 1000 znakow.');
        }
        if(obj.price < 0 || obj.price > 9999999){
            throw new ValidationError('Cena nie może być mniejsza niż zero lub większa niż 9 999 999.');
        }
        if(!obj.url || obj.url.length >100){
            throw new ValidationError('Adres URL ogłoszenia nie może być pusty, ani przekraczać 100 znaków.');
        }
        if(typeof obj.lat !== "number" || typeof obj.lon !== "number"){
            throw new ValidationError('Nie można zlokalizować ogłoszenia.')
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.url = obj.url;
        this.price = obj.price;
        this.lon = obj.lon;
        this.lat = obj.lat;
        this.clicksCounter = obj.clicksCounter;
        this.secondUrl = obj.secondUrl;
    }

    static async getOne(id: string): Promise<AdRecord | null> {

        await pool.execute('update `ads` set `clicksCounter` = `clicksCounter` + 1 where `id` = :id', {
            id,
        });
        const [results] = await pool.execute('select * from `ads` where `id` = :id', {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0])
    }
    // static async listAll(): Promise<AdRecord[]> {
    //     const [results] = await pool.execute('select * from `ads`') as AdRecordResults;
    //     return results.map((obj) => new AdRecord(obj));
    // }
    //powyżej zbędne pod dodaniu funkcji findAll z wyszukaniem LIKE
    static async findAll(name: string): Promise<SimpleAdEntity[]>{
        const [results] = await pool.execute('select * from `ads` where `name` like :search', { search: `%${name }%`,}) as AdRecordResults;

        return results.map(result => {
            const {id, lat, lon, clicksCounter} = result;
            return { id, lat, lon, clicksCounter };
        })
    }
    async insert() {
        if (!this.id) {
            this.id = uuid()
        } else throw new Error('Cannot insert something that is alredy inserted.')
        await pool
            .execute('insert into `ads` (`id`, `name`, `description`,`price`, `url`, `lat`, `lon`, `secondUrl`) values (:id, :name, :description, :price, :url, :lat, :lon, :secondUrl)', this


                //     {
                //     id: this.id,
                //     name: this.name,
                //     description: this.description,
                //     price: this.price,
                //     url: this.url,
                //     lat: this.lat,
                //     lon: this.lon,
                // }
            );
        return this.id;
    }
}
