import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Header } from '../../components/Header'
import { Food } from '../../components/Food'
import { ModalAddFood } from '../../components/ModalAddFood'
import { ModalEditFood } from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'
import { FoodData } from '../../types'
import api from '../../services/api'

export function Dashboard() {
  const [foods, setFoods] = useState<FoodData[]>([])
  const [editingFood, setEditingFood] = useState<FoodData>({
    available: false,
    description: '',
    id: 0,
    image: '',
    name: '',
    price: '',
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    api
      .get('/foods')
      .then((response) => response.data)
      .then((data) => setFoods(data))
  }, [])

  async function handleAddFood(food: FoodData) {
    try {
      const newFood: FoodData = await api
        .post('/foods', {
          ...food,
          available: true,
        })
        .then((response) => response.data)
      console.log(newFood)

      setFoods([...foods, newFood])
    } catch (err) {
      toast.error('Erro ao adicionar um novo prato')
    }
  }

  async function handleUpdateFood(food: FoodData) {
    try {
      if (editingFood === undefined) {
        return
      }

      const { id } = editingFood
      const foodUpdated: FoodData = await api
        .put(`/foods/${id}`, {
          ...editingFood,
          ...food,
        })
        .then((response) => response.data)

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.id ? f : foodUpdated
      )

      setFoods(foodsUpdated)
    } catch (err) {
      toast.error('Erro aoo atualizar um prato')
    }
  }

  function handleEditFood(food: FoodData) {
    setEditingFood(food)
    setEditModalOpen(!editModalOpen)
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  async function handleDeleteFood(foodId: number) {
    await api.delete(`/foods/${foodId}`)

    const foodsFiltered = foods.filter((food) => food.id !== foodId)

    setFoods(foodsFiltered)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
