import {detailLectureModal} from "../ui/detailLectureModal/detailLectureModal.js";

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".modal-toggle-btn");
  if (!btn) return;

  // 버튼에 data-modal-target 속성 있는지 확인
  const targetId = btn.dataset.modalTarget;

  // todo 동적 모달은 생성은 해야 하는데 고민 해야함
  if (targetId.includes("detail")) await detailLectureModal(targetId);

  const modal = document.getElementById(targetId);

  if (modal) {
    modal.style.display = "flex";
  } else {
    console.warn(`모달을 찾을 수 없습니다: #${targetId}`);
  }
});

/**
 * [모달을 닫는 함수를 셋팅]
 * @param modal {HTMLElement}
 * @returns void
 * */
export function settingCloseModal(modal) {
  modal.querySelector('.modal-close')
    .addEventListener('click', () => closeModal(modal));
  // 모달 내의 취소 버튼 클릭시 모달 닫기
  modal.querySelector('.cancel-btn')
    .addEventListener('click', () => closeModal(modal));
  // 모달 배경 클릭시 모달 닫기
  modal.addEventListener('click', function (e) {
    e.target === modal && closeModal(modal);
  });
}

/**
 * 모달을 닫는 함수
 * @param modal {HTMLElement}
 * @returns void
 * */
function closeModal(modal) {
  modal.style.display = 'none';
  if (modal.querySelectorAll("form")) {
    modal.querySelectorAll("form").forEach((form) => {
      form.reset();
    });
  }
}


