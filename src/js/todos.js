// todos.js

/**
 * Module that manages todo data
 *
 * NOTE: allTodos is converted to JSON format for localStorage, so methods
 * can't be stored directly on todo objects.
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
	 * @param {boolean} [urgent = false]
	 */
	function addTodo(
		name,
		details = "",
		dueDate = null,
		project = null,
		complete = false,
		urgent = false
	) {
		const created = new Date();
		const id = Math.floor(Math.random() * Date.now());

		/**
		 * Date objects will be converted to strings for localStorage; doing
		 * so immediately just ensures consistent type.
		 */
		dueDate = dueDate.toISOString();

		allTodos.push({
			name,
			details,
			dueDate,
			project,
			complete,
			urgent,
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
		if (index > -1 && allTodos[index][property]) {
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
		return token ? JSON.parse(token) : [];
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

	/**
	 * Toggle urgent status of todo with given id
	 *
	 * @param {number} id
	 */
	function toggleUrgent(id) {
		const index = allTodos.findIndex((todo) => todo.id === id);
		if (index > -1) {
			allTodos[index].urgent === false
				? (allTodos[index].urgent = true)
				: (allTodos[index].urgent = false);
		}
		save();
	}

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
