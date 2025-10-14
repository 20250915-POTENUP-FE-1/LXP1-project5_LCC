if (!localStorage.getItem("courses")) {
  const initialCourses = [];
  localStorage.setItem("courses", JSON.stringify(initialCourses));
}

const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];

storedCourses.forEach((course, i) => {
  const a = document.createElement("button");
  a.className = "card";
  a.id = `card-${i}`;
  a.title = "클릭시 디테일 페이지로 전이";
  a.role = "button";

  export function cardTemplate(course, i) {
    const a = document.createElement("a");
    a.href = "/page/detail/detail.html";
    a.className = "card";
    a.id = `card-${i}`;
    a.title = "클릭시 디테일 페이지로 전이";
    a.role = "button";

    a.innerHTML = `
    <div class="card-thumbnail ">
      <img src="${course.thumbnail}">
    
    </div>
    <div class="card-text">
      <div class="card-row"><h5>강좌명:</h5><p>${course.lectureName}</p></div>
      <div class="card-row"><h5>소개글:</h5><p>${course.introduce}</p></div>
      <div class="card-row"><h5>난이도:</h5><p>${course.level}</p></div>
      <div>
      
      </div>
    </div>
  `;
  }

  a.addEventListener("click", () => {
    document.getElementById("lecture-title").value = course.title;
    document.getElementById("category").value = course.name;
    document.getElementById("level").value = course.level;

    document.getElementById("previewLecture").style.display = "flex";
  });

  document.getElementById("card-container").appendChild(a);
