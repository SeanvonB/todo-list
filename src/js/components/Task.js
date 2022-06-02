// Task.js

/**
 * Factory that creates DOM elements for individual todo tasks
 *
 * @param {Object} todo
 * @returns {HTMLTableRowElement}
 */
import { format, formatDistanceToNow, parseISO } from "date-fns";

export const Task = (todo) => {
	const details = todo.details.trim();
	const row = document.createElement("tr");

	const chevron = document.createElement("td");
	chevron.classList.add("chevron");
	const chevronIcon = document.createElement("i");
	if (details) {
		chevron.classList.add("hide-details");
		chevronIcon.classList.add("fas", "fa-chevron-right");
	}
	chevron.appendChild(chevronIcon);
	row.appendChild(chevron);

	const complete = document.createElement("td");
	const completeBtn = document.createElement("button");
	completeBtn.setAttribute("data-todo-id", todo.id);
	completeBtn.classList.add("toggle-complete");
	const completeIcon = document.createElement("i");
	if (todo.complete === true) {
		complete.classList.add("complete");
		completeBtn.classList.add("complete");
		completeIcon.classList.add("far", "fa-check-circle");
	}
	if (todo.complete === false) {
		complete.classList.add("complete");
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
	if (todo.dueDate)
		dueDate.textContent = format(new Date(todo.dueDate), "MMM do, yyyy");
	row.appendChild(dueDate);

	const created = document.createElement("td");
	created.classList.add("created");
	created.textContent = `${formatDistanceToNow(new Date(todo.created))} ago`;
	row.appendChild(created);

	const edit = document.createElement("td");
	const editBtn = document.createElement("button");
	editBtn.setAttribute("data-todo-id", todo.id);
	editBtn.classList.add("edit-todo");
	const editIcon = document.createElement("i");
	editIcon.classList.add("fas", "fa-ellipsis-v");
	editBtn.appendChild(editIcon);
	edit.appendChild(editBtn);
	row.appendChild(edit);

	const detailsDrawer = document.createElement("td");
	detailsDrawer.classList.add("details");
	if (details) {
		detailsDrawer.textContent = details;
		detailsDrawer.classList.add("hide-details");
	}
	row.appendChild(detailsDrawer);

	return row;
};
