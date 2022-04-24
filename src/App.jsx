import { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import styled from '@emotion/styled';
import ImagenCripto from './img/imagen-criptos.png'

//styles component CSS:
const Contenedor = styled.div `
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img `
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1 `
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background: #53b3f1;
    display: block;
    margin: 10px auto 0 auto;
  }
`
//fin del styles components

function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  
  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      
      //funcion de cotizar cripto
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});

        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        setCargando(false);
      }
      cotizarCripto();
    }
  }, [monedas])
  
  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt='Cripto Imagen' />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario 
          setMonedas = {setMonedas}
        />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado= {resultado} />}
      </div>
      <footer>
        <h2>© Copyright Diego Fedez.</h2>
      </footer>
    </Contenedor>
  )
}

export default App;
