class TodoApp {
  constructor({ el, data }) {
    this.todos = data;
    this.todoListEl = el;
    this.todoCheckClassName = 'check-input';
  }

  init() {
    this.renderList();

    const checksEl = this.todoListEl.getElementsByClassName(
      this.todoCheckClassName
    );

    for (let el of checksEl) {
      el.addEventListener(
        'change',
        (event) => this.handleChangeCheckbox(event),
        false
      );
    }
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
    this.todos.forEach((todo) => {
      const textEl = this.createTodoTextElement(todo);
      const inputEl = this.createTodoCheckInputElement();
      const labelEl = this.createTodolabelElement(inputEl.id);

      labelEl.appendChild(inputEl);
      labelEl.appendChild(textEl);

      const todoId = inputEl.getAttribute('data-todo-id');
      const liEl = this.createLiElement(todoId);
      liEl.appendChild(labelEl);

      this.todoListEl.appendChild(liEl);

      todo.completed && this.setChecked(todoId, inputEl);
    });
  }

  setChecked(todoId, inputEl) {
    if (inputEl.getAttribute('checked')) {
      inputEl.removeAttribute('checked');
    } else {
      inputEl.setAttribute('checked', 'checked');
    }
    this.setCheckedClassName(todoId, this.todoListEl);
  }

  setCheckedClassName(id, todoListEl) {
    todoListEl.querySelector(`#${id}`).classList.toggle('checked');
  }

  handleChangeCheckbox(event) {
    const el = event.target;
    const todoId = el.getAttribute('data-todo-id');

    this.setChecked(todoId, el);
  }
}

export default TodoApp;
