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
  pageNation.innerHTML = "";

  const promises = [];

  for (let i = 0; i < count; i++) {
    promises.push(pageBtnTemplate(i + 1));
  }

  const buttons = await Promise.all(promises); // 모든 버튼 완료까지 기다림

  buttons.forEach(btn => pageNation.appendChild(btn));
}