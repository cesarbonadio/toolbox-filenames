import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import dotenv from 'dotenv'

chai.use(chaiHttp)
dotenv.config()

describe('Pruebas e2e para la API externa (chequeo de disponibilidad)', () => {
  afterEach(() => {})

  it('Debe retornar una lista con los nombres de los archivos', async () => {
    const res = await chai.request(process.env.EXTERNAL_API_URL)
      .get('/secret/files')
      .set('Authorization', `Bearer ${process.env.EXTERNAL_API_TOKEN}`)

    expect(res.body).to.be.an('object')
    expect(res.body).to.have.property('files').and.to.be.a('array')
    expect(res.body?.files?.length).to.be.greaterThan(0)

    res.body.files.forEach(fileName => {
      // test the fileName has the desired structure and nomenclature
      expect(fileName.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)).to.not.be.null
    })
  })

  it('Debe retornar el cuerpo de un archivo csv para un arhivo existente', async () => {
    const res = await chai.request(process.env.EXTERNAL_API_URL)
      .get('/secret/file/test2.csv')
      .set('Authorization', `Bearer ${process.env.EXTERNAL_API_TOKEN}`)
    expect(res.status).to.equal(200)
    expect(res.text).to.be.an('string')
    expect(res).to.exist
    expect(res.text).to.not.be.null
  })

  it('Hay archivos que no estan disponibles (error 500 y 404)', async () => {
    const res = await chai.request(process.env.EXTERNAL_API_URL)
      .get('/secret/file/test4.csv')
      .set('Authorization', `Bearer ${process.env.EXTERNAL_API_TOKEN}`)
    expect(res.status).to.equal(500)

    const rest = await chai.request(process.env.EXTERNAL_API_URL)
      .get('/secret/file/test5.csv')
      .set('Authorization', `Bearer ${process.env.EXTERNAL_API_TOKEN}`)
    expect(rest.status).to.equal(404)
  })
})
