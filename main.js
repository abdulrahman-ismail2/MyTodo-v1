let taskinput = document.querySelector(".task-input");
let addbtn = document.querySelector(".add");

const tasks = [];
const deletedtask = [];
const tasksdone = [];

const toasts = new Toasts({
  offsetX: 20,
  offsetY: 20,
  gap: 20,
  width: 300,
  timing: "ease-out",
  duration: ".2s",
  dimOld: false,
  position: "top-right",
});

function createDiv() {
  let taskdiv = document.createElement("div");
  taskdiv.className = "task-content";
  let p = document.createElement("p");
  p.className = "task";
  p.setAttribute("title", taskinput.value);
  p.appendChild(document.createTextNode(taskinput.value));
  let time = document.createElement("span");
  time.className = "time";
  const date = new Date();
  let hours = date.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  time.textContent = `Signed At ${hours}:${minutes} ${amPm}`;
  let div = document.createElement("div");
  div.className = "task-buttons";
  let deleteBtn = document.createElement("span");
  deleteBtn.classList.add("btn", "delete");
  deleteBtn.setAttribute("title", "delete ?");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  let doneBtn = document.createElement("span");
  doneBtn.classList.add("btn", "done");
  doneBtn.setAttribute("title", "done ?");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  deleteBtn.addEventListener("click", (e) => {
    e.target.closest(".task-content").remove();
    const index = tasks.indexOf(taskinput.value);
    if (index > -1) tasks.splice(index, 1);
    toasts.push({
      title: "Deleted",
      content: "Task Deleted Successfully.",
      style: "error",
    });
  });

  doneBtn.addEventListener("click", (e) => {
    e.target.closest(".task-content").classList.add("blured");
    e.target.classList.add("cursor");
    toasts.push({
      title: "Done",
      content: "Good Job.",
      style: "success",
    });
  });

  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  taskdiv.appendChild(p);
  taskdiv.appendChild(time);
  taskdiv.appendChild(div);
  document.body.appendChild(taskdiv);

  tasks.push(taskinput.value);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

addbtn.addEventListener("click", () => {
  if (taskinput.value !== "") {
    if (tasks.includes(taskinput.value)) {
      toasts.push({
        title: "Sorry, Can't Do This",
        content: "Task already exists.",
        style: "error",
      });
      return;
    }
    createDiv();
    toasts.push({
      title: "Added",
      content: "Task Added Successfully.",
      style: "success",
    });
  } else {
    toasts.push({
      title: "Sorry, can't do this",
      content: "Task Cannot Be Empty.",
      style: "error",
    });
  }
});

setInterval(() => {
  let date = document.querySelector(".date");
  const now = new Date();
  date.innerHTML = `${now}`;
}, 1000);
