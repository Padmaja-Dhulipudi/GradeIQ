const gradeSystems = {
  indian: {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0
  },
  international: {
    "A": 4,
    "B": 3,
    "C": 2,
    "D": 1,
    "F": 0
  }
};

function addSubject() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Grade" class="grade">
    <input type="number" placeholder="Credits" class="credits">
  `;
  document.getElementById("subjects").appendChild(div);
}

function calculateGPA() {
  const scale = document.getElementById("gpaScale").value;
  const system = document.getElementById("gradeSystem").value;

  const grades = document.querySelectorAll(".grade");
  const credits = document.querySelectorAll(".credits");

  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach((g, i) => {
    const grade = g.value.toUpperCase();
    const credit = Number(credits[i].value);

    let points;

    if (system === "custom") {
      points = Number(prompt(`Enter GPA points for grade ${grade}:`));
    } else {
      points = gradeSystems[system][grade];
    }

    if (points === undefined || isNaN(credit)) {
      alert("Invalid grade or credits");
      return;
    }

    totalPoints += points * credit;
    totalCredits += credit;
  });

  let gpa = totalPoints / totalCredits;

  // Convert if needed
  if (scale == 4 && system === "indian") {
    gpa = convert10to4(gpa);
  }

  document.getElementById("result").innerText =
    `Your GPA: ${gpa.toFixed(2)}`;
}

function convert10to4(gpa10) {
  if (gpa10 >= 9) return 4.0;
  if (gpa10 >= 8) return 3.5;
  if (gpa10 >= 7) return 3.0;
  if (gpa10 >= 6) return 2.5;
  if (gpa10 >= 5) return 2.0;
  return 0.0;
}
