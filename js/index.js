// Select elements
const inputElement = document.getElementById("taskInput");
const taskButton = document.getElementById("taskButton");
const taskList = document.getElementById("taskList");

// Add a new task
const addTask = () => {
  // Get typed text and trim whitespace
  const text = inputElement.value.trim();
  
  if (text === "") {
    showAlert("Please enter a task!", "error");
    return;
  }
  
  // Create task item
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  
  taskItem.innerHTML = `
    <div class="flex items-center w-full">
      <input type="checkbox" class="complete-checkbox rounded text-blue-600 h-5 w-5">
      <span class="task-text ml-3">${text}</span>
    </div>
    <div class="flex">
      <button class="action-btn complete-btn" title="Complete">
        <i class="fas fa-check"></i>
      </button>
      <button class="action-btn delete-btn" title="Delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
  
  // Add event listeners for the buttons
  const completeBtn = taskItem.querySelector(".complete-btn");
  const deleteBtn = taskItem.querySelector(".delete-btn");
  const checkbox = taskItem.querySelector(".complete-checkbox");
  const taskText = taskItem.querySelector(".task-text");
  
  completeBtn.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    checkbox.checked = !checkbox.checked;
  });
  
  checkbox.addEventListener("change", () => {
    taskItem.classList.toggle("completed");
  });
  
  deleteBtn.addEventListener("click", () => {
    taskItem.classList.add("opacity-0", "translate-x-4");
    setTimeout(() => {
      taskItem.remove();
      checkEmptyState();
    }, 200);
  });
  
  // Add to the list with animation
  taskItem.classList.add("opacity-0", "-translate-y-2");
  taskList.appendChild(taskItem);
  
  setTimeout(() => {
    taskItem.classList.remove("opacity-0", "-translate-y-2");
  }, 10);
  
  // Clear input and show success message
  inputElement.value = "";
  showAlert("Task added successfully!", "success");
  
  // Remove empty state if it exists
  const emptyState = document.querySelector(".empty-state");
  if (emptyState) emptyState.remove();
};

// Check if list is empty and show empty state
const checkEmptyState = () => {
  if (taskList.children.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <i class="fas fa-clipboard-list"></i>
      <p class="text-xl">No tasks yet</p>
      <p class="text-sm mt-2">Add a task to get started</p>
    `;
    taskList.appendChild(emptyState);
  }
};

// Show alert message
const showAlert = (message, type) => {
  const alert = document.createElement("div");
  alert.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${
    type === "error" ? "bg-red-500" : "bg-green-500"
  }`;
  alert.textContent = message;
  
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.classList.add("opacity-0", "translate-x-4");
    setTimeout(() => alert.remove(), 300);
  }, 3000);
};

// Event listeners
taskButton.addEventListener("click", addTask);

inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

// Initialize empty state
checkEmptyState();