import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { RiErrorWarningLine } from 'react-icons/ri'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [hasWarning, setHasWarning] = useState(false);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    const id = Math.floor(Math.random() * 1000)
    if (newTaskTitle === '') {
      setHasWarning(true)
      return
    }
    const task = { id: id, title: newTaskTitle, isComplete: false }
    setTasks([...tasks, task])
    setHasWarning(false)
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID"
    const newTasksList = tasks.filter(task => {
      return task.id === id ? (task.isComplete = !task.isComplete) || true : true
    })
    setTasks(newTasksList)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const newTasksList = tasks.filter(task => {
      return task.id != id
    })
    setTasks(newTasksList)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>My tasks</h2>


        <div className="input-group">
          {hasWarning ? (
            <div className="input-warning">
              <RiErrorWarningLine
                size={12}
                style={{ "transform": 'translateY(15%)' }} />
              Title can't be blank
            </div>
          ) : null}
          <input
            type="text"
            placeholder="Add new todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}