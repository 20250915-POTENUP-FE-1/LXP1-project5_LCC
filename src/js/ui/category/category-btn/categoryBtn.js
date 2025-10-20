import {getUrlParams} from "../../../utils/urlParams.js";

/**
 * 카테고리 버튼을 반환하는 함수.
 * @param value {{key: string, value: string}}
 * @param i {number}
 * @returns {Promise<Element>}
 */
export async function categoryBtnTemplate(value) {
  const res = await fetch('/src/js/ui/category/category-btn/categoryBtnTemplate.html'); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");
  const chip = doc.querySelector(".category-chip");

  const category = (await getUrlParams('category'))?.toLowerCase();

  chip.id = value.key;
  chip.textContent = value.value;
  chip.dataset.key = value.key;
  if (value.key.toLowerCase() === category) chip.classList.add('is-active'); else if (category == null && value.key.toLowerCase() === 'all') {
    chip.classList.add('is-active');
  }

  return chip;
}