let btnTasks = document.querySelector('button')
let tasksName = document.querySelector('#content')

let tasks = getTaskFormLocalStorage()
renderTasks(tasks)


btnTasks.addEventListener('click', function () {
  if (!tasksName.value) {
    alert('Enter the Tasks name, Please')
    return false
  }

  let taskId = this.getAttribute('id')

  let tasks = getTaskFormLocalStorage()
  let task = { name: tasksName.value }

  if (taskId == 0 || taskId) {
    tasks[taskId] = task
    this.removeAttribute('id')
  } else {
    tasks.push(task)
  }

  tasksName.value = '';

  localStorage.setItem('tasks', JSON.stringify(tasks))

  renderTasks(tasks)
})

function editTask(id) {
  let tasks = getTaskFormLocalStorage()
  if (tasks.length > 0) {
    tasksName.value = tasks[id].name
    btnTasks.setAttribute('id', id)
  }
}

function deleteTask(id) {
  if (confirm('Sure?')) {
    let tasks = getTaskFormLocalStorage()
    tasks.splice(id, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks(getTaskFormLocalStorage())
  }
}


function renderTasks(tasks = []) {
  let content = '<ul>'

  tasks.forEach((task, index) => {
    content +=
      `<li>
          <div class="task-name">${task.name}</div>
          <a href="#" onclick='editTask(${index})'>Edit</a>
          <a href="#" onclick='deleteTask(${index})'>Delete</a>
        </li>`
  })

  content += '</ul>'
  document.querySelector('#result').innerHTML = content
}

function getTaskFormLocalStorage() {
  return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}

