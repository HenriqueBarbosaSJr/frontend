// Referências do DOM HTML

const btnConsultar = document.getElementById('btnConsultar');
const tbodyList = document.getElementById('tbodyList');



/// Lógica de programação 

const api = axios.create({
    baseURL:'http://localhost:3344/'
});

 btnConsultar.onclick = async ()=>{

  try {
        console.log('Consultando produtos.....');
        const resp = await api.get('produtos');
        const dados = resp.data;
        console.log(resp.data);
   

        let rows = '';
  
        for (let i = 0; i < dados.length; i++) {
            let tr = '<tr>' +
                          '<td>' + dados[i].cod + '</td>' +
                          '<td>' + dados[i].nome + '</td>' +
                          '<td>' + dados[i].descri + '</td>' +
                          '<td>' + dados[i].fabricante + '</td>' +
                          '<td>' + dados[i].datahora + '</td>' +
                      '</tr>';
            rows += tr;
        }

        console.log('>>> '+tbodyList);
        tbodyList.innerHTML = rows;
      

  } catch (error) {
    console.error('Erro ao consultar produtos:', error);
  }

};
