// Referências do DOM HTML

const btnConsultar = document.getElementById('btnConsultar');
const tbodyList = document.getElementById('tbodyList');
const containerModal = document.getElementById('containerModal');
const FecharModal = document.getElementById('FecharModal');
const btnIncluir = document.getElementById('btnIncluir');
const CadModal = document.getElementById('CadModal');
const delModal = document.getElementById('delModal');
const altModal = document.getElementById('altModal');

const inpCod = document.getElementById('inpCod');
const inpNome = document.getElementById('inpNome');
const inpDesc = document.getElementById('inpDesc');
const inpQtda = document.getElementById('inpQtda');
const inpFab = document.getElementById('inpFab');
const inpPreco = document.getElementById('inpPreco');
const inpCusto = document.getElementById('inpCusto');
const inpData = document.getElementById('inpData');


/// Lógica de programação

let codDelete;
let codAltera;


const api = axios.create({
    baseURL:'http://localhost:3344/'
});


function limparCampos(){
  inpCod.value = '';
  inpNome.value = '';
  inpDesc.value = '';
  inpFab.value = '';
  inpCusto.value = '';
  inpPreco.value = '';
  inpQtda.value = '';
  inpData.value = '';

}



async function consultar(){

  try {
    console.log('Consultando produtos.....');
    const resp = await api.get('produtos');
    const dados = resp.data;
    console.log(resp.data);


    let rows = '';

    for (let i = 0; i < dados.length; i++) {
      let dataFormatada = new Date(dados[i].data)
          .toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        let tr = '<tr>' +
                      '<td>' + dados[i].codpro + '</td>' +
                      '<td>' + dados[i].nome + '</td>' +
                      '<td>' + dados[i].descri + '</td>' +
                      '<td>' + dados[i].fabricante + '</td>' +
                      '<td>' + dados[i].custo + '</td>' +
                      '<td>' + dados[i].preco + '</td>' +
                      '<td>' + dados[i].qtda + '</td>' +
                      '<td>' + dataFormatada + '</td>' +       
                      '<td id="controler">'+
                            '<a id="btnTrash" onclick="exibeUpdatePro(this)"><img src="../assets/edit.png" class="icons"></a>'  + 
                            '<a id="btnTrash" onclick="deletePro(this)"><img src="../assets/trash.png" class="icons"></a>' +
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

async function deletePro(td){
  let dateselection = td.parentElement.parentElement;
  // console.log(dateselection);
  // console.log(dateselection.cells[0].innerHTML);
  containerModal.style.display = 'block';

  inpCod.disabled = true;
  inpData.disabled = true;
  inpNome.disabled = true;
  inpDesc.disabled = true;
  inpFab.disabled = true;
  inpQtda.disabled = true;
  inpPreco.disabled = true;
  inpCusto.disabled = true;

  delModal.disabled = false;
  CadModal.disabled = true;
  altModal.disabled = true;

  
  inpCod.value = dateselection.cells[0].innerHTML;
  inpNome.value = dateselection.cells[1].innerHTML;
  inpDesc.value = dateselection.cells[2].innerHTML;
  inpFab.value = dateselection.cells[3].innerHTML;
  inpCusto.value = dateselection.cells[4].innerHTML;
  inpPreco.value = dateselection.cells[5].innerHTML;
  inpQtda.value = dateselection.cells[6].innerHTML;
  inpData.value = dateselection.cells[7].innerHTML;  
  codDelete = inpCod.value;
}

async function exibeUpdatePro(td){
  let dateselection = td.parentElement.parentElement;
  containerModal.style.display = 'block';
  inpCod.disabled = true;
  inpData.disabled = true;
  inpNome.disabled = false;
  inpDesc.disabled = false;
  inpFab.disabled = false;
  inpQtda.disabled = false;
  inpPreco.disabled = false;
  inpCusto.disabled = false;

  delModal.disabled = true;
  CadModal.disabled = true;
  altModal.disabled = false;

  inpCod.value = dateselection.cells[0].innerHTML;
  inpNome.value = dateselection.cells[1].innerHTML;
  inpDesc.value = dateselection.cells[2].innerHTML;
  inpFab.value = dateselection.cells[3].innerHTML;
  inpCusto.value = dateselection.cells[4].innerHTML;
  inpPreco.value = dateselection.cells[5].innerHTML;
  inpQtda.value = dateselection.cells[6].innerHTML;
  inpData.value = dateselection.cells[7].innerHTML; 

  codAltera = inpCod.value;
}


async function updatePro(){
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
    
    const response = await api.put(`produtos/${codAltera}`, data);
    console.log(response);
    
    if(response.status == 201){
      Swal.fire({
        icon: "success",
        title: 'Registro alterado com sucesso!',
      });
    }
    containerModal.style.display = 'none';
    consultar();
    
  } catch (error) {
      console.log(`Error ao alterar o produto. ${error}`);
  }
}




delModal.onclick = async ()=>{
  try {
    const response = await api.delete('produtos/'+codDelete);
   if(response.status == 200){
    Swal.fire({
      icon: "success",
      title: 'Registro deletado com sucesso!',
    });
    containerModal.style.display = 'none'; 
    consultar();

   };
    
    
  } catch (error) {
    if (error.response) {
      // Verifica se o status é 409 (Conflict)
      if (error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: error.response.data.msg,
        });
        containerModal.style.display = 'none'; 
      } else {
        alert('Erro ao deletar o produto. Tente novamente.');
      }
    } else {
      // Tratamento para erros de conexão ou outros problemas
      console.error('Erro na requisição:', error);
      alert('Erro de conexão com o servidor.');      
    }
  }
}


/*********************************************************************/
//   Botões                                                           /
/*********************************************************************/
consultar();

btnConsultar.onclick = async ()=>{
  consultar()
}

btnIncluir.onclick = ()=>{
  containerModal.style.display = 'block';
  limparCampos();
  inpNome.focus();
  inpCod.disabled = true;
  inpData.disabled = true;
  inpNome.disabled = false;
  inpDesc.disabled = false;
  inpFab.disabled = false;
  inpQtda.disabled = false;
  inpPreco.disabled = false;
  inpCusto.disabled = false;

  delModal.disabled = true;
  CadModal.disabled = false;
  altModal.disabled = true;
  
};

FecharModal.onclick =()=>{
  containerModal.style.display = 'none'; 
};

CadModal.onclick = ()=>{
  create();
};

altModal.onclick = ()=>{
  updatePro();
}