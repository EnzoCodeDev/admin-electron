import './formUser.scss';
import { Col, Form, Input, Spin, Select, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive'
import { useNavigate, useParams } from "react-router-dom";
import { HeaderPage } from '../../../components/headerPage/HeaderPage';
import { userServices } from '../../../services/userServices';
import { messagesInfo } from '../../../components/messages/Messages';
export const FormUser = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { uuid } = useParams();
    const { Option } = Select;

    //Resturar valores si es para editar
    useEffect(() => {
        if (uuid) {
            getEdit();
        };
    }, [uuid]);

    const getEdit = () => {
        setLoading(true);
        userServices.getByUuid(uuid).then((resp) => {
            let user = resp['data']['data'];
            form.setFieldsValue({
                first_name: user['first_name'],
                middle_name: user['middle_name'],
                first_surname: user['first_surname'],
                second_surname: user['second_surname'],
                email: user['email'],
                identification: user['identification'],
                state: user['state'],
            });
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            navigate('/userClient');
            messagesInfo.error('Ha sucedido un error al obtener este cliente');
        });
    };

    const onFinish = (values) => {
        setLoading(true);
        if (uuid) {
            userServices.update(values, uuid).then((resp) => {
                if (resp['data']['res']) {
                    messagesInfo.success(resp['data']['msg']);
                    navigate(`/userClient/form/${uuid}`);
                } else {
                    messagesInfo.error(resp['data']['msg']);
                };
                setLoading(false);
            }).catch((error) => {
                messagesInfo.error('Ha sucedido un error al actualizar el cliente');
                setLoading(false);
            });
        } else {
            userServices.store(values).then((resp) => {
                if (resp['data']['res']) {
                    messagesInfo.success(resp['data']['msg']);
                    navigate(resp['data']['data']['uuid']);
                } else {
                    messagesInfo.error(resp['data']['msg']);
                };
                setLoading(false);
            }).catch((error) => {
                messagesInfo.error('Ha sucedido un error al guardar el cliente');
                setLoading(false);
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        messagesInfo.error('Debes deligenciar correctamente el formulario');
    };

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return (
        <Spin tip="Por favor espera..." spinning={loading}>
            <section className='container-section'>
                <HeaderPage title={uuid ? 'Actualizar cliente' : 'Crear cliente'} onClickBack={() => navigate('/userClient')} />
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    labelCol={{ span: 14 }}
                    wrapperCol={{ span: 23 }}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    preserve={false}
                >
                    <Row>
                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label="Primer nombre"
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Falta el primer nombre!",
                                    },
                                    {
                                        whitespace: true,
                                        message: "Falta el primer nombre!",
                                    },
                                    {
                                        min: 3,
                                        message: "El primer nombre es muy corto!",
                                    },
                                    {
                                        max: 200,
                                        message: "El primer nombre es muy largo!",
                                    },
                                ]}
                            >
                                <Input placeholder='Ingresar primer nombre' allowClear={true} />
                            </Form.Item>
                        </Col>
                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label="Segundo nombre"
                                name="middle_name"
                            >
                                <Input placeholder='Ingresar segundo nombre' allowClear={true} />
                            </Form.Item>
                        </Col>
                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label="Primer apellido"
                                name="first_surname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Falta el primer apellido!",
                                    },
                                    {
                                        whitespace: true,
                                        message: "Falta el primer apellido!",
                                    },
                                    {
                                        min: 3,
                                        message: "El primer apellido es muy corto!",
                                    },
                                    {
                                        max: 200,
                                        message: "El primer apellido es muy largo!",
                                    },
                                ]}
                            >
                                <Input placeholder='Ingresar primer apellido' allowClear={true} />
                            </Form.Item>
                        </Col>
                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label="Segundo apellido"
                                name="second_surname"
                            >
                                <Input placeholder='Ingresar segundo apellido' allowClear={true} />
                            </Form.Item>
                        </Col>
                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label="Identificación"
                                name="identification"
                                rules={[
                                    {
                                        required: true,
                                        message: "Falta la identificación!",
                                    },
                                    {
                                        whitespace: true,
                                        message: "Falta la identificación!",
                                    },
                                    {
                                        min: 3,
                                        message: "La identificación es muy corta!",
                                    },
                                    {
                                        max: 500,
                                        message: "La identificación es muy larga!",
                                    },
                                ]}
                            >
                                <Input placeholder='Ingresar identificación' allowClear={true} />
                            </Form.Item>
                        </Col>
                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        pattern: emailPattern,
                                        message: 'Por favor ingresa un email válido!',
                                    },
                                ]}
                            >
                                <Input placeholder='Ingresar email' allowClear={true} />
                            </Form.Item>
                        </Col>
                        {!uuid && (
                            <Col span={isMobile ? 24 : 12}>
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
                                        {
                                            min: 8,
                                            message: "La contraseña debe tener al menos 8 caracteres!",
                                        },
                                        {
                                            max: 200,
                                            message: "La contraseña es muy larga!",
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder='Ingresa contraseña' allowClear={true} />
                                </Form.Item>
                            </Col>
                        )}
                        <Col span={isMobile ? 24 : 12}>
                            <Form.Item
                                label="Estado"
                                name="state"
                                initialValue="activo"
                                rules={[
                                    {
                                        required: true,
                                        message: "Falta seleccionar el estado!",
                                    },
                                ]}
                            >
                                <Select placeholder='Seleccionar estado' >
                                    <Option value="activo" >Activo</Option>
                                    <Option value="inactivo">Inactivo</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <button type="submit" className="botom-flotante">
                            {uuid ? "Actualizar cliente" : "Crear cliente"}
                        </button>
                    </Form.Item>
                </Form>
            </section >
        </Spin>
    );
};
