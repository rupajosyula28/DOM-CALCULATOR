const wrapper = document.getElementById('main-wrapper');

// Title
const title = document.createElement('h1');
title.id = 'title';
title.textContent = 'DOM CALCULATOR';
wrapper.appendChild(title);

// Description
const description = document.createElement('p');
description.id = 'description';
description.textContent = 'This calculator performs basic arithmetic operations.';
wrapper.appendChild(description);

// Calculator Container
const container = document.createElement('div');
container.id = 'calculator';
wrapper.appendChild(container);

// Display
const display = document.createElement('input');
display.id = 'result';
display.className = 'form-control mb-3';
display.readOnly = true;
container.appendChild(display);

// Buttons Layout
const buttons = [
  ['1', '2', '3', '+'],
  ['4', '5', '6', '-'],
  ['7', '8', '9', '*'],
  ['0', '.', '=', '/'],
  ['C']
];

buttons.forEach(row => {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'mb-2');

  row.forEach(char => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-3');

    const button = document.createElement('button');
    button.textContent = char;
    button.className = 'btn btn-secondary btn-calc';

    switch (char) {
      case 'C': button.id = 'clear'; break;
      case '=': button.id = 'equal'; break;
      case '+': button.id = 'add'; break;
      case '-': button.id = 'subtract'; break;
      default: button.id = char;
    }

    button.addEventListener('click', () => handleClick(char));
    colDiv.appendChild(button);
    rowDiv.appendChild(colDiv);
  });

  container.appendChild(rowDiv);
});

// Logic
function handleClick(value) {
  if (value === 'C') {
    display.value = '';
  } else if (value === '=') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  } else {
    display.value += value;
  }
}
// Allow keyboard input
document.addEventListener('keydown', (e) => {
  const key = e.key;

  // Allow digits and operators
  if ((/\d/.test(key) || ['+', '-', '*', '/', '.'].includes(key))) {
    display.value += key;
  }

  // Evaluate on Enter
  if (key === 'Enter') {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = 'Error';
    }
  }

  // Clear on Backspace
  if (key === 'Backspace') {
    display.value = display.value.slice(0, -1);
  }

  // Full clear with Escape
  if (key === 'Escape') {
    display.value = '';
  }
});
