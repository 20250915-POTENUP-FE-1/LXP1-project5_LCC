export function openFileInput(noticeBtn, fileInput) {
  noticeBtn.addEventListener("click", () => {
    fileInput.click();
  });
}