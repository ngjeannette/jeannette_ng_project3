const app = {};
// convert Question to HTML
app.convertQuestionToHTML = item => {
  let question = item.question;
  let options = item.options;
  let answer = item.answer;

  let moreoptions = options
    .map(item => {
      const itemValue = item.value;
      return `<p answer='${answer}'>${itemValue}</p>`;
    })
    .join("");

  const title = `<h2>${question}</h2>`;
  const optionselection = `${moreoptions}`;
  const answers = `<h2>${answer}</h2>`;
  let deleteClickButton = `<button id="delete">X</button>`;
  let sentence = title + optionselection + deleteClickButton;
  return `<div class="total">` + sentence + "</div>";
};
let total = 0;

app.deleteClick = () => {
  $("section").on("click", "#delete", function(e) {
    e.preventDefault();
    $(this)
      .parent()
      .remove();
  });
};

app.optionClick = () => {
  $("section").on("click", "p", function() {
    console.log(this);
    if ($(this).attr("answer") === $(this).text()) {
      const bottomText = `<h3>${$(this).text()} is the correct answer<h3>`;
      $(this)
        .parent()
        .append(bottomText);
      $(this).addClass("green");
      $("h3").addClass("green");
      total = total + 1;
    } else {
      $(this).addClass("red");
      const bottomText = `<h3>${$(this).attr(
        "answer"
      )} is the correct answer <h3>`;
      $(this)
        .parent()
        .append(bottomText);
      $("h3").addClass("green");
    }
    $(this)
      .siblings()
      .addClass("hide");
    $(this).addClass("hide");
    $("#total").html("");
    $("#total").html(`You got..... ${total} / ${$(".total").length}`);
    // $(document)
    //   .scrollTop.delay(1000)
    //   .parent()
    //   .next()
    //   .offset().top;
    // $("html, body").animate(
    //   {
    //     scrollTop: $("div").offset().top
    //   },
    //   200
    // );
  });
};

app.buttonClick = () => {
  $("form").on("submit", function(e) {
    e.preventDefault();
    let question = $("#question").val();
    let option1 = $("#option1").val();
    let option2 = $("#option2").val();
    let option3 = $("#option3").val();
    let option4 = $("#option4").val();
    let answer = $("#answer").val();
    let newQuestion = {
      question: question,
      options: [
        { optionId: 1, value: option1 },
        { optionId: 2, value: option2 },
        { optionId: 3, value: option3 },
        { optionId: 4, value: option4 }
      ],
      answer: answer
    };
    $(this)[0].reset();
    const newQuestionHTML = app.convertQuestionToHTML(newQuestion);
    $("section").append(newQuestionHTML);
  });
};

app.startGame = () => {
  $("a").on("click", function(e) {
    e.preventDefault();
    // $("html,body").animate(
    //   {
    //     scrollTop: $("#section").offset().top
    //   },
    //   "slow"
    // );
    $(document).scrollTop(
      $(this)
        .parent()
        .next()
        .offset().top 
    );
  });
};

app.init = () => {
  app.buttonClick();
  app.optionClick();
  app.deleteClick();
  app.startGame();
  app.startAgainClick();
};

$(function() {
  app.init();
  AOS.init();
});
