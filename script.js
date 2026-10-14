/**
 * Café & Prosa - Interactive Scripts
 * Recursos: Menu responsivo, Filtro de Cardápio, Validação de Formulário,
 * Status de funcionamento em tempo real e notificações Toast.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  // 2. Header transparente muda de estilo ao rolar a página
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Highlight de link ativo conforme a seção visível
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // 4. Filtro interativo das categorias do cardápio
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Atualizar botão ativo
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 5. Verificação em tempo real do status de funcionamento
  const statusBadge = document.getElementById('storeStatusBadge');
  if (statusBadge) {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, ..., 6 = Sábado
    const hour = now.getHours();

    // Aberto de Terça a Domingo das 08h às 20h (Segunda é 1 = Fechado)
    const isOpen = day !== 1 && hour >= 8 && hour < 20;

    if (isOpen) {
      statusBadge.className = 'status-pill open';
      statusBadge.innerHTML = `● Aberto Agora (fecha às 20h)`;
    } else {
      statusBadge.className = 'status-pill closed';
      statusBadge.innerHTML = `● Fechado Agora (abre Terça às 08h)`;
    }
  }

  // 6. Validação e Envio do Formulário de Contato / Reserva
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const contactInput = document.getElementById('userContact');
      const serviceSelect = document.getElementById('userService');
      const messageInput = document.getElementById('userMessage');

      let isValid = true;

      // Validação do Nome
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        showFieldError(nameInput, 'Por favor, informe seu nome completo.');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validação do Contato (E-mail ou Telefone)
      const contactVal = contactInput.value.trim();
      const isEmail = /\S+@\S+\.\S+/.test(contactVal);
      const isPhone = contactVal.replace(/\D/g, '').length >= 8;

      if (!contactVal || (!isEmail && !isPhone)) {
        showFieldError(contactInput, 'Informe um e-mail válido ou telefone com DDD.');
        isValid = false;
      } else {
        clearFieldError(contactInput);
      }

      // Validação da Mensagem
      if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
        showFieldError(messageInput, 'Por favor, escreva uma mensagem ou os detalhes de sua reserva.');
        isValid = false;
      } else {
        clearFieldError(messageInput);
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
          </svg> Enviando...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          contactForm.reset();

          showToast('Mensagem enviada com sucesso!', 'Recebemos seu contato e responderemos em breve com muito carinho.');
        }, 1200);
      }
    });

    // Limpar erro ao digitar
    ['userName', 'userContact', 'userMessage'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => clearFieldError(input));
      }
    });
  }

  function showFieldError(input, msg) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.parentElement.querySelector('.error-feedback');
    if (feedback) {
      feedback.textContent = msg;
      feedback.style.display = 'block';
    }
  }

  function clearFieldError(input) {
    input.classList.remove('is-invalid');
    const feedback = input.parentElement.parentElement.querySelector('.error-feedback');
    if (feedback) {
      feedback.style.display = 'none';
    }
  }

  // 7. Sistema de Toast Notifications
  function showToast(title, message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="toast-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);
    
    // Animação de entrada
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Remover após 4.5s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // Interatividade para o botão "Pedir" dos itens do cardápio
  const orderButtons = document.querySelectorAll('.order-btn-pill');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.menu-card');
      const itemName = card.querySelector('.menu-item-title').textContent;
      showToast('Item selecionado!', `"${itemName}" adicionado ao seu pedido. Mostre ao atendente na cafeteria!`);
    });
  });
});
