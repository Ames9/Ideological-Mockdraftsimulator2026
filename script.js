// Data loaded from data.js

// DOM Elements
const languageModal = document.getElementById('language-modal');
const phaseTeamGrid = document.getElementById('teams-grid');
const phaseDraftList = document.getElementById('prospects-list');
const sectionTeamSelect = document.getElementById('phase-team-selection');
const sectionDraftRoom = document.getElementById('phase-draft-room');
const saintsModal = document.getElementById('saints-modal');
const saintsPraiseText = document.getElementById('saints-praise-text');
const nonSaintsModal = document.getElementById('non-saints-modal');
const nonSaintsText = document.getElementById('non-saints-text');
const rbModal = document.getElementById('rb-modal');
const qbModal = document.getElementById('qb-modal');
const qbText = document.getElementById('qb-text');
const pkModal = document.getElementById('pk-modal');
const successModal = document.getElementById('success-modal');
const successText = document.getElementById('success-text');
const startModal = document.getElementById('start-modal');
const startRoundCount = document.getElementById('start-round-count');
const draftClassList = document.getElementById('draft-class-list');
const btnTradeUp = document.getElementById('btn-trade-up');
const btnTradeDown = document.getElementById('btn-trade-down');

const roundSelect = document.getElementById('round-select');
const trackerList = document.getElementById('tracker-list');
const currentTeamNameEl = document.getElementById('current-team-name');
const currentPickInfoEl = document.getElementById('current-pick-info');
const positionFilters = document.getElementById('position-filters');
const btnPauseResume = document.getElementById('btn-pause-resume');
const btnSimPick = document.getElementById('btn-sim-pick');
const loadMoreContainer = document.getElementById('load-more-container');
const searchInput = document.getElementById('prospect-search');

// State
let currentLanguage = 'ja';
let availableProspects = [];
let targetTeamId = 'no'; // Saints
let totalRounds = 7;
let activeDraftOrder = [];
let currentPickIndex = 0;
let isPaused = false;
let simInterval = null;
let currentFilter = 'ALL';
let currentLimit = 10;
let userDraftClass = [];

// Initialize app
function setLanguage(lang) {
    currentLanguage = lang;
    languageModal.style.display = 'none';
    languageModal.classList.add('hidden');
}

function init() {
    availableProspects = [...draftProspects]; // Reset available prospects
    userDraftClass = [];
    renderTeams();
    setupFilters();
}

// Render the grid of teams (alphabetical order handles by data.js order, assuming data.js is alphabetical, if not we sort here)
function renderTeams() {
    phaseTeamGrid.innerHTML = '';
    const sortedTeams = [...teams].sort((a, b) => a.city.localeCompare(b.city));
    sortedTeams.forEach(team => {
        const div = document.createElement('div');
        div.className = `card ${team.id === targetTeamId ? 'saints' : ''}`;
        div.onclick = () => handleTeamSelection(team);

        div.innerHTML = `
            <h3 class="card-title">${team.name}</h3>
            <p class="card-subtitle">${team.city}</p>
        `;
        phaseTeamGrid.appendChild(div);
    });
}

// Render the draft board with filters and pagination limits
function renderProspects() {
    phaseDraftList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();

    const filtered = availableProspects.filter(p => {
        // First check position filter
        let posMatch = currentFilter === 'ALL';
        if (!posMatch) {
            if (currentFilter === 'OL') posMatch = (p.pos === 'OT' || p.pos === 'IOL');
            else if (currentFilter === 'DL') posMatch = (p.pos === 'DT' || p.pos === 'DL');
            else if (currentFilter === 'EDGE') posMatch = (p.pos === 'EDGE');
            else if (currentFilter === 'LB') posMatch = (p.pos === 'LB');
            else if (currentFilter === 'CB') posMatch = (p.pos === 'CB');
            else if (currentFilter === 'S') posMatch = (p.pos === 'S');
            else if (currentFilter === 'WR') posMatch = (p.pos === 'WR');
            else if (currentFilter === 'TE') posMatch = (p.pos === 'TE');
            else if (currentFilter === 'RB') posMatch = (p.pos === 'RB' || p.isRB);
            else if (currentFilter === 'QB') posMatch = (p.pos === 'QB');
            else if (currentFilter === 'K') posMatch = (p.pos === 'K');
            else if (currentFilter === 'P') posMatch = (p.pos === 'P');
            else posMatch = p.pos.includes(currentFilter);
        }

        // Then check search term
        let searchMatch = true;
        if (searchTerm) {
            searchMatch = p.name.toLowerCase().includes(searchTerm);
        }

        return posMatch && searchMatch;
    });

    if (currentLimit >= filtered.length) {
        loadMoreContainer.classList.add('hidden');
    } else {
        loadMoreContainer.classList.remove('hidden');
    }

    filtered.slice(0, currentLimit).forEach(prospect => {
        const div = document.createElement('div');
        div.className = 'card';
        div.onclick = () => handleDraftSelection(prospect);

        div.innerHTML = `
            <span class="card-badge">${prospect.pos}</span>
            <h3 class="card-title">${prospect.name}</h3>
            <p class="card-subtitle">${prospect.school} | Rank: #${prospect.rank}</p>
        `;
        phaseDraftList.appendChild(div);
    });
}

function loadMoreProspects() {
    currentLimit += 10;
    renderProspects();
}

function setupFilters() {
    positionFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-pos');
            currentLimit = 10;
            renderProspects();
        }
    });

    searchInput.addEventListener('input', () => {
        currentLimit = 10; // reset pagination when searching
        renderProspects();
    });
}

// Handle Team Clicks
function handleTeamSelection(team) {
    if (team.id === targetTeamId) {
        const randomIndex = Math.floor(Math.random() * saintsPraiseMessages[currentLanguage].length);
        saintsPraiseText.textContent = saintsPraiseMessages[currentLanguage][randomIndex];
        saintsModal.classList.remove('hidden');
    } else if (team.id === 'sf') {
        const randomIndex = Math.floor(Math.random() * ninersMessages[currentLanguage].length);
        nonSaintsText.textContent = ninersMessages[currentLanguage][randomIndex];
        nonSaintsModal.classList.remove('hidden');
    } else {
        const randomIndex = Math.floor(Math.random() * nonSaintsMessages[currentLanguage].length);
        nonSaintsText.textContent = nonSaintsMessages[currentLanguage][randomIndex];
        nonSaintsModal.classList.remove('hidden');
    }
}

function promptStartDraft() {
    totalRounds = parseInt(roundSelect.value);

    // Inject localized Start Draft text
    const startTextEl = document.getElementById('start-text');
    let startMsg = startDraftMessages[currentLanguage][0];
    startMsg = startMsg.replace('{ROUNDS}', `<strong>${totalRounds}</strong>`);
    startTextEl.innerHTML = startMsg;

    startModal.classList.remove('hidden');
}

function cancelStartDraft() {
    startModal.classList.add('hidden');
}

function confirmStartDraft() {
    startModal.classList.add('hidden');
    startDraft();
}

function startDraft() {
    totalRounds = parseInt(roundSelect.value);
    activeDraftOrder = draftOrder.filter(pick => pick.round <= totalRounds);
    currentPickIndex = 0;
    isPaused = false;
    currentLimit = 10;
    availableProspects = [...draftProspects]; // fresh draft class
    userDraftClass = [];
    trackerList.innerHTML = '';
    draftClassList.innerHTML = '';

    // Switch to Draft Room
    sectionTeamSelect.classList.add('hidden');
    sectionDraftRoom.classList.remove('hidden');
    sectionTeamSelect.classList.remove('active');
    sectionDraftRoom.classList.add('active');

    renderProspects();
    updateDraftHeader();
    runSimulation();
}

function updateDraftHeader() {
    if (currentPickIndex >= activeDraftOrder.length) {
        currentTeamNameEl.textContent = "Draft Complete";
        currentPickInfoEl.textContent = "";
        return;
    }
    const currentPick = activeDraftOrder[currentPickIndex];
    const team = teams.find(t => t.id === currentPick.teamId);
    currentTeamNameEl.textContent = team ? team.name : currentPick.teamName;
    if (currentPick.teamId === targetTeamId) {
        currentPickInfoEl.textContent = `You are on the clock! (Round ${currentPick.round}, Pick ${currentPick.pick})`;
        currentPickInfoEl.style.color = "var(--color-saints-gold)";
        currentPickInfoEl.style.fontWeight = "bold";
        btnSimPick.classList.add('hidden');
        btnPauseResume.classList.add('hidden');
        btnTradeUp.classList.add('hidden');
        btnTradeDown.classList.remove('hidden');
    } else {
        // Find next target team pick
        let nextTargetPick = activeDraftOrder.slice(currentPickIndex).find(p => p.teamId === targetTeamId);
        let nextTargetText = nextTargetPick ? ` | Next Saints Pick: Round ${nextTargetPick.round}, Pick ${nextTargetPick.pick}` : '';

        currentPickInfoEl.textContent = `ON THE CLOCK: Round ${currentPick.round}, Pick ${currentPick.pick} (${currentPick.teamName})${nextTargetText}`;
        currentPickInfoEl.style.color = "var(--color-text-secondary)";
        currentPickInfoEl.style.fontWeight = "normal";
        btnPauseResume.classList.remove('hidden');
        btnTradeDown.classList.add('hidden');

        if (isPaused) {
            btnSimPick.classList.remove('hidden');
            btnTradeUp.classList.remove('hidden');
            btnPauseResume.textContent = "Resume Simulation";
        } else {
            btnSimPick.classList.add('hidden');
            btnTradeUp.classList.add('hidden');
            btnPauseResume.textContent = "Pause Simulation";
        }
    }
}

function togglePause() {
    isPaused = !isPaused;
    if (!isPaused) {
        runSimulation();
    } else {
        clearTimeout(simInterval);
    }
    updateDraftHeader();
}

function runSimulation() {
    if (isPaused || currentPickIndex >= activeDraftOrder.length) return;

    const currentPick = activeDraftOrder[currentPickIndex];
    if (currentPick.teamId === targetTeamId) {
        // User's turn! Stop simulation.
        isPaused = true;
        updateDraftHeader();
        return;
    }

    // CPU Turn
    simInterval = setTimeout(() => {
        simulatePick();
        if (!isPaused) {
            runSimulation();
        }
    }, 500); // 500ms delay per pick
}

function simulatePick() {
    if (currentPickIndex >= activeDraftOrder.length) return;
    const currentPick = activeDraftOrder[currentPickIndex];

    // CPU Logic: Blend Best Player Available with Team Needs
    const needs = typeof teamNeeds !== 'undefined' ? (teamNeeds[currentPick.teamId] || []) : [];

    // Look at the top 15 available prospects to see if a need can be met without a huge reach
    const candidates = availableProspects.slice(0, 15);
    let selectedProspect = null;

    // Filter the candidates down to ones matching the team's needs
    const candidatesWithNeeds = candidates.filter(p => needs.includes(p.pos) || (p.isRB && needs.includes("RB")));

    // 80% chance to draft for Need if the highest-ranked matching prospect is within the overall top 10 available
    if (candidatesWithNeeds.length > 0 && availableProspects.indexOf(candidatesWithNeeds[0]) < 10 && Math.random() < 0.8) {
        selectedProspect = candidatesWithNeeds[0];
    } else {
        // BPA Logic: 20% of the time, or if no need is present in the top 10, pick randomly from the top 3 available
        const bpaPool = availableProspects.slice(0, 3);
        // Ensure pool is not empty
        if (bpaPool.length > 0) {
            selectedProspect = bpaPool[Math.floor(Math.random() * bpaPool.length)];
        }
    }

    // Fallback (i.e. end of draft or unexpected state)
    if (!selectedProspect) {
        selectedProspect = availableProspects[0];
    }

    // Remove the drafted prospect from available pool
    availableProspects = availableProspects.filter(p => p.id !== selectedProspect.id);
    recordPick(currentPick, selectedProspect);

    currentPickIndex++;
    renderProspects();
    updateDraftHeader();

    // Check if draft is completely over
    if (currentPickIndex >= activeDraftOrder.length) {
        showSuccessModal();
    }
}

// Handle User Draft Pick
function handleDraftSelection(prospect) {
    if (currentPickIndex >= activeDraftOrder.length) return;
    const currentPick = activeDraftOrder[currentPickIndex];

    if (currentPick.teamId !== targetTeamId) {
        // Not our turn
        return;
    }

    if (currentPick.round === 1 && (prospect.isRB || prospect.pos === 'RB')) {
        const rbTextEl = document.getElementById('rb-text');
        rbTextEl.innerHTML = rbRejectionMessages[currentLanguage][Math.floor(Math.random() * rbRejectionMessages[currentLanguage].length)];
        rbModal.classList.remove('hidden');
        return;
    }

    if (currentPick.round <= 2 && prospect.pos === 'QB') {
        const randomIndex = Math.floor(Math.random() * qbPraiseMessages[currentLanguage].length);
        qbText.textContent = qbPraiseMessages[currentLanguage][randomIndex];
        qbModal.classList.remove('hidden');
        return;
    }

    if (currentPick.round === 1 && prospect.pos === 'OT') {
        const textEl = document.getElementById('ot-text');
        textEl.textContent = otRejectionMessages[currentLanguage][Math.floor(Math.random() * otRejectionMessages[currentLanguage].length)];
        document.getElementById('ot-modal').classList.remove('hidden');
        return;
    }

    if (currentPick.round <= 4 && (prospect.pos === 'P' || prospect.pos === 'K' || prospect.pos === 'LS')) {
        const pkTextEl = document.getElementById('pk-text');
        pkTextEl.innerHTML = pkRejectionMessages[currentLanguage][Math.floor(Math.random() * pkRejectionMessages[currentLanguage].length)];
        pkModal.classList.remove('hidden');
        return;
    }

    // Accept the pick
    // Remove prospect from available
    availableProspects = availableProspects.filter(p => p.id !== prospect.id);
    recordPick(currentPick, prospect);

    // Track user's specific picks
    userDraftClass.push({ pick: currentPick, player: prospect });

    currentPickIndex++;
    renderProspects();
    updateDraftHeader();

    // Auto-resume draft
    isPaused = false;
    runSimulation();

    // Check if draft is completely over
    if (currentPickIndex >= activeDraftOrder.length) {
        showSuccessModal();
    }
}

function recordPick(pickData, prospect) {
    const item = document.createElement('div');
    item.className = `tracker-item ${pickData.teamId === targetTeamId ? 'saints-pick' : ''}`;

    item.innerHTML = `
        <div class="tracker-pick-info">R${pickData.round} P${pickData.pick} - ${pickData.teamName}</div>
        <div class="tracker-player">${prospect.name} <span style="color:var(--color-text-secondary); font-size:0.8rem; font-weight:normal;">${prospect.pos}</span></div>
    `;

    trackerList.prepend(item); // insert at top
}

function showSuccessModal() {
    successText.innerHTML = `Your ${totalRounds}-round 2026 NFL Draft is complete! Great job navigating the board for the Saints.`;

    draftClassList.innerHTML = '';
    if (userDraftClass.length === 0) {
        draftClassList.innerHTML = '<li>No players drafted.</li>';
    } else {
        userDraftClass.forEach(d => {
            const li = document.createElement('li');
            li.style.padding = "0.5rem 0";
            li.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
            li.innerHTML = `<strong style="display:inline-block; width: 60px;">R${d.pick.round} P${d.pick.pick}:</strong> ${d.player.name} <span style="color: var(--color-text-secondary); font-size: 0.9em;">(${d.player.pos} - ${d.player.school})</span>`;
            draftClassList.appendChild(li);
        });
    }

    successModal.classList.remove('hidden');
}

// Handle Modal Closes
function closeSaintsModal() {
    saintsModal.classList.add('hidden');
    promptStartDraft();
}
function closeNonSaintsModal() {
    nonSaintsModal.classList.add('hidden');
    promptStartDraft();
}
function closeRbModal() { rbModal.classList.add('hidden'); }
function closeQbModal() { qbModal.classList.add('hidden'); }
function closePkModal() { pkModal.classList.add('hidden'); }
function closeOtModal() { document.getElementById('ot-modal').classList.add('hidden'); }
function closeTradeUpModal() { document.getElementById('trade-up-modal').classList.add('hidden'); }
function closeTradeDownModal() { document.getElementById('trade-down-modal').classList.add('hidden'); }

// Handle Trade Buttons
function attemptTradeUp() {
    const textEl = document.getElementById('trade-up-text');
    textEl.textContent = tradeUpMessages[currentLanguage][Math.floor(Math.random() * tradeUpMessages[currentLanguage].length)];
    document.getElementById('trade-up-modal').classList.remove('hidden');
}

function attemptTradeDown() {
    const textEl = document.getElementById('trade-down-text');
    textEl.textContent = tradeDownMessages[currentLanguage][Math.floor(Math.random() * tradeDownMessages[currentLanguage].length)];
    document.getElementById('trade-down-modal').classList.remove('hidden');
}

// Restart Draft
function restartDraft() {
    successModal.classList.add('hidden');
    sectionDraftRoom.classList.add('hidden');
    sectionTeamSelect.classList.remove('hidden');
    sectionDraftRoom.classList.remove('active');
    sectionTeamSelect.classList.add('active');
    clearTimeout(simInterval);
    init();
}

// Bootstrap
document.addEventListener('DOMContentLoaded', init);
