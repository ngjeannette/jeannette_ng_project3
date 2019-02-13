    $(function() {
        
        const quizQuestions = [
        {
            question: "HOW ARE YOU?",
            options: [
            { optionId: 1, value: "24" },
            { optionId: 2, value: "25" },
            { optionId: 3, value: "26" },
            { optionId: 4, value: "27" }
            ],
            answer: "27"
        },
        {
            question: "HOW'S IT GOING?",
            options: [
            { optionId: 1, value: "1" },
            { optionId: 2, value: "2" },
            { optionId: 3, value: "3" },
            { optionId: 4, value: "4" }
            ],
            answer: "4"
        }
        ];


        blankquestion = []
        $('button').on('click', function (e) {
        e.preventDefault()
        let question = $('#question').val();
        let option1 = $('#option1').val();
        let option2 = $('#option2').val();
        let option3 = $('#option3').val();
        let option4 = $('#option4').val();
        let answer = $('#answer').val();

        let newQuestion = {
            question: question,
            options: [
            { optionId: 1, value: option1 },
            { optionId: 2, value: option2 },
            { optionId: 3, value: option3 },
            { optionId: 4, value: option4 },
            ],
            answer: answer,
        };
        blankquestion.push(newQuestion);
        // push to arry and convert to HTML
        let mapnewquestion = blankquestion.map(item => {
            let question = item.question;
            let options = item.options;
            let answer = item.answer;
            let moreoptions = options.map((item)=>{
            const itemValue = item.value;
            return `<p answer='${answer}'>${itemValue}</p>`
            }).join("")

            const title = `<h2>${question}</h2>`;
            const optionselection = `${moreoptions}`;
            const answers = `<h2>${answer}</h2>`;
            let sentence = title + optionselection;
            return `<div>` + sentence + '</div>';
        })
          
        $('form').html('').append(mapnewquestion);
        console.log(mapnewquestion)
console.log(blankquestion)
        $('p').on("click", function(){
            if( $(this).attr("answer") === $(this).text()){
            const bottomText = `<h3>${$(this).text()} is the correct answer<h3>`;
            $(this).parent().append(bottomText);
            $(this).addClass('green')
            $('h3').addClass('green')
            }else{
            $(this).addClass('red')
            const bottomText = `<h3>${$(this).attr("answer")} is the correct answer <h3>`
            $(this).parent().append(bottomText)
            $('h3').addClass('green')
            }
        })
        })


                const convertQuestionToHTML = item => {
                console.log('item', item);
                let question = item.question;
                let options = item.options;
                let answer = item.answer;
                let moreoptions = options.map((item) => {
                    const itemValue = item.value;
                    return `<p answer='${answer}'>${itemValue}</p>`
                }).join("")

                const title = `<h2>${question}</h2>`;
                const optionselection = `${moreoptions}`;
                const answers = `<h2>${answer}</h2>`;
                let sentence = title + optionselection;
                return `<div>` + sentence + '</div>';
                }

                blankquestion = []
                $('button').on('click', function (e) {
                e.preventDefault()
                let question = $('#question').val();
                let option1 = $('#option1').val();
                let option2 = $('#option2').val();
                let option3 = $('#option3').val();
                let option4 = $('#option4').val();
                let answer = $('#answer').val();

                let newQuestion = {
                    question: question,
                    options: [
                    { optionId: 1, value: option1 },
                    { optionId: 2, value: option2 },
                    { optionId: 3, value: option3 },
                    { optionId: 4, value: option4 },
                    ],
                    answer: answer,
                };

                const newQuestionHTML = convertQuestionToHTML(newQuestion);
                $('form').append(newQuestionHTML);
                  
                console.log(mapnewquestion)
        console.log(blankquestion)
                $('p').on("click", function(){
                    if( $(this).attr("answer") === $(this).text()){
                    const bottomText = `<h3>${$(this).text()} is the correct answer<h3>`;
                    $(this).parent().append(bottomText);
                    $(this).addClass('green')
                    $('h3').addClass('green')
                    }else{
                    $(this).addClass('red')
                    const bottomText = `<h3>${$(this).attr("answer")} is the correct answer <h3>`
                    $(this).parent().append(bottomText)
                    $('h3').addClass('green')
                    }
                })
                })

    });
