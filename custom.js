let user = document.querySelector("#user");
let add = document.querySelector("#add");
let taskList = [];
let tabs = document.querySelectorAll(".tabs li");
let filterList = [];
let mode = "all";

add.addEventListener("click", addTask);

function addTask() {
  let taskContent = {
    id: randomId(),
    taskContent: user.value,
    isComplete: false,
  };

  taskList.push(taskContent);
  console.log(taskList);
  user.value = "";
  render();
}

function render() {
  //   console.log("화면");

  list = {};
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  let result = "";
  result += `<h4>Today plan 📌</h4>`;

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      result += `
        <div class="task">
          <button style=" color: #fff;
          background-color: #f15a23;"class="che" onclick="complete(${list[i].id})">&#10003;</button>
          <div class="task-done">${list[i].taskContent}</div>
          <button class="del" onclick="deleteTask(${list[i].id})">&times;</button>
        </div>
      `;
    } else {
      result += `
        <div class="task">
          <button style="border:2px solid #eee" class="che" onclick="complete(${list[i].id})">&#10003;</button>
          <div>${list[i].taskContent}</div>
          <button class="del" onclick="deleteTask(${list[i].id})">&times;</button>
        </div>
      `;
    }
  }

  document.querySelector("#taskBoard").innerHTML = result;
}

function complete(id) {
  //   console.log(id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      //   taskList[i].isComplete = true;
      taskList[i].isComplete = !taskList[i].isComplete;
    }
  }

  //   console.log(taskList);
  filter();
}

function randomId() {
  //   console.log(Date.now());
  return Date.now();
}

function deleteTask(id) {
  //   console.log("삭제");
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  //   console.log(taskList);
  filter();
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    for (let j = 0; j < tabs.length; j++) {
      tabs[j].classList.remove("on");
    }
    tabs[i].classList.add("on");
    filter(event);
  });
}

function filter(event) {
  // console.log("filter")
  if (event) {
    mode = event.target.id;
    console.log(mode);
  }
  filterList = [];
  //   console.log(mode);

  if (mode == "all") {
    // console.log("all");
    render();
  } else if (mode == "ongoing") {
    // console.log("ongoing");
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode == "done") {
    // console.log("done");
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
