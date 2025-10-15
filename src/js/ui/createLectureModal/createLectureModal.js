import { openFileInput } from "../../utils/file/openFileInput.js";
import { fileInsert } from "../../utils/file/fileInsert.js";
import { cardTemplate } from "../card/card.js";

document
  .getElementsByClassName("modals")
  .item(0)
  .appendChild(await createLectureModal());

async function createLectureModal() {
  const res = await fetch(
    "/src/js/ui/createLectureModal/createLectureModalTemplate.html"
  );
  const htmlText = await res.text();

  const doc = new DOMParser().parseFromString(htmlText, "text/html");

  return doc.querySelector("#createLectureModal");
}

const noticeBtn = document.getElementById("thumbnail-notice");
const fileInput = document.getElementById("thumbnail");
const preview = document.getElementById("forPreview");
const modal = document.getElementById("createLectureModal");
const form = modal.querySelector("#create-form");

// 파일 클릭
openFileInput(noticeBtn, fileInput);

// 파일 넣는 함수
fileInsert(noticeBtn, fileInput, preview);

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 기본 새로고침 방지

  const lectureName = document.getElementById("lecture-name").value.trim();
  const category = document.getElementById("category").value;
  const level = document.getElementById("level").value;
  const introduce = document.getElementById("introduce").value.trim();
  const thumbnail = document.getElementById("previewImage").src;

  console.log(localStorage.getItem("courses"));
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
    lectureName,
    introduce,
    level,
    category,
    thumbnail,
    id,
  };

  const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
  storedCourses.push(newCourse);
  localStorage.setItem("courses", JSON.stringify(storedCourses));

  alert("강좌가 저장되었습니다!");
  localStorage.removeItem("thumbnailImage");
  modal.style.display = "none";
  form.reset();
  const card = await cardTemplate(newCourse, storedCourses.length - 1);
  document.getElementById("card-container").appendChild(card);
});
