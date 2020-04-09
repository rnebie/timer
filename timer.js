class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}

		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}
	start = () => {
		if (this.onStart) {
			this.onStart(this.timeRemaining);
		}

		this.tick(); //we call it manually to avoid 1 sec delay
		this.interval = setInterval(this.tick, 50); //50 millisec
	};

	tick = () => {
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemaining = this.timeRemaining - 0.05; //50 millsec
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
		}
	};

	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemaining(time) {
		return (this.durationInput.value = time.toFixed(2));
	}

	pause = () => {
		clearInterval(this.interval);
	};
	onDurationChange() {}
}
