import './App.css';
import { useState } from 'react'
function App() {
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState({})
  const [erro, setErro] = useState(null)
  const consultarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      if (!response.ok) {
        throw new Error('CEP não encontrado')
      }
      const data = await response.json();
      setEndereco(data);
      setErro(null);

    } catch (error) {
      setEndereco({});
      setErro(error.message);
    }
  }
  return (
    <div className="App">
      <h1>Consulte seu Cep</h1>
      <input type="text" placeholder='Digite o CEP' value={cep} onChange={(e) => setCep(e.target.value)} />
      <button onClick={consultarCep}>Consultar</button>

      {erro && <p className='erro'>{erro}</p>}
      <div className='container'>
        <h2>Dados do Endereço</h2>
        <p>CEP: {endereco.cep}</p>
        <p>Logadouro: {endereco.logradouro}</p>
        <p>Bairro: {endereco.bairro}</p>
        <p>Cidade: {endereco.localidade}</p>
        <p>Estado: {endereco.uf}</p>
      </div>

    </div>
);
  
}

export default App;
