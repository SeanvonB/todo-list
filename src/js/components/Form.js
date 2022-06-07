// Form.js

/**
 * Factory that creates DOM elements for input form modals
 *
 * TODO: Improve date input to account for local time
 *
 * @param {string} currentProject
 * @param {Object} editTodo
 * @returns {HTMLFormElement}
 */
import { format } from "date-fns";

export const Form = (currentProject, editTodo = false) => {
	const modal = document.createElement("dialog");
	modal.classList.add("close-modal");
	modal.setAttribute("open", "");

	const form = document.createElement("form");
	form.setAttribute("autocomplete", "off");
	form.setAttribute("method", "dialog");
	modal.appendChild(form);

	const header = document.createElement("h1");
	editTodo
		? (header.textContent = "Edit Todo")
		: (header.textContent = "Add Todo");
	form.appendChild(header);

	const name = document.createElement("div");
	const nameLabel = document.createElement("label");
	nameLabel.setAttribute("for", "name");
	nameLabel.textContent = "Name";
	const nameInput = document.createElement("input");
	nameInput.setAttribute("type", "text");
	nameInput.setAttribute("name", "name");
	nameInput.setAttribute("id", "name");
	nameInput.setAttribute("minlength", "1");
	nameInput.setAttribute("placeholder", "Required");
	nameInput.setAttribute("required", "");
	if (editTodo.name) nameInput.setAttribute("value", editTodo.name);
	name.appendChild(nameLabel);
	name.appendChild(nameInput);
	form.appendChild(name);

	const dueDate = document.createElement("div");
	const dueDateLabel = document.createElement("label");
	dueDateLabel.setAttribute("for", "dueDate");
	dueDateLabel.textContent = "Due Date";
	const dueDateInput = document.createElement("input");
	dueDateInput.setAttribute("type", "date");
	dueDateInput.setAttribute("name", "dueDate");
	dueDateInput.setAttribute("id", "dueDate");
	if (editTodo.dueDate) {
		const date = format(editTodo.dueDate, "yyyy-MM-dd");
		dueDateInput.setAttribute("value", date);
	}
	dueDate.appendChild(dueDateLabel);
	dueDate.appendChild(dueDateInput);
	form.appendChild(dueDate);

	const details = document.createElement("div");
	const detailsLabel = document.createElement("label");
	detailsLabel.setAttribute("for", "details");
	detailsLabel.textContent = "Details";
	const detailsInput = document.createElement("textarea");
	detailsInput.setAttribute("name", "details");
	detailsInput.setAttribute("id", "details");
	detailsInput.setAttribute("placeholder", "Optional");
	if (editTodo.details) detailsInput.value = editTodo.details;
	details.appendChild(detailsLabel);
	details.appendChild(detailsInput);
	form.appendChild(details);

	const projectInput = document.createElement("input");
	projectInput.setAttribute("type", "hidden");
	projectInput.setAttribute("name", "project");
	projectInput.setAttribute("id", "project");
	projectInput.setAttribute("value", currentProject);
	form.appendChild(projectInput);

	const idInput = document.createElement("input");
	idInput.setAttribute("type", "hidden");
	idInput.setAttribute("name", "id");
	idInput.setAttribute("id", "id");
	if (editTodo.id) idInput.setAttribute("value", editTodo.id);
	form.appendChild(idInput);

	const editInput = document.createElement("input");
	editInput.setAttribute("type", "hidden");
	editInput.setAttribute("name", "edit");
	editInput.setAttribute("id", "edit");
	if (editTodo) editInput.setAttribute("value", "true");
	form.appendChild(editInput);

	const submit = document.createElement("button");
	submit.setAttribute("type", "submit");
	submit.setAttribute("id", "submit");
	submit.setAttribute("value", "Save");
	submit.textContent = "Save";
	form.appendChild(submit);

	const close = document.createElement("button");
	close.classList.add("close-modal");
	const closeIcon = document.createElement("i");
	closeIcon.classList.add("far", "fa-times-circle");
	close.appendChild(closeIcon);
	form.appendChild(close);

	return modal;
};
