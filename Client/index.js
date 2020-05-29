const elem = {};

function runQuestionnaire(){
	handlersList();
	addEventListeners();
	loadQuestionnare();
	loadMessages();
}

async function loadQuestionnare() {

//Fetch the example questionnaire json file
	const response = await fetch('../example-questionnaire.json');

//Check if we receive anything from the json file
	let data;
	if(response.ok){
		data = await response.json();
	} else {
		data = 'failed to load data';
	}

// Display the name of the questionnare
  const questionsObject = document.getElementById('body');
	const qTitle = document.createElement('h2');

  qTitle.textContent = data.name;
  questionsObject.appendChild(qTitle);

// Loop through the questions and display them
	for (let i = 0; i < data.questions.length; i++) {

    const listQuestions = document.createElement('li');
		listQuestions.textContent = data.questions[i].text;

// Check what kind of question it is, if it has options or not
		if (data.questions[i].options) {
			for (let j = 0; j < data.questions[i].options.length; j++) {

				const listOptions = document.createElement('li');
				//Display the options for the questions
				listOptions.textContent = data.questions[i].options[j];

// If the id is "lord", we gonna have a single choice question
				if (data.questions[i].id == 'lord') {

					const radioButton = document.createElement('input');
					radioButton.type='radio';
					radioButton.name='one_option';
					radioButton.class = "oneoption"

//Set the options from the question as a value for each radio button
					radioButton.value = data.questions[i].options[j];

					//Append radio buttons to the options
					listOptions.appendChild(radioButton);

// If the id is "langs" we will have multiple choice question
				} else if (data.questions[i].id == 'langs') {

					const checkBox = document.createElement('input');
					checkBox.type='checkbox';
					checkBox.name='more_options';

//Set the options from the question as a value for each checkbox input
					checkBox.value = data.questions[i].options[j];

					// Append checkboxes to the options
					listOptions.appendChild(checkBox);
				}
				// Append the options to each question that have them
				listQuestions.appendChild(listOptions);
			}

// If the question doesn't have any options it will be a free text question
		//Input with type 'number'
		} else if(data.questions[i].type === 'number'){

			const inputBox = document.createElement('input');
			inputBox.type='number';
			inputBox.placeholder='Add your answer here';
			inputBox.id= i + 1;

			// Append the input type 'number' to its appropriate question
			listQuestions.appendChild(inputBox);

		//Input with type 'text'
		} else {

			const inputBox = document.createElement('input');
			inputBox.type='text';
			inputBox.placeholder='Add your answer here';
			inputBox.id= i + 1;

			//Append the input type 'text' to its appropriate question
			listQuestions.appendChild(inputBox);
		}

		// Append the questions to the body
		questionsObject.appendChild(listQuestions);
		// Create handlers for each input with type 'text'
		elem.inputboX1 = document.getElementById("1");
		elem.inputboX2 = document.getElementById("2");
		elem.inputboX3 = document.getElementById("3");
		elem.inputboX4 = document.getElementById("4");
	}
}

// Send the answers and display them in a container
async function sendAnswers() {
	  const answers = [{asw: elem.inputboX1.value},
			{asw: elem.inputboX2.value},
			{asw: elem.inputboX3.value},
			{asw: elem.inputboX4.value},
			{asw: elem.radioAnswer},
			{asw: elem.checkboxAnswers}];
  console.log('Answers', answers);
	for ( let k = 0; k < answers.length; k++){

		// Fetch the answers from the server and post them as string
		const response = await fetch('answers', {
	    method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(answers[k]),
	  });

	  if (response.ok) {

			// Empty the input box after sending the answers
	    elem.inputboX1.value = '';
			elem.inputboX2.value = '';
			elem.inputboX3.value = '';
			elem.inputboX4.value = '';

			const newAnswers = await response.json();
			emptyContent(elem.answerslist);
			showAnswers(newAnswers, elem.answerslist);
			//Make the new answers as a global object variable
			elem.download = newAnswers;
	  } else {

	    console.log('Failed to send answers', response);
	  }
	}
}

// Function that creates a link with a downloadable file
function download(content, fileName, contentType) {
 const a = document.createElement("a");
 const file = new Blob([content], { type: contentType });
 a.href = URL.createObjectURL(file);
 a.download = fileName;
 a.click();
}

// This function transform the object in string and it's added to the json file
function onDownload(){
 download(JSON.stringify(elem.download), "Answers.json", "text/plain");
}

// Function that displays the values for the radio buttons
function displayRadioValue() {
  elem.radioInputx = document.getElementsByName('one_option');
	//Loop through the options
  for(let i = 0; i < elem.radioInputx.length; i++) {
		//Get the value of the checked radio
		if(elem.radioInputx[i].checked){

			elem.radioAnswer = elem.radioInputx[i].value;
		}
		elem.radioInputx[i].checked = false;
  }
}

// Function that display the values of all checked boxes
function displayCheckboxValue(){
  elem.checkboxes = document.getElementsByName('more_options');
  let checkboxesChecked = "";
  //Loop through the options
  for (let i=0; i<elem.checkboxes.length; i++) {
     //Add the values of the checked boxes into the array
     if (elem.checkboxes[i].checked) {

        checkboxesChecked += elem.checkboxes[i].value + ", ";

     }
		 elem.checkboxes[i].checked = false;
  }
  elem.checkboxAnswers = checkboxesChecked;
}

// Empty a container
function emptyContent(container) {
  container.textContent = '';
}

// Loop through the answers and set them as contect 1 by 1
function showAnswers(answers, container) {
  for (const answer of answers) {

    const p = document.createElement('p');
    p.textContent = answer.asw;
    p.dataset.id = answer.id;
    container.append(p);
  }
}

async function loadMessages() {
  const response = await fetch('answers');
  let answers;
  if (response.ok) {
    answers = await response.json();
  } else {
    answers = [{ asw: 'failed to load messages :-(' }];
  }
  showAnswers(answers, elem.answerslist);
}

// Function that adds event listeners to handlers
function addEventListeners() {
	elem.submit.addEventListener('click', () =>{

		displayRadioValue();
		displayCheckboxValue();
		sendAnswers();
	})
  elem.download.addEventListener('click', onDownload);
}

// Function that creates handlers
function handlersList(){
	elem.answerslist = document.querySelector('#answers');
	elem.submit = document.querySelector('#submit');
	elem.download = document.querySelector('#download');
}

//Run questionnaire when the page loads
window.addEventListener("load", runQuestionnaire);
