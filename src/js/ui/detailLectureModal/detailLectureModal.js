import { settingCloseModal } from "../../utils/openModal.js";
import { getTrailingNumber } from "../../utils/getTrailingNumber.js";
import { getStoredCourses } from "../../store/storage.js";
import { openFileInput } from "../../utils/file/openFileInput.js";
import { fileInsert } from "../../utils/file/fileInsert.js";

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
  const dlm = doc.querySelector("#detailLecture");

  return dlm;

  //모달 내부에서 내용 수정 및 삭제 기능 구현
  //수정 버튼 클릭시 input 활성화 및 저장 버튼 활성화
  //삭제 버튼 클릭시 로컬스토리지에서 해당 강좌 삭제 및 모달 닫기 및 카드 목록에서 해당 카드 삭제 하기  //(카드 목록에서 해당 카드 삭제는 card.js에서 구현) 삭제 버튼에 이벤트리스너 추가 하기
}
const noticeBtn = document.getElementById("thumbnail-notice-update");
const fileInput = document.getElementById("thumbnail-update");
const preview = document.getElementById("forPreviewUpdate");
const modal = document.getElementById("detailLecture");

// 파일 클릭
openFileInput(noticeBtn, fileInput);

// 파일 넣는 함수
fileInsert(noticeBtn, fileInput, preview);
settingCloseModal(modal);
