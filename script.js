/**
 * Café & Prosa - Script de Interatividade (JavaScript)
 * 
 * GUIA PARA INICIANTES:
 * Este arquivo adiciona vida e interatividade à página:
 * 1. Abre e fecha o menu no celular (menu hambúrguer).
 * 2. Muda o estilo do cabeçalho ao rolar a página.
 * 3. Destaca o link do menu de acordo com a seção visível.
 * 4. Filtra os itens do cardápio quando você clica nos botões (Bebidas Quentes, Geladas, etc.).
 * 5. Calcula em tempo real se a cafeteria está aberta ou fechada com base na hora atual.
 * 6. Valida o formulário para impedir envio com campos vazios e exibe alertas animados.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. MENU HAMBÚRGUER (CELULARES E TABLETS)
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    // Ao clicar no botão hambúrguer, adiciona ou remove a classe "open"
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      
      // Alterna entre o ícone de três barrinhas e o ícone de "X" para fechar
      menuToggle.innerHTML = isOpen 
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Fecha o menu automaticamente quando o usuário clica em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      });
    });

    // Fecha o menu se o usuário clicar em qualquer ponto fora dele
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }

  // ==========================================================================
  // 2. HEADER TRANSLÚCIDO DINÂMICO
  // Ao descer mais de 40px na página, o cabeçalho ganha fundo escuro elegante
  // ==========================================================================
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // 3. DESTAQUE AUTOMÁTICO DO LINK ATIVO AO ROLAR A PÁGINA
  // (Utiliza a API nativa IntersectionObserver do navegador)
  // ==========================================================================
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

  // ==========================================================================
  // 4. FILTRO DE CATEGORIAS DO CARDÁPIO
  // Permite clicar em "Cafés Quentes", "Bebidas Geladas" ou "Comidas"
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Marca o botão clicado como ativo
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // 2. Mostra ou oculta os cartões correspondentes com transição suave
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

  // ==========================================================================
  // 5. STATUS EM TEMPO REAL: "ABERTO AGORA" OU "FECHADO AGORA"
  // Regra: Aberto de Terça a Domingo, das 08:00 às 20:00 (Segunda é fechado)
  // ==========================================================================
  const statusBadge = document.getElementById('storeStatusBadge');
  if (statusBadge) {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, ..., 6 = Sábado
    const hour = now.getHours();

    const isOpen = day !== 1 && hour >= 8 && hour < 20;

    if (isOpen) {
      statusBadge.className = 'status-pill open';
      statusBadge.innerHTML = `● Aberto Agora (fecha às 20h)`;
    } else {
      statusBadge.className = 'status-pill closed';
      statusBadge.innerHTML = `● Fechado Agora (abre Terça às 08h)`;
    }
  }

  // ==========================================================================
  // 6. VALIDAÇÃO DO FORMULÁRIO DE CONTATO / RESERVA
  // Garante que campos obrigatórios (Nome, E-mail/Telefone, Mensagem) não fiquem vazios
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Impede o recarregamento padrão da página

      const nameInput = document.getElementById('userName');
      const contactInput = document.getElementById('userContact');
      const messageInput = document.getElementById('userMessage');

      let isValid = true;

      // 1. Validação do Nome (mínimo 3 caracteres)
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        showFieldError(nameInput, 'Por favor, informe seu nome completo.');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // 2. Validação do Contato (deve ser e-mail válido ou telefone com no mínimo 8 dígitos)
      const contactVal = contactInput.value.trim();
      const isEmail = /\S+@\S+\.\S+/.test(contactVal);
      const isPhone = contactVal.replace(/\D/g, '').length >= 8;

      if (!contactVal || (!isEmail && !isPhone)) {
        showFieldError(contactInput, 'Informe um e-mail válido ou telefone com DDD.');
        isValid = false;
      } else {
        clearFieldError(contactInput);
      }

      // 3. Validação da Mensagem (mínimo 5 caracteres)
      if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
        showFieldError(messageInput, 'Por favor, escreva uma mensagem ou os detalhes de sua reserva.');
        isValid = false;
      } else {
        clearFieldError(messageInput);
      }

      // Se tudo estiver preenchido corretamente, simula o envio com sucesso
      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
          </svg> Enviando...`;

        // Simula tempo de resposta do servidor (1.2 segundos)
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          contactForm.reset();

          // Exibe notificação de confirmação elegante
          showToast('Mensagem enviada com sucesso!', 'Recebemos seu contato e responderemos em breve com muito carinho.');
        }, 1200);
      }
    });

    // Remove a mensagem de erro assim que o usuário começa a digitar no campo
    ['userName', 'userContact', 'userMessage'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => clearFieldError(input));
      }
    });
  }

  // Função auxiliar para exibir o erro no campo
  function showFieldError(input, msg) {
    input.classList.add('is-invalid');
    const feedback = input.parentElement.parentElement.querySelector('.error-feedback');
    if (feedback) {
      feedback.textContent = msg;
      feedback.style.display = 'block';
    }
  }

  // Função auxiliar para limpar o erro
  function clearFieldError(input) {
    input.classList.remove('is-invalid');
    const feedback = input.parentElement.parentElement.querySelector('.error-feedback');
    if (feedback) {
      feedback.style.display = 'none';
    }
  }

  // ==========================================================================
  // 7. SISTEMA DE NOTIFICAÇÃO TOAST (FEEDBACK VISUAL MODERNO)
  // ==========================================================================
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

    // Remove automaticamente após 4.5 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // ==========================================================================
  // 8. BOTÃO "ESCOLHER" NOS ITENS DO CARDÁPIO
  // Dá um feedback simpático ao usuário ao clicar em qualquer item
  // ==========================================================================
  const orderButtons = document.querySelectorAll('.order-btn-pill');
  orderButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.menu-card');
      const itemName = card.querySelector('.menu-item-title').textContent;
      showToast('Item Selecionado!', `"${itemName}" foi registrado. Mostre ao nosso atendente na sua visita!`);
    });
  });
});
