export function openModal() {
  document.addEventListener("click", (e) => {
    // 클릭된 요소나 부모 중에서 .modal-toggle-btn 찾기
    localStorage.setItem("thumbnailImage", null);
    const btn = e.target.closest(".modal-toggle-btn");
    if (!btn) return;

    // 버튼에 data-modal-target 속성 있는지 확인
    const targetId = btn.dataset.modalTarget;
    const modal = document.getElementById(targetId);

    if (modal) {
      modal.style.display = "flex";
    } else {
      console.warn(`⚠️ 모달을 찾을 수 없습니다: #${targetId}`);
    }
  });
}

openModal();

document.querySelectorAll('.modal').forEach((modal) => {
  // 모달 내의 x 클릭시 모달 닫기
  modal.querySelector('.modal-close')
    .addEventListener('click', () => closeModal(modal));
  // 모달 내의 취소 버튼 클릭시 모달 닫기
  modal.querySelector('.cancel-btn')
    .addEventListener('click', () => closeModal(modal));
  // 모달 배경 클릭시 모달 닫기
  modal.addEventListener('click', function (e) {
    e.target === modal && closeModal(modal);
  });
});

function closeModal(modal) {
  modal.style.display = 'none';
  if (modal.querySelectorAll("form")) {
    modal.querySelectorAll("form").forEach((form) => {
      form.reset();
    });
  }
}


