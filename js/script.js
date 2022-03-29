
const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = info_box.querySelector(".card-footer .quit");
const continue_btn = info_box.querySelector(".card-footer .restart");

const quiz_box = document.querySelector(".quiz-box");

const quiz_list = document.querySelector(".quiz-box .quiz-list");

const timeCount = quiz_box.querySelector(".card-header-timer span");

const time_line = quiz_box.querySelector(".time-line");

start_btn.addEventListener("click", ()=> {
  info_box.classList.add("activeInfo");
});

exit_btn.addEventListener("click", ()=> {
  info_box.classList.remove("activeInfo");
});

continue_btn.addEventListener("click", ()=> {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  startTimer(timeValue);
  startTimerLine(0);
});

let que_count = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0; 
let userScore = 0;

const next_btn = quiz_box.querySelector(".card-footer button");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".restart");
const quit_quiz = result_box.querySelector(".quit"); 

restart_quiz.addEventListener("click", () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  let que_count = 0;
  let counter;
  let counterLine;
  let timeValue = 15;
  let widthValue = 0; 
  let userScore = 0;
  showQuestions(que_count);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  next_btn.style.display = "none";
});


quit_quiz.addEventListener("click", ()=> {
  window.location.reload();
});


next_btn.addEventListener("click", () => {
  if(que_count < questions.length - 1){
    que_count++;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
  }
  else {
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("Questions completed");
    showResultBox();
  }
});

// Quiz box ichidagi elemenlarini o'zgartirish

function showQuestions(index){
  const que_text = document.querySelector(".quiz-box .card-title");
  let que_tag = questions[index].numb + ". " + questions[index].question;
  let quiz_tag = 
  '<p class="card-text">' + questions[index].options[0] + '<span></span></p>'
  + '<p class="card-text">' + questions[index].options[1] + '<span></span></p>'
  + '<p class="card-text">' + questions[index].options[2] + '<span></span></p>'
  + '<p class="card-text">' + questions[index].options[3] + '<span></span></p>'
  que_text.innerHTML = que_tag;
  quiz_list.innerHTML = quiz_tag;
  const bottom_que_counter = quiz_box.querySelector(".card-footer p");
  let bottom_que_tag = '<span>' + questions[index].numb + '</span> of <span>' + questions.length + '</span> questions';
  bottom_que_counter.innerHTML = bottom_que_tag;
  
  const option = quiz_list.querySelectorAll(".card-text");
  for (let i = 0; i < option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
};

let tickIcon = '<span><i class="fas fa-check"></i></span>';
let crossIcon = '<span><i class="fas fa-times"></i></span>';

function optionSelected(answer){
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[que_count].answer;
  let allOptions = quiz_list.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("Answer is Correct!");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } 
  else {
    answer.classList.add("wrong");
    console.log("Answer is Wrong?");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    for (let i = 0; i < allOptions; i++) {
      if(quiz_list.children[i].textContent == correctAns){
        quiz_list.children[i].setAttribute("class", "card-text correct");
        quiz_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }
  
  for (let i = 0; i < allOptions; i++){
    quiz_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function showResultBox(){
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score-text");
  if (userScore > 3) {
    let scoreTag = '<span>and congrats!, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else if (userScore > 1) {
    let scoreTag = '<span>and nice, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else {
    let scoreTag = '<span>and sorry, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
};

// restart_quiz.addEventListener("click", ()=>{
//   result_box.classList.remove("activeResult");
//   info_box.classList.add("activeInfo");
// });

// quit_quiz.addEventListener("click", ()=> {
//   result_box.classList.remove("activeResult");
// });

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time;
    time--;
    if(time < 9){
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if(time < 0){
      clearInterval(counter);
      timeCount.textContent = "00";
      time_Off.textContent = "Time off";
      let correctAns = questions[que_count].answer;
      let allOptions = quiz_list.children.length;
      for (let i = 0; i < allOptions; i++) {
        if(quiz_list.children[i].textContent == correctAns){
          quiz_list.children[i].setAttribute("class", "card-text correct");
          quiz_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
      for (let i = 0; i < allOptions; i++){
        quiz_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "block";
    }
  }
}

function startTimerLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
    time += 1;
    time_line.style.width = time + "px"
    if(time > 555){
      clearInterval(counterLine);
    }
  }
}

