/* ============================================================
   Recanto do Sol Chalés — script.js
   Troque os dados abaixo pelos reais antes de publicar.
   ============================================================ */


   /* ============================================================
   Lenis - Scroll Suave com Inércia
   ============================================================ */
function initSmoothScroll() {
  // Inicializa o motor com as configurações de peso e inércia
  const lenis = new Lenis({
    duration: 1.2,       // Quão demorado é o arrasto
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva matemática da suavidade
    direction: 'vertical', 
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,  // Força do mouse wheel
    smoothTouch: false,  // O ideal é falso para não estragar a sensação tátil natural do celular
    touchMultiplier: 2,
    infinite: false,
  });

  // Conecta o motor de física do Lenis ao Animation Frame do navegador (60fps)
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  
  // (OPCIONAL) Faz com que seus links com âncoras (href="#historia") deslizem suavemente usando a física do Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id !== '#') {
        e.preventDefault();
        // O offset subtrai a altura do header fixo (ex: 80px)
        lenis.scrollTo(id, { offset: -80 }); 
      }
    });
  });
}

const CONFIG = {
  whatsapp: "5541998023653",
  instagram: "https://www.instagram.com/recanto_sol_colombo/",
  maps: "https://maps.app.goo.gl/zTV1G25qrThdNrNs9",
  airbnb: "https://www.airbnb.com.br/s/recanto-do-sol-colombo/homes?refinement_paths%5B%5D=%2Fhomes&date_picker_type=calendar&search_type=search_query"
};

/* ---- Utilitários ---- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const waLink = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

const brl = (v) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

/* ---- Dados dos Chalés ---- */
const CHALES = [
  {
    id: "chale-por-do-sol",
    nome: "Chalé Pôr do Sol",
    badge: "Vista aberta do pôr do sol",
    capacidade: "Casal com até 2 crianças",
    chamada: "O mais tecnológico, com lareira a lenha, Alexa e hidromassagem",
    descricao:
      "Uma estadia relaxante em um chalé completamente equipado, com atmosfera aconchegante e tecnológica — pensado para quem quer ver o sol se despedir da varanda com conforto total.",
    comodidades: [
      "Hidromassagem",
      "Cozinha equipada completa",
      "Lareira a lenha",
      "Alexa e luzes inteligentes",
      "Wi-Fi",
      "Sofá-cama confortável",
      "Banheiro privativo",
      "TV a cabo",
    ],
    andarSuperior:
      "Cama queen com massagem e ar-condicionado — roupas de cama e banho inclusas",
    precos: { semana: 650, fimSemana: 850, pacote: 1300 },
    galeria: [
      { src: "assets/img/sol/drone2.webp",       alt: "Fachada do Chalé Pôr do Sol ao meio-dia" },
      { src: "assets/img/sol/sol-exterior-noite.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" },
      { src: "assets/img/sol/sala.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" },
      { src: "assets/img/sol/tv.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" },
      { src: "assets/img/sol/cozinha.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" },
      { src: "assets/img/sol/banheira.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" },
      { src: "assets/img/sol/banheira2.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" },
      { src: "assets/img/sol/vista2-andar.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" },
      { src: "assets/img/sol/cama-decorada.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" },
      { src: "assets/img/sol/vista-cama.webp",     alt: "Chalé Pôr do Sol iluminado ao anoitecer" }
    ],
  },
  {
    id: "chale-recanto-do-bosque",
    nome: "Chalé Recanto do Bosque",
    badge: "Imerso na mata com sacada",
    capacidade: "Casal com até 2 crianças",
    chamada: "Cercado de pinheiros, com rede suspensa e banheira de hidromassagem",
    descricao:
      "Um refúgio entre as árvores para casais que querem silêncio, banho de hidromassagem na sacada e o som dos pássaros ao despertar.",
    comodidades: [
      "Banheira de hidromassagem",
      "Cozinha completa",
      "Lareira elétrica",
      "Alexa",
      "Wi-Fi",
      "Sofá-cama confortável",
      "Banheiro privativo",
      "Rede suspensa",
    ],
    andarSuperior:
      "Cama de casal, ar-condicionado, TV a cabo e sacada — roupas de cama e banho inclusas",
    precos: { semana: 500, fimSemana: 700, pacote: 1100 },
    galeria: [
      { src: "assets/img/bosque/bosque-exterior-dia.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/bosque-exterior-noite.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/sala.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/sala2.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/cozinha.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/cozinha-ampla.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/banheira.jpg",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/cama-decorada.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/rede-suspensa.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
      { src: "assets/img/bosque/drone.webp",  alt: "Chalé Recanto do Bosque entre os pinheiros — vista frontal" },
    ],
  },
];

/* ---- Renderiza card de chalé ---- */
function criarCardChale(chale, index) {
  const article = document.createElement("article");
  article.id = chale.id;
  article.className = `chale-card${index % 2 === 1 ? " reversed" : ""}`;

  const waMsg = `Olá! Gostaria de verificar a disponibilidade do ${chale.nome} no Recanto do Sol Chalés.`;

  article.innerHTML = `
    <div class="chale-media">
      <div class="chale-photo-wrap">
        <img
          class="chale-main-img"
          src="${chale.galeria[0].src}"
          alt="${chale.galeria[0].alt}"
          loading="${index === 0 ? 'eager' : 'lazy'}"
        />
        <span class="chale-badge">${chale.badge}</span>
      </div>
      <div class="chale-thumbs" role="list" aria-label="Fotos do ${chale.nome}">
        ${chale.galeria
          .map(
            (g, i) => `
          <button
            class="chale-thumb"
            data-index="${i}"
            aria-current="${i === 0}"
            aria-label="Foto ${i + 1}: ${g.alt}"
            role="listitem"
            type="button"
          >
            <img src="${g.src}" alt="" loading="lazy" />
          </button>`
          )
          .join("")}
      </div>
    </div>

    <div class="chale-info">
      <div>
        <span class="eyebrow">${chale.capacidade}</span>
        <h3>${chale.nome}</h3>
        <p class="chale-chamada">${chale.chamada}</p>
        <p class="chale-desc">${chale.descricao}</p>
      </div>

      <ul class="comodidades">
        ${chale.comodidades.map((c) => `<li>${c}</li>`).join("")}
      </ul>

      <p class="chale-superior">
        <strong>Andar superior —</strong> ${chale.andarSuperior}
      </p>

      <div class="chale-precos">
        <div class="precos-grid">
          <div class="preco-item">
            <p class="preco-label">Seg, ter, qua e quinta</p>
            <p class="preco-val">${brl(chale.precos.semana)}</p>
          </div>
          <div class="preco-item">
            <p class="preco-label">Sex, sáb, dom e feriados</p>
            <p class="preco-val">${brl(chale.precos.fimSemana)}</p>
          </div>
          <div class="preco-item destaque">
            <p class="preco-label">Pacote fim de semana</p>
            <p class="preco-val">${brl(chale.precos.pacote)}</p>
          </div>
        </div>
        <p class="preco-note">Valores por estadia. Check-in 14h · Check-out 16h.</p>
      </div>

      <button
        class="btn btn-whats open-modal-datas"
        data-chale="${chale.nome}"
        style="align-self: flex-start;"
        type="button"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        Consultar datas
      </button>
    </div>
  `;

  /* Troca de foto ao clicar na thumbnail */
  const mainImg = article.querySelector(".chale-main-img");
  article.querySelectorAll(".chale-thumb").forEach((btn) => {
    btn.addEventListener("click", () => {
      const g = chale.galeria[Number(btn.dataset.index)];
      mainImg.src = g.src;
      mainImg.alt = g.alt;
      article
        .querySelectorAll(".chale-thumb")
        .forEach((b) => b.setAttribute("aria-current", String(b === btn)));
    });
  });

  return article;
}

/* ---- Sticky nav shadow ---- */
function initNavScroll() {
  const nav = $("#nav-bar");
  if (!nav) return;
  const observer = new IntersectionObserver(
    ([e]) => nav.classList.toggle("scrolled", !e.isIntersecting),
    { threshold: 0 }
  );
  const sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:80px;left:0;width:1px;height:1px;";
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}

/* ---- Mobile menu toggle ---- */
function initMobileMenu() {
  const toggle = $(".nav-toggle");
  const menu = $("#mobile-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("open", !expanded);
    menu.setAttribute("aria-hidden", String(expanded));
  });

  /* Close on link click */
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
    });
  });
}

/* ---- Link helpers ---- */
function initLinks() {
  const defaultMsg = "Olá! Gostaria de consultar datas no Recanto do Sol Chalés.";

  const waIds = ["nav-whats", "mobile-nav-whats", "hero-whats", "reservas-whats", "fab-whats", "footer-whats"];
  waIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = waLink(id === "footer-whats" ? defaultMsg : defaultMsg);
    }
  });

  const ig = document.getElementById("link-instagram");
  if (ig) ig.href = CONFIG.instagram;

  const maps = document.getElementById("link-maps");
  if (maps) maps.href = CONFIG.maps;

  const footerWa = document.getElementById("footer-whats");
  if (footerWa) footerWa.href = waLink(defaultMsg);
}

/* ---- Smooth active nav on scroll ---- */
function initActiveNav() {
  const sections = $$("section[id], div[id='topo']");
  const links = $$(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.style.color = active ? "var(--fg)" : "";
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ════════════════════════════════════════════════════
   MODAL — Calendário de Disponibilidade
   ════════════════════════════════════════════════════ */
function initModal() {
  const overlay   = document.getElementById("modal-datas");
  const closeBtn  = document.getElementById("modal-close");
  const submitBtn = document.getElementById("modal-submit");
  if (!overlay) return;

  /* ── Estado global do calendário ─────────────────── */
  const state = {
    chaleKey    : "sol",        // "sol" | "bosque"
    chaleName   : "",
    datas       : {},           // { "YYYY-MM-DD": "disponivel" | "indisponivel" }
    viewOffset  : 0,            // quantos meses à frente da data atual
    checkin     : null,         // Date | null
    checkout    : null,         // Date | null
    hospedes    : 2,
    carregando  : false,
  };

  /* ── Utilitários de data ─────────────────────────── */
  const hoje = () => {
    const d = new Date(); d.setHours(0,0,0,0); return d;
  };
  const isoDate  = (d) => d.toISOString().split("T")[0];
  const fmtBR    = (d) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  const addMonth = (d, n) => { const r = new Date(d); r.setMonth(r.getMonth() + n); return r; };
  const sameDay  = (a, b) => a && b && isoDate(a) === isoDate(b);
  const between  = (d, a, b) => a && b && d > a && d < b;

  const DIAS_SEMANA = ["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];
  const MESES_PT    = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho",
                       "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

  /* ── Elementos DOM ───────────────────────────────── */
  const elLoading  = document.getElementById("cal-loading");
  const elError    = document.getElementById("cal-error");
  const elWrap     = document.getElementById("cal-wrap");
  const elMonths   = document.getElementById("cal-months");
  const elPrev     = document.getElementById("cal-prev");
  const elNext     = document.getElementById("cal-next");
  const elCheckin  = document.getElementById("val-checkin");
  const elCheckout = document.getElementById("val-checkout");
  const elHospedes = document.getElementById("val-hospedes");
  const elFooter   = document.getElementById("modal-footer");
  const elEyebrow  = document.getElementById("modal-chale-eyebrow");
  const elRetry    = document.getElementById("cal-retry");
  const elHint     = document.getElementById("cal-hint");

  /* ── Dados mock para testes locais (sem servidor PHP) ── */
  function gerarMockDatas(chaleKey) {
    const datas = {};
    const hoje_ = new Date(); hoje_.setHours(0,0,0,0);
    const fim   = new Date(hoje_); fim.setMonth(fim.getMonth() + 4);

    // Bloqueios de exemplo — substitua pelas datas reais no PHP
    const bloqueiosMock = {
      sol: [
        // Semanas bloqueadas de exemplo
        ...diasEntre("2026-09-19", "2026-09-22"),
        ...diasEntre("2026-10-03", "2026-10-06"),
        ...diasEntre("2026-10-10", "2026-10-12"),
        ...diasEntre("2026-11-14", "2026-11-16"),
        ...diasEntre("2026-12-20", "2026-12-28"),
      ],
      bosque: [
        ...diasEntre("2026-09-26", "2026-09-29"),
        ...diasEntre("2026-10-17", "2026-10-20"),
        ...diasEntre("2026-11-07", "2026-11-10"),
        ...diasEntre("2026-12-23", "2026-12-30"),
      ],
    };

    function diasEntre(inicio, fim_) {
      const result = []; const c = new Date(inicio);
      while (c <= new Date(fim_)) { result.push(c.toISOString().split("T")[0]); c.setDate(c.getDate()+1); }
      return result;
    }

    const bloqueados = new Set(bloqueiosMock[chaleKey] || []);
    const cur = new Date(hoje_);
    while (cur <= fim) {
      const iso = cur.toISOString().split("T")[0];
      datas[iso] = bloqueados.has(iso) ? "indisponivel" : "disponivel";
      cur.setDate(cur.getDate() + 1);
    }
    return datas;
  }

  /* ── Carrega dados da API PHP (com fallback mock) ── */
  async function carregarDatas(chaleKey) {
    state.carregando = true;
    elLoading.hidden = false;
    elError.hidden   = true;
    elWrap.hidden    = true;

    // Em ambiente local (file:// ou sem PHP), usa mock direto
    const isLocal = location.protocol === "file:" || location.hostname === "127.0.0.1" || location.hostname === "localhost";

    try {
      if (isLocal) throw new Error("local"); // força fallback mock em dev local

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`api/disponibilidade.php?chale=${chaleKey}&meses=4`, { signal: controller.signal });
      clearTimeout(timeout);

      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      state.datas = json.datas || {};
    } catch (err) {
      // Fallback: usa dados mock (ambiente local ou erro de rede)
      console.info("API PHP indisponível — usando dados de demonstração:", err.message);
      state.datas = gerarMockDatas(chaleKey);
    }

    state.carregando = false;
    elLoading.hidden = true;
    elWrap.hidden    = false;
    renderCalendario();
  }

  /* ── Renderiza os dois meses ─────────────────────── */
  function renderCalendario() {
    const base = hoje();
    const mes0 = addMonth(base, state.viewOffset);
    const mes1 = addMonth(base, state.viewOffset + 1);

    elMonths.innerHTML = "";
    elMonths.appendChild(renderMes(mes0));
    elMonths.appendChild(renderMes(mes1));

    /* Botão prev só aparece se não for o mês atual */
    elPrev.disabled = state.viewOffset === 0;

    updateBar();
  }

  /* ── Renderiza um mês ────────────────────────────── */
  function renderMes(refDate) {
    const ano = refDate.getFullYear();
    const mes = refDate.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia  = new Date(ano, mes + 1, 0);

    const wrap = document.createElement("div");
    wrap.className = "cal-month";

    /* Título */
    const titulo = document.createElement("div");
    titulo.className = "cal-month-title";
    titulo.textContent = `${MESES_PT[mes]} ${ano}`;
    wrap.appendChild(titulo);

    /* Grid */
    const grid = document.createElement("div");
    grid.className = "cal-grid";

    /* Cabeçalho de dias da semana */
    DIAS_SEMANA.forEach(d => {
      const el = document.createElement("div");
      el.className = "cal-weekday";
      el.textContent = d;
      grid.appendChild(el);
    });

    /* Células vazias antes do primeiro dia */
    for (let i = 0; i < primeiroDia.getDay(); i++) {
      grid.appendChild(document.createElement("div"));
    }

    /* Dias do mês */
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      const data = new Date(ano, mes, dia);
      const iso  = isoDate(data);
      const cell = document.createElement("div");
      cell.className = "cal-day";
      cell.textContent = dia;
      cell.dataset.iso = iso;

      const agora = hoje();

      if (data < agora) {
        cell.classList.add("cal-day--passado");
      } else if (sameDay(data, agora)) {
        cell.classList.add("cal-day--hoje", "cal-day--disponivel");
      } else if (state.datas[iso] === "indisponivel") {
        cell.classList.add("cal-day--indisponivel");
      } else {
        cell.classList.add("cal-day--disponivel");
      }

      /* Marcação de seleção */
      if (sameDay(data, state.checkin))  cell.classList.add("cal-day--checkin");
      if (sameDay(data, state.checkout)) cell.classList.add("cal-day--checkout");
      if (state.checkin && state.checkout && between(data, state.checkin, state.checkout)) {
        /* verifica se há bloqueado no range */
        if (state.datas[iso] === "indisponivel") {
          cell.classList.add("cal-day--range-blocked");
        } else {
          cell.classList.add("cal-day--range");
        }
      }

      /* Click */
      cell.addEventListener("click", () => handleDayClick(data, iso));

      grid.appendChild(cell);
    }

    wrap.appendChild(grid);
    return wrap;
  }

  /* ── Lógica de clique num dia ────────────────────── */
  function handleDayClick(data, iso) {
    const agora = hoje();
    if (data < agora) return;
    if (state.datas[iso] === "indisponivel") return;

    /* Se não tem checkin ou já tem os dois, inicia nova seleção */
    if (!state.checkin || (state.checkin && state.checkout)) {
      state.checkin  = data;
      state.checkout = null;
    } else {
      /* Já tem checkin, escolhe checkout */
      if (data <= state.checkin) {
        /* Clicou antes ou no mesmo dia — reinicia */
        state.checkin  = data;
        state.checkout = null;
      } else {
        /* Verifica se há datas bloqueadas entre checkin e data */
        const hasBloqueado = rangeTemBloqueado(state.checkin, data);
        if (hasBloqueado) {
          /* Reinicia a partir daqui */
          state.checkin  = data;
          state.checkout = null;
        } else {
          state.checkout = data;
        }
      }
    }

    renderCalendario();
    updateFooter();
  }

  /* ── Verifica se há bloqueado entre duas datas ───── */
  function rangeTemBloqueado(inicio, fim) {
    const cur = new Date(inicio);
    cur.setDate(cur.getDate() + 1);
    while (cur < fim) {
      if (state.datas[isoDate(cur)] === "indisponivel") return true;
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  }

  /* ── Atualiza barra inferior ─────────────────────── */
  function updateBar() {
    if (state.checkin) {
      elCheckin.textContent = fmtBR(state.checkin);
      elCheckin.classList.add("cal-bar-value--set");
    } else {
      elCheckin.textContent = "Selecione uma data";
      elCheckin.classList.remove("cal-bar-value--set");
    }
    if (state.checkout) {
      elCheckout.textContent = fmtBR(state.checkout);
      elCheckout.classList.add("cal-bar-value--set");
    } else {
      elCheckout.textContent = "Selecione uma data";
      elCheckout.classList.remove("cal-bar-value--set");
    }
    elHospedes.textContent = state.hospedes;
  }

  /* ── Mostra/oculta botão WhatsApp ────────────────── */
  function updateFooter() {
    const completo = state.checkin && state.checkout;
    elFooter.hidden = !completo;
    elHint.hidden   = !!completo;
  }

  /* ── Navegação de meses ──────────────────────────── */
  elPrev?.addEventListener("click", () => {
    if (state.viewOffset > 0) { state.viewOffset--; renderCalendario(); }
  });
  elNext?.addEventListener("click", () => {
    state.viewOffset++;
    renderCalendario();
  });

  /* ── Hóspedes ────────────────────────────────────── */
  document.getElementById("hospedes-menos")?.addEventListener("click", () => {
    if (state.hospedes > 1) { state.hospedes--; updateBar(); }
  });
  document.getElementById("hospedes-mais")?.addEventListener("click", () => {
    if (state.hospedes < 4) { state.hospedes++; updateBar(); }
  });

  /* ── Limpar ──────────────────────────────────────── */
  document.getElementById("cal-clear")?.addEventListener("click", () => {
    state.checkin  = null;
    state.checkout = null;
    renderCalendario();
    updateFooter();
  });

  /* ── Retry ───────────────────────────────────────── */
  elRetry?.addEventListener("click", () => carregarDatas(state.chaleKey));

  /* ── Abrir modal ─────────────────────────────────── */
  function openModal(chaleName, chaleKey) {
    state.chaleName   = chaleName || "Chalé";
    state.chaleKey    = chaleKey || "sol";
    state.checkin     = null;
    state.checkout    = null;
    state.viewOffset  = 0;

    if (elEyebrow) elEyebrow.textContent = chaleName || "Calendário";
    elFooter.hidden = true;
    if (elHint) elHint.hidden = false;

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    carregarDatas(state.chaleKey);
  }

  /* ── Fechar modal ────────────────────────────────── */
  function closeModal() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ── Delegar clique nos botões dos chalés ────────── */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".open-modal-datas");
    if (!btn) return;
    const chaleName = btn.dataset.chale || "";
    /* Mapeia nome → chaveKey */
    const chaleKey = chaleName.toLowerCase().includes("bosque") ? "bosque" : "sol";
    openModal(chaleName, chaleKey);
  });

  closeBtn?.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  /* ── Enviar para WhatsApp ────────────────────────── */
  submitBtn?.addEventListener("click", () => {
    if (!state.checkin || !state.checkout) return;

    const hStr = state.hospedes === 1 ? "1 hóspede" : `${state.hospedes} hóspedes`;
    let msg = `Olá! Gostaria de reservar no Recanto do Sol Chalés.\n\n`;
    msg += `- Chalé: ${state.chaleName}\n`;
    msg += `- Check-in: ${fmtBR(state.checkin)} (a partir das 14h)\n`;
    msg += `- Check-out: ${fmtBR(state.checkout)} (até as 16h)\n`;
    msg += `- Hóspedes: ${hStr}\n`;

    window.open(waLink(msg), "_blank", "noreferrer");
    closeModal();
  });
}

/* ---- Entry point ---- */





/* ---- Dados dos Depoimentos (Adicione no script.js) ---- */
const DEPOIMENTOS = [
  { nome: "Marina Costa", data: "03/05/2023", iniciais: "MC", texto: "A melhor experiência que já tive em um hotel no Brasil. O quarto era impecável, a equipe atenciosa e o café da manhã surpreendeu." },
  { nome: "Ricardo Ferreira", data: "23/12/2025", iniciais: "RF", texto: "Viemos para viagem de negócios e ficamos encantados. O Wi-Fi é excelente e a lareira garantiu o aquecimento perfeito." },
  { nome: "Ana Lima", data: "05/08/2026", iniciais: "AL", texto: "O pôr do sol visto da varanda é espetacular. O chalé tem tudo o que precisamos para relaxar de verdade." },
  { nome: "Lucas Silva", data: "12/01/2026", iniciais: "LS", texto: "Lugar maravilhoso para se desconectar da cidade. A fogueira à noite com um bom vinho formaram a combinação perfeita." },
  { nome: "Fernanda Souza", data: "18/07/2026", iniciais: "FS", texto: "A área externa é linda e super bem cuidada. Fizemos um churrasco no quiosque e foi um momento incrível." },
  { nome: "Carlos Eduardo", data: "22/11/2025", iniciais: "CE", texto: "Fiz uma surpresa de aniversário de casamento. A equipe organizou uma decoração romântica que superou as expectativas." },
  { nome: "Juliana Mendes", data: "10/02/2026", iniciais: "JM", texto: "Cesta de café da manhã farta e deliciosa! A facilidade com as luzes e a Alexa integrada deixou tudo mais aconchegante." },
  { nome: "Roberto Alves", data: "30/04/2026", iniciais: "RA", texto: "Fomos em família e as crianças adoraram o espaço kids. Ambiente seguro e contato maravilhoso com a natureza." },
  { nome: "Camila Rocha", data: "14/09/2026", iniciais: "CR", texto: "A banheira de hidromassagem na sacada, rodeada de pinheiros, entregou a melhor manhã que já tive em uma viagem." },
  { nome: "Thiago Oliveira", data: "05/10/2026", iniciais: "TO", texto: "Paz absoluta! Fica bem perto, mas parece que estamos em outro mundo devido ao silêncio. Voltaremos em breve." },
  { nome: "Marina Costa", data: "03/05/2023", iniciais: "MC", texto: "A melhor experiência que já tive em um hotel no Brasil. O quarto era impecável, a equipe atenciosa e o café da manhã surpreendeu." },
  { nome: "Ricardo Ferreira", data: "23/12/2025", iniciais: "RF", texto: "Viemos para viagem de negócios e ficamos encantados. O Wi-Fi é excelente e a lareira garantiu o aquecimento perfeito." }
];

/* ---- Lógica do Carrossel ---- */
function initDepoimentosCarousel() {
  const track = document.getElementById("depoimentos-track");
  const dotsContainer = document.getElementById("depoimentos-dots");
  const wrapper = document.getElementById("depoimentos-carousel");
  
  if (!track || !dotsContainer) return;

  // 1. Renderizar os cards estruturalmente
  track.innerHTML = DEPOIMENTOS.map(d => `
    <div class="depoimento-card">
      <div class="estrelas">
        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
      </div>
      <p>"${d.texto}"</p>
      <div class="depoimento-autor">
        <div class="autor-avatar">${d.iniciais}</div>
        <div>
          <strong>${d.nome}</strong>
          <span>${d.data}</span>
        </div>
      </div>
    </div>
  `).join("");

  let currentIndex = 0;
  let autoPlayInterval;

  // Calcula quantos itens cabem na tela de acordo com a resolução
  function getItemsPerView() {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  // Gera as bolinhas de paginação com base nos grupos possíveis
  function renderDots() {
    dotsContainer.innerHTML = "";
    const itemsPerView = getItemsPerView();
    const totalDots = Math.ceil(DEPOIMENTOS.length / itemsPerView);

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Ir para página ${i + 1}`);
      dot.addEventListener("click", () => {
        currentIndex = i * itemsPerView;
        updateCarousel();
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

// Desloca o contêiner horizontalmente
  function updateCarousel() {
    const itemsPerView = getItemsPerView();
    // Previne espaços em branco no final do carrossel
    const maxIndex = Math.max(0, DEPOIMENTOS.length - itemsPerView);
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const cardWidth = track.children[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const moveAmount = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${moveAmount}px)`;

    // Sincroniza a classe ativa da bolinha
    let activePage = Math.floor(currentIndex / itemsPerView);
    
    // Regra de exceção: Se o índice atingiu o limite máximo (final exato do carrossel), 
    // força a ativação visual da última bolinha, ignorando a sobra matemática.
    if (currentIndex === maxIndex) {
      activePage = dotsContainer.children.length - 1;
    }

    Array.from(dotsContainer.children).forEach((dot, index) => {
      dot.classList.toggle("active", index === activePage);
    });
  }

  // Função para avançar automaticamente
  function nextSlide() {
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, DEPOIMENTOS.length - itemsPerView);
    
    currentIndex += itemsPerView;
    if (currentIndex > maxIndex) currentIndex = 0; // Se passou do limite, volta ao ínicio
    
    updateCarousel();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3000); // Rotação a cada 3 segundos
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Ouve eventos de redimensionamento da janela para ajustar matemática do layout
  window.addEventListener("resize", () => {
    renderDots();
    updateCarousel();
  });

  // Pausar auto-play em caso de hover (Foco em Experiência do Usuário)
  wrapper.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
  wrapper.addEventListener("mouseleave", startAutoPlay);
  wrapper.addEventListener("touchstart", () => clearInterval(autoPlayInterval)); // Suporte a toque no celular

  // Execução inicial
  renderDots();
  updateCarousel();
  startAutoPlay();
}

document.addEventListener("DOMContentLoaded", () => {
  /* Render chalés */
  const lista = document.getElementById("lista-chales");
  if (lista) {
    lista.innerHTML = ""; /* Trava de segurança obrigatória para impedir duplicação */
    CHALES.forEach((chale, i) => lista.appendChild(criarCardChale(chale, i)));
  }

  /* Year in footer */
  const anoEl = document.getElementById("ano");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  initNavScroll();
  initMobileMenu();
  initLinks();
  initActiveNav();
  initModal();
  
  
  /* Inicializa a injeção e o funcionamento do carrossel */
  if (typeof initDepoimentosCarousel === "function") {
    initDepoimentosCarousel(); 
  }

  initParallax();
});


/* ---- Efeito Paralaxe no Hero ---- */
function initParallax() {
  const hero = document.querySelector('.hero');
  const heroImg = document.querySelector('.hero-img');
  const heroContent = document.querySelector('.hero-content');

  // Trava de segurança: se não encontrar os elementos, cancela a execução.
  if (!hero || !heroImg || !heroContent) return;

  // Acessibilidade: Desativa o efeito para usuários que configuraram o sistema operacional para reduzir movimentos (evita náuseas).
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  window.addEventListener('scroll', () => {
    // Utiliza requestAnimationFrame internamente via navegador para manter 60fps
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      // Otimização: Só calcula o paralaxe se o usuário ainda estiver vendo a seção Hero
      if (scrollY > hero.offsetHeight) return;

      // Controle de Velocidade (Ajuste os multiplicadores conforme necessário):
      // 0.4 na imagem: ela desce enquanto a tela sobe, movendo-se em uma velocidade diferente.
      // 0.15 no texto: leve atraso que destaca a profundidade em relação à imagem.
      heroImg.style.transform = `scale(1) translateY(${scrollY * 0.4
      }px)`;
      heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    });
  });
}