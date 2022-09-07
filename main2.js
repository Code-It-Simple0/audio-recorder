
const recordingState = "Play"

const delete_item_btn = document.querySelector('.delete_button')

const indicator = document.querySelector('.recording_state')

let all_recording_box = document.querySelector('#recordings')

let pausePlayButton = document.querySelector(".pause_play__button")

// This function produces a random audio name
const RANDOM_AUDIO_NAME = () => `Voice Rec _ ${Math.floor(Math.random()*20000)}`



// Check is media Devices is supported
const browserMedia = window.navigator.mediaDevices


// This function will be called if the user agrees to Allow Microphone
function recordStream (stream) {

	console.log(stream);
	const recorder = new MediaRecorder(stream)

	pausePlayButton.onclick = () => {

		// Check recording state
		if (pausePlayButton.innerText == "Start"){
			recorder.start()
			indicator.innerText= "Recording..."
			pausePlayButton.innerText = 'Stop'

		}else {
			recorder.stop()
			indicator.innerText = '-----------------------------'
			pausePlayButton.innerText = 'Start'
			console.log('Recording Stopped');
		}
	}

	// Collect the audio file from the recorder
	recorder.ondataavailable = ({data:file}) => {

		// convert the collected file to a URL (link)
		const audioURL = window.URL.createObjectURL(blob)

		// Create the recorded audio
		createNewAudio(RANDOM_AUDIO_NAME(),audioURL)
	}

}

function $addClass (name,element) {
	// This function collect the name of the class 
	// and adds it to the element you want
	element.classList.add(name)
}


function createNewAudio (audio_name, audio_source) {

	const audio_container = document.createElement('div')
	const empty_div = document.createElement('div')
	const p_element = document.createElement('p')
	const audio_element = document.createElement('audio')
	const delete_button = document.createElement('button')

	// Add ClassNames to newly created elements
	$addClass("recordings__item",audio_container)
	$addClass("recordings__item__inner",empty_div)


	// Add Content to the created elements
	p_element.innerText = audio_name
	audio_element.setAttribute('controls','')
	audio_element.src = audio_source
	delete_button.innerText = "Delete"

	// Map element to their boxes 1 - 1
	audio_container.appendChild(empty_div)
	empty_div.appendChild(audio_element)
	empty_div.appendChild(p_element)
	audio_container.appendChild(delete_button)

	// Create a new record
	all_recording_box.appendChild(audio_container)
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
	

}else {
	console.log(" GetUserMedia is not supported on this browser")
}

