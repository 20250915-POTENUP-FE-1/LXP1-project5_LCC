import {getStoredCourses} from "../../store/storage.js";
import {pageBtnTemplate} from "./page-btn/pageBtn.js";
import {pageShowCards} from "../../../constants/contants.js";
import {listInit} from "../card-list/cardList.js";

let pageClickBound = false;
let currentPage = 1;

await pageNationInit();

export async function pageNationInit(page = getStoredCourses().length) {
  const pageNationBtnCount = Math.ceil(page / pageShowCards);
  await renderPageButtons(pageNationBtnCount);

  if (!pageClickBound) {
    document.addEventListener("click", onPageClick);
    pageClickBound = true;
  }
}

async function onPageClick(e) {
  const btn = e.target.closest(".page-btn");
  if (!btn) return;

  // data-page를 쓰는 게 안전 (공백 방지)
  currentPage = Number(btn.dataset.page ?? btn.textContent.trim());
  updateActivePageButton(currentPage);
  await listInit(currentPage);
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