import React, { useState } from 'react'

type Props = { 
  saveSubtodo: (e: React.FormEvent, formData: ISubtodo | any) => void 
  parent_id: string
}

const AddSubtodo: React.FC<Props> = ({ saveSubtodo, parent_id }) => {
  const [formData, setFormData] = useState<ISubtodo | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
      parent_id: parent_id
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveSubtodo(e, formData)}>
      <div>
        <div>
          <label htmlFor='title'>Name</label>
          <input onChange={handleForm} type='text' id='title' />
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Todo</button>
    </form>
  )
}

export default AddSubtodo
