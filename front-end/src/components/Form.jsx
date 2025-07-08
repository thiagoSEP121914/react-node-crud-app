import { deepPurple } from "@mui/material/colors";
import "../style/Form.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ComboBox } from "./ComboBox";
import { useEffect, useState } from "react";
import insertCpfMask from "../utils/cpfMask";
import insertCepMask from "../utils/cepMask";
import findCep from "../services/viaCep";
import { createUser, updateUser } from "../services/userApi";
import { toast } from "react-toastify";
import useUser from "../utils/useUse";

function Form() {
  const { selectedUser } = useUser();

  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [biografia, setBiografia] = useState("");
  const [errors, setErrors] = useState({
    cpf: false,
    nome: false,
    idade: false,
    biografia: false,
    cep: false,
    estado: false,
    cidade: false,
    bairro: false,
    rua: false,
    numero: false,
  });

  const handleCpfChange = (event) => {
    const value = event.target.value;
    const masked = insertCpfMask(value);
    setCpf(masked);
  };

  const handleNomeChange = (event) => {
    const newValue = event.target.value;
    setNome(newValue);
  };

  const handleIdadeChange = (event) => {
    const newValue = event.target.value;
    setIdade(newValue);
  };

  const handleNumeroChange = (event) => {
    const newValue = event.target.value;
    setNumero(newValue);
  };

  const handlerCepChange = (event) => {
    const value = event.target.value;
    const masked = insertCepMask(value);
    setCep(masked);
  };

  const handleCepBlur = async () => {
    fillFormWithData();
  };

  const handlerEstadoChange = (event) => {
    const newValue = event.target.value;
    setEstado(newValue);
  };

  const handlerCidadeChange = (event) => {
    const newValue = event.target.value;
    setCidade(newValue);
  };

  const handlerBairroChange = (event) => {
    const newValue = event.target.value;
    setBairro(newValue);
  };

  const handlerRuaChange = (event) => {
    const newValue = event.target.value;
    setRua(newValue);
  };

  const handleBiografiaChange = (event) => {
    const newValue = event.target.value;
    setBiografia(newValue);
  };

  async function fillFormWithData() {
    try {
      const data = await findCep(cep);
      setEstado(data.estado || "");
      setCidade(data.localidade || "");
      setBairro(data.bairro || "");
      setRua(data.logradouro || "");
    } catch (error) {
      alert(error.message);
    }
  }

  const clearAllFields = () => {
    setCpf("");
    setNome("");
    setIdade("");
    setBiografia("");
    setCep("");
    setEstado("");
    setCidade("");
    setBairro("");
    setRua("");
    setNumero("");
  };

  const validateFields = () => {
    const newErrors = {
      cpf: !cpf,
      nome: !nome,
      idade: !idade,
      biografia: !biografia,
      cep: !cep,
      estado: !estado,
      cidade: !cidade,
      bairro: !bairro,
      rua: !rua,
      numero: !numero,
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((error) => error === true);

    if (hasError) {
      toast.error("Não pode haver campos nulos!");
      return false;
    }

    return true;
  };

  const instantiateUser = () => {
    return {
      cpf: cpf.replace(/\D/g, ""),
      nome,
      idade: Number(idade),
      caminhoImage: "",
      biografia,
      endereco: {
        cep: cep.replace(/\D/g, ""),
        estado,
        cidade,
        bairro,
        rua,
        numero,
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateFields()) {
        return;
      }

      const user = instantiateUser();
      
      if (selectedUser) {
        await updateUser(selectedUser.cpf, user);
        toast.success("Usuario Atualizado com sucesso!");
        clearAllFields();
        return;
      }

      await createUser(user);
      toast.success("Usuario cadastrado com sucesso!!");
      clearAllFields();
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      toast.error(`Erro: ${message}`);
      console.log(`Erro: ${message} + `);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setCpf(selectedUser.cpf || "");
      setNome(selectedUser.nome || "");
      setIdade(selectedUser.idade?.toString() || "");
      setBiografia(selectedUser.biografia || "");
      setCep(selectedUser.endereco?.cep || "");
      setEstado(selectedUser.endereco?.estado || "");
      setCidade(selectedUser.endereco?.cidade || "");
      setBairro(selectedUser.endereco?.bairro || "");
      setRua(selectedUser.endereco?.rua || "");
      setNumero(selectedUser.endereco?.numero || "");
      return;
    } 
    clearAllFields();
  }, [selectedUser]);

  return (
    <>
      <form className="container" onSubmit={handleSubmit}>
        <div className="userInfo">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: deepPurple[500],
            }}
          />
          <div className="v-container">
            <h2>Name</h2>
            <p>Email</p>
          </div>
        </div>

        <div className="grid">
          <TextField
            label="CPF"
            variant="outlined"
            value={cpf}
            error={errors.cpf}
            onChange={handleCpfChange}
          />
          <TextField
            id="outlined-basic"
            label="Nome "
            value={nome}
            onChange={handleNomeChange}
            error={errors.nome}
            variant="outlined"
          ></TextField>

          <TextField
            id="outlined-basic"
            label="Idade"
            value={idade}
            onChange={handleIdadeChange}
            error={errors.idade}
            variant="outlined"
          ></TextField>

          <TextField
            id="outlined-basic"
            label="Cep"
            variant="outlined"
            value={cep}
            onChange={handlerCepChange}
            error={errors.cep}
            onBlur={handleCepBlur}
          ></TextField>

          <ComboBox
            label={"Estado"}
            value={estado}
            onChange={handlerEstadoChange}
          />

          <TextField
            id="outlined-basic"
            label="Cidade"
            variant="outlined"
            error={errors.cidade}
            value={cidade}
            onChange={handlerCidadeChange}
          ></TextField>

          <TextField
            id="outlined-basic"
            label="Bairro"
            error={errors.bairro}
            variant="outlined"
            value={bairro}
            onChange={handlerBairroChange}
          ></TextField>

          <TextField
            id="outlined-basic"
            label="Rua"
            error={errors.rua}
            variant="outlined"
            value={rua}
            onChange={handlerRuaChange}
          ></TextField>

          <TextField
            id="outlined-basic"
            label="Número"
            value={numero}
            error={errors.numero}
            onChange={handleNumeroChange}
            variant="outlined"
          ></TextField>
        </div>

        <div className="biography">
          <h2>Escreva sua biogafia</h2>
          <TextField
            id="outlined-basic"
            label="exe: I was born 10 thousand years ago..."
            variant="outlined"
            multiline
            rows={5}
            fullWidth
            margin="normal"
            value={biografia}
            error={errors.biografia}
            onChange={handleBiografiaChange}
          ></TextField>
        </div>

        <div className="btn">
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: {
                xs: "80%",
                sm: "50%",
                md: "30%",
              },
              maxWidth: "400px",
            }}
          >
            Salvar mudanças
          </Button>
        </div>
      </form>
    </>
  );
}

export default Form;
