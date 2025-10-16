import {category} from "./category-data.js";
import {setUrlParams, getUrlParams} from "../../utils/urlParams.js";
import {listInit} from "../card-list/cardList.js";

init();

/**
 * 초기화
 * 카테고리 칩 버튼 생성
 * 카테고리 칩을 선택을 했을 시에 버튼이 활성화 되게 끔하는 함수
 */
function init() {
  category.forEach(async (value) => {
    const chip = await categoryTemplate(value);
    document.getElementById("category-list").appendChild(chip);
  })
  document.addEventListener('click', async (e) => {
    const li = e.target.closest('.category-chip');
    if (!li) return;

    // 1) 같은 컨테이너 범위에서 모두 비활성화
    const container = li.closest('#category-nav') || document;
    container.querySelectorAll('.category-chip.is-active').forEach(chip => {
      chip.classList.remove('is-active');
      chip.setAttribute('aria-pressed', 'false');
    });

    // 2) url에 키 - 값 반영
    const key = li.dataset.key;
    setUrlParams(key)

    // 3) 클릭한 것만 활성화
    li.classList.add('is-active');
    li.setAttribute('aria-pressed', 'true');

    // todo 다시 리시트 뿌리기 최적화 방법 생각해내기.
    await listInit();
  });
}

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

  const category = await getUrlParams('category');
  console.log(chip);

  chip.id = value.key;
  chip.textContent = value.value;
  chip.dataset.key = value.key;
  if (value.key === category) chip.classList.add('is-active');
  else if (category == null && value.key === 'all') {
    chip.classList.add('is-active');
  }

  return chip;
}
