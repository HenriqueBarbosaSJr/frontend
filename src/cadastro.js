// Referfências do DOM Html

const inpNome = document.getElementById('inpNome');
const inpDescri = document.getElementById('inpDescri');
const inpFab = document.getElementById('inpFab');
const inpQTDA = document.getElementById('inpQTDA');
const btnCreate = document.getElementById('btnCreate');
const btnCancel = document.getElementById('btnCancel');

//lógica de programação

const api = axios.create({
    baseURL:'http://localhost:3344/'
});

async function create(){

    try {
        const nome = inpNome.value;
        const descri = inpDescri.value;
        const fab = inpFab.value;
        const qtda = inpQTDA.value;
    
        const data = {
            nome : nome,
            descri : descri,
            fabricante : fab,
            qtda : qtda 
        }
        console.log(data);
          
        const resp =  await  api.post('produtos', data);
        console.log(resp);
        
    } catch (error) {
            console.log(error);
            
    }


    
    
}

btnCreate.onclick = ()=>{
    create()
};


