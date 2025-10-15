/**
 * 파일을 삽입하는 함수
 * @param noticeBtn {HTMLElement}
 * @param fileInput {HTMLElement}
 * @param preview {HTMLElement}
 * @returns void
 */
export function fileInsert(noticeBtn, fileInput, preview) {
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // if (file.size > 100 * 1024) {
    //   alert(`파일 크기가 ${(file.size / 1024).toFixed(1)}KB 입니다. 100KB 이하만 업로드 가능합니다.`);
    //   e.target.value = "";
    //   preview.innerHTML = "";
    //   return;
    // }

    const reader = new FileReader();

    reader.onload = function (event) {
      const base64Image = event.target.result;

      // localStorage에 저장
      localStorage.setItem("thumbnailImage", base64Image);

      // 미리보기 표시
      preview.innerHTML = `<img id="previewImage" src="${base64Image}" alt="썸네일 미리보기" style="width: 250px; height: 250px;border-radius: 20px;">`;

      // 버튼 텍스트 변경
      noticeBtn.textContent = file.name;
    };

    // 파일을 Base64 문자열로 변환
    reader.readAsDataURL(file);
  });
}
