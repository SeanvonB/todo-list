// Form.js

/**
 * Factory that creates DOM elements for input form modals
 *
 * TODO: Improve date input to account for local time
 *
 * @param {string} project
 * @param {Object} editTodo
 * @returns {HTMLFormElement}
 */
export const Form = (project = null, editTodo = false) => {
	const modal = document.createElement("dialog");
	modal.classList.add("modal", "close-modal");
	modal.setAttribute("open", "");

	const header = document.createElement("h1");
	editTodo
		? (header.textContent = "Edit Todo")
		: (header.textContent = "Add Todo");
	modal.appendChild(header);

	const close = document.createElement("button");
	close.classList.add("close-modal");
	close.innerText = "X";
	modal.appendChild(close);

	const form = document.createElement("form");
	form.setAttribute("method", "dialog");
	modal.appendChild(form);

	const name = document.createElement("div");
	const nameLabel = document.createElement("label");
	nameLabel.setAttribute("for", "name");
	nameLabel.innerText = "Name";
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

	const details = document.createElement("div");
	const detailsLabel = document.createElement("label");
	detailsLabel.setAttribute("for", "details");
	detailsLabel.innerText = "Details";
	const detailsInput = document.createElement("textarea");
	detailsInput.setAttribute("name", "details");
	detailsInput.setAttribute("id", "details");
	if (editTodo.details) detailsInput.setAttribute("value", editTodo.details);
	details.appendChild(detailsLabel);
	details.appendChild(detailsInput);
	form.appendChild(details);

	const dueDate = document.createElement("div");
	const dueDateLabel = document.createElement("label");
	dueDateLabel.setAttribute("for", "dueDate");
	dueDateLabel.innerText = "Due Date";
	const dueDateInput = document.createElement("input");
	dueDateInput.setAttribute("type", "date");
	dueDateInput.setAttribute("name", "dueDate");
	dueDateInput.setAttribute("id", "dueDate");
	dueDateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
	if (editTodo.dueDate)
		dueDateInput.setAttribute(
			"value",
			editTodo.dueDate.toISOString().split("T")[0]
		);
	dueDate.appendChild(dueDateLabel);
	dueDate.appendChild(dueDateInput);
	form.appendChild(dueDate);

	const projectInput = document.createElement("input");
	projectInput.setAttribute("type", "hidden");
	projectInput.setAttribute("name", "project");
	projectInput.setAttribute("id", "project");
	projectInput.setAttribute("value", project);
	form.appendChild(projectInput);

	const editInput = document.createElement("input");
	editInput.setAttribute("type", "hidden");
	editInput.setAttribute("name", "edit");
	editInput.setAttribute("id", "edit");
	editInput.setAttribute("value", editTodo ? true : false);
	form.appendChild(editInput);

	const reset = document.createElement("button");
	reset.setAttribute("type", "reset");
	reset.setAttribute("id", "reset");
	reset.innerText = "Clear";
	form.appendChild(reset);

	const submit = document.createElement("button");
	submit.setAttribute("type", "submit");
	submit.setAttribute("id", "submit");
	submit.setAttribute("value", "Save");
	submit.innerText = "Save";
	form.appendChild(submit);

	return modal;
};