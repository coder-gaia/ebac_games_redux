import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { screen, waitFor } from '@testing-library/react'

import Produtos from '../Produtos'
import { providerRender } from '../../utils/tests'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['windows'],
    preco: 150.99,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows', 'PS5', 'XBox Series S/X'],
    preco: 250.9,
    precoAntigo: 330.4,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['windows', 'PS5'],
    preco: 140.9,
    precoAntigo: 169.9,
    titulo: 'Gotham Knights'
  },
  {
    id: 4,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['Nintendo Switch'],
    preco: 280.99,
    precoAntigo: 320.4,
    titulo: 'Donkey Kong'
  }
]
const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Products container tests', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Must render correctly with the loading text', () => {
    providerRender(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Must render correctly with the games listing', async () => {
    const { debug } = providerRender(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
    })
  })
})
