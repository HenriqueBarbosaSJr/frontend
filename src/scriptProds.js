const btnConsultar = document.getElementById('btnConsultar');


/// Lógica de programação 

const api = axios.create({
    baseURL:'http://localhost:3344/'
});

 btnConsultar.onclick = async ()=>{
   console.log('Consultando produtos.....');
   const resp = await api.get('produtos'); 
   console.log(resp.data);
};
