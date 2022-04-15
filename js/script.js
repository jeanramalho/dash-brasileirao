$(document).ready(() => {
    $('#btn-search').on('click', (e) => {
      let anoSelected = $('#ano').val()
      let pegaRodada = $('#rodada').val()  
      getReq(anoSelected, pegaRodada);     
      
    });
  });
  
  function getReq(ano, rodada) {
    let url = `https://api.databinteligencia.com.br/Brasileirao/jogos/${ano}`
    let url2 = `https://api.databinteligencia.com.br/Brasileirao/equipes/${ano}`
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
          console.log(data)
          let i = 1
          while(i <= data.length){
            i++

            if(parseInt(data[i].rodada) == rod){
              console.log(data[i])
            }
          }
          



            $.ajax({
              headers: { "Accept": "application/json"},
              type: 'GET',
              url: url2,
              crossDomain: true,
              beforeSend: function(xhr){
                  xhr.withCredentials = true;
            },
              
            success: function(data, textStatus, request){
                  console.log(data)
                  let time = data.AMG.equipe
                  $('#info2').html(`<h1>${time}</h1>`);
              }
          })

        }

        
    })
    

  }