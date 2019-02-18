$(function () {
  $(".selection").hover(
    function () {
      if ($(this).find("#confirmed").length === 0) {
        $(this)
          .append($("<span id='hint'>Please select answer</span>"))
          .addClass("hovercolor")
          .siblings()
          .removeClass("hovercolor");
      }
    },
    function () {
      $(this)
        .find("#hint")
        .remove();
      $(this).removeClass("hovercolor");
    }
  );
  $(".selection").focus(
    function () {
      if ($(this).find("#confirmed").length === 0) {
        $(this)
          .append($("<span id='hint'>Please select answer</span>"))
          .addClass("hovercolor")
          .siblings()
          .removeClass("hovercolor");
      }
    },
    function () {
      $(this)
        .find("#hint")
        .remove();
      $(this).removeClass("hovercolor");
    }
  );
  $(".selection").on("click", function () {
    $(this)
      .find("#hint")
      .remove();
    $(this)
      .siblings()
      .find("#confirmed")
      .remove();
    if ($(this).find("#confirmed").length === 0) {
      $(this)
        .append($("<span id='confirmed'>Confirmed answer</span>"))
        .addClass("selectcolor")
        .siblings()
        .removeClass("selectcolor");
    }
  });

  const renderQuestion = (newQuestion, questionIndex) => {

    const question = newQuestion.question;
    const questionId = `question-${questionIndex}`;
    const answer = newQuestion.answer;
    // mapping options & returning entire HTML
    const optionsHTML = newQuestion.options
      .map((option, optionIndex) => {
        let optionValue = option.value;
        let isAnswer = option.isAnswer;
        const optionId = `${questionId}-option-${optionIndex}`;
        return `<div class="option"><input id="${optionId}"
          name="${questionId}"
          type="radio" is-answer="${isAnswer}"/>
          <label for="${optionId}">${optionValue}</label></div>`;
      })
      .join("");

    let titleHTML = `<h2>${question}</h2>`;

    let answerHTML = `<h3 id="${questionId}-answer" style="visibility:hidden;color:green;">${answer} is the correct answer</h3>`;
    let questionHTML = `<div class="question" id="${questionId}" question-number="${questionIndex}">${titleHTML}<div class="alloptions">${optionsHTML}</div>${answerHTML}<button id="answer-${questionIndex}-submit" class="cta-2">Submit Answer</button></div>`;
    return questionHTML;
  };

  const renderQuiz = questions => {
    const questionsHTML = questions.map(renderQuestion).join("");
    const quizHTML = `<div class="container">
    <form id="quiz">${questionsHTML}<div id="resultContainer"><h2 id="result"></h2><button id="startAgain" class="cta-2">Start Again</button></div></form></div>`;
    return quizHTML;
  };
  $("section").on("click", "#startAgain", function () {

    questions = [];
    $(this)
      .parents("form")
      .remove();
  });
  const renderAndAppendQuiz = questions => {
    const quizHTML = renderQuiz(questions);

    $("section").html("");
    $("section").append(quizHTML);
    bindAnswerSubmitHandlers(questions);
  };

  const bindAnswerSubmitHandler = (questions, questionIndex) => {
    $(`#answer-${questionIndex}-submit`).click(
      getAnswerSubmitHandler(questions, questionIndex)
    );
  };

  const bindAnswerSubmitHandlers = questions => {
    for (let i = 0; i < questions.length; i++) {
      bindAnswerSubmitHandler(questions, i);
    }
  };

  const markQuestion = questionIndex => {
    const selectedOption = $(`input[name="question-${questionIndex}"]:checked`);
    const isAnswer = selectedOption.attr("is-answer") === "true";

    const highlightColor = isAnswer ? "black" : "gray";

    selectedOption.find("label").css("color", highlightColor);
    selectedOption
      .siblings()
      .find("label")
      .css("color", "white");

    selectedOption
      .parent()
      .find("label")
      .css("color", highlightColor);
    selectedOption
      .parent()
      .siblings()
      .find("label")
      .css("color", "white");

    $(`#question-${questionIndex}-answer`).css("visibility", "visible");
  };

  const markQuestions = questions => {
    for (let i = 0; i < questions.length; i++) {
      markQuestion(i);
    }
  };

  const calculateTotal = questions =>
    questions.reduce((total, question, index) => {
      const selectedOption = $(`input[name="question-${index}"]:checked`);
      const isAnswer = selectedOption.attr("is-answer") === "true";
      if (isAnswer) {
        total++;
      }
      return total;
    }, 0);

  const updateTotal = questions => {
    const total = calculateTotal(questions);
    $(`#result`).html(`You got ${total} / ${questions.length} correct!`);
  };
  const getAnswerSubmitHandler = (questions, questionIndex) => event => {
    event.preventDefault();


    markQuestion(questionIndex);
    updateTotal(questions);
  };

  const getQuizSubmitHandler = questions => event => {
    event.preventDefault();

    markQuestions(questions);
    updateTotal(questions);
  };

  let questions = [];

  $("#form").on("submit", function (e) {

    e.preventDefault();
    $("html, body").animate({ scrollTop: $('section').offset().top }, 1000);
    // GET DATA FROM DOM

    // Get question value
    const question = $("#question").val();

    // Get the correct input id from the checked radio button value,
    const correctOptionId = $(`input[name="correctOption"]:checked`).val();
    // checked value of radio

    // Get all the option input elements by name
    const textInputs = $('input[name="option"]').toArray();
    // FORMAT DATA
    // Map through all the option inputs
    // Compare the correct input id with the current input id to determine if it is correct
    let answer = "";

    const options = textInputs.map(input => {
      let value = input.value;
      let isAnswer = input.id == correctOptionId;
      if (isAnswer) {
        answer = value;
      }
      return {
        value: value,
        isAnswer: isAnswer
      };
    });
    const newQuestion = {
      question: question,
      options: options,
      answer: answer
    };
    questions.push(newQuestion);
    // GENERATE HTML
    renderAndAppendQuiz(questions);

    $(".option").click(function (e) {

      $(this).addClass("active")
      $(this).siblings().removeClass('active')


      const questionIndex = $(this)
        .parent()
        .attr("question-number");
      // Find input
      const input = $(this).find("input");
      // Set checked prop to true
      input.prop("checked", true);
    });
    $(this)[0].reset()
  });
});
