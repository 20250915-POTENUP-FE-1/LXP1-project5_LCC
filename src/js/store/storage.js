export function getStoredCourses() {
  if (!localStorage.getItem("courses")) localStorage.setItem("courses", JSON.stringify([]));
  return JSON.parse(localStorage.getItem("courses")) || [];
}