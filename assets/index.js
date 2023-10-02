//Pegando seletores 

const form = document.querySelector('#form');
const inputForm = document.querySelector("#task-title-input");
const list = document.querySelector('#lista');
const clearButton = document.querySelector('#clear-button');

let listas = []

function renderHtml(tasktitle ,done=false) {  //Funcao criar Elementos Html

    //=========== Criando Elementos =================================
        //Criando tag li  + adc valor 
        const li = document.createElement('li')
        //    li.textContent = tasktitle 
 
        const input = document.createElement('input')
        input.setAttribute('type','checkbox') //adc atributo na tag
       
        //adicionando evento no input 
        input.addEventListener("change" , (evento) => {
         //toogle muda statos do elemento Concluido/Nao concluido
         const liToToogle = evento.target.parentElement
         const spanToToggle = liToToogle.querySelector('span')
         const done = evento.target.checked // verifica checked true ou false 
         if (done) { //se true 
             spanToToggle.style.textDecoration = 'line-through'
         }else { //se false
             spanToToggle.style.textDecoration = 'none'
 
         }
         //alterando array de tarefas  
         listas = listas.map(t => { //percorre cada tarefa "t"
             if(t.title === spanToToggle.textContent) { //se t title te msm titulo 
                 return { 
                     title:t.title, //retorna title sem alteração 
                     done: !t.done , //inverte estado do done (true ou false)
                 }
             }
             return t //caso seja else nao faz nada , retorna tarefa
         })
         localStorage.setItem('listas',JSON.stringify(listas))
        });
        input.checked = done // ao recarregar pag , recebe valor done passado na funçao 
       
 
 
 
 
        const span =document.createElement('span') 
        span.textContent=tasktitle 
        if (done) { 
            span.style.textDecoration = 'line-through'

        }
 
        const button =document.createElement('button') 
        button.textContent = "Remover"
         //adc evento remover tarefa no botao
        button.addEventListener('click' , (evento) => {
 
         //pegando elemento pai da tag que chamou o evento
         const liToRemove =evento.target.parentElement 
 
         //pegando valor 'texto' da tag span dentro do li
         const titleToRemove = liToRemove.querySelector('span').textContent
 
         //filtrando em listas o nome da tarefa removida //atualizando o valor de listas 
         listas = listas.filter(t => t.title !== titleToRemove)
 
         //remove elemento pai da ul + remove tarefa da lista[array]
         list.removeChild(liToRemove) 
         
         //salvando Tudo no localStorage(Dados navegador)
         localStorage.setItem('listas',JSON.stringify(listas))
         
 
        });
 
         //Adc em li as tags criadas
        li.appendChild(input)
        li.appendChild(span)
        li.appendChild(button)
        
        
        //Por fim Adicionando Tag de tarefa no html 
 
        list.appendChild(li)
        inputForm.value = textContent = "" //limpando imput a cada item adc
 

}

window.onload =() => { //Ao Recarregar pagina Busca o que foi salvo no navegador
    const tarefaEmLocalStorage = localStorage.getItem('listas') //pegando conteudo armazenado no localStorage 
   
    if (!tarefaEmLocalStorage) return //retorna true ou false | se false = vazio (retonar nada) 
 //se true  
   listas = JSON.parse(tarefaEmLocalStorage) //converte parte do conteudo em objeto

   listas.forEach(t => {  //percorre item por item 
    renderHtml(t.title,t.done) //passa como parametro titulo e valor done (true ou false) para a função . que dentro dela cria os elementos
   })
}

form.addEventListener("submit", (evento) => { //
    evento.preventDefault() ;
    const tasktitle = inputForm.value //pegando valor/title do input
        if(tasktitle.length <= 3 ) { 
            alert('Sua Tarefa precisa ter , pelos menos 4 caracteres')
        return;
        };
        //Adc Tarefa em forma de objeto na lista
        listas.push( { 
        title : tasktitle , 
        done : false , 
       }) ;

       localStorage.setItem('listas',JSON.stringify(listas)) //adcionando listas no banco de dados do navegador

       //chamando a função
       renderHtml(tasktitle);
    

});

