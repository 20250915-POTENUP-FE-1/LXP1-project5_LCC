/**
 * 뒤에 숫자를 빼는 함수임.
 * @param s {string} 앞에 문자 뒤에 숫자로 구성된 문자열을 넣음.
 * @returns {number|null} 결과값은 숫자 혹은 null
 */
export function getTrailingNumber(s) {
  let i = s.length - 1;
  // '0'~'9'의 아스키: 48~57
  while (i >= 0) {
    const c = s.charCodeAt(i);
    if (c < 48 || c > 57) break;
    i--;
  }
  if (i === s.length - 1) return null;        // 맨 끝이 숫자가 아니면 없음
  return Number(s.slice(i + 1));
}