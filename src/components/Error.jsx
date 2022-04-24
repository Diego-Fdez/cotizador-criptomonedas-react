import styled from '@emotion/styled';

//styles components
const Texto = styled.div`
  background: linear-gradient(#b7322c, transparent);
  color: #fff;
  padding: 15px;
  font-size: 22px;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
`

const Error = ({children}) => {
  return (
    <Texto>
      {children}
    </Texto>
  )
}

export default Error