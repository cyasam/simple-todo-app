class TodoApp {
  constructor({ el, data }) {
    this.todos = data;
    this.todoListEl = el;
    this.todoCheckClassName = 'check-input';
  }

  init() {
    this.renderList();

    const checksEl = this.todoListEl.querySelectorAll(
      `.${this.todoCheckClassName}`
    );

    this.setEventListeners(
      checksEl,
      'change',
      this.handleChangeCheckbox.bind(this)
    );

    const deleteButtonsEl = this.todoListEl.querySelectorAll(`.delete-button`);
    this.setEventListeners(deleteButtonsEl, 'click', this.handleDelete);
  }

  setEventListeners(selector, type, callback) {
    selector.forEach((el) => {
      el.addEventListener(type, (event) => callback(event), false);
    });
  }

  createID() {
    return Math.random().toString(36).substring(2, 11);
  }

  createTodoTextElement(todo) {
    const textEl = document.createElement('span');
    textEl.classList.add('text');
    textEl.textContent = todo.title;

    return textEl;
  }

  createTodoCheckInputElement() {
    const inputEl = document.createElement('input');
    const dataId = this.createID();
    const inputId = `input-${dataId}`;
    const todoId = `todo-${dataId}`;

    inputEl.classList.add(this.todoCheckClassName);
    inputEl.setAttribute('id', inputId);
    inputEl.setAttribute('type', 'checkbox');
    inputEl.setAttribute('data-todo-id', todoId);

    return inputEl;
  }

  createDeleteButton(todoId) {
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.classList.add('delete-button');

    deleteButtonEl.setAttribute('data-todo-id', todoId);

    return deleteButtonEl;
  }

  createTodolabelElement(inputId) {
    const labelEl = document.createElement('label');
    labelEl.setAttribute('for', inputId);

    return labelEl;
  }

  createLiElement(todoId) {
    const liEl = document.createElement('li');
    liEl.setAttribute('id', todoId);

    return liEl;
  }

  renderList() {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('todo-list');

    this.todos.forEach((todo) => {
      const textEl = this.createTodoTextElement(todo);
      const inputEl = this.createTodoCheckInputElement();

      const todoId = inputEl.getAttribute('data-todo-id');
      const deleteButtonEl = this.createDeleteButton(todoId);
      const labelEl = this.createTodolabelElement(inputEl.id);

      labelEl.appendChild(inputEl);
      labelEl.appendChild(textEl);

      const liEl = this.createLiElement(todoId);
      liEl.appendChild(labelEl);
      liEl.appendChild(deleteButtonEl);
      ulEl.appendChild(liEl);

      if (todo.completed) {
        this.setChecked(inputEl);
        this.setCheckedClassName(todoId, ulEl);
      }
    });

    this.todoListEl.querySelector('.loading').remove();
    this.todoListEl.appendChild(ulEl);
  }

  setChecked(inputEl) {
    if (inputEl.getAttribute('checked')) {
      inputEl.removeAttribute('checked');
    } else {
      inputEl.setAttribute('checked', 'checked');
    }
  }

  setCheckedClassName(id, ulEl = this.todoListEl.querySelector('ul')) {
    ulEl.querySelector(`#${id}`).classList.toggle('checked');
  }

  handleChangeCheckbox(event) {
    const el = event.target;
    const todoId = el.getAttribute('data-todo-id');

    this.setChecked(el);
    this.setCheckedClassName(todoId, this.todoListEl);
  }

  handleDelete(event) {
    const el = event.target;

    el.parentNode.remove();
  }
}

export default TodoApp;
