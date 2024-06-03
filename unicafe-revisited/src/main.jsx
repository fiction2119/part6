import React from "react"
import ReactDOM from "react-dom/client"
import { createStore } from "redux"

const counterReducer = (state = { good: 0, ok: 0, bad: 0 }, action) => {
  switch (action.type) {
    case "GOOD":
      return { ...state, good: state.good + 1 }
    case "OK":
      return { ...state, ok: state.ok + 1 }
    case "BAD":
      return { ...state, bad: state.bad + 1 }
    case "RESET":
      return { good: 0, ok: 0, bad: 0 }
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  const state = store.getState()
  return (
    <div>
      <div>
        <button onClick={() => store.dispatch({ type: "GOOD" })}>good</button>
        {state.good}
      </div>
      <div>
        <button onClick={() => store.dispatch({ type: "OK" })}>ok</button>
        {state.ok}
      </div>
      <div>
        <button onClick={() => store.dispatch({ type: "BAD" })}>bad</button>
        {state.bad}
      </div>
      <div>
        <button onClick={() => store.dispatch({ type: "RESET" })}>
          reset stats
        </button>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
