// userInterface.js

/**
 * This file contains the module for managing the UI.
 */
import { format } from "date-fns";

export const userInterface = (() => {
	const projects = [];
	let currentProject = "home";

	// DOM Elements
	const footer = document.createElement("footer");
	const header = document.createElement("header");
	const mainContainer = document.createElement("div");
	const nav = document.createElement("nav");
	const todoList = document.createElement("main");

	/**
	 * Load initial UI state for new session
	 */
	const init = () => {};

	/**
	 * Create new project folder
	 *
	 * @param {Object} form
	 */
	const addProject = (form) => {};

	/**
	 * Create new todo
	 *
	 * @param {Object} form
	 */
	const addTodo = (form) => {};

	/**
	 * Delete existing project folder
	 *
	 * @param {string} project
	 */
	const deleteProject = (project) => {};

	/**
	 * Delete existing todo
	 *
	 * @param {number} id
	 */
	const deleteTodo = (id) => {};

	/**
	 * Edit details of existing project folder
	 *
	 * @param {string} project
	 * @param {Object} form
	 */
	const editProject = (project, form) => {};

	/**
	 * Edit details of existing todo
	 *
	 * @param {number} id
	 * @param {Object} form
	 */
	const editTodo = (id, form) => {};

	/**
	 * Change view to home
	 */
	const viewHome = () => {};

	/**
	 * Change view to given project
	 *
	 * @param {string} project
	 */
	const viewProject = (project) => {};

	return { init };
})();
