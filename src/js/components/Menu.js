// Menu.js

/**
 * Factory that creates DOM elements for navigation menus
 *
 * @param {Array} projects
 * @returns {HTMLUListElement}
 */
export const Menu = (projects = []) => {
	const navContainer = document.createElement("nav");

	const menuDefaults = document.createElement("ul");
	menuDefaults.classList.add("menu", "defaults");

	const home = document.createElement("li");
	home.classList.add("home");
	const homeIcon = document.createElement("i");
	homeIcon.classList.add("fas", "fa-home");
	const homeLabel = document.createElement("h2");
	homeLabel.textContent = "Home";
	home.appendChild(homeIcon);
	home.appendChild(homeLabel);
	menuDefaults.appendChild(home);

	const today = document.createElement("li");
	today.classList.add("today");
	const todayIcon = document.createElement("i");
	todayIcon.classList.add("fas", "fa-calendar-day");
	const todayLabel = document.createElement("h2");
	todayLabel.textContent = "Today";
	today.appendChild(todayIcon);
	today.appendChild(todayLabel);
	menuDefaults.appendChild(today);

	const upcoming = document.createElement("li");
	upcoming.classList.add("upcoming");
	const upcomingIcon = document.createElement("i");
	upcomingIcon.classList.add("fas", "fa-calendar-week");
	const upcomingLabel = document.createElement("h2");
	upcomingLabel.textContent = "Upcoming";
	upcoming.appendChild(upcomingIcon);
	upcoming.appendChild(upcomingLabel);
	menuDefaults.appendChild(upcoming);

	const overdue = document.createElement("li");
	overdue.classList.add("overdue");
	const overdueIcon = document.createElement("i");
	overdueIcon.classList.add("fas", "fa-calendar-times");
	const overdueLabel = document.createElement("h2");
	overdueLabel.textContent = "Overdue";
	overdue.appendChild(overdueIcon);
	overdue.appendChild(overdueLabel);
	menuDefaults.appendChild(overdue);
	navContainer.appendChild(menuDefaults);

	const hRule = document.createElement("hr");
	navContainer.appendChild(hRule);

	const menuProjects = document.createElement("ul");
	menuProjects.classList.add("menu", "projects");
	for (let project of projects) {
		const item = document.createElement("li");
		item.setAttribute("data-project", project);
		item.classList.add("project");
		const projectIcon = document.createElement("i");
		projectIcon.classList.add("fas", "fa-list");
		const projectLabel = document.createElement("h2");
		projectLabel.textContent = project;
		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete-project");
		const deleteIcon = document.createElement("i");
		deleteIcon.classList.add("fas", "fa-times");
		item.appendChild(projectIcon);
		item.appendChild(projectLabel);
		deleteBtn.appendChild(deleteIcon);
		item.appendChild(deleteBtn);
		menuProjects.appendChild(item);
	}
	navContainer.appendChild(menuProjects);

	const form = document.createElement("form");
	form.setAttribute("autocomplete", "off");
	form.setAttribute("method", "dialog");
	const inputWrapper = document.createElement("div");
	inputWrapper.classList.add("input-wrapper");
	const input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("name", "project");
	input.setAttribute("id", "project");
	input.setAttribute("placeholder", "Name");
	input.setAttribute("minlength", "1");
	input.setAttribute("required", "");
	const addBtn = document.createElement("button");
	addBtn.setAttribute("type", "submit");
	addBtn.setAttribute("id", "submit");
	const addIcon = document.createElement("i");
	addIcon.classList.add("fas", "fa-plus");
	const label = document.createElement("label");
	label.setAttribute("for", "project");
	label.textContent = "Add Project";
	addBtn.appendChild(addIcon);
	inputWrapper.appendChild(input);
	inputWrapper.appendChild(addBtn);
	form.appendChild(label);
	form.appendChild(inputWrapper);
	navContainer.appendChild(form);

	return navContainer;
};
