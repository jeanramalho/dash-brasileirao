$(document).ready(() => {
  $('#btn-search').on('click', (e) => {
    let anoSelected = $('#ano').val()
    let pegaRodada = $('#rodada').val()  
    getReq(anoSelected, pegaRodada);     
    
  });
});


function getReq(ano, rodada) {
  let url = `https://api.databinteligencia.com.br/Brasileirao/jogos/${ano}`
  
  let rod = rodada


  $.ajax({
      headers: { "Accept": "application/json"},
      type: 'GET',
      url: url,
      crossDomain: true,
      beforeSend: function(xhr){
          xhr.withCredentials = true;
    },           
     
      success: function(data, textStatus, request){
        
        let rodadaAtual = data
        let output = ''
        console.log(rodadaAtual)
        

           $.each(rodadaAtual, (index, ) => {
             let home = rodadaAtual[index].equipe1
             let visitante = rodadaAtual[index].equipe2

             function placarHome () {
               if(rodadaAtual[index].placar1 == null){
                 return " "
               } else {
                 return rodadaAtual[index].placar1
               }
              }

            function placarVis () {
              if(rodadaAtual[index].placar2 == null) {
                return " "
              } else {
                return rodadaAtual[index].placar2
              }
            } 

            if(rodadaAtual[index].rodada == rodada){

              let url2 = `https://api.databinteligencia.com.br/Brasileirao/equipes/${ano}`

              $.ajax({
                headers: { "Accept": "application/json"},
                type: 'GET',
                url: url2,
                crossDomain: true,
                beforeSend: function(xhr){
                    xhr.withCredentials = true;
              },           
               
                success: function(data){

                  console.log(data)
                  output += `
                  
                  <div class="card mb-3" style="max-width: 540px;">

                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src=" ${data[home].escudo}" class="img-fluid rounded-start" alt="...">
                        <h1>X</h1>
                        <img src=" ${data[visitante].escudo}" class="img-fluid rounded-start" alt="...">                       
                        
                      </div>              
                      
                      <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title"> ${data[home].equipe} ${placarHome()} X  ${placarVis()} ${data[visitante].equipe} </h5>  
                        
                          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>

                      </div>
                    </div>
                  </div>




                  <div class="casa">
                  <img src="${data[home].escudo}">
                  <h3>${data[home].equipe}</h3>
                  <h2>${placarHome()}</h2>
                  </div>

                  <h1>X</h1> 

                  <div class="visi">
                  <h2>${placarVis()}</h2>
                  <img src="${data[visitante].escudo}">
                  <h3>${data[visitante].equipe}</h3>                  
                  </div>
                   
                  <div class="infoJogo">
                  
                  </div>
                  
                  
                  
                  `
                  $('#info').html(output)
                }                

              })

             }
             
           })
           
           
           
        
     
          

      }

      
  })
  

}
