export const customerTableStaticColumn = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: false,
      sort: true,
      customBodyRenderLite: (dataIndex) => dataIndex + 1,
    },
  },
  {
    name: "name",
    label: "Empresa",
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: "description",
    label: "Descripcion",
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: "status",
    label: "Estado",
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
];
