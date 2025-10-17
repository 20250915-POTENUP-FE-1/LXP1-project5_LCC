import {pageShowCards} from "../../../../constants/contants.js";
import {listInit} from "../../card-list/cardList.js";
import {pageNationInit} from "../../page-nation/pageNation.js";
import {cardTemplate} from "../../card/card.js";
import {setUrlParams} from "../../../utils/urlParams.js";

/**
 * 폼안의 데이터를 전송하는 함수 (to LocalStorage)
 *
 * @param form {HTMLFormElement}
 * @param modal {HTMLElement}
 * @returns void
 */
export function submit(form, modal) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 기본 새로고침 방지

    const lectureName = document.querySelector("#create-form #lecture-name").value.trim();
    const category = document.querySelector("#create-form #category").value.trim();
    const level = document.querySelector("#create-form #level").value.trim();
    const introduce = document.querySelector("#create-form #introduce").value.trim();
    const thumbnail = document.querySelector("#create-form #previewImage").src.trim();
    const created = new Date();

    const id = localStorage.getItem("courses") ? JSON.parse(localStorage.getItem("courses")).length : 0;

    if (!lectureName) {
      console.log("lecture name is empty", lectureName);
      alert("강의명을 입력해주세요.");
      return;
    }

    if (!category) {
      console.log("category is empty", category);
      alert("카테고리를 선택해주세요.");
      return;
    }

    if (!level) {
      console.log("level is empty", level);
      alert("난이도를 선택해주세요.");
      return;
    }

    if (!introduce) {
      console.log("introduce is empty", introduce);
      alert("소개글을 입력해주세요.");
      return;
    }

    if (!thumbnail) {
      console.log("thumbnail is empty", thumbnail);
      alert("미디어 파일을 등록해주세요.");
      return;
    }

    if (!thumbnail) {
      alert("미디어 파일을 등록해주세요.");
      return;
    }

    const newCourse = {
      lectureName, introduce, level, category, thumbnail, id, created
    };

    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    storedCourses.push(newCourse);
    localStorage.setItem("courses", JSON.stringify(storedCourses));

    alert("강좌가 저장되었습니다!");
    localStorage.removeItem("thumbnailImage");
    modal.style.display = 'none';
    form.reset();

    const noticeBtn = document.getElementById("thumbnail-notice");
    const preview = document.getElementById("forPreview");
    preview.innerHTML = '';
    noticeBtn.style.position = 'relative'; // span absolute 기준
    preview.innerHTML = ` <img id="preview-box" src="/src/img/img_class_thumbnail_no.svg" style="height: 164px; width: 232px;" alt="이미지 없음" />`;
    noticeBtn.innerHTML = `
  강의 소개하는 커버 이미지를 등록해주세요.
  <span style="position:absolute; right:20px; top:0.75rem; color:black">
    파일 불러오기
  </span>
`;
    if (storedCourses.length > pageShowCards) {
      await listInit();
    } else {
      const card = await cardTemplate(newCourse);
      document.getElementById("card-container").appendChild(card);
    }

    const emptyEl = document.querySelector('#card-empty');
    if (emptyEl) {
      const container = document.getElementById("card-container");
      container.style.display = 'grid';
      emptyEl.remove();
    }
    await setUrlParams('page', '1');
    await pageNationInit();
  });
}