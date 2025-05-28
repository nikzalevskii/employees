import { Row } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import { useAddEmployeeMutation } from "@/app/services/employees"
import { EmployeeForm } from "@/components/employee-form"
import { Layout } from "@/components/layout"
import { selectUser } from "@/features/auth/authSlice"
import { Path } from "@/paths"
import { isErrorWithMessage } from "@/utils/is-error-with-message"

import type { Employee } from "../../../../generated/prisma"

export const AddEmployee = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const [addEmployee] = useAddEmployeeMutation()

  useEffect(() => {
    if (!user) {
      void navigate(Path.login)
    }
  }, [user, navigate])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()
      void navigate(`${Path.status}/created`)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      if (maybeError) {
        setError(err.data.message)
      } else {
        setError("Неизвестная ошибка")
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}
