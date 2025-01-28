import { expect } from 'chai'
import chai from 'chai'
import chaiHttp from 'chai-http'
chai.use(chaiHttp)

import sinon from 'sinon'
import axios from 'axios'
import makeRequest from '../../utils/axiosRequester.js'

describe('Pruebas unitarias para el modulo de utilidad', () => {
    let axiosStub

    beforeEach(() => {
        // Stub Axios
        axiosStub = sinon.stub(axios, 'request')
    })

    afterEach(() => {
        // Restore Axios
        sinon.restore()
    })

    it('should make a GET request with correct parameters', async () => {
        const mockResponse = { data: { success: true } }

        axiosStub.resolves(mockResponse)

        const result = await makeRequest({
            method: 'GET',
            url: 'https://api.example.com/data',
            params: { userId: 123 },
        })

        expect(axiosStub.calledOnce).to.be.true
        expect(axiosStub.args[0][0]).to.include({
            method: 'GET',
            url: 'https://api.example.com/data',
        })
        expect(axiosStub.args[0][0].params).to.deep.equal({ userId: 123 })
        expect(result).to.deep.equal(mockResponse.data)
    })

    it('should make a POST request with a request body', async () => {
        const mockResponse = { data: { success: true } }

        axiosStub.resolves(mockResponse)

        const result = await makeRequest({
            method: 'POST',
            url: 'https://api.example.com/data',
            data: { name: 'Test' },
        })

        expect(axiosStub.calledOnce).to.be.true
        expect(axiosStub.args[0][0]).to.include({
            method: 'POST',
            url: 'https://api.example.com/data',
        })
        expect(axiosStub.args[0][0].data).to.deep.equal({ name: 'Test' })
        expect(result).to.deep.equal(mockResponse.data)
    })

    it('should include custom headers in the request', async () => {
        const mockResponse = { data: { success: true } }

        axiosStub.resolves(mockResponse)

        const result = await makeRequest({
            method: 'GET',
            url: 'https://api.example.com/data',
            headers: { Authorization: 'Bearer token123' },
        })

        expect(axiosStub.calledOnce).to.be.true
        expect(axiosStub.args[0][0].headers).to.include({
            Authorization: 'Bearer token123',
        })
        expect(result).to.deep.equal(mockResponse.data)
    })

    it('should handle a failed request and throw an error', async () => {
        const mockError = {
            response: {
                data: { error: 'Unauthorized' },
            },
        }

        axiosStub.rejects(mockError)

        try {
            await makeRequest({
                method: 'GET',
                url: 'https://api.example.com/data',
            })
        } catch (error) {
            expect(error).to.deep.equal(mockError.response.data)
        }

        expect(axiosStub.calledOnce).to.be.true
    })

    it('should handle network errors without a response and throw the error message', async () => {
        const mockError = new Error('Network Error')

        axiosStub.rejects(mockError)

        try {
            await makeRequest({
                method: 'GET',
                url: 'https://api.example.com/data',
            })
        } catch (error) {
            expect(error).to.equal('Network Error')
        }

        expect(axiosStub.calledOnce).to.be.true
    })
})