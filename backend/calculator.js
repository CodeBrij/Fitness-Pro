document.getElementById('calorie-form').addEventListener('submit', function(e){
  document.getElementById('results').style.display = 'none';

  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateCalories, 2);

  e.preventDefault();
});

function calculateCalories(e) {
  
  const age = document.getElementById('age');
  const gender = document.querySelector('input[name="customRadioInline1"]:checked');
  const weight = document.getElementById('weight');
  const height = document.getElementById('height');
  const activity = document.getElementById('list').value;
  const totalCalories = document.getElementById('total-calories');
  let calculatedCalories;
  const lose1P = document.getElementById('lose-1P');
  const lose2P = document.getElementById('lose-2P');
  const gain1P = document.getElementById('gain-1P');
  const gain2P = document.getElementById('gain-2P');
  
  
  if (age.value === '' || weight.value === '' || height.value === '' || 80 < age.value || age.value < 15) {
    errorMessage('Please make sure the values you entered are correct')
  } else if(gender.id === 'male' && activity === "1") {
     calculatedCalories = 1.2 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } else if(gender.id === 'male' && activity === "2") {
     calculatedCalories = 1.375 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } else if (gender.id === 'male' && activity === "3") {
     calculatedCalories = 1.55 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } else if(gender.id === 'male' && activity === "4") {
     calculatedCalories = 1.725 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } else if(gender.id === 'male' && activity === "5") {
     calculatedCalories = 1.9 * (66.5 + (13.75 * parseFloat(weight.value)) + (5.003 * parseFloat(height.value)) - (6.755 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
    
  } else if(gender.id === 'female' && activity === "1") {
     calculatedCalories = 1.2 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } else if(gender.id === 'female' && activity === "2") {
     calculatedCalories = 1.375 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } else if(gender.id === 'female' && activity === "3") {
     calculatedCalories = 1.55 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } else if(gender.id === 'female' && activity === "4") {
     calculatedCalories = 1.725* (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height.value)) - (4.676 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } else {
     calculatedCalories = 1.9 * (655 + (9.563 * parseFloat(weight.value)) + (1.850 * parseFloat(height)) - (4.676 * parseFloat(age.value)));
    totalCalories.value = calculatedCalories.toFixed(2);
  } 
 
  const calorieValue = parseFloat(calculatedCalories.toFixed(2));
  lose1P.value = (calorieValue - 500).toFixed(2);
  lose2P.value = (calorieValue - 1000).toFixed(2);
  gain1P.value = (calorieValue + 500).toFixed(2);
  gain2P.value = (calorieValue + 1000).toFixed(2);


  document.getElementById('results').style.display = 'block';

  document.getElementById('loading').style.display = 'none';
}

function errorMessage(error) {
  document.getElementById('results').style.display = 'none';

  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 4000);
}

function clearError() {
  document.querySelector('.alert').remove();
}

