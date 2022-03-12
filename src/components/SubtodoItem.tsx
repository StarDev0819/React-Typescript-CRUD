import React from 'react'

type Props = SubtodoProps & {
    updateSubtodo: (subtodo: ITodo) => void
    deleteSubtodo: (_id: string) => void
}

const Subtodo: React.FC<Props> = ({ subtodo, updateSubtodo, deleteSubtodo }) => {
    const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        const status = event.target.checked;
        subtodo.status = status;
        console.log(subtodo.status)
        updateSubtodo(subtodo);
    };

    return (
        <div className='Card'>
        <div className='Card--text'>
            <input type="checkbox" id="status" onChange={handleUpdate} />
            <h2 className="Card-title">{subtodo.title}</h2>
        </div>
        <div className='Card--button'>
            <button
            onClick={() => deleteSubtodo(subtodo._id)}
            className='Card--button__delete'
            >
            Delete
            </button>
        </div>
        </div>
    )
}

export default Subtodo
