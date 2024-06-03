import PropTypes from "prop-types"
import { useContext } from "react"
import NotificationContext from "../notificationContext"

const AnecdoteForm = ({ addAnecdote }) => {
  const [notification, dispatch] = useContext(NotificationContext)

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit' onClick={() => dispatch("New anecdote created")}>
          create
        </button>
      </form>
    </div>
  )
}

AnecdoteForm.propTypes = {
  addAnecdote: PropTypes.func.isRequired,
}

export default AnecdoteForm
