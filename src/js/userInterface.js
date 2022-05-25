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

	// DOM Elements
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
		document.body.append(header, mainContainer, footer);
		renderHeader();
		renderList(allTodos);
	}

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
	 * Render sortable header section of todoTable
	 */
	function renderHeader() {
		const row = Header();
		tableHead.appendChild(row);
	}

	/**
	 * Render tasks in main section of todoTable
	 *
	 * @param {Array} todos
	 */
	function renderList(todos) {
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
