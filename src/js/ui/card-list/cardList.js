import {getStoredCourses} from "../../store/storage.js";
import {cardTemplate} from "../card/card.js";
import {getUrlParams} from "../../utils/urlParams.js";
import {pageShowCards} from "../../../constants/contants.js";

/**
 * 현재 진행 중인 렌더 작업을 직렬화하기 위한 Promise.
 * 모듈 전역: "빈 완료 상태"로 시작
 * @type {Promise<void>}
 */
let inFlight = Promise.resolve();

document.addEventListener('DOMContentLoaded', () => {
  listInit().catch(console.error);
});

/**
 * 강의 카드 리스트를 현재 필터/정렬/페이지에 맞게 "차분 렌더링(diff)" 한다.
 * 기존 노드는 가능한 재사용하고, 부족한 만큼만 추가하며, 초과한 노드는 제거한다.
 * 최초 1회 실행(원하면 DOMContentLoaded 후에)
 * @async
 * @param {number} [page=1] - 페이지 번호(1-base)
 * @returns {Promise<void>} 렌더 완료 후 resolve
 *
 * @example
 * // 최초 로드
 * await listInit(1);
 * // 페이지 이동
 * await listInit(2);
 */
export async function listInit(page = 1) {
  // 이전 작업 끝날 때까지 대기 (직렬화)
  await inFlight;

  // 이번 작업 정의
  const job = (async () => {
    const container = document.getElementById("card-container");
    if (!container) return; // 안전 가드

    const courses = getStoredCourses();
    const category = await getUrlParams('category') || 'all';
    const sort = await getUrlParams('sort') || 'new';
    const norm = String(category).toLowerCase();
    const lowerSort = String(sort).toLowerCase();

    const filtered = (norm === 'all' || norm === '' || norm == null) ? courses : courses.filter(c => String(c.category).toLowerCase() === norm);

    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return lowerSort === 'old' ? dateA - dateB : dateB - dateA;
    });

    const pageNum = Number(page) || 1;
    const start = (pageNum - 1) * pageShowCards;
    const end = start + pageShowCards;
    const pageCourses = sorted.slice(start, end);

    // 현재 렌더된 카드 스냅샷 (루트가 .card 여야 함)
    // const existingCards = Array.from(container.children).filter(n => n.classList?.contains('card'));
    const existingCards = Array.from(container.querySelectorAll(':scope > .card'));

    const maxLen = Math.max(existingCards.length, pageCourses.length);
    for (let i = 0; i < maxLen; i++) {
      const data = pageCourses[i];
      const node = existingCards[i];

      if (data && node) {
        ensureCardId(node, i);
        updateCard(node, data, i);
      } else if (data && !node) {
        const newCard = await cardTemplate(data, i);
        ensureCardId(newCard, i);
        container.appendChild(newCard);
      } else if (!data && node) {
        node.remove();
      }
    }
  })();

  // 다음 호출이 이 작업을 기다리게 연결
  inFlight = job.catch(() => {
  });
  await job;
}

/**
 * 카드의 id를 `card-{index}` 형태로 강제한다.
 *
 * @param {any} cardNode - 루트가 `.card`인 카드 엘리먼트
 * @param {number} index - 현재 페이지 내 카드 인덱스(0-base)
 * @returns {void}
 */
function ensureCardId(cardNode, index) {
  const wantId = `card-${index}`;
  if (cardNode.id !== wantId) cardNode.id = wantId;
}

/**
 * 카드 노드의 내용을 주어진 데이터로 덮어쓴다. (기존 노드를 재사용)
 *
 * 기대하는 DOM 구조:
 * ```html
 * <button class="card ...">
 *   <div class="card-thumbnail"><img /></div>
 *   <div class="card-text">
 *     <div class="card-row"><p class="lecture-name"></p></div>
 *     <div class="card-row"><p class="introduce"></p></div>
 *     <div class="card-row-level-category">
 *       <p class="level"></p>
 *       <p class="category"></p>
 *     </div>
 *     <!-- 선택: <p class="card-date"></p> -->
 *   </div>
 * </button>
 * ```
 *
 * @param {any} cardNode - 업데이트 대상 카드 엘리먼트(루트가 `.card`)
 * @param {Course} data - 카드에 표시할 데이터
 * @param {number} index - 현재 페이지 내 카드 인덱스(0-base)
 * @returns {void}
 */
function updateCard(cardNode, data, index) {
  cardNode.dataset.id = data.id ?? '';
  cardNode.dataset.index = String(index);

  const imgEl = cardNode.querySelector('.card-thumbnail img');
  if (imgEl) {
    imgEl.src = data.thumbnail || 'default.png';
    imgEl.alt = data.lectureName || 'thumbnail';
  }

  const nameEl = cardNode.querySelector('.lecture-name');
  if (nameEl) nameEl.textContent = data.lectureName ?? '';

  const introEl = cardNode.querySelector('.introduce');
  if (introEl) introEl.textContent = data.introduce ?? '';

  const levelEl = cardNode.querySelector('.level');
  if (levelEl) levelEl.textContent = data.level ?? '';

  const categoryEl = cardNode.querySelector('.category');
  if (categoryEl) categoryEl.textContent = data.category ?? '';

  const dateEl = cardNode.querySelector('.card-date');
  if (dateEl) dateEl.textContent = data.created ? new Date(data.created).toLocaleDateString() : '';
}
