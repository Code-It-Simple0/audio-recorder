// Javascript
const indicator = document.querySelector('.recording_state')
let all_recording_box = document.querySelector('#recordings')
let pausePlayButton = document.querySelector(".pause_play__button")
// This function produces a random audio name
const RANDOM_AUDIO_NAME = () => `Voice Rec _ ${Math.floor(Math.random()*20000)}`

// Check is media Devices is supported
const browserMedia = window.navigator.mediaDevices

// This function will be called if the user agrees to Allow Microphone
function recordStream (stream) {

	const recorder = new MediaRecorder(stream)

	pausePlayButton.onclick = () => {
		// Check recording state
		if (pausePlayButton.innerText == "Start"){
			recorder.start()
			indicator.innerText= "Recording..."
			pausePlayButton.innerText = 'Stop'
		} else {
			recorder.stop()
			indicator.innerText = '---------------------------'
			pausePlayButton.innerText = 'Start'
		}
	}
	// Collect the audio file from the recorder
	recorder.ondataavailable = ({data:file}) => {

		// convert the collected file to a URL (link)
		const audioURL = window.URL.createObjectURL(file)

		// Create the recorded audio
		createNewAudio(RANDOM_AUDIO_NAME(),audioURL)
	}
}

function createNewAudio (audio_name, audio_source) {
	// Add New Element to DOM
	all_recording_box.innerHTML += `<div class="recordings__item">
							<div class="recordings__item__inner">
								<p>${audio_name}</p>
								<audio controls src=${audio_source}></audio>
							</div>
						</div>`
}

// Check if your browser supports getUserMedia 
if( browserMedia && browserMedia.getUserMedia ){
	console.log(" GetUserMedia is suported on this browser ");

	browserMedia.getUserMedia({
		// we select only audio from our browser media
		audio:true,
	})
	// The recordStream function handles the core recording functionality
	.then(recordStream)
	.catch((error) => console.log(error))

} else {
	console.log(" GetUserMedia is not supported on this browser")
}
// Check main2.js for a better implementation of adding element to DOM