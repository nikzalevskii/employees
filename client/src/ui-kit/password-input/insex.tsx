import { Form, Input } from "antd"
import type { NamePath } from "antd/es/form/interface"

type Props = {
  name: string
  placeholder: string
  dependencies?: NamePath[]
}

export const CPasswordInput = ({ name, placeholder, dependencies }: Props) => {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: "Обязательное поле",
        },
        ({ getFieldValue }) => ({
          validator(_, value: string) {
            if (!value) {
              return Promise.resolve()
            }
            if (name === "confirmPassword") {
              if (!value || getFieldValue(name) === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error("Пароли не совпадают"))
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Пароль должен быть не менее 6 символов"),
                )
              }
              return Promise.resolve()
            }
          },
        }),
      ]}
      hasFeedback
      dependencies={dependencies}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  )
}
