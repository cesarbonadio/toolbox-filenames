import { expect } from 'chai'
import chai from 'chai'
import chaiHttp from 'chai-http'
import {server} from '../../index.js'
chai.use(chaiHttp)

describe('Pruebas e2e generales de la API interna', () => {
    afterEach(() => {})

    it('Chequeo de ruta health check para API interna (propia)', async () => {
        const res = await chai.request(server).get('/health')
        expect(res.status).to.equal(200)
    })

    it('Si no existe una ruta de la api desarrollada debe devolver 404', async () => {
        const res = await chai.request(server).get('/noexiste')
        expect(res.status).to.equal(404)
    })
})