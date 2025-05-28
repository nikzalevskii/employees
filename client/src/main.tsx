import "./index.css"

import { ConfigProvider, theme } from "antd"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { store } from "./app/store"
import { Auth } from "./features/auth/auth"
import { AddEmployee } from "./pages/add-employee"
import { Employee } from "./pages/employee"
import { Employees } from "./pages/employees"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { Status } from "./pages/status"
import { Path } from "./paths"

const router = createBrowserRouter([
  {
    path: Path.home,
    element: <Employees />,
  },
  {
    path: Path.login,
    element: <Login />,
  },
  {
    path: Path.register,
    element: <Register />,
  },
  {
    path: Path.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Path.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Path.employee}/:id`,
    element: <Employee />,
  },
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
          <Auth>
            <RouterProvider router={router} />
          </Auth>
        </ConfigProvider>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
