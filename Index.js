let listAddition = document.querySelector(".listAddB");
let container = document.querySelector(".container");
let flexContainer = document.querySelector(".containerB");
let select = document.querySelector(".selecting");
let lists = document.querySelector(".lists");
let inputValue = document.getElementById("name");

let list_add_button = document.querySelector(".btn1");
let list_close_button = document.querySelector(".btn2");

let boxes = [];
let id = 0;


let showlists = () => {
  let box = "";
  boxes.forEach((user) => {
    let list = "";
    user.lists.forEach((e, i) => {
 
      if (
        document.getElementById(`b-${user.id}-${i}`) !== null &&
        document.getElementById(`b-${user.id}-${i}`).getAttribute("class") == null)
        {
          list += `<p id='b-${user.id}-${i}'>${e} <span class='task-done-btn' onclick="taskDone('b-${user.id}-${i}',${user.id})">Mark Done</span></p>`;
        }
        else if (
        document.getElementById(`b-${user.id}-${i}`) !== null &&
        document
          .getElementById(`b-${user.id}-${i}`)
          .getAttribute("class")
          .includes("task-done"))
          {
            list += `<p id='b-${user.id}-${i}' class='task-done'>${e}</p>`;
          } else
          {
            list += `<p id='b-${user.id}-${i}'>${e} <span class='task-done-btn' onclick="taskDone('b-${user.id}-${i}',${user.id})">Mark Done</span></p>`;
          }
    });

    box += `<div class='box'>
        <h2 class="box-heading" onclick='getThis(${user.id})'>${user.title}</h2>
        <hr/>
        <div class="lists">
            ${list}
        </div>
        <i id="del_list" onclick="delBox(${user.id})" class="fas fa-trash"></i>
        <i id="add_list" onclick="addList(${user.id})" class="fa-solid fa-circle-plus"></i>
    </div>`;
  });

  flexContainer.innerHTML = box;
};


let getSbox = (id) => {
  let box = "";

  if (id) {
    boxes.forEach((user) => {
      if (user.id == id) {
        let list = "";
        user.lists.forEach((e, i) => {
          if (
            document.getElementById(`b-${user.id}-${i}`) !== null &&
            document
              .getElementById(`b-${user.id}-${i}`)
              .getAttribute("class") == null
          ) {
            list += `<p id='b-${user.id}-${i}'>${e} <span class='task-done-btn' onclick="taskDone('b-${user.id}-${i}',${user.id})">Mark Done</span></p>`;
          } else if (
            document.getElementById(`b-${user.id}-${i}`) !== null &&
            document
              .getElementById(`b-${user.id}-${i}`)
              .getAttribute("class")
              .includes("task-done")
          ) {
            list += `<p id='b-${user.id}-${i}' class='task-done'>${e}</p>`;
          } else {
            list += `<p id='b-${user.id}-${i}'>${e} <span class='task-done-btn' onclick="taskDone('b-${user.id}-${i}',${user.id})">Mark Done</span></p>`;
          }
        });

        box += `
        <div class="page-2-btn">
          <div id="b-btn" onclick='goBack()'>
            <i class="fas fa-chevron-circle-left fa-2x"></i><span class="w">Back</span>
          </div>
          <div class="heading">${user.title}</div>
          <i class="fa-solid fa-circle-plus" onclick='addBoxes()'></i>
        </div>
        <div class='sbox'>
          <p class="box-heading" onclick='getThis(${user.id})'>${user.title}</p><hr/>
          <div class="lists">${list}</div>
          <i id="s_del_list" onclick="delBox(${user.id})" class="fas fa-trash"></i>
          <i id="s_add_list" onclick="addList(${user.id})" class="fa-solid fa-circle-plus"></i>
      </div>`;
      }
    });
  }
  else
  {
    box = "";
  }
  select.innerHTML = box;
};


let addListItems = () => {
  id++;
  listAddition.classList.remove("hidden");
  container.classList.add("blur");
  select.classList.add("blur");
};

list_add_button.addEventListener("click", () => {
  listAddition.classList.add("popout");
  let newList = inputValue.value;
  if (newList) {
    boxes.push({
      title: newList,
      id,
      lists: [],
    });

    setTimeout(() => {
      showlists();
      hideCont();
    }, 350);
  }
  inputValue.value = "";
  setTimeout(() => {
    listAddition.classList.add("hidden");
    listAddition.classList.remove("popout");
    select.classList.add("d-none");
    container.classList.remove("d-none");
    container.classList.remove("blur");
    select.classList.remove("blur");
  }, 300);
});

list_close_button.addEventListener("click", () => {
  listAddition.classList.add("popout");
  inputValue.value = "";
  setTimeout(() => {
    listAddition.classList.add("hidden");
    listAddition.classList.remove("popout");
    container.classList.remove("blur");
    select.classList.remove("blur");
  }, 300);
});

function hideCont() {
  if (flexContainer.innerHTML == "") {
    document.getElementById("noDiv").classList.remove("hidden");
  } else {
    document.getElementById("noDiv").classList.add("hidden");
  }
}
hideCont();


function delBox(id) {
  boxes = boxes.filter((box) => {
    return box.id !== id;
  });


  select.classList.add("d-none");
  container.classList.remove("d-none");


  showlists();
  hideCont();
}


function addList(itemId) {
  container.classList.add("blur");
  select.classList.add("blur");

  let itemModal = document.createElement("div");
  itemModal.className = "add-item-modal";
  itemModal.innerHTML = `<p id="l2">Add New Item</p>
  <input type="text" id="item"/>
  <div class="btn">
    <button class="item-add-btn">Add</button>
    <button class="item-close-btn">Close</button>
  </div>`;

  let body = document.body;
  body.appendChild(itemModal);

  let itemAddBtn = document.querySelector(".item-add-btn");
  let itemClosebtn = document.querySelector(".item-close-btn");
  let inputItem = document.getElementById("item");

  itemAddBtn.addEventListener("click", () => {
    itemModal.classList.add("popout");
    const newList = inputItem.value;
    if (newList) {
      boxes.forEach((box) => {
        if (box.id === itemId) {
          box.lists.push(newList);
        }
      });


      setTimeout(() => {
        showlists();
        getSbox(itemId);
      }, 350);
    }

    setTimeout(() => {
      itemModal.classList.remove("popout");
      container.classList.remove("blur");
      select.classList.remove("blur");
      itemModal.remove();
    }, 300);
  });

  itemClosebtn.addEventListener("click", () => {
    itemModal.classList.add("popout");

    setTimeout(() => {
      itemModal.classList.remove("popout");
      container.classList.remove("blur");
      select.classList.remove("blur");
      itemModal.remove();
    }, 300);
  });
}


let getThis = (id) => {
  getSbox(id);

  select.classList.remove("d-none");
  container.classList.add("d-none");
};

function goBack() {
  select.classList.add("d-none");
  container.classList.remove("d-none");
}

function taskDone(id, user_id) {
  document.getElementById(id).classList.add("task-done");
  document.querySelector(`#${id} span`).classList.add("d-none");
  getSbox(user_id);
}