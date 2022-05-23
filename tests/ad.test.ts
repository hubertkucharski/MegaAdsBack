// import {AdRecord} from "../records/ad.record";
//
// let ad: AdRecord;

// beforeAll(async ()=>{
//     ad = new AdRecord()
// })
//

import {AdRecord} from "../records/ad.record";

test('AdRecord returns data from database for one entry', async ()=>{

    const ad = await AdRecord.getOne('cda499fb-d619-11ec-9f07-3ecfab8190d4');

    expect(ad).toBeDefined();
    expect(ad.name).toBe('Testowy');
})
test('AdRecord return null from database if not exist', async ()=>{

    const ad = await AdRecord.getOne('xxxxx-d619-11ec-9f07-3ecfab8190d4');

    expect(ad).toBeNull();
})
test('AdRecord return list of records from database', async ()=>{


    expect(await AdRecord.listAll()).toBeDefined()
    expect(await AdRecord.listAll()).toBeInstanceOf(Array)
})
test('AdRecord insert new element to database.', async ()=>{

    const ad = await new AdRecord({
        id: undefined,
        name: 'John',
        description: 'opisany john',
        price: 199,
        url: 'http://localhost:8080',
        lat: 16.44,
        lon: 33.11,
    })
    expect(await ad.insert()).toBe(ad.id);

})
