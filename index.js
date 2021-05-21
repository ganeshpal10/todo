let todoLists = [];


const container = document.getElementById("container-1")
const popup = document.getElementById("popup-1");
const popup2 = document.getElementById("popup-2");
const container2 = document.getElementById("container-2");
const noToDo = document.querySelector(".no-todo-items");

var flag = true
        



const render = () =>{
    const cardContainer = document.querySelector(".card-container");

    var child = cardContainer.lastElementChild;
    while(child)
    {
        cardContainer.removeChild(child);
        child = cardContainer.lastElementChild;

    }
    
    for(i=0;i<todoLists.length;i++){
    
    let card =document.createElement("div");
    card.setAttribute("class","card");
    card.setAttribute("data-key",todoLists[i].id);
    
    card.innerHTML = `<p class="card-heading" onclick = "redirect(this)" id = "card-heading">${todoLists[i].heading}</p>
    <hr>
    <ul class="ul-list">
    </ul>
    <div class="footer">
        <button class="delete-btn" onclick = "remove(this)">
            <i class="fa fa-trash"  aria-hidden="true"></i>
        </button>
        <button class="btn" onclick="addSubtask(this)">
            <i class="fa fa-plus-circle"  aria-hidden="true"></i>
        </button>
    </div>`

    cardContainer.appendChild(card);

    let currentTodo = todoLists[i];

    for (let j = 0; j < currentTodo.subTask.length; j++) {
        
        let li = document.createElement("li")
        li.setAttribute("id",currentTodo.subTask[j].id)

        currentTodo.subTask[j].completed ? li.setAttribute("class","active") : li.setAttribute("class"," ")
        
        let markdone = currentTodo.subTask[j].completed?"markdone active": "markdone"
        
        
        
        li.innerHTML = `
        ${currentTodo.subTask[j].subTaskName}<button class="${markdone}" onclick="markdone(this)">Mark Done</button>`
        
        card.childNodes[4].appendChild(li)
    }
    }

}

const toggle = () =>{
    
    if(flag)
    {
        container.classList.toggle("active");
        popup.classList.toggle("active");
    
        if(todoLists.length != 0)
        {
            noToDo.classList.add("active")
        }
        else{
            noToDo.classList.remove("active")
        }
    }
    else
    {
        container2.classList.toggle("active");
        popup.classList.toggle("active");
    }
    
    document.getElementById("new-list").value = '';
    
}

const addList = () =>
{
    let listHeading = document.querySelector("#new-list").value;
    if(listHeading != '' ){
        const todo = {
            heading:listHeading,
            subTask:[],
            id:Date.now()
        }
    
        todoLists.push(todo);
        console.log(todoLists)
        
        if(flag)
        {
            render();
            toggle();
        }
        else
        {
            container.style.display = "block";
            container2.style.visibility = "hidden"
            toggle()
            render();
            flag = true
        }
        
    }
    
}




const toggle2 = () =>{ 
    if(flag)
    {
        container.classList.toggle("active"); 
        popup2.classList.toggle("active");
    }
    else
    {
        container2.classList.toggle("active")
        popup2.classList.toggle("active")
    }

    document.getElementById("new-item").value = '';
}
    

const addSubtask = (item) =>{

    toggle2();

    currentElement = item;

}




const newSubTask = () =>{

    let subTaskItem = document.getElementById("new-item").value;
    if(subTaskItem != '' )
    {
        cardId = currentElement.parentNode.parentNode.getAttribute("data-key")
    
    console.log(currentElement.parentNode.parentNode)
    

    const li = document.createElement("li")
    li.setAttribute("class","")
    li.setAttribute("id",Date.now())                                                    

    li.innerHTML = `
    ${subTaskItem}<button class="markdone" onclick = "markdone(this)">Mark Done</button>`
    
    list  = currentElement.parentNode.parentNode.childNodes[4];
    
    list.appendChild(li);


    let subTodo = {
        subTaskName:subTaskItem,
        completed:false,
        id:li.getAttribute("id")
    }
    
    for (let i = 0; i < todoLists.length; i++) {
         if(todoLists[i].id == cardId)
         {
             todoLists[i].subTask.push(subTodo)
         }
        
    }

    toggle2();
    }
    
    

}


const markdone = (item) =>{
    let subTaskCardId = item.parentNode.getAttribute("id");
    let cardId = item.parentNode.parentNode.parentNode.getAttribute("data-key")
    

    for (let i = 0; i < todoLists.length; i++)
    {
        if(todoLists[i].id == cardId)
        {
            let currentTodo = todoLists[i]
            
            for (let j = 0; j < currentTodo.subTask.length; j++)
            {
                if(currentTodo.subTask[j].id == subTaskCardId )
                {
                    currentTodo.subTask[j].completed = true;
                }
            }
        }
        
    }

    item.parentNode.classList.add("active")

    let child = item
    item.parentNode.lastElementChild.remove(child)
}

let remove = (item) =>{

    removeCardId = item.parentNode.parentNode.getAttribute("data-key")
    
    for (let i = 0; i < todoLists.length; i++) {
        if(todoLists[i].id == removeCardId)
        {
            todoLists.splice(i,1);
        }   
    }

    container.style.display = "block";
    container2.style.visibility = "hidden"

    if(todoLists.length != 0)
    {
        noToDo.classList.add("active")
    }
    else{
        noToDo.classList.remove("active")
    }
    render()
}

let redirect = (item) =>{
    flag = false;

    let redirectCardId= item.parentNode.getAttribute("data-key")

    let renderCardIndex;

    for (let i = 0; i < todoLists.length; i++) {
        
        if(todoLists[i].id == redirectCardId)
        {
            renderCardIndex = i
        }
        
    }

    container.style.display = "none";

    container2.style.visibility = "visible"
    
    container2.innerHTML = `
    <div class="heading-container-back">
    <div class="back" onclick="goback()">
        <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
        <span>Back</span>
    </div>
    <div class="heading-name">
        <h3>${todoLists[renderCardIndex].heading}</h3>
    </div>
    <div class="add-icon" onclick = "toggle()" >
        <i class="fa fa-plus-circle"  aria-hidden="true"></i>
    </div>
    </div>
    `

    
    let card =document.createElement("div");
    card.setAttribute("class","card");
    card.setAttribute("data-key",todoLists[renderCardIndex].id);
    
    card.innerHTML = `<p class="card-heading"  id = "card-heading">${todoLists[renderCardIndex].heading}</p>
    <hr>
    <ul class="ul-list">
    </ul>
    <div class="footer">
        <button class="delete-btn" onclick = "remove(this)">
            <i class="fa fa-trash"  aria-hidden="true"></i>
        </button>
        <button class="btn" onclick="addSubtask(this)">
            <i class="fa fa-plus-circle"  aria-hidden="true"></i>
        </button>
    </div>`

    container2.appendChild(card);
    
    let currentCardTodo = todoLists[renderCardIndex];
    for(let j = 0; j < currentCardTodo.subTask.length; j++) {
        
        let li = document.createElement("li")
        li.setAttribute("id",currentCardTodo.subTask[j].id)
        console.log(li)
        currentCardTodo.subTask[j].completed ? li.setAttribute("class","active") : li.setAttribute("class"," ")
        
        let markdone = currentCardTodo.subTask[j].completed?"markdone active": "markdone"
        
        
        
        li.innerHTML = `
        ${currentCardTodo.subTask[j].subTaskName}<button class="${markdone}" onclick="markdone(this)">Mark Done</button>`
        
        
        card.childNodes[4].appendChild(li)
    }
    

}





let goback = () =>{

    flag = true
    container.style.display = "block";

    container2.style.visibility = "hidden"
    render()
}










