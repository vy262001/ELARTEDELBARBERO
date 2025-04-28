// scripts.js mejorado

document.addEventListener('DOMContentLoaded', function () {

    // Mostrar nombre del usuario si está logueado
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    const userWelcome = document.getElementById('user-welcome');
    const cerrarSesionBtn = document.getElementById('cerrar-sesion');
  
    if (usuarioLogueado === 'true' && usuario && userWelcome && cerrarSesionBtn) {
      userWelcome.textContent = `👤 Hola, ${usuario.nombre}`;
      cerrarSesionBtn.classList.remove('d-none');
    }
  
    // Botón cerrar sesión
    if (cerrarSesionBtn) {
      cerrarSesionBtn.addEventListener('click', function() {
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('usuarioEmail');
        window.location.href = 'index.html';
      });
    }
  
    // Protección del botón de agendar cita
    const btnAgendar = document.getElementById('btn-agendar');
    if (btnAgendar) {
      btnAgendar.addEventListener('click', function(event) {
        event.preventDefault();
        if (localStorage.getItem('usuarioLogueado') === 'true') {
          window.location.href = 'agendarcita.html';
        } else {
          const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
          loginModal.show();
          alert('Debes iniciar sesión o registrarte para agendar una cita.');
        }
      });
    }
  
    // Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailLogin = document.getElementById('login-email').value;
        const passwordLogin = document.getElementById('login-password').value;
  
        const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  
        if (usuarioGuardado && usuarioGuardado.email === emailLogin) {
          localStorage.setItem('usuarioLogueado', 'true');
          localStorage.setItem('usuarioEmail', emailLogin);
          alert(`Bienvenido, ${usuarioGuardado.nombre}!`);
          window.location.href = 'agendarcita.html';
        } else {
          alert('Correo electrónico no registrado. Por favor, regístrate primero.');
        }
      });
    }
  
    // Registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreRegistro = document.getElementById('register-nombre').value;
        const emailRegistro = document.getElementById('register-email').value;
  
        const usuarioNuevo = {
          nombre: nombreRegistro,
          email: emailRegistro
        };
  
        localStorage.setItem('usuario', JSON.stringify(usuarioNuevo));
        localStorage.setItem('usuarioLogueado', 'true');
  
        alert(`Bienvenido, ${nombreRegistro}!`);
        window.location.href = 'agendarcita.html';
      });
    }
  
    // Proteger agendarcita.html si no está logueado
    if (window.location.pathname.includes('agendarcita.html')) {
      if (localStorage.getItem('usuarioLogueado') !== 'true') {
        alert('Debes iniciar sesión para acceder a esta página.');
        window.location.href = 'index.html';
      }
    }
  });
  