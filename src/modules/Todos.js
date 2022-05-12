// todos.js

/**
 * This file contains the module for managing todos.
 *
 * Individual todos are stored in an array, which will be converted to JSON
 * format for localStorage, so todos can't store functions/methods.
 *
 * Each todo can be uniquely accessed by id (a creation timestamp).
 */

export const Todos = (() => {
	const todosLosTodos = load();

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
	const addTodo = (
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
		save();
	};

	/**
	 * Replace value of given property with new given value
	 *
	 * @param {number} id
	 * @param {string} property
	 * @param {*} value
	 */
	const editTodo = (id, property, value) => {
		const index = todosLosTodos.findIndex((todo) => todo.id === id);
		if (index > -1 && todosLosTodos[index][property]) {
			todosLosTodos[index][property] = value;
		}
		save();
	};

	/**
	 * Delete todo with given id
	 *
	 * @param {number} id
	 */
	const deleteTodo = (id) => {
		const index = todosLosTodos.findIndex((todo) => todo.id === id);
		if (index > -1) todosLosTodos.splice(index, 1);
		save();
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
		save();
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
	 *
	 * @returns {Array} todos from localStorage or empty
	 */
	const load = () => {
		const token = window.localStorage.getItem("todos");
		return token ? JSON.parse(token) : [];
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
		save();
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
		save();
	};

	return {
		addTodo,
		editTodo,
		deleteTodo,
		deleteProject,
		getAll,
		toggleComplete,
		toggleUrgent,
	};
})();
