import { Card, Form, Space } from "antd"

import { CButton } from "@/ui-kit/button"
import { CInput } from "@/ui-kit/input"

import type { Employee } from "../../../../generated/prisma"
import { ErrorMessage } from "../error-message"

type Props<T> = {
  onFinish: (values: T) => void
  btnText: string
  title: string
  error?: string
  employee?: T
}

export const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: Props<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <CInput type="text" name="firstName" placeholder="Имя" />
        <CInput type="text" name="lastName" placeholder="Фамилия" />
        <CInput type="number" name="age" placeholder="Возраст" />
        <CInput type="text" name="address" placeholder="Адрес" />
        <Space>
          <ErrorMessage message={error} />
          <CButton type="primary" htmlType="submit">
            {btnText}
          </CButton>
        </Space>
      </Form>
    </Card>
  )
}
