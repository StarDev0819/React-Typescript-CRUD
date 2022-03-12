interface ITodo {
    _id: string
    title: string
    status?: boolean
    subtodos?: Array
    createdAt?: string
    updatedAt?: string
}

interface ISubtodo {
    _id: string
    title: string
    status?: boolean
    subtodos?: Array
    parent_id?: string
    createdAt?: string
    updatedAt?: string
}

type TodoProps = {
    todo: ITodo
}

type SubtodoProps = {
    subtodo: ITodo
}

type ApiDataType = {
    message: string
    status: string
    todos: ITodo[]
    todo?: ITodo
    subtodos: ITodo[]
    subtodo?: ITodo
  }
  