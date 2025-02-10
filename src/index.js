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
            taskElement.classList.add('task-names');
            taskElement.textContent = `${taskItem.title}`;
            taskList.appendChild(taskElement);
        });
    }
}





