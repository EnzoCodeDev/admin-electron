import './userClientList.scss';
import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { ButtonToolbar, IconButton, Tag, TagGroup } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import VisibleIcon from '@rsuite/icons/Visible';
import { messagesInfo } from "../../../components/messages/Messages";
import { userServices } from '../../../services/userServices';
import { HeaderPage } from "../../../components/headerPage/HeaderPage";
export const UserClientList = () => {
    //Navegador
    let navigate = useNavigate();
    //Estado de los productos
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 1,
    });
    //Peticion para traer la data
    const fetchData = (params = {}) => {
        setLoading(true);
        userServices.paginate(params['pagination']['current']).then((resp) => {
            setData(resp["data"]["data"]["data"]);
            setPagination({
                ...params.pagination,
                total: resp["data"]["data"]["total"],
                pageSize: resp["data"]["data"]["data"].length,
            });
            setLoading(false);
        }).catch(function (resp) {
            console.log(resp);
            messagesInfo.error('Hubo un error al obtener los usuarios');
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData({
            pagination,
        });
        // do some
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTableChange = (newPagination, filters, sorter) => {
        fetchData({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination: newPagination,
            ...filters,
        });
    };
    const columns = [
        {
            title: "Nombre",
            dataIndex: "first_name",
            render: (texto, registro, index) => (
                <div>
                    {`${registro['first_name']} ${registro['first_surname']}`}
                </div>
            ),
        },
        {
            title: "Identificación",
            dataIndex: "identification",
        },
        {
            title: "Email",
            dataIndex: "email",
        },

        {
            align: "center",
            title: "Estado",
            dataIndex: "state",
            render: (texto, registro, index) => (
                <TagGroup>
                    {texto == 'activo' ? (
                        <Tag color="green">Activo</Tag>
                    ) : (
                        <Tag color="red">Inactivo</Tag>
                    )}
                </TagGroup>
            ),
        },
        {
            align: "center",
            title: "Acciones",
            dataIndex: "uuid",
            render: (texto, registro, index) => (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly'
                }}>
                    <ButtonToolbar>
                        <IconButton icon={<VisibleIcon />} placement="right" onClick={() => navigate(`form/${texto}`)}></IconButton>
                    </ButtonToolbar>
                </div>
            ),
        },
    ];

    return (
        <Spin tip="Por favor espera..." spinning={loading}>
            <section className='container-section'>
                <HeaderPage title={'Clientes'} />
                <ButtonToolbar>
                    <IconButton icon={<PlusIcon />} placement="right" onClick={() => navigate('form')}>Crear cliente</IconButton>
                </ButtonToolbar>
                <div style={{ marginTop: '10px' }}>
                    <Table
                        rowKey="uuid"
                        scroll={{ y: 350 }}
                        size="small"
                        bordered
                        dataSource={data}
                        columns={columns}
                        pagination={pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </div>
            </section>
        </Spin>
    );
};

