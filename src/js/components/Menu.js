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
	const homeText = document.createElement("h1");
	homeText.innerText = "Home";
	home.appendChild(homeText);
	menu.appendChild(home);

	const today = document.createElement("li");
	today.classList.add("today");
	const todayText = document.createElement("h1");
	todayText.innerText = "Today";
	today.appendChild(todayText);
	menu.appendChild(today);

	const upcoming = document.createElement("li");
	upcoming.classList.add("upcoming");
	const upcomingText = document.createElement("h1");
	upcomingText.innerText = "Upcoming";
	upcoming.appendChild(upcomingText);
	menu.appendChild(upcoming);

	const anytime = document.createElement("li");
	anytime.classList.add("anytime");
	const anytimeText = document.createElement("h1");
	anytimeText.innerText = "Anytime";
	anytime.appendChild(anytimeText);
	menu.appendChild(anytime);

	for (let project of projects) {
		const item = document.createElement("li");
		item.setAttribute("data-project", project);
		item.classList.add(project);
		const itemText = document.createElement("h1");
		itemText.innerText = project.charAt(0).toUpperCase() + project.slice(1);
		const deleteBtn = document.createElement("button");
		deleteBtn.setAttribute("data-project", project);
		deleteBtn.classList.add("delete-project");
		deleteBtn.innerText = "X";
		item.appendChild(itemText);
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
