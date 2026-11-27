/* =========================================
   CUCHARITA FELIZ - JAVASCRIPT
   ========================================= */

// LISTA ORIGINAL DE PRODUCTOS

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

/* =========================================
   IMÁGENES DE LOS PRODUCTOS
   ========================================= */

const IMAGENES_POSTRES = {
  1: 'img/torta-chocolate.png',
  2: 'img/torta-fresa.png',
  3: 'img/torta-limon.png',
  4: 'img/cupcake-vainilla.png',
  5: 'img/cupcake-chocolate.png',
  6: 'img/postre-vaso.png',
  7: 'img/brownie.png'
};

/* =========================================
   VARIABLES DEL CARRITO Y FAVORITOS
   ========================================= */

let carrito = [];
let favoritos = [];
let productoSeleccionado = 1;

/* =========================================
   FUNCIONES PRINCIPALES
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS DE NAVEGACIÓN ORIGINALES

  const childCards = document.querySelectorAll('.child-card');
  const navItems = document.querySelectorAll('.nav-link[data-route]');
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

  // FORMATO DE PRECIOS

  function formatoPrecio(precio) {
    return 'S/ ' + precio.toFixed(2);
  }

  // BUSCAR PRODUCTO POR ID

  function buscarProducto(id) {
    return PRODUCTOS_POSTRES.find((producto) => producto.id === id);
  }

  // OBTENER IMAGEN

  function obtenerImagen(id) {
    return IMAGENES_POSTRES[id];
  }

  // CREAR TARJETA DE PRODUCTO

  function crearTarjeta(postre) {
    const favorito = favoritos.includes(postre.id);

    return `
      <article class="product-card">

        <button
          class="product-photo"
          data-detalle="${postre.id}"
          title="Ver producto"
        >
          <img
            src="${obtenerImagen(postre.id)}"
            alt="${postre.nombre}"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
          >
          <i
            class="fa-solid fa-cake-candles"
            style="display:none; font-size:55px; color:#ed326b;"
          ></i>
        </button>

        <button
          class="heart-btn ${favorito ? 'selected' : ''}"
          data-favorito="${postre.id}"
          title="Favoritos"
        >
          <i class="${favorito ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>

        <div class="product-meta">

          <div class="product-title">
            ${postre.nombre}
          </div>

          <div class="product-price">
            ${formatoPrecio(postre.precio)}
          </div>

          <button
            class="btn-pink add-btn"
            data-agregar="${postre.id}"
          >
            <i class="fa-solid fa-cart-shopping"></i>
            Agregar
          </button>

        </div>

      </article>
    `;
  }

  /* =========================================
     MOSTRAR PRODUCTOS DESTACADOS
     ========================================= */

  function renderDestacados() {
    const container = document.getElementById('featured-list');

    if (!container) return;

    // Conservamos los 3 destacados originales.
    // Agregamos la torta de chocolate para mostrar 4.

    const destacados = PRODUCTOS_POSTRES.filter(
      (item) => item.destacado || item.id === 1
    );

    container.innerHTML = destacados
      .map((postre) => crearTarjeta(postre))
      .join('');
  }

  /* =========================================
     MOSTRAR CATÁLOGO
     ========================================= */

  function renderCatalogo() {
    const container = document.getElementById('view-catalogo');

    if (!container) return;

    container.innerHTML = `
      <div style="padding:25px;">

        <h1>Nuestro catálogo</h1>

        <p style="margin:15px 0;">
          Encuentra tus postres favoritos.
        </p>

        <input
          type="text"
          id="buscar-postre"
          placeholder="Buscar postre..."
          style="
            padding:12px;
            width:100%;
            max-width:400px;
            margin-bottom:25px;
            border:1px solid #ed326b;
            border-radius:15px;
          "
        >

        <div class="featured-grid" id="lista-catalogo">
        </div>

      </div>
    `;

    mostrarProductosCatalogo(PRODUCTOS_POSTRES);

    document
      .getElementById('buscar-postre')
      .addEventListener('input', function () {
        const texto = this.value.toLowerCase();

        const resultados = PRODUCTOS_POSTRES.filter((postre) =>
          postre.nombre.toLowerCase().includes(texto)
        );

        mostrarProductosCatalogo(resultados);
      });
  }

  // FILTRAR PRODUCTOS DEL CATÁLOGO

  function mostrarProductosCatalogo(lista) {
    const container = document.getElementById('lista-catalogo');

    if (!container) return;

    if (lista.length === 0) {
      container.innerHTML = '<p>No se encontraron productos.</p>';
      return;
    }

    container.innerHTML = lista.map((postre) => crearTarjeta(postre)).join('');
  }

  /* =========================================
     DETALLE DEL PRODUCTO
     ========================================= */

  function renderDetalle() {
    const postre = buscarProducto(productoSeleccionado);

    if (!postre) return;

    const container = document.getElementById('view-detalle');

    container.innerHTML = `
      <div style="padding:30px;">

        <h1>${postre.nombre}</h1>

        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:35px;
          margin-top:25px;
        ">

          <div style="flex:1; min-width:250px;">

            <img
              src="${obtenerImagen(postre.id)}"
              alt="${postre.nombre}"
              style="
                width:100%;
                max-width:400px;
                border-radius:25px;
              "
            >

          </div>

          <div style="flex:1; min-width:250px;">

            <h2 style="color:#ed326b;">
              ${formatoPrecio(postre.precio)}
            </h2>

            <p style="margin:20px 0;">
              ${postre.descripcion}
            </p>

            <p><strong>Categoría:</strong> ${postre.categoria}</p>

            <p><strong>Porciones:</strong> ${postre.porciones}</p>

            <p><strong>${postre.conservantes}</strong></p>

            <br>

            <button
              class="btn-pink"
              data-agregar="${postre.id}"
            >
              <i class="fa-solid fa-cart-shopping"></i>
              Agregar al carrito
            </button>

          </div>

        </div>

      </div>
    `;
  }

  /* =========================================
     AGREGAR AL CARRITO
     ========================================= */

  function agregarCarrito(id) {
    const postre = buscarProducto(id);

    if (!postre) return;

    const existente = carrito.find((item) => item.id === id);

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push({
        id: id,
        cantidad: 1
      });
    }

    actualizarContador();

    alert(postre.nombre + ' agregado al carrito');
  }

  /* =========================================
     ACTUALIZAR CONTADOR
     ========================================= */

  function actualizarContador() {
    let cantidad = 0;

    carrito.forEach((item) => {
      cantidad += item.cantidad;
    });

    const contador = document.getElementById('cart-count');

    if (contador) {
      contador.textContent = cantidad;
    }
  }

  /* =========================================
     MOSTRAR CARRITO
     ========================================= */

  function renderCarrito() {
    const container = document.getElementById('view-carrito');

    if (!container) return;

    let contenido = `
      <div style="padding:25px;">
        <h1>Mi carrito de compras</h1>
    `;

    if (carrito.length === 0) {
      contenido += `
        <p style="margin:20px 0;">
          Tu carrito está vacío.
        </p>

        <button class="btn-pink" data-route="catalogo">
          Ver catálogo
        </button>
      `;
    } else {
      let total = 0;

      carrito.forEach((item) => {
        const postre = buscarProducto(item.id);

        const subtotal = postre.precio * item.cantidad;

        total += subtotal;

        contenido += `
          <div style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            flex-wrap:wrap;
            gap:15px;
            padding:20px;
            margin-top:15px;
            background:#ffe4e5;
            border-radius:20px;
          ">

            <div>
              <h3>${postre.nombre}</h3>
              <p>${formatoPrecio(postre.precio)}</p>
            </div>

            <div>
              <button data-restar="${postre.id}">−</button>

              <strong>${item.cantidad}</strong>

              <button data-sumar="${postre.id}">+</button>
            </div>

            <strong>${formatoPrecio(subtotal)}</strong>

            <button data-eliminar="${postre.id}">
              <i class="fa-solid fa-trash"></i>
            </button>

          </div>
        `;
      });

      contenido += `
        <h2 style="margin:25px 0; text-align:right;">
          Total: ${formatoPrecio(total)}
        </h2>

        <button class="btn-pink" data-route="pedido">
          Finalizar pedido
        </button>
      `;
    }

    contenido += '</div>';

    container.innerHTML = contenido;
  }

  /* =========================================
     MODIFICAR CANTIDADES
     ========================================= */

  function cambiarCantidad(id, cambio) {
    const item = carrito.find((producto) => producto.id === id);

    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
      carrito = carrito.filter((producto) => producto.id !== id);
    }

    actualizarContador();
    renderCarrito();
  }

  // ELIMINAR PRODUCTO

  function eliminarProducto(id) {
    carrito = carrito.filter((producto) => producto.id !== id);

    actualizarContador();
    renderCarrito();
  }

  /* =========================================
     FAVORITOS
     ========================================= */

  function cambiarFavorito(id) {
    if (favoritos.includes(id)) {
      favoritos = favoritos.filter((productoId) => productoId !== id);
    } else {
      favoritos.push(id);
    }

    renderDestacados();

    // Actualizar catálogo solo si existe
    if (document.getElementById('lista-catalogo')) {
      const buscador = document.getElementById('buscar-postre');
      const texto = buscador ? buscador.value.toLowerCase() : '';

      const resultados = PRODUCTOS_POSTRES.filter((postre) =>
        postre.nombre.toLowerCase().includes(texto)
      );

      mostrarProductosCatalogo(resultados);
    }
  }

  /* =========================================
     FINALIZAR PEDIDO
     ========================================= */

  function renderPedido() {
    const container = document.getElementById('view-pedido');

    container.innerHTML = `
      <div style="padding:25px;">

        <h1>Finalizar pedido</h1>

        <p style="margin:15px 0;">
          Completa tus datos para continuar.
        </p>

        <form id="form-pedido" style="
          display:flex;
          flex-direction:column;
          gap:15px;
          max-width:450px;
        ">

          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            required
            style="padding:12px;"
          >

          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            required
            style="padding:12px;"
          >

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            required
            style="padding:12px;"
          >

          <button type="submit" class="btn-pink">
            Confirmar pedido
          </button>

        </form>

        <p style="margin-top:15px;">
          Este formulario es una demostración académica.
        </p>

      </div>
    `;
  }

  /* =========================================
     NOSOTROS
     ========================================= */

  function renderNosotros() {
    document.getElementById('view-nosotros').innerHTML = `
      <div style="padding:30px;">

        <h1>Nosotros</h1>

        <p style="margin-top:20px; line-height:1.8;">
          En Cucharita Feliz nos dedicamos a preparar
          deliciosos postres artesanales, elaborados
          con cariño y dedicación.
        </p>

        <p style="margin-top:15px; line-height:1.8;">
          Queremos que cada postre sea una oportunidad
          para compartir momentos especiales.
        </p>

        <br>

        <button class="btn-pink" data-route="catalogo">
          Ver nuestros postres
        </button>

      </div>
    `;
  }

  /* =========================================
     CONTACTO
     ========================================= */

  function renderContacto() {
    document.getElementById('view-contacto').innerHTML = `
      <div style="padding:30px;">

        <h1>Contáctanos</h1>

        <p style="margin:20px 0;">
          ¿Tienes alguna consulta?
          Escríbenos.
        </p>

        <form id="form-contacto" style="
          display:flex;
          flex-direction:column;
          gap:15px;
          max-width:450px;
        ">

          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            required
            style="padding:12px;"
          >

          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            required
            style="padding:12px;"
          >

          <textarea
            name="mensaje"
            placeholder="Escribe tu mensaje"
            required
            rows="4"
            style="padding:12px;"
          ></textarea>

          <button class="btn-pink" type="submit">
            Enviar mensaje
          </button>

        </form>

      </div>
    `;
  }

  /* =========================================
     NAVEGACIÓN ORIGINAL
     ========================================= */

  function navigateTo(routeName) {
    const targetSection = document.getElementById(`view-${routeName}`);

    if (!targetSection) return;

    // Ocultar todas las vistas

    viewSections.forEach((section) => {
      section.classList.remove('active');
    });

    // Mostrar la vista elegida

    targetSection.classList.add('active');

    // Actualizar tarjetas del mapa del sitio

    childCards.forEach((card) => {
      const isMatch = card.dataset.route === routeName;

      card.classList.toggle('active', isMatch);
    });
    navItems.forEach((item) => {
      const isMatch = item.dataset.route === routeName;

      item.classList.toggle('active', isMatch);
    });

    // Cargar contenido según la sección

    // if (routeName === 'catalogo') {
    //   renderCatalogo();
    // }

    if (routeName === 'detalle') {
      renderDetalle();
    }

    if (routeName === 'carrito') {
      renderCarrito();
    }

    if (routeName === 'pedido') {
      renderPedido();
    }

    if (routeName === 'nosotros') {
      renderNosotros();
    }

    if (routeName === 'contacto') {
      renderContacto();
    }

    // Conservar navegación mediante hash

    window.history.replaceState(null, '', `#${routeName}`);

    // Volver arriba

    window.scrollTo(0, 0);
  }

  /* =========================================
     EVENTOS DE BOTONES
     ========================================= */

  document.addEventListener('click', function (evento) {
    // BOTÓN AGREGAR

    const botonAgregar = evento.target.closest('[data-agregar]');

    if (botonAgregar) {
      agregarCarrito(Number(botonAgregar.dataset.agregar));

      return;
    }

    // VER DETALLE

    const botonDetalle = evento.target.closest('[data-detalle]');

    if (botonDetalle) {
      productoSeleccionado = Number(botonDetalle.dataset.detalle);

      navigateTo('detalle');
      return;
    }

    // FAVORITOS

    const botonFavorito = evento.target.closest('[data-favorito]');

    if (botonFavorito) {
      cambiarFavorito(Number(botonFavorito.dataset.favorito));

      return;
    }

    // SUMAR CANTIDAD

    const botonSumar = evento.target.closest('[data-sumar]');

    if (botonSumar) {
      cambiarCantidad(Number(botonSumar.dataset.sumar), 1);

      return;
    }

    // RESTAR CANTIDAD

    const botonRestar = evento.target.closest('[data-restar]');

    if (botonRestar) {
      cambiarCantidad(Number(botonRestar.dataset.restar), -1);

      return;
    }

    // ELIMINAR

    const botonEliminar = evento.target.closest('[data-eliminar]');

    if (botonEliminar) {
      eliminarProducto(Number(botonEliminar.dataset.eliminar));

      return;
    }

    // NAVEGAR ENTRE SECCIONES

    const botonRuta = evento.target.closest('[data-route]');

    if (botonRuta) {
      navigateTo(botonRuta.dataset.route);
    }
  });

  /* =========================================
     EVENTOS DE FORMULARIOS
     ========================================= */

  document.addEventListener('submit', function (evento) {
    // FORMULARIO DE PEDIDO

    if (evento.target.id === 'form-pedido') {
      evento.preventDefault();

      if (carrito.length === 0) {
        alert('Primero agrega productos al carrito.');
        return;
      }

      alert(
        'Pedido de demostración registrado. ' +
          'No se ha enviado ningún pedido real.'
      );

      carrito = [];
      actualizarContador();

      evento.target.reset();

      navigateTo('inicio');
    }

    // FORMULARIO DE CONTACTO

    if (evento.target.id === 'form-contacto') {
      evento.preventDefault();

      alert(
        'Mensaje de demostración registrado. ' +
          'No se ha enviado a ningún correo.'
      );

      evento.target.reset();
    }
  });

  /* =========================================
     INICIAR PÁGINA
     ========================================= */

  renderDestacados();
  actualizarContador();

  // Restaurar ruta inicial de la URL

  const initialHash = window.location.hash.replace('#', '');

  if (initialHash) {
    navigateTo(initialHash);
  }
});
