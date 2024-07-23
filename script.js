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
            status: taskItem.classList.contains('completed') 
            ? 'completed' : taskItem.classList.contains('inProgress') 
            ? 'inProgress' : 'pending'
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

    const statusContainer = document.createElement('div');

    statusContainer.classList.toggle('status-container');
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;

    const status = document.createElement('button');
    status.textContent = 'Pending';


    if(task.status === 'completed'){
        taskItem.classList.toggle('completed');
        status.textContent = 'Completed';
    }
    else if(task.status === 'inProgress'){
        taskItem.classList.toggle('inProgress');
        status.textContent = 'In Progress';
    }
    else{
        taskItem.classList.toggle('pending');
        status.textContent = 'Pending';
    }

    status.addEventListener('click', function(){
        if(taskItem.classList.contains('completed')){
            taskItem.classList.remove('completed');
            taskItem.classList.toggle('pending');
            status.textContent = 'Pending';
        }
        else if(taskItem.classList.contains('pending'))
        {
            taskItem.classList.remove('pending');
            taskItem.classList.toggle('inProgress');
            status.textContent = 'In Progress';
        }
        else{
            taskItem.classList.remove('inProgress');
            taskItem.classList.toggle('completed');
            status.textContent = 'Completed';
        }
    })

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function(){
        taskList.removeChild(taskItem);
    })
    statusContainer.appendChild(status);
    statusContainer.appendChild(removeButton);

    taskItem.appendChild(statusContainer);
    taskList.appendChild(taskItem);
}