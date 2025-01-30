import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

import { server } from '../../index.js'

chai.use(chaiHttp)

describe('Pruebas e2e para el endpoint /files/list', () => {
  afterEach(() => {})

  it('Debe retornar un estatus 200', async () => {
    const res = await chai.request(server).get('/files/list')
    expect(res.statusCode).to.equal(200)
  })

  it('Debe retornar un arreglo nombrando cada archivo asi como lo hace la API externa', async () => {
    const res = await chai.request(server).get('/files/list')

    expect(res.body).to.be.an('object')
    expect(res.body).to.have.property('files').and.to.be.a('array')
    expect(res.body?.files?.length).to.be.greaterThan(0)

    res.body.files.forEach(fileName => {
      // test the fileName has the desired structure and nomenclature
      expect(fileName.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)).to.not.be.null
    })
  })

  it('Debe retornar 404 para metodos HTTP no soportados o no permitidos', async () => {
    const methods = ['post', 'put', 'delete']
    for (const method of methods) {
      const res = await chai.request(server)[method]('/files/list')
      expect(res.statusCode).to.equal(404)
    }
  })

  it('Debe retornar 400 si un parametro es enviado (no esta permitido ninguno para este endpoint)', async () => {
    const res = await chai.request(server).get('/files/list?invalidParam=invalid')
    expect(res.statusCode).to.equal(400)
    expect(res.body.errors[0]).to.equal('there is not a queryparam allowed for this method')
  })

  it('Debe retornar una respuesta en menos de dos segundos', async () => {
    const startTime = Date.now()
    const response = await chai.request(server).get('/files/list')
    const endTime = Date.now()

    expect(response.statusCode).to.equal(200)
    expect(endTime - startTime).to.be.lessThan(2000)
  })
})
