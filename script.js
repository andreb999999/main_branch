// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const themeToggle = document.getElementById('themeToggle');

// Add todo function
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a quest!');
        return;
    }
    
    // Create list item
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // Create text span
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = '⚔️ ' + todoText;
    span.onclick = function() {
        span.classList.toggle('completed');
    };
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        li.remove();
        checkEmptyState();
    };
    
    // Append elements
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    
    // Clear input
    todoInput.value = '';
    todoInput.focus();
    
    checkEmptyState();
}

// Check if list is empty and show message
function checkEmptyState() {
    const existingEmptyState = document.querySelector('.empty-state');
    
    if (todoList.children.length === 0) {
        if (!existingEmptyState) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-state';
            emptyMessage.textContent = 'No quests yet. Add one to get started!';
            todoList.appendChild(emptyMessage);
        }
    } else {
        if (existingEmptyState) {
            existingEmptyState.remove();
        }
    }
}

// Event listeners
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Theme toggle functionality
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', toggleTheme);

// Initialize
loadTheme();
checkEmptyState();
