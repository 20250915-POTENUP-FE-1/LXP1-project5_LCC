/**
 * 레벨 UI를 통일해서 적용한다.
 * @param {HTMLElement} levelEl - .level 요소
 * @param {string} levelValue  - 'UPPER' | 'MIDDLE' | 'LOWER' 등 (대소문자 무관)
 */
export function applyLevelUI(levelEl, levelValue) {
  if (!levelEl) return;

  const raw = (levelValue ?? '').toString().trim().toUpperCase();

  const map = {
    UPPER: {label: '고급', color: '#D5FCDC', border: '#eeeeee'},
    MIDDLE: {label: '중급', color: '#F4FEAC', border: '#eeeeee'},
    LOWER: {label: '초급', color: '#CDDAFA', border: '#eeeeee'},
  };

  // 매칭 (없으면 LOWER로 폴백)
  const {label, color, border} = map[raw] ?? map.LOWER;

  // 스타일/텍스트 적용
  levelEl.style.backgroundColor = color;
  levelEl.style.border = `1px solid ${border}`;
  levelEl.textContent = label;
}

/** 카테고리 키 정규화 */
function normalizeCategory(cat) {
  const c = String(cat || '').trim().toUpperCase();
  // 흔한 변형도 AI로 정규화
  if (c === 'AI' || c === 'A.I' || c === 'A I') return 'AI';
  if (c === 'DEV' || c === 'DEVELOP' || c === 'DEVELOPER' || c === 'DEVELOPMENT') return 'DEVELOP';
  if (c === 'DESIGN' || c === 'DESIGNER') return 'DESIGN';
  return c; // 그 외는 그대로
}

/**
 * 카테고리 UI 적용 (텍스트 + 배경/테두리/글자색)
 * @param {HTMLElement} el  - `.category` 요소
 * @param {string} cat      - 원본 카테고리 값
 */
export function applyCategoryUI(el, cat) {
  if (!el) return;
  const key = normalizeCategory(cat);

  const map = {
    DEVELOP: {label: '개발', color: '#E6F0FF', border: '#eeeeee'},
    DESIGN: {label: '디자인', color: '#FFEFE3', border: '#eeeeee'},
    AI: {label: 'AI', color: '#EEE6FF', border: '#eeeeee'},
    DEFAULT: {label: (raw) => raw || '', color: '#F3F4F6', border: '#eeeeee'},
  };

  // 매칭 (없으면 LOWER로 폴백)
  const {label, color, border} = map[key] ?? map.DESIGN;

  el.style.backgroundColor = color;
  el.style.border = `1px solid ${border}`;
  el.textContent = label;
}