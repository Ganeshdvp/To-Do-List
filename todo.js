let input = document.querySelector("#input");
let addButton = document.querySelector("#add");
let tbody = document.querySelector("tbody");
let id =1;
let body = document.body;
let toggle = document.getElementById("toggle");


if(window.sessionStorage.getItem("task")){
    tbody.innerHTML = window.sessionStorage.getItem("task");

    // Update the id based on the maximum id in the table
    const rows = tbody.querySelectorAll("tr");
    if (rows.length > 0) {
        id = Math.max(...Array.from(rows).map(row => parseInt(row.children[0].textContent))) + 1;
    }
    deleteButton1();
    editButton1();
}
else{
    tbody.innerHTML = " ";
}

function addTask(){
    let input = document.querySelector("#input").value;
    let tbody = document.querySelector("tbody");

    if(!input){     //check if input is empty
        alert("Please enter a task dude!");
        return;
    }
    if (tbody.innerHTML.trim() === "") {  //table is empty
        id = 1;
    }
    //create a new row and add it to the table
    tbody.innerHTML += ` 
    <tr>
        <td>${id++}</td>
        <td>${input}</td>
        <td>
           <button class ="edit-btn" style="background: white; border:none; width: 60px; height: 30px; border-radius: 5px;background-color:rgb(161, 158, 156); color:rgb(31, 29, 29);">Edit</button>
           <button class ="delete-btn" style="background: white; border:none; width: 60px; height: 30px; border-radius: 5px;background-color:rgb(159, 7, 75); color: #d2c9c9;">Delete</button>
        </td>
    </tr>
    `;
    input = document.querySelector("#input").value = ""; //clear the input field


    deleteButton1();
    editButton1();
    //session Storage
    window.sessionStorage.setItem("task",tbody.innerHTML); //save the task to local storage
}

input.addEventListener("keypress", (event)=>{     //enter key functionality
    if(event.key === "Enter"){
        addTask();
    }
});

function deleteButton1(){        //delete button functionality
    let deleteButton = document.querySelectorAll(".delete-btn");

    deleteButton.forEach((deleteButton)=>{
        deleteButton.addEventListener("click",()=>{
            deleteButton.parentElement.parentElement.remove();
            // Update sessionStorage after deletion
            window.sessionStorage.setItem("task",tbody.innerHTML); //save the task to local storage
        })
    })
}

function editButton1() {       //edit button functionality
    let editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach((editButton) => {
        editButton.addEventListener("click", ()=> {
            let row = editButton.parentElement.parentElement; // Get the row containing the button
            let taskCell = row.children[1]; // Get the task cell (2nd column)

            // Create an input field pre-filled with the current task
            let currentTask = taskCell.textContent;
            taskCell.innerHTML = `<input type="text" class="edit-input" value="${currentTask}" style=" width: 80%;height: 40px; border-radius: 15px; border: #ff0000 1px solid;background-color: #000000;color: #d2c9c9;padding-left: 10px;margin-top: 20px;" />`;

            // Focus on the input field
            let editInput = taskCell.querySelector(".edit-input");
            editInput.focus();

            // Save the edited task when the user presses Enter or clicks outside
            editInput.addEventListener("blur", ()=> {
                taskCell.textContent = editInput.value.trim() || currentTask; // Save the new value or revert to the old one if empty

                // Update sessionStorage after editing
                window.sessionStorage.setItem("task",tbody.innerHTML); //save the task to local storage
            });

            editInput.addEventListener("keypress", (event)=>{
                if (event.key === "Enter") {
                    taskCell.textContent = editInput.value.trim() || currentTask; // Save the new value or revert to the old one if empty
                    // Update sessionStorage after editing
                    window.sessionStorage.setItem("task",tbody.innerHTML); //save the task to local storage
                }
            });
        });
    });
}


// Theme Toggle

function switchToggle(){
    if(body.classList.contains("dark-theme")){
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        toggle.innerHTML = "☀️";
    }
    else{
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        toggle.innerHTML = "🌙";
    }
}

//overview

//arrow functions to fast development
//crud operations
//plain css
//seo optimization friendly
//responsive design
//dark mode
//session storage

