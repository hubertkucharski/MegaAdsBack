import {AdEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, 'id'>{
    id?: string;
}

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

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
        //TODO: Check if URL is valid
        if(!obj.url || obj.url.length >100){
            throw new ValidationError('Adres URL ogłoszenia nie może być pusty, ani przekraczać 100 znaków.');
        }
        if(typeof obj.lat !== "number" || typeof obj.lon !== "number"){
            throw new ValidationError('Nie można zlokalizować ogłoszenia.')
        }

        this.name = obj.name;
        this.description = obj.description;
        this.url = obj.url;
        this.price = obj.price;
        this.lon = obj.lon;
        this.lat = obj.lat;


    }
}