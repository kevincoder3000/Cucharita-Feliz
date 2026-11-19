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
  }
];
document.addEventListener('DOMContentLoaded', () => {
  // Selecciona TODOS los elementos con data-route (mapa del sitio, navbar y botón Ver catálogo)
  const navButtons = document.querySelectorAll('[data-route]');
  const childCards = document.querySelectorAll('.child-card');
  const viewSections = document.querySelectorAll('.view-section');

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
