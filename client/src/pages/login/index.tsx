import { Card, Form, Row, Space, Typography } from "antd"
import { Link } from "react-router-dom"

import { Layout } from "@/components/layout"
import { CButton } from "@/ui-kit/button"
import { CInput } from "@/ui-kit/input"
import { CPasswordInput } from "@/ui-kit/password-input/insex"

import { Path } from "../../paths"

export const Login = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Войдите" style={{ width: 400 }}>
          <Form onFinish={() => null}>
            <CInput type="email" name="email" placeholder="Email" />
            <CPasswordInput name="password" placeholder="Пароль" />
            <CButton type="primary" htmlType="submit">
              Войти
            </CButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нет аккаунта? <Link to={Path.register}>Зарегистрироваться</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
