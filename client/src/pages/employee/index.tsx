import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Descriptions, Divider, Modal, Space } from "antd"
import { useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "@/app/services/employees"
import { ErrorMessage } from "@/components/error-message"
import { Layout } from "@/components/layout"
import { selectUser } from "@/features/auth/authSlice"
import { Path } from "@/paths"
import { CButton } from "@/ui-kit/button"
import { isErrorWithMessage } from "@/utils/is-error-with-message"

export const Employee = () => {
  const params = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading } = useGetEmployeeQuery(params.id ?? "")
  const [removeEmployee] = useRemoveEmployeeMutation()
  const user = useAppSelector(selectUser)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!data) {
    return <Navigate to={Path.home} />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const hideModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteUser = async () => {
    hideModal()
    try {
      await removeEmployee(data.id).unwrap()
      void navigate(`${Path.status}/deleted`)
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
      <Descriptions title="Информация о сотруднике" bordered>
        <Descriptions.Item label="Имя" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Возраст" span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес" span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`${Path.employeeEdit}/${data.id}`}>
              <CButton shape="round" type="default" icon={<EditOutlined />}>
                Редактировать
              </CButton>
            </Link>
            <CButton
              shape="round"
              type="primary"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Удалить
            </CButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Подтверждение удаления"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Удалить"
        cancelText="Отменить"
      >
        <p>Вы действительно хотите удалить сотрудника из таблицы?</p>
      </Modal>
    </Layout>
  )
}
