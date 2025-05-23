import { Card, Form, Row, Space, Typography } from "antd"
import { Link } from "react-router-dom"

import { Layout } from "@/components/layout"
import { CButton } from "@/ui-kit/button"
import { CInput } from "@/ui-kit/input"
import { CPasswordInput } from "@/ui-kit/password-input/insex"

import { Path } from "../../paths"

export const Register = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Регистрация" style={{ width: 400 }}>
          <Form onFinish={() => null}>
            <CInput type="text" name="name" placeholder="Имя" />
            <CInput type="email" name="email" placeholder="Email" />
            <CPasswordInput name="password" placeholder="Пароль" />
            <CPasswordInput
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              dependencies={["password"]}
            />
            <CButton type="primary" htmlType="submit">
              Зарегистрироваться
            </CButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Есть аккаунт? <Link to={Path.login}>Войти</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
