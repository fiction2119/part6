import { useDispatch, useSelector } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"
import { setNotificationWithTimeout } from "../reducers/notificationReducer"

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const anecdoteVote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(
      setNotificationWithTimeout(`You voted '${anecdote.content}'`, 5000)
    )
  }

  const filteredAnecdotes = anecdotes.filter(
    (anecdote) =>
      anecdote.content &&
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content} has {anecdote.votes}
            <button onClick={() => anecdoteVote(anecdote)}>vote</button>
            <p></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Anecdotes
