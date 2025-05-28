import { PlayCircleOutlined } from "@ant-design/icons"
import { Table } from "antd"
import type { ColumnsType } from "antd/es/table"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import { useGetAllEmployeesQuery } from "@/app/services/employees"
import { Layout } from "@/components/layout"
import { selectUser } from "@/features/auth/authSlice"
import { Path } from "@/paths"
import { CButton } from "@/ui-kit/button"

import type { Employee } from "../../../../generated/prisma"

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
]

export const Employees = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const { data, isLoading } = useGetAllEmployeesQuery()

  useEffect(() => {
    if (!user) {
      void navigate(Path.login)
    }
  }, [user, navigate])

  const gotoAddUser = () => void navigate(Path.employeeAdd)

  return (
    <Layout>
      <CButton
        type="primary"
        onClick={gotoAddUser}
        icon={<PlayCircleOutlined />}
      >
        Добавить
      </CButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={employee => employee.id}
        onRow={record => ({
          onClick: () => navigate(`${Path.employee}/${record.id}`),
        })}
      />
    </Layout>
  )
}
