import supertest from 'supertest'

export default class ConfigHelper {
    response
    async get() {
        this.response = await supertest(process.env.BASE_URL)
            .get('/config')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)

        return this.response
    }
    async patch(num ,amount ) {
        this.response = await supertest(process.env.BASE_URL)
            .patch('/config')
            .send({number_of_entries: num, initial_amount: amount })
            .set('Authorization', `Bearer ${process.env.TOKEN}`)

        return this.response
    }
    async delete() {
        this.response = await supertest(process.env.BASE_URL)
            .delete('/config')
            .set('Authorization', `Bearer ${process.env.TOKEN}`)

        return this.response
    }

}