import MUIDataTable from "mui-datatables";

const UserTable = ({ users, onEdit, onDelete }) => {
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "roleName",
      label: "Rol",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "createdAt",
      label: "fecha de creacion",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "updatedAt",
      label: "fecha de actualizacion",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              <button onClick={() => onEdit(users[dataIndex])}>Edit</button>
              <button onClick={() => onDelete(users[dataIndex].id)}>
                Delete
              </button>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "standard",
    selectableRows: "none",
    viewColumns: "false",
    textLabels: {
      body: {
        noMatch: "Lo siento, no se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente página",
        previous: "Página anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver Columnas",
        filterTable: "Filtrar Tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar Columnas",
        titleAria: "Mostrar/Ocultar Columnas de la Tabla",
      },
      selectedRows: {
        text: "fila(s) seleccionadas",
        delete: "Eliminar",
        deleteAria: "Eliminar Filas Seleccionadas",
      },
    },
  };

  return (
    <MUIDataTable
      title={"Lista de usuarios"}
      data={users}
      columns={columns}
      options={options}
    />
  );
};

export default UserTable;
