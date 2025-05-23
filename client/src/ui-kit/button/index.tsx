import { Button, Form } from "antd"

type Props = {
  children: React.ReactNode
  htmlType?: "button" | "submit" | "reset"
  onClick?: () => void
  type?: "link" | "text" | "default" | "primary" | "dashed" | "ghost"
  danger?: boolean
  loading?: boolean
  shape?: "default" | "circle" | "round"
  icon?: React.ReactNode
}

export const CButton = ({
  children,
  htmlType = "button",
  onClick,
  type,
  danger,
  loading,
  shape,
  icon,
}: Props) => {
  return (
    <Form.Item>
      <Button
        htmlType={htmlType}
        onClick={onClick}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
      >
        {children}
      </Button>
    </Form.Item>
  )
}
