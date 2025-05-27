import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Layout, Space, Typography } from "antd"
import { Link, useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { logout, selectUser } from "@/features/auth/authSlice"

import { Path } from "../../paths"
import { CButton } from "../../ui-kit/button"
import styles from "./index.module.css"

export const Header = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    void navigate(Path.login)
  }

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Path.home}>
          <CButton type="ghost">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CButton>
        </Link>
      </Space>
      {user ? (
        <CButton type="ghost" icon={<LogoutOutlined />} onClick={onLogout}>
          Выход
        </CButton>
      ) : (
        <Space>
          <Link to={Path.register}>
            <CButton type="ghost" icon={<UserOutlined />}>
              Регистрация
            </CButton>
          </Link>
          <Link to={Path.login}>
            <CButton type="ghost" icon={<LoginOutlined />}>
              Вход
            </CButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  )
}
