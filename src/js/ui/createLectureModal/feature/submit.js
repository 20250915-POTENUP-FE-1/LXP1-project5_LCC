import {cardTemplate} from "../../card/card.js";

/**
 * 폼안의 데이터를 전송하는 함수 (to LocalStorage)
 * @param form {HTMLElement}
 * @param modal {HTMLElement}
 * @returns void
 */
export function submit(form, modal) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 기본 새로고침 방지

    const lectureName = document.getElementById("lecture-name").value.trim();
    const category = document.getElementById("category").value;
    const level = document.getElementById("level").value;
    const introduce = document.getElementById("introduce").value.trim();
    const thumbnail = document.getElementById("previewImage").src;

    console.log(localStorage.getItem("courses"))
    const id = JSON.parse(localStorage.getItem("courses")).length ?? 0;

    if (!lectureName || !category || !level || !introduce) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!thumbnail) {
      alert("썸네일 이미지를 등록해주세요.");
      return;
    }

    const newCourse = {
      lectureName, introduce, level, category, thumbnail, id
    };

    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    storedCourses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(storedCourses));

    alert("강좌가 저장되었습니다!");
    localStorage.removeItem("thumbnailImage");
    modal.style.display = 'none';
    form.reset();
    const card = await cardTemplate(newCourse, storedCourses.length - 1);
    document.getElementById("card-container").appendChild(card);
  });
}