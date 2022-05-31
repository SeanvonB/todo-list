// userInterface.js

/**
 * Module that controls UI components
 */
import { Header } from "./components/Header";
import { Form } from "./components/Form";
import { Menu } from "./components/Menu";
import { Task } from "./components/Task";
import { todos } from "./todos";

export const userInterface = (() => {
	const allTodos = todos.getAll();
	let currentProject = "home";

	// DOM Elements
	const dialogContainer = document.createElement("div");
	const footer = document.createElement("footer");
	const header = document.createElement("header");
	const mainContainer = document.createElement("main");
	const navContainer = document.createElement("nav");
	const tableBody = document.createElement("tbody");
	const tableHead = document.createElement("thead");
	const todoTable = document.createElement("table");

	/**
	 * Load initial UI state for new session
	 */
	function init() {
		todoTable.append(tableHead, tableBody);
		mainContainer.append(navContainer, todoTable);
		document.body.append(header, mainContainer, dialogContainer, footer);

		navContainer.addEventListener("click", handleMenu);

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
		const previousProjects = document.querySelectorAll(".current");
		for (let i = 0; i < previousProjects.length; i++) {
			previousProjects[i].classList.remove("current");
		}

		if (e.target.classList.contains("home")) viewHome();
		if (e.target.classList.contains("today")) viewToday();
		if (e.target.classList.contains("upcoming")) viewUpcoming();
		if (e.target.classList.contains("overdue")) viewOverdue();
		if (e.target.hasAttribute("data-project"))
			viewProject(e.target.dataset.project);
	}

	/**
	 * Handle user input to task component
	 */
	function handleTask(e) {}

	/**
	 * Create new project folder
	 *
	 * @param {string} name
	 */
	function addProject(name) {}

	/**
	 * Create new todo
	 *
	 * @param {Object} form
	 */
	function addTodo(form) {}

	/**
	 * Delete existing project folder
	 *
	 * @param {string} project
	 */
	function deleteProject(project) {}

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
		dialogContainer.appendChild(form);
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
		while (navContainer.firstChild) {
			navContainer.removeChild(navContainer.firstChild);
		}

		const projects = [];
		for (let todo of allTodos) {
			if (todo.project !== null && !projects.includes(todo.project)) {
				projects.push(todo.project);
			}
		}

		const menu = Menu(projects);
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
	 * Change view to home folder
	 */
	function viewHome() {
		currentProject = "home";
		navContainer.querySelector("li.home").classList.add("current");

		renderHeader();
		renderTasks(allTodos);
	}

	/**
	 * Change view to overdue folder
	 */
	function viewOverdue() {
		currentProject = "overdue";
		navContainer.querySelector("li.overdue").classList.add("current");

		const today = new Date().toISOString().split("T")[0];
		const overdueTodos = allTodos.filter((todo) => {
			if (todo.dueDate) return todo.dueDate.split("T")[0] <= today;
		});

		renderHeader();
		renderTasks(overdueTodos);
	}

	/**
	 * Change view to given project folder
	 *
	 * @param {string} project
	 */
	function viewProject(project) {
		currentProject = project;
		navContainer.querySelector("li." + project).classList.add("current");

		const projectTodos = allTodos.filter((todo) => {
			if (todo.project) return todo.project === project;
		});

		renderHeader();
		renderTasks(projectTodos);
	}

	/**
	 * Change view to today folder
	 */
	function viewToday() {
		currentProject = "today";
		navContainer.querySelector("li.today").classList.add("current");

		const today = new Date().toISOString().split("T")[0];
		const todayTodos = allTodos.filter((todo) => {
			if (todo.dueDate) return todo.dueDate.split("T")[0] === today;
		});

		renderHeader();
		renderTasks(todayTodos);
	}

	/**
	 * Change view to upcoming folder
	 */
	function viewUpcoming() {
		currentProject = "upcoming";
		navContainer.querySelector("li.upcoming").classList.add("current");

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

		renderHeader();
		renderTasks(upcomingTodos);
	}

	return { init };
})();
