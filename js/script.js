 const tasks = [
      { task: 'Learn coding', isCompleted: false },
      { task: 'Assignment', isCompleted: false },
      { task: 'shopping', isCompleted: false }
    ];


const displayTasks=()=>{
    const taskContainer=document.getElementById("tasks-container")
    const messageEl=document.getElementById("message")
    if(tasks.length===0){
        messageEl.classList.remove("d-none")
    }else{
        messageEl.classList.add("d-none")
    }
    taskContainer.innerHTML=""
    tasks.forEach((task, index) => {
        taskContainer.innerHTML += `
          <div class="alert alert-light d-flex justify-content-between align-items-center mb-3 rounded shadow-sm">
            <span class="${task.isCompleted ? 'completed' : ''}">${task.task}</span>
            <div>
              <button class="btn btn-primary btn-sm mx-1" onclick="editTask(${index})">Completed</button>
              <button class="btn btn-danger btn-sm mx-1" onclick="deleteTask(${index})">Delete</button>
            </div>
          </div>
        `;
      });
    };
const addTask=()=>{
    const taskInputEl=document.getElementById("taskInput").value
    if(taskInputEl.trim().length===0){
        alert("tasks should not be empty")
        return
    }
    console.log(taskInputEl);
    tasks.push({task:taskInputEl,isCompleted:false})
    console.log(tasks);
    displayTasks()
    
    
}

const deleteTask=(index)=>{
    console.log(index)
    tasks.splice(index,1)
    displayTasks()
    
}
 const editTask = (index) => {
      tasks[index].isCompleted = !tasks[index].isCompleted;
      displayTasks();
    };



displayTasks();