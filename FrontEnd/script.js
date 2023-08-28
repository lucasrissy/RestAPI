const container = document.querySelector(".container");



window.onload = (event) =>{
  inicialize();
}


function inicialize (){
  fetch('http://localhost:8082/login', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json' 
    },
  })
  .then(response => {
    if(!response.ok){
        throw new Error ("Erro na solicitacao")
    }
    return response.json()
  })
  .then(data => { 
    populate(data)
  })
  .catch(error => {
    console.log(error)
  })
}

function populate(data){
  
  const table = document.querySelector("table")
  table.innerHTML = `<tr>
                        <th  scope="row">Name</th>
                        <th  scope="row">Email</th>
                        <th  scope="row">Phone</th>
                        </tr>`

  data.forEach(element => {
    const row = document.createElement("tr");
    row.innerHTML = `<td  scope="col">${element.fullName}</td>
                      <td  scope="col">${element.email}</td>
                      <td  scope="col">${element.phone}</td>`
                      table.appendChild(row);
  });

  
}

const createNewClient = () =>{
  
  const data = {
    fullName : document.querySelector('#name').value,
    email : document.querySelector('#email').value,
    phone : document.querySelector('#phone').value
  }

  fetch('http://localhost:8082/login/register', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data) // transformar o json para string
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro na solicitação")
    }
  
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else {
     
      return response.text(); 
    }
  })
  .then(data => {
    if (typeof data === 'object') {
      console.log(data);
    } else {
      
      console.log("Resposta do servidor:", data);
    }
  })
  .catch(error => console.log(error))

  document.querySelector('.container').style.display = "flex";
  document.querySelector('.createClient').style.display = "none";
  inicialize();
}

const showCreateClient = () => {
  document.querySelector('.container').style.display = "none";
  document.querySelector('.createClient').style.display = "flex";
}




