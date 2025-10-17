/**
 * URL에 파라메타를 추가하는 함수.
 * @param key {string}
 * @param value {string}
 */
export function setUrlParams(key, value) {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  if (!key || key === 'all') {
    params.delete(key);    // 전체면 제거
  } else {
    params.set(key, value);        // 예: develop, AI, design
  }

  url.search = params.toString();
  history.pushState({category: value ?? null}, '', url);
}

/**
 * url에서 해당하는 키에 해당하는 값을 추출 하는 함수.
 * @param category {string} - 이곳에 해당하는 url params의 키를 얻을 수 있다.
 * @returns  {Promise<string|null>} - 키 - 값에서 값을 도출
 */
export async function getUrlParams(category) {
  const params = new URLSearchParams(window.location.search);
  return params.get(category);
}
