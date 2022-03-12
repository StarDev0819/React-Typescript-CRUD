import axios, { AxiosResponse } from 'axios'

const baseUrl: string = 'http://localhost:4000'

export const getTodos = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl
    )
    return todos
  } catch (error) {
    throw new Error(error)
  }
}

export const addTodo = async (
  formData: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todo: Omit<ITodo, '_id'> = {
      title: formData.title
    }
    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-todo',
      todo
    )

    return saveTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const addSubtodo = async (
  formData: ISubtodo,
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const subtodo: Omit<ISubtodo, '_id'> = {
      title: formData.title,
      parent_id: formData.parent_id
    }
    console.log(subtodo);
    const saveSubtodo: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + '/add-subtodo',
      subtodo
    )

    return saveSubtodo
  } catch (error) {
    throw new Error(error)
  }
}

export const updateTodo = async (
  todo: ITodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const todoUpdate: Pick<ITodo, 'status'> = {
      status: true,
    }
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-todo/${todo._id}`,
      todoUpdate
    )
    return updatedTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteTodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-todo/${_id}`
    )
    return deletedTodo
  } catch (error) {
    throw new Error(error)
  }
}

export const updateSubtodo = async (
  subtodo: ISubtodo
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const subtodoUpdate: Pick<ISubtodo, 'status'> = {
      status: subtodo.status,
    }
    console.log(subtodoUpdate);
    const updatedSubtodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-subtodo/${subtodo._id}`,
      subtodoUpdate
    )
    return updatedSubtodo
  } catch (error) {
    throw new Error(error)
  }
}

export const deleteSubtodo = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedSubtodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-subtodo/${_id}`
    )
    return deletedSubtodo
  } catch (error) {
    throw new Error(error)
  }
}
