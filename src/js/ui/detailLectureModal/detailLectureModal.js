import {settingCloseModal} from "../../utils/openModal.js";
import {getTrailingNumber} from "../../utils/getTrailingNumber.js";

/**
 *
 * @param i
 */
export function detailLectureModal(i) {
  const clm = document.createElement("div");
  const lastChar = getTrailingNumber(i);
  const name = JSON.parse(localStorage.getItem("courses"));
  let data;
  name.forEach((course) => {
    if (course.id == lastChar) data = course;
  })

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
        <label for="lecture-name">강의명</label>
        <input type="text" id="lecture-name" class="form-input" placeholder="강의명을 입력해주세요." required>
      </div>
      </div>
      
      <div class="modal-actions">
        <button type="button" class="cancel-btn">취소</button>
        <button type="submit" class="save-btn">저장</button>
      </div>
    </form>
  </div>
</div>
  `;
  document.getElementsByClassName("modals").item(0).appendChild(clm);
  const modalId = document.getElementById(i);
  settingCloseModal(modalId);
}

