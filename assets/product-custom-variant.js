console.log('Hello from custom variant!');

// Initialize custom variant links
function initializeCustomVariantLinks() {
  document.querySelectorAll('.product-custom-selection a').forEach((el) => {
    el.addEventListener('click', handleCustomVariantClick);
  });
}

function handleCustomVariantClick(e) {
  e.preventDefault();
  const el = e.currentTarget;
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
  const selectedOptions = captureSelectedOptions();
  console.log('Captured options before change:', selectedOptions);
  window.history.pushState({ selectedOptions }, '', newUrl);
  loadProduct(newUrl, selectedOptions);
}

window.addEventListener('popstate', (event) => {
  const selectedOptions = event.state ? event.state.selectedOptions : {};
  console.log('Captured options from popstate:', selectedOptions);
  loadProduct(window.location.pathname, selectedOptions);
});

function captureSelectedOptions() {
  const selectedOptions = {};
  document.querySelectorAll('.product-form__input--pill input[type="radio"]:checked').forEach((input) => {
    selectedOptions[input.name] = input.value;
  });
  console.log('Captured selected options:', selectedOptions);
  return selectedOptions;
}

function loadProduct(url, selectedOptions) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const newProductSection = doc.querySelector('[id*="MainProduct"]');
      const currentProductSection = document.querySelector('[id*="MainProduct"]');
      if (newProductSection && currentProductSection) {
        currentProductSection.innerHTML = newProductSection.innerHTML;

        // Reapply selected options to the new product
        document.querySelectorAll('.product-form__input--pill input[type="radio"]').forEach((input) => {
          if (selectedOptions[input.name] && selectedOptions[input.name] === input.value) {
            input.checked = true;
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }
        });

        // Update the URL to reflect the selected variant
        updateURLWithSelectedVariant();

        // Reinitialize any scripts needed for the new content
        reinitializeScripts();
      } else {
        console.error('Product section not found in the fetched document or the current document.');
      }
    })
    .catch((error) => console.error('Error loading product:', error));
}

function updateURLWithSelectedVariant() {
  const variantId = document.querySelector('input[name="id"]').value;
  const url = new URL(window.location);
  url.searchParams.set('variant', variantId);
  window.history.replaceState({ selectedOptions: captureSelectedOptions() }, '', url);
}

function reinitializeScripts() {
  initializeCustomVariantLinks();
}

// Initial setup
initializeCustomVariantLinks();
