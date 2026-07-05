const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // ---------- SCROLL SUAVE PERSONALIZADO ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.length <= 1) return; // ignora href="#" vazio

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault(); // impede o pulo instantâneo padrão do navegador

    const headerOffset = 80; // altura aproximada do header fixo, ajuste se precisar
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500; // em milissegundos — diminua pra mais rápido, aumente pra mais lento
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easing suave (começa rápido, desacelera no final)
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * ease);
      if (elapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  });
});

// ---------- FAQ (acordeão) ----------
document.querySelectorAll('.faq-pergunta').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const jaAberto = item.classList.contains('open');

    // fecha todos os outros antes de abrir o clicado
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

    if (!jaAberto) item.classList.add('open');
  });
});

// ---------- CONTADORES ANIMADOS ----------
function animarContador(el){
  const alvo = parseInt(el.dataset.alvo, 10);
  const sufixo = el.dataset.sufixo || '';
  const duration = 1500;
  let startTime = null;

  function passo(currentTime){
    if(startTime === null) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const valorAtual = Math.floor(progress * alvo);
    el.textContent = valorAtual + sufixo;
    if(progress < 1) requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}

const contadores = document.querySelectorAll('.contador-numero');
const observerContadores = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      animarContador(entry.target);
      observerContadores.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.5 });

contadores.forEach(c => observerContadores.observe(c));

// ---------- MENU ATIVO CONFORME A SEÇÃO NA TELA ----------
const secoesMenu = document.querySelectorAll('section[id]');
const linksMenu = document.querySelectorAll('.nav-links a');

const observerMenu = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      linksMenu.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

secoesMenu.forEach(sec => observerMenu.observe(sec));

// ---------- BOTÃO VOLTAR AO TOPO ----------
const topoBtn = document.getElementById('topoBtn');

window.addEventListener('scroll', () => {
  topoBtn.classList.toggle('visivel', window.scrollY > 500);
});

topoBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- ANIMAÇÃO AO ROLAR (REVEAL) ----------
const elementosReveal = document.querySelectorAll('.reveal');

const observerReveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
      observerReveal.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -15% 0px' });

elementosReveal.forEach(el => observerReveal.observe(el));