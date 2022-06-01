// userInterface.js

/**
 * Module that controls UI components
 */
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { Task } from "./components/Task";
import { todos } from "./todos";

export const userInterface = (() => {
	let allProjects = [];
	let allTodos = [];
	let currentProject = "";

	// DOM Elements
	const addButton = document.querySelector(".add-todo");
	const mainContainer = document.querySelector("main");
	const navContainer = document.querySelector("nav");
	const tableBody = document.querySelector("tbody");
	const tableHead = document.querySelector("thead");

	/**
	 * Load initial UI state for new session
	 */
	function init() {
		allTodos = todos.getAll();
		for (let todo of allTodos) {
			if (todo.project !== null && !allProjects.includes(todo.project)) {
				allProjects.push(todo.project);
			}
		}

		renderMenu();
		viewHome();
	}

	/**
	 * Handle user input to form component
	 */
	function handleForm(e) {}

	/**
	 * Handle user input to header component
	 */
	function handleHeader(e) {}

	/**
	 * Handle user input to menu component
	 */
	function handleMenu(e) {
		if (e.target.classList.contains("home")) viewHome();
		if (e.target.classList.contains("today")) viewToday();
		if (e.target.classList.contains("upcoming")) viewUpcoming();
		if (e.target.classList.contains("overdue")) viewOverdue();
		if (e.target.hasAttribute("data-project"))
			e.target.classList.contains("delete-project")
				? deleteProject(e.target.dataset.project)
				: viewProject(e.target.dataset.project);
		if (e.type === "submit") addProject(e.target.elements.project.value);
	}

	/**
	 * Handle user input to task component
	 */
	function handleTask(e) {}

	/**
	 * Create new project folder and view it
	 *
	 * @param {string} name
	 */
	function addProject(name) {
		name = name.toLowerCase();
		allProjects.push(name);
		renderMenu();
		viewProject(name);
	}

	/**
	 * Create new todo
	 *
	 * @param {Object} form
	 */
	function addTodo(form) {}

	/**
	 * Delete existing project folder and associated todos
	 *
	 * @param {string} project
	 */
	function deleteProject(project) {
		const index = allProjects.indexOf(project);
		if (index > -1) allProjects.splice(index, 1);
		renderMenu();
		if (currentProject === project) viewHome();
		todos.deleteProject(project);
	}

	/**
	 * Delete existing todo
	 *
	 * @param {number} id
	 */
	function deleteTodo(id) {}

	/**
	 * Edit name of existing project folder
	 *
	 * @param {string} project
	 * @param {string} newName
	 */
	function editProject(project, newName) {}

	/**
	 * Edit details of existing todo
	 *
	 * @param {number} id
	 * @param {Object} form
	 */
	function editTodo(id, form) {}

	/**
	 * Render add/edit form in modal
	 *
	 * Defaults to creating new todo in current folder unless passed existing
	 * todo object as optional parameter
	 *
	 *
	 * @param {Object} [editTodo = false]
	 */
	function renderForm(editTodo = false) {
		const form = Form(currentProject, editTodo);
		mainContainer.appendChild(form);
	}

	/**
	 * Render sortable header section of todoTable
	 */
	function renderHeader() {
		while (tableHead.firstChild) {
			tableHead.removeChild(tableHead.firstChild);
		}
		const row = Header();
		tableHead.appendChild(row);
	}

	/**
	 * Render folder navigation menu
	 */
	function renderMenu() {
		const previousForm = navContainer.querySelector("form");
		if (previousForm)
			previousForm.removeEventListener("submit", handleMenu);
		while (navContainer.firstChild) {
			navContainer.removeChild(navContainer.firstChild);
		}

		const menu = Menu(allProjects.sort());
		menu.addEventListener("click", handleMenu);
		const form = menu.querySelector("form");
		form.addEventListener("submit", handleMenu);
		navContainer.appendChild(menu);
	}

	/**
	 * Render tasks in main section of todoTable
	 *
	 * @param {Array} todos
	 */
	function renderTasks(todos) {
		while (tableBody.firstChild) {
			tableBody.removeChild(tableBody.firstChild);
		}

		for (let todo of todos) {
			const row = Task(todo);
			tableBody.appendChild(row);
		}
	}

	/**
	 * Toggle complete status of todo with given id
	 *
	 * @param {number} id
	 */
	function toggleComplete(id) {}

	/**
	 * Toggle urgent status of todo with given id
	 *
	 * @param {number} id
	 */
	function toggleUrgent(id) {}

	/**
	 * Update currently viewed project folder
	 *
	 * @param {string} name
	 */
	function updateCurrent(name) {
		const previousProjects = document.querySelectorAll(".current");
		for (let i = 0; i < previousProjects.length; i++) {
			previousProjects[i].classList.remove("current");
		}

		currentProject = name;
		navContainer.querySelector("li." + name).classList.add("current");
	}

	/**
	 * Change view to home folder
	 */
	function viewHome() {
		updateCurrent("home");
		renderHeader();
		renderTasks(allTodos);
	}

	/**
	 * Change view to overdue folder
	 */
	function viewOverdue() {
		const today = new Date().toISOString().split("T")[0];
		const overdueTodos = allTodos.filter((todo) => {
			if (todo.dueDate) return todo.dueDate.split("T")[0] <= today;
		});

		updateCurrent("overdue");
		renderHeader();
		renderTasks(overdueTodos);
	}

	/**
	 * Change view to given project folder
	 *
	 * @param {string} project
	 */
	function viewProject(project) {
		const projectTodos = allTodos.filter((todo) => {
			if (todo.project) return todo.project === project;
		});

		updateCurrent(project);
		renderHeader();
		renderTasks(projectTodos);
	}

	/**
	 * Change view to today folder
	 */
	function viewToday() {
		const today = new Date().toISOString().split("T")[0];
		const todayTodos = allTodos.filter((todo) => {
			if (todo.dueDate) return todo.dueDate.split("T")[0] === today;
		});

		updateCurrent("today");
		renderHeader();
		renderTasks(todayTodos);
	}

	/**
	 * Change view to upcoming folder
	 */
	function viewUpcoming() {
		const today = new Date().toISOString().split("T")[0];
		let nextWeek = new Date();
		nextWeek.setDate(new Date().getDate() + 7);
		nextWeek = nextWeek.toISOString().split("T")[0];
		const upcomingTodos = allTodos.filter((todo) => {
			if (todo.dueDate)
				return (
					todo.dueDate.split("T")[0] >= today &&
					todo.dueDate.split("T")[0] <= nextWeek
				);
		});

		updateCurrent("upcoming");
		renderHeader();
		renderTasks(upcomingTodos);
	}

	return { init };
})();
