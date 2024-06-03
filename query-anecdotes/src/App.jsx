import { useReducer, useRef } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import NotificationContext from "./notificationContext"
import notificationReducer from "./notificationReducer"
import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"
import { getAnecdotes, createAnecdote, voteAnecdote } from "./requests"

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
  })
  const queryClient = useQueryClient()
  const timeoutRef = useRef(null)

  const setNotification = (message, duration = 5000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    notificationDispatch({
      type: "SHOW_NOTIFICATION",
      message,
    })

    timeoutRef.current = setTimeout(() => {
      notificationDispatch({ type: "HIDE_NOTIFICATION" })
    }, duration)
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
      setNotification("Anecdote added!")
    },
  })

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
      setNotification("Anecdote voted!")
    },
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  })

  if (isLoading) {
    return <div>loading data...</div>
  }
  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <NotificationContext.Provider
        value={[notification, notificationDispatch]}
      >
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm addAnecdote={addAnecdote} />

        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </NotificationContext.Provider>
    </div>
  )
}

export default App
