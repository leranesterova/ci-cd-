import UsersHelper from '../helpers/users.helper'
import TransactionsHelper from "../helpers/transactions.helper"
import {expect} from "chai"
import {getRandomItem} from "../helpers/common.helper";

describe('Transactions', function (){
    describe('Transaction creation', function (){
        let userHelper = new UsersHelper()
        let transactionsHelper = new TransactionsHelper()
        let userFromBefore
        let userToBefore
         let userFromAfter
         let userToAfter

       let amount = 100


        before(async function(){
             await userHelper.create()
              userFromBefore = userHelper.response.body
            await userHelper.create()
            userToBefore = userHelper.response.body
            await transactionsHelper.delete(userFromBefore)

           await transactionsHelper.create('fhghghgh', userToBefore.id,amount)

            await userHelper.get(userFromBefore.id)
             userFromAfter = userHelper.response.body
            await userHelper.get(userToBefore.id)
             userToAfter = userHelper.response.body

        })
        it('response status code is 200',  function (){
            expect(transactionsHelper.response.status).to.eq(200)

        })
        it('response body contains id',  function (){
            expect(transactionsHelper.response.body.id).to.be.a('string')

        })
        it('response body contains id from',  function (){
            expect(transactionsHelper.response.body.from).to.be.a('string')

        })
        it('response body contains id to',  function (){
            expect(transactionsHelper.response.body.to).to.be.a('string')

        })
        it('response body contains initial amount',  function (){
            expect(transactionsHelper.response.body.amount).to.be.a('number')

        })
        it('response body amount changed send from user',  function (){
            expect(userFromAfter.amount).to.eq(userFromAfter.amount )

        })
        it('response body amount changed send to user',  function (){
            expect(userToAfter.amount).to.eq(userToBefore.amount + amount)

        })
        it('create transactions with no exist sender',  function (){
            expect(transactionsHelper.response.status).to.eq(400)

        })
        it('response body message sender not found',  function (){
            expect(transactionsHelper.response.body.message).to.eq('Sender not found.')

        })
        it('response body message resiver not found',  function (){
            expect(transactionsHelper.response.body.message).to.eq('Receiver not found.')

        })
    })
    describe('Get transaction by id', function (){
        let userHelper = new UsersHelper()
        let transactionsHelper = new TransactionsHelper()
        let userFrom
        let userTo
        let transaction
        let getTransaction
        let amount = 100

        before(async function(){
            await userHelper.create()
            userFrom = userHelper.response.body.id
            await userHelper.create()
            userTo = userHelper.response.body.id
            transaction = await transactionsHelper.create(userFrom, userTo,amount)
            getTransaction = await transactionsHelper.get(transaction.body.id)

        })
        it('response status code is 200',  function (){
            expect(getTransaction.status).to.eq(200)

        })
        it('response body contains id',  function (){
            expect(getTransaction.body.id).to.eq(getTransaction.body.id)

        })
        it('response body contains id from',  function (){
            expect(getTransaction.body.from).to.eq(userFrom)

        })
        it('response body contains id to',  function (){
            expect(getTransaction.body.to).to.eq(userTo)

        })

    })
    describe('Get all  transactions', function (){
        let usersHelper = new UsersHelper()
        let transactionsHelper = new TransactionsHelper()
        let userFromBefore
        let userToBefore

        before(async function(){
            await usersHelper.create()
            userFromBefore = usersHelper.response.body.id
            await usersHelper.create()
            userToBefore = usersHelper.response.body.id
            await transactionsHelper.create(userFromBefore, userToBefore,400)
            await transactionsHelper.getAll()
        })
        it('response status code is 200',  function (){
            expect(transactionsHelper.response.status).to.eq(200)

        })

        it('response body contains array of at least 2 users',  function (){
            expect(transactionsHelper.response.body.length).to.be.at.least(2)

        })
        it('response body amount',  function (){
            expect(getRandomItem(transactionsHelper.response.body).amount).not.to.be.undefined

        })
    })
})