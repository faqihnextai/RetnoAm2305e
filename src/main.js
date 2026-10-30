/* ═══════════════════════════════════════
   Retno Diwanti PORTFOLIO — MAIN JS
   Features: Search, Form Input, CRUD Data,
   Admin Dashboard & Interactive States ✨
   ═══════════════════════════════════════ */

import './style.css';

// ─── Default Initial Projects ───
const INITIAL_PROJECTS = [
  {
    id: 'p-1',
    title: 'EduTrack',
    category: 'web',
    desc: 'Sistem manajemen pembelajaran online dengan fitur tracking progress mahasiswa secara real-time.',
    tech: ['React', 'Node.js', 'MongoDB'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    demo: '#',
    github: '#'
  },
  {
    id: 'p-2',
    title: 'FoodSnap UI',
    category: 'design',
    desc: 'Redesign UI/UX untuk aplikasi pesan antar makanan dengan fokus pada pengalaman pengguna yang intuitif.',
    tech: ['Figma', 'Prototyping', 'User Research'],
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
    demo: '#',
    github: '#'
  },
  {
    id: 'p-3',
    title: 'BudgetBuddy',
    category: 'web',
    desc: 'Aplikasi pencatatan keuangan pribadi dengan visualisasi data pengeluaran dan pemasukan.',
    tech: ['Vue.js', 'Express', 'PostgreSQL'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    demo: '#',
    github: '#'
  },
  {
    id: 'p-4',
    title: 'HealthPulse',
    category: 'mobile',
    desc: 'Aplikasi kesehatan mobile untuk monitoring aktivitas harian dan pola tidur pengguna.',
    tech: ['React Native', 'Firebase', 'Chart.js'],
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    demo: '#',
    github: '#'
  },
  {
    id: 'p-5',
    title: 'CodeCollab',
    category: 'web',
    desc: 'Platform kolaborasi coding real-time dengan fitur video call dan shared terminal.',
    tech: ['Next.js', 'WebSocket', 'WebRTC'],
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop',
    demo: '#',
    github: '#'
  },
  {
    id: 'p-6',
    title: 'TravelMate',
    category: 'design',
    desc: 'Konsep desain aplikasi perjalanan dengan peta interaktif dan rekomendasi berbasis AI.',
    tech: ['Figma', 'Illustration', 'Motion Design'],
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    demo: '#',
    github: '#'
  }
];

// ─── State Management (LocalStorage) ───
let projects = loadProjects();
let messages = loadMessages();
let activeFilter = 'all';
let searchQuery = '';
let isAdminLoggedIn = sessionStorage.getItem('rd_admin_auth') === 'true';

function loadProjects() {
  try {
    const stored = localStorage.getItem('rd_portfolio_projects');
    return stored ? JSON.parse(stored) : [...INITIAL_PROJECTS];
  } catch (e) {
    console.error('Error loading projects:', e);
    return [...INITIAL_PROJECTS];
  }
}

function saveProjects() {
  try {
    localStorage.setItem('rd_portfolio_projects', JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects:', e);
  }
}

function loadMessages() {
  try {
    const stored = localStorage.getItem('rd_contact_messages');
    return stored ? JSON.parse(stored) : [
      {
        id: 'msg-demo',
        name: 'Dr. Surya (Dosen)',
        email: 'surya@univ.ac.id',
        message: 'Portofolionya bagus Retno, tingkatkan terus fitur interaktifnya!',
        date: new Date().toLocaleDateString('id-ID')
      }
    ];
  } catch (e) {
    return [];
  }
}

function saveMessages() {
  try {
    localStorage.setItem('rd_contact_messages', JSON.stringify(messages));
  } catch (e) {
    console.error('Error saving messages:', e);
  }
}

// ─── DOM Ready ───
document.addEventListener('DOMContentLoaded', () => {
  initVisitorCounter();
  initNavigation();
  initScrollReveal();
  initCountUp();
  initSkillBars();
  initCursorGlow();
  initSmoothScroll();

  // Core Interactive Features
  initPortfolioView();
  initPortfolioSearchAndFilter();
  initProjectCRUD();
  initAdminDashboard();
  initContactForm();
});

// ═══════════ VISITOR COUNTER ═══════════
function initVisitorCounter() {
  let count = parseInt(localStorage.getItem('rd_visitor_count') || '1', 10);
  if (!sessionStorage.getItem('rd_counted_visit')) {
    count += 1;
    localStorage.setItem('rd_visitor_count', count.toString());
    sessionStorage.setItem('rd_counted_visit', 'true');
  }
  const el = document.getElementById('adminStatVisitors');
  if (el) el.textContent = count.toString();
}

// ═══════════ NAVIGATION ═══════════
function initNavigation() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    nav.classList.toggle('nav--scrolled', currentScroll > 50);
    updateActiveNav();
  }, { passive: true });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav__link[data-section="${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
}

// ═══════════ PORTFOLIO VIEW & SEARCH & FILTER ═══════════
function initPortfolioView() {
  renderPortfolio();
}

function renderPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const badge = document.getElementById('projectCountBadge');
  if (!grid) return;

  const filtered = projects.filter(item => {
    const matchCategory = activeFilter === 'all' || item.category === activeFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchSearch = !query || 
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.tech.some(t => t.toLowerCase().includes(query));
    return matchCategory && matchSearch;
  });

  if (badge) {
    badge.textContent = `Menampilkan ${filtered.length} dari ${projects.length} proyek`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="portfolio__empty">
        <div class="portfolio__empty-icon">🔍</div>
        <h4>Tidak ada proyek yang sesuai</h4>
        <p>Coba kata kunci lain atau ubah filter kategori.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((project, index) => {
    const catLabel = project.category === 'web' ? 'Web App' : project.category === 'mobile' ? 'Mobile App' : 'Design UI/UX';
    const techSpans = project.tech.map(t => `<span>${escapeHtml(t)}</span>`).join('');
    
    return `
      <article class="project-card reveal-up" data-category="${project.category}" style="--delay: ${index * 0.05}s">
        <div class="project-card__img-wrap">
          <img src="${escapeHtml(project.img)}" alt="${escapeHtml(project.title)}" class="project-card__img" loading="lazy" />
          
          <div class="project-card__overlay">
            ${project.demo && project.demo !== '#' ? `
              <a href="${escapeHtml(project.demo)}" target="_blank" rel="noopener" class="project-card__link" title="Buka Demo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            ` : ''}
            ${project.github && project.github !== '#' ? `
              <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener" class="project-card__link" title="Source Code">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
              </a>
            ` : ''}
          </div>

          ${isAdminLoggedIn ? `
            <div class="project-card__admin-actions">
              <button type="button" class="card-btn card-btn--edit" data-edit-id="${project.id}">Edit</button>
              <button type="button" class="card-btn card-btn--delete" data-delete-id="${project.id}">Hapus</button>
            </div>
          ` : ''}
        </div>
        <div class="project-card__body">
          <span class="project-card__cat">${catLabel}</span>
          <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
          <p class="project-card__desc">${escapeHtml(project.desc)}</p>
          <div class="project-card__tech">
            ${techSpans}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Re-attach card admin actions
  grid.querySelectorAll('[data-edit-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditProjectModal(btn.getAttribute('data-edit-id'));
    });
  });

  grid.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteProject(btn.getAttribute('data-delete-id'));
    });
  });
}

function initPortfolioSearchAndFilter() {
  const searchInput = document.getElementById('projectSearchInput');
  const searchClear = document.getElementById('projectSearchClear');
  const filterButtons = document.querySelectorAll('.portfolio__filter-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchClear) {
        searchClear.classList.toggle('visible', searchQuery.length > 0);
      }
      renderPortfolio();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.classList.remove('visible');
      renderPortfolio();
      searchInput.focus();
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter') || 'all';
      renderPortfolio();
    });
  });
}

// ═══════════ PROJECT CRUD (CREATE, READ, UPDATE, DELETE) ═══════════
function initProjectCRUD() {
  const quickAddBtn = document.getElementById('quickAddProjectBtn');
  const adminAddNewBtn = document.getElementById('adminAddNewProjectBtn');
  const projectModal = document.getElementById('projectModal');
  const closeProjectModalBtn = document.getElementById('closeProjectModal');
  const cancelProjectBtn = document.getElementById('cancelProjectBtn');
  const projectBackdrop = document.getElementById('projectBackdrop');
  const projectForm = document.getElementById('projectForm');
  const resetDataBtn = document.getElementById('adminResetDataBtn');

  // Open modal for Create
  function openCreateModal() {
    document.getElementById('projectModalTitle').textContent = 'Tambah Proyek Baru';
    document.getElementById('saveProjectBtnText').textContent = 'Simpan Proyek';
    document.getElementById('formProjectId').value = '';
    projectForm.reset();
    document.getElementById('formProjectCategory').value = 'web';
    document.getElementById('formProjectImg').value = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';
    document.getElementById('formProjectDemo').value = '#';
    document.getElementById('formProjectGithub').value = '#';
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (quickAddBtn) quickAddBtn.addEventListener('click', openCreateModal);
  if (adminAddNewBtn) adminAddNewBtn.addEventListener('click', openCreateModal);

  // Close modal
  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
  if (cancelProjectBtn) cancelProjectBtn.addEventListener('click', closeProjectModal);
  if (projectBackdrop) projectBackdrop.addEventListener('click', closeProjectModal);

  // Preset buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      const input = document.getElementById('formProjectImg');
      if (input && url) input.value = url;
    });
  });

  // Save (Create or Update)
  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const id = document.getElementById('formProjectId').value;
      const title = document.getElementById('formProjectTitle').value.trim();
      const category = document.getElementById('formProjectCategory').value;
      const desc = document.getElementById('formProjectDesc').value.trim();
      const tech = document.getElementById('formProjectTech').value
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
      const img = document.getElementById('formProjectImg').value.trim();
      const demo = document.getElementById('formProjectDemo').value.trim() || '#';
      const github = document.getElementById('formProjectGithub').value.trim() || '#';

      if (id) {
        // UPDATE
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
          projects[index] = { ...projects[index], title, category, desc, tech, img, demo, github };
          saveProjects();
          showToast(`Proyek "${title}" berhasil diperbarui!`, 'success');
        }
      } else {
        // CREATE
        const newProject = {
          id: 'proj-' + Date.now(),
          title,
          category,
          desc,
          tech: tech.length > 0 ? tech : ['Code'],
          img: img || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
          demo,
          github
        };
        projects.unshift(newProject);
        saveProjects();
        showToast(`Proyek "${title}" berhasil ditambahkan!`, 'success');
      }

      closeProjectModal();
      renderPortfolio();
      renderAdminTables();
      updateAdminStats();
    });
  }

  // Reset Data to Default
  if (resetDataBtn) {
    resetDataBtn.addEventListener('click', () => {
      if (confirm('Kembalikan daftar proyek ke data bawaan awal?')) {
        projects = [...INITIAL_PROJECTS];
        saveProjects();
        renderPortfolio();
        renderAdminTables();
        updateAdminStats();
        showToast('Data proyek berhasil direset ke awal.', 'info');
      }
    });
  }
}

function openEditProjectModal(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById('projectModal');
  document.getElementById('projectModalTitle').textContent = 'Edit Proyek';
  document.getElementById('saveProjectBtnText').textContent = 'Simpan Perubahan';
  document.getElementById('formProjectId').value = project.id;
  document.getElementById('formProjectTitle').value = project.title;
  document.getElementById('formProjectCategory').value = project.category;
  document.getElementById('formProjectDesc').value = project.desc;
  document.getElementById('formProjectTech').value = project.tech.join(', ');
  document.getElementById('formProjectImg').value = project.img;
  document.getElementById('formProjectDemo').value = project.demo || '#';
  document.getElementById('formProjectGithub').value = project.github || '#';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function deleteProject(id) {
  const project = projects.find(p => p.id === id);
  const name = project ? project.title : 'proyek';

  if (confirm(`Yakin ingin menghapus "${name}"?`)) {
    projects = projects.filter(p => p.id !== id);
    saveProjects();
    renderPortfolio();
    renderAdminTables();
    updateAdminStats();
    showToast(`Proyek "${name}" berhasil dihapus.`, 'info');
  }
}

// ═══════════ ADMIN DASHBOARD & AUTH ═══════════
function initAdminDashboard() {
  const openAdminBtn = document.getElementById('openAdminBtn');
  const loginModal = document.getElementById('loginModal');
  const closeLoginModalBtn = document.getElementById('closeLoginModal');
  const cancelLoginBtn = document.getElementById('cancelLoginBtn');
  const loginBackdrop = document.getElementById('loginBackdrop');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  const adminModal = document.getElementById('adminModal');
  const closeAdminModalBtn = document.getElementById('closeAdminModal');
  const adminBackdrop = document.getElementById('adminBackdrop');
  const adminLogoutBtn = document.getElementById('adminLogoutBtn');

  // Open Admin Action
  if (openAdminBtn) {
    openAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAdminLoggedIn) {
        openAdminModal();
      } else {
        openLoginModal();
      }
    });
  }

  function openLoginModal() {
    loginError.style.display = 'none';
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLoginModal() {
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeLoginModalBtn) closeLoginModalBtn.addEventListener('click', closeLoginModal);
  if (cancelLoginBtn) cancelLoginBtn.addEventListener('click', closeLoginModal);
  if (loginBackdrop) loginBackdrop.addEventListener('click', closeLoginModal);

  // Login Submit Handler
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = document.getElementById('loginUsername').value.trim();
      const p = document.getElementById('loginPassword').value.trim();

      if (u === 'admin' && p === 'admin123') {
        isAdminLoggedIn = true;
        sessionStorage.setItem('rd_admin_auth', 'true');
        closeLoginModal();
        openAdminModal();
        renderPortfolio(); // to show admin quick buttons on cards
        showToast('Login berhasil sebagai Admin!', 'success');
      } else {
        loginError.textContent = 'Username atau password salah! (Gunakan admin / admin123)';
        loginError.style.display = 'block';
      }
    });
  }

  function openAdminModal() {
    updateAdminStats();
    renderAdminTables();
    adminModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAdminModal() {
    adminModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeAdminModalBtn) closeAdminModalBtn.addEventListener('click', closeAdminModal);
  if (adminBackdrop) adminBackdrop.addEventListener('click', closeAdminModal);

  // Logout
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      isAdminLoggedIn = false;
      sessionStorage.removeItem('rd_admin_auth');
      closeAdminModal();
      renderPortfolio();
      showToast('Anda telah logout dari Admin Session.', 'info');
    });
  }

  // Admin Tab Switching
  const tabBtns = document.querySelectorAll('.admin__tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      document.getElementById('tabContentProjects').classList.toggle('active', target === 'projects');
      document.getElementById('tabContentMessages').classList.toggle('active', target === 'messages');
    });
  });
}

function updateAdminStats() {
  const statProjects = document.getElementById('adminStatProjects');
  const statMessages = document.getElementById('adminStatMessages');
  const statVisitors = document.getElementById('adminStatVisitors');
  const tabMsgCount = document.getElementById('adminMessagesTabCount');

  if (statProjects) statProjects.textContent = projects.length.toString();
  if (statMessages) statMessages.textContent = messages.length.toString();
  if (tabMsgCount) tabMsgCount.textContent = messages.length.toString();
  if (statVisitors) statVisitors.textContent = localStorage.getItem('rd_visitor_count') || '1';
}

function renderAdminTables() {
  // Render Projects Table
  const pBody = document.getElementById('adminProjectsTableBody');
  if (pBody) {
    if (projects.length === 0) {
      pBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 30px;">Belum ada proyek. Tambah proyek baru di atas.</td></tr>`;
    } else {
      pBody.innerHTML = projects.map(p => {
        const catClass = p.category === 'web' ? 'badge-pill--web' : p.category === 'mobile' ? 'badge-pill--mobile' : 'badge-pill--design';
        const catName = p.category === 'web' ? 'Web' : p.category === 'mobile' ? 'Mobile' : 'Design';
        return `
          <tr>
            <td>
              <div class="table-proj">
                <img src="${escapeHtml(p.img)}" alt="" class="table-proj__thumb" />
                <div>
                  <strong class="table-proj__title">${escapeHtml(p.title)}</strong>
                  <span class="table-proj__desc">${escapeHtml(p.desc)}</span>
                </div>
              </div>
            </td>
            <td><span class="badge-pill ${catClass}">${catName}</span></td>
            <td><span style="font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(p.tech.join(', '))}</span></td>
            <td>
              <div class="table-actions">
                <button type="button" class="btn btn--ghost btn--xs" data-tbl-edit="${p.id}">Edit</button>
                <button type="button" class="btn btn--danger btn--xs" data-tbl-del="${p.id}">Hapus</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      pBody.querySelectorAll('[data-tbl-edit]').forEach(btn => {
        btn.addEventListener('click', () => openEditProjectModal(btn.getAttribute('data-tbl-edit')));
      });

      pBody.querySelectorAll('[data-tbl-del]').forEach(btn => {
        btn.addEventListener('click', () => deleteProject(btn.getAttribute('data-tbl-del')));
      });
    }
  }

  // Render Messages Table
  const mBody = document.getElementById('adminMessagesTableBody');
  if (mBody) {
    if (messages.length === 0) {
      mBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">Belum ada pesan kontak masuk.</td></tr>`;
    } else {
      mBody.innerHTML = messages.map(m => `
        <tr>
          <td><strong>${escapeHtml(m.name)}</strong></td>
          <td><a href="mailto:${escapeHtml(m.email)}" class="text-accent">${escapeHtml(m.email)}</a></td>
          <td><p style="max-width: 280px; font-size: 0.84rem; line-height: 1.4;">${escapeHtml(m.message)}</p></td>
          <td><span style="font-size: 0.76rem; color: var(--text-muted); white-space: nowrap;">${escapeHtml(m.date)}</span></td>
          <td>
            <div class="table-actions">
              <button type="button" class="btn btn--danger btn--xs" data-msg-del="${m.id}">Hapus</button>
            </div>
          </td>
        </tr>
      `).join('');

      mBody.querySelectorAll('[data-msg-del]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-msg-del');
          messages = messages.filter(msg => msg.id !== id);
          saveMessages();
          renderAdminTables();
          updateAdminStats();
          showToast('Pesan berhasil dihapus.', 'info');
        });
      });
    }
  }
}

// ═══════════ FORM KONTAK (FORM INPUT + LOCAL PERSISTENCE) ═══════════
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const msgInput = document.getElementById('message');
    const btn = form.querySelector('.btn');
    const originalHTML = btn.innerHTML;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    if (!name || !email || !message) return;

    // Spinner state
    btn.innerHTML = `
      <span>Mengirim pesan...</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    `;
    btn.disabled = true;

    setTimeout(() => {
      // Save to messages array & LocalStorage
      const newMsg = {
        id: 'msg-' + Date.now(),
        name,
        email,
        message,
        date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
      };
      messages.unshift(newMsg);
      saveMessages();
      updateAdminStats();

      btn.innerHTML = `<span>Pesan Terkirim! ✓</span>`;
      btn.style.background = '#22c55e';

      showToast(`Terima kasih ${name}, pesan Anda berhasil terkirim!`, 'success');

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.background = '';
        form.reset();
      }, 2000);
    }, 800);
  });
}

// ═══════════ TOAST NOTIFICATION ═══════════
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast--fadeout');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ═══════════ SCROLL REVEAL ═══════════
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ═══════════ COUNT UP ANIMATION ═══════════
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = current + '+';

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ═══════════ SKILL BARS ═══════════
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-card__bar-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

// ═══════════ CURSOR GLOW ═══════════
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  if (window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function updateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';

      requestAnimationFrame(updateGlow);
    }

    updateGlow();
  }
}

// ═══════════ SMOOTH SCROLL ═══════════
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#admin') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ─── Helper: HTML Escaping ───
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── Animation helper ───
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spinning {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);
