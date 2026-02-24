// 검사 진행 관리
let currentQuestion = 0;
let answers = {}; // { questionId: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' }

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async function() {
    // i18n 초기화 후 질문 생성 (언어에 맞는 질문을 선택하기 위해)
    if (typeof I18n !== 'undefined') {
        await I18n.init();
    }
    questions = selectRandomQuestions();
    showQuestion(currentQuestion);

    // 언어가 변경되면 현재 질문을 현재 언어로 다시 렌더링
    window.addEventListener('i18n:changed', () => {
        // 이미 선택된 질문의 텍스트를 새 언어로 갱신
        questions = questions.map(q => {
            const lang      = I18n.lang();
            const localised = q._raw[lang] || q._raw['ko'];
            return { ...q, question: localised.question, options: localised.options };
        });
        showQuestion(currentQuestion);
    });
});

// 질문 표시
function showQuestion(index) {
    const question = questions[index];
    const lang     = (typeof I18n !== 'undefined' && I18n.isReady()) ? I18n.lang() : 'ko';

    // 질문 번호
    const labelKey = 'test.question_label';
    const label    = (typeof I18n !== 'undefined')
        ? I18n.t(labelKey, { n: index + 1 })
        : `질문 ${index + 1}`;
    document.getElementById('questionNumber').textContent = label;

    // 질문 텍스트
    document.getElementById('questionText').textContent = question.question;

    // 진행률 업데이트
    updateProgress();

    // 선택지 생성
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, optionIndex) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.setAttribute('data-value', option.value);

        if (answers[question.id] === option.value) {
            button.classList.add('selected');
        }

        button.onclick = () => selectOption(question.id, option.value, button);
        optionsContainer.appendChild(button);

        setTimeout(() => {
            button.style.animation = 'slideIn 0.5s ease';
        }, optionIndex * 100);
    });

    updateButtons();
}

// 선택지 선택
function selectOption(questionId, value, button) {
    answers[questionId] = value;

    const allButtons = button.parentElement.querySelectorAll('.option-button');
    allButtons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');

    document.getElementById('nextBtn').disabled = false;

    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        } else {
            const nextBtn = document.getElementById('nextBtn');
            nextBtn.textContent = (typeof I18n !== 'undefined')
                ? I18n.t('test.result_button')
                : '결과 보기 🎉';
            nextBtn.onclick = () => showResult();
        }
    }, 500);
}

// 이전 질문
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

// 다음 질문
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

// 진행률 업데이트
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent =
        `${currentQuestion + 1} / ${questions.length}`;
}

// 버튼 상태 업데이트
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentQuestion === 0;

    // 이전/다음 버튼 텍스트 번역
    prevBtn.textContent = (typeof I18n !== 'undefined')
        ? I18n.t('test.prev_button')
        : '← 이전';

    const currentQuestionId = questions[currentQuestion].id;
    const hasAnswer         = answers[currentQuestionId] !== undefined;

    if (currentQuestion === questions.length - 1 && hasAnswer) {
        nextBtn.textContent = (typeof I18n !== 'undefined')
            ? I18n.t('test.result_button')
            : '결과 보기 🎉';
        nextBtn.onclick  = () => showResult();
        nextBtn.disabled = false;
    } else {
        nextBtn.textContent = (typeof I18n !== 'undefined')
            ? I18n.t('test.next_button')
            : '다음 →';
        nextBtn.onclick  = () => nextQuestion();
        nextBtn.disabled = !hasAnswer;
    }
}

// 결과 계산 및 페이지 이동
function showResult() {
    if (Object.keys(answers).length < questions.length) {
        const msg = (typeof I18n !== 'undefined')
            ? I18n.t('test.alert_complete')
            : '모든 질문에 답해주세요!';
        alert(msg);
        return;
    }

    const mbtiType = calculateMBTI();
    localStorage.setItem('mbtiResult', mbtiType);
    localStorage.setItem('answers', JSON.stringify(answers));
    window.location.href = 'result.html';
}

// MBTI 타입 계산
function calculateMBTI() {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    Object.values(answers).forEach(value => { scores[value]++; });

    return (scores.E >= scores.I ? 'E' : 'I') +
           (scores.S >= scores.N ? 'S' : 'N') +
           (scores.T >= scores.F ? 'T' : 'F') +
           (scores.J >= scores.P ? 'J' : 'P');
}
