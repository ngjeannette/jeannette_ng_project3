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
  let sentence = title + optionselection;
  return `<div class="total">` + sentence + "</div>";
};

// dynamic event bubbler
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
      console.log(total);
      console.log("hi");
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
      .parent()
      .parent()
      .off("click");
    $("#total").html("");
    $("#total").html(`${total} / ${$(".total").length}`);
  });
};

let total = 0;

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
    // const newQuestionloopover = app.loopOver(newQuestion);

    $("section").append(newQuestionHTML);
  });
};
app.init = () => {
  app.buttonClick();
  app.optionClick();
  // app.loopOver();
};

$(function() {
  app.init();
});
