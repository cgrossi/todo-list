let taskArray = [];

function createLi(task) {
        const tasks = document.querySelector('.tasks');
        const li = document.createElement('li');
        const input = document.createElement('input');
        const p = document.createElement('p');
        const div = document.createElement('div');
        li.classList.add('task');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('class', 'checkbox');
        p.textContent = task;
        div.setAttribute('class', 'modify');
        const i = document.createElement('i');
        const idelete = document.createElement('i');
        i.setAttribute('class', 'small material-icons edit');
        i.textContent = 'edit';
        idelete.setAttribute('class', 'small material-icons delete');
        idelete.textContent = 'delete';
        li.appendChild(input);
        li.appendChild(p);
        div.appendChild(i);
        div.appendChild(idelete);
        li.appendChild(div);
        tasks.appendChild(li);
}

function clickCheckbox() {
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach(el => {
                el.addEventListener('click', event => {
                        if (event.target.checked) {
                                event.target.nextElementSibling.innerHTML = `<del>${
                                        event.target.nextElementSibling.textContent
                                }</del>`;
                                event.target.nextElementSibling.setAttribute('style', 'opacity: 0.2;');
                        } else {
                                event.target.nextElementSibling.innerHTML = `${
                                        event.target.nextElementSibling.textContent
                                }`;
                                event.target.nextElementSibling.setAttribute('style', 'opacity: 1;');
                        }
                });
        });
}

function deleteTodo() {
        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach((el, index) => {
                el.addEventListener('click', event => {
                        if (taskArray.length === 0) {
                                taskArray = [...JSON.parse(localStorage.getItem('tasks'))];
                                taskArray.splice(index, 1);
                                localStorage.setItem('tasks', JSON.stringify(taskArray));
                        } else {
                                taskArray.splice(index, 1);
                                localStorage.setItem('tasks', JSON.stringify(taskArray));
                        }
                        event.target.parentElement.parentElement.outerHTML = '';
                });
        });
}

function editTodo() {
        const todoButtons = document.querySelectorAll('.edit');
        const editModal = document.querySelector('.edit-modal-container');
        const editModalInput = document.querySelector('.edit-modal-input');
        const editModalSubmit = document.querySelector('.edit-modal button');
        let current;
        todoButtons.forEach((el, i) => {
                el.addEventListener('click', () => {
                        editModal.style.display = 'block';
                        current = i;
                });
        });
        editModalSubmit.addEventListener('click', submitEvent => {
                todoButtons[current].parentElement.previousElementSibling.innerText = editModalInput.value;
                editModal.style.display = 'none';
                editModalInput.value = '';
                submitEvent.stopImmediatePropagation();
        });
}

function renderTasks() {
        const tasks = document.querySelector('.tasks');
        tasks.innerHTML = '';
        if (!localStorage.getItem('tasks')) {
                localStorage.setItem('tasks', JSON.stringify(taskArray));
        } else {
                const data = JSON.parse(localStorage.getItem('tasks'));
                data.forEach(el => {
                        createLi(el);
                });
        }

        clickCheckbox();
        deleteTodo();
        editTodo();
}

function addTodo() {
        const addTask = document.querySelector('.add-task-btn');
        const addModal = document.querySelector('.add-modal-container');
        const addSubmit = document.querySelector('.add-modal .save');
        const addInput = document.querySelector('.add-modal-input');
        addTask.addEventListener('click', () => {
                addModal.style.display = 'block';
                addInput.value = '';
        });
        addSubmit.addEventListener('click', () => {
                if (!localStorage.getItem('tasks')) {
                        localStorage.setItem('tasks', JSON.stringify(taskArray));
                } else {
                        taskArray = [...JSON.parse(localStorage.getItem('tasks'))];
                        taskArray.push(addInput.value);
                        localStorage.setItem('tasks', JSON.stringify(taskArray));
                }
                renderTasks();
                addModal.style.display = 'none';
        });
}

function main() {
        renderTasks();
        addTodo();
}

main();
