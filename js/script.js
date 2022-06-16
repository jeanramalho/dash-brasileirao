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
        headers: { "Accept": "application/json" },
        type: 'GET',
        url: url,
        crossDomain: true,
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
        },

        success: function(data, textStatus, request) {

            let rodadaAtual = data
            let output = ''
            console.log(rodadaAtual)


            $.each(rodadaAtual, (index, ) => {
                let home = rodadaAtual[index].equipe1
                let visitante = rodadaAtual[index].equipe2
                let estadio = rodadaAtual[index].estadio
                let horario = rodadaAtual[index].horario
                let dia = rodadaAtual[index].data
                    // let data_brasileira = dataEr.split('-').reverse().join('/')

                function placarHome() {
                    if (rodadaAtual[index].placar1 == null) {
                        return " "
                    } else {
                        return rodadaAtual[index].placar1
                    }
                }

                function placarVis() {
                    if (rodadaAtual[index].placar2 == null) {
                        return " "
                    } else {
                        return rodadaAtual[index].placar2
                    }
                }

                if (rodadaAtual[index].rodada == rodada) {

                    let url2 = `https://api.databinteligencia.com.br/Brasileirao/equipes/${ano}`

                    $.ajax({
                        headers: { "Accept": "application/json" },
                        type: 'GET',
                        url: url2,
                        crossDomain: true,
                        beforeSend: function(xhr) {
                            xhr.withCredentials = true;
                        },

                        success: function(data) {

                            console.log(data)
                            output += `
                  
                  <div class="card">
                    <div>
                    <h6 class="estadio">${estadio}</h6>
                    <h7 class="horario">${horario}</h7>
                    <h8 class="data">${dia.split('-').reverse().join('/')}</h8>
                            
                    </div>
                      

                      <div class="time-home">
                        <img src=" ${data[home].escudo}" class="escudo" alt="...">
                        <h5 class="card-title"> ${data[home].equipe} </h5>
                      </div>
                
                        <h1 class="placar">${placarHome()} </h1>  <h2 class="versus">X</h2> <h1 class="placar">${placarVis()}</h1>

                      <div class="time-vis">
                        <img src=" ${data[visitante].escudo}" class="escudo" alt="..."> 
                        <h5 class="card-title"> ${data[visitante].equipe} </h5> 
                      </div>
                                              
    
        
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