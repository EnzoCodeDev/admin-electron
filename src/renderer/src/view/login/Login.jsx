import "./login.scss";
import React, { useState } from "react";
import { authServices } from '../../services/authServices';
import {
  UserOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, Spin } from "antd";
import { messagesInfo } from "../../components/messages/Messages";
import userStore from "../../store/userStore";
import axios from "axios";

export const Login = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const userTienda = userStore((state) => state);
  const [loading, setloading] = useState(false);

  const onFinish = (values) => {
    setloading(true);
    authServices.loginByEmail(values)
      .then((resp) => {
        if (resp["data"]["res"]) {
          userTienda.setState({
            login: true,
            user: resp["data"]['user'],
            token: resp["data"]['token'],
            token_type: resp["data"]['type'],
          });
          axios.defaults.headers["Authorization"] = `Bearer ${resp["data"]['token']}`;
          localStorage.setItem('token_bearer', resp["data"]['token']);
          navigate("/home");
          messagesInfo.success('Sesión iniciada correctamente');
          setloading(false);
        } else {
          messagesInfo.error('Credenciales incorrectas');
          setloading(false);
        }
      })
      .catch((error) => {
        messagesInfo.error('Credenciales incorrectas');
        setloading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return (
    <Spin spinning={loading} tip="Iniciando sesión..." >
      <div className="LoginScreen">
        <div className="form_login">
          <h2>Bienvenido</h2>
          <h3 style={{ fontSize: '13px', color: 'green' }}>GESTIÓN DE EVENTOS</h3>
          <Form
            className="form"
            form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            preserve={false}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Correo electronico"
                  name="email"
                  rules={[
                    {
                      pattern: emailPattern,
                      message: 'Por favor ingresa un email válido!',
                    },
                  ]}
                >
                  <Input
                    className="input"
                    size="large"
                    type="email"
                    placeholder="Correo electronico"
                    prefix={
                      <UserOutlined />
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Contraseña"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Falta la contraseña!",
                    },
                    {
                      whitespace: true,
                      message: "Falta la contraseña!",
                    },
                  ]}
                >
                  <Input.Password
                    className="input"
                    size="large"
                    placeholder="Contraseña"
                    prefix={
                      <EllipsisOutlined />
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <div className="button_content">
                <button type="submit" className="button">
                  <span className="botom_init_seccion">Iniciar sesión</span>
                </button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};