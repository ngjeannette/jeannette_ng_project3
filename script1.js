$(function() {
  app.init();
});
const app = {};
app.init = () => {
  app.selectAnswer();
  app.getData();
  // app.generateQuestions();
};

app.selectAnswer = () => {
  // $(".select").on("click", function() {
  //   const isCorrect = $(this).attr("isCorrect");
  //   if (!isCorrect || isCorrect == "false") {
  //     $(this).attr("isCorrect", "true");
  //   } else {
  //     $(this).attr("isCorrect", "false");
  //   }
  //   console.log($(this));
  // });
  // click will show: "option1 is the answer!"
  // onclick, take the avlue of this -> add to dom
  $(".select").on("click", function() {
    $(this)
      .attr({ answer: "answer" })
      .addClass("color")
      .siblings()
      .removeAttr("answer")
      .removeClass("color");
    let div = $(this).data("value");
    $("h1").html(`${div} is the answer`);
  });
};
let question = $("#question").val();
let option1 = $("#option1").val();
let option2 = $("#option2").val();
let option3 = $("#option3").val();
let option4 = $("#option4").val();

let newQuestion = {
  question: question,
  option: [
    { optionId: 1, value: option1 },
    { optionId: 2, value: option2 },
    { optionId: 3, value: option3 },
    { optionId: 4, value: option4 }
  ]
};
// console.log(newQuestion);
// submit form. when you submit, it will generate the questions! onto section

app.getData = () => {
  $("form").on("submit", function(e) {
    e.preventDefault();
    printData(newQuestion);
  });
};

let printData = newQuestion => {
  let question = newQuestion.question;
  let options = newQuestion.option;
  let allOptions = options
    .map((option, index) => {
      const optionValue = option.value;
      return `<p id="${index}">${optionValue}</p>`;
    })
    .join("");
  const optionSelection = `${allOptions}`;

  let title = `<h2>${question}</h2>`;
  let sentence = title + optionSelection;
  $("section").append(sentence);
};

// i want to clickon the p. when I click on p, i want to chck if it's the right answer. to check if it's the right answer.
