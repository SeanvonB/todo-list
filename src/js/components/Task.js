// Task.js

/**
 * Factory that creates DOM elements for individual todo tasks
 *
 * @param {Object} todo
 * @returns {HTMLTableRowElement}
 */
import { format, formatDistanceToNowStrict } from "date-fns";

export const Task = (todo) => {
	const details = todo.details.trim();
	const row = document.createElement("tr");
	row.setAttribute("data-todo-id", todo.id);

	const chevron = document.createElement("td");
	chevron.classList.add("chevron");
	if (details) {
		const chevronBtn = document.createElement("button");
		chevronBtn.classList.add("show-details");
		const chevronIcon = document.createElement("i");
		chevronIcon.classList.add("fas", "fa-chevron-right");
		chevronBtn.appendChild(chevronIcon);
		chevron.appendChild(chevronBtn);
	} else {
		chevron.classList.add("hidden");
	}
	row.appendChild(chevron);

	const complete = document.createElement("td");
	complete.classList.add("toggle-complete");
	const completeBtn = document.createElement("button");
	const completeIcon = document.createElement("i");
	if (todo.complete === true) {
		complete.classList.add("complete");
		completeBtn.classList.add("complete");
		completeIcon.classList.add("far", "fa-check-circle");
	}
	if (todo.complete === false) {
		complete.classList.add("incomplete");
		completeBtn.classList.add("incomplete");
		completeIcon.classList.add("far", "fa-circle");
	}
	completeBtn.appendChild(completeIcon);
	complete.appendChild(completeBtn);
	row.appendChild(complete);

	const name = document.createElement("td");
	name.classList.add("name");
	name.textContent = todo.name;
	row.appendChild(name);

	const dueDate = document.createElement("td");
	dueDate.classList.add("due-date");
	if (todo.dueDate) {
		window.innerWidth > 440
			? (dueDate.textContent = format(todo.dueDate, "MMM do, yyyy"))
			: (dueDate.textContent = format(todo.dueDate, "MMM do"));
	}
	row.appendChild(dueDate);

	const created = document.createElement("td");
	created.classList.add("created");
	created.textContent = `${formatDistanceToNowStrict(todo.created)} ago`;
	row.appendChild(created);

	const edit = document.createElement("td");
	edit.classList.add("edit-todo");
	const editBtn = document.createElement("button");
	const editIcon = document.createElement("i");
	editIcon.classList.add("fas", "fa-ellipsis-v");
	editBtn.appendChild(editIcon);
	edit.appendChild(editBtn);
	row.appendChild(edit);

	const deleteTodo = document.createElement("td");
	deleteTodo.classList.add("delete-todo");
	const deleteBtn = document.createElement("button");
	const deleteIcon = document.createElement("i");
	deleteIcon.classList.add("fas", "fa-times");
	deleteBtn.appendChild(deleteIcon);
	deleteTodo.appendChild(deleteBtn);
	row.appendChild(deleteTodo);

	const detailsDrawer = document.createElement("td");
	detailsDrawer.classList.add("details");
	if (details) {
		detailsDrawer.classList.add("hidden");
		const detailsTxt = document.createElement("p");
		detailsTxt.textContent = details;
		detailsDrawer.appendChild(detailsTxt);
	} else {
		detailsDrawer.classList.add("none");
	}
	row.appendChild(detailsDrawer);

	return row;
};
