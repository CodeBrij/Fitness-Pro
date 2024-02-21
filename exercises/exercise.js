// document.addEventListener("DOMContentLoaded", function () {
//   const button = document.querySelector(
//     '[data-collapse-toggle="navbar-default"]'
//   );
//   const menu = document.getElementById("navbar-default");

//   button.addEventListener("click", function () {
//     menu.classList.toggle("hidden");
//   });
// });

// document.addEventListener("DOMContentLoaded", function() {
//   fetch('exercises.json')
//       .then(response => response.json())
//       .then(data => displayExercises(data))
//       .catch(error => console.error('Error fetching exercises:', error));
// });

// function displayExercises(exercises) {
//   const exerciseContainer = document.getElementById('exercise-container');

//   exercises.forEach(exercise => {
//       const card = document.createElement('div');
//       card.classList.add('card');

//       const image = document.createElement('img');
//       image.src = exercise.images[0]; // Assuming the first image is used
//       image.alt = exercise.name;
//       card.appendChild(image);

//       const title = document.createElement('h2');
//       title.textContent = exercise.name;
//       card.appendChild(title);

//       const levelLabel = document.createElement('p');
//       levelLabel.textContent = 'Level:';
//       card.appendChild(levelLabel);

//       const level = document.createElement('p');
//       level.textContent = exercise.level;
//       card.appendChild(level);

//       const categoryLabel = document.createElement('p');
//       categoryLabel.textContent = 'Category:';
//       card.appendChild(categoryLabel);

//       const category = document.createElement('p');
//       category.textContent = exercise.category;
//       card.appendChild(category);

//       const instructionsLabel = document.createElement('p');
//       instructionsLabel.textContent = 'Instructions:';
//       card.appendChild(instructionsLabel);

//       const instructions = document.createElement('p');
//       instructions.textContent = exercise.instructions;
//       card.appendChild(instructions);

//       exerciseContainer.appendChild(card);
//   });
// }

const paragraph = document.getElementById("recommend");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");

function displayParagraph() {
  console.log("ENter")
  if (!heightInput || !weightInput) {
    console.error("Height or weight input elements not found.");
    return;
}
    const height = Number(heightInput.value);
    const weight = Number(weightInput.value);
    const bmi = weight * 10000 / (height * height);
  console.log("Check")
  document.getElementById("recommendations").style.backgroundColor = "white";

    if (bmi < 18.5) {
        paragraph.innerHTML = 'Follow the exercises and plan your diet with consultation from a healthcare professional.<br>Focus on nutrient-dense foods to increase calorie intake.<br>Include lean proteins, healthy fats, and complex carbohydrates in your diet.<br>Engage in strength training exercises to build muscle mass.<br>Consult with a healthcare professional or a registered dietitian for personalized advice.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        paragraph.innerHTML = 'Perform Intermediate and Expert level exercises to improve and maintain.<br>Maintain a balanced diet with a variety of whole foods.<br>Incorporate both cardiovascular exercises (e.g., running, cycling) and strength training into your routine.<br> Stay active throughout the day to promote overall health.';
    } else {
        paragraph.innerHTML = 'Hightime to take steps towards the health, start with beginner friendly exercises.<br>Prioritize a well-balanced, calorie-controlled diet.<br>Include both aerobic exercises and strength training to promote weight loss and muscle development.<br>Gradually increase exercise intensity and duration.<br>Seek support from healthcare professionals, such as a registered dietitian or fitness trainer.';
    }
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector('[data-collapse-toggle="navbar-default"]');
  const menu = document.getElementById("navbar-default");

  button.addEventListener("click", function () {
    menu.classList.toggle("hidden");
  });

  // Fetch exercises and display all exercises initially
  fetchExercisesAndDisplay();

  // Add click event listeners to filter buttons
  document.getElementById("beginnerBtn").addEventListener("click", function () {
    filterExercises("beginner");
  });

  document.getElementById("intermediateBtn").addEventListener("click", function () {
    filterExercises("intermediate");
  });

  document.getElementById("expertBtn").addEventListener("click", function () {
    filterExercises("expert");
  });
});

function fetchExercisesAndDisplay() {
  fetch('exercises.json')
    .then(response => response.json())
    .then(data => displayExercises(data))
    .catch(error => console.error('Error fetching exercises:', error));
}

function displayExercises(exercises) {
  const exerciseContainer = document.getElementById('exercise-container');
  exerciseContainer.innerHTML = ''; // Clear previous content

  exercises.forEach(exercise => {
    const card = createExerciseCard(exercise);
    exerciseContainer.appendChild(card);
  });
}

// function filterExercises(level) {
//   // Fetch all exercises
//   fetchExercisesAndDisplay();

//   // Filter and display exercises based on the selected level
//   const exerciseContainer = document.getElementById('exercise-container');
//   const cards = exerciseContainer.getElementsByClassName('card');

//   Array.from(cards).forEach(card => {
//     const exerciseLevel = card.getAttribute('data-level');

//     // Toggle a 'hidden' class to control visibility
//     if (level === 'all' || exerciseLevel === level) {
//       card.classList.remove('hidden');
//     } else {
//       card.classList.add('hidden');
//     }
//   });
// }





function createExerciseCard(exercise) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('data-category', exercise.level.toLowerCase()); // Add category as a data attribute

  const image = document.createElement('img');
  image.src = exercise.images[0]; // Assuming the first image is used
  image.alt = exercise.name;
  card.appendChild(image);

  const title = document.createElement('h2');
  title.textContent = exercise.name;
  card.appendChild(title);

  const levelLabel = document.createElement('p');
  levelLabel.textContent = 'Level:';
  card.appendChild(levelLabel);

  const level = document.createElement('p');
  level.textContent = exercise.level;
  card.appendChild(level);

  const categoryLabel = document.createElement('p');
  categoryLabel.textContent = 'Category:';
  card.appendChild(categoryLabel);

  const category = document.createElement('p');
  category.textContent = exercise.category;
  card.appendChild(category);

  const instructionsLabel = document.createElement('p');
  instructionsLabel.textContent = 'Instructions:';
  card.appendChild(instructionsLabel);

  const instructions = document.createElement('p');
  instructions.textContent = exercise.instructions;
  card.appendChild(instructions);

  return card;
}

