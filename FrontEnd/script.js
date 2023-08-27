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





