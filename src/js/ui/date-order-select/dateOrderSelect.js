import {setUrlParams, getUrlParams} from "../../utils/urlParams.js";
import {listInit} from "../card-list/cardList.js";
import {pageNationInit} from "../page-nation/pageNation.js";
import {getStoredCourses} from "../../store/storage.js";

export async function dateOrderSelect() {
  const res = await fetch('/src/js/ui/date-order-select/dateOrderSelectTemplate.html'); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");
  const sort = (await getUrlParams('sort')) || 'new';

  const select = doc.querySelector("select#sort-select");

  // 값 일치하는 option 선택
  select.value = sort.toLowerCase();

  // 혹시 HTML 안에 없는 값이 들어왔을 때 기본값으로 되돌리기
  if (!['new', 'old'].includes(select.value)) {
    select.value = 'new';
  }

  return select;
}

document.getElementById("date-order-select").appendChild(await dateOrderSelect());

const DOMReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

DOMReady(function () {
  const sortSelect = document.getElementById('sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', async (e) => {
    const value = e.target.value;
    await setUrlParams('sort', value);
    await setUrlParams('page', '1');
    console.log();

    await pageNationInit();
    await listInit();
  });
})