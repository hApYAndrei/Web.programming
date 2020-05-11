'use strict';


async function loadFile() {
	console.log('working?!');

//Fetch the example questionnaire json file
	const response = await fetch('../example-questionnaire.json');
	let data;

//Check if we receive anything from the json file
	if(response.ok){
		data = await response.json();
	} else {
		data = 'failed to load data';
	}

// Display the name of the questionnare
  let questionsObject = document.getElementById('body');
	const qTitle = document.createElement('h2');
  qTitle.textContent = data.name;
  questionsObject.appendChild(qTitle);

// Loop through the questions and display them
for (let i = 0; i < data.questions.length; i++) {
	console.log(data.questions[i].text);
    const listQuestions = document.createElement('div');
		listQuestions.textContent = data.questions[i].text;

// Check what kind of question it is, if it has options or not
		if (data.questions[i].options) {
			for (var j = 0; j < data.questions[i].options.length; j++) {
				const listOptions = document.createElement('li');
				listOptions.textContent = data.questions[i].options[j];

// If the id is "lord", we gonna have a single choice question
				if (data.questions[i].id == 'lord') {

					let radioButton = document.createElement('input');
					radioButton.type='radio';
					radioButton.name='one_option';

					listOptions.appendChild(radioButton);

// If the id is "langs" we will have multiple choice question
				} else if (data.questions[i].id == 'langs') {

					let checkBox = document.createElement('input');
					checkBox.type='checkbox';
					checkBox.name='more_options';

					listOptions.appendChild(checkBox);
				}
				listQuestions.appendChild(listOptions);
			}
			
// If the question doesn't have any options it will be a free text question
		} else {

			let inputBox = document.createElement('input');
			inputBox.type='text';
			inputBox.placeholder='Add your answer here';

			listQuestions.appendChild(inputBox);
		}
		questionsObject.appendChild(listQuestions);
	}
}

//Load the function when the page loads
window.addEventListener("load", loadFile);
