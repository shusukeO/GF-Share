
// if(getData == true){
//     document.body.style.backgroundColor = "red";
// };

(function () {
    'use strict'

    console.log('onMessage ready');

    chrome.runtime.onMessage.addListener(

        function (message, sender, callback) {

            console.log('onMessage!');

            //callbackデータ格納変数
            var answerSum = '';

            //formタイトル取得
            var title = document.querySelector('div[role=heading]').innerText;
            answerSum += title + '\n';

            //質問アイテム取得
            var questions = document.querySelectorAll('.freebirdFormviewerViewNumberedItemContainer');

            for (var i = 0; i < questions.length; i++) {

                //問題タイトル取得
                var questionTitle = questions[i].querySelector('.freebirdFormviewerComponentsQuestionBaseTitle').innerText;
                answerSum += '--------------------\n' + questionTitle + '\n';

                //選択式問題の複数の選択肢の取得
                var answers = questions[i].querySelectorAll('.appsMaterialWizToggleRadiogroupEl, .exportToggleEl');
                if (answers.length != 0) {
                    for (var j = 0; j < answers.length; j++) {
                        if (answers[j].getAttribute('aria-disabled') == 'true') continue;
                        //それぞれの選択肢のラベル取得
                        var option = answers[j].getAttribute('data-value');
                        answerSum += option + ' ';
                        //それぞれの選択状態の取得
                        var isChecked = answers[j].getAttribute('aria-checked');
                        if (isChecked == 'true') answerSum += '○';
                        answerSum += '\n';
                    }
                    continue;
                }


                //チェックボックスの複数の選択肢の取得
                var checkboxes = questions[i].querySelectorAll('.quantumWizTogglePapercheckboxEl, .appsMaterialWizTogglePapercheckboxCheckbox, .docssharedWizToggleLabeledControl, .freebirdThemedCheckbox, .freebirdThemedCheckboxDarkerDisabled');
                if (checkboxes.length != 0) {
                    for (var j = 0; j < checkboxes.length; j++) {
                        if (checkboxes[j].getAttribute('aria-disabled') == 'true') continue;
                        var dataValue = checkboxes[j].getAttribute('data-answer-value');
                        answerSum += dataValue + ' ';

                        var isChecked = checkboxes[j].getAttribute('aria-checked');
                        if (isChecked == 'true') answerSum += '○';
                        answerSum += '\n';
                    }
                    continue;
                }

                //プルダウンの問題
                var selectOptions = questions[i].querySelectorAll('.quantumWizMenuPaperselectOption');
                if (selectOptions.length != 0) {
                    for (var j = 0; j < selectOptions.length; j++) {
                        if (selectOptions[j].getAttribute('aria-disabled') == 'true') continue;
                        var dataValue = selectOptions[j].getAttribute('data-value');
                        answerSum += dataValue + ' ';
                        var isChecked = selectOptions[j].getAttribute('aria-selected');
                        if (isChecked == 'true') answerSum += '○';
                        answerSum += '\n';
                    }
                    continue;
                }


                //記述式の問題の回答取得
                var inputAnswer = questions[i].querySelector("input[type='text']");
                if (inputAnswer != null) {
                    answerSum += inputAnswer.value + '\n';
                    continue;
                }
                //段落の問題の回答取得
                var textareaAnswer = questions[i].querySelector('textarea');
                if (textareaAnswer != null) {
                    answerSum += textareaAnswer.value + '\n';
                    continue;
                }

                //日付の問題
                var dateAnswer = questions[i].querySelector("input[type='date']");
                if (dateAnswer != null) {
                    answerSum += dateAnswer.value + '\n';
                    continue;
                }

                //時間の問題
                var timeAnswer = questions[i].querySelectorAll(".quantumWizTextinputPaperinputInput");
                if (timeAnswer != 0) {
                    answerSum += timeAnswer[0].getAttribute('data-initial-value') + ':' + timeAnswer[1].getAttribute('data-initial-value') + '\n';
                    continue;
                }

            }

            callback({ formData: answerSum });

            return true;

        }
    );
})();



