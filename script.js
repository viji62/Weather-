// Wait for the DOM to fully load before executing scripts
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully!");

    // Select elements
    const button = document.getElementById("clickMe");
    const message = document.getElementById("message");
    const form = document.getElementById("myForm");
    const nameInput = document.getElementById("name");
    const taskList = document.getElementById("taskList");
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");

    // Button Click Event
    button.addEventListener("click", function () {
        message.textContent = "Hello! JavaScript is working!";
        message.style.color = "green";
        message.style.fontSize = "18px";
        message.style.fontWeight = "bold";
        console.log("Button clicked!");
    });

    // Form Validation
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission
        const nameValue = nameInput.value.trim();

        if (nameValue === "") {
            alert("Please enter your name.");
        } else {
            alert("Form submitted successfully, " + nameValue + "!");
            nameInput.value = ""; // Clear input field after submission
        }
    });

    // Task List - Add Task
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;

            // Create delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.style.marginLeft = "10px";
            deleteButton.style.color = "red";

            // Delete task event
            deleteButton.addEventListener("click", function () {
                taskList.removeChild(listItem);
                saveTasks(); // Update local storage
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
            taskInput.value = ""; // Clear input field after adding
            saveTasks(); // Save updated list to local storage
        } else {
            alert("Task cannot be empty!");
        }
    });

    // Local Storage - Save & Load Tasks
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(task => {
            tasks.push(task.textContent.replace("X", "").trim());
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(taskText => {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.style.marginLeft = "10px";
            deleteButton.style.color = "red";

            deleteButton.addEventListener("click", function () {
                taskList.removeChild(listItem);
                saveTasks();
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        });
    }

    // Load tasks on page load
    loadTasks();

    // Simple Animation Example
    function animateMessage() {
        let position = 0;
        const interval = setInterval(() => {
            position += 2;
            message.style.transform = `translateX(${position}px)`;
            if (position > 200) clearInterval(interval);
        }, 50);
    }

    button.addEventListener("mouseover", animateMessage);
});
