import { useEffect } from "react"
import { useDispatch } from "react-redux"
import NewAnecdote from "./components/NewAnecdote"
import Anecdotes from "./components/Anecdotes"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App
