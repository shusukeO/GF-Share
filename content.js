'use strict';
// if(getData == true){
//     document.body.style.backgroundColor = "red";
// };

chrome.runtime.onMessage.addListener(
    function(message, sender, callback){

        //callbackデータ格納変数
        var answerSum = '';

        var roleTitle = document.querySelector('div[role=heading').innerText;
        console.log(roleTitle);

        //formタイトル取得
        var title = document.querySelector('.freebirdFormviewerViewHeaderTitle, .exportFormTitle, .freebirdCustomFont').innerText;
        answerSum += title + '\n';

        //質問アイテム取得
        var questions = document.querySelectorAll('.freebirdFormviewerViewNumberedItemContainer');

        for(var i = 0; i < questions.length; i++){

            console.log(questions[i].querySelector('div[role=heading]'));


            //質問文取得
            var question = questions[i].querySelector('.freebirdFormviewerComponentsQuestionBaseTitle, .exportItemTitle, .freebirdCustomFont').innerText;
            answerSum += '\n' + question + '\n';

            //記述式の問題の回答取得
            var inputAnswer = questions[i].querySelector("input[type='text']");
            if(inputAnswer!=null){
                answerSum += inputAnswer.value + '\n';
                continue;
            }
            //段落の問題の回答取得
            var textareaAnswer = questions[i].querySelector('textarea');
            if(textareaAnswer!=null){
                answerSum += textareaAnswer.value + '\n';
                continue;
            }

            //チェックボックスの複数の選択肢の取得
            var checkboxes = questions[i].querySelectorAll('.quantumWizTogglePapercheckboxEl, .appsMaterialWizTogglePapercheckboxCheckbox, .docssharedWizToggleLabeledControl, .freebirdThemedCheckbox, .freebirdThemedCheckboxDarkerDisabled');
            if(checkboxes.length != 0){
                for(var j = 0; j < checkboxes.length; j++){
                    var dataValue = checkboxes[j].getAttribute('data-answer-value');
                    answerSum += dataValue + ' ';
                    var isChecked = checkboxes[j].getAttribute('aria-checked');
                    if(isChecked == 'true') answerSum += '○';
                    answerSum += '\n';
                }
                continue;
            }
           
            //選択式問題の複数の選択肢の取得
            var answers  = questions[i].querySelectorAll('.appsMaterialWizToggleRadiogroupEl, .exportToggleEl, .isCheckedNext');
            for(var j = 0; j < answers.length; j++){
                //それぞれの選択肢のラベル取得
                var option = answers[j].getAttribute('data-value');
                answerSum += option + ' ';
                //それぞれの選択状態の取得
                var isChecked = answers[j].getAttribute('aria-checked');
                if(isChecked == 'true') answerSum += '○';
                answerSum += '\n';
            }
        }

        callback({formData: answerSum});

    }
);

