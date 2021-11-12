import React from 'react';
import Table from '@material-ui/core/Table';

const useTable = (records, headCells) => {
  const TblContainer = (props) => <Table>{props.children}</Table>;

  return TblContainer;
};

export default useTable;
