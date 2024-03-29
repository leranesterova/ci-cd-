import 'dotenv/config'
import AuthHelper from "../helpers/auth.helper"
import supertest from "supertest"
import {start} from "./server"

const baseUrl = process.env.BASE_URL
const port = process.env.PORT

if(baseUrl.includes('localhost') && baseUrl.includes(port))
    start(port)

before(async function(){
 const authHelper = new AuthHelper()
    await authHelper.logIn(process.env.LOGIN, process.env.PASSWORD)
    process.env['TOKEN'] = authHelper.response.body.token
})

after(async function(){
    if(baseUrl.includes('localhost') && baseUrl.includes(port))
        return
    this.response = await supertest(process.env.BASE_URL)
        .delete('/config')
        .set('Authorization', `Bearer ${process.env.TOKEN}`)
})