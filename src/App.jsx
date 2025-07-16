import { use, useState } from 'react'

import './App.css'

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [erro, setErro] = useState('');

  const calcularImc = () => {
    setErro('');
    setImc(null);
    setClassificacao('');

    if (!altura || !peso || isNaN(altura) || isNaN(peso) || parseFloat(altura) <= 0 || parseFloat(peso) <= 0) {
      setErro('Por favor, insira valores numéricos válidos e positivos para altura e peso.');
      return; 
    }

    const alturaEmMetros = parseFloat(altura);
    const pesoEmKg = parseFloat(peso)

    const imcCalculado = pesoEmKg / (alturaEmMetros * alturaEmMetros);
    setImc(imcCalculado.toFixed(2));
  
    if (imcCalculado < 18.5) {
      setClassificacao('Abaixo do peso');
    } else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) {
      setClassificacao('Peso normal');
    } else if (imcCalculado >= 25.0 && imcCalculado <= 29.9) {
      setClassificacao('Sobrepeso');
    } else if (imcCalculado >= 30.0 && imcCalculado <= 34.9) {
      setClassificacao('Obesidade Grau I');
    } else if (imcCalculado >= 35.0 && imcCalculado <= 39.9) {
      setClassificacao('Obesidade Grau II');
    } else {
      setClassificacao('Obesidade Grau III');
    }
  };

  return (
    <div className='calculadora-imc-container'>
      <h1>Calculadora de IMC</h1>
      <div className='input-group'>
        <label htmlFor="altura">Altura (metros):</label>
        <input type="number" id='altura' value={altura} onChange={(e) => setAltura(e.target.value)} placeholder='Ex: 1.75' step="0.01" />
      </div>
      <div className='input-group'>
        <label htmlFor="peso">Peso (kg):</label>
        <input type="number" id='peso' value={peso} onChange={(e) => setPeso(e.target.value)} placeholder='Ex: 70' step="0.01" />
      </div>
      <button onClick={calcularImc}>Calcular IMC</button>

      {erro && <p className='mensagem-erro'>{erro}</p>}

      {imc && !erro && (
        <div className='resultado'>
          <h2>Seu IMC: {imc}</h2>
          <p>Classificação: <strong>{classificacao}</strong></p>
          <p className='infos'>
            Tabela de classificação do IMC (OMS): <br/>
            Menor que 18.5: Abaixo do peso <br />
            18.5 a 24.9: Peso normal <br />
            25.0 a 29.9: Sobrepeso <br />
            30.0 a 34.9: Obesidade Grau I <br />
            35.0 a 39.9: Obesidade Grau II <br />
            Maior ou igual a 40.0: Obsidade Grau III
          </p>
        </div>
      )}
    </div>
  )
}

export default App
