console.log('Hello from custom variant!');

document.querySelectorAll('.product-custom-selection a').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('clicked', el.dataset.option);
    let newUrl;
    switch (el.dataset.option) {
      case 'white':
        newUrl = '/products/oakley-sandal-cyan';
        break;
      case 'red':
        newUrl = '/products/oakley-sandal-gold';
        break;
      default:
        newUrl = '/products/oakley-sandal-green';
    }
    window.history.pushState(null, '', newUrl);
    loadProduct(newUrl);
  });
});

window.addEventListener('popstate', (event) => {
  loadProduct(window.location.pathname);
});

function loadProduct(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newProductSection = doc.querySelector('[id*="MainProduct"]');
      const currentProductSection = document.querySelector('[id*="MainProduct"]');
      if (newProductSection && currentProductSection) {
        currentProductSection.innerHTML = newProductSection.innerHTML;

        // Reinitialize any scripts needed for the new content
        reinitializeScripts();
      }
    })
    .catch((error) => console.error('Error loading product:', error));
}

function reinitializeScripts() {
  // Add any code here to reinitialize scripts for the new product content
  console.log('Reinitializing scripts');
}

function reinitializeScripts() {
  // Reinitialize any event listeners or JavaScript components
  document.querySelectorAll('.product-custom-selection a').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('clicked', el.dataset.option);
      let newUrl;
      switch (el.dataset.option) {
        case 'white':
          newUrl = '/products/oakley-sandal-cyan';
          break;
        case 'red':
          newUrl = '/products/oakley-sandal-gold';
          break;
        default:
          newUrl = '/products/oakley-sandal-green';
      }
      window.history.pushState(null, '', newUrl);
      loadProduct(newUrl);
    });
  });
  console.log('Reinitializing scripts');
}
