const clm = document.createElement("div");
clm.innerHTML = `
<div id="createLectureModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>강의 생성 모달 폼</h3>
      <button class="modal-close">&times;</button>
    </div>
    <form id="form" class="modal-form">
      <input type="hidden" id="course">
      <div class="form-group">
        <label for="lecture">강좌명</label>
        <input type="text" id="lecture" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="category">카테고리</label>
        <input type="number" id="category" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="level">난이도</label>
        <input type="number" id="level" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="introduce">간단 소개글</label>
        <input type="number" id="introduce" class="form-input" required>
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
