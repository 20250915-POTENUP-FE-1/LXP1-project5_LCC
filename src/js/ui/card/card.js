import {getStoredCourses} from "../../store/storage.js";
import {listInit} from "../card-list/cardList.js";
import {applyCategoryUI, applyLevelUI} from "../../utils/format.js";
import {getUrlParams} from "../../utils/urlParams.js";
import {pageNationInit} from "../page-nation/pageNation.js";
import {pageShowCards} from "../../../constants/contants.js";

/**
 * 단일 강좌 카드 정보
 * @typedef {Object} Course
 * @property {string} thumbnail - 썸네일 이미지 URL
 * @property {string} id - id
 * @property {string} lectureName - 강의명
 * @property {string} introduce - 간단 소개글
 * @property {string} category - 간단 소개글
 * @property {string} created - 간단 소개글
 * @property {string} level - 난이도(예: 초급/중급/고급)
 *
 * 카드 템플릿을 생성하여 데이터 바인딩 후 버튼 요소를 반환한다.
 *
 * @param {Course} course - 카드에 바인딩할 강좌 데이터
 * @returns {Promise<HTMLButtonElement>} 생성된 카드 버튼 요소
 *
 * @example
 * const course = {
 *   thumbnail: "https://example.com/thumb.jpg",
 *   lectureName: "자바스크립트 입문",
 *   introduce: "기초부터 차근차근",
 *   level: "초급"
 * };
 * const btn = await cardTemplate(course, 3); // 이렇게 불러 옴 비동기 이니까 앞에 await을 붙혀주세요.
 * document.getElementById("card-container").appendChild(btn);
 */
export async function cardTemplate(course) {
  const res = await fetch("/src/js/ui/card/cardTemplate.html"); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");

  const btn = doc.querySelector("button.card");

  btn.id = `card-${course.id}`;
  btn.title = String(course.created);
  btn.querySelector("img").src = course.thumbnail;
  btn.querySelector(".lecture-name").textContent = course.lectureName + `  id: ${course.id}`;
  btn.querySelector(".introduce").textContent = course.introduce;

  const levelEl = btn.querySelector('.level');
  applyLevelUI(levelEl, course.level);

  const catEl = btn.querySelector('.category');
  applyCategoryUI(catEl, course.category);
  btn.addEventListener("click", async () => await cardBtnOption(course.id));

  return btn;
}

export async function cardBtnOption(i) {
  const courses = getStoredCourses(); // [{lectureName:xxx, level:xxx}, {}]
  const course = courses.find(c => String(c.id) === String(i));
  console.log(course);
  document.querySelector("#update-form #lecture-name").value = course.lectureName;
  document.querySelector("#update-form #forPreviewUpdate").innerHTML = `<img id="previewImage" src="${course.thumbnail}" alt="썸네일 미리보기"
       style="border-radius: 20px; width:232px; 
       border: 1px #bbb3ef solid;
       max-width: 232px;height: 164px;max-height: 164px;">`;
  document.querySelector("#update-form #introduce").value = course.introduce;
  document.querySelector("#update-form #level").value = course.level;
  document.querySelector("#update-form #category").value = course.category.toLowerCase();

  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.onclick = function () {
    const yes = confirm("정말 삭제하시겠습니까?");
    if (!yes) return;
    console.log(i)

    const delIndex = courses.findIndex(c => String(c.id).toLowerCase().trim() === String(i).trim().toLowerCase());
    console.log(courses);
    console.log(delIndex);
    if (delIndex < 0) return;
    const category = getUrlParams('category');
    const norm = String(category).toLowerCase();
    const filtered = (norm === 'all' || norm === '' || norm == null) ? courses : courses.filter(c => String(c.category).toLowerCase() === norm);

    courses.splice(delIndex, 1); // i번째 요소 삭제
    localStorage.setItem("courses", JSON.stringify(courses)); // 로컬스토리지 업데이트
    listInit();
    if (filtered.length % pageShowCards === 0 || courses.length === 0) {
      pageNationInit();
    }

    // 모달 닫기
    document.getElementById("detailLecture").style.display = "none";
    document.getElementById("detailLecture").classList.remove("active");
  };

  const updateForm = document.getElementById("update-form");
  updateForm.onsubmit = async function (event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    const updatedCourse = {
      ...course, // 기존 데이터 유지
      lectureName: document.querySelector("#update-form #lecture-name").value,
      thumbnail: document.querySelector("#update-form #previewImage").src,
      introduce: document.querySelector("#update-form #introduce").value,
      level: document.querySelector("#update-form #level").value,
      category: document.querySelector("#update-form #category").value,
    };

    // 배열에서 해당 id의 인덱스를 찾아 교체
    const idx = courses.findIndex(c => String(c.id) === String(updatedCourse.id));
    if (idx === -1) return;
    courses[idx] = updatedCourse;
    localStorage.setItem("courses", JSON.stringify(courses)); // 로컬스토리지 업데이트
    const page = await getUrlParams('page');
    await listInit(Number(page));

    // 모달 닫아주기
    document.getElementById("detailLecture").style.display = "none";
    document.getElementById("detailLecture").classList.remove("active");
  };
}


