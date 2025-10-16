import {getStoredCourses} from "../../store/storage.js";
import {cardTemplate} from "../card/card.js";
import {getUrlParams} from "../../utils/urlParams.js";
import {pageShowCards} from "../../../constants/contants.js";

await listInit();

/**
 * 초기화
 * 리스트에 카드 생성
 */
export async function listInit() {
  const courses = getStoredCourses();               // 배열
  const category = await getUrlParams('category') || 'all';
  const sort = await getUrlParams('sort') || 'new';

  const norm = String(category).toLowerCase();
  const lowerSort = String(sort).toLowerCase();

  // 카테고리 필터링
  const filtered = norm === 'all' || norm === '' || norm == null ? courses : courses.filter(c => String(c.category).toLowerCase() === norm);

  const sorted = filtered.sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);

    if (lowerSort !== 'old') {
      // 오래된 순
      return dateA - dateB;
    } else {
      // 기본은 최신 순
      return dateB - dateA;
    }
  });

  // 렌더 전에 비우기
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  // 카드 렌더
  for (let i = 0; i < pageShowCards; i++) {
    const card = await cardTemplate(sorted[i], i);
    container.appendChild(card);
  }
}

