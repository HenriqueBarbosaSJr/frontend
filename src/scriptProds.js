// Referências do DOM HTML

const btnConsultar = document.getElementById('btnConsultar');
const tbodyList = document.getElementById('tbodyList');
const containerModal = document.getElementById('containerModal');
const FecharModal = document.getElementById('FecharModal');
const btnIncluir = document.getElementById('btnIncluir');
const CadModal = document.getElementById('CadModal');

const inpNome = document.getElementById('inpNome');
const inpDesc = document.getElementById('inpDesc');
const inpQtda = document.getElementById('inpQtda');
const inpFab = document.getElementById('inpFab');
const inpPreco = document.getElementById('inpPreco');
const inpCusto = document.getElementById('inpCusto');


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

async function create(){
  try {
    const nome = inpNome.value;
    const desc = inpDesc.value;
    const fab = inpFab.value;
    const qtda = inpQtda.value;
    const preco = inpPreco.value;
    const custo = inpCusto.value;

    data = {
      'nome':nome,
      'descri':desc,
      'fabricante':fab,
      'qtda':qtda,
      'preco':preco,
      'custo':custo
    }
    
    const response = await api.post('produtos', data);
    
  } catch (error) {
      console.log(`Error ao cadastrar produto. ${error}`);
      

      
  }
  
}




btnIncluir.onclick = ()=>{
  containerModal.style.display = 'block';
};


FecharModal.onclick =()=>{
  containerModal.style.display = 'none'; 
};


CadModal.onclick = ()=>{
  create();
};