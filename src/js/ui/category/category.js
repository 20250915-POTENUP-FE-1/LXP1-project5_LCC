import {category} from "./category-data.js";
import {setUrlParams} from "../../utils/urlParams.js";
import {listInit} from "../card-list/cardList.js";
import {categoryBtnTemplate} from "./category-btn/categoryBtn.js";

init();

/**
 * 초기화
 * 카테고리 칩 버튼 생성
 * 카테고리 칩을 선택을 했을 시에 버튼이 활성화 되게 끔하는 함수
 */
function init() {
  category.forEach(async (value) => {
    const chip = await categoryBtnTemplate(value);
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
    setUrlParams('category', key)

    // 3) 클릭한 것만 활성화
    li.classList.add('is-active');
    li.setAttribute('aria-pressed', 'true');

    // todo 다시 리시트 뿌리기 최적화 방법 생각해내기.
    await listInit();
  });
}
