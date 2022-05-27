import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";

const defaultObj = {
    name: '[Testowy-123]John',
    description: 'opisany john',
    price: 199,
    url: 'http://localhost:8080',
    lat: 16.44,
    lon: 33.11,
    clicksCounter: 0,
    secondUrl: '',
}

afterAll(async ()=>{
    await pool.execute('delete from `ads` where `name` like "[Testowy-123]%"');

    await pool.end()
})

test('AdRecord returns data from database for one entry', async ()=>{

    const ad = await AdRecord.getOne('cda499fb-d619-11ec-9f07-3ecfab8190d4');

    expect(ad).toBeDefined();
    expect(ad.name).toBe('Testowy');
})
test('AdRecord return null from database if not exist', async ()=>{

    const ad = await AdRecord.getOne('cda499fb-d619-11ec-9f07-3ecfab8190d4');

    expect(ad).toBeDefined();
    expect(ad.name).toEqual('Testowy');
})

test('AdRecord.findAll returns array of found entries when searching for "a". return only small data.', async ()=>{
    const ad = await AdRecord.findAll('o');
    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined();
    expect((ad[0] as AdRecord).description).toBeUndefined()
})

test('AdRecord insert new element to database.', async ()=>{

    const ad = await new AdRecord(defaultObj)
    await ad.insert()
    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string')


})
test('AdRecord check is new element added to database.', async ()=>{

    const ad = await new AdRecord(defaultObj)
    await ad.insert();
    const found = await AdRecord.getOne(ad.id)

    expect(found).toBeDefined();
    expect(found).not.toBeNull();
    expect(found.id).toBe(ad.id);


})
