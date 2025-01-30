import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { getFormats, getTotalFilesList } from '../../../services/filesFormaterService.js'

chai.use(chaiHttp)

describe('Pruebas unitarias para el servicio', () => {
  beforeEach(() => {})

  afterEach(() => {})

  it('El servicio de formatos debe retornar una respuesta valida', async () => {
    const response = await getFormats()
    expect(response).to.be.a('array')
    response.forEach(formatedFile => {
      expect(formatedFile).to.be.a('object')
      expect(formatedFile).to.has.property('file')
      expect(formatedFile).to.has.property('lines')
    })
  })

  it('El servicio de formatos debe retornar una respuesta valida si se pide para un archivo en especifico', async () => {
    const response = await getFormats('test2.csv')
    expect(response).to.be.a('array')
    response.forEach(formatedFile => {
      expect(formatedFile).to.be.a('object')
      expect(formatedFile).to.has.property('file')
      expect(formatedFile).to.has.property('lines')
    })
  })

  it('El servicio de obtencio de lista debe retornar una respuesta valida', async () => {
    const response = await getTotalFilesList()

    expect(response).to.be.a('object')
    expect(response).to.has.property('files').and.is.a('array')
    response?.files.forEach(file => {
      expect(file).to.be.a('string')
      expect(file.split('.')[1]).to.equal('csv')
    })
  })
})
