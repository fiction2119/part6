const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return { ...state, message: action.message }
    case "HIDE_NOTIFICATION":
      return { ...state, message: null }
    default:
      return state
  }
}

export default notificationReducer
