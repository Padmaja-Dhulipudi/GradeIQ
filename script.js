const gradeSystems = {
  indian: { "O":10, "A+":9, "A":8, "B+":7, "B":6, "C":5, "F":0 },
  international: { "A":4, "B":3, "C":2, "D":1, "F":0 }
};

const subjectsDiv = document.getElementById("subjects");
const usernameInput = document.getElementById("username");
const themeToggle = document.getElementById("themeToggle");

// ---------- SUBJECTS ----------
function addSubject(data = {}) {
  const div = document.createElement("div");
  div.className = "subject-row";
  div.innerHTML = `
    <input placeholder="Subject" class="subject-name" value="${data.name || ""}">
    <input placeholder="Grade" class="grade" value="${data.grade || ""}">
    <input type="number" placeholder="Credits" class="credits" value="${data.credits || ""}">
  `;
  subjectsDiv.appendChild(div);
  saveData();
}

// ---------- GPA ----------
function calculateGPA() {
  const scale = document.getElementById("gpaScale").value;
  const system = document.getElementById("gradeSystem").value;

  const grades = document.querySelectorAll(".grade");
  const credits = document.querySelectorAll(".credits");

  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach((g, i) => {
    const grade = g.value.trim().toUpperCase();
    const credit = Number(credits[i].value);
    const points = gradeSystems[system][grade];

    if (points !== undefined && credit > 0) {
      totalPoints += points * credit;
      totalCredits += credit;
    }
  });

  if (totalCredits === 0) {
    document.getElementById("result").innerText = "Please enter valid data.";
    return;
  }

  let gpa = totalPoints / totalCredits;
  if (scale == 4 && system === "indian") gpa = convert10to4(gpa);

  document.getElementById("result").innerText =
    `${usernameInput.value || "Your"} GPA: ${gpa.toFixed(2)}`;

  saveData();
}

function convert10to4(g) {
  if (g >= 9) return 4;
  if (g >= 8) return 3.5;
  if (g >= 7) return 3;
  if (g >= 6) return 2.5;
  if (g >= 5) return 2;
  return 0;
}

// ---------- STORAGE ----------
function saveData() {
  const data = {
    username: usernameInput.value,
    scale: gpaScale.value,
    system: gradeSystem.value,
    dark: document.body.classList.contains("dark"),
    subjects: [...document.querySelectorAll(".subject-row")].map(row => ({
      name: row.children[0].value,
      grade: row.children[1].value,
      credits: row.children[2].value
    }))
  };
  localStorage.setItem("gradeIQ", JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("gradeIQ"));
  if (!data) return;

  usernameInput.value = data.username || "";
  gpaScale.value = data.scale || "10";
  gradeSystem.value = data.system || "indian";

  if (data.dark) document.body.classList.add("dark");

  subjectsDiv.innerHTML = "";
  data.subjects.forEach(addSubject);
}

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  saveData();
};

loadData();
if (subjectsDiv.children.length === 0) addSubject();
