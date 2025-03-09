// JavaScript para WikiEspacio

// Inicializar todos los tooltips de Bootstrap y funcionalidad de modo oscuro
document.addEventListener('DOMContentLoaded', function() {
    // Lista de archivos HTML para autocompletado
    const htmlFiles = [
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
    function setupAutocomplete() {
        const searchInput = document.querySelector('input[type="search"]');
        
        if (!searchInput) return;
        
        // Crear el contenedor de resultados de autocompletado
        const autocompleteContainer = document.createElement('div');
        autocompleteContainer.className = 'autocomplete-results';
        autocompleteContainer.style.position = 'absolute';
        autocompleteContainer.style.zIndex = '1000';
        autocompleteContainer.style.backgroundColor = 'var(--bg-color)';
        autocompleteContainer.style.width = searchInput.offsetWidth + 'px';
        autocompleteContainer.style.maxHeight = '300px';
        autocompleteContainer.style.overflowY = 'auto';
        autocompleteContainer.style.border = '1px solid var(--border-color)';
        autocompleteContainer.style.borderRadius = '0 0 4px 4px';
        autocompleteContainer.style.display = 'none';
        autocompleteContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        autocompleteContainer.style.top = searchInput.offsetHeight + 'px';
        
        // Insertar el contenedor después del input de búsqueda
        searchInput.parentNode.style.position = 'relative';
        searchInput.parentNode.appendChild(autocompleteContainer);
        
        // Evento para detectar cambios en el input
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm.length < 2) {
                autocompleteContainer.style.display = 'none';
                return;
            }
            
            // Filtrar archivos que coincidan con el término de búsqueda
            const matchingFiles = htmlFiles.filter(file => 
                file.toLowerCase().includes(searchTerm)
            );
            
            // Mostrar resultados
            if (matchingFiles.length > 0) {
                autocompleteContainer.innerHTML = '';
                matchingFiles.forEach(file => {
                    const item = document.createElement('div');
                    item.className = 'autocomplete-item';
                    item.style.padding = '8px 12px';
                    item.style.cursor = 'pointer';
                    item.style.borderBottom = '1px solid var(--border-color)';
                    item.style.transition = 'background-color 0.2s';
                    
                    // Resaltar el término de búsqueda en el resultado
                    const fileName = file;
                    const highlightedName = fileName.replace(
                        new RegExp(searchTerm, 'gi'),
                        match => `<strong>${match}</strong>`
                    );
                    
                    item.innerHTML = highlightedName;
                    
                    // Al hacer clic en un resultado
                    item.addEventListener('click', function() {
                        // Determinar si estamos en la página principal o en una subpágina
                        const isMainPage = window.location.pathname.endsWith('index.html') || 
                                        window.location.pathname.endsWith('/') || 
                                        window.location.pathname.split('/').pop() === '';
                        
                        // Ajustar la ruta según donde estemos
                        if (isMainPage) {
                            window.location.href = 'html/' + fileName;
                        } else {
                            window.location.href = fileName;
                        }
                    });
                    
                    // Efectos de hover
                    item.addEventListener('mouseenter', function() {
                        this.style.backgroundColor = 'var(--accordion-active-bg)';
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        this.style.backgroundColor = '';
                    });
                    
                    autocompleteContainer.appendChild(item);
                });
                
                autocompleteContainer.style.display = 'block';
            } else {
                autocompleteContainer.style.display = 'none';
            }
        });
        
        // Ocultar resultados al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !autocompleteContainer.contains(e.target)) {
                autocompleteContainer.style.display = 'none';
            }
        });
        
        // Navegación con teclado
        searchInput.addEventListener('keydown', function(e) {
            const items = autocompleteContainer.querySelectorAll('.autocomplete-item');
            if (!items.length) return;
            
            // Índice del elemento actualmente seleccionado
            let currentIndex = -1;
            items.forEach((item, index) => {
                if (item.classList.contains('active')) {
                    currentIndex = index;
                    item.classList.remove('active');
                    item.style.backgroundColor = '';
                }
            });
            
            // Navegar con flechas
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentIndex = (currentIndex + 1) % items.length;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentIndex = (currentIndex - 1 + items.length) % items.length;
            } else if (e.key === 'Enter' && currentIndex >= 0) {
                e.preventDefault();
                items[currentIndex].click();
                return;
            } else if (e.key === 'Escape') {
                autocompleteContainer.style.display = 'none';
                return;
            } else {
                return;
            }
            
            // Marcar el nuevo elemento seleccionado
            if (currentIndex >= 0) {
                items[currentIndex].classList.add('active');
                items[currentIndex].style.backgroundColor = 'var(--accordion-active-bg)';
                items[currentIndex].scrollIntoView({ block: 'nearest' });
            }
        });
    }
    
    // Iniciar la funcionalidad de autocompletado
    setupAutocomplete();
    
    // Inicializar tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializar popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Funcionalidad de modo oscuro
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    
    // Verificar si hay una preferencia guardada
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeSwitch.checked = true;
    }
    
    // Escuchar cambios en el interruptor
    darkModeSwitch.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Funcionalidad del modal de cookies
    const cookieModal = document.getElementById('cookieModal');
    
    // Verificar si el usuario ya ha aceptado las cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        // Si no ha aceptado, mostrar el modal
        if (cookieModal) {
            const modal = new bootstrap.Modal(cookieModal);
            modal.show();
            
            // Cuando el usuario acepta las cookies
            const acceptCookiesBtn = document.getElementById('acceptCookies');
            if (acceptCookiesBtn) {
                acceptCookiesBtn.addEventListener('click', function() {
                    localStorage.setItem('cookiesAccepted', 'true');
                });
            }
            
            // También guardar cuando se cierra con la X
            cookieModal.addEventListener('hidden.bs.modal', function() {
                localStorage.setItem('cookiesAccepted', 'true');
            });
        }
    }
});