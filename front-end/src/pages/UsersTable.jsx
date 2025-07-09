import { DataGrid } from "@mui/x-data-grid";
import UsersTable from "../components/USerTable";
import { deleteUser, getAllUsers } from "../services/userApi";
import { useEffect, useState } from "react";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import { toast } from "react-toastify";
import { UserProvider } from "../context/userContext";
import useUser from "../hooks/useUse";



function Users() {
 
 const columns = [
  { field: "cpf", headerName: "cpf", width: 120 },

  {
    field: "nome",
    headerName: "Nome",
    width: 150,
    editable: false,
  },
  {
    field: "idade",
    headerName: "Idade",
    width: 150,
    editable: true,
  },
  {
    field: "biografia",
    headerName: "biografia",
    width: 110,
    editable: true,
  },

  {
    field: "cep",
    headerName: "Cep",
    width: 160,
    editable: true,
  },

  {
    field: "estado",
    headerName: "Estado",
    width: 160,
    editable: true,
  },

  {
    field: "cidade",
    headerName: "Cidade",
    width: 160,
    editable: true,
  },

  {
    field: "bairro",
    headerName: "Bairro",
    width: 160,
    editable: true,
  },

  {
    field: "rua",
    headerName: "Rua",
    width: 160,
    editable: true,
  },

  {
    field: "numero",
    headerName: "Numero",
    width: 160,
    editable: true,
  },

  {
    field: "Edit",
    headerName: "Editar",
    width: 150,
    renderCell: (params) => <EditButton to="/users/create" obj={params.row} />,
  },

  {
    field: "Delete",
    headerName: "Remover",
    width: 150,
    renderCell: (params) => (
      <DeleteButton onDelete={() => handlerDelete(params.row.cpf)} />
    ),
  },
];
 
  const handlerDelete = async (cpf) => {
    try {
      await deleteUser(cpf);
      toast.success("Usuario removido com sucesso!");
      setUsers((prevUser) => prevUser.filter((user) => user.cpf !== cpf));
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      toast.error(`Erro ao remover usuarioi ${message}`);
    }
  };

  const [users, setUsers] = useState([]);

  const { setSelectedUser } = useUser();

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        const processedUsers = response.data.map((user) => ({
          ...user,
          cep: user.endereco?.cep || "",
          estado: user.endereco?.estado || "",
          cidade: user.endereco?.cidade || "",
          bairro: user.endereco?.bairro || "",
          rua: user.endereco?.rua || "",
          numero: user.endereco?.numero || "",
        }));

        setUsers(processedUsers);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    toast.success(`Usuário selecionado: ${user.nome}`);
  };

  return (
    <UsersTable
      rows={users}
      columns={columns}
      getRowId={(row) => row.cpf}
      onRowClick={handleRowClick}
    />
  );
}

export default Users;
