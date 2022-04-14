$(document).ready(() => {
    $('#btn-search').on('click', (e) => {
       getRod();
        
    });
  });
  
  function getRod() {
    let url = `https://api.databinteligencia.com.br/Brasileirao/jogos/2022`
    let url2 = `https://api.databinteligencia.com.br/Brasileirao/equipes/2022`
    $.ajax({
        headers: { "Accept": "application/json"},
        type: 'GET',
        url: url,
        crossDomain: true,
        beforeSend: function(xhr){
            xhr.withCredentials = true;
      },
        
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