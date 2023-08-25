const container = document.querySelector(".container");


const data = {
    fullName : "Maria Julia",
    email: "mariajulia@gmail.com",
    password: "mariajulia123",
    phone: "123456789"
}


function login(){

    const name = document.querySelector("#name").value;
    const password = document.querySelector("#password").value;

    

}
  fetch('http://localhost:8081/login/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' // aqui eu informo o tipo do meu conteudo que sera enviado
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if(!response.ok){
        throw new Error ("Erro na solicitacao")
    }
    return response.json()
  })
  .then(data => { 
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })