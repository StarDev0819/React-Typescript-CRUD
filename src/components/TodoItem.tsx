import React from 'react'

type Props = TodoProps & {
    updateTodo: (todo: ITodo) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo }) => {
    const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
      const status = event.target.checked;
      todo.status = status;
      updateTodo(todo);
    };

    return (
      <div className='Card'>
        <div className='Card--text'>
          <input type="checkbox" id="status" onChange={handleUpdate} onClick={(e)=> e.stopPropagation()} />
          <h1 className="Card-title">{todo.title}</h1>
        </div>
      </div>
  )
}

export default Todo
