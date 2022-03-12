import React, { useEffect, useReducer, useRef } from 'react'

import TodoItem from './TodoItem'

import { updateTodo } from '../API'

export declare interface AccordionProps {
  todo: ITodo
  show?: boolean
  children?: React.ReactNode
}

type State = {
  collapse: boolean
}

type Action = { type: 'collapse' } | { type: 'show' }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'collapse':
      return {
        collapse: !state.collapse
      }
    case 'show':
      return {
        collapse: true
      }
  }
}

export function Accordion({
  todo,
  show = false,
  children
}: AccordionProps) {
  const accordionBodyRef = useRef<HTMLDivElement>(null)
  const [{ collapse }, dispatch] = useReducer(reducer, {
    collapse: show
  })

  const randomId = useRef(
    window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
  )

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
    .then(({ status }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (show) dispatch({ type: 'show' })
  }, [show])

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${randomId.current}`}>
        <button
          className={`accordion-button${collapse ? '' : ' collapsed'}`}
          type="button"
          aria-expanded={collapse}
          aria-controls={`collapse-${randomId.current}`}
          onClick={() => dispatch({ type: 'collapse' })}
        >
            <TodoItem
                key={todo._id}
                updateTodo={handleUpdateTodo}
                todo={todo}
            />
        </button>
        
      </h2>

      <div
        id={`collapse-${randomId.current}`}
        aria-labelledby={`heading-${randomId.current}`}
        className={`accordion-collapse`}
        style={
          collapse
            ? {
                height: accordionBodyRef.current?.clientHeight,
                transition: 'height 0.2s ease',
                overflow: 'hidden'
              }
            : {
                height: 0,
                transition: 'height 0.2s ease',
                overflow: 'hidden'
              }
        }
      >
        <div className="accordion-body" ref={accordionBodyRef}>
          {children}
        </div>
      </div>
    </div>
  )
}
