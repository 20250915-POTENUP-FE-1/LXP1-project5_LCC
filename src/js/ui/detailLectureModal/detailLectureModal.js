import {settingCloseModal} from "../../utils/openModal.js";
import {getTrailingNumber} from "../../utils/getTrailingNumber.js";
import {getStoredCourses} from "../../store/storage.js";

/**
 * detail 모달을 서버 템플릿으로 만들고 id만 동적으로 교체해 반환
 * @param {string} i - 최종으로 부여할 모달 id (예: detail-12)
 * @returns {Promise<HTMLDivElement>}
 */
export async function detailLectureModal(i) {
  const res = await fetch('/src/js/ui/detailLectureModal/detailLectureModalTemplate.html');

  const htmlText = await res.text();
  const doc = new DOMParser().parseFromString(htmlText, 'text/html');

  const modalEl = /** @type {HTMLDivElement|null} */ (doc.querySelector("div.detailLecture"));
  modalEl.id = i;

  const lastNum = getTrailingNumber(i);

  const course = getStoredCourses().find(c => String(c.id) === String(lastNum));
  if (course) {
    const $ = (sel) => /** @type {HTMLInputElement|null} */ (modalEl.querySelector(sel));
    const lectureName = $('#lecture-name');
    const introduce = $('#introduce');
    const level = $('#level');
    const category = $('#category');
    const thumbImg = /** @type {HTMLImageElement|null} */ (modalEl.querySelector('#previewImage'));

    if (lectureName) lectureName.value = course.lectureName ?? '';
    if (introduce) introduce.value = course.introduce ?? '';
    if (level) level.value = course.level ?? '';
    if (category) category.value = course.category ?? '';
    if (thumbImg) thumbImg.src = course.thumbnail ?? '';
  }

  document.getElementsByClassName("modals").item(0).appendChild(modalEl);
  const modalId = document.getElementById(i);
  settingCloseModal(modalId);
}

