if (!localStorage.getItem("courses")) {
  const initialCourses = [{title: "파이썬 강좌1", name: "code - code", level: "하"}, {
    title: "자바스크립트 입문",
    name: "JS - Basic",
    level: "중"
  }, {title: "리액트 심화", name: "React - Advanced", level: "상"},];
  localStorage.setItem("courses", JSON.stringify(initialCourses));
}

const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];

storedCourses.forEach((course, i) => {
  const a = document.createElement("a");
  a.href = "/page/detail/detail.html";
  a.className = "card";
  a.id = `card-${i}`;
  a.title = "클릭시 디테일 페이지로 전이";
  a.role = "button";

  a.innerHTML = `
    <div class="card-thumbnail">이곳이 이미지 넣는 곳</div>
    <div class="card-text">
      <div class="card-row"><h5>타이틀:</h5><p>${course.title}</p></div>
      <div class="card-row"><h5>강좌명:</h5><p>${course.name}</p></div>
      <div class="card-row"><h5>난이도:</h5><p>${course.level}</p></div>
    </div>
  `;

  document.getElementById("card-container").appendChild(a);
});
