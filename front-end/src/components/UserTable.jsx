import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function UsersTable(props) {
 

  const handleRowClick = (params) => {
    props.onRowClick(params.row); 
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        getRowId={props.getRowId}
        
        disableMultipleRowSelection
        onRowClick={handleRowClick}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      />
    </Box>
  );
}

export default UsersTable;
