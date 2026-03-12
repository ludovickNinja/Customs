const versionsContainer = document.getElementById('versions-container');
const versionTemplate = document.getElementById('version-template');
const addVersionButton = document.getElementById('add-version');
const quoteForm = document.getElementById('quote-form');
const modeButtons = [...document.querySelectorAll('.mode-btn')];
const pageButtons = [...document.querySelectorAll('.side-nav-btn')];
const projectsTableBody = document.getElementById('projects-table-body');
const projectFiltersForm = document.getElementById('project-filters');
const projectSearchInput = document.getElementById('project-search');
const projectStatusFilter = document.getElementById('project-status-filter');
const clearProjectFiltersButton = document.getElementById('clear-project-filters');
const projectResultsMeta = document.getElementById('project-results-meta');
const versionDetailMeta = document.getElementById('version-detail-meta');
const designBriefFields = document.getElementById('design-brief-fields');
const designBriefFiles = document.getElementById('design-brief-files');
const versionPricing = document.getElementById('version-pricing');
const discussionThread = document.getElementById('discussion-thread');
const discussionForm = document.getElementById('discussion-form');
const discussionInput = document.getElementById('discussion-input');
const backToProjectsButton = document.getElementById('back-to-projects');

let versionCount = 0;
let nextQuoteNumber = 80004;
let nextReferenceNumber = 50008;
let activeVersionContext = null;

const projectFilterState = {
  search: '',
  status: '',
};

const ongoingProjects = [
  {
    quoteNumber: 'Q80001',
    customerRequest: 'PO-6604 / SOL-ALPHA / Crown Canada',
    salesPersonName: 'Emma Campbell',
    updatedAt: '2026-03-12',
    references: [
      {
        referenceNumber: 'R50001',
        versionLabel: 'Version 1',
        status: 'CAD review pending',
        designBrief: {
          styleSku: 'SOL-ALPHA-01',
          metal: '14K White Gold',
          size: '6.75',
          stoneDescription: '1.25ct round center, hidden halo with VS melees',
          instructions: 'Maintain six-prong look while reducing basket height by 0.4mm.',
          files: ['engagement_reference_front.jpg', 'solitaire_v1_notes.pdf'],
        },
        pricing: {
          estimatedTotal: '$2,460',
          unitBreakdown: 'Gold + labor: $1,980, setting labor: $480',
          timeline: 'Estimate valid for 7 days. Delivery target: 6 business days.',
        },
        discussion: [
          {
            author: 'Customer',
            message: 'Can we reduce the cathedral shoulder slightly before final quote?',
            timestamp: '2026-03-12 09:10',
          },
          {
            author: 'Design Team',
            message: 'Yes, we can lower the shoulder by 0.3mm and update renderings today.',
            timestamp: '2026-03-12 09:43',
          },
        ],
      },
      {
        referenceNumber: 'R50002',
        versionLabel: 'Version 2',
        status: 'Awaiting center stone details',
        designBrief: {
          styleSku: 'SOL-ALPHA-02',
          metal: '18K Yellow Gold',
          size: '7',
          stoneDescription: 'Oval center stone TBD, pave shoulders',
          instructions: 'Prepare two basket options once center dimensions are provided.',
          files: ['side_profile_sketch.png'],
        },
        pricing: {
          estimatedTotal: '$2,180 (pending center stone)',
          unitBreakdown: 'Mounting estimate only: $2,180',
          timeline: 'Final quote pending center stone spec confirmation.',
        },
        discussion: [
          {
            author: 'Design Team',
            message: 'Please share the exact stone dimensions to lock in the final quote.',
            timestamp: '2026-03-12 11:10',
          },
        ],
      },
    ],
  },
  {
    quoteNumber: 'Q80002',
    customerRequest: 'PO-7788 / HALO-V2 / Montclair Bridal',
    salesPersonName: 'Noah Tremblay',
    updatedAt: '2026-03-13',
    references: [
      {
        referenceNumber: 'R50003',
        versionLabel: 'Version 1',
        status: 'Rendering in progress',
        designBrief: {
          styleSku: 'HALO-V2-A',
          metal: 'Platinum',
          size: '5.5',
          stoneDescription: 'Round halo, micro-pave split shank',
          instructions: 'Slimmer profile compared to previous production by 8%.',
          files: ['halo_model_v1.3dm', 'customer_markup.pdf'],
        },
        pricing: {
          estimatedTotal: '$3,120',
          unitBreakdown: 'Platinum casting: $2,540, labor/polish: $580',
          timeline: 'Rendering + quote pack ETA: 2 business days.',
        },
        discussion: [],
      },
      {
        referenceNumber: 'R50004',
        versionLabel: 'Version 2',
        status: 'Pricing validation in progress',
        designBrief: {
          styleSku: 'HALO-V2-B',
          metal: 'Platinum',
          size: '5.5',
          stoneDescription: 'Same as V1 with hidden gallery stones',
          instructions: 'Validate surcharge impact for hidden gallery detail.',
          files: ['gallery_view.jpg'],
        },
        pricing: {
          estimatedTotal: '$3,340',
          unitBreakdown: 'Base mounting: $3,120 + gallery detailing: $220',
          timeline: 'Final pricing confirmation pending vendor review.',
        },
        discussion: [],
      },
      {
        referenceNumber: 'R50005',
        versionLabel: 'Version 3',
        status: 'Sent for internal approval',
        designBrief: {
          styleSku: 'HALO-V2-C',
          metal: '14K Rose Gold',
          size: '5.75',
          stoneDescription: 'Slim halo with cathedral shoulders',
          instructions: 'This is the budget-conscious option requested by client.',
          files: ['rose_gold_option.png'],
        },
        pricing: {
          estimatedTotal: '$2,640',
          unitBreakdown: '14K mounting + finishing: $2,640',
          timeline: 'Ready to release once approvals are complete.',
        },
        discussion: [],
      },
    ],
  },
  {
    quoteNumber: 'Q80003',
    customerRequest: 'PO-8109 / PD-SIGNATURE / Atelier Linea',
    salesPersonName: 'Sofia Nguyen',
    updatedAt: '2026-03-14',
    references: [
      {
        referenceNumber: 'R50006',
        versionLabel: 'Version 1',
        status: 'Metal confirmation required',
        designBrief: {
          styleSku: 'PD-SIGN-01',
          metal: 'TBD',
          size: 'N/A',
          stoneDescription: 'Minimal pendant with flush set stones',
          instructions: 'Need final metal confirmation between 14K and 18K yellow gold.',
          files: ['pendant_concept_front.png'],
        },
        pricing: {
          estimatedTotal: '$980 - $1,220',
          unitBreakdown: 'Range based on final alloy selection',
          timeline: 'Quote finalizes immediately after metal confirmation.',
        },
        discussion: [],
      },
      {
        referenceNumber: 'R50007',
        versionLabel: 'Version 2',
        status: 'Ready for quote release',
        designBrief: {
          styleSku: 'PD-SIGN-02',
          metal: '18K Yellow Gold',
          size: 'N/A',
          stoneDescription: 'Updated bail and thicker edge profile',
          instructions: 'Lock this version and generate release packet.',
          files: ['pendant_v2_render.jpg', 'pendant_v2_dimensions.pdf'],
        },
        pricing: {
          estimatedTotal: '$1,240',
          unitBreakdown: 'Material: $860, labor + finishing: $380',
          timeline: 'Release package can be sent today.',
        },
        discussion: [],
      },
    ],
  },
];

const expandedQuotes = new Set([ongoingProjects[0].quoteNumber]);

function updateVersionTitles() {
  const cards = [...versionsContainer.querySelectorAll('.version-card')];

  cards.forEach((card, index) => {
    const title = card.querySelector('.version-title');
    title.textContent = `Version ${index + 1}`;

    const removeButton = card.querySelector('.remove-btn');
    removeButton.hidden = cards.length === 1;
  });
}

function createVersionCard() {
  versionCount += 1;

  const fragment = versionTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.version-card');

  card.dataset.versionId = String(versionCount);
  card.querySelector('.remove-btn').addEventListener('click', () => {
    card.remove();
    updateVersionTitles();
  });

  versionsContainer.appendChild(fragment);
  updateVersionTitles();
}

function focusNextInputOnEnter(event) {
  if (event.key !== 'Enter') {
    return;
  }

  const target = event.target;
  const isTextInput =
    target instanceof HTMLInputElement &&
    ['text', 'email', 'number', 'search', 'tel', 'url'].includes(target.type);

  if (!isTextInput) {
    return;
  }

  event.preventDefault();

  const focusable = [...quoteForm.querySelectorAll('input, textarea, button, select')].filter(
    (element) => !element.disabled && element.type !== 'hidden'
  );

  const index = focusable.indexOf(target);
  if (index >= 0 && index < focusable.length - 1) {
    focusable[index + 1].focus();
  }
}

function setMode(mode) {
  const customerView = document.getElementById('customer-view');
  const adminView = document.getElementById('admin-view');

  const isCustomerMode = mode === 'customer';
  customerView.classList.toggle('hidden', !isCustomerMode);
  adminView.classList.toggle('hidden', isCustomerMode);

  modeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
}

function setPage(page) {
  const pages = [...document.querySelectorAll('.customer-page')];

  pages.forEach((pageElement) => {
    const isActive = pageElement.id === `page-${page}`;
    pageElement.classList.toggle('active', isActive);
  });

  pageButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.page === page);
  });
}

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getLatestReferenceStatus(project) {
  return project.references[project.references.length - 1].status;
}

function getDiscussionMarkup(messages) {
  if (!messages.length) {
    return '<p class="discussion-empty">No messages yet. Start the discussion to request changes.</p>';
  }

  return messages
    .map(
      (item) => `
      <article class="chat-message ${item.author === 'Customer' ? 'from-customer' : 'from-team'}">
        <p class="chat-message-meta">
          <strong>${item.author}</strong>
          <span>${item.timestamp}</span>
        </p>
        <p class="chat-message-body">${item.message}</p>
      </article>
    `
    )
    .join('');
}

function openVersionDetail(quoteNumber, referenceNumber) {
  const project = ongoingProjects.find((candidate) => candidate.quoteNumber === quoteNumber);
  if (!project) {
    return;
  }

  const reference = project.references.find((candidate) => candidate.referenceNumber === referenceNumber);
  if (!reference) {
    return;
  }

  activeVersionContext = { quoteNumber, referenceNumber };

  versionDetailMeta.textContent = `${project.quoteNumber} • ${reference.referenceNumber} (${reference.versionLabel}) • ${project.customerRequest}`;

  const briefEntries = [
    ['Style / SKU', reference.designBrief.styleSku || '—'],
    ['Metal', reference.designBrief.metal || '—'],
    ['Size', reference.designBrief.size || '—'],
    ['Stone Details', reference.designBrief.stoneDescription || '—'],
    ['Instructions', reference.designBrief.instructions || '—'],
  ];

  designBriefFields.innerHTML = briefEntries
    .map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`)
    .join('');

  designBriefFiles.innerHTML = reference.designBrief.files.length
    ? reference.designBrief.files.map((file) => `<li>${file}</li>`).join('')
    : '<li>No files attached for this version.</li>';

  versionPricing.innerHTML = `
    <p><strong>Estimated Total:</strong> ${reference.pricing.estimatedTotal}</p>
    <p><strong>Breakdown:</strong> ${reference.pricing.unitBreakdown}</p>
    <p><strong>Timeline:</strong> ${reference.pricing.timeline}</p>
  `;

  discussionThread.innerHTML = getDiscussionMarkup(reference.discussion);
  setPage('version-detail');
}


function normalizeForSearch(value) {
  return value.toLowerCase().trim();
}

function getSearchableTokens(project) {
  const quoteTokens = [
    project.quoteNumber,
    project.customerRequest,
    project.salesPersonName,
    getLatestReferenceStatus(project),
  ];

  const referenceTokens = project.references.flatMap((reference) => [
    reference.referenceNumber,
    reference.versionLabel,
    reference.status,
    reference.designBrief.styleSku,
    reference.designBrief.metal,
    reference.designBrief.size,
    reference.designBrief.stoneDescription,
    reference.designBrief.instructions,
  ]);

  return [...quoteTokens, ...referenceTokens]
    .filter(Boolean)
    .map((token) => token.toString().toLowerCase());
}

function getUniqueStatuses() {
  return [...new Set(ongoingProjects.flatMap((project) => project.references.map((reference) => reference.status)))]
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));
}

function syncStatusFilterOptions() {
  if (!projectStatusFilter) {
    return;
  }

  const selectedStatus = projectFilterState.status;
  const statusOptions = getUniqueStatuses();

  projectStatusFilter.innerHTML = `
    <option value="">All statuses</option>
    ${statusOptions.map((status) => `<option value="${status}">${status}</option>`).join('')}
  `;

  projectStatusFilter.value = selectedStatus;
}

function getFilteredProjects() {
  const normalizedSearch = normalizeForSearch(projectFilterState.search);

  return ongoingProjects.filter((project) => {
    const matchesStatus =
      !projectFilterState.status || project.references.some((reference) => reference.status === projectFilterState.status);

    if (!matchesStatus) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    return getSearchableTokens(project).some((token) => token.includes(normalizedSearch));
  });
}

function renderProjectResultsMeta(totalCount, filteredCount) {
  if (!projectResultsMeta) {
    return;
  }

  if (totalCount === 0) {
    projectResultsMeta.textContent = 'No quote requests have been submitted yet.';
    return;
  }

  if (filteredCount === totalCount) {
    projectResultsMeta.textContent = `Showing all ${totalCount} project(s).`;
    return;
  }

  projectResultsMeta.textContent = `Showing ${filteredCount} of ${totalCount} project(s).`;
}

function renderOngoingProjects() {
  if (!projectsTableBody) {
    return;
  }

  syncStatusFilterOptions();

  if (ongoingProjects.length === 0) {
    projectsTableBody.innerHTML =
      '<tr><td class="empty-row" colspan="6">No quote requests have been submitted yet.</td></tr>';
    renderProjectResultsMeta(0, 0);
    return;
  }

  const filteredProjects = getFilteredProjects();
  renderProjectResultsMeta(ongoingProjects.length, filteredProjects.length);

  if (!filteredProjects.length) {
    projectsTableBody.innerHTML =
      '<tr><td class="empty-row" colspan="6">No projects match your current search and filters.</td></tr>';
    return;
  }

  projectsTableBody.innerHTML = filteredProjects
    .map((project) => {
      const isExpanded = expandedQuotes.has(project.quoteNumber);
      const referencesMarkup = project.references
        .map(
          (reference) => `
            <li>
              <span class="reference-id">${reference.referenceNumber}</span>
              <span>${reference.versionLabel}</span>
              <span class="reference-status">${reference.status}</span>
              <button
                type="button"
                class="link-btn"
                data-action="open-version-detail"
                data-quote-number="${project.quoteNumber}"
                data-reference-number="${reference.referenceNumber}"
              >View details</button>
            </li>
          `
        )
        .join('');

      return `
        <tr class="quote-row" data-quote-number="${project.quoteNumber}">
          <td>
            <button
              type="button"
              class="expand-btn"
              data-quote-number="${project.quoteNumber}"
              aria-expanded="${isExpanded}"
              aria-label="${isExpanded ? 'Collapse' : 'Expand'} ${project.quoteNumber}"
            >${isExpanded ? '▾' : '▸'}</button>
          </td>
          <td><strong>${project.quoteNumber}</strong></td>
          <td>${project.customerRequest}</td>
          <td>${project.salesPersonName}</td>
          <td>${project.references.length}</td>
          <td><span class="status-chip">${getLatestReferenceStatus(project)}</span></td>
        </tr>
        <tr class="reference-row ${isExpanded ? '' : 'hidden'}" data-reference-group="${project.quoteNumber}">
          <td></td>
          <td colspan="5">
            <div class="reference-group">
              <p><strong>Latest update:</strong> ${formatDate(project.updatedAt)}</p>
              <ul class="reference-list">
                ${referencesMarkup}
              </ul>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function getNextQuoteNumber() {
  const quoteNumber = `Q${nextQuoteNumber}`;
  nextQuoteNumber += 1;
  return quoteNumber;
}

function getNextReferenceNumber() {
  const referenceNumber = `R${nextReferenceNumber}`;
  nextReferenceNumber += 1;
  return referenceNumber;
}

function createProjectFromForm() {
  const formData = new FormData(quoteForm);
  const requestText = (formData.get('reference') || '').toString().trim() || 'General quote request';
  const salesPersonName = (formData.get('salespersonName') || '').toString().trim() || 'Not provided';

  const versionCards = [...versionsContainer.querySelectorAll('.version-card')];
  const references = versionCards.map((card, index) => {
    const instructions = card.querySelector('[data-field="instructions"]').value.trim();
    const styleSku = card.querySelector('[data-field="styleSku"]').value.trim();
    const metal = card.querySelector('[data-field="metal"]').value.trim();
    const size = card.querySelector('[data-field="size"]').value.trim();
    const stoneDescription = card.querySelector('[data-field="stoneDescription"]').value.trim();
    const uploadInput = card.querySelector('[data-field="uploads"]');
    const files = [...uploadInput.files].map((file) => file.name);

    return {
      referenceNumber: getNextReferenceNumber(),
      versionLabel: `Version ${index + 1}`,
      status: instructions || 'Quote details captured',
      designBrief: {
        styleSku,
        metal,
        size,
        stoneDescription,
        instructions,
        files,
      },
      pricing: {
        estimatedTotal: 'Pending quote calculation',
        unitBreakdown: 'Will be generated by the pricing team.',
        timeline: 'Submitted and awaiting review.',
      },
      discussion: [
        {
          author: 'Customer',
          message: 'New version submitted. Please review and share quote details.',
          timestamp: new Date().toLocaleString(),
        },
      ],
    };
  });

  const newProject = {
    quoteNumber: getNextQuoteNumber(),
    customerRequest: requestText,
    salesPersonName,
    updatedAt: new Date().toISOString().slice(0, 10),
    references,
  };

  ongoingProjects.unshift(newProject);
  expandedQuotes.add(newProject.quoteNumber);
  renderOngoingProjects();

  quoteForm.reset();
  versionsContainer.innerHTML = '';
  createVersionCard();

  setPage('projects');
  alert(`Quote ${newProject.quoteNumber} generated with ${references.length} reference(s).`);
}

addVersionButton.addEventListener('click', createVersionCard);
quoteForm.addEventListener('keydown', focusNextInputOnEnter);
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createProjectFromForm();
});

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setMode(button.dataset.mode);
  });
});

pageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setPage(button.dataset.page);
  });
});

projectsTableBody?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const expandButton = target.closest('.expand-btn');
  if (expandButton instanceof HTMLButtonElement) {
    const { quoteNumber } = expandButton.dataset;
    if (!quoteNumber) {
      return;
    }

    if (expandedQuotes.has(quoteNumber)) {
      expandedQuotes.delete(quoteNumber);
    } else {
      expandedQuotes.add(quoteNumber);
    }

    renderOngoingProjects();
    return;
  }

  const detailButton = target.closest('[data-action="open-version-detail"]');
  if (detailButton instanceof HTMLButtonElement) {
    const { quoteNumber, referenceNumber } = detailButton.dataset;
    if (quoteNumber && referenceNumber) {
      openVersionDetail(quoteNumber, referenceNumber);
    }
  }
});

discussionForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!activeVersionContext) {
    return;
  }

  const message = discussionInput.value.trim();
  if (!message) {
    return;
  }

  const project = ongoingProjects.find((candidate) => candidate.quoteNumber === activeVersionContext.quoteNumber);
  const reference = project?.references.find(
    (candidate) => candidate.referenceNumber === activeVersionContext.referenceNumber
  );

  if (!reference) {
    return;
  }

  reference.discussion.push({
    author: 'Customer',
    message,
    timestamp: new Date().toLocaleString(),
  });

  discussionInput.value = '';
  discussionThread.innerHTML = getDiscussionMarkup(reference.discussion);
});

backToProjectsButton?.addEventListener('click', () => {
  setPage('projects');
});

projectFiltersForm?.addEventListener('submit', (event) => {
  event.preventDefault();
});

projectSearchInput?.addEventListener('input', () => {
  projectFilterState.search = projectSearchInput.value;
  renderOngoingProjects();
});

projectStatusFilter?.addEventListener('change', () => {
  projectFilterState.status = projectStatusFilter.value;
  renderOngoingProjects();
});

clearProjectFiltersButton?.addEventListener('click', () => {
  projectFilterState.search = '';
  projectFilterState.status = '';

  if (projectSearchInput) {
    projectSearchInput.value = '';
  }

  if (projectStatusFilter) {
    projectStatusFilter.value = '';
  }

  renderOngoingProjects();
});

createVersionCard();
setMode('customer');
setPage('home');
renderOngoingProjects();
