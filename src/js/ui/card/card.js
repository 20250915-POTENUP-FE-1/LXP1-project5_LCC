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
  const res = await fetch('/src/js/ui/card/cardTemplate.html'); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");

  const btn = doc.querySelector("button.card");

  btn.id = `card-${i}`;
  btn.dataset.modalTarget = `detail-${i}`;
  btn.querySelector("img").src = course.thumbnail;
  btn.querySelector(".lecture-name").textContent = course.lectureName;
  btn.querySelector(".introduce").textContent = course.introduce;
  btn.querySelector(".level").textContent = course.level;

  return btn;
}
