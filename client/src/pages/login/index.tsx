import { Card, Form, Row, Space, Typography } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import type { UserData } from "@/app/services/auth"
import { useLoginMutation } from "@/app/services/auth"
import { ErrorMessage } from "@/components/error-message"
import { Layout } from "@/components/layout"
import { CButton } from "@/ui-kit/button"
import { CInput } from "@/ui-kit/input"
import { CPasswordInput } from "@/ui-kit/password-input/insex"
import { isErrorWithMessage } from "@/utils/is-error-with-message"

import { Path } from "../../paths"

export const Login = () => {
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState("")

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      void navigate(Path.home)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      if (maybeError) {
        setError((err as { data: { message: string } }).data.message)
      } else {
        setError("Неизвестная ошибка")
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: 400 }}>
          {/* eslint-disable @typescript-eslint/no-misused-promises */}
          <Form onFinish={login}>
            <CInput
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
            />
            <CPasswordInput name="password" placeholder="Пароль" />
            <CButton type="primary" htmlType="submit">
              Войти
            </CButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Path.register}>Зарегистрироваться</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
