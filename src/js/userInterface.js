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
	const addButton = document.querySelector("button.add-todo");
	const dialogContainer = document.querySelector("aside.dialog-container");
	const menuButton = document.querySelector("button.toggle-menu");
	const navContainer = document.querySelector("nav.nav-container");
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

		addButton.addEventListener("click", () => renderForm());
		menuButton.addEventListener("click", toggleMenu);
		document.body.addEventListener("click", handleUnfocus);

		renderMenu();
		viewHome();
	}

	/**
	 * Create new project folder and view it
	 *
	 * @param {string} name
	 */
	function addProject(name) {
		allProjects.push(name);

		renderMenu();
		viewProject(name);
	}

	/**
	 * Create new todo
	 *
	 * @param {Object} form
	 */
	function addTodo(form) {
		const name = form.name.value;
		const details = form.details.value;

		let dueDate = form.dueDate.value;
		if (dueDate) dueDate = new Date(`${dueDate} 00:00:00`);

		let project = form.project.value;
		if (
			project === "home" ||
			project === "today" ||
			project === "upcoming" ||
			project === "overdue"
		) {
			project = null;
		}

		todos.addTodo(name, details, dueDate, project);
		allTodos = todos.getAll();

		const newTodo = allTodos[allTodos.length - 1];
		const newRow = Task(newTodo);
		newRow.addEventListener("click", handleTask);
		tableBody.appendChild(newRow);
	}

	/**
	 * Delete existing project folder and associated todos
	 *
	 * @param {string} project
	 */
	function deleteProject(project) {
		const index = allProjects.indexOf(project);
		if (index > -1) allProjects.splice(index, 1);

		todos.deleteProject(project);
		allTodos = todos.getAll();

		renderMenu();
		project === currentProject ? viewHome() : viewCurrent();
	}

	/**
	 * Delete existing todo component and associated todo
	 *
	 * @param {HTMLTableRowElement} element
	 */
	function deleteTodo(element) {
		const id = +element.dataset.todoId;

		todos.deleteTodo(id);
		allTodos = todos.getAll();

		element.removeEventListener("click", handleTask);
		element.remove();
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
	function editTodo(id, form) {
		const name = form.name.value;
		const details = form.details.value;
		const todo = allTodos.find((todo) => todo.id === id);

		let dueDate = form.dueDate.value;
		if (dueDate) dueDate = new Date(`${dueDate} 00:00:00`);

		if (name !== todo.name) todos.editTodo(id, "name", name);
		if (details !== todo.details) todos.editTodo(id, "details", details);
		if (dueDate !== todo.dueDate) todos.editTodo(id, "dueDate", dueDate);
		allTodos = todos.getAll();

		const newTodo = allTodos.find((todo) => todo.id === id);
		const newRow = Task(newTodo);
		newRow.addEventListener("click", handleTask);
		const oldRow = tableBody.querySelector(`[data-todo-id="${id}"]`);
		oldRow.removeEventListener("click", handleTask);
		oldRow.replaceWith(newRow);
	}

	/**
	 * Handle user input to form component
	 *
	 * @param {Event} e
	 */
	function handleForm(e) {
		const closeBtn = e.currentTarget.querySelector("button.close-modal");

		if (e.target === e.currentTarget || closeBtn.contains(e.target)) {
			e.currentTarget.removeEventListener("click", handleForm);
			e.currentTarget.removeEventListener("submit", handleForm);
			e.currentTarget.remove();
		}
		if (e.type === "submit") {
			const form = e.target.elements;
			const id = +form.id.value;
			const editMode = form.edit.value;

			editMode ? editTodo(id, form) : addTodo(form);
			e.currentTarget.removeEventListener("click", handleForm);
			e.currentTarget.removeEventListener("submit", handleForm);
			e.currentTarget.remove();
		}
	}

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
		if (e.type === "submit") {
			const name = e.target.elements.project.value.toLowerCase();
			addProject(name);
			return;
		}

		if (e.target.closest("li")) {
			const item = e.target.closest("li");
			if (item.classList.contains("home")) viewHome();
			if (item.classList.contains("today")) viewToday();
			if (item.classList.contains("upcoming")) viewUpcoming();
			if (item.classList.contains("overdue")) viewOverdue();
			if (item.classList.contains("project")) {
				const button = item.querySelector("button.delete-project");
				const project = item.dataset.project;

				button.contains(e.target)
					? deleteProject(project)
					: viewProject(project);
			}
		}
	}

	/**
	 * Handle user input when toggle elements are open
	 *
	 * @param {Event} e
	 */
	function handleUnfocus(e) {
		if (
			navContainer.classList.contains("open") &&
			!navContainer.contains(e.target) &&
			!menuButton.contains(e.target)
		) {
			toggleMenu();
		}
	}

	/**
	 * Handle user input to task component
	 *
	 * @param {Event} e
	 */
	function handleTask(e) {
		const complete = e.currentTarget.querySelector(".toggle-complete");
		const edit = e.currentTarget.querySelector(".edit-todo");
		const deleteTarget = e.currentTarget.querySelector(".delete-todo");
		const id = +e.currentTarget.dataset.todoId;
		const todo = allTodos.find((todo) => todo.id === id);

		if (complete.contains(e.target)) toggleComplete(complete);
		else if (edit.contains(e.target)) renderForm(todo);
		else if (deleteTarget.contains(e.target)) deleteTodo(e.currentTarget);
		else toggleDetails(e.currentTarget);
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
		while (dialogContainer.firstChild) {
			dialogContainer.firstChild.removeEventListener("click", handleForm);
			dialogContainer.firstChild.removeEventListener(
				"submit",
				handleForm
			);
			dialogContainer.removeChild(dialogContainer.firstChild);
		}

		const form = Form(currentProject, editTodo);
		form.addEventListener("click", handleForm);
		form.addEventListener("submit", handleForm);
		dialogContainer.appendChild(form);
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
		navContainer.appendChild(form);
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

		let criteria = (row) => row.querySelector(select).textContent;
		if (column === 2) {
			criteria = (row) => row.querySelector(select).className;
		}

		function sortAsc(a, b) {
			return a > b ? 1 : a < b ? -1 : 0;
		}
		function sortDesc(a, b) {
			return b > a ? 1 : b < a ? -1 : 0;
		}

		rows.sort((row1, row2) => {
			const value1 = criteria(row1);
			const value2 = criteria(row2);

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
	 * Toggle complete status of the button on given element
	 *
	 * @param {HTMLTableCellElement} element
	 * @returns {boolean} isComplete
	 */
	function toggleComplete(element) {
		const icon = document.createElement("i");
		const id = +element.closest("tr").dataset.todoId;
		const button = element.querySelector("button");

		while (button.firstChild) {
			button.removeChild(button.firstChild);
		}

		if (button.classList.contains("complete")) {
			button.classList.remove("complete");
			button.classList.add("incomplete");
			element.classList.remove("complete");
			element.classList.add("incomplete");
			icon.classList.add("far", "fa-circle");
			button.appendChild(icon);

			todos.toggleComplete(id);

			return false;
		}
		if (button.classList.contains("incomplete")) {
			button.classList.remove("incomplete");
			button.classList.add("complete");
			element.classList.remove("incomplete");
			element.classList.add("complete");
			icon.classList.add("far", "fa-check-circle");
			button.appendChild(icon);

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

		if (chevron.classList.contains("hidden")) return false;

		const chevronBtn = chevron.querySelector("button");
		const detailsDrawer = element.querySelector(".details");
		const icon = document.createElement("i");

		while (chevronBtn.firstChild) {
			chevronBtn.removeChild(chevronBtn.firstChild);
		}

		if (detailsDrawer.classList.contains("hidden")) {
			detailsDrawer.classList.remove("hidden");
			chevronBtn.classList.remove("show-details");
			chevronBtn.classList.add("hide-details");
			icon.classList.add("fas", "fa-chevron-down");
			chevronBtn.appendChild(icon);

			return true;
		}
		if (!detailsDrawer.classList.contains("hidden")) {
			detailsDrawer.classList.add("hidden");
			chevronBtn.classList.remove("hide-details");
			chevronBtn.classList.add("show-details");
			icon.classList.add("fas", "fa-chevron-right");
			chevronBtn.appendChild(icon);

			return false;
		}
	}

	/**
	 * Toggle open/close state of nav menu
	 *
	 * @returns {boolean} isOpen
	 */
	function toggleMenu() {
		if (navContainer.classList.contains("open")) {
			navContainer.classList.remove("open");
			navContainer.classList.add("closed");

			return false;
		}

		navContainer.classList.remove("closed");
		navContainer.classList.add("open");

		return true;
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
	 * Refresh current view
	 */
	function viewCurrent() {
		switch (currentProject) {
			case "home":
				viewHome();
				break;
			case "today":
				viewToday();
				break;
			case "upcoming":
				viewUpcoming();
				break;
			case "overdue":
				viewOverdue();
				break;
			default:
				viewProject(currentProject);
		}
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
		const today = new Date(new Date().setHours(0, 0, 0, 0));
		const overdueTodos = allTodos.filter((todo) => {
			if (todo.dueDate) {
				return todo.dueDate < today;
			}
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
		let today = new Date(new Date().setHours(0, 0, 0, 0));
		const todayTodos = allTodos.filter((todo) => {
			if (todo.dueDate) {
				return todo.dueDate.toString() === today.toString();
			}
		});

		updateCurrent("today");
		renderHeader();
		renderTasks(todayTodos);
	}

	/**
	 * Change view to upcoming folder
	 */
	function viewUpcoming() {
		const today = new Date(new Date().setHours(0, 0, 0, 0));
		let nextWeek = new Date();
		nextWeek.setDate(today.getDate() + 7);
		const upcomingTodos = allTodos.filter((todo) => {
			if (todo.dueDate) {
				return todo.dueDate >= today && todo.dueDate <= nextWeek;
			}
		});

		updateCurrent("upcoming");
		renderHeader();
		renderTasks(upcomingTodos);
	}

	return { init };
})();
