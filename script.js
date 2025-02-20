const allPomodoroImages = document.querySelectorAll('.pomodoro img');
const allPomodoroDives = document.querySelectorAll('.pomodoro');
const startBtn = document.querySelector('.start__btn');
const resetBtn = document.querySelector('.reset__btn');
const timerTitle = document.querySelector('.timer__title');
const timeMinutes = document.querySelector('.time__minutes');
const timeSeconds = document.querySelector('.time__seconds');

let workTime;
let breakTime;
let remainingTime;
let isWorkSession = true;
let cycleCount = 0;
let timer;

const setProperImage = () => {
	if (window.innerWidth >= 768) {
		allPomodoroImages.forEach((image) => {
			image.setAttribute('src', './images/tomato-medium-icon.svg');
		});
	}
};

const startStudyTime = () => {
	workTime = document.querySelector('.study__time').value * 60;
	breakTime = document.querySelector('.break__time').value * 60;

	if (workTime <= 0 || breakTime <= 0) return;

	isWorkSession = true;
	timerTitle.textContent = 'Czas nauki!';
	cycleCount = 0;
	remainingTime = workTime;
	countdown();
};

const countdown = () => {
	if (cycleCount >= 4 && !isWorkSession) {
		clearTimeout(timer);
		timerTitle.textContent =
			'Czas na odpoczynek (przy domyślnym czasie 20-30 min)';
		return;
	}

	let minutes = String(Math.floor(remainingTime / 60));
	let seconds = String(remainingTime % 60);
	if (seconds <= 9) {
		seconds = `0${seconds}`;
	}
	timeMinutes.textContent = minutes;
	timeSeconds.textContent = seconds;

	if (remainingTime > 0) {
		remainingTime--;
		timer = setTimeout(countdown, 1000);
	} else {
		isWorkSession = !isWorkSession;

		if (!isWorkSession) {
			allPomodoroDives[cycleCount].style.filter = 'None';
			remainingTime = breakTime;
			timerTitle.textContent = 'Czas na odpoczynek!';
		} else {
			cycleCount++;
			remainingTime = workTime;
			timerTitle.textContent = 'Czas na naukę !';
		}

		countdown();
	}
};

const reset = () => {
	clearTimeout(timer);
	timeMinutes.textContent = '00';
	timeSeconds.textContent = '00';
	let workTimeInput = document.querySelector('.study__time');
	let breakTimeInput = document.querySelector('.break__time');
	workTimeInput.value = 25;
	breakTimeInput.value = 5;
	startBtn.style.opacity = 1;
	startBtn.removeAttribute('disabled');
	allPomodoroDives.forEach((div) => {
		div.style.filter = 'sepia()';
	});
};

document.addEventListener('DOMContentLoaded', setProperImage);
startBtn.addEventListener('click', () => {
	startStudyTime();
	startBtn.style.opacity = 0.5;
	startBtn.setAttribute('disabled', 'true');
});
resetBtn.addEventListener('click', reset);
