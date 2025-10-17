import {cardTemplate} from "../card/card.js";
import {setUrlParams} from "../../utils/urlParams.js";
import {getStoredCourses} from "../../store/storage.js";
import {pageNationInit} from "../page-nation/pageNation.js";
import {category} from "./category-data.js";
import {categoryBtnTemplate} from "./category-btn/categoryBtn.js";
import {pageShowCards} from "../../../constants/contants.js";

init();

function init() {
  // 카테고리 버튼 초기 렌더
  category.forEach(async (value) => {
    const chip = await categoryBtnTemplate(value);
    document.getElementById("category-list").appendChild(chip);
  });

  document.addEventListener('click', async (e) => {
    const li = e.target.closest('.category-chip');
    if (!li) return;

    // 1) 같은 컨테이너 범위에서 모두 비활성화
    const container = li.closest('#category-nav') || document;
    container.querySelectorAll('.category-chip.is-active').forEach(chip => {
      chip.classList.remove('is-active');
      chip.setAttribute('aria-pressed', 'false');
    });

    // 2) URL 갱신
    const key = li.dataset.key;
    setUrlParams('category', key);
    setUrlParams('page', '1');

    // 3) 클릭한 것만 활성화
    li.classList.add('is-active');
    li.setAttribute('aria-pressed', 'true');

    // 4) 데이터 필터 + 페이지 슬라이스
    const all = getStoredCourses();
    const filtered = (key === 'all') ? all : all.filter(c => String(c.category).toLowerCase() === key.toLowerCase());

    // 페이지는 유지(또는 필요시 1로 리셋)
    // setUrlParams('page', 1)
    const page = getCurrentPage();
    const start = (page - 1) * pageShowCards;
    const pageItems = filtered.slice(start, start + pageShowCards);

    // 5) '전체 비우기' 없이 차이만 반영
    await reconcileCards(pageItems);

    // 6) 페이지네이션 갱신(총 개수만 변경)
    await pageNationInit(filtered.length);
  });
}

function getCurrentPage() {
  const p = new URLSearchParams(location.search).get('page');
  return Math.max(1, Number(p) || 1);
}

// 코스 -> 카드 DOM 업데이트 (필요한 selector만 맞춰서 수정)
function updateCardContent(cardEl, course) {
  // 예시: 데이터 바인딩
  const $title = cardEl.querySelector('.title');
  const $desc = cardEl.querySelector('.desc');
  const $img = cardEl.querySelector('img');

  if ($title) $title.textContent = course.title ?? '';
  if ($desc) $desc.textContent = course.introduce ?? '';
  if ($img && course.thumbnail) $img.src = course.thumbnail;
}

// 필수: 카드 엘리먼트는 data-id에 고유 id를 가져야 함
async function createCardEl(course, index) {
  // 너의 기존 템플릿 함수 사용 (비동기면 await)
  const el = await cardTemplate(course, index);
  // 안전하게 보장 (없으면 아래 코드에서 에러)
  el.dataset.id = String(course.id);
  return el;
}

/**
 * 차이만 반영: 추가/삭제/이동/내용업데이트
 * nextList: 이번 페이지에 보여줄 courses 배열(정렬/필터 완료본)
 */
async function reconcileCards(nextList) {
  const container = document.getElementById('card-container');
  if (!container) return;

  const currentChildren = Array.from(container.children);
  const currentMap = new Map(currentChildren.map(el => [el.dataset.id, el]));

  // 1) 이번에 필요한 id 집합
  const neededIds = new Set(nextList.map(c => String(c.id)));

  // 2) 제거: 필요 없는 카드들만 제거
  for (const el of currentChildren) {
    const id = el.dataset.id;
    if (!neededIds.has(id)) {
      el.remove();
    }
  }

  // 3) 순서/추가/업데이트 동시 처리:
  //    fragment에 최종 순서대로 노드를 append → 기존 노드는 '이동',
  //    없던 노드는 '생성'해서 append.
  const frag = document.createDocumentFragment();

  for (let i = 0; i < nextList.length; i++) {
    const course = nextList[i];
    const id = String(course.id);
    let cardEl = currentMap.get(id);

    if (!cardEl) {
      // 새 카드 생성
      cardEl = await createCardEl(course, i);
    } else {
      // 내용만 업데이트
      updateCardContent(cardEl, course);
    }
    frag.appendChild(cardEl); // append하면 위치가 바뀌어야 할 경우 '이동'됨
  }

  // 4) 한 번에 붙여 깜빡임 최소화
  container.appendChild(frag);
}