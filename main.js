const tasks = []
const input = document.querySelector(".task_input")
const tasksContainer = document.querySelector(".tasks")
const storageTasks = localStorage.getItem("tasks")

if (storageTasks) {
  JSON.parse(storageTasks).map((task) => {
    tasks.push(task)
    tasksContainer.innerHTML += `
    <li>
      <input onchange="updateTask('${task.id}')" type="checkbox" id="${
      task.id
    }" name="${task.id}" ${task.checked && "checked"} />
      <label for="${task.id}">${task.task}</label>
      <button onclick="removeTask('${task.id}')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          width="10px"
        >
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </button>
    </li>
    `
  })
}

function addTask(event) {
  event.preventDefault()
  if (!input.value) return

  const task = input.value
  const taskId = task.replaceAll(" ", "-")

  tasksContainer.innerHTML += `
  <li>
    <input onchange="updateTask('${taskId}')" type="checkbox" id="${taskId}" name="${taskId}" />
    <label for="${taskId}">${task}</label>
    <button onclick="removeTask('${taskId}')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        width="10px"
      >
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </button>
  </li>
  `

  tasks.push({
    task,
    id: taskId,
    checked: false,
  })

  localStorage.setItem("tasks", JSON.stringify(tasks))

  input.value = ""
}

function removeTask(taskId) {
  const taskContainer = document.querySelector(`#${taskId}`).parentElement
  const removedTask = tasks.indexOf(tasks.find((task) => task.id == taskId))

  tasks.splice(removedTask, 1)
  taskContainer.classList.add("hide")
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function updateTask(taskId) {
  const taskEdited = tasks.indexOf(tasks.find((task) => task.id == taskId))
  tasks[taskEdited].checked = !tasks[taskEdited].checked
  localStorage.setItem("tasks", JSON.stringify(tasks))
}
