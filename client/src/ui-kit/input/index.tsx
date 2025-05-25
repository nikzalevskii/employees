import { Form, Input } from "antd"

type Props = {
  name: string
  placeholder: string
  type?: string
  autoComplete?: string
}

export const CInput = ({
  name,
  placeholder,
  type = "text",
  autoComplete,
}: Props) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "Обязательное поле" }]}
    >
      <Input
        placeholder={placeholder}
        type={type}
        size="large"
        autoComplete={autoComplete}
      />
    </Form.Item>
  )
}
