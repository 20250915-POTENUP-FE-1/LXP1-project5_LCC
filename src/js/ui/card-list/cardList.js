import {getStoredCourses} from "../../store/storage.js";
import {cardTemplate} from "../card/card.js";
import {getUrlParams} from "../../utils/urlParams.js";
import {pageShowCards} from "../../../constants/contants.js";

await listInit();

/**
 * 초기화
 * 리스트에 카드 생성

 * @param page {number} 페이지 범위
 * @returns {Promise<void>}
 */
export async function listInit(page = 1) {
  const container = document.getElementById("card-container");

  container.style.transition = "opacity 0.1s";
  container.style.opacity = "0";

  await new Promise(resolve => setTimeout(resolve, 100)); // 기다린다.

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

    return lowerSort === 'old' ? dateA - dateB : dateB - dateA;
  });

  const pageNum = Number(page) || 1;
  const start = (pageNum - 1) * pageShowCards;
  const end = start + pageShowCards;
  const pageCourses = sorted.slice(start, end);

  // 렌더 전에 비우기
  container.innerHTML = "";

  // 카드 렌더
  for (let i = 0; i < pageCourses.length; i++) {
    const card = await cardTemplate(pageCourses[i], i);
    container.appendChild(card);
  }
  container.style.opacity = "1";
}