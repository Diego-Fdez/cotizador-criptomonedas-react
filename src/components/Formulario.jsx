import { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import Error from './Error';
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

//styles components css
const InputSubmit = styled.input `
  background: #53b3f1;
  border: none;
  padding: 10px;
  width: 100%;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius:5px;
  transition: all .3s ease;
  margin-Top: 30px;

  &:hover {
    background: transparent;
    border: 2px solid #53b3f1;
    color: #53b3f1;
    cursor: pointer;
  }
`
//fin del styles component

const Formulario = ({ setMonedas }) => {

  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas);
  const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      
      const arrayCriptos = resultado.Data.map(cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })
      setCriptos(arrayCriptos)
    }
    consultarAPI();
  }, [])

  //validacion de campos vacios
  const handleSubmit = e => {
    e.preventDefault();
    
    if([moneda, criptomoneda].includes('')) {
      setError(true)
      return
    }
    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })
  }

  return (

    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form 
        onSubmit={handleSubmit}
      >
        <SelectMonedas />
        <SelectCriptomoneda />
        <InputSubmit type="submit" value='Cotizar' />
      </form>
    </>
  )
}

export default Formulario;