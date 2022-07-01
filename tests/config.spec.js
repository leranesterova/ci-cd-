import {expect} from "chai"
import ConfigHelper from "../helpers/config.helper";



describe('Config', function (){
    describe('Get all  config', function (){
        let configHelper = new ConfigHelper()


        before(async function(){
            await configHelper.get()
        })


        it('response status code is 200',  function (){
            expect(configHelper.response.status).to.eq(200)
        })

        it('response body contains amount',  function (){
            expect(configHelper.response.body.initial_amount).to.be.a('number')
        })
        it('response body contains number_of_entries',  function (){
            expect(configHelper.response.body.number_of_entries).to.be.a('number')
        })
    })
    describe.only('Patch config', function (){
        let configHelper = new ConfigHelper()
         let configChangeNumbers
         let configChangAmount
          let num = 7
        let amount = 600


        before(async function(){
            await configHelper.patch(num, amount)
            configChangeNumbers = await configHelper.response.body.number_of_entries
            configChangAmount =  await configHelper.response.body.initial_amount
console.log(configChangeNumbers)
        })


        it('response status code is 200',  function (){
            expect(configHelper.response.status).to.eq(200)
        })

        it('response body a number',  function (){
            expect(configHelper.response.body.number_of_entries).to.be.a('number')
        })

        it('response body contains number_of_entries',  function (){
            expect(configHelper.response.body.number_of_entries).to.eq(configChangeNumbers)
        })
        it('response body contains amount',  function (){
            expect(configHelper.response.body.initial_amount).to.eq(configChangAmount)
        })
        it('response status 400',  function (){
            expect(configHelper.response.status).to.eq(400)
        })
        it('response message negative',  function (){
            expect(configHelper.response.body.message).to.eq('Number of entries must be between 5 and 25 (inclusively).')
        })
        it('response message negative',  function (){
            expect(configHelper.response.body.message).to.eq('Amount must be above zero.')
        })

    })

    describe('delete config', function (){
        let configHelper = new ConfigHelper()


        before(async function(){
            await configHelper.delete()
        })


        it('response status code is 200',  function (){
            expect(configHelper.response.status).to.eq(200)
        })

        it('response success deleted',  function (){
            expect(configHelper.response.body.message).to.eq('Data wiped out.')
        })

    })
})