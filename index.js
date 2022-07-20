const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(express.json())

app.use(cors())
app.use(logger)

let tasks = [
  {
    id: 1,
    title: 'Learn React',
    content: 'Learn React',
    completed: true,
    date: '2022-05-30T17:30:31.098Z'
  },
  {
    id: 2,
    title: 'Learn Typescript',
    content: 'Learn Typescript',
    completed: false,
    date: '2022-05-30T17:30:31.098Z'
  },
  {
    id: 3,
    title: 'Learn Node',
    content: 'Learn Node',
    completed: false,
    date: '2022-05-30T17:30:31.098Z'
  },
  {
    id: 4,
    title: 'Learn React Native',
    content: 'Learn React Native',
    completed: false,
    date: '2022-05-30T17:30:31.098Z'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Api con Express</h1>')
})

app.get('/tasks', (request, response) => {
  response.json(tasks)
})

app.get('/tasks/:id', (request, response) => {
  const id = Number(request.params.id)
  const task = tasks.find((task) => task.id === id)

  if (task) response.json(task)
  else response.status(404).end()
})

app.delete('/tasks/:id', (request, response) => {
  const id = Number(request.params.id)
  tasks = tasks.filter((task) => task.id !== id)
  response.status(204).end()
})

app.post('/tasks', (request, response) => {
  const task = request.body

  if (!task || !task.content) {
    return response.status(404).json({
      error: 'content is missing'
    })
  }

  const ids = tasks.map((note) => note.id)
  const maxID = Math.max(...ids)

  const newTask = {
    id: maxID + 1,
    content: task.content,
    date: new Date().toDateString(),
    complete: typeof tasks.important !== 'undefined' ? task.complete : false
  }

  tasks.push(newTask)
  response.status(201).json(newTask)
})

// 404 por default
app.use((request, response) => {
  response.status(404).json({ error: 'not found' })
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
