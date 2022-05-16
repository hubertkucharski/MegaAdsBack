import {AdRecord} from "../records/ad.record";

const defaultObj = {
    id: 'te',
        name: 'test name',
    description: 'opis test',
    url: 'http://localhost:8080',
    price: 0,
    lat: 4,
    lon: 4,
}

test('Can build AdRecord', ()=>{
    const ad = new AdRecord({
            ...defaultObj,
            name: 'test name'
        }
    );
    expect(ad.name).toBe('test name');
    expect(ad.description).toBe('opis test');
    expect(ad.description).toBe('opis test');

})
test('Validate invalid price', ()=>{
    expect(()=> new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Cena nie może być mniejsza niż zero lub większa niż 9 999 999.')
})
//TODO Check all validation
