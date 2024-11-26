import React from 'react'
import { Button, Modal } from 'antd'
import { HeaderPage } from '../../../components/headerPage/HeaderPage'
import { InboxOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Upload } from 'antd';
import { ExcelReadFunction } from '../../../helper/readExcel';
import { generarEXCELDATA } from '../../../helper/generateExcel';
import { planAccionComunalService } from '../../../services/planAccionComunalService';
import { DownloadOutlined } from '@ant-design/icons';
import { messagesInfo } from '../../../components/messages/Messages';

export const PlanAccionComunalForm = () => {
    const { Dragger } = Upload;
    const { confirm } = Modal;
    const props = {
        name: 'file',
        FileList: [],
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        beforeUpload: (file) => {
            messagesInfo.loading('Procesando excel', 1000, 1);
            ExcelReadFunction(file).then((resp) => {
                if (!(resp[0]['nameExcel'] === 'Acción comunal')) {
                    messagesInfo.error('Al parecer el archivo que cargaste no es el de acción comunal', 2, 1);
                    return;
                }
                if (resp[0]['data'] - length === 0) {
                    messagesInfo.error('Excel vacío', 2, 1);
                    return;
                }
                messagesInfo.success('Se ha validado correctamente el excel', 2, 1);
                confirm({
                    title: 'Estás seguro de cargar los datos de este excel?',
                    icon: <ExclamationCircleFilled />,
                    content: `Se van a cargar un total de ${resp[0]['data'].length} registros`,
                    onOk() {
                        messagesInfo.loading('Cargando excel', 1000, 1);
                        planAccionComunalService.store({ data: resp[0]['data'] }).then((response) => {
                            if (response['data']['res']) {
                                messagesInfo.success(response['data']['message'], 2, 1);
                            } else {
                                messagesInfo.error(response['data']['message'], 2, 1);
                            }
                        }).catch((error) => {
                            messagesInfo.error('Al parecer hubo un error al cargar el archivo por favor intentalo más tarde', 2, 1);
                            return;
                        });
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
            }).catch((error) => {
                messagesInfo.error('Al parecer hubo un error al cargar el archivo por favor intentalo más tarde', 2, 1);
            });
            return false;
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const domloadExcel = async () => {
        let header = [[
            'LÍNEAS ESTRATÉGICAS',
            'META RESULTADO',
            'INDICADOR DE RESULTADO',
            'INDICADOR DE IMPACTO',
            'OBJETIVO DEL INDICADOR; TIPO DE ACUMULACIÓN',
            'UNIDAD DE MEDIDA',
            'LINEA BASE',
            'META DEL CUATRIENIO 1',
            'META DEL CUATRIENIO 2',
            'META DEL CUATRIENIO 3',
            'META VIGENCIA PP',
            'Coordinador MR',
            'META PRODUCTO',
            'PRODUCTO CATÁLOGO DNP',
            'INDICADOR PRODUCTO',
            'OBJETIVO DEL INDICADOR; TIPO DE ACUMULACIÓN',
            'UNIDAD DE MEDIDA',
            'LÍNEA BASE',
            'META CUATRIENIO 1',
            'META CUATRIENIO 2',
            'META CUATRIENIO 3',
            'META VIGENCIA PP',
            'RESPONSABLE'
        ]
        ];
        generarEXCELDATA('Plan de accion e indicador Politica Publica de Acción Comunal', 'Acción comunal', header, []);
    }

    return (
        <section className='container-section'>
            <HeaderPage title={'Carga de archivo plan de acción comunal'} />
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <Button type="primary" onClick={domloadExcel} icon={<DownloadOutlined />}>
                        Descargar plantilla plan de acción comunal
                    </Button>
                </div>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Haz clic o arrastra un archivo a esta área para subirlo</p>
                    <p className="ant-upload-hint">
                        Soporte para una carga individual. Estrictamente prohibido subir datos de la empresa u otros archivos no permitidos.
                    </p>
                </Dragger>
            </div>
        </section>
    )
}