import styled from 'styled-components'

const Planet = styled.strong`
  color: ${({ theme }) => theme.colors.primary}; 
`;//a cima é uma forma mto pratica de gerenciar temas com o styled componentes, dissecando o theme que passamos pra esse componente pelo app.js

export default function Home(props) {
  
  React.useEffect(() => {
    if (props.err) {
      window.alert("Tivemos um erro enquanto Buscavamos seu planeta");
    }
  }, [props]);

  return(
    <div>
      <h1> Está buscando pelo 4° Planeta de Star Wars? </h1>
      <h2>Pois ele é: <Planet> {props.Data.name} </Planet> </h2>
    </div> 
  )
}

export async function getStaticProps() { //aqui o staticprops do next vai rodar separado da minha default funciton, por isso claro tudo q ta fora eu preciso passar pra dentro com props
  try {
    const apiData = await fetch(`https://swapi.dev/api/planets/4`) //imporante lembrar que o fetch está terminando no apiData.json, o const com await age como promisse, assim como o .then, assim tbm pdoeriamos trabalhar erros e assim por diante
    const processedData = await apiData.json();
  
    return {
      props: {
        Data: processedData
      }, 
    }
    
  } catch (error) {
    return {
      props: {
        err: error
      }
    }
  }
}
