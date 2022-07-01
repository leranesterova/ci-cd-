import supertest from 'supertest'

export default class TransactionsHelper {
    response

    async create(userFromBefore, userToBefore, num){
        this.response = await supertest(process.env.BASE_URL)
            .post('/transactions')
            .set('Authorization',`Bearer ${process.env.TOKEN}`)
            .send({from: userFromBefore, to: userToBefore, amount: num })
        return this.response
    }
    async get(transactionsId = '') {
        this.response = await supertest(process.env.BASE_URL)
            .get(`/transactions${transactionsId !== '' ? `?id=${transactionsId}` : ''}`)
            .set('Authorization', `Bearer ${process.env.TOKEN}`)

        return this.response
    }
    async getAll() {
        this.response = await supertest(process.env.BASE_URL)
            .get('/transactions')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)

        return this.response
    }
    async delete(userFromBefore){
        this.response = await supertest(process.env.BASE_URL)
            .delete('/users')
            .set('Authorization',`Bearer ${process.env.TOKEN}`)
            .send({id: userFromBefore})

        return this.response
    }

}