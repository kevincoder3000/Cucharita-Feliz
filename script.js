// Lista centralizada de productos de Cucharita Feliz
const PRODUCTOS_POSTRES = [
  {
    id: 1,
    nombre: 'Torta de Chocolate',
    categoria: 'Tortas',
    precio: 18.0,
    porciones: '8 porciones',
    conservantes: 'Sin conservantes',
    destacado: false,
    descripcion:
      'Deliciosa torta esponjosa de chocolate, con relleno cremoso y cobertura de ganache.'
  },
  {
    id: 2,
    nombre: 'Torta de Fresa',
    categoria: 'Tortas',
    precio: 18.0,
    porciones: '8 porciones',
    conservantes: 'Sin conservantes',
    destacado: false,
    descripcion: 'Bizcocho suave con crema fresca y fresas seleccionadas.'
  },
  {
    id: 3,
    nombre: 'Torta de Limón',
    categoria: 'Tortas',
    precio: 16.0,
    porciones: '8 porciones',
    conservantes: 'Sin conservantes',
    destacado: false,
    descripcion:
      'Equilibrio cítrico refrescante con cobertura suave y textura ligera.'
  },
  {
    id: 4,
    nombre: 'Cupcake de Vainilla',
    categoria: 'Cupcakes',
    precio: 6.0,
    porciones: '1 porción',
    conservantes: 'Sin conservantes',
    destacado: true,
    descripcion: 'Cupcake artesanal de vainilla coronado con crema batida.'
  },
  {
    id: 5,
    nombre: 'Cupcake de Chocolate',
    categoria: 'Cupcakes',
    precio: 6.0,
    porciones: '1 porción',
    conservantes: 'Sin conservantes',
    destacado: false,
    descripcion: 'Cupcake intenso de cacao con cubierta cremosa de chocolate.'
  },
  {
    id: 6,
    nombre: 'Postre en Vaso',
    categoria: 'Postres en vaso',
    precio: 8.0,
    porciones: '1 porción',
    conservantes: 'Sin conservantes',
    destacado: true,
    descripcion:
      'Capas cremosas y dulces servidas en vaso listo para disfrutar.'
  },
  {
    id: 7,
    nombre: 'Brownie Clásico',
    categoria: 'Otros',
    precio: 7.0,
    porciones: '1 porción',
    conservantes: 'Sin conservantes',
    destacado: true,
    descripcion: 'Brownie húmedo por dentro y ligeramente crocante por fuera.'
  },
  {
    id: 1,
    nombre: 'Torta de Chocolate',
    categoria: 'Tortas',
    precio: 18.0,
    porciones: '8 porciones',
    conservantes: 'Sin conservantes',
    destacado: false,
    icono: 'fa-cake-candles',
    // imagen: 'img/torta-chocolate.jpg', // Opcional: descomenta cuando tengas tus fotos
    descripcion:
      'Deliciosa torta esponjosa de chocolate, con relleno cremoso y cobertura de ganache.'
  },
  {
    id: 2,
    nombre: 'Torta de Fresa',
    categoria: 'Tortas',
    precio: 18.0,
    porciones: '8 porciones',
    conservantes: 'Sin conservantes',
    destacado: false,
    icono: 'fa-cake-candles',
    descripcion: 'Bizcocho suave con crema fresca y fresas seleccionadas.'
  },
  {
    id: 3,
    nombre: 'Torta de Limón',
    categoria: 'Tortas',
    precio: 16.0,
    porciones: '8 porciones',
    conservantes: 'Sin conservantes',
    destacado: false,
    icono: 'fa-cake-candles',
    descripcion:
      'Equilibrio cítrico refrescante con cobertura suave y textura ligera.'
  },
  {
    id: 4,
    nombre: 'Cupcake de Vainilla',
    categoria: 'Cupcakes',
    precio: 6.0,
    porciones: '1 porción',
    conservantes: 'Sin conservantes',
    destacado: true,
    icono: 'fa-cookie-bite',
    descripcion: 'Cupcake artesanal de vainilla coronado con crema batida.'
  },
  {
    id: 5,
    nombre: 'Cupcake de Chocolate',
    categoria: 'Cupcakes',
    precio: 6.0,
    porciones: '1 porción',
    conservantes: 'Sin conservantes',
    destacado: false,
    icono: 'fa-cookie-bite',
    descripcion: 'Cupcake intenso de cacao con cubierta cremosa de chocolate.'
  },
  {
    id: 6,
    nombre: 'Postre en Vaso',
    categoria: 'Postres en vaso',
    precio: 8.0,
    porciones: '1 porción',
    conservantes: 'Sin conservantes',
    destacado: true,
    icono: 'fa-ice-cream',
    descripcion:
      'Capas cremosas y dulces servidas en vaso listo para disfrutar.'
  },
  {
    id: 7,
    nombre: 'Brownie Clásico',
    categoria: 'Otros',
    precio: 7.0,
    porciones: '1 porción',
    conservantes: 'Sin conservantes',
    destacado: true,
    icono: 'fa-star',
    descripcion: 'Brownie húmedo por dentro y ligeramente crocante por fuera.'
  }
];
document.addEventListener('DOMContentLoaded', () => {
  // Selecciona TODOS los elementos con data-route (mapa del sitio, navbar y botón Ver catálogo)
  const navButtons = document.querySelectorAll('[data-route]');
  const childCards = document.querySelectorAll('.child-card');
  const viewSections = document.querySelectorAll('.view-section');
  // Manejo del formulario de Contacto
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('contact-nombre').value.trim();
      const feedback = document.getElementById('contact-feedback');

      feedback.textContent = `¡Gracias ${nombre}! Hemos recibido tu mensaje.`;
      contactForm.reset();

      setTimeout(() => {
        feedback.textContent = '';
      }, 4000);
    });
  }

  // Renderizar tarjetas de "Nuestros destacados" en Inicio
  function renderDestacados() {
    const container = document.getElementById('featured-list');
    if (!container) return;

    const destacados = PRODUCTOS_POSTRES.filter((item) => item.destacado);
    container.innerHTML = destacados
      .map(
        (postre) => `
      <article class="featured-card" data-route="detalle">
        <div class="featured-thumb">
          <i class="fa-solid fa-cake-candles"></i>
        </div>
        <h3>${postre.nombre}</h3>
      </article>
    `
      )
      .join('');

    // Hacer que las tarjetas recién creadas también naveguen al hacer clic
    container.querySelectorAll('[data-route]').forEach((card) => {
      card.addEventListener('click', () => navigateTo(card.dataset.route));
    });
  }

  renderDestacados();

  /**
   * Cambia la vista activa y actualiza el estado del menú y la URL.
   * @param {string} routeName - Nombre de la ruta (ej. 'inicio', 'catalogo')
   */
  function navigateTo(routeName) {
    const targetSection = document.getElementById(`view-${routeName}`);
    if (!targetSection) return;

    // 1. Ocultar todas las vistas y mostrar la seleccionada
    viewSections.forEach((section) => section.classList.remove('active'));
    targetSection.classList.add('active');

    // 2. Actualizar el estado activo en las tarjetas hijas
    childCards.forEach((card) => {
      const isMatch = card.dataset.route === routeName;
      card.classList.toggle('active', isMatch);
    });

    // 3. Actualizar el hash de la URL sin recargar (ej. #catalogo)
    window.history.replaceState(null, '', `#${routeName}`);
  }

  // Asignar evento click a cada tarjeta (raíz e hijas)
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const route = button.dataset.route;
      navigateTo(route);
    });
  });

  // Cargar vista inicial si el usuario entra con un hash en la URL (ej. index.html#carrito)
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    navigateTo(initialHash);
  }
});

let carrito = JSON.parse(localStorage.getItem('cucharita_carrito')) || [];

function guardarCarrito() {
  localStorage.setItem('cucharita_carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('[data-route]');
  const childCards = document.querySelectorAll('.child-card');
  const viewSections = document.querySelectorAll('.view-section');
  const categoryItems = document.querySelectorAll('.category-item');

  // Actualizar contadores del carrito en todas las vistas
  function actualizarBadgeCarrito() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('.cart-badge').forEach((badge) => {
      badge.textContent = totalItems;
    });
  }

  // Agregar producto al carrito
  function agregarAlCarrito(idProducto) {
    const producto = PRODUCTOS_POSTRES.find((p) => p.id === idProducto);
    if (!producto) return;

    const existente = carrito.find((item) => item.id === idProducto);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    actualizarBadgeCarrito();
    renderCarrito();
  }
  function cambiarCantidad(idProducto, delta) {
    const index = carrito.findIndex((item) => item.id === idProducto);
    if (index === -1) return;

    carrito[index].cantidad += delta;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }

    guardarCarrito();
    actualizarBadgeCarrito();
    renderCarrito();
  }
  function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter((item) => item.id !== idProducto);
    guardarCarrito();
    actualizarBadgeCarrito();
    renderCarrito();
  }
  function renderCarrito() {
    const listContainer = document.getElementById('cart-items-list');
    const summaryContainer = document.getElementById('cart-summary');
    const totalElement = document.getElementById('cart-total-amount');
    if (!listContainer || !summaryContainer || !totalElement) return;

    if (carrito.length === 0) {
      summaryContainer.style.display = 'none';
      listContainer.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Tu carrito está vacío. ¡Elige un postre delicioso!</p>
        <button class="btn-pink" id="btn-go-catalog">
          Ir al catálogo <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    `;
      const btnGo = document.getElementById('btn-go-catalog');
      if (btnGo) btnGo.addEventListener('click', () => navigateTo('catalogo'));
      return;
    }

    summaryContainer.style.display = 'block';
    let totalGeneral = 0;

    listContainer.innerHTML = carrito
      .map((item) => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        return `
        <article class="cart-item-row">
          <div class="cart-item-left">
            <div class="cart-item-thumb">
              ${
                item.imagen
                  ? `<img src="${item.imagen}" alt="${item.nombre}">`
                  : `<i class="fa-solid ${item.icono || 'fa-cake-candles'}"></i>`
              }
            </div>
            <div class="cart-item-info">
              <h3>${item.nombre}</h3>
              <span class="cart-item-price">S/ ${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div class="cart-item-controls">
            <div class="qty-selector">
              <button class="qty-btn" data-qty-minus="${item.id}" title="Disminuir">−</button>
              <span class="qty-value">${item.cantidad}</span>
              <button class="qty-btn" data-qty-plus="${item.id}" title="Aumentar">+</button>
            </div>
            <button class="btn-remove-item" data-remove-id="${item.id}" title="Eliminar producto">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </article>
      `;
      })
      .join('');

    totalElement.textContent = `S/ ${totalGeneral.toFixed(2)}`;

    // Eventos de los botones +, - y eliminar
    listContainer.querySelectorAll('[data-qty-minus]').forEach((btn) => {
      btn.addEventListener('click', () =>
        cambiarCantidad(Number(btn.dataset.qtyMinus), -1)
      );
    });

    listContainer.querySelectorAll('[data-qty-plus]').forEach((btn) => {
      btn.addEventListener('click', () =>
        cambiarCantidad(Number(btn.dataset.qtyPlus), 1)
      );
    });

    listContainer.querySelectorAll('[data-remove-id]').forEach((btn) => {
      btn.addEventListener('click', () =>
        eliminarDelCarrito(Number(btn.dataset.removeId))
      );
    });
  }

  // Renderizar tarjetas de "Nuestros destacados" en Inicio
  function renderDestacados() {
    const container = document.getElementById('featured-list');
    if (!container) return;

    const destacados = PRODUCTOS_POSTRES.filter((item) => item.destacado);
    container.innerHTML = destacados
      .map(
        (postre) => `
      <article class="featured-card" data-route="detalle">
        <div class="featured-thumb">
          <i class="fa-solid ${postre.icono || 'fa-cake-candles'}"></i>
        </div>
        <h3>${postre.nombre}</h3>
      </article>
    `
      )
      .join('');

    container.querySelectorAll('[data-route]').forEach((card) => {
      card.addEventListener('click', () => navigateTo(card.dataset.route));
    });
  }

  // Renderizar productos en "2. Catálogo" según categoría
  function renderCatalogo(categoriaSeleccionada = 'Todos') {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    const filtrados =
      categoriaSeleccionada === 'Todos'
        ? PRODUCTOS_POSTRES
        : PRODUCTOS_POSTRES.filter(
            (item) => item.categoria === categoriaSeleccionada
          );

    if (filtrados.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1 / -1; color: #7a4b3e;">Próximamente más postres en esta categoría.</p>`;
      return;
    }

    grid.innerHTML = filtrados
      .map(
        (postre) => `
      <article class="product-card">
        <div>
          <div class="product-thumb" data-route="detalle">
            ${
              postre.imagen
                ? `<img src="${postre.imagen}" alt="${postre.nombre}">`
                : `<i class="fa-solid ${postre.icono || 'fa-cake-candles'}"></i>`
            }
          </div>
          <h3 class="product-name" data-route="detalle">${postre.nombre}</h3>
        </div>
        <div class="product-footer">
          <span class="product-price">S/ ${postre.precio.toFixed(2)}</span>
          <button class="btn-add-cart" data-add-id="${postre.id}" title="Agregar al carrito">
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </article>
    `
      )
      .join('');

    // Eventos para ir a detalle al hacer clic en imagen o nombre
    grid.querySelectorAll('[data-route="detalle"]').forEach((el) => {
      el.addEventListener('click', () => navigateTo('detalle'));
    });

    // Eventos para botones de agregar al carrito
    grid.querySelectorAll('[data-add-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.addId);
        agregarAlCarrito(id);
      });
    });
  }

  // Eventos de clic en las categorías del sidebar
  categoryItems.forEach((item) => {
    item.addEventListener('click', () => {
      categoryItems.forEach((li) => li.classList.remove('active'));
      item.classList.add('active');
      renderCatalogo(item.dataset.category);
    });
  });

  // Navegación entre vistas
  function navigateTo(routeName) {
    const targetSection = document.getElementById(`view-${routeName}`);
    if (!targetSection) return;

    viewSections.forEach((section) => section.classList.remove('active'));
    targetSection.classList.add('active');

    childCards.forEach((card) => {
      const isMatch = card.dataset.route === routeName;
      card.classList.toggle('active', isMatch);
    });

    window.history.replaceState(null, '', `#${routeName}`);
  }

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      navigateTo(button.dataset.route);
    });
  });

  // Inicializar vistas
  renderDestacados();
  renderCatalogo('Todos');

  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    navigateTo(initialHash);
  }
});
