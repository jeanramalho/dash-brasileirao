$(document).ready(() => {
    $('#btn-search').on('click', (e) => {
      let anoSelected = $('#ano').val()
       getReq(anoSelected);        
    });
  });
  
  function getReq(ano) {
    let url = `https://api.databinteligencia.com.br/Brasileirao/jogos/${ano}`
    let url2 = `https://api.databinteligencia.com.br/Brasileirao/equipes/${ano}`


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
            let jogos = data[1].estadio
            $('#info').html(`<h1>${jogos}</h1>`);
        }
    })

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
            let time = data.ACG.equipe
            $('#info2').html(`<h1>${time}</h1>`);
        }
    })
  }