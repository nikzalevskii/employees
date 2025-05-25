import { createListenerMiddleware } from "@reduxjs/toolkit"

import { authApi } from "@/app/services/auth"

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: (action, listenerApi) => {
    listenerApi.cancelActiveListeners()
    if (action.payload.token) {
      localStorage.setItem("token", action.payload.token)
    }
  },
})
