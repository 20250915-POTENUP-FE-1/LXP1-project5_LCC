/**
 *
 * @param value {number} 여기는 페이지 범위가 나온다.
 * @returns {Promise<Element>}
 */
export async function pageBtnTemplate(value) {
  const res = await fetch('/src/js/ui/page-nation/page-btn/pageBtnTemplate.html'); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");
  const pageBtn = doc.querySelector(".page-btn");
  if (value == 1) {
    pageBtn.classList.add("is-active");
  }
  pageBtn.textContent = String(value);
  pageBtn.dataset.page = String(value);

  return pageBtn;
}
