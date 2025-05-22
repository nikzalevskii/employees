import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { store } from "./app/store"
import { Path } from "./paths"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import "./index.css"

const router = createBrowserRouter([
  {
    path: Path.home,
    element: <h1>Employees</h1>,
  },
  {
    path: Path.login,
    element: <Login />,
  },
  {
    path: Path.register,
    element: <Register />,
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
