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
	const currentProject = "home";

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
		renderMenu();
		renderHeader();
		renderTasks(allTodos);
	}

	/**
	 * Handle user input to form component
	 */
	function handleForm(event) {}

	/**
	 * Handle user input to header component
	 */
	function handleHeader(event) {}

	/**
	 * Handle user input to menu component
	 */
	function handleMenu(event) {}

	/**
	 * Handle user input to task component
	 */
	function handleTask(event) {}

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
	 * Change view to home
	 */
	function viewHome() {}

	/**
	 * Change view to given project
	 *
	 * @param {string} project
	 */
	function viewProject(project) {}

	return { init };
})();
