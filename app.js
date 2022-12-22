// Globals 
const todoList = document.getElementById('todo-list');
let todos = [];
let users = [];

// Basic logic
function getUserName(userId) {
	const user = users.find(u => u.id === userId);
	return user.name;
}

function printTodo({id, userId, title, complited}) {
	const li = document.createElement('li');
	li.className = 'todo-item'
	li.dataset.id = id;
	li.innerHTML = `<span>${title} by ${getUserName(userId)}</span>`;

	todoList.prepend(li);
}

// Attach events
document.addEventListener('DOMContentLoaded', initApp);

// Event logic
function initApp() {
	Promise.all([getAllTodos(), getAllUsers()]).then(values => {
		[todos, users] = values;

		todos.forEach((todo) => printTodo(todo));
	})
}

// Async logic
async function getAllTodos() {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	const data = await response.json();

	return data;
}

async function getAllUsers() {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();

	return data;
}