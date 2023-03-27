import { FormHandles } from '@unform/core'
import { createRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { FoodTyping } from '../../types'

interface ModalEditFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  editingFood: FoodTyping
  handleUpdateFood: (data: FoodTyping) => void
}

export function ModalEditFood(props: ModalEditFoodProps) {
  const { editingFood, handleUpdateFood, isOpen, setIsOpen } = props

  const formRef = createRef<FormHandles>()

  function handleSubmit(data: FoodTyping) {
    handleUpdateFood(data)
    setIsOpen()
  }

  return (
    <Modal modalStatus={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={editingFood}
      >
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
