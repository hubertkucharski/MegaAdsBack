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
