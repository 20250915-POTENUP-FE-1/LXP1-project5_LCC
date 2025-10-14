import {createLectureModal} from "../ui/cardModal.js";

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".modal-toggle-btn");
  if (!btn) return;

  // 버튼에 data-modal-target 속성 있는지 확인
  const targetId = btn.dataset.modalTarget;
  console.log(targetId)
  if (targetId.includes("detail")) {
    createLectureModal(targetId);
  }
  const modal = document.getElementById(targetId);

  if (modal) {
    modal.style.display = "flex";
  } else {
    console.warn(`모달을 찾을 수 없습니다: #${targetId}`);
  }
});

document.querySelectorAll('.modal').forEach((modal) => {
  settingCloseModal(modal)
});

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

function closeModal(modal) {
  modal.style.display = 'none';
  if (modal.querySelectorAll("form")) {
    modal.querySelectorAll("form").forEach((form) => {
      form.reset();
    });
  }
}


