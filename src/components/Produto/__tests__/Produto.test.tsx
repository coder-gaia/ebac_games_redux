import { fireEvent, screen } from '@testing-library/react'

import { providerRender } from '../../../utils/tests'
import Produto from '..'

const jogo = {
  id: 1,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['windows'],
  preco: 150.99,
  precoAntigo: 199.9,
  titulo: 'Elden Ring'
}

describe('Product component tests', () => {
  test('Must render correctly', () => {
    providerRender(<Produto game={jogo} />)
    expect(screen.getByText('Elden Ring')).toBeInTheDocument()
  })

  test('Must add one item in the cart', () => {
    const { store } = providerRender(<Produto game={jogo} />)
    const btn = screen.getByTestId('btn-add-product')
    fireEvent.click(btn)

    store.getState().carrinho.itens

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
