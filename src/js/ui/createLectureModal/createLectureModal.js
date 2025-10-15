import {openFileInput} from "../../utils/file/openFileInput.js";
import {fileInsert} from "../../utils/file/fileInsert.js";
import {submit} from "./feature/submit.js";
import {settingCloseModal} from "../../utils/openModal.js";

document.getElementsByClassName("modals").item(0).appendChild(await createLectureModal());

/**
 * 강의 생성 모달을 만드는 함수
 * @returns {Promise<Element>}
 */
async function createLectureModal() {
  const res = await fetch('/src/js/ui/createLectureModal/createLectureModalTemplate.html');
  const htmlText = await res.text();

  const doc = new DOMParser().parseFromString(htmlText, 'text/html');

  return doc.querySelector('#createLectureModal');
}

const noticeBtn = document.getElementById("thumbnail-notice");
const fileInput = document.getElementById("thumbnail");
const preview = document.getElementById("forPreview");
const modal = document.getElementById("createLectureModal");
const form = modal.querySelector("#create-form");

// 삭제 넣기
settingCloseModal(modal);

// 파일 클릭
openFileInput(noticeBtn, fileInput)

// 파일 넣는 함수
fileInsert(noticeBtn, fileInput, preview)

// 전송
submit(form, modal)