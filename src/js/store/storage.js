/**
 * 로컬 스토리지 강좌킼에 관련한 데이터를 불러오는 함수
 * @returns {any|*[]}
 */
export function getStoredCourses() {
  if (!localStorage.getItem("courses")) localStorage.setItem("courses", JSON.stringify([]));
  return JSON.parse(localStorage.getItem("courses")) || [];
}