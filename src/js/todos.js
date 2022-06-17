// todos.js

/**
 * Module that manages todo data
 *
 * @exports todos IIFE module
 */
export const todos = (() => {
	const allTodos = load();

	/**
	 * Create new todo and add to allTodos
	 *
	 * @param {string} name
	 * @param {string} [details = ""]
	 * @param {Object} [dueDate = null]
	 * @param {string} [project = null]
	 * @param {boolean} [complete = false]
	 */
	function addTodo(
		name,
		details = "",
		dueDate = null,
		project = null,
		complete = false
	) {
		const created = new Date();
		const id = Math.floor(Math.random() * Date.now());

		allTodos.push({
			name,
			details,
			dueDate,
			project,
			complete,
			created,
			id,
		});
		save();
	}

	/**
	 * Delete all todos with given project
	 *
	 * @param {string} project
	 */
	function deleteProject(project) {
		for (let todo of allTodos) {
			if (todo.project === project) deleteTodo(todo.id);
		}
		save();
	}

	/**
	 * Delete todo with given id
	 *
	 * @param {number} id
	 */
	function deleteTodo(id) {
		const index = allTodos.findIndex((todo) => todo.id === id);
		if (index > -1) allTodos.splice(index, 1);
		save();
	}

	/**
	 * Replace value of given property with new given value
	 *
	 * @param {number} id
	 * @param {string} property
	 * @param {*} value
	 */
	function editTodo(id, property, value) {
		const index = allTodos.findIndex((todo) => todo.id === id);
		if (index > -1) {
			allTodos[index][property] = value;
		}
		save();
	}

	/**
	 * Return copy of allTodos array
	 *
	 * @returns {Array}
	 */
	function getAll() {
		return [...allTodos];
	}

	/**
	 * Load allTodos array from localStorage
	 *
	 * @returns {Array} todos from localStorage or empty
	 */
	function load() {
		const token = window.localStorage.getItem("allTodos");

		if (token) {
			const localTodos = JSON.parse(token);
			for (let todo of localTodos) {
				if (todo.dueDate) todo.dueDate = new Date(todo.dueDate);
				todo.created = new Date(todo.created);
			}
			return localTodos;
		}

		return [];
	}

	/**
	 * Save allTodos array to localStorage
	 */
	function save() {
		window.localStorage.setItem("allTodos", JSON.stringify(allTodos));
	}

	/**
	 * Toggle complete status of todo with given id
	 *
	 * @param {number} id
	 */
	function toggleComplete(id) {
		const index = allTodos.findIndex((todo) => todo.id === id);
		if (index > -1) {
			allTodos[index].complete === false
				? (allTodos[index].complete = true)
				: (allTodos[index].complete = false);
		}
		save();
	}

	return {
		addTodo,
		deleteTodo,
		deleteProject,
		editTodo,
		getAll,
		toggleComplete,
	};
})();
