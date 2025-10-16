import {openFileInput} from "../../utils/file/openFileInput.js";
import {fileInsert} from "../../utils/file/fileInsert.js";
import {submit} from "./feature/submit.js";
import {settingCloseModal} from "../../utils/openModal.js";
import {categoryExceptKeyAll} from "../category/category-data.js";

document
  .getElementsByClassName("modals")
  .item(0)
  .appendChild(await createLectureModal());

/**
 * 강의 생성 모달을 만드는 함수
 * @returns {Promise<Element>}
 */
async function createLectureModal() {
  const res = await fetch('/src/js/ui/createLectureModal/createLectureModalTemplate.html');
  const htmlText = await res.text();
  const categoryData = categoryExceptKeyAll;

  const doc = new DOMParser().parseFromString(htmlText, "text/html");
  const clm = doc.querySelector("#createLectureModal");
  const sel = clm.querySelector(`select[name="categories"]`)
  sel.innerHTML = "";
  const ph = document.createElement("option");
  ph.value = "";
  ph.textContent = "카테고리를 선택하세요";
  ph.disabled = true;
  ph.selected = categoryData[0].key;
  sel.appendChild(ph);

  // 성능을 위해 fragment 사용
  const frag = document.createDocumentFragment();
  for (const {value, key} of categoryExceptKeyAll) {
    const opt = document.createElement("option");
    opt.value = key;          // 제출 값
    opt.textContent = value;  // 표시 라벨
    if (categoryData[0].key && categoryData[0].key === key) opt.selected = true;
    frag.appendChild(opt);
  }
  sel.appendChild(frag);

  return clm;
}

const noticeBtn = document.getElementById("thumbnail-notice");
const fileInput = document.getElementById("thumbnail");
const preview = document.getElementById("forPreview");
const modal = document.getElementById("createLectureModal");
const form = modal.querySelector("#create-form");

// 삭제 넣기
settingCloseModal(modal);

// 파일 클릭
openFileInput(noticeBtn, fileInput);

// 파일 넣는 함수
fileInsert(noticeBtn, fileInput, preview);

// 전송
submit(form, modal)