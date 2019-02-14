$(function() {
  const convertQuestionToHTML = item => {
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
  let total = 0;

  $("button").on("click", function(e) {
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

    const newQuestionHTML = convertQuestionToHTML(newQuestion);
    $("section").append(newQuestionHTML);

    $("p").on("click", function() {
      if ($(this).attr("answer") === $(this).text()) {
        const bottomText = `<h3>${$(this).text()} is the correct answer<h3>`;
        $(this)
          .parent()
          .append(bottomText);
        $(this).addClass("green");
        $("h3").addClass("green");
        total = total + 1;
        console.log(total);
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
        .off("click");
      $(this).off("click");
      $("#total").html("");
      $("#total").html(`${total} / ${$(".total").length}`);
    });
  });
});
