// todos.js

/**
 * This file contains the module for managing todos.
 *
 * Individual todos are stored in an array, which will be converted to JSON
 * format for localStorage, so todos can't store functions/methods.
 *
 * Each todo can be uniquely accessed by id (a creation timestamp).
 */

export const todos = (() => {
	const todosLosTodos = [];

	/**
	 * Add new todo with given properties to array of all todos
	 *
	 * @param {string} name
	 * @param {string} description
	 * @param {Object} dueDate
	 * @param {string} [project = null]
	 * @param {boolean} [complete = false]
	 * @param {boolean} [urgent = false]
	 */
	const add = (
		name,
		description,
		dueDate,
		project = null,
		complete = false,
		urgent = false
	) => {
		const id = new Date();
		todosLosTodos.push({
			name,
			description,
			dueDate,
			project,
			complete,
			urgent,
			id,
		});
	};

	/**
	 * Replace value of given property with new given value
	 *
	 * @param {number} id
	 * @param {string} property
	 * @param {*} value
	 */
	const edit = (id, property, value) => {
		const index = todosLosTodos.findIndex((todo) => todo.id === id);
		if (index > -1 && todosLosTodos[index][property]) {
			todosLosTodos[index][property] = value;
		}
	};

	/**
	 * Delete todo with given id
	 *
	 * @param {number} id
	 */
	const deleteTodo = (id) => {
		const index = todosLosTodos.findIndex((todo) => todo.id === id);
		if (index > -1) todosLosTodos.splice(index, 1);
	};

	/**
	 * Delete reference to given project from all todos
	 *
	 * @param {string} project
	 */
	const deleteProject = (project) => {
		todosLosTodos.forEach((todo) => {
			if (todo.project === project) todo.project = null;
		});
	};

	/**
	 * Return copy of array of all todos
	 *
	 * @returns {Array}
	 */
	const getAll = () => {
		return [...todosLosTodos];
	};

	/**
	 * Load array of all todos from localStorage
	 */
	const load = () => {
		todosLosTodos = JSON.parse(window.localStorage.getItem("todos"));
	};

	/**
	 * Save array of all todos to localStorage
	 */
	const save = () => {
		window.localStorage.setItem("todos", JSON.stringify(todosLosTodos));
	};

	/**
	 * Toggle complete status of todo with given id
	 *
	 * @param {number} id
	 */
	const toggleComplete = (id) => {
		const index = todosLosTodos.findIndex((todo) => todo.id === id);
		if (index > -1) {
			todosLosTodos[index].complete === false
				? (todosLosTodos[index].complete = true)
				: (todosLosTodos[index].complete = false);
		}
	};

	/**
	 * Toggle urgent status of todo with given id
	 *
	 * @param {number} id
	 */
	const toggleUrgent = (id) => {
		const index = todosLosTodos.findIndex((todo) => todo.id === id);
		if (index > -1) {
			todosLosTodos[index].urgent === false
				? (todosLosTodos[index].urgent = true)
				: (todosLosTodos[index].urgent = false);
		}
	};

	return {
		add,
		edit,
		deleteTodo,
		deleteProject,
		getAll,
		load,
		save,
		toggleComplete,
		toggleUrgent,
	};
})();
