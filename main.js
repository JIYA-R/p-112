prediction_1 = " ";
Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera=document.getElementById("Camera");

Webcam.attach( '#Camera' )

function snapshot() 
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CpqhtDRE-/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function Speak() {
    var synth=window.speechSynthesis;
    speak_data_1="The Prediction Is "+prediction_1;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1);
    utterThis.rate=0.5;
    synth.speak(utterThis);
}

function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

  function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      console.log(results);
      document.getElementById("result_hand_gesture_name").innerHTML = results[0].label;
      
      prediction_1 = results[0].label;
      
      speak();
      if(results[0].label == "happy")
      {
          document.getElementById("update_hand").innerHTML = "&#128522;";
      }
      if(results[0].label == "sad")
      {
          document.getElementById("update_hand").innerHTML = "&#128532;";
      }
      if(results[0].label == "angry")
      {
          document.getElementById("update_hand").innerHTML = "&#128548;";
      }
   
    }
  }