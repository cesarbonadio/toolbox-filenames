import { expect } from 'chai'
import chai from 'chai'
import chaiHttp from 'chai-http'
import makeRequest from '../../../utils/axiosRequester.js'

chai.use(chaiHttp)

describe('Pruebas unitarias para la utilidad makeRequest que hace wrapp de todos los request de axios', () => {
    let postmanEchoUrlBase = 'https://postman-echo.com'

    beforeEach(() => {})

    afterEach(() => {})

    it('should make a GET request correctly', async () => {
        const result = await makeRequest({
            method: 'GET',
            url: `${postmanEchoUrlBase}/get`
        }, true)

        expect(result.status).to.equal(200)
        expect(result.data).to.have.property('url').and.to.be.a('string').and.to.be.equal(`${postmanEchoUrlBase}/get`)
    })

    it('should make a GET request with correct params', async () => {
        const result = await makeRequest({
            method: 'GET',
            url: `${postmanEchoUrlBase}/get`,
            params: { catName: 'simba <3' }
        }, true)

        expect(result.status).to.equal(200)
        expect(result.data.args).to.have.property('catName').and.to.be.a('string').and.to.be.equal('simba <3')
    })

    it('should make a GET request with correct headers', async () => {
        const result = await makeRequest({
            method: 'GET',
            url: `${postmanEchoUrlBase}/get`,
            headers: {
                'Content-Type': 'application/json'
            }
        }, true)

        expect(result.status).to.equal(200)
        expect(result.data.headers).to.have.property('content-type').and.to.be.a('string').and.to.be.equal('application/json')
    })

    it('should make a POST request with data', async () => {
        const result = await makeRequest({
            method: 'POST',
            url: `${postmanEchoUrlBase}/post`,
            data: {
                name:"cesar",
                age:26
            }
        }, true)

        expect(result.status).to.equal(200)
        expect(result.data.data).to.have.property('name').and.to.be.a('string').and.to.be.equal('cesar')
        expect(result.data.data).to.have.property('age').and.to.be.a('number').and.to.be.equal(26)
    })
})