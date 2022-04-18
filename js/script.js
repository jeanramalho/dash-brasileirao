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
             let placarHome = rodadaAtual[index].placar1
             let placarVis = rodadaAtual[index].placar2
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
                  
                  <div class="casa">
                  <img src="${data[home].escudo}">
                  <h3>${data[home].equipe}</h3>
                  <h2>${placarHome}</h2>
                  </div>

                  <h1>X</h1> 

                  <div class="visi">
                  <h2>${placarVis}</h2>
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
