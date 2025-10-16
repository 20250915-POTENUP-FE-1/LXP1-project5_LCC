import {getStoredCourses} from "../../store/storage.js";
import {cardTemplate} from "../card/card.js";
import {getUrlParams} from "../../utils/urlParams.js";

listInit();

/**
 * 초기화
 * 리스트에 카드 생성
 */
export async function listInit() {
  const courses = getStoredCourses();               // 배열
  const category = (await getUrlParams('category')) // 문자열 또는 null
    || 'all';

  const norm = String(category).toLowerCase();

  // 카테고리 필터링
  const filtered = norm === 'all' || norm === '' || norm == null ? courses : courses.filter(c => String(c.category).toLowerCase() === norm);

  // 렌더 전에 비우기
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  // 카드 렌더
  for (let i = 0; i < filtered.length; i++) {
    const card = await cardTemplate(filtered[i], i);
    container.appendChild(card);
  }
}

