import {getStoredCourses} from "../../store/storage.js";
import {pageBtnTemplate} from "./page-btn/pageBtn.js";
import {pageShowCards} from "../../../constants/contants.js";

await init()

async function init() {
  const courses = getStoredCourses(); // 강좌 갯수
  const pageNationBtnCount = Math.ceil(courses.length / pageShowCards);
  await renderPageButtons(pageNationBtnCount);

  // 이벤트 리스너 등록
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".page-btn");
    if (!btn) return;
  })
}

async function renderPageButtons(count){
  const pageNation = document.getElementById("page-nation");
  pageNation.innerHTML = "";

  const promises = [];

  for (let i = 0; i < count; i++) {
    promises.push(pageBtnTemplate(i + 1));
  }

  const buttons = await Promise.all(promises); // 모든 버튼 완료까지 기다림

  buttons.forEach(btn => pageNation.appendChild(btn));
}