import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import { Layout, Space, Typography } from "antd"
import { Link } from "react-router-dom"

import { Path } from "../../paths"
import { CButton } from "../../ui-kit/button"
import styles from "./index.module.css"

export const Header = () => {
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
    </Layout.Header>
  )
}
