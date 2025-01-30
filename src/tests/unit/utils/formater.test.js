import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { getLinesFromContent } from '../../../utils/formater.js'

import {
  notValidFileWrongHeader,
  validFile,
  emptyFile,
  emptyFileJustHeader,
  notValidFileNumberMistakes,
  notValidSomeTexts,
  notValidSomeHexadecimals,
  fileNameForAllExamples,
  largeStringMultipleCasesCombined
} from '../../testConstants.js'

chai.use(chaiHttp)

describe('Pruebas unitarias para el formater del contenido de los archivos', () => {
  beforeEach(() => {})

  afterEach(() => {})

  it('Debe arrojar un error cuando el header o encabezado no es el correcto', () => {
    expect(() => getLinesFromContent(notValidFileWrongHeader, fileNameForAllExamples)).to.throw(
      'Invalid first line format'
    )
  })

  it('Debe procesar archivos correctos, correctamente', () => {
    const expected = [
      {
        text: 'wINm',
        number: 444,
        hex: 'bcaa18b7fa1e876b544e0e90e1137eb4'
      },
      {
        text: 'xYiGJmOGE',
        number: 81220,
        hex: '01eb97a35d6e3b902a873874468d3e10'
      },
      {
        text: 'dgjXf',
        number: 682582,
        hex: 'a0ff8a57088a79f11b3f01944c004ed2'
      }
    ]
    expect(getLinesFromContent(validFile, fileNameForAllExamples)).to.deep.equal(expected)
  })

  it('Debe procesar archivos vacios sin cabecera y retornar un arreglo vacio', () => {
    expect(getLinesFromContent(emptyFile, fileNameForAllExamples)).to.deep.equal([])
  })

  it('Los archivos de solo cabecera sin mas, tambien deben devolver un arreglo vacio', () => {
    expect(getLinesFromContent(emptyFileJustHeader, fileNameForAllExamples)).to.deep.equal([])
  })

  it('Se deben descartar lineas cuyo campo \'number\' no cumpla un criterio valido (no vacio, entero, no letras, no negativos)', () => {
    const expected = [
      {
        text: 'PpYRp',
        number: 102,
        hex: '441232fa7fd27880974b92593ac45c07'
      }
    ]
    expect(getLinesFromContent(notValidFileNumberMistakes, fileNameForAllExamples)).to.deep.equal(expected)
  })

  it('Se deben descartar lineas cuyo campo \'text\' no cumpla con un criterio valido (no vacio, solo letras)', () => {
    const expected = [
      {
        text: 'validText',
        number: 9101,
        hex: 'a0ff8a57088a79f11b3f01944c004ed2'
      }
    ]
    expect(getLinesFromContent(notValidSomeTexts, fileNameForAllExamples)).to.deep.equal(expected)
  })

  it('Se deben descartar lineas cuyo campo \'hex\' no cumpla con un criterio valido (longitud igual a 32, solo caracteres hex, no vacio)', () => {
    const expected = [
      {
        text: 'xYiGJmOGE',
        number: 81220,
        hex: '01eb97a35d6e3b902a873874468d3e10'
      },
      {
        text: 'hello',
        number: 3344,
        hex: '1234abcd5678ef901234abcd5678ef90'
      }
    ]
    expect(getLinesFromContent(notValidSomeHexadecimals, fileNameForAllExamples)).to.deep.equal(expected)
  })

  it('Una ultima prueba de un archivo grande que combina muchos casos borde', () => {
    const expected = [
      {
        text: 'gammaok',
        number: 6301,
        hex: 'ec0de06105784f38fecf0b22baf4ba7b'
      },
      {
        text: 'deltaok',
        number: 4614,
        hex: '9be0498d4e4f9485211fa987edf9af72'
      },
      {
        text: 'testing',
        number: 4320,
        hex: 'f4ce5271ceb3b89b20007bf73277e8a4'
      },
      {
        text: 'beta',
        number: 9615,
        hex: '9ce7cd92f2b65933dc7cd97ef6cac2c7'
      },
      {
        text: 'sample',
        number: 7373,
        hex: '517026570a81778d0379f33a0a0e9aea'
      },
      {
        text: 'beta',
        number: 9541,
        hex: '5cef2ce5e46fc8bc6aa80e01757f54cc'
      },
      {
        text: 'delta',
        number: 4408,
        hex: 'f8d69709f2f1b7706d256c66733a9d26'
      }
    ]
    expect(getLinesFromContent(largeStringMultipleCasesCombined, fileNameForAllExamples)).to.deep.equal(expected)
  })
})
