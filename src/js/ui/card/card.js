import {getStoredCourses} from "../../store/storage.js";

// init
getStoredCourses().forEach(async (course, i) => {
  const a = await cardTemplate(course, i);
  document.getElementById("card-container").appendChild(a);
});

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
