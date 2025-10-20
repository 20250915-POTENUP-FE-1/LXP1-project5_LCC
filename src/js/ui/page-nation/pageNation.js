import {getStoredCourses} from "../../store/storage.js";
import {pageBtnTemplate} from "./page-btn/pageBtn.js";
import {pageShowCards} from "../../../constants/contants.js";
import {listInit} from "../card-list/cardList.js";
import {getUrlParams, setUrlParams} from "../../utils/urlParams.js";

let pageClickBound = false;

await pageNationInit();

export async function pageNationInit() {
  const category = await getUrlParams('category') || 'all';
  const norm = String(category).toLowerCase();
  const filtered = (norm === 'all' || norm === '' || norm == null) ? getStoredCourses() : getStoredCourses().filter(c => String(c.category).toLowerCase() === norm);
  const pageNationBtnCount = Math.ceil(filtered.length / pageShowCards);
  await renderPageButtons(pageNationBtnCount);

  if (!pageClickBound) {
    document.addEventListener("click", onPageClick);
    pageClickBound = true;
  }
}

async function onPageClick(e) {
  const btn = e.target.closest(".page-btn");
  if (!btn) return;

  const page = Number(btn.dataset.page ?? btn.textContent.trim());
  await setUrlParams('page', String(page));  // URL도 맞춰주고
  updateActivePageButton(page);
  await listInit(page);
}

function updateActivePageButton(page) {
  document.querySelectorAll(".page-btn").forEach((b) => {
    const p = Number(b.dataset.page ?? b.textContent.trim());
    b.classList.toggle("is-active", p === page);
  });
}

async function renderPageButtons(count) {
  const pageNation = document.getElementById("page-nation");
  const existingBtns = pageNation.querySelectorAll(".page-btn");
  const currentCount = existingBtns.length;

  // 현재 URL의 page 값 가져오기 (없으면 기본 1)
  const currentPage = Number(await getUrlParams('page')) || 1;

  // 버튼 개수가 동일하면 아무 것도 하지 않음
  if (currentCount === count) {
    // 그래도 active 동기화만 해주기
    updateActivePageButton(currentPage);
    return;
  }

  // 버튼이 줄어든 경우 (삭제)
  if (currentCount > count) {
    for (let i = currentCount - 1; i >= count; i--) {
      existingBtns[i].remove();
    }
  }

  // 버튼이 늘어난 경우 (추가)
  if (currentCount < count) {
    const promises = [];
    for (let i = currentCount; i < count; i++) {
      promises.push(pageBtnTemplate(i + 1));
    }
    const newBtns = await Promise.all(promises);

    newBtns.forEach((btn, i) => {
      // 현재 페이지에 해당하는 버튼에 is-active 적용
      const btnPage = currentCount + i + 1;
      if (btnPage === currentPage) {
        btn.classList.add("is-active");
      }
      pageNation.appendChild(btn);
    });
  }

  // 첫 렌더링 시 1페이지 강조
  updateActivePageButton(currentPage);
}