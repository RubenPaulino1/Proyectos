// JavaScript para WikiEspacio

// Inicializar todos los tooltips de Bootstrap y funcionalidad de modo oscuro
document.addEventListener('DOMContentLoaded', function() {
    // Lista de archivos HTML para autocompletado
    const archivosHtml = [
        'acerca-de.html',
        'agujeros_negros.html',
        'big_bang.html',
        'constelación.html',
        'contactos_y_redes_sociales.html',
        'estrellas.html',
        'galaxias.html',
        'jupiter.html',
        'luna.html',
        'marte.html',
        'mercurio.html',
        'neptuno.html',
        'pluton.html',
        'politica-privacidad.html',
        'saturno.html',
        'sol.html',
        'telescopio.html',
        'terminos-uso.html',
        'tierra.html',
        'universo.html',
        'urano.html',
        'venus.html',
        'via_lactea.html'
    ];
    
    // Función para implementar autocompletado en la barra de búsqueda
    function configurarAutocompletado() {
        const entradaBusqueda = document.querySelector('input[type="search"]');
        
        if (!entradaBusqueda) return;
        
        // Crear el contenedor de resultados de autocompletado
        const contenedorAutocompletado = document.createElement('div');
        contenedorAutocompletado.className = 'autocomplete-results';
        contenedorAutocompletado.style.position = 'absolute';
        contenedorAutocompletado.style.zIndex = '1000';
        contenedorAutocompletado.style.backgroundColor = 'var(--bg-color)';
        contenedorAutocompletado.style.width = '100%'; // Cambiado para usar ancho relativo
        contenedorAutocompletado.style.maxHeight = '300px';
        contenedorAutocompletado.style.overflowY = 'auto';
        contenedorAutocompletado.style.border = '1px solid var(--border-color)';
        contenedorAutocompletado.style.borderRadius = '0 0 4px 4px';
        contenedorAutocompletado.style.display = 'none';
        contenedorAutocompletado.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        contenedorAutocompletado.style.top = entradaBusqueda.offsetHeight + 'px';
        contenedorAutocompletado.style.left = '0'; // Asegurar que comience desde el borde izquierdo
        
        // Insertar el contenedor después del input de búsqueda
        entradaBusqueda.parentNode.style.position = 'relative';
        entradaBusqueda.parentNode.appendChild(contenedorAutocompletado);
        
        // Función para actualizar el ancho del contenedor de autocompletado
        function actualizarAnchoAutocompletado() {
            // Asegurar que el ancho se ajuste al contenedor padre en dispositivos móviles
            const anchoFormulario = entradaBusqueda.parentNode.offsetWidth;
            contenedorAutocompletado.style.width = anchoFormulario + 'px';
        }
        
        // Actualizar el ancho inicialmente
        actualizarAnchoAutocompletado();
        
        // Actualizar el ancho cuando cambie el tamaño de la ventana
        window.addEventListener('resize', actualizarAnchoAutocompletado);
        
        // Evento para detectar cambios en el input
        entradaBusqueda.addEventListener('input', function() {
            const terminoBusqueda = this.value.toLowerCase();
            
            if (terminoBusqueda.length < 2) {
                contenedorAutocompletado.style.display = 'none';
                return;
            }
            
            // Filtrar archivos que coincidan con el término de búsqueda
            const archivosCoincidentes = archivosHtml.filter(archivo => 
                archivo.toLowerCase().includes(terminoBusqueda)
            );
            
            // Mostrar resultados
            if (archivosCoincidentes.length > 0) {
                contenedorAutocompletado.innerHTML = '';
                archivosCoincidentes.forEach(archivo => {
                    const elemento = document.createElement('div');
                    elemento.className = 'autocomplete-item';
                    elemento.style.padding = '8px 12px';
                    elemento.style.cursor = 'pointer';
                    elemento.style.borderBottom = '1px solid var(--border-color)';
                    elemento.style.transition = 'background-color 0.2s';
                    
                    // Resaltar el término de búsqueda en el resultado
                    const nombreArchivo = archivo;
                    const nombreResaltado = nombreArchivo.replace(
                        new RegExp(terminoBusqueda, 'gi'),
                        coincidencia => `<strong>${coincidencia}</strong>`
                    );
                    
                    elemento.innerHTML = nombreResaltado;
                    
                    // Al hacer clic en un resultado
                    elemento.addEventListener('click', function() {
                        // Determinar si estamos en la página principal o en una subpágina
                        const esPaginaPrincipal = window.location.pathname.endsWith('index.html') || 
                                        window.location.pathname.endsWith('/') || 
                                        window.location.pathname.split('/').pop() === '';
                        
                        // Ajustar la ruta según donde estemos
                        if (esPaginaPrincipal) {
                            window.location.href = 'html/' + nombreArchivo;
                        } else {
                            window.location.href = nombreArchivo;
                        }
                    });
                    
                    // Efectos de hover
                    elemento.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = 'var(--accordion-active-bg)';
                    });
                    
                    elemento.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = '';
                    });
                    
                    contenedorAutocompletado.appendChild(elemento);
                });
                
                contenedorAutocompletado.style.display = 'block';
            } else {
                contenedorAutocompletado.style.display = 'none';
            }
        });
        
        // Ocultar resultados al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!entradaBusqueda.contains(e.target) && !contenedorAutocompletado.contains(e.target)) {
                contenedorAutocompletado.style.display = 'none';
            }
        });
        
        // Navegación con teclado
        entradaBusqueda.addEventListener('keydown', function(e) {
            const elementos = contenedorAutocompletado.querySelectorAll('.autocomplete-item');
            if (!elementos.length) return;
            
            // Índice del elemento actualmente seleccionado
            let indiceActual = -1;
            elementos.forEach((elemento, indice) => {
                if (elemento.classList.contains('active')) {
                    indiceActual = indice;
                    elemento.classList.remove('active');
                    elemento.style.backgroundColor = '';
                }
            });
            
            // Navegar con flechas
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                indiceActual = (indiceActual + 1) % elementos.length;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                indiceActual = (indiceActual - 1 + elementos.length) % elementos.length;
            } else if (e.key === 'Enter' && indiceActual >= 0) {
                e.preventDefault();
                elementos[indiceActual].click();
                return;
            } else if (e.key === 'Escape') {
                contenedorAutocompletado.style.display = 'none';
                return;
            } else {
                return;
            }
            
            // Marcar el nuevo elemento seleccionado
            if (indiceActual >= 0) {
                elementos[indiceActual].classList.add('active');
                elementos[indiceActual].style.backgroundColor = 'var(--accordion-active-bg)';
                elementos[indiceActual].scrollIntoView({ block: 'nearest' });
            }
        });
    }
    
    // Iniciar la funcionalidad de autocompletado
    configurarAutocompletado();
    
    // Inicializar tooltips
    var listaTriggerTooltip = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var listaTooltips = listaTriggerTooltip.map(function (elementoTriggerTooltip) {
        return new bootstrap.Tooltip(elementoTriggerTooltip);
    });

    // Inicializar popovers
    var listaTriggerPopover = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var listaPopovers = listaTriggerPopover.map(function (elementoTriggerPopover) {
        return new bootstrap.Popover(elementoTriggerPopover);
    });
    
    // Funcionalidad de modo oscuro
    const interruptorModoOscuro = document.getElementById('darkModeSwitch');
    
    // Verificar si hay una preferencia guardada
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        interruptorModoOscuro.checked = true;
    }
    
    // Escuchar cambios en el interruptor
    interruptorModoOscuro.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Funcionalidad del modal de cookies
    const modalCookies = document.getElementById('cookieModal');
    
    // Verificar si el usuario ya ha aceptado las cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Si no ha aceptado, mostrar el modal
        if (modalCookies) {
            const modal = new bootstrap.Modal(modalCookies);
            modal.show();
            
            // Cuando el usuario acepta las cookies
            const botonAceptarCookies = document.getElementById('acceptCookies');
            if (botonAceptarCookies) {
                botonAceptarCookies.addEventListener('click', function() {
                    localStorage.setItem('cookiesAccepted', 'true');
                });
            }
            
            // También guardar cuando se cierra con la X
            modalCookies.addEventListener('hidden.bs.modal', function() {
                localStorage.setItem('cookiesAccepted', 'true');
            });
        }
    }
});