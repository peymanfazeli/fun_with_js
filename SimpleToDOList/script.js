"use strict";
const addTasksPart = document.querySelector("#tasks");
const push = document.querySelector("#push");

push.addEventListener("click", () => {
  if (document.querySelector("#newTask input").value.length <= 0) {
    alert("Please Enter Task Name");
  } else {
    addTasksPart.innerHTML += `
            <div class="task">
                <span id="taskName">
                    ${document.querySelector("#newTask input").value}
                </span>
                <button class="delete">🚮</button></button>
            </div>
            ${(document.querySelector("#newTask input").value = "")}
        `;
    var currentTasks = document.querySelectorAll(".delete");
    for (let i = 0; i <= currentTasks.length; i++) {
      currentTasks[i].onclick = function () {
        this.parentNode.remove();
      };
    }
  }
});
