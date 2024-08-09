// Referências do DOM HTML

const btnConsultar = document.getElementById('btnConsultar');
const tbodyList = document.getElementById('tbodyList');
const containerModal = document.getElementById('containerModal');
const FecharModal = document.getElementById('FecharModal');
const btnIncluir = document.getElementById('btnIncluir');



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
                          '<td id="controler">'+
                                '<img src="../assets/edit.png" class="icons">'  + 
                                '<img src="../assets/trash.png" class="icons">' +
                                '<img src="../assets/edit2.png" class="icons">' + 
                          '</td>' +
                      '</tr>';
            rows += tr;
        }

        
        tbodyList.innerHTML = rows;
      

  } catch (error) {
    console.error('Erro ao consultar produtos:', error);
  }
 }



btnIncluir.onclick = ()=>{
  containerModal.style.display = 'block';
};


FecharModal.onclick =()=>{
  containerModal.style.display = 'none'; 
}