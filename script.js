let timer;
let isRunning = false;
let currentMode = 'work';
let currentMinutes;
let currentSeconds = 0;

// DOM要素の取得
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('workTime');
const breakTimeInput = document.getElementById('breakTime');

// タイマーの更新
function updateTimer() {
    if (currentSeconds === 0) {
        if (currentMinutes > 0) {
            currentMinutes--;
            currentSeconds = 59;
        } else {
            // モードの切り替え
            currentMode = currentMode === 'work' ? 'break' : 'work';
            currentMinutes = currentMode === 'work' ? parseInt(workTimeInput.value) : parseInt(breakTimeInput.value);
            currentSeconds = 0;
            alert(currentMode === 'work' ? '休憩時間終了！作業に戻りましょう！' : '作業時間終了！休憩しましょう！');
        }
    } else {
        currentSeconds--;
    }

    // 表示の更新
    timerDisplay.textContent = `${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
}

// タイマーの開始
function startTimer() {
    if (!isRunning) {
        currentMode = 'work';
        currentMinutes = parseInt(workTimeInput.value);
        currentSeconds = 0;
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

// タイマーの停止
function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

// タイマーのリセット
function resetTimer() {
    stopTimer();
    currentMode = 'work';
    currentMinutes = parseInt(workTimeInput.value);
    currentSeconds = 0;
    timerDisplay.textContent = `${currentMinutes.toString().padStart(2, '0')}:00`;
}

// イベントリスナーの設定
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// ページ読み込み時の初期化
resetTimer();
