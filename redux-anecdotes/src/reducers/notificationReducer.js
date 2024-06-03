import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ""
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

let notificationTimeout

export const setNotificationWithTimeout =
  (notification, timeout) => (dispatch) => {
    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }

    dispatch(setNotification(notification))

    notificationTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }

export default notificationSlice.reducer
