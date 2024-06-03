import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const updatedAnecdote = action.payload
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    },
    createAnecdote(state, action) {
      state.push({
        content: action.payload.content,
        votes: action.payload.votes || 0,
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { vote, createAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch(vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
