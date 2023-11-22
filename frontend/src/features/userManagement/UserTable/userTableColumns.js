const userTableStaticColumns = [
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
];

export default userTableStaticColumns;
