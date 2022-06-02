// Header.js

/**
 * Factory that creates DOM elements for list headers
 *
 * @returns {HTMLTableRowElement}
 */
export const Header = () => {
	const row = document.createElement("tr");

	const chevronHeader = document.createElement("th");
	row.appendChild(chevronHeader);

	const completeHeader = document.createElement("th");
	completeHeader.setAttribute("scope", "col");
	const completeBtn = document.createElement("button");
	completeBtn.classList.add("complete");
	completeBtn.textContent = "Complete";
	completeHeader.appendChild(completeBtn);
	row.appendChild(completeHeader);

	const nameHeader = document.createElement("th");
	nameHeader.setAttribute("scope", "col");
	const nameBtn = document.createElement("button");
	nameBtn.classList.add("name");
	nameBtn.textContent = "Name";
	nameHeader.appendChild(nameBtn);
	row.appendChild(nameHeader);

	const dueHeader = document.createElement("th");
	dueHeader.setAttribute("scope", "col");
	const dueBtn = document.createElement("button");
	dueBtn.classList.add("due-date");
	dueBtn.textContent = "Due Date";
	dueHeader.appendChild(dueBtn);
	row.appendChild(dueHeader);

	const createdHeader = document.createElement("th");
	createdHeader.setAttribute("scope", "col");
	const createdBtn = document.createElement("button");
	createdBtn.classList.add("created");
	createdBtn.textContent = "Created";
	createdHeader.appendChild(createdBtn);
	row.appendChild(createdHeader);

	return row;
};
