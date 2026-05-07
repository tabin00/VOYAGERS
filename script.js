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
    title: provider + ' 로그인 준비 중',
    subtitle: '현재는 프로토타입 단계라 실제 인증 대신 안내 모달로 연결돼요. 지금은 비로그인 체험으로 전체 흐름을 살펴볼 수 있습니다.',
    items: [
      ['현재 상태', '소셜 로그인 화면만 먼저 구현되어 있고 실제 OAuth 연동은 다음 단계에서 붙일 수 있어요.'],
      ['추천 액션', '우선 비로그인으로 입장해서 홈, 코스, 기록, 마이 탭의 흐름을 확인해보세요.'],
      ['다음 개발 단계', '카카오 · 네이버 · Apple 로그인 SDK를 붙이고 계정 상태를 저장하도록 확장할 수 있습니다.']
    ],
    primary: '비로그인으로 계속 보기'
  }),
  record: {
    title: '회복 기록 기능 안내',
    subtitle: '방문 장소, 숙면 반응, 나만의 별자리 완성도를 한 화면에서 모아보는 기능입니다.',
    items: [
      ['기록 단위', '장소 방문, 체류 시간, 감정 변화, 수면 만족도를 별 단위로 기록합니다.'],
      ['가치', '단순 체크인이 아니라 나에게 잘 맞는 회복 패턴을 찾는 데 목적이 있습니다.'],
      ['확장 가능성', '나중에는 여행 후 리포트와 추천 코스 업데이트까지 연결할 수 있어요.']
    ],
    primary: '확인했어요'
  },
  profile: {
    title: '프로필 섹션 안내',
    subtitle: '로그인 전에는 체험용 화면만 보여주고, 로그인 후에는 개인 취향과 기록 저장이 가능하도록 설계할 수 있습니다.',
    items: [
      ['현재 모드', '비로그인 체험 모드'],
      ['저장 예정 정보', '선호 코스, 환경 민감도, 별자리 기록, 최근 숙면 반응'],
      ['다음 단계', '마이페이지에서 설정 편집과 알림 루틴까지 확장 가능합니다.']
    ],
    primary: '닫기'
  },
  cheongnyeongpo: {
    title: '청령포',
    subtitle: '고요한 강변과 천천히 걷는 동선이 어우러진 낮 시간 회복 포인트입니다.',
    items: [
      ['추천 시간', '오후 2시 ~ 4시'],
      ['수면 도움 포인트', '저강도 보행, 시야 확장, 정서적 안정'],
      ['권장 체류', '30분 내외로 가볍게 머물기']
    ],
    primary: '이 장소 저장'
  },
  donggang: {
    title: '동강 전망 포인트',
    subtitle: '강과 산이 동시에 열리는 시야 덕분에 답답함을 줄이고 호흡을 정리하기 좋은 포인트입니다.',
    items: [
      ['추천 시간', '오후 늦은 시간'],
      ['수면 도움 포인트', '시각적 개방감, 낮은 소음 자극'],
      ['다음 동선', '숲 산책 루트와 연결 추천']
    ],
    primary: '이 장소 저장'
  },
  forest: {
    title: '숲 산책 루트',
    subtitle: '햇빛과 저자극 보행을 통해 생체리듬을 정돈하는 대표적인 낮 코스입니다.',
    items: [
      ['추천 시간', '오전 ~ 오후 초반'],
      ['수면 도움 포인트', '저강도 움직임, 자연 체류, 각성 완화'],
      ['권장 대상', '환경 민감형, 걷기 선호형']
    ],
    primary: '이 장소 저장'
  },
  byeolmaro: {
    title: '별마로천문대',
    subtitle: '낮에서 밤으로 넘어가는 감각 전환을 돕는 SLEEPERS의 상징적인 별자리 포인트입니다.',
    items: [
      ['추천 시간', '해질 무렵 ~ 초저녁'],
      ['수면 도움 포인트', '밤 감각 전환, 정서적 몰입, 별자리 경험'],
      ['연결 효과', '숙소 체크인 전 리추얼 시작 지점']
    ],
    primary: '이 장소 저장'
  },
  stay: {
    title: '숙소 체크인',
    subtitle: '하루의 회복 동선을 마무리하고 실제 수면 리추얼을 시작하는 전환 지점입니다.',
    items: [
      ['권장 루틴', '조명 낮추기, 디지털 자극 줄이기, 온도 정리'],
      ['기록 항목', '입실 시간, 숙면 환경 만족도, 취침 전 기분'],
      ['다음 단계', '아침 회복 체크와 연결']
    ],
    primary: '루틴 보기'
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

document.querySelectorAll('.node-button').forEach(node => {
  node.addEventListener('click', () => {
    // 마지막 노드인 'stay'(숙소)를 클릭하면 리워드 모달 띄우기
    if (node.dataset.node === 'stay') {
      const rewardModal = document.getElementById('reward-modal');
      if (rewardModal) rewardModal.classList.add('open');
    } else {
      openSheet(sheetContent[node.dataset.node]);
    }
  });
});

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
  
  if (courseHeroTitle && courseStep1Title) {
    if (tWinner === 'calm') {
      courseHeroTitle.textContent = '느린 호흡으로 자연에 머무는 회복 동선';
      courseStep1Title.textContent = '느린 숲길 산책 & 동강 조망';
      courseStep1Desc.textContent = '햇빛 노출과 저강도 이동으로 생체리듬을 안정시키고 감각 자극을 정돈하는 조용한 체류형 코스입니다.';
      if(courseStep1Tag) courseStep1Tag.textContent = '저자극 힐링';
      if(courseStep2Desc) courseStep2Desc.textContent = '소화 부담을 줄인 영월 산채 위주의 가벼운 다이닝 후, 고요한 강변에서 물소리를 들으며 교감신경을 안정시킵니다.';
    } else if (tWinner === 'active') {
      courseHeroTitle.textContent = '건강한 자극으로 리듬을 되찾는 활동 동선';
      courseStep1Title.textContent = '영월 트레킹 & 가벼운 체험';
      courseStep1Desc.textContent = '낮 시간대의 적절한 신체 활동과 걷기를 통해 수면 압력을 높여, 밤에 깊은 잠에 빠져들 수 있도록 유도합니다.';
      if(courseStep1Tag) courseStep1Tag.textContent = '수면 압력 증가';
      if(courseStep2Desc) courseStep2Desc.textContent = '트립토판이 풍부한 지역 단백질 다이닝 후, 가벼운 야간 산책으로 젖산을 분해하고 몸의 열을 서서히 낮춥니다.';
    } else {
      courseHeroTitle.textContent = '밤의 감각을 천천히 깨우는 전환 동선';
      courseStep1Title.textContent = '해질 무렵 강변 산책 & 야경 조망';
      courseStep1Desc.textContent = '낮의 강한 햇빛보다는 늦은 오후부터 서서히 밤으로 전환되는 영월의 분위기를 느끼며 마음의 속도를 낮춥니다.';
      if(courseStep1Tag) courseStep1Tag.textContent = '야간 감각 전환';
      if(courseStep2Desc) courseStep2Desc.textContent = '수면 호르몬 분비를 돕는 따뜻한 티 코스와 함께, 별마로천문대에서 시각적 자극을 줄이고 밤의 감각에 몰입합니다.';
    }
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

  const recommendGrid = document.querySelector('.recommend-grid');
  if (recommendGrid) {
    if (tWinner === 'calm') {
      recommendGrid.innerHTML = `
        <article class="recommend-card forest">
          <div class="content"><span class="tag best">98% 매칭</span><h4>느린 숲길 산책 코스</h4><p>과한 각성을 낮추고 생체리듬을 정돈하는 저자극 체류형 코스입니다.</p></div>
          <div class="footer"><div class="meta"><span>저자극 힐링</span><span>30분</span></div><div class="round-play">→</div></div>
        </article>
        <article class="recommend-card river">
          <div class="content"><span class="tag new">추천</span><h4>강변 감각 리셋 포인트</h4><p>시야가 트인 강변에서 머무르며 호흡을 정리하는 정적 체류형 장소입니다.</p></div>
          <div class="footer"><div class="meta"><span>정서 회복</span><span>20분</span></div><div class="round-play">→</div></div>
        </article>
        <article class="recommend-card stars">
          <div class="content"><span class="tag night">Night</span><h4>별 보기 전환 루트</h4><p>밤의 감각 전환을 돕는 조용한 야간 동선입니다.</p></div>
          <div class="footer"><div class="meta"><span>야간 추천</span><span>40분</span></div><div class="round-play">→</div></div>
        </article>
      `;
    } else if (tWinner === 'active') {
      recommendGrid.innerHTML = `
        <article class="recommend-card river">
          <div class="content"><span class="tag best" style="background:#ff5ea8;">99% 매칭</span><h4>영월 동강 트레킹</h4><p>신체 활동을 통해 수면 압력을 극대화하여 깊은 잠을 유도합니다.</p></div>
          <div class="footer"><div class="meta"><span>수면 압력↑</span><span>60분</span></div><div class="round-play">→</div></div>
        </article>
        <article class="recommend-card forest">
          <div class="content"><span class="tag new" style="background:#2fd7c4;">추천</span><h4>오후의 숲 걷기</h4><p>햇빛을 쬐며 걷는 활동으로 멜라토닌 분비를 돕는 장소입니다.</p></div>
          <div class="footer"><div class="meta"><span>리듬 회복</span><span>40분</span></div><div class="round-play">→</div></div>
        </article>
        <article class="recommend-card stars">
          <div class="content"><span class="tag night">Night</span><h4>야간 감각 전환 루트</h4><p>활동적인 하루를 마무리하고 교감신경을 안정시키는 동선입니다.</p></div>
          <div class="footer"><div class="meta"><span>야간 추천</span><span>30분</span></div><div class="round-play">→</div></div>
        </article>
      `;
    } else {
      recommendGrid.innerHTML = `
        <article class="recommend-card stars">
          <div class="content"><span class="tag best" style="background:#9f8dff;">97% 매칭</span><h4>별마로 심야 루트</h4><p>해질 무렵부터 시작하여 밤의 감성을 느끼고 마음의 속도를 늦춥니다.</p></div>
          <div class="footer"><div class="meta"><span>야간 특화</span><span>50분</span></div><div class="round-play">→</div></div>
        </article>
        <article class="recommend-card river">
          <div class="content"><span class="tag new">추천</span><h4>강변 야경 산책</h4><p>고요한 강변의 밤공기를 마시며 하루의 긴장을 풀어냅니다.</p></div>
          <div class="footer"><div class="meta"><span>긴장 완화</span><span>30분</span></div><div class="round-play">→</div></div>
        </article>
        <article class="recommend-card forest">
          <div class="content"><span class="tag night">Day</span><h4>오전 숲길 리프레시</h4><p>가볍게 햇빛을 쬐며 생체리듬을 깨우는 코스입니다.</p></div>
          <div class="footer"><div class="meta"><span>아침 추천</span><span>20분</span></div><div class="round-play">→</div></div>
        </article>
      `;
    }
  }

  const efficiencyScore = document.querySelector('.data-dashboard strong');
  const efficiencySub = document.querySelector('.data-dashboard span:last-child');
  
  if (efficiencyScore && efficiencySub) {
    if (sWinner === 'lack') {
      efficiencyScore.textContent = '76%';
      efficiencyScore.style.color = 'var(--gold)';
      efficiencySub.textContent = '↑ 평소 대비 22% 대폭 상승 (수면 빚 회복 중)';
    } else if (sWinner === 'mid') {
      efficiencyScore.textContent = '85%';
      efficiencyScore.style.color = 'var(--mint)';
      efficiencySub.textContent = '↑ 평소 대비 12% 상승 (안정화 단계 진입)';
    } else {
      efficiencyScore.textContent = '94%';
      efficiencyScore.style.color = '#9f8dff';
      efficiencySub.textContent = '↑ 평소 대비 5% 상승 (최적의 수면 달성)';
    }
  }

  const myPagePrefDesc = document.querySelector('[data-page="mypage"] .info-grid .card:nth-child(2) p');
  if (myPagePrefDesc) {
    let tText = tWinner === 'calm' ? '저자극 자연 체류' : (tWinner === 'active' ? '신체 활동 및 트레킹' : '야간 감각 전환 및 야경');
    let sText = sWinner === 'lack' ? '집중 회복 필요' : (sWinner === 'mid' ? '질적 개선 필요' : '현재 상태 유지');
    let eText = eWinner === 'high' ? '고민감 (3단계 철저 제어)' : (eWinner === 'mid' ? '보통 (2단계 표준 제어)' : '저민감 (1단계 기본 제어)');
    
    myPagePrefDesc.innerHTML = `<span style="color:#9f8dff; font-weight:700;">여행 동선:</span> ${tText} 위주<br><span style="color:#85e4d1; font-weight:700;">수면 목표:</span> ${sText}<br><span style="color:#ffc96b; font-weight:700;">환경 세팅:</span> ${eText}<br><br>위 분석 결과에 따라 앱의 모든 추천과 객실 환경이 자동 제어되고 있습니다.`;
  }

  if(surveyResultModal) surveyResultModal.classList.add('open');
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

const rewardConfirmBtn = document.getElementById('reward-confirm-btn');
if(rewardConfirmBtn) {
  rewardConfirmBtn.addEventListener('click', () => {
    const rewardModal = document.getElementById('reward-modal');
    if(rewardModal) rewardModal.classList.remove('open');
    
    const emptyState = document.getElementById('record-empty-state');
    const dataState = document.getElementById('record-data-state');
    if (emptyState) emptyState.style.display = 'none';
    if (dataState) dataState.style.display = 'block';

    const tScore = { calm:0, active:0, night:0 };
    Object.values(surveyAnswers.travel).forEach(v => { if (tScore[v] !== undefined) tScore[v]++; });
    const tWinner = Object.entries(tScore).sort((a,b) => b[1]-a[1])[0][0] || 'calm';

    const eScore = { high:0, mid:0, low:0 };
    Object.values(surveyAnswers.sensitivity).forEach(v => { if (eScore[v] !== undefined) eScore[v]++; });
    const eWinner = Object.entries(eScore).sort((a,b) => b[1]-a[1])[0][0] || 'mid';

    const nameEl = document.getElementById('record-constellation-name');
    const dayActEl = document.getElementById('record-day-activity');
    const nightEnvEl = document.getElementById('record-night-env');

    if (nameEl && dayActEl && nightEnvEl) {
      if (tWinner === 'calm') {
        nameEl.textContent = '영월의 고요한 숲길자리';
        dayActEl.textContent = '저자극 숲길 산책';
      } else if (tWinner === 'active') {
        nameEl.textContent = '영월의 활기찬 동강자리';
        dayActEl.textContent = '트레킹과 신체 활동';
      } else {
        nameEl.textContent = '영월의 은은한 별빛자리';
        dayActEl.textContent = '야간 감각 전환 루틴';
      }

      if (eWinner === 'high') {
        nightEnvEl.textContent = '3단계 (고강도 차단) 환경 제어';
      } else {
        nightEnvEl.textContent = '기본 수면 환경 세팅';
      }
    }

    switchTab('record'); 
  });
}

const startJourneyBtn = document.getElementById('start-journey-btn');
if(startJourneyBtn) {
  startJourneyBtn.addEventListener('click', () => {
    switchTab('home');
  });
}

// 🌟 지도 확대/축소(Zoom) 기능
const mapImg = document.getElementById('real-map-img');
const starLayer = document.getElementById('star-layer');
let currentScale = 1; // 기본 크기 1배

const zoomInBtn = document.getElementById('map-zoom-in');
const zoomOutBtn = document.getElementById('map-zoom-out');

if (zoomInBtn && mapImg) {
  zoomInBtn.addEventListener('click', () => {
    currentScale += 0.3; // 한 번 누를 때마다 30%씩 확대
    if (currentScale > 2.5) currentScale = 2.5; // 최대 2.5배까지만 확대
    
    // 지도와 별자리 레이어를 동시에 확대
    mapImg.style.transform = `scale(${currentScale})`;
    if(starLayer) starLayer.style.transform = `scale(${currentScale})`;
  });
}

if (zoomOutBtn && mapImg) {
  zoomOutBtn.addEventListener('click', () => {
    currentScale -= 0.3; // 한 번 누를 때마다 30%씩 축소
    if (currentScale < 0.5) currentScale = 0.5; // 최소 0.5배까지만 축소
    
    // 지도와 별자리 레이어를 동시에 축소
    mapImg.style.transform = `scale(${currentScale})`;
    if(starLayer) starLayer.style.transform = `scale(${currentScale})`;
  });
}