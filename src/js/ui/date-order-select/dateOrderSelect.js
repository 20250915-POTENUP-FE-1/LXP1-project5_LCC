import {setUrlParams} from "../../utils/urlParams.js";
import {listInit} from "../card-list/cardList.js";

export async function dateOrderSelect() {
  const res = await fetch('/src/js/ui/date-order-select/dateOrderSelectTemplate.html'); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");

  const btn = doc.querySelector("select#sort-select");

  return btn;
}

document.getElementById("date-order-select").appendChild(await dateOrderSelect());

const DOMReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

DOMReady(function () {
  console.log('DOMContentLoaded');
  const sortSelect = document.getElementById('sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', async (e) => {
    const value = e.target.value;
    await setUrlParams('sort', value);
    await listInit();
  });
})