document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the submit button
    document.getElementById('surveyForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting
      
      // Get all radio button inputs
      var radioInputs = document.querySelectorAll('input[type="radio"]:checked');
      
      // Initialize an object to store mood frequencies
      var moodFrequencies = {
        contentment: 0,
        stress: 0,
        frustration: 0,
        hopelessness: 0,
        optimism: 0
      };
      
      // Iterate over the checked radio inputs and count mood frequencies
      radioInputs.forEach(function(input) {
        moodFrequencies[input.value]++;
      });
      
      // Find the mood with the highest frequency
      var maxFrequency = 0;
      var maxMood = '';
      for (var mood in moodFrequencies) {
        if (moodFrequencies[mood] > maxFrequency) {
          maxFrequency = moodFrequencies[mood];
          maxMood = mood;
        }
      }
      if (maxMood == "contentment"){
          extraContent = "CONGRATULATIONS!!! You have maintained your mental health properly. Now to keep it healthy, you could perform some yoga positions or play a few mind games."
      }
      if (maxMood == "stress"){
        extraContent = "It looks like you are taking a lot of work up your sleeve (or you are procastinating). Or it could be something about your life. We would recommend to indulge with nature for some time, go for walks, play games like Water Color Sort or Chess to calm yourself"
      }
      if (maxMood == "frustration"){
        extraContent = "Something in your life is affecting you. Some solutions could be to talk with your family or friends whoever you may feel comfortable with. Playing some of our recommended games or doing Yoga could help you calm your nerves."
      }
      if (maxMood == "hopelessness"){
        extraContent = "DO NOT LOSE HOPE!! We know there will be situations where you could lose all hope but there is light in the tunnel ahead. Our games are well curated to show that comebacks are possible. Eg: Chess"
      }
      if (maxMood == "optimism"){
        extraContent = "Happy to know you have the right approach to life. Keep up thisapproach and motivate others around you as well."
      }
      // Display the user's mood
      alert('Your mood is: ' + maxMood +". "+ extraContent);
    });
  });
  