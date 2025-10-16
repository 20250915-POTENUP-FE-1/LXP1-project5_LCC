import {getStoredCourses} from "../../store/storage.js";
import {listInit} from "../card-list/cardList.js";

/**
 * 단일 강좌 카드 정보
 * @typedef {Object} Course
 * @property {string} thumbnail - 썸네일 이미지 URL
 * @property {string} lectureName - 강의명
 * @property {string} introduce - 간단 소개글
 * @property {string} level - 난이도(예: 초급/중급/고급)
 *
 * 카드 템플릿을 생성하여 데이터 바인딩 후 버튼 요소를 반환한다.
 *
 * @param {Course} course - 카드에 바인딩할 강좌 데이터
 * @param {number} i - 카드 인덱스(요소 id 및 data-속성 식별자 생성에 사용)
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
export async function cardTemplate(course, i) {
  const res = await fetch("/src/js/ui/card/cardTemplate.html"); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");

  const btn = doc.querySelector("button.card");

  btn.id = `card-${i}`;
  btn.querySelector("img").src = course.thumbnail;
  btn.querySelector(".lecture-name").textContent = course.lectureName;
  btn.querySelector(".introduce").textContent = course.introduce;
  btn.querySelector(".level").textContent = course.level;

  // btn == lecture == card
  btn.addEventListener("click", () => {
    //console.log(getStoredCourses());
    const courses = getStoredCourses(); // [{lectureName:xxx, level:xxx}, {}]
    const course = courses[i]; // 현재 클릭한 카드의 course 객체 === {lectureName:xxx, ,category, introduce,level:xxx, id, thumbnail:이미지경로}
    // 현재 #update-form의 후손중에 #lecture-name인 요소에  course.lectureName 값 넣기
    // detailLectureModal 에서 저장버튼 누르면 로컬스토리지에서 해당 강좌 수정
    document.querySelector("#update-form #lecture-name").value = course.lectureName;
    document.querySelector("#update-form #forPreviewUpdate").innerHTML = `<img id="previewImage" src="${course.thumbnail}" alt="썸네일 미리보기" style="width: 250px; height: 250px;border-radius: 20px;">`;

    document.querySelector("#update-form #introduce").value = course.introduce;
    document.querySelector("#update-form #level").value = course.level;
    document.querySelector("#update-form #category").value = course.category;

    //detainLectureModal 에서 삭제버튼 누르면 로컬스토리지에서 해당 강좌 삭제 및 모달 닫기 및 카드 목록에서 해당 카드 삭제 하기
    const deleteBtn = document.querySelector(".delete-btn");
    deleteBtn.onclick = function () {
      alert("정말 삭제하시겠습니까?");
      const courses = getStoredCourses();
      courses.splice(i, 1); // i번째 요소 삭제
      localStorage.setItem("courses", JSON.stringify(courses)); // 로컬스토리지 업데이트
      listInit();

      // 모달 닫기
      document.getElementById("detailLecture").style.display = "none";
      document.getElementById("detailLecture").classList.remove("active");
    };

    // 수정 저장
    const updateForm = document.getElementById("update-form");
    updateForm.onsubmit = function (event) {
      event.preventDefault(); // 폼 제출 기본 동작 방지
      const courses = getStoredCourses();
      const updatedCourse = {
        ...courses[i], // 기존 데이터 유지
        lectureName: document.querySelector("#update-form #lecture-name").value,
        thumbnail: document.querySelector("#update-form #previewImage").src,
        introduce: document.querySelector("#update-form #introduce").value,
        level: document.querySelector("#update-form #level").value,
        category: document.querySelector("#update-form #category").value,
      };

      courses[i] = updatedCourse;
      localStorage.setItem("courses", JSON.stringify(courses)); // 로컬스토리지 업데이트
      listInit();

      // 모달 닫아주기
      document.getElementById("detailLecture").style.display = "none";
      document.getElementById("detailLecture").classList.remove("active");
    };
  });

  return btn;
}
