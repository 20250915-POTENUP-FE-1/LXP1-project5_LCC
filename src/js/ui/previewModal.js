// 강의 생성 모달 폼
const clm = document.createElement("div");
clm.innerHTML = `
<div id ="previewLecture" class = "modal">
  <div class = "modal-content">
    <div class = "modal-header">
      <h3>강의 미리보기</h3>
      <button class = "modal-close">&times;</button>
    </div>
    <form id="preview-form" class="modal-form"> 
      <div class="form-group">
       <label for="lecture-title">강좌명</label>
        <input type="text" id="lecture-title" class="form-input" readonly> 
      </div>
        <div class = "form-group">
         <label for= "category">카테고리</label>
         <input type="text" id="category" class="form-input" readonly>
        </div>
      <div class = "form-group">
        <label for = "level">난이도</label>
        <input type="text" id="level" class="form-input" readonly>
      </div>
      <div class = "form-group">
        <label for ="introduce">간단소개글</label>
        <input type = "text" id="introduce" class="form-input" readonly>
      </div>
       <div class="modal-actions">
        <button type="button" class="cancel-btn">취소</button>
        <button type="submit" class="save-btn">저장</button>
      </div>
     </form>
    </div>
  </div>
</div>
 `;
document.getElementsByClassName("modals").item(0).appendChild(clm);
// 모달 관련 함수
