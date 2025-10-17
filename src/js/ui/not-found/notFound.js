export async function notFoundTemplate() {
  const res = await fetch("/src/js/ui/not-found/notFoundTemplate.html"); // 경로는 HTML 기준이 아니라 JS 기준으로 조정 필요
  const htmlText = await res.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, "text/html");

  const empty = doc.querySelector("div#card-empty");

  return empty;
}
