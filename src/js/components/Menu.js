// Menu.js

/**
 * Factory that creates DOM elements for navigation menus
 *
 * @param {Array} projects
 * @returns {HTMLUListElement}
 */
export const Menu = (projects = []) => {
	const menu = document.createElement("ul");

	const home = document.createElement("li");
	home.classList.add("home");
	home.textContent = "Home";
	menu.appendChild(home);

	const today = document.createElement("li");
	today.classList.add("today");
	today.textContent = "Today";
	menu.appendChild(today);

	const upcoming = document.createElement("li");
	upcoming.classList.add("upcoming");
	upcoming.textContent = "Upcoming";
	menu.appendChild(upcoming);

	const overdue = document.createElement("li");
	overdue.classList.add("overdue");
	overdue.textContent = "Overdue";
	menu.appendChild(overdue);

	for (let project of projects) {
		const item = document.createElement("li");
		item.setAttribute("data-project", project);
		item.classList.add(project);
		item.textContent = project.charAt(0).toUpperCase() + project.slice(1);
		const deleteBtn = document.createElement("button");
		deleteBtn.setAttribute("data-project", project);
		deleteBtn.classList.add("delete-project");
		deleteBtn.textContent = "X";
		item.appendChild(deleteBtn);
		menu.appendChild(item);
	}

	const form = document.createElement("form");
	form.setAttribute("autocomplete", "off");
	form.setAttribute("method", "dialog");
	const label = document.createElement("label");
	label.setAttribute("for", "project");
	label.textContent = "Add New Project";
	const input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("name", "project");
	input.setAttribute("id", "project");
	input.setAttribute("minlength", "1");
	input.setAttribute("required", "");
	const addBtn = document.createElement("button");
	addBtn.setAttribute("type", "submit");
	addBtn.setAttribute("id", "submit");
	addBtn.textContent = "+";
	form.appendChild(label);
	form.appendChild(input);
	form.appendChild(addBtn);
	menu.appendChild(form);

	return menu;
};
