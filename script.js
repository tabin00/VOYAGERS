let constellationArchive = []; // 🌟 완성된 별자리들을 담을 저장소
let pathSequence = []; // 🌟 방문 순서를 저장할 배열 (파일 맨 위에 추가)
const screens = {
  splash: document.getElementById('splash-screen'),
  onboarding: document.getElementById('onboarding-screen'),
  login: document.getElementById('login-screen'),
  home: document.getElementById('home-screen')
};

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');

  const bottomNav = document.getElementById('bottom-nav');
  if (name === 'home') {
    bottomNav.style.display = 'block';
  } else {
    bottomNav.style.display = 'none';
  }

  if (name === 'home') {
    const homeInner = screens.home.querySelector('.screen-inner');
    if (homeInner) { homeInner.scrollTop = 0; }
  }
}

setTimeout(() => showScreen('onboarding'), 1600);

const slides = document.querySelectorAll('.slide-art');
const dots = document.querySelectorAll('[data-dot]');
const nextBtn = document.getElementById('next-onboarding');
let currentSlide = 0;

function renderSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = ''; 
    slide.classList.toggle('active-slide', i === index);
  });

  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  
  if(nextBtn) {
    nextBtn.textContent = index === slides.length - 1 ? '항해 시작하기' : '다음 항해로';
  }
}

// 🌟 에러 차단: 버튼이 있을 때만 이벤트 연결
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      currentSlide += 1;
      renderSlide(currentSlide);
    } else {
      showScreen('login');
    }
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    renderSlide(currentSlide);
  });
});

const btnSkipOnb = document.getElementById('skip-onboarding');
if (btnSkipOnb) btnSkipOnb.addEventListener('click', () => showScreen('login'));

const btnToLogin = document.getElementById('to-login');
if (btnToLogin) btnToLogin.addEventListener('click', () => showScreen('login'));

const btnBackOnb = document.getElementById('back-to-onboarding');
if (btnBackOnb) btnBackOnb.addEventListener('click', () => showScreen('onboarding'));

// 🌟 로그인 버튼 '가짜 로딩' 연출 및 화면 완벽 전환
const btnSkipHome = document.getElementById('skip-to-home');
if (btnSkipHome) {
  btnSkipHome.addEventListener('click', (e) => {
    e.target.textContent = '항해 준비 중...';
    e.target.style.opacity = '0.7';
    setTimeout(() => {
      showScreen('home'); // 홈 화면 바탕을 먼저 켜고
      switchTab('diagnosis'); // 진단 탭으로 이동!
    }, 1000); // 1초 대기
  });
}

const btnSkipHomeTop = document.getElementById('skip-to-home-top');
if (btnSkipHomeTop) {
  btnSkipHomeTop.addEventListener('click', (e) => {
    e.target.textContent = '인증 진행 중...';
    e.target.style.opacity = '0.7';
    setTimeout(() => {
      showScreen('home');
      switchTab('diagnosis');
    }, 1000);
  });
}

renderSlide(currentSlide);

const modal = document.getElementById('sheet-modal');
const modalTitle = document.getElementById('sheet-title');
const modalSubtitle = document.getElementById('sheet-subtitle');
const modalGrid = document.getElementById('sheet-grid');
const modalScrim = document.getElementById('modal-scrim');
const closeModalBtn = document.getElementById('close-modal');
const secondaryCloseBtn = document.getElementById('sheet-secondary');
const primaryBtn = document.getElementById('sheet-primary');

const sheetContent = {
  social: provider => ({
    title: provider + ' 로그인 준비 중', subtitle: '현재는 프로토타입 단계라 실제 인증 대신 안내 모달로 연결돼요.',
    items: [['안내', '비로그인 체험으로 홈, 코스, 기록 탭의 흐름을 확인해보세요.']], primary: '비로그인으로 계속 보기'
  }),
  // 🌟 버튼 글씨를 실제 기능에 맞게 수정합니다.
  record: {
    title: '회복 기록 기능 안내', subtitle: '방문 장소와 나만의 별자리 완성도를 모아보는 기능입니다.',
    items: [['기록 단위', '체류 시간, 감정 변화, 수면 만족도를 별 단위로 기록합니다.']], 
    primary: '기록 탭으로 이동' 
  },
  profile: {
    title: '프로필 섹션 안내', subtitle: '개인 취향과 기록 저장이 가능하도록 설계할 수 있습니다.',
    items: [['저장 예정 정보', '선호 코스, 환경 민감도, 별자리 기록']], 
    primary: '마이 탭으로 이동' 
  },
  
  /* 1. Calm (정서 안정) */
  cheongnyeongpo: {
    title: '청령포', subtitle: '고요한 숲과 강변이 어우러진 정서 안정 포인트입니다.',
    items: [['수면 도움', '시야 확장과 저강도 보행을 통해 교감신경을 부드럽게 안정시킵니다.']]
  },
  jangneung: {
    title: '장릉', subtitle: '울창한 소나무 숲길을 천천히 걷는 저자극 코스입니다.',
    items: [['수면 도움', '피톤치드와 고요함으로 스트레스 호르몬(코르티솔) 수치를 낮춥니다.']]
  },
  saggat: {
    title: '김삿갓문학관', subtitle: '조용한 이야기와 함께 마음의 템포를 늦추는 거점입니다.',
    items: [['수면 도움', '자기 전 불안감을 낮추는 정서 정리 시간을 제공합니다.']]
  },
  yemilfootbath: {
    title: '와인족욕체험', subtitle: '따뜻한 족욕으로 혈액순환을 돕는 이완 코스입니다.',
    items: [['수면 도움', '심부 체온을 부드럽게 조절하여 깊은 수면을 유도합니다.']]
  },
  bodeoksa: {
    title: '보덕사', subtitle: '사찰의 고요함 속에서 마음을 비우는 시간입니다.',
    items: [['수면 도움', '시각 및 청각 자극을 줄여 과각성된 뇌파를 안정시킵니다.']]
  },

  /* 2. Active (수면 압력) */
  eorayeon: {
    title: '동강 어라연', subtitle: '햇빛 노출과 걷기를 통해 생체 리듬을 깨우는 코스입니다.',
    items: [['수면 도움', '풍부한 햇빛이 멜라토닌 합성을 돕고 야간 수면 압력을 극대화합니다.']]
  },
  hanbando: {
    title: '한반도지형', subtitle: '탁 트인 시야와 함께 가벼운 트레킹을 즐기는 포인트입니다.',
    items: [['수면 도움', '낮 시간의 신체 활동으로 몸에 건강한 피로도를 쌓아줍니다.']]
  },
  yoseonjeong: {
    title: '요선정', subtitle: '암반과 계곡을 오르내리며 자연의 활력을 얻는 코스입니다.',
    items: [['수면 도움', '동적 활동을 통해 무기력감을 덜고 일주기 리듬을 정상화합니다.']]
  },
  riverbugging: {
    title: '리버버깅', subtitle: '동강의 시원한 물살을 가르는 액티비티입니다.',
    items: [['수면 도움', '강도 높은 신체 활동으로 야간 수면 요구량을 최대치로 끌어올립니다.']]
  },
  sankkoradeyi: {
    title: '산꼬라데이길', subtitle: '굽이진 산길을 걷는 상쾌한 트레킹 코스입니다.',
    items: [['수면 도움', '유산소 운동 효과로 스트레스를 발산하고 입면 시간을 단축합니다.']]
  },

  /* 3. Forest (숲 치유) */
  manggyeong: {
    title: '망경대산 휴양림', subtitle: '본격적인 치유와 이완이 일어나는 숲 치유 인프라입니다.',
    items: [['수면 도움', '자연의 백색소음이 과각성 상태의 뇌파를 진정시킵니다.']]
  },
  moss: {
    title: '상동 이끼계곡', subtitle: '초록색 이끼와 계곡만 존재하는 극도의 저자극 환경입니다.',
    items: [['수면 도움', '시청각적 자극을 철저히 통제하여 예민도를 대폭 낮춥니다.']]
  },
  naeri: {
    title: '내리계곡', subtitle: '인적이 드물고 물소리가 일정한 계곡 산책로입니다.',
    items: [['수면 도움', '일정한 주파수의 물소리가 뇌를 이완시키고 잡념을 없애줍니다.']]
  },
  yeonhavalley: {
    title: '연하계곡', subtitle: '청량한 물소리가 가득한 시원한 숲속 쉼터입니다.',
    items: [['수면 도움', '자연의 청각적 리듬이 심장 박동수를 편안하게 안정시킵니다.']]
  },
  danpungsan: {
    title: '단풍산', subtitle: '계절의 변화를 느끼며 천천히 걷는 힐링 산책로입니다.',
    items: [['수면 도움', '숲에서 뿜어져 나오는 피톤치드로 심신의 긴장을 완화합니다.']]
  },

  /* 4. Night (야간 전환) */
  byeolmaro: {
    title: '별마로천문대', subtitle: '낮에서 밤으로 넘어가는 감각 전환의 핵심 포인트입니다.',
    items: [['수면 도움', '인공 조명을 피하고 실제 어둠에 노출되어 수면 호르몬 분비를 촉진합니다.']]
  },
  seondol: {
    title: '선돌 (일몰)', subtitle: '영월 최고의 일몰을 보며 생체 리듬에 밤을 알리는 곳입니다.',
    items: [['수면 도움', '태양이 넘어가는 것을 시각적으로 체감하여 입면 신호를 전달합니다.']]
  },
  yeongwolbridge: {
    title: '영월대교 야경', subtitle: '잔잔한 강물에 비친 조명을 보며 걷는 야간 산책로입니다.',
    items: [['수면 도움', '수면 직전 심부 체온을 서서히 떨어뜨리기 위한 가벼운 걷기에 최적입니다.']]
  },
  riversidedetention: {
    title: '강변저류지', subtitle: '탁 트인 수변 공간에서 즐기는 조용한 저녁 산책입니다.',
    items: [['수면 도움', '넓은 시야와 차분한 공기로 하루 동안 누적된 시각적 피로를 해소합니다.']]
  },
  radiostar: {
    title: '라디오스타박물관', subtitle: '따뜻한 아날로그 감성으로 마음을 달래는 공간입니다.',
    items: [['수면 도움', '따뜻한 감성과 향수로 심리적 안정감을 주어 수면 전 불안을 덜어줍니다.']]
  },
  
  /* 5. Stay (가변 데이터) */
  room_high: {
    title: '딥 슬립 룸', subtitle: '고민감도 맞춤형 차단 객실',
    items: [['환경제어', '완벽 암막, 방음, 저자극 침구']], primary: '객실 확인'
  },
  room_mid: {
    title: '스탠다드 룸', subtitle: '표준형 회복 객실',
    items: [['환경제어', '자연 채광 조절, 표준 입면 환경']], primary: '객실 확인'
  },
  room_low: {
    title: '운동장 별빛 캠핑존', subtitle: '자연 친화형 야외 객실',
    items: [['환경제어', '개방형 쿨링, 야외 수면 트래킹']], primary: '객실 확인'
  }
};
const placeImages = {
    cheongnyeongpo: 'images/cheongnyeongpo.jpg', jangneung: 'images/jangneung.jpg',
    saggat: 'images/saggat.jpg', yemilfootbath: 'images/footbath.jpg', bodeoksa: 'images/bodeoksa.jpg',
    eorayeon: 'images/eorayeon.jpg', hanbando: 'images/hanbando.jpg', yoseonjeong: 'images/yoseonjeong.jpg',
    riverbugging: 'images/riverbugging.jpg', sankkoradeyi: 'images/trekking.jpg',
    manggyeong: 'images/manggyeong.jpg', moss: 'images/moss.jpg', naeri: 'images/naeri.jpg',
    yeonhavalley: 'images/yeonhavalley.jpg', danpungsan: 'images/danpungsan.jpg',
    byeolmaro: 'images/byeolmaro.jpg', seondol: 'images/seondol.jpg', yeongwolbridge: 'images/bridge.jpg',
    riversidedetention: 'images/riverside.jpg', radiostar: 'images/radiostar.jpg',
    room_high: 'images/room_high.jpg', room_mid: 'images/room_mid.jpg', room_low: 'images/room_low.jpg'
};

const themeDetails = {
    calm: { eng: 'Calm', kor: '정서 안정', target: '조용한 분위기에서 마음을 정리하고 싶은 여행자' },
    active: { eng: 'Active', kor: '수면 압력', target: '몸을 움직여 건강한 피로를 쌓고 싶은 여행자' },
    forest: { eng: 'Forest', kor: '숲 치유', target: '자연의 백색소음 속에서 깊은 이완이 필요한 여행자' },
    night: { eng: 'Night', kor: '야간 전환', target: '밤의 감각을 깨우고 생체리듬을 맞추고 싶은 여행자' },
    stay: { eng: 'Stay', kor: '치유 숙소', target: '완벽하게 통제된 환경에서 딥 슬립을 경험할 여행자' }
};
function openSheet(data) {
  modalTitle.textContent = data.title;
  modalSubtitle.textContent = data.subtitle;
  modalGrid.innerHTML = data.items.map(item => `
    <div class="sheet-card">
      <strong>${item[0]}</strong>
      <span>${item[1]}</span>
    </div>
  `).join('');
  primaryBtn.textContent = data.primary || '확인';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeSheet() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.social-trigger').forEach(button => {
  button.addEventListener('click', () => {
    openSheet(sheetContent.social(button.dataset.provider));
  });
});

// --- 🌟 별자리 투명 도화지 켜기 로직 ---
const startJourneyBtn = document.getElementById('start-journey-btn');
if(startJourneyBtn) {
  startJourneyBtn.addEventListener('click', () => {
    const starLayer = document.getElementById('star-layer');
    if(starLayer) starLayer.style.display = 'block'; 
    switchTab('home');
  });
}

// --- 🌟 별자리 선 긋기 함수 ---
function drawPathLine(node1, node2) {
  const svg = document.getElementById('constellation-svg');
  if (!svg) return;

  const x1 = node1.style.left;
  const y1 = node1.style.top;
  const x2 = node2.style.left;
  const y2 = node2.style.top;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("class", "constellation-line");
  svg.appendChild(line);
}

// --- 🌟 별 클릭 이벤트 (순서대로 연결) ---
let currentNodeForCheckin = null; 

document.querySelectorAll('.node-button').forEach(node => {
  node.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple';
    node.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600); 
    if (navigator.vibrate) navigator.vibrate(50);

    const nodeId = node.dataset.node;
    const theme = node.dataset.theme || 'calm';

    // 데이터 준비 (에러 방지망 포함)
    const data = sheetContent[nodeId] || { 
        title: '전용 치유 숙소', 
        subtitle: '진단을 완료하면 맞춤 객실이 배정됩니다.', 
        items: [['안내', '진단 탭에서 설문을 먼저 완료해 주세요.']] 
    };
    const tInfo = themeDetails[theme] || themeDetails.calm;
    const imgFileName = placeImages[nodeId] || 'images/default.jpg';

    // 모달창에 데이터 채워넣기
    document.getElementById('pd-image').style.backgroundImage = `url('${imgFileName}')`;
    document.getElementById('pd-title').textContent = data.title;
    document.getElementById('pd-eng').textContent = tInfo.eng;
    document.getElementById('pd-kor').textContent = tInfo.kor;
    document.getElementById('pd-desc').textContent = data.subtitle;
    document.getElementById('pd-sleep').textContent = data.items && data.items[0] ? data.items[0][1] : '';
    document.getElementById('pd-target').textContent = tInfo.target;

    // 방문 상태에 따른 버튼 UI 변경
    const checkinBtn = document.getElementById('pd-checkin-btn');
    const starLayer = document.getElementById('star-layer');
    const isComplete = starLayer && starLayer.classList.contains('constellation-complete');
    const isVisited = node.classList.contains('state-visited');

    if (isVisited) {
        checkinBtn.textContent = '방문 완료됨';
        checkinBtn.style.background = 'rgba(255,255,255,0.1)';
        checkinBtn.style.color = 'var(--text-soft)';
        checkinBtn.disabled = true;
    } else if (isComplete && node.id !== 'dynamic-stay-node') {
        checkinBtn.textContent = '별자리 완성됨';
        checkinBtn.style.background = 'rgba(255,255,255,0.1)';
        checkinBtn.style.color = 'var(--text-soft)';
        checkinBtn.disabled = true;
    } else {
        checkinBtn.textContent = '방문 체크인';
        checkinBtn.style.background = 'var(--mint)';
        checkinBtn.style.color = '#020a26';
        checkinBtn.disabled = false;
    }

    currentNodeForCheckin = node;

    // 풀스크린 모달 띄우기
    setTimeout(() => {
        const modal = document.getElementById('place-detail-modal');
        if(modal) modal.classList.add('open');
    }, 300);
  });
});

// 상세창 뒤로가기 버튼 로직
const pdBackBtn = document.getElementById('pd-back-btn');
if(pdBackBtn) {
  pdBackBtn.addEventListener('click', () => {
      const modal = document.getElementById('place-detail-modal');
      if(modal) modal.classList.remove('open');
  });
}

// 방문 체크인 버튼 로직
const pdCheckinBtn = document.getElementById('pd-checkin-btn');
if(pdCheckinBtn) {
  pdCheckinBtn.addEventListener('click', () => {
      if (!currentNodeForCheckin) return;
      const node = currentNodeForCheckin;
      const modal = document.getElementById('place-detail-modal');
      if(modal) modal.classList.remove('open'); 

      // 숙소 노드 처리
      if (node.id === 'dynamic-stay-node') {
        if (pathSequence.length < 2) {
          setTimeout(() => alert("숙소는 회복 여정의 마지막 목적지입니다.\\n최소 2곳 이상의 관광지를 먼저 방문해 주세요!"), 300);
          return; 
        } else {
          node.classList.remove('state-default', 'state-recommended');
          node.classList.add('state-visited');
          drawPathLine(pathSequence[pathSequence.length - 1], node);
          pathSequence.push(node);

          const starLayer = document.getElementById('star-layer');
          if(starLayer) starLayer.classList.add('constellation-complete');
          setTimeout(() => {
            const rewardModal = document.getElementById('reward-modal');
            if(rewardModal) rewardModal.classList.add('open');
            // 기존 updateRecordTab() 호출
            if (typeof updateRecordTab === 'function') updateRecordTab(); 
          }, 800);
          return; 
        }
      }

      // 일반 노드 방문 처리
      node.classList.remove('state-default', 'state-recommended');
      node.classList.add('state-visited');

      if (pathSequence.length > 0) {
        drawPathLine(pathSequence[pathSequence.length - 1], node);
      }
      pathSequence.push(node);
  });
}

// --- 🌟 기록 탭 데이터 업데이트 함수 ---
function updateRecordTab() {
  const recordEmpty = document.getElementById('record-empty-state');
  const recordData = document.getElementById('record-data-state');
  if (recordEmpty) recordEmpty.style.display = 'none';
  if (recordData) recordData.style.display = 'block';

  const recordDayActivity = document.getElementById('record-day-activity');
  const recordNightEnv = document.getElementById('record-night-env');
  
  if (recordDayActivity) recordDayActivity.textContent = "맞춤형 치유 코스";
  if (recordNightEnv) recordNightEnv.textContent = "배정된 전용 객실";
}

document.getElementById('open-record-modal').addEventListener('click', () => openSheet(sheetContent.record));
document.getElementById('open-profile-modal').addEventListener('click', () => openSheet(sheetContent.profile));
closeModalBtn.addEventListener('click', closeSheet);
secondaryCloseBtn.addEventListener('click', closeSheet);
modalScrim.addEventListener('click', closeSheet);
primaryBtn.addEventListener('click', () => {
  const title = modalTitle.textContent;
  
  if (title.includes('로그인 준비 중')) {
    showScreen('home'); // 홈 화면을 띄우고
    switchTab('diagnosis'); // 진단 탭을 바로 활성화합니다!
  } 
  // 🌟 [기능 추가] 기록 안내 모달에서 버튼 누르면 기록 탭으로 즉시 이동!
  else if (title.includes('회복 기록')) {
    switchTab('record');
  } 
  // 🌟 [기능 추가] 프로필 안내 모달에서 버튼 누르면 마이 탭으로 즉시 이동!
  else if (title.includes('프로필')) {
    switchTab('mypage');
  }
  
  closeSheet(); // 이동 후 모달창은 자연스럽게 닫아줍니다.
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSheet();
});

const tabButtons = document.querySelectorAll('.tab-button');
const pageSections = document.querySelectorAll('.page-section');

function switchTab(tab) {
  tabButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === tab));
  pageSections.forEach(section => section.classList.toggle('active', section.dataset.page === tab));
  if (!screens.home.classList.contains('active')) showScreen('home');

  const homeInner = screens.home.querySelector('.screen-inner');
  if (homeInner) {
    homeInner.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => switchTab(button.dataset.tab));
});

const surveyDefinitions = {
  travel: {
    label: '여행 성향', statusId: 'travel-status', color: '#9f8dff',
    questions: [
      { id:'t1', text:'여행 첫날 오후, 가장 끌리는 일정은?', options:[
        { value:'calm', label:'사람 적은 숲이나 강변을 천천히 걷는다' },
        { value:'active', label:'걷기 루트나 가벼운 체험 프로그램을 즐긴다' },
        { value:'night', label:'해질 무렵 야경이 좋은 장소를 미리 찾아둔다' }
      ]},
      { id:'t2', text:'여행지 카페/식당 고를 때 더 신경 쓰는 것은?', options:[
        { value:'calm', label:'조용함, 사람 수, 소음 정도' },
        { value:'active', label:'메뉴 다양성, 체험이 함께 있는지' },
        { value:'night', label:'야외석·뷰, 밤 분위기' }
      ]},
      { id:'t3', text:'여행 후 가장 기억에 남는 순간은?', options:[
        { value:'calm', label:'숲·강·마을에서 조용히 머물렀던 시간' },
        { value:'active', label:'곳곳을 활발히 돌아다녔던 시간' },
        { value:'night', label:'별, 야경, 밤 공기를 느끼던 순간' }
      ]},
      { id:'t4', text:'동행과의 여행에서 나의 역할은?', options:[
        { value:'calm', label:'느긋하게 쉬자고 제안하는 사람' },
        { value:'active', label:'이곳저곳 일정과 동선을 짜는 전술가' },
        { value:'night', label:'밤 일정을 조율하는 사람' }
      ]},
      { id:'t5', text:'"잘 쉬고 왔다"고 느낄 때의 조건은?', options:[
        { value:'calm', label:'조용한 곳에서 충분히 머무르고 왔을 때' },
        { value:'active', label:'해보고 싶은 체험을 몸으로 해봤을 때' },
        { value:'night', label:'밤 시간까지 편안하게 보내고 숙면했을 때' }
      ]}
    ]
  },
  sleep: {
    label: '수면 습관', statusId: 'sleep-status', color: '#85e4d1',
    questions: [
      { id:'s1', text:'최근 2주 평균 수면 시간은?', options:[
        { value:'lack', label:'5시간 이하' },
        { value:'mid', label:'5~7시간' },
        { value:'enough', label:'7시간 이상' }
      ]},
      { id:'s2', text:'잠들기까지 걸리는 시간은?', options:[
        { value:'lack', label:'30분 이상, 자주 뒤척인다' },
        { value:'mid', label:'15~30분 정도' },
        { value:'enough', label:'15분 이내로 금방 잠든다' }
      ]},
      { id:'s3', text:'밤중에 깨는 일이 얼마나 자주 있나요?', options:[
        { value:'lack', label:'자주 깨고 다시 잠들기 어렵다' },
        { value:'mid', label:'가끔 깨지만 다시 잠들 수 있다' },
        { value:'enough', label:'거의 깨지 않는다' }
      ]},
      { id:'s4', text:'아침에 일어났을 때 컨디션은?', options:[
        { value:'lack', label:'몽롱하고 피곤함이 남아 있다' },
        { value:'mid', label:'그럭저럭 버틸 수 있는 정도' },
        { value:'enough', label:'개운하고 가벼운 편이다' }
      ]},
      { id:'s5', text:'지금 본인의 "수면 위기감"은?', options:[
        { value:'lack', label:'지금 수면 패턴을 꼭 바꿔야 한다' },
        { value:'mid', label:'좀 더 잘 자면 좋겠다고 느낀다' },
        { value:'enough', label:'큰 위기감은 없다' }
      ]}
    ]
  },
  sensitivity: {
    label: '환경 민감도', statusId: 'sensitivity-status', color: '#ffc96b',
    questions: [
      { id:'e1', text:'잠들 때 빛(조명·창밖)에 얼마나 민감한가요?', options:[
        { value:'high', label:'아주 민감하다, 조금만 밝아도 불편하다' },
        { value:'mid', label:'어느 정도 신경 쓰이지만 적응한다' },
        { value:'low', label:'거의 신경 쓰이지 않는다' }
      ]},
      { id:'e2', text:'주변 소음에 대한 반응은?', options:[
        { value:'high', label:'작은 소리에도 쉽게 잠에서 깬다' },
        { value:'mid', label:'큰 소리면 깨지만 대부분은 버틴다' },
        { value:'low', label:'웬만한 소리는 못 듣고 자는 편이다' }
      ]},
      { id:'e3', text:'침구(매트리스·베개) 재질에 대한 민감도는?', options:[
        { value:'high', label:'조금만 달라져도 잘 못 자는 편이다' },
        { value:'mid', label:'맞으면 좋고 아니어도 적응은 한다' },
        { value:'low', label:'어디서든 잘 자는 편이다' }
      ]},
      { id:'e4', text:'잠들기 전 디지털 기기 사용은?', options:[
        { value:'high', label:'잠들기 직전까지 자주 본다' },
        { value:'mid', label:'30분 전에는 끄려고 노력한다' },
        { value:'low', label:'잠들기 전에는 거의 사용하지 않는다' }
      ]},
      { id:'e5', text:'낯선 숙소 첫날 밤, 잠드는 편인가요?', options:[
        { value:'high', label:'첫날은 거의 항상 잠이 잘 안 온다' },
        { value:'mid', label:'조금 뒤척이다가 결국은 잔다' },
        { value:'low', label:'집이든 숙소든 바로 자는 편이다' }
      ]}
    ]
  }
};

const surveyAnswers = { travel:{}, sleep:{}, sensitivity:{} };
let currentSurveyKey = 'travel';
let currentStepIndex = 0;

const surveyModal = document.getElementById('survey-modal');
const surveyModalLabel = document.getElementById('survey-modal-label');
const surveyModalProgressText = document.getElementById('survey-modal-progress-text');
const surveyModalProgressBar = document.getElementById('survey-modal-progress-bar');
const surveyModalQuestion = document.getElementById('survey-modal-question');
const surveyModalNext = document.getElementById('survey-modal-next');
const surveyModalClose = document.getElementById('survey-modal-close');
const surveyResultModal = document.getElementById('survey-result-modal');
const resultModalTitle = document.getElementById('result-modal-title');
const resultModalDesc = document.getElementById('result-modal-desc');
const resultGoCourse = document.getElementById('result-go-course');
const resultCloseBtn = document.getElementById('result-close-btn');

function openSurveyModal(key) {
  currentSurveyKey = key;
  currentStepIndex = 0;
  if(surveyModal) {
    surveyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderModalStep();
  }
}

function closeSurveyModal() {
  if(surveyModal) {
    surveyModal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function renderModalStep() {
  const def = surveyDefinitions[currentSurveyKey];
  const q = def.questions[currentStepIndex];
  const total = def.questions.length;
  const saved = surveyAnswers[currentSurveyKey][q.id] || null;
  
  const modalLabel = document.getElementById('survey-modal-label');
  const progressText = document.getElementById('survey-modal-progress-text');
  const progressBar = document.getElementById('survey-modal-progress-bar');
  const modalQuestion = document.getElementById('survey-modal-question');
  const btnPrev = document.getElementById('survey-modal-prev');
  const btnNext = document.getElementById('survey-modal-next');

  if(modalLabel) modalLabel.textContent = def.label;
  if(progressText) progressText.textContent = `${currentStepIndex + 1} / ${total}`;
  if(progressBar) {
    progressBar.style.width = `${((currentStepIndex + 1) / total) * 100}%`;
    progressBar.style.background = def.color;
  }

  if(modalQuestion) {
    modalQuestion.innerHTML = `
      <h4>${q.text}</h4>
      ${q.options.map(opt => `
        <label class="survey-option-label ${saved === opt.value ? 'selected' : ''}">
          <input type="radio" name="survey-q" value="${opt.value}" ${saved === opt.value ? 'checked' : ''}>
          ${opt.label}
        </label>
      `).join('')}
    `;

    modalQuestion.querySelectorAll('input[type=radio]').forEach(input => {
      input.addEventListener('change', () => {
        modalQuestion.querySelectorAll('.survey-option-label').forEach(label => {
          label.classList.toggle('selected', label.querySelector('input').checked);
        });
      });
    });
  }

  // 🌟 이전/다음 버튼 보이기 및 글씨 설정
  if (btnPrev) btnPrev.style.display = currentStepIndex === 0 ? 'none' : 'block';
  if (btnNext) btnNext.textContent = currentStepIndex === total - 1 ? '완료' : '다음';
}

// 🌟 이전 버튼 클릭 이벤트
const btnPrev = document.getElementById('survey-modal-prev');
if (btnPrev) {
  btnPrev.addEventListener('click', () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      renderModalStep();
    }
  });
}

// 🌟 다음 버튼 클릭 이벤트
const btnNext = document.getElementById('survey-modal-next');
if (btnNext) {
  btnNext.addEventListener('click', () => {
    const def = surveyDefinitions[currentSurveyKey];
    const q = def.questions[currentStepIndex];
    const modalQuestion = document.getElementById('survey-modal-question');
    const checked = modalQuestion ? modalQuestion.querySelector('input[name="survey-q"]:checked') : null;
    
    if (!checked) {
      alert('하나를 선택해 주세요.');
      return;
    }
    
    surveyAnswers[currentSurveyKey][q.id] = checked.value;
    updateCardStatus(currentSurveyKey);

    if (currentStepIndex < def.questions.length - 1) {
      currentStepIndex++;
      renderModalStep();
    } else {
      closeSurveyModal();
      checkAllSurveysDone();
    }
  });
}
  

function updateCardStatus(key) {
  const def = surveyDefinitions[key];
  const statusEl = document.getElementById(def.statusId);
  if (!statusEl) return;
  const answered = Object.keys(surveyAnswers[key]).length;
  const total = def.questions.length;
  
  if (answered >= total) {
    statusEl.textContent = '완료 ✓';
    statusEl.style.background = 'rgba(159,141,255,0.2)';
    statusEl.style.color = '#d8ceff';
  } else if (answered > 0) {
    statusEl.textContent = `${answered}/${total}`;
    statusEl.style.background = 'rgba(255,255,255,0.06)';
    statusEl.style.color = 'var(--text-soft)';
  }
}

function checkAllSurveysDone() {
  const allDone =
    Object.keys(surveyAnswers.travel).length === surveyDefinitions.travel.questions.length &&
    Object.keys(surveyAnswers.sleep).length === surveyDefinitions.sleep.questions.length &&
    Object.keys(surveyAnswers.sensitivity).length === surveyDefinitions.sensitivity.questions.length;

  if (allDone) {
    showSurveyResultModal();
  }
}


function showSurveyResultModal() {
  const tScore = { calm:0, active:0, night:0 };
  Object.values(surveyAnswers.travel).forEach(v => { if (tScore[v] !== undefined) tScore[v]++; });
  const tWinner = Object.entries(tScore).sort((a,b) => b[1]-a[1])[0][0] || 'calm';

  const sScore = { lack:0, mid:0, enough:0 };
  Object.values(surveyAnswers.sleep).forEach(v => { if (sScore[v] !== undefined) sScore[v]++; });
  const sWinner = Object.entries(sScore).sort((a,b) => b[1]-a[1])[0][0] || 'mid';

  const eScore = { high:0, mid:0, low:0 };
  Object.values(surveyAnswers.sensitivity).forEach(v => { if (eScore[v] !== undefined) eScore[v]++; });
  const eWinner = Object.entries(eScore).sort((a,b) => b[1]-a[1])[0][0] || 'mid';

  // 🌟 [복구] 상세 진단 데이터 맵
  const travelMap = {
    calm: { title: '정지된 수면의 고요한 항해자', desc: '외부 자극을 최소화하고 내면에 집중할 때 에너지가 채워지는 정적인 탐험가입니다.', rx: '시각과 청각의 피로도를 낮추는 것이 수면의 핵심입니다. 인적이 드문 숲길을 걷거나 강가에 가만히 머무르며 교감신경을 부드럽게 안정시키는 \'저자극 힐링\'에 집중해 보세요.', keyword: '#저자극힐링 #교감신경안정', stat: 20, statLabel: '활동 템포 (정적)' },
    active: { title: '파동을 만드는 활기찬 항해자', desc: '신체적 활동을 통해 에너지를 발산하고 스트레스를 해소할 때 가장 큰 만족을 느끼는 타입입니다.', rx: '밤에 깊은 잠에 빠지기 위해서는 낮 동안 몸을 움직여 \'수면 압력(Sleep Pressure)\'을 최대치로 끌어올려야 합니다. 땀이 나는 동적 코스로 건강한 피로감을 만끽해 보세요.', keyword: '#수면압력극대화 #에너지발산', stat: 90, statLabel: '활동 템포 (동적)' },
    night: { title: '빛의 궤적을 쫓는 심야의 항해자', desc: '해가 질 무렵부터 밤이 깊어질수록 오히려 감각이 맑게 깨어나는 올빼미형 탐험가입니다.', rx: '억지로 일찍 잠자리에 들려 하기보다, 생체 리듬의 자연스러운 전환이 필요합니다. 늦은 오후에 여정을 시작해 빛과 온도의 변화를 오감으로 느끼는 코스를 추천합니다.', keyword: '#야간감각전환 #생체리듬동기화', stat: 60, statLabel: '활동 템포 (심야형)' }
  };

  const sleepMap = {
    lack: { title: '만성 수면 부채 상태', desc: '일상적인 스트레스와 피로로 인해 수면 시간이 절대적으로 부족하거나 질이 저하된 누적 상태입니다.', rx: '이번 여정의 최우선 목표는 \'수면 빚 청산\'입니다. 강박적으로 잠을 자려 하기보다, 낮 시간의 충분한 햇빛 노출로 뇌가 쉴 수 있는 여백을 허락해 주세요.', keyword: '#수면빚청산 #햇빛노출', stat: 95, statLabel: '수면 회복 필요도' },
    mid: { title: '수면 리듬 불균형 상태', desc: '수면 시간은 어느 정도 확보하고 있지만, 입면 시간이 지연되거나 중간에 깨는 등 효율이 떨어지는 상태입니다.', rx: '\'일주기 리듬(Circadian Rhythm)\'의 복원이 핵심입니다. 저녁 식사 이후의 자극을 줄이고, 블루라이트를 철저히 차단하는 디지털 디톡스를 병행해 보세요.', keyword: '#일주기리듬복원 #디지털디톡스', stat: 65, statLabel: '수면 회복 필요도' },
    enough: { title: '안정적 수면 유지 상태', desc: '일상 속에서 비교적 규칙적이고 안정적인 수면 패턴을 훌륭하게 유지하고 있는 건강한 상태입니다.', rx: '현재의 좋은 패턴을 유지하면서, 영월의 맑은 공기와 자연 백색소음을 활용해 수면의 질을 \'최상급(Deep Sleep)\'으로 끌어올리는 컨디셔닝 실험에 집중해 보세요.', keyword: '#컨디션최적화 #수면질향상', stat: 30, statLabel: '수면 회복 필요도' }
  };

  const sensMap = {
    high: { title: '고관여 수면자 (최고 민감도)', desc: '빛, 소리, 침구의 미세한 변화에도 뇌파가 쉽게 각성하여 얕은 잠을 자게 되는 초예민 상태입니다.', rx: '시청각 자극을 100% 차단해야 합니다. 완벽한 암막 커튼, 백색소음기, 알러지 케어 저자극 침구가 세팅된 \'디펜스형 객실\'에서의 숙박이 필수적입니다.', keyword: '#완벽암막 #디펜스형객실', stat: 100, statLabel: '환경 통제 필요도' },
    mid: { title: '환경 적응형 수면자', desc: '일상적인 환경에는 무난히 적응하지만, 낯선 곳의 갑작스러운 소음이나 맞지 않는 온도에는 수면을 방해받을 수 있습니다.', rx: '수면 의학 권장 온도(18~21도)를 유지하고, 입면을 돕는 은은한 간접 조명과 릴렉싱 사운드 등 \'부드러운 수면 유도 환경\'을 세팅하는 것을 권장합니다.', keyword: '#부드러운유도 #권장온도', stat: 50, statLabel: '환경 통제 필요도' },
    low: { title: '저항력 강한 수면자', desc: '환경 변화에 대한 방어력이 뛰어나, 낯선 여행지에서도 비교적 머리를 대면 쉽게 잠에 빠져드는 긍정적인 타입입니다.', rx: '인위적인 환경 통제보다는, 영월의 시원한 밤공기와 자연의 소리를 그대로 받아들이는 개방형 객실이나 별빛 캠핑 등 다양한 수면 환경을 폭넓게 경험해 보세요.', keyword: '#자연친화 #다양한경험', stat: 15, statLabel: '환경 통제 필요도' }
  };

  if(resultModalTitle) resultModalTitle.textContent = travelMap[tWinner].title;

  if (resultModalDesc) {
    resultModalDesc.innerHTML = `
      <div class="result-card" style="background:rgba(255,255,255,0.05); padding:16px; border-radius:18px; margin-bottom:12px; border:1px solid rgba(159,141,255,0.2);">
        <strong style="color:var(--primary); font-size:12px;">✦ 여행 성향 · ${travelMap[tWinner].statLabel} ${travelMap[tWinner].stat}%</strong>
        <p style="font-size:14px; margin:8px 0; line-height:1.5; font-weight: 700; color: #fff;">${travelMap[tWinner].desc}</p>
        <div style="font-size:13px; color:var(--text-soft); line-height: 1.5; margin-bottom: 8px;">${travelMap[tWinner].rx}</div>
        <span style="font-size:12px; color:var(--primary); font-weight:800;">${travelMap[tWinner].keyword}</span>
      </div>
      <div class="result-card" style="background:rgba(255,255,255,0.05); padding:16px; border-radius:18px; margin-bottom:12px; border:1px solid rgba(133,228,209,0.2);">
        <strong style="color:var(--mint); font-size:12px;">☾ 수면 습관 · ${sleepMap[sWinner].statLabel} ${sleepMap[sWinner].stat}%</strong>
        <p style="font-size:14px; margin:8px 0; line-height:1.5; font-weight: 700; color: #fff;">${sleepMap[sWinner].desc}</p>
        <div style="font-size:13px; color:var(--text-soft); line-height: 1.5; margin-bottom: 8px;">${sleepMap[sWinner].rx}</div>
        <span style="font-size:12px; color:var(--mint); font-weight:800;">${sleepMap[sWinner].keyword}</span>
      </div>
      <div class="result-card" style="background:rgba(255,255,255,0.05); padding:16px; border-radius:18px; margin-bottom:12px; border:1px solid rgba(255,201,107,0.2);">
        <strong style="color:var(--gold); font-size:12px;">◎ 환경 민감도 · ${sensMap[eWinner].statLabel} ${sensMap[eWinner].stat}%</strong>
        <p style="font-size:14px; margin:8px 0; line-height:1.5; font-weight: 700; color: #fff;">${sensMap[eWinner].desc}</p>
        <div style="font-size:13px; color:var(--text-soft); line-height: 1.5; margin-bottom: 8px;">${sensMap[eWinner].rx}</div>
        <span style="font-size:12px; color:var(--gold); font-weight:800;">${sensMap[eWinner].keyword}</span>
      </div>
    `;
  }

  const emptyState = document.getElementById('course-empty-state');
  const timelineState = document.getElementById('course-timeline-state');
  if (emptyState) emptyState.style.display = 'none';
  if (timelineState) timelineState.style.display = 'block';
  
  const rxMatch = document.getElementById('rx-match');
  const rxPressure = document.getElementById('rx-pressure');
  const rxEnv = document.getElementById('rx-env');

  if(rxMatch) rxMatch.textContent = `AI 매칭률 ${Math.floor(Math.random() * (99 - 94) + 94)}%`; 
  
  if(rxPressure) {
    if (sWinner === 'lack') { rxPressure.textContent = '목표 수면 압력: 매우 높음 (집중 회복)'; }
    else if (sWinner === 'mid') { rxPressure.textContent = '목표 수면 압력: 높음 (리듬 개선)'; }
    else { rxPressure.textContent = '목표 수면 압력: 유지 (컨디션 최적화)'; }
  }

  if(rxEnv) {
    if (eWinner === 'high') { rxEnv.textContent = '환경 제어: 3단계 (최고 민감 대응)'; }
    else if (eWinner === 'mid') { rxEnv.textContent = '환경 제어: 2단계 (표준 대응)'; }
    else { rxEnv.textContent = '환경 제어: 1단계 (기본 세팅)'; }
  }

  const courseEyebrow = document.getElementById('course-eyebrow');
  const courseElements = {
    hero: document.getElementById('course-hero-title'),
    step1T: document.getElementById('course-step1-title'),
    step1D: document.getElementById('course-step1-desc'),
    step1Tag: document.getElementById('course-step1-tag'),
    step2T: document.getElementById('course-step2-title'),
    step2D: document.getElementById('course-step2-desc'),
    step3T: document.getElementById('course-step3-title'),
    step3D: document.getElementById('course-step3-desc'),
    step4T: document.getElementById('course-step4-title'),
    step4D: document.getElementById('course-step4-desc')
  };

  if(courseEyebrow) courseEyebrow.textContent = `맞춤 동선 · ${travelMap[tWinner].title}`;
  
  if (tWinner === 'calm') {
    if(courseElements.hero) courseElements.hero.textContent = '느린 호흡으로 자연에 머무는 회복 동선';
    if(courseElements.step1T) courseElements.step1T.textContent = '청령포 숲길 산책 & 물멍';
    if(courseElements.step1D) courseElements.step1D.textContent = '낮의 햇빛을 받으며 교감신경을 안정시키는 조용한 체류형 코스입니다.';
    if(courseElements.step1Tag) courseElements.step1Tag.textContent = '저자극 힐링';
    if(courseElements.step2T) courseElements.step2T.textContent = '수면 유도 티(Tea) 다이닝';
    if(courseElements.step2D) courseElements.step2D.textContent = '소화 부담이 적은 영월 나물 정식과 심신 안정을 돕는 약초 차 세션을 진행합니다.';
  } else if (tWinner === 'active') {
    if(courseElements.hero) courseElements.hero.textContent = '활발한 활동으로 리듬을 찾는 에너지 동선';
    if(courseElements.step1T) courseElements.step1T.textContent = '동강 트레킹 & 리버버깅';
    if(courseElements.step1D) courseElements.step1D.textContent = '강한 신체 활동으로 아데노신을 축적해 야간 수면 압력을 극대화합니다.';
    if(courseElements.step1Tag) courseElements.step1Tag.textContent = '수면 압력 증가';
    if(courseElements.step2T) courseElements.step2T.textContent = '고단백 회복 다이닝';
    if(courseElements.step2D) courseElements.step2D.textContent = '에너지 소모를 보충하고 멜라토닌 생성을 돕는 육류 위주의 식사와 야간 산책을 즐깁니다.';
  } else {
    if(courseElements.hero) courseElements.hero.textContent = '밤의 감각을 깨우는 심야 전환 동선';
    if(courseElements.step1T) courseElements.step1T.textContent = '강변 노을 감상 & 사진 기록';
    if(courseElements.step1D) courseElements.step1D.textContent = '저색온도의 노을빛을 통해 뇌에 밤의 시작을 알리고 각성도를 낮춥니다.';
    if(courseElements.step1Tag) courseElements.step1Tag.textContent = '야간 감각 전환';
    if(courseElements.step2T) courseElements.step2T.textContent = '별마로 천문대 별빛 투어';
    if(courseElements.step2D) courseElements.step2D.textContent = '인공 조명을 차단하고 별빛에 몰입하며 자연스러운 수면 유도를 준비합니다.';
  }

  if (eWinner === 'high') {
    if(courseElements.step3T) courseElements.step3T.textContent = '딥 슬립 차단 솔루션';
    if(courseElements.step3D) courseElements.step3D.textContent = '체크인 시 분석된 \'고민감도\' 프로파일에 맞춰 100% 암막, 백색소음기, 온습도가 최적화된 저자극 객실이 배정됩니다.';
  } else if (eWinner === 'mid') {
    if(courseElements.step3T) courseElements.step3T.textContent = '표준 수면 최적화 세팅';
    if(courseElements.step3D) courseElements.step3D.textContent = '체크인 시 간접 조명과 선호하는 침구 세트가 준비되며, 매트리스 수면 트래킹 센서가 작동을 시작합니다.';
  } else {
    if(courseElements.step3T) courseElements.step3T.textContent = '자연 친화형 수면 환경';
    if(courseElements.step3D) courseElements.step3D.textContent = '체크인 후 편안한 휴식을 위한 기본 환경이 제공되며, 스마트링을 통한 자율 수면 트래킹이 시작됩니다.';
  }

  if (sWinner === 'lack') {
    if(courseElements.step4T) courseElements.step4T.textContent = '집중 회복 지수 분석';
    if(courseElements.step4D) courseElements.step4D.textContent = '만성 피로 해소 정도를 측정하고, 부족한 잠을 채우기 위한 추가 휴식 플랜을 제공합니다.';
  } else {
    if(courseElements.step4T) courseElements.step4T.textContent = '수면 효율 별자리 기록';
    if(courseElements.step4D) courseElements.step4D.textContent = '어젯밤의 양질의 수면 데이터를 확인하고, 나만의 회복 별자리를 영구 저장합니다.';
  }

  document.querySelectorAll('.node-button').forEach(node => {
    const nodeTheme = node.dataset.theme;
    if (nodeTheme === tWinner || nodeTheme === 'stay' || nodeTheme === 'forest') {
      node.classList.remove('state-default');
      node.classList.add('state-recommended');
    }
  });

  const stayNode = document.getElementById('dynamic-stay-node');
  if (stayNode) {
    const stayLabel = stayNode.querySelector('.label');
    stayNode.classList.remove('state-default');
    stayNode.classList.add('state-recommended');

    if (eWinner === 'high') {
      stayLabel.textContent = '추천: 딥 슬립 룸';
      stayNode.dataset.node = 'room_high';
    } else if (eWinner === 'mid') {
      stayLabel.textContent = '추천: 스탠다드 룸';
      stayNode.dataset.node = 'room_mid';
    } else {
      stayLabel.textContent = '추천: 별빛 캠핑존';
      stayNode.dataset.node = 'room_low';
    }
  }

  if(surveyResultModal) surveyResultModal.classList.add('open');

  const mypageTitle = document.getElementById('mypage-profile-title');
  const mypageDesc = document.getElementById('mypage-profile-desc');
  const mypageAvatar = document.getElementById('mypage-avatar');

  if (mypageTitle && mypageDesc && mypageAvatar) {
    mypageTitle.textContent = `[${travelMap[tWinner].title}]`;
    
    if (tWinner === 'calm') {
      mypageDesc.textContent = '조용한 자연 속에서 교감신경을 안정시키는 것을 선호하며, 고도의 환경 제어가 필요한 타입입니다.';
      mypageAvatar.textContent = '🍃'; 
      mypageAvatar.style.borderColor = '#00FF85'; 
    } else if (tWinner === 'active') {
      mypageDesc.textContent = '낮 동안 에너지를 발산해 수면 압력을 극대화하여 깊은 수면을 유도하는 타입입니다.';
      mypageAvatar.textContent = '🔥'; 
      mypageAvatar.style.borderColor = '#FF2E63'; 
    } else {
      mypageDesc.textContent = '해질녘부터 밤까지 이어지는 빛 조절과 감각 전환에 최적화된 올빼미형 타입입니다.';
      mypageAvatar.textContent = '🌙'; 
      mypageAvatar.style.borderColor = '#BF95FF'; 
    }
  }
}

if(surveyModalClose) {
  surveyModalClose.addEventListener('click', closeSurveyModal);
}

const surveyResultCloseBtn = document.getElementById('survey-result-close');
if(surveyResultCloseBtn) {
  surveyResultCloseBtn.addEventListener('click', () => {
    if(surveyResultModal) surveyResultModal.classList.remove('open');
  });
}

if(resultCloseBtn) {
  resultCloseBtn.addEventListener('click', () => {
    if(surveyResultModal) surveyResultModal.classList.remove('open');
  });
}

if(resultGoCourse) {
  resultGoCourse.addEventListener('click', () => {
    const overlay = document.getElementById('result-loading-overlay');
    
    if (overlay) {
      // 1. 버튼 누르면 로딩창 먼저 켜기
      overlay.style.display = 'flex'; 
      if (navigator.vibrate) navigator.vibrate(50); // 손맛 진동
      
      // 2. 1.5초(1500ms) 동안 AI가 고민하는 척 대기하기
      setTimeout(() => {
        overlay.style.display = 'none'; // 로딩 끄기
        if(surveyResultModal) surveyResultModal.classList.remove('open'); // 모달 끄기
        switchTab('course'); // 코스 탭으로 짜잔! 이동
        window.scrollTo(0, 0); // 화면 맨 위로 끌어올리기
      }, 1500);
      
    } else {
      // 만약 에러가 나면 기존처럼 바로 넘어가게 안전망 설치
      if(surveyResultModal) surveyResultModal.classList.remove('open');
      switchTab('course');
    }
  });
}

document.querySelectorAll('.survey-entry-card').forEach(card => {
  card.addEventListener('click', () => {
    openSurveyModal(card.dataset.survey);
  });
});

const rewardCloseBtn = document.getElementById('reward-close-btn');
if(rewardCloseBtn) {
  rewardCloseBtn.addEventListener('click', () => {
    // 1. 모달 창 닫기
    const rewardModal = document.getElementById('reward-modal');
    if(rewardModal) rewardModal.classList.remove('open');
    
    // 🌟 [버그 픽스] 나중에 받기를 눌러도 별자리 데이터를 백그라운드에 저장합니다!
    const emptyState = document.getElementById('record-empty-state');
    const dataState = document.getElementById('record-data-state');
    if (emptyState) emptyState.style.display = 'none';
    if (dataState) dataState.style.display = 'block';

    const stayNode = document.getElementById('dynamic-stay-node');
    const roomName = stayNode ? stayNode.querySelector('.label').textContent : '맞춤 치유 객실';

    // 지도 좌표 추출
    const coords = pathSequence.map(node => ({
      x: node.style.left,
      y: node.style.top
    }));

    if (typeof window.constellationArchive === 'undefined') {
      window.constellationArchive = [];
    }

    // 새로운 별자리 데이터 생성
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      name: `${window.constellationArchive.length + 1}회차 치유 별자리`,
      coords: coords,
      room: roomName
    };
    
    window.constellationArchive.push(newEntry);
    
    // 데이터만 업데이트해두고 탭 이동은 하지 않음
    if (typeof renderArchive === 'function') renderArchive(); 
    if (typeof updateRecordTab === 'function') updateRecordTab(); 
  });
}

// --- 🌟 별자리 완성 리워드 모달 '확인' 버튼 로직 ---
const rewardConfirmBtn = document.getElementById('reward-confirm-btn');
if(rewardConfirmBtn) {
  rewardConfirmBtn.addEventListener('click', () => {
    // 1. 모달 닫기
    const rewardModal = document.getElementById('reward-modal');
    if(rewardModal) rewardModal.classList.remove('open');
    
    // (이름 묻는 팝업 삭제!) 화면 강제 전환
    const emptyState = document.getElementById('record-empty-state');
    const dataState = document.getElementById('record-data-state');
    if (emptyState) emptyState.style.display = 'none';
    if (dataState) dataState.style.display = 'block';

    const stayNode = document.getElementById('dynamic-stay-node');
    const roomName = stayNode ? stayNode.querySelector('.label').textContent : '맞춤 치유 객실';

    // 지도에 찍힌 별들의 좌표(%) 그대로 추출하기
    const coords = pathSequence.map(node => ({
      x: node.style.left,
      y: node.style.top
    }));

    if (typeof window.constellationArchive === 'undefined') {
      window.constellationArchive = [];
    }

    // 🌟 완성된 데이터 세팅 (기본 이름 자동 부여)
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      name: `${window.constellationArchive.length + 1}회차 치유 별자리`, // 기본 이름
      coords: coords,
      room: roomName
    };
    
    window.constellationArchive.push(newEntry);
    
    // 화면에 그리고 탭 이동
    renderArchive(); 
    switchTab('record'); 
  });
}

// --- 🌟 추출한 좌표를 바탕으로 미니 별자리 도화지(SVG) 그리기 ---
function generateMiniSVG(coords) {
  if (!coords || coords.length === 0) return '';
  let lines = '';
  for (let i = 0; i < coords.length - 1; i++) {
    lines += `<line x1="${coords[i].x}" y1="${coords[i].y}" x2="${coords[i+1].x}" y2="${coords[i+1].y}" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" stroke-dasharray="3 3" />`;
  }
  let dots = coords.map((c, i) => {
    let isLast = i === coords.length - 1;
    let color = isLast ? '#FFD700' : '#fff'; 
    let size = isLast ? '5' : '3';
    return `<circle cx="${c.x}" cy="${c.y}" r="${size}" fill="${color}" filter="drop-shadow(0 0 3px ${color})" />`;
  }).join('');

  return `<svg width="100%" height="100%" style="overflow: visible; filter: drop-shadow(0 0 5px rgba(255,255,255,0.4));">
            ${lines}
            ${dots}
          </svg>`;
}

// --- 🌟 [추가] 카드 클릭 시 이름 변경하는 함수 ---
window.renameConstellation = function(id) {
  const archive = window.constellationArchive;
  const index = archive.findIndex(item => item.id === id);
  if (index === -1) return;

  const currentName = archive[index].name;
  const newName = prompt('✨ 별자리의 새 이름을 지어주세요.', currentName);

  // 취소하지 않고 새 이름을 입력했을 때만 변경
  if (newName !== null && newName.trim() !== '') {
    archive[index].name = newName.trim();
    renderArchive(); // 화면 새로고침
  }
};

// --- 🌟 아카이브 그리드에 카드를 그려주는 함수 ---
function renderArchive() {
  const archiveGrid = document.getElementById('constellation-archive-grid');
  if (!archiveGrid) return;

  archiveGrid.innerHTML = window.constellationArchive.map(item => `
    <div class="archive-card" style="position: relative; overflow: hidden; height: 160px; padding: 0; cursor: pointer;" onclick="renameConstellation(${item.id})">
      
      <div style="position: absolute; top: 0; left: 0; right: 0; padding: 12px 10px 16px; background: linear-gradient(180deg, rgba(3,16,61,0.95) 0%, transparent 100%); z-index: 2; text-align: center;">
        <strong style="font-size: 13px; font-weight: 800; color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,0.9); display: block; margin-bottom: 4px;">${item.name} ✏️</strong>
        <div style="font-size: 10px; color: var(--mint);">${item.room}</div>
      </div>
      
      <div style="position: absolute; inset: 45px 15px 25px 15px; pointer-events: none; opacity: 0.9;">
        ${generateMiniSVG(item.coords)}
      </div>
      
      <span class="label" style="position:absolute; bottom:10px; left:0; width:100%; text-align:center; font-size:10px; color:rgba(255,255,255,0.6); z-index: 2;">${item.date}</span>
    </div>
  `).join('');
}

// --- 🌟 지도 확대/축소(Zoom) 기능 ---
let currentScale = 1; 

const zoomInBtn = document.getElementById('map-zoom-in');
const zoomOutBtn = document.getElementById('map-zoom-out');

if (zoomInBtn) {
  zoomInBtn.addEventListener('click', () => {
    currentScale += 0.3;
    if (currentScale > 3) currentScale = 3; 
    updateMapTransform();
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', () => {
    currentScale -= 0.3;
    if (currentScale < 1) currentScale = 1; 
    updateMapTransform();
  });
}

function updateMapTransform() {
  const mapWrapper = document.getElementById('map-wrapper');
  if (mapWrapper) {
    mapWrapper.style.transform = `scale(${currentScale})`;
  }

  const zoomLevelText = document.getElementById('zoom-level-text');
  if (zoomLevelText) {
    zoomLevelText.textContent = currentScale.toFixed(1) + 'x';
  }
}

// --- 🌟 가로 스크롤 인디케이터 연동 ---
const mapScrollArea = document.getElementById('map-scroll-area');
const indicatorBar = document.getElementById('map-indicator-bar');

if (mapScrollArea && indicatorBar) {
  mapScrollArea.addEventListener('scroll', () => {
    const scrollLeft = mapScrollArea.scrollLeft;
    const scrollWidth = mapScrollArea.scrollWidth - mapScrollArea.clientWidth;
    
    if (scrollWidth > 0) {
      const scrollPercentage = (scrollLeft / scrollWidth) * 100;
      indicatorBar.style.transform = `translateX(${scrollPercentage * 2.3}px)`;
    }
  });
}
// --- 🌟 마이페이지 객실 수면 온도 조절 로직 ---
const tempBtns = document.querySelectorAll('.temp-btn');
if (tempBtns.length >= 2) {
  const btnMinus = tempBtns[0]; // 첫 번째 버튼 (-)
  const btnPlus = tempBtns[1];  // 두 번째 버튼 (+)
  const tempDisplay = btnMinus.nextElementSibling; // 가운데 있는 온도 숫자

  let currentTemp = 21; // 기본 온도

  btnMinus.addEventListener('click', () => {
    if (currentTemp > 18) {
      currentTemp--;
      tempDisplay.textContent = currentTemp + '°';
      if (navigator.vibrate) navigator.vibrate(20); // '띡' 하는 짧은 진동 손맛
    }
  });

  btnPlus.addEventListener('click', () => {
    if (currentTemp < 30) {
      currentTemp++;
      tempDisplay.textContent = currentTemp + '°';
      if (navigator.vibrate) navigator.vibrate(20); // '띡' 하는 짧은 진동 손맛
    }
  });
}
// --- 🌟 2&3단계: 토스트 알림 및 코스 체크오프 기능 로직 ---

// 1. 공통 토스트 알림 함수
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;
  container.appendChild(toast);
  
  // 애니메이션 종료 후 요소 삭제
  setTimeout(() => toast.remove(), 2500);
}

// 2. 토글 스위치 시각적 피드백 (마이페이지 등)
document.querySelectorAll('.toggle-switch input').forEach(toggle => {
  toggle.addEventListener('change', (e) => {
    const row = e.target.closest('.setting-row');
    const label = row ? row.querySelector('strong').textContent : '설정';
    const status = e.target.checked ? '활성화되었습니다' : '비활성화되었습니다';
    
    showToast(`${label} 모드가 ${status}`);
    if (navigator.vibrate) navigator.vibrate(30);
  });
});

// 3. 코스 타임라인 카드 체크오프 기능 (🌟 한 번만 눌리도록 수정!)
document.querySelectorAll('.timeline-content').forEach(card => {
  card.addEventListener('click', function() {
    // 🌟 카드가 이미 '완료(completed)' 상태라면? 아무것도 하지 않고 그냥 튕겨냅니다!
    if (this.classList.contains('completed')) {
      return; 
    }

    // 처음 누르는 거라면 완료 처리하고 알림 띄우기
    this.classList.add('completed');
    showToast('일정을 완료했습니다! 별자리에 기록됩니다.');
    if (navigator.vibrate) navigator.vibrate([40, 30, 40]); // '뚜둑' 하는 완료 진동
  });
});
// --- 🌟 [안전한 버그 픽스] 보상 모달 버튼 이벤트 (충돌 방지) ---
document.addEventListener('click', function(e) {
  // 1. '나중에 받기' 버튼을 눌렀을 때
  if (e.target.id === 'reward-close-btn') {
    const rewardModal = document.getElementById('reward-modal');
    if (rewardModal) rewardModal.classList.remove('open');
    
    // 🌟 핵심: 창만 닫고, 뒤에서는 기록 탭을 확실하게 업데이트해 둡니다.
    if (typeof updateRecordTab === 'function') updateRecordTab(); 
  }
  
  // 2. '기록 탭에서 확인하기' 버튼을 눌렀을 때
  if (e.target.id === 'reward-confirm-btn') {
    const rewardModal = document.getElementById('reward-modal');
    if (rewardModal) rewardModal.classList.remove('open');
    
    // 🌟 핵심: 기록 탭 업데이트 후, 화면을 기록 탭으로 아예 넘겨버립니다.
    if (typeof updateRecordTab === 'function') updateRecordTab(); 
    if (typeof switchTab === 'function') switchTab('record');
    window.scrollTo(0, 0);
  }
});