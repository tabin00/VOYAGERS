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
    slide.style.display = i === index ? 'block' : 'none';
  });
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  nextBtn.textContent = index === slides.length - 1 ? '로그인 화면으로' : '다음';
}

nextBtn.addEventListener('click', () => {
  if (currentSlide < slides.length - 1) {
    currentSlide += 1;
    renderSlide(currentSlide);
  } else {
    showScreen('login');
  }
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    renderSlide(currentSlide);
  });
});

document.getElementById('skip-onboarding').addEventListener('click', () => showScreen('login'));
document.getElementById('to-login').addEventListener('click', () => showScreen('login'));
document.getElementById('back-to-onboarding').addEventListener('click', () => showScreen('onboarding'));
document.getElementById('skip-to-home').addEventListener('click', () => showScreen('home'));
document.getElementById('skip-to-home-top').addEventListener('click', () => showScreen('home'));

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
  record: {
    title: '회복 기록 기능 안내', subtitle: '방문 장소와 나만의 별자리 완성도를 모아보는 기능입니다.',
    items: [['기록 단위', '체류 시간, 감정 변화, 수면 만족도를 별 단위로 기록합니다.']], primary: '확인했어요'
  },
  profile: {
    title: '프로필 섹션 안내', subtitle: '개인 취향과 기록 저장이 가능하도록 설계할 수 있습니다.',
    items: [['저장 예정 정보', '선호 코스, 환경 민감도, 별자리 기록']], primary: '닫기'
  },
  
  /* 1. Calm (정서 안정) */
  cheongnyeongpo: {
    title: '청령포', subtitle: '고요한 숲과 강변이 어우러진 정서 안정 포인트입니다.',
    items: [['수면 도움', '시야 확장과 저강도 보행을 통해 교감신경을 부드럽게 안정시킵니다.'], ['추천 대상', '사람이 적고 조용한 곳을 선호하는 여행자']], primary: '방문 체크인'
  },
  jangneung: {
    title: '장릉', subtitle: '울창한 소나무 숲길을 천천히 걷는 저자극 코스입니다.',
    items: [['수면 도움', '피톤치드와 고요함으로 스트레스 호르몬(코르티솔) 수치를 낮춥니다.'], ['추천 대상', '시각적 피로를 풀고 마음을 정리하고 싶은 분']], primary: '방문 체크인'
  },
  saggat: {
    title: '김삿갓문학관', subtitle: '조용한 이야기와 함께 마음의 템포를 늦추는 거점입니다.',
    items: [['수면 도움', '인지행동치료(CBT-I) 관점에서 자기 전 불안감을 낮추는 정서 정리 시간을 제공합니다.']], primary: '방문 체크인'
  },

  /* 2. Active (수면 압력) */
  eorayeon: {
    title: '동강 어라연', subtitle: '햇빛 노출과 걷기를 통해 생체 리듬을 깨우는 코스입니다.',
    items: [['수면 도움', '풍부한 햇빛이 멜라토닌 합성을 돕고, 적절한 피로도가 야간 수면 압력을 극대화합니다.'], ['추천 대상', '활동적인 체험으로 깊은 잠을 원하는 여행자']], primary: '방문 체크인'
  },
  hanbando: {
    title: '한반도지형', subtitle: '탁 트인 시야와 함께 가벼운 트레킹을 즐기는 포인트입니다.',
    items: [['수면 도움', '오전~낮 시간의 신체 활동으로 몸에 건강한 젖산을 쌓아 기절하듯 잠들게 유도합니다.']], primary: '방문 체크인'
  },
  yoseonjeong: {
    title: '요선정', subtitle: '암반과 계곡을 오르내리며 자연의 활력을 얻는 코스입니다.',
    items: [['수면 도움', '자연 속 동적 활동을 통해 우울감을 덜고 일주기 리듬을 정상화합니다.']], primary: '방문 체크인'
  },

  /* 3. Forest (숲 치유) */
  manggyeong: {
    title: '망경대산 휴양림', subtitle: '본격적인 치유와 이완이 일어나는 숲 치유 인프라입니다.',
    items: [['수면 도움', '자연의 백색소음(바람, 새소리)이 과각성 상태의 뇌파를 안정화합니다.'], ['추천 시간', '오후 늦게부터 해질녘 사이']], primary: '방문 체크인'
  },
  moss: {
    title: '상동 이끼계곡', subtitle: '초록색 이끼와 계곡만 존재하는 극도의 저자극 환경입니다.',
    items: [['수면 도움', '시각 및 청각적 자극을 철저히 통제하여 환경 변화에 예민한 분들의 불안을 낮춥니다.']], primary: '방문 체크인'
  },
  naeri: {
    title: '내리계곡', subtitle: '인적이 드물고 물소리가 일정한 계곡 산책로입니다.',
    items: [['수면 도움', '일정한 주파수의 물소리가 뇌를 이완시키고 잡념을 없애줍니다.']], primary: '방문 체크인'
  },

  /* 4. Night (야간 전환) */
  byeolmaro: {
    title: '별마로천문대', subtitle: '낮에서 밤으로 넘어가는 감각 전환의 핵심 포인트입니다.',
    items: [['수면 도움', '디지털 화면에서 벗어나 실제 어둠과 별빛에 노출되며 수면 호르몬 분비를 촉진합니다.'], ['추천 대상', '밤의 분위기를 즐기며 천천히 잠들 준비를 하는 분']], primary: '방문 체크인'
  },
  seondol: {
    title: '선돌 (일몰)', subtitle: '영월 최고의 일몰을 보며 생체 리듬에 밤을 알리는 곳입니다.',
    items: [['수면 도움', '태양이 넘어가는 것을 시각적으로 체감하여 뇌에 입면 신호를 확실하게 전달합니다.']], primary: '방문 체크인'
  },
  yeongwolbridge: {
    title: '영월대교 야경', subtitle: '잔잔한 강물에 비친 조명을 보며 걷는 야간 수변 산책로입니다.',
    items: [['수면 도움', '수면 직전 체온을 서서히 떨어뜨리기 위한 아주 가벼운 야간 걷기에 최적화되어 있습니다.']], primary: '방문 체크인'
  }, /* <--- 쉼표 꼭 확인! */
  
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
document.querySelectorAll('.node-button').forEach(node => {
  node.addEventListener('click', () => {
    if (node.classList.contains('state-visited')) return; // 이미 누른 건 무시

    // 🌟 [추가 1] 별자리가 이미 완성되었다면 더 이상 다른 별은 누를 수 없음 (여정 종료)
    if (document.getElementById('star-layer').classList.contains('constellation-complete')) {
      return;
    }

    // 🌟 [수정 2] 누른 별이 '숙소(Stay)'인 경우 검사를 먼저 진행!
    if (node.id === 'dynamic-stay-node') {
      if (pathSequence.length < 2) {
        alert("숙소는 회복 여정의 마지막 목적지입니다.\n별자리를 완성하려면 최소 2곳 이상의 관광지를 먼저 방문해 주세요!");
        // 🌟 핵심: 여기서 return으로 튕겨내서 숙소가 '방문 완료'로 색칠되는 것을 원천 차단함
        return; 
      } else {
        // 조건 충족 시 숙소 방문 처리 및 별자리 완성 애니메이션 시작
        node.classList.remove('state-default', 'state-recommended');
        node.classList.add('state-visited');
        
        drawPathLine(pathSequence[pathSequence.length - 1], node);
        pathSequence.push(node);

        document.getElementById('star-layer').classList.add('constellation-complete');
        setTimeout(() => {
          const rewardModal = document.getElementById('reward-modal');
          if(rewardModal) rewardModal.classList.add('open');
          updateRecordTab(); 
        }, 800);
        return; // 완료했으므로 밑에 있는 일반 관광지 코드는 실행 안 함
      }
    }

    // --- 여기부터는 누른 곳이 '일반 관광지'일 때만 실행됨 ---
    node.classList.remove('state-default', 'state-recommended');
    node.classList.add('state-visited');

    // 1. 선 긋기
    if (pathSequence.length > 0) {
      drawPathLine(pathSequence[pathSequence.length - 1], node);
    }
    pathSequence.push(node);

    // 2. 화면 중앙 이동 로직
    const mapScrollArea = document.getElementById('map-scroll-area');
    if (mapScrollArea) {
      const nodeX = node.offsetLeft * currentScale;
      const nodeY = node.offsetTop * currentScale;
      mapScrollArea.scrollTo({ 
        left: nodeX - (mapScrollArea.clientWidth / 2), 
        top: nodeY - (mapScrollArea.clientHeight / 2), 
        behavior: 'smooth' 
      });
    }

    // 3. 해당 장소의 상세 정보 팝업 띄우기
    openSheet(sheetContent[node.dataset.node]);
  });
});

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
  if (modalTitle.textContent.includes('로그인 준비 중')) {
    showScreen('home');
  }
  closeSheet();
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
  
  if(surveyModalLabel) surveyModalLabel.textContent = def.label;
  if(surveyModalProgressText) surveyModalProgressText.textContent = `${currentStepIndex + 1} / ${total}`;
  if(surveyModalProgressBar) {
    surveyModalProgressBar.style.width = `${((currentStepIndex + 1) / total) * 100}%`;
    surveyModalProgressBar.style.background = def.color;
  }

  if(surveyModalQuestion) {
    surveyModalQuestion.innerHTML = `
      <h4>${q.text}</h4>
      ${q.options.map(opt => `
        <label class="survey-option-label ${saved === opt.value ? 'selected' : ''}">
          <input type="radio" name="survey-q" value="${opt.value}" ${saved === opt.value ? 'checked' : ''}>
          ${opt.label}
        </label>
      `).join('')}
    `;

    surveyModalQuestion.querySelectorAll('input[type=radio]').forEach(input => {
      input.addEventListener('change', () => {
        surveyModalQuestion.querySelectorAll('.survey-option-label').forEach(label => {
          label.classList.toggle('selected', label.querySelector('input').checked);
        });
      });
    });
  }

  if(surveyModalNext) surveyModalNext.textContent = currentStepIndex === total - 1 ? '완료' : '다음';
}

if(surveyModalNext) {
  surveyModalNext.addEventListener('click', () => {
    const def = surveyDefinitions[currentSurveyKey];
    const q = def.questions[currentStepIndex];
    const checked = surveyModalQuestion.querySelector('input[name="survey-q"]:checked');
    
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

  const travelMap = {
    calm: '저자극 자연 체류형 회복 관광자',
    active: '리듬 회복 활동형 회복 관광자',
    night: '야간 감각 전환형 회복 관광자'
  };
  const sleepMap = {
    lack: '지속적인 수면 부족 상태로, 이번 여행에서 수면 회복에 특히 집중이 필요합니다.',
    mid: '어느 정도 버티고 있지만, 수면의 질을 한 단계 끌어올릴 여지가 있습니다.',
    enough: '상대적으로 수면 상태는 양호하지만, 여행을 통해 더 좋은 패턴을 유지할 수 있습니다.'
  };
  const sensMap = {
    high: '빛·소리·침구·환경 변화에 매우 민감한 편이라, 숙소와 루트 설계 시 환경 조정이 필수입니다.',
    mid: '환경에 어느 정도 영향은 받지만, 적절한 가이드만으로도 충분히 조정 가능합니다.',
    low: '환경 변화에 비교적 둔감한 편이라, 다양한 숙소와 루트를 폭넓게 실험해볼 수 있습니다.'
  };

  if(resultModalTitle) resultModalTitle.textContent = travelMap[tWinner];
  if(resultModalDesc) {
    resultModalDesc.innerHTML = `
      <div>
        <strong style="font-size:12px; color:#9f8dff;">✦ 여행 성향</strong><br>
        <span style="font-size:13px; color:rgba(245,247,255,0.76); line-height:1.7;">${travelMap[tWinner]}로 분류되었습니다.</span>
      </div>
      <div>
        <strong style="font-size:12px; color:#85e4d1;">☾ 수면 습관</strong><br>
        <span style="font-size:13px; color:rgba(245,247,255,0.76); line-height:1.7;">${sleepMap[sWinner]}</span>
      </div>
      <div>
        <strong style="font-size:12px; color:#ffc96b;">◎ 환경 민감도</strong><br>
        <span style="font-size:13px; color:rgba(245,247,255,0.76); line-height:1.7;">${sensMap[eWinner]}</span>
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
  const courseHeroTitle = document.getElementById('course-hero-title');
  const courseStep1Title = document.getElementById('course-step1-title');
  const courseStep1Desc = document.getElementById('course-step1-desc');
  const courseStep1Tag = document.getElementById('course-step1-tag');
  const courseStep2Desc = document.querySelector('.step-2 + .timeline-content p'); 
  const courseStep3Desc = document.getElementById('course-step3-desc');

  if(courseEyebrow) courseEyebrow.textContent = `맞춤 동선 · ${travelMap[tWinner]}`;
  
  // --- 🌟 [강화] 모든 코스 요소를 진단 결과에 따라 실시간 생성 ---
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

  // 1. 여행 성향(tWinner)에 따른 1~2단계 가변화
  if (tWinner === 'calm') {
    courseElements.hero.textContent = '느린 호흡으로 자연에 머무는 회복 동선';
    courseElements.step1T.textContent = '청령포 숲길 산책 & 물멍';
    courseElements.step1D.textContent = '낮의 햇빛을 받으며 교감신경을 안정시키는 조용한 체류형 코스입니다.';
    courseElements.step1Tag.textContent = '저자극 힐링';
    courseElements.step2T.textContent = '수면 유도 티(Tea) 다이닝';
    courseElements.step2D.textContent = '소화 부담이 적은 영월 나물 정식과 심신 안정을 돕는 약초 차 세션을 진행합니다.';
  } else if (tWinner === 'active') {
    courseElements.hero.textContent = '활발한 활동으로 리듬을 찾는 에너지 동선';
    courseElements.step1T.textContent = '동강 트레킹 & 리버버깅';
    courseElements.step1D.textContent = '강한 신체 활동으로 아데노신을 축적해 야간 수면 압력을 극대화합니다.';
    courseElements.step1Tag.textContent = '수면 압력 증가';
    courseElements.step2T.textContent = '고단백 회복 다이닝';
    courseElements.step2D.textContent = '에너지 소모를 보충하고 멜라토닌 생성을 돕는 육류 위주의 식사와 야간 산책을 즐깁니다.';
  } else {
    courseElements.hero.textContent = '밤의 감각을 깨우는 심야 전환 동선';
    courseElements.step1T.textContent = '강변 노을 감상 & 사진 기록';
    courseElements.step1D.textContent = '저색온도의 노을빛을 통해 뇌에 밤의 시작을 알리고 각성도를 낮춥니다.';
    courseElements.step1Tag.textContent = '야간 감각 전환';
    courseElements.step2T.textContent = '별마로 천문대 별빛 투어';
    courseElements.step2D.textContent = '인공 조명을 차단하고 별빛에 몰입하며 자연스러운 수면 유도를 준비합니다.';
  }

  // 2. 환경 민감도(eWinner)에 따른 3단계 가변화
  if (eWinner === 'high') {
    courseElements.step3T.textContent = '딥 슬립 차단 솔루션';
    courseElements.step3D.textContent = '100% 암막, 특수 방음, 저자극 침구가 세팅된 고민감도 전용 객실로 배정됩니다.';
  } else if (eWinner === 'mid') {
    courseElements.step3T.textContent = '표준 수면 최적화 세팅';
    courseElements.step3D.textContent = '적정 온습도 자동 제어와 함께 입면을 돕는 은은한 간접 조명이 세팅됩니다.';
  } else {
    courseElements.step3T.textContent = '자연 친화형 수면 환경';
    courseElements.step3D.textContent = '영월의 시원한 밤바람을 활용한 자연 쿨링과 스마트링 트래킹이 시작됩니다.';
  }

  // 3. 수면 상태(sWinner)에 따른 4단계 가변화
  if (sWinner === 'lack') {
    courseElements.step4T.textContent = '집중 회복 지수 분석';
    courseElements.step4D.textContent = '만성 피로 해소 정도를 측정하고, 부족한 잠을 채우기 위한 추가 휴식 플랜을 제공합니다.';
  } else {
    courseElements.step4T.textContent = '수면 효율 별자리 기록';
    courseElements.step4D.textContent = '어젯밤의 양질의 수면 데이터를 확인하고, 나만의 회복 별자리를 영구 저장합니다.';
  }

  if (courseStep3Desc) {
    if (eWinner === 'high') {
      courseStep3Desc.textContent = '체크인 시 분석된 \'고민감도\' 프로파일에 맞춰 100% 암막, 백색소음기, 온습도가 최적화된 저자극 객실이 배정됩니다.';
    } else if (eWinner === 'mid') {
      courseStep3Desc.textContent = '체크인 시 간접 조명과 선호하는 침구 세트가 준비되며, 매트리스 수면 트래킹 센서가 작동을 시작합니다.';
    } else {
      courseStep3Desc.textContent = '체크인 후 편안한 휴식을 위한 기본 환경이 제공되며, 스마트링을 통한 자율 수면 트래킹이 시작됩니다.';
    }
  }

  // 🌟 [추가 로직] 진단 결과에 따라 특정 테마 별들 불 밝히기
  document.querySelectorAll('.node-button').forEach(node => {
    const nodeTheme = node.dataset.theme;
    
    if (nodeTheme === tWinner || nodeTheme === 'stay' || nodeTheme === 'forest') {
      node.classList.remove('state-default');
      node.classList.add('state-recommended');
    }
  });

  // 🌟 [수정 완료] 숙소 별 이름 및 데이터 가변 처리 (딱 한 번만 실행!)
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
  // 🌟 [추가] 진단 결과를 마이페이지 프로파일에 완벽 동기화
  const mypageTitle = document.getElementById('mypage-profile-title');
  const mypageDesc = document.getElementById('mypage-profile-desc');
  const mypageAvatar = document.getElementById('mypage-avatar');

  if (mypageTitle && mypageDesc && mypageAvatar) {
    mypageTitle.textContent = `[${travelMap[tWinner]}]`;
    
    if (tWinner === 'calm') {
      mypageDesc.textContent = '조용한 자연 속에서 교감신경을 안정시키는 것을 선호하며, 고도의 환경 제어가 필요한 타입입니다.';
      mypageAvatar.textContent = '🍃'; 
      mypageAvatar.style.borderColor = '#00FF85'; // 숲 치유 테마색
    } else if (tWinner === 'active') {
      mypageDesc.textContent = '낮 동안 에너지를 발산해 수면 압력을 극대화하여 깊은 수면을 유도하는 타입입니다.';
      mypageAvatar.textContent = '🔥'; 
      mypageAvatar.style.borderColor = '#FF2E63'; // 활동 테마색
    } else {
      mypageDesc.textContent = '해질녘부터 밤까지 이어지는 빛 조절과 감각 전환에 최적화된 올빼미형 타입입니다.';
      mypageAvatar.textContent = '🌙'; 
      mypageAvatar.style.borderColor = '#BF95FF'; // 야간 테마색
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
    if(surveyResultModal) surveyResultModal.classList.remove('open');
    switchTab('course');
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
    const rewardModal = document.getElementById('reward-modal');
    if(rewardModal) rewardModal.classList.remove('open');
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
// --- 🌟 임시 좌표 추출기 (개발용: 클릭 시 좌표 복사창 띄움) ---
const mapScrollContainer = document.getElementById('map-scroll-area');
const baseMapImage = document.getElementById('real-map-img');

if (mapScrollContainer && baseMapImage) {
  mapScrollContainer.addEventListener('click', function(e) {
    // 이미 있는 별 버튼이나 글씨를 눌렀을 때는 무시
    if(e.target.closest('.node-button')) return;
    
    // 지도의 실제 위치와 크기를 가져와서 정확한 클릭 지점 계산
    const rect = baseMapImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 지도 밖의 검은 여백을 눌렀을 때는 무시
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    
    // 퍼센트 계산
    const leftPercent = ((x / rect.width) * 100).toFixed(1);
    const topPercent = ((y / rect.height) * 100).toFixed(1);
    
    // 🌟 복사하기 쉽게 프롬프트 창으로 띄워줍니다!
    prompt(
      '📍 좌표가 추출되었습니다. 아래 텍스트를 복사(Ctrl+C)하세요!', 
      `left: ${leftPercent}%; top: ${topPercent}%;`
    );
  });
}