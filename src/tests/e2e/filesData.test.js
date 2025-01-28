import { expect } from 'chai'
import chai from 'chai'
import chaiHttp from 'chai-http'
chai.use(chaiHttp)

import {server} from '../../index.js'

describe('Pruebas e2e para el endpoint /files/data', () => {
    afterEach(() => {})

    it('Debe retornar un estatus 200', async () => {
        const res = await chai.request(server).get('/files/data')
        expect(res.statusCode).to.equal(200)
    })

    it('Debe retornar cada archivo en el formato deseado', async() => {
        const res = await chai.request(server).get('/files/data')

        expect(res.body).to.be.an('array')

        res.body.forEach(formated => {
            // check first level properties
            expect(formated).to.have.property('file').and.to.be.a('string')
            expect(formated).to.have.property('lines').and.to.be.a('array')

            formated.lines.forEach(line => {
                // check second level properties
                expect(line).to.have.property('text').and.to.be.a('string')
                expect(line).to.have.property('number').and.to.be.a('string')
                expect(line).to.have.property('hex').and.to.be.a('string')

                expect(line.text.match(/[a-zA-Z]+$/)).to.not.be.null
                expect(line.number.match(/\d+$/)).to.not.be.null
                expect(line.hex.match(/[a-fA-F0-9]{32}$/)).to.not.be.null

                expect(!isNaN(line.number)).to.be.true

                expect(Object.keys(line)).to.deep.equal(['text','number','hex'])
                expect(Object.keys(line).length).to.equal(3)
            })
        })
    })

    it('Debe retornar un solo archivo formateado si este es especificado (?fileName=name)', async() => {
        const res = await chai.request(server).get('/files/data?fileName=test2.csv')

        expect(res.body).to.be.an('array')

        expect(res.body[0]).to.have.property('file').and.to.be.a('string')
        expect(res.body[0]).to.have.property('lines').and.to.be.a('array')
    })

    it('Debe retornar un array vacio si el archivo no existe', async () => {
        const res = await chai.request(server).get('/files/data?fileName=nonexistent.csv')
        expect(res.statusCode).to.equal(200)
        expect(res.body).to.be.an('array').that.is.empty
    })

    it('Debe retornar estatus 400 si se le pasa un parametro no valido', async () => {
        const res = await chai.request(server).get('/files/data?invalidParam=value');
        expect(res.statusCode).to.equal(400)
        expect(res.body).to.have.property('errors').that.is.a('array')
    })

    it('Debe retornar 404 para metodos http no permitidos o no soportados', async () => {
        const methods = ['post', 'put', 'delete']
        for (const method of methods) {
            const res = await chai.request(server)[method]('/files/data')
            expect(res.statusCode).to.equal(404)
        }
    })

    it('Debe manejar la respuesta en menos de 2 segundos', async () => {
        const startTime = Date.now()
        const response = await chai.request(server).get('/files/data')
        const endTime = Date.now()

        expect(response.statusCode).to.equal(200)
        expect(endTime - startTime).to.be.lessThan(2000)
    })
})