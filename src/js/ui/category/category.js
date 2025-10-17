import {getUrlParams, setUrlParams} from "../../utils/urlParams.js";
import {pageNationInit} from "../page-nation/pageNation.js";
import {category} from "./category-data.js";
import {categoryBtnTemplate} from "./category-btn/categoryBtn.js";
import {listInit} from "../card-list/cardList.js";

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

    const key = String(li.dataset.key || '').toLowerCase();
    const current = String(await getUrlParams('category') || 'all').toLowerCase();

    if (key === current && li.classList.contains('is-active')) {
      // 선택사항: 살짝 튕김 방지용으로 포커스만 유지/해제
      // e.preventDefault();
      return;
    }

    // 1) 같은 컨테이너 범위에서 모두 비활성화
    const container = li.closest('#category-nav') || document;
    container.querySelectorAll('.category-chip.is-active').forEach(chip => {
      chip.classList.remove('is-active');
      chip.setAttribute('aria-pressed', 'false');
    });

    // 2) URL 갱신
    setUrlParams('category', key);
    setUrlParams('page', '1');

    // 3) 클릭한 것만 활성화
    li.classList.add('is-active');
    li.setAttribute('aria-pressed', 'true');

    // 4) 데이터 필터 + 페이지 슬라이스
    const page = getCurrentPage();

    // 5) '전체 비우기' 없이 차이만 반영
    // await reconcileCards(pageItems);
    await listInit(page);

    // 6) 페이지네이션 갱신(총 개수만 변경)
    await pageNationInit();
  });
}

function getCurrentPage() {
  const p = new URLSearchParams(location.search).get('page');
  return Math.max(1, Number(p) || 1);
}
