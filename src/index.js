import './style.css';

//Handling the Addition of project names in left container 1
const projectModal = document.querySelector('.add-project-dialog'); 
const openProject = document.querySelector('.open-project');
const closeProject = document.querySelector('.close-project-modal');
const addProject = document.querySelector('.add-project-modal');
const projectList = document.querySelector('.project-list-container');
// open project modal
openProject.addEventListener('click', () => {
        projectModal.showModal();
    });
//closeproject modal
closeProject.addEventListener('click', () => {
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
    });
//Project class
class Project {
    constructor(name) {
        this.name = name;
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
            projectList.appendChild(project);
        });
    }
}
//Handling the Addition of task inputs in right container

const taskModal = document.querySelector('.add-task-dialog');
const openTask = document.querySelector('.open-task');
const closeTask = document.querySelector('.close-task-dialog-btn');
const addTask = document.querySelector('.add-task-dialog-btn');
const taskList = document.querySelector('.added-tasks-container');
//open task modal
openTask.addEventListener('click', () => {
        taskModal.showModal();
    });
//close task modal
closeTask.addEventListener('click', () => {
        taskModal.close();
    });
//add task modal
addTask.addEventListener('click', () => {
        const taskTitle = document.querySelector('#task-name').value;
        const taskDescription = document.querySelector('#task-description').value;
        const taskDueDate = document.querySelector('#task-date').value;
        const taskPriority = document.querySelector('#task-priority').value;
        if (taskTitle && taskDescription && taskDueDate && taskPriority) {
            const task = new Task(taskTitle, taskDescription, taskDueDate, taskPriority);
            task.addTask();
            taskModal.close();
        } else {
            alert("All fields are required!");
        }
    });

//task class
class Task{
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    static myTasks = [];

    addTask() {
        Task.myTasks.push(this);
        Task.displayTasks();
    }

    static displayTasks() {
        taskList.innerHTML = "";
        Task.myTasks.forEach(taskItem => {  // Changed the parameter to 'taskItem'
            const taskElement = document.createElement('div');  // Renamed 'task' to 'taskElement'
            taskElement.classList.add('task-names');
            taskElement.textContent = taskItem.title;  // Used 'taskItem' instead of 'task'
            taskList.appendChild(taskElement);
        });
    
    
    }
}