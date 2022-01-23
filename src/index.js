import '../src/index.css';

import TodoApp from './todo-app';

// Init
const todoListsEl = document.getElementsByClassName('todo-list-wrapper');
const allTodosData = [
  [
    {
      id: 1,
      title: 'Go shopping',
      completed: false,
    },
    {
      id: 2,
      title: 'Read book',
      completed: true,
    },
  ],
];

const runApp = () => {
  let index = 0;
  for (let el of todoListsEl) {
    const todoList = new TodoApp({
      el,
      data: allTodosData[index],
    });
    todoList.init();

    index++;
  }
};

window.addEventListener('DOMContentLoaded', function () {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((data) => {
      allTodosData.push(data);

      runApp();
    });
});
