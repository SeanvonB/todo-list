// Task.js

/**
 * Factory that creates DOM elements for individual todo tasks
 *
 * TODO: Replace Unicode symbols with vector icons
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
	if (details) {
		chevron.classList.add("hide-details");
		chevron.innerText = "›";
	}
	row.appendChild(chevron);

	const name = document.createElement("td");
	name.classList.add("name");
	name.innerText = todo.name;
	row.appendChild(name);

	const dueDate = document.createElement("td");
	dueDate.classList.add("due-date");
	if (todo.dueDate) dueDate.innerText = format(todo.dueDate, "MMM.do");
	row.appendChild(dueDate);

	const complete = document.createElement("td");
	const completeBtn = document.createElement("button");
	completeBtn.setAttribute("data-todo-id", todo.id);
	completeBtn.classList.add("toggle-complete");
	completeBtn.innerText = "✔";
	todo.complete
		? completeBtn.classList.add("complete")
		: completeBtn.classList.add("incomplete");
	complete.appendChild(completeBtn);
	row.appendChild(complete);

	const urgent = document.createElement("td");
	const urgentBtn = document.createElement("button");
	urgentBtn.setAttribute("data-todo-id", todo.id);
	urgentBtn.classList.add("toggle-urgent");
	urgentBtn.innerText = "❗";
	todo.urgent
		? urgentBtn.classList.add("urgent")
		: urgentBtn.classList.add("nonurgent");
	urgent.appendChild(urgentBtn);
	row.appendChild(urgent);

	const created = document.createElement("td");
	created.classList.add("created");
	created.innerText = `${formatDistanceToNow(parseISO(todo.created))} ago`;
	row.appendChild(created);

	const edit = document.createElement("td");
	const editBtn = document.createElement("button");
	editBtn.setAttribute("data-todo-id", todo.id);
	editBtn.classList.add("edit-todo");
	editBtn.innerText = "🖉";
	edit.appendChild(editBtn);
	row.appendChild(edit);

	const detailsDrawer = document.createElement("td");
	detailsDrawer.classList.add("details");
	if (details) {
		detailsDrawer.innerText = details;
		detailsDrawer.classList.add("hide-details");
	}
	row.appendChild(detailsDrawer);

	return row;
};
