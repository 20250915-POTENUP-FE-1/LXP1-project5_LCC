import { settingCloseModal } from "../../utils/openModal.js";
import { getTrailingNumber } from "../../utils/getTrailingNumber.js";
import { getStoredCourses } from "../../store/storage.js";

document
  .getElementsByClassName("modals")
  .item(0)
  .appendChild(await detailLectureModal());

/**
 * detail 모달을 서버 템플릿으로 만들고 id만 동적으로 교체해 반환
 * @param {string} i - 최종으로 부여할 모달 id (예: detail-12)
 * @returns {Promise<HTMLDivElement>}
 */
export async function detailLectureModal() {
  const res = await fetch(
    "/src/js/ui/detailLectureModal/detailLectureModalTemplate.html"
  );

  const htmlText = await res.text();
  const doc = new DOMParser().parseFromString(htmlText, "text/html");
  console.log(doc);
  const dlm = doc.querySelector("#detailLecture");
  console.log(dlm);

  return dlm;
}

const modal = document.getElementById("detailLecture");

settingCloseModal(modal);
