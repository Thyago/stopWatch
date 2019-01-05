class StopWatch {

	constructor(baseElement) {
		this.startStopBtnEl = null;
		this.resetBtnEl = null;
		this.recordTimeBtnEl = null;
		this.pastTimesListEl = null;
		this.timerEl = null;
		this.timer = 0.00;
		this.timerInterval = null;
		
		this.init(baseElement);
	}
	
	init(baseElement) {
		this.render(baseElement);
		this.handleEvents();
		this.reset();
	};	
	
	render(baseElement) {
		baseElement.innerHTML = '';
		
		this.timerEl = document.createElement('div');
		this.timerEl.classList.add('timer');
		
		const buttonsAreaEl = document.createElement('div');
		buttonsAreaEl.classList.add('buttons-area');
		
		this.startStopBtnEl = document.createElement('button');
		this.startStopBtnEl.classList.add('startStop-btn');
		this.startStopBtnEl.innerHTML = 'Start/Stop';
		
		this.resetBtnEl = document.createElement('button');
		this.resetBtnEl.classList.add('reset-btn');
		this.resetBtnEl.innerHTML = 'Reset';
		
		this.recordTimeBtnEl = document.createElement('button');
		this.recordTimeBtnEl.classList.add('recordTime-btn');
		this.recordTimeBtnEl.innerHTML = 'Record Time';
		
		buttonsAreaEl.appendChild(this.startStopBtnEl);
		buttonsAreaEl.appendChild(this.resetBtnEl);
		buttonsAreaEl.appendChild(this.recordTimeBtnEl);
		
		const pastTimesEl = document.createElement('div');
		pastTimesEl.classList.add('past-times-area');
		
		const pastTimesTitleEl = document.createElement('h2');
		pastTimesTitleEl.classList.add('past-times-title');
		pastTimesTitleEl.innerHTML = 'Past Times';
		
		pastTimesEl.appendChild(pastTimesTitleEl);
		
		this.pastTimesListEl = document.createElement('ul');
		this.pastTimesListEl.classList.add('past-times-list');
		
		pastTimesEl.appendChild(this.pastTimesListEl);
		
		baseElement.appendChild(this.timerEl);
		baseElement.appendChild(buttonsAreaEl);
		baseElement.appendChild(pastTimesEl);
	};
		  
	handleEvents() {
		const instance = this;
		this.startStopBtnEl.addEventListener('click', function() { instance.startStop(); });
		this.resetBtnEl.addEventListener('click', function() { instance.reset(); });
		this.recordTimeBtnEl.addEventListener('click', function() { instance.recordTime(); });
		document.addEventListener('keyup', function(e) {
			const character = String.fromCharCode(e.which);
			console.log(character);
			switch (character.toUpperCase()) {
				case 'S': instance.startStop(); break;
				case 'R': instance.reset(); break;
				case 'T': instance.recordTime(); break;				
			};
		}, false);
	};
	
	startStop() {
		if (!this.timerInterval) {
			const instance = this;
			this.timerInterval = setInterval(function() {
				instance.timer += 0.01;
				instance.refreshTimer();
			}, 10);
		} else {
			clearInterval(this.timerInterval);	
			this.timerInterval = null;
		}
	};
	
	reset() {
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
			this.timerInterval = null;
		}		
		this.timer = 0;
		this.refreshTimer();
		this.clearRecords();
	};
	
	recordTime() {
		const pastTimesListItemEl = document.createElement('li');
		pastTimesListItemEl.innerHTML = this.timer.toFixed(2);
		this.pastTimesListEl.appendChild(pastTimesListItemEl);
	};
	
	clearRecords() {
		this.pastTimesListEl.innerHTML = '';
	};
	
	refreshTimer() {
		this.timerEl.innerHTML = this.timer.toFixed(2);
	};
};