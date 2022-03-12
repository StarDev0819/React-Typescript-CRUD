import React, { useEffect, useState } from 'react'
import SubtodoItem from './components/SubtodoItem'
import AddTodo from './components/AddTodo'
import AddSubtodo from './components/AddSubtodo'
import { Accordion } from './components/Accordion'
import { getTodos, addTodo, addSubtodo, updateSubtodo, deleteSubtodo } from './API'

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
  }

  const handleAddTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleAddSubtodo = (e: React.FormEvent, formData: ISubtodo): void => {
    e.preventDefault()
    addSubtodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateSubtodo = (subtodo: ISubtodo): void => {
    updateSubtodo(subtodo)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteSubtodo = (_id: string): void => {
    deleteSubtodo(_id)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className='App'>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleAddTodo} />
      {todos.map((todo: ITodo) => (
        todo.subtodos.length > 0 ? 
          <Accordion todo={todo}>
            {
              todo.subtodos.map((subtodo: ISubtodo) => (
                <SubtodoItem
                  key={subtodo._id}
                  updateSubtodo={handleUpdateSubtodo}
                  deleteSubtodo={handleDeleteSubtodo}
                  subtodo={subtodo}
                />
              ))
            }
            <AddSubtodo saveSubtodo={handleAddSubtodo} parent_id={todo._id} />
          </Accordion>
          : ""
        ))}
    </main>
  )
}

export default App
