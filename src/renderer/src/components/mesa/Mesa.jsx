import './mesa.scss';
import { useState } from "react";
import { Box, Pagination } from "@mui/material";
import { DataGrid, nlNL } from "@mui/x-data-grid";

const Mesa = ({
    loading,
    dataRows,
    dataColumns,
    onChangePaginate,
    dataLaravelPagination,
}) => {
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        onChangePaginate(value);
        setPage(value);
    };

    const CustomPagination = () => {
        if (!dataLaravelPagination || dataLaravelPagination["last_page"] === 1) {
            return <></>;
        } else {
            return (
                <Pagination
                    onChange={handleChange}
                    page={page}
                    count={dataLaravelPagination["last_page"]}
                    variant="outlined"
                    shape="rounded"
                />
            );
        }
    };

    return (
        <Box className='container-mesa' p="20px 0 0 0" >
            <DataGrid
                size={'small'}
                disableRowSelectionOnClick
                disableColumnMenu
                disableColumnReorder
                loading={loading || false}
                columns={dataColumns}
                rows={dataRows}
                slots={{
                    pagination: CustomPagination,
                }}
                localeText={nlNL.components.MuiDataGrid.defaultProps.esES}
            />
        </Box>
    );
};

export default Mesa;
