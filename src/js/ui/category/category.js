const category = ['전체', 'AI', '개발', '디자인'];

category.forEach(async (value, i) => {
  const chip = await categoryTemplate(value);
  console.log(chip)
  document.getElementById("category-list").appendChild(chip);
})

export async function categoryTemplate(value) {
  const res = await fetch('/src/js/ui/category/categoryTemplate.html'); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");
  const chip = doc.querySelector(".category-chip");
  chip.textContent = value;

  return chip;
}