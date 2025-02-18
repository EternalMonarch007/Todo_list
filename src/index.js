import './style.css';

// Handling the Addition of project names in left container 1
const projectModal = document.querySelector('.add-project-dialog');
const openProject = document.querySelector('.open-project');
const closeProject = document.querySelector('.close-project-modal');
const addProject = document.querySelector('.add-project-modal');
const projectList = document.querySelector('.project-list-container');
const projectSelectedContainer = document.querySelector('.project-selected-container');
let selectedProject = null;

// open project modal
openProject.addEventListener('click', () => {
    projectModal.showModal();
});
// close project modal
closeProject.addEventListener('click', () => {
    document.getElementById('project-name').value = "";
    projectModal.close();
});
// add project modal
addProject.addEventListener('click', () => {
    const projectName = document.querySelector('#project-name').value;
    if (projectName) {
        const project = new Project(projectName);
        project.addProject();
        projectModal.close();
    } else {
        alert("Project name cannot be empty!");
    }
    document.getElementById('project-name').value = "";
});

// Project class
class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];  // Initialize tasks array for each project
    }
    static myProjects = [];

    addProject() {
        Project.myProjects.push(this);
        Project.displayProjects();
    }

    static displayProjects() {
        projectList.innerHTML = "";
        Project.myProjects.forEach(proj => {
            const project = document.createElement('div');
            project.classList.add('project-names');
            project.textContent = proj.name;
            project.addEventListener('click', () => {
                selectedProject = proj;  // Setting the selected project
                Project.displayProjects();
                Project.displayProjectDetails(proj);
            });
            projectList.appendChild(project);
        });

    }
    

    static displayProjectDetails(proj) {
        projectSelectedContainer.innerHTML = `<h2 class="project-heading">${proj.name}</h2>`;
        Task.displayTasks(proj);  // Display tasks for the selected project
    }
}

// Handling the Addition of task inputs in right container
const taskModal = document.querySelector('.add-task-dialog');
const openTask = document.querySelector('.open-task');
const closeTask = document.querySelector('.close-task-dialog-btn');
const addTask = document.querySelector('.add-task-dialog-btn');
const taskList = document.querySelector('.added-tasks-container');

// open task modal
openTask.addEventListener('click', () => {
    taskModal.showModal();
});
// close task modal
closeTask.addEventListener('click', () => {
    taskModal.close();
});
// add task modal
addTask.addEventListener('click', () => {
    const taskTitle = document.querySelector('#task-name').value;
    const taskDescription = document.querySelector('#task-description').value;
    const taskDueDate = document.querySelector('#task-date').value;
    const taskPriority = document.querySelector('#task-priority').value;
    if (taskTitle && taskDescription && taskDueDate && taskPriority && selectedProject) {
        const task = new Task(taskTitle, taskDescription, taskDueDate, taskPriority);
        selectedProject.tasks.push(task);  // Add task to selected project's tasks
        taskModal.close();
        Task.displayTasks(selectedProject);  // Display tasks for the selected project
    } else {
        alert("All fields are required and a project must be selected!");
    }
    document.getElementById('task-name').value = "";
    document.getElementById('task-description').value = "";
    document.getElementById('task-date').value = "";
    document.getElementById('task-priority').value = "";
});

// Task class
class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    static displayTasks(proj) {
        taskList.innerHTML = "";
        proj.tasks.forEach(taskItem => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-container');
    
            // Assign priority-based color class
            if (taskItem.priority.toLowerCase() === "high") {
                taskElement.classList.add("high-priority");
            } else if (taskItem.priority.toLowerCase() === "medium") {
                taskElement.classList.add("medium-priority");
            } else {
                taskElement.classList.add("low-priority");
            }
    
            taskElement.innerHTML = `
                <p>${taskItem.title}</p>
                <button class="check-btn">✔</button>
            `;
    
            // Add event listener for task details modal
            taskElement.addEventListener('click', (e) => {
                if (!e.target.classList.contains("check-btn")) { 
                    Task.showTaskModal(taskItem);
                }
            });
    
            // Add event listener for marking as completed
            taskElement.querySelector('.check-btn').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent modal from opening
                Task.markAsCompleted(taskItem, proj);
            });
    
            taskList.appendChild(taskElement);
        });
    }
    static markAsCompleted(task, proj) {
        // Remove from active tasks
        proj.tasks = proj.tasks.filter(t => t !== task);
    
        // Add to completed tasks
        proj.completedTasks = proj.completedTasks || [];
        proj.completedTasks.push(task);
    
        // Refresh display
        Task.displayTasks(proj);
        Task.displayCompletedTasks(proj);
    }
    static displayCompletedTasks(proj) {
        const completedSection = document.getElementById('completed-tasks');
        completedSection.innerHTML = "";
    
        proj.completedTasks?.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('completed-task');
            taskElement.innerHTML = `<p>${task.title} ✅</p>`;
            completedSection.appendChild(taskElement);
        });
    }
    
    
    
    

    static showTaskModal(taskItem) {
        const modal = document.createElement('div');
        modal.classList.add('task-modal');
        modal.innerHTML = `
            <div class="task-modal-content">
                <span class="close-modal">&times;</span>
                <h2>${taskItem.title}</h2>
                <p><strong>Due Date:</strong> ${taskItem.dueDate}</p>
                <p><strong>Priority:</strong> ${taskItem.priority}</p>
                <p><strong>Description:</strong> ${taskItem.description}</p>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        // Close when clicking outside modal content
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
            }
        });
    }
}
