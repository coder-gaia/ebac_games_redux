import Header from '..'
import { screen } from '@testing-library/react'
import { providerRender } from '../../../utils/tests'

describe('Component Header tests', () => {
  test('Must render correctly', () => {
    providerRender(<Header />)
    expect(screen.getByText('EBAC Games')).toBeInTheDocument()
  })

  test('Must render with 2 items on the cart', () => {
    providerRender(<Header />, {
      preloadedState: {
        carrinho: {
          itens: [
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
            }
          ]
        }
      }
    })
    expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
  })
})
