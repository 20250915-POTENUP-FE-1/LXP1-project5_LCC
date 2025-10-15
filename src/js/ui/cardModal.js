import { settingCloseModal } from "../utils/openModal.js";

export function createLectureModal(i) {
  const clm = document.createElement("div");
  const lastChar = i.charAt(i.length - 1);
  console.log(lastChar);
  const name = JSON.parse(localStorage.getItem("courses"));
  let dd;
  name.forEach((course) => {
    console.log(course.id);
    if (course.id == lastChar) {
      dd = course;
    }
  });
  console.log(name);
  clm.innerHTML = `
<div id="${i}" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>My 강의 수정하기</h3>
      <button class="modal-close">&times;</button>
    </div>
    <form id="create-form" class="modal-form">
      <input type="hidden" id="course">
      <div>
      <div class="form-group">
        <label for="thumbnail">썸네일 이미지</label>
        <img id = "thumbnail-notice" scr = "" alt="썸네일 이미지" style= style="position: absolute; right: 20px; top:0.75rem; color: black;">
      </div>



      <div class="form-group">
        <label for="lecture-name">강의명</label>
        <input type="text" id="lecture-name" class="form-input" value="${name}." required>
      </div>
      <div class="form-group">
        <label for="category">카테고리</label>
        <input type="text" id="category"" class="form-input" placeholder="카테고리명을 입력하세요." required>
      </div>
      <div class="form-group">
        <label for="lecture-name">난이도</label>
        <input type="text" name="level" id="level" class="form-input" placeholder="난이도" required>
      </div>
        <div class="form-group">
        <label for="lecture-name">강의 소개</label>
        <input type="text" id="introduce" class="form-input" placeholder="설명 글에 소개할 글을 간단하게 작성해주세요." required>
      </div>
      </div>
      
      <div class="modal-actions">
        <button type="button" class="cancel-btn">취소</button>
        <button type="submit" class="save-btn">저장</button>
        <button type="submit" class="edit-btn">수정</button>
      </div>
    </form>
  </div>
</div>

  `;
  document.getElementsByClassName("modals").item(0).appendChild(clm);
  const modalId = document.getElementById(i);
  settingCloseModal(modalId);
}
