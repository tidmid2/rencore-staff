import React, { useEffect, useState } from 'react'
import DataTable from '../../services/dataTable.js';

const columns = [
  {
    field: "user_id",
    headerName: "Сотрудник",
    width: 250,
    editable: false,
  },
  {
    field: "dt",
    headerName: "Дата",
    width: 250,
    editable: false,
    type: 'date',
    valueGetter: (params) => new Date(params.row.dt),
  },
  {
    field: "time",
    headerName: "Время",
    width: 150,
    editable: false,
  },
  {
    field: "comment",
    headerName: "Комментарий",
    width: 350,
    editable: false
  },
  {
    field: "id_op",
    headerName: "Статус",
    width: 125,
    editable: false,
  }
];

const userTableStyles = {
    minHeight: '500px',
};



const AdminTable = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('/api/admin/all')
            .then((response) => response.json())
            .then((json) => setUsers(json))
            .catch((error) => error)
    }, []);

    return (
        <DataTable
            rows={users}
            columns={columns}
            loading={!users}
            sx={userTableStyles}
            sortingMode="server"
        />
    );
};

export default AdminTable