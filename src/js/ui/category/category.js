const category = [
  {value: '전체', key: 'all'},
  {value: 'AI', key: 'AI'},
  {value: '개발', key: 'develop'},
  {value: '디자인', key: 'design'},
];
export const categoryExceptKeyAll = category
  .filter(value => value.key !== 'all');

category.forEach(async (value) => {
  const chip = await categoryTemplate(value);
  document.getElementById("category-list").appendChild(chip);
})

/**
 * 카테고리 버튼을 반환하는 함수.
 * @param value {{key: string, value: string}}
 * @param i {number}
 * @returns {Promise<Element>}
 */
export async function categoryTemplate(value) {
  const res = await fetch('/src/js/ui/category/categoryTemplate.html'); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");
  const chip = doc.querySelector(".category-chip");
  chip.id = value.key;
  chip.textContent = value.value;

  return chip;
}