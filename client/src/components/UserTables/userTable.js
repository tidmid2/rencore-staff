import React, { useEffect, useState } from 'react'
import DataTable from '../../services/dataTable.js';
import { useAuth } from '../../hooks/useAuth';
import clsx from 'clsx';

const columns = [
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
    width: 400,
    editable: false
  },
  {
    field: "status",
    headerName: "",
    width: 150,
    editable: false,
    type: 'boolean',
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value > 0,
        positive: params.value < 1,
      });
    }
  }
];

const userTableStyles = {
    minHeight: '300px',
};



const UserTable = () => {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        fetch('/api/document/' + user.id)
            .then((response) => response.json())
            .then((json) => setUsers(json))
            .catch((error) => error)
    }, [user]);

    return (
        <DataTable
            rows={users}
            columns={columns}
            loading={!users}
            sx={userTableStyles}
            
        />
    );
};

export default UserTable