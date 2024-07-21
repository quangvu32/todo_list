document.getElementById('formTask').onsubmit = function(e) {
    e.preventDefault();
    const inputNode = document.getElementById('inputTask');
    const taskText = inputNode.value.trim();
    if(taskText !== ''){
        const task = {
            text: taskText,
            completed: false
        }
        addTask(task)
    }
}

document.getElementById('saveBtn').addEventListener('click',function(e){
    e.preventDefault();
    const taskList = document.getElementById('tasks');
    const tasks = [];
    for(let taskItem of taskList.getElementsByTagName('li')){
        const task = {
            text: taskItem.childNodes[0].textContent,
            completed: taskItem.classList.contains('completed')
        }
        tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));

})

const tasks = JSON.parse(localStorage.getItem('tasks'));
if(tasks){
    for(let task of tasks){
        addTask(task);
    }
}


function addTask(task) {
    const taskList = document.getElementById('tasks');
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    if(task.completed){
        taskItem.classList.toggle('completed');
    }
    taskItem.addEventListener('click', function(){
        taskItem.classList.toggle('completed');
    })
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function(){
        taskList.removeChild(taskItem);
    })
    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
}