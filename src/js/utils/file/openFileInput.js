/**
 * input[file]을 건드리게 하는 함수
 * @param noticeBtn {HTMLElement}
 * @param fileInput {HTMLElement}
 * @returns void
 */
export function openFileInput(noticeBtn, fileInput) {
  noticeBtn.addEventListener("click", () => {
    fileInput.click();
  });
}