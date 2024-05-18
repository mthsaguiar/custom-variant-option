console.log('hello from custom variant!');

document.querySelectorAll('.product-custom-selection a').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked', el.dataset.option);
    switch (el.dataset.option) {
      case 'white':
        window.history.pushState('object or string', 'Title', '/products/white-t-shirt');
        break;
      case 'red':
        window.history.pushState('object or string', 'Title', '/products/red-t-shirt');
        break;
      default:
        window.history.pushState('object or string', 'Title', '/products/black-t-shirt');
    }
  });
});
