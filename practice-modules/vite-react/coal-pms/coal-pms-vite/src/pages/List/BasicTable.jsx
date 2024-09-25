import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import { getAllUsersService } from '../../api/service/tableService';

  const BasicTable = () => {

    const [tableData, setTableData]= useState([]);

    useEffect(()=>{
        getAllUsersService().then(res=>{
            console.log(res.data);
            
            setTableData(res.data)
        })
    },[])

    //should be memoized or stable
    const columns = useMemo(() => 
      [
        {
          accessorKey: 'first_name', //access nested data with dot notation
          header: 'First Name',
          size: 150,
        },
        {
          accessorKey: 'last_name',
          header: 'Last Name',
          size: 150,
        },
        {
          accessorKey: 'email', //normal accessorKey
          header: 'Email',
          size: 200,
        },
      ],
    []);

    
  
    const tableConfig = useMaterialReactTable({
      columns,
      data: tableData, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });
  
    return (
        <Fragment>
            <MaterialReactTable table={tableConfig} />
        </Fragment>
);
  };
  
  export default BasicTable;