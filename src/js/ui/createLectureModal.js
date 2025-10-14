import {cardTemplate} from "./card.js";

const clm = document.createElement("div");
clm.innerHTML = `
<div id="createLectureModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>My 강의 등록하기</h3>
      <button class="modal-close">&times;</button>
    </div>
    <form id="create-form" class="modal-form">
      <input type="hidden" id="course">
      <div class="form-group">
        <label for="lecture-name">강의명</label>
        <input type="text" id="lecture-name" class="form-input" placeholder="강의명을 입력해주세요." required>
      </div>
      <div class="form-group">
        <label for="introduce">간단 소개글</label>
        <input type="text" id="introduce" class="form-input" placeholder="설명 글에 소개할 글을 간단하게 작성해주세요." required>
      </div>
      <div style="display: flex; gap: 10px">
        <div class="form-group" style="width: 100%">
          <label for="category">카테고리</label>
          <select name="categories" id="category" class="form-input">
            <option value="ai">AI</option>                            
            <option value="develop">개발</option>                       
            <option value="design">디자인</option>                       
          </select>                                                   
        </div>
        <div class="form-group" style="width: 100%">
          <label for="level">난이도</label>
          <select name="categories" id="level" class="form-input">
            <option value="upper">상</option>
            <option value="middle">중</option>
            <option value="lower">하</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="thumbnail">썸네일 이미지</label>
        <button id="thumbnail-notice" class="form-input" type="button" style="position: relative; text-align: left;">
          강의 소개하는 커버 이미지를 등록해주세요.
          <div style="position: absolute; right: 20px; top:0.75rem; color: black;">
          파일 불러오기
          </div>
        </button>
        <input id="thumbnail" type="file" accept="image/*">
      </div>
      
      <div id="forPreview" style="display: flex; justify-content: end; padding-right: 32px;"></div>

      <div class="modal-actions">
        <button type="button" class="cancel-btn">취소</button>
        <button type="submit" class="save-btn">저장</button>
      </div>
    </form>
  </div>
</div>
  `;

document.getElementsByClassName("modals").item(0).appendChild(clm);

const noticeBtn = document.getElementById("thumbnail-notice");
const fileInput = document.getElementById("thumbnail");
const preview = document.getElementById("forPreview");

function openFileInput() {
  noticeBtn.addEventListener("click", () => {
    fileInput.click();
  });
}

openFileInput()

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  // if (file.size > 100 * 1024) {
  //   alert(`파일 크기가 ${(file.size / 1024).toFixed(1)}KB 입니다. 100KB 이하만 업로드 가능합니다.`);
  //   e.target.value = "";
  //   preview.innerHTML = "";
  //   return;
  // }

  const reader = new FileReader();

  reader.onload = function (event) {
    const base64Image = event.target.result;

    // localStorage에 저장
    localStorage.setItem("thumbnailImage", base64Image);

    // 미리보기 표시
    preview.innerHTML = `<img id="previewImage" src="${base64Image}" alt="썸네일 미리보기" style="width: 250px; height: 250px;border-radius: 20px;">`;

    // 버튼 텍스트 변경
    noticeBtn.textContent = file.name;
  };

  // 파일을 Base64 문자열로 변환
  reader.readAsDataURL(file);
});
console.log()

const modal = document.getElementById("createLectureModal");
const form = modal.querySelector("#create-form");
if (!localStorage.getItem("courses")) {
  localStorage.setItem("courses", JSON.stringify([]));
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // 기본 새로고침 방지

  const lectureName = document.getElementById("lecture-name").value.trim();
  const category = document.getElementById("category").value;
  const level = document.getElementById("level").value;
  const introduce = document.getElementById("introduce").value.trim();
  const thumbnail = document.getElementById("previewImage").src;
  console.log(thumbnail)


  if (!lectureName || !category || !level || !introduce) {
    alert("모든 필드를 입력해주세요.");
    return;
  }

  if (!thumbnail) {
    alert("썸네일 이미지를 등록해주세요.");
    return;
  }

  const newCourse = {
    lectureName, introduce, level, category, thumbnail
  };

  const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
  storedCourses.push(newCourse);
  localStorage.setItem("courses", JSON.stringify(storedCourses));

  alert("강좌가 저장되었습니다!");
  localStorage.removeItem("thumbnailImage");
  modal.style.display = 'none';
  form.reset();
  const card = cardTemplate(newCourse, storedCourses.length - 1);
  document.getElementById("card-container").appendChild(card);
});