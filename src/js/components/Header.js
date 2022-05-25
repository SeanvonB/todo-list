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

	const nameHeader = document.createElement("th");
	nameHeader.setAttribute("scope", "col");
	const nameBtn = document.createElement("button");
	nameBtn.textContent = "Name";
	nameHeader.appendChild(nameBtn);
	row.appendChild(nameHeader);

	const dueHeader = document.createElement("th");
	dueHeader.setAttribute("scope", "col");
	const dueBtn = document.createElement("button");
	dueBtn.textContent = "Due Date";
	dueHeader.appendChild(dueBtn);
	row.appendChild(dueHeader);

	const completeHeader = document.createElement("th");
	completeHeader.setAttribute("scope", "col");
	const completeBtn = document.createElement("button");
	completeBtn.textContent = "Complete";
	completeHeader.appendChild(completeBtn);
	row.appendChild(completeHeader);

	const urgentHeader = document.createElement("th");
	urgentHeader.setAttribute("scope", "col");
	const urgentBtn = document.createElement("button");
	urgentBtn.textContent = "Urgent";
	urgentHeader.appendChild(urgentBtn);
	row.appendChild(urgentHeader);

	const createdHeader = document.createElement("th");
	createdHeader.setAttribute("scope", "col");
	const createdBtn = document.createElement("button");
	createdBtn.textContent = "Created";
	createdHeader.appendChild(createdBtn);
	row.appendChild(createdHeader);

	const editHeader = document.createElement("th");
	row.appendChild(editHeader);

	return row;
};
