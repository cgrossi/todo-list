function clickCheckbox() {
        const checkboxes = document.querySelectorAll('#completed');
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
        deleteButtons.forEach(el => {
                el.addEventListener('click', event => {
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
                el.addEventListener('click', event => {
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

function main() {
        clickCheckbox();
        deleteTodo();
        editTodo();
}

main();
