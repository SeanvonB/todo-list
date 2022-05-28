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
	home.innerText = "Home";
	menu.appendChild(home);

	const today = document.createElement("li");
	today.classList.add("today");
	today.innerText = "Today";
	menu.appendChild(today);

	const upcoming = document.createElement("li");
	upcoming.classList.add("upcoming");
	upcoming.innerText = "Upcoming";
	menu.appendChild(upcoming);

	const overdue = document.createElement("li");
	overdue.classList.add("overdue");
	overdue.innerText = "Overdue";
	menu.appendChild(overdue);

	for (let project of projects) {
		const item = document.createElement("li");
		item.setAttribute("data-project", project);
		item.classList.add(project);
		item.innerText = project.charAt(0).toUpperCase() + project.slice(1);
		const deleteBtn = document.createElement("button");
		deleteBtn.setAttribute("data-project", project);
		deleteBtn.classList.add("delete-project");
		deleteBtn.innerText = "X";
		item.appendChild(deleteBtn);
		menu.appendChild(item);
	}

	const newProject = document.createElement("li");
	const input = document.createElement("div");
	input.classList.add("hidden");
	const inputLabel = document.createElement("label");
	inputLabel.setAttribute("for", "project");
	inputLabel.innerText = "Add New Project";
	const inputField = document.createElement("input");
	inputField.setAttribute("type", "text");
	inputField.setAttribute("name", "project");
	inputField.setAttribute("id", "project");
	inputField.setAttribute("minlength", "1");
	const addBtn = document.createElement("button");
	addBtn.classList.add("add-project");
	addBtn.innerText = "+";
	input.appendChild(inputLabel);
	input.appendChild(inputField);
	newProject.appendChild(input);
	newProject.appendChild(addBtn);
	menu.appendChild(newProject);

	return menu;
};
