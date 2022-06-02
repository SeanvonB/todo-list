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
	 * Delete existing todo component and associated todo
	 *
	 * @param {HTMLTableRowElement} element
	 */
	function deleteTodo(element) {
		const id = element.dataset.todoId;

		element.removeEventListener("click", handleTask);
		element.remove();

		todos.deleteTodo(id);
	}

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
	 * Handle user input to form component
	 *
	 * @param {Event} e
	 */
	function handleForm(e) {}

	/**
	 * Handle user input to header component
	 *
	 * @param {Event} e
	 */
	function handleHeader(e) {
		const isAscending = toggleAscending(e.target);

		if (e.target.classList.contains("complete")) sortTable(2, isAscending);
		if (e.target.classList.contains("name")) sortTable(3, isAscending);
		if (e.target.classList.contains("due-date")) sortTable(4, isAscending);
		if (e.target.classList.contains("created")) sortTable(5, isAscending);
	}

	/**
	 * Handle user input to menu component
	 *
	 * @param {Event} e
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
	 *
	 * @param {Event} e
	 */
	function handleTask(e) {
		const chevron = e.currentTarget.querySelector(".chevron");
		const checkbox = e.currentTarget.querySelector(".toggle-complete");
		const editBtn = e.currentTarget.querySelector(".edit-todo");
		const deleteBtn = e.currentTarget.querySelector(".delete-todo");

		if (chevron.contains(e.target) || e.target === e.currentTarget)
			toggleDetails(e.currentTarget);
		if (checkbox.contains(e.target)) toggleComplete(checkbox);
		if (editBtn.contains(e.target)) renderForm();
		if (deleteBtn.contains(e.target)) deleteTodo(e.currentTarget);
	}

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
			tableHead.firstChild.removeEventListener("click", handleHeader);
			tableHead.removeChild(tableHead.firstChild);
		}

		const row = Header();
		row.addEventListener("click", handleHeader);
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
			navContainer.firstChild.removeEventListener("click", handleMenu);
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
			tableBody.firstChild.removeEventListener("click", handleTask);
			tableBody.removeChild(tableBody.firstChild);
		}

		for (let todo of todos) {
			const row = Task(todo);
			row.addEventListener("click", handleTask);
			tableBody.appendChild(row);
		}
	}

	/**
	 * Sort todo table rows by given column number
	 *
	 * @param {number} column
	 * @param {boolean} [ascending = true]
	 */
	function sortTable(column, ascending = true) {
		const rows = [...tableBody.querySelectorAll("tr")];
		const select = `td:nth-child(${column})`;

		function sortAsc(a, b) {
			return a > b ? 1 : a < b ? -1 : 0;
		}
		function sortDesc(a, b) {
			return b > a ? 1 : b < a ? -1 : 0;
		}

		rows.sort((row1, row2) => {
			const value1 = row1.querySelector(select).textContent;
			const value2 = row2.querySelector(select).textContent;

			return ascending
				? sortAsc(value1, value2)
				: sortDesc(value1, value2);
		});
		for (let row of rows) tableBody.appendChild(row);
	}

	/**
	 * Toggle ascending/descending status of given element
	 *
	 * @param {HTMLElement} element
	 * @returns {boolean} isAscending
	 */
	function toggleAscending(element) {
		if (element.classList.contains("ascending")) {
			element.classList.remove("ascending");
			element.classList.add("descending");

			return false;
		}
		if (element.classList.contains("descending")) {
			element.classList.remove("descending");
			element.classList.add("ascending");

			return true;
		}
		element.classList.add("ascending");

		return true;
	}

	/**
	 * Toggle complete status of given element
	 *
	 * @param {HTMLButtonElement} element
	 * @returns {boolean} isComplete
	 */
	function toggleComplete(element) {
		const icon = document.createElement("i");
		const id = element.parentNode.dataset.todoId;

		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}

		if (element.classList.contains("complete")) {
			element.classList.remove("complete");
			element.classList.add("incomplete");
			element.parentNode.classList.remove("complete");
			element.parentNode.classList.add("incomplete");
			icon.classList.add("far", "fa-circle");
			element.appendChild(icon);

			todos.toggleComplete(id);

			return false;
		}
		if (element.classList.contains("incomplete")) {
			element.classList.remove("incomplete");
			element.classList.add("complete");
			element.parentNode.classList.remove("incomplete");
			element.parentNode.classList.add("complete");
			icon.classList.add("far", "fa-check-circle");
			element.appendChild(icon);

			todos.toggleComplete(id);

			return true;
		}
	}

	/**
	 * Toggle show/hide status of given element
	 *
	 * @param {HTMLTableRowElement} element
	 * @returns {boolean} isShown
	 */
	function toggleDetails(element) {
		const chevron = element.querySelector(".chevron");
		const detailsDrawer = element.querySelector(".details");
		const icon = document.createElement("i");

		while (chevron.firstChild) {
			chevron.removeChild(chevron.firstChild);
		}

		if (chevron.classList.contains("hide-details")) {
			chevron.classList.remove("hide-details");
			chevron.classList.add("show-details");
			detailsDrawer.classList.remove("hide-details");
			detailsDrawer.classList.add("show-details");
			icon.classList.add("fas", "fa-chevron-down");
			chevron.appendChild(icon);

			return true;
		}
		if (chevron.classList.contains("show-details")) {
			chevron.classList.remove("show-details");
			chevron.classList.add("hide-details");
			detailsDrawer.classList.remove("show-details");
			detailsDrawer.classList.add("hide-details");
			icon.classList.add("fas", "fa-chevron-right");
			chevron.appendChild(icon);

			return false;
		}
	}

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
		navContainer.querySelector(`li.${name}`).classList.add("current");
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
			if (todo.dueDate) return todo.dueDate.split("T")[0] < today;
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
					todo.dueDate.split("T")[0] > today &&
					todo.dueDate.split("T")[0] <= nextWeek
				);
		});

		updateCurrent("upcoming");
		renderHeader();
		renderTasks(upcomingTodos);
	}

	return { init };
})();
