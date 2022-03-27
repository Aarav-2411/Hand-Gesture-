data2 = "";

Webcam.set({
    height: 300,
    width: 350,
    image_formant: 'png',
    png_quality: 90
});

Webcam.attach("#camera");

function capture(){
    Webcam.snap(function (data_uri){
        document.getElementById("result_img").innerHTML = "<img id='result_imgage' src='" +data_uri+ "'>";
    });
}

console.log("Ml5 version is", ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/e0OYVTXW8/model.json', model_loaded);

function model_loaded() {
    console.log("Model Loaded");
}

function check() {
    img = document.getElementById("result_imgage");
    classifier.classify(img, gotresult);
}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        prediction = results[0].label;
        speak();
        if (results[0].label == "Thumbs Up") {
            document.getElementById("result").innerHTML = results[0].label + " 👍";
        }
        if (results[0].label == "Nice") {
            document.getElementById("result").innerHTML = results[0].label + " 👌";
        }

        if (results[0].label == "Victory") {
            document.getElementById("result").innerHTML = results[0].label + " ✌";
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    if (prediction == "Thumbs Up") {
        var data = "The Prediction is" +prediction+ "All The Best";
    }
    if (prediction == "Nice") {
        var data = "The Prediction is" +prediction+ "This is looking Amazing";
    }

    if (prediction == "Victory") {
        var data = "The Prediction is" +prediction+ "That was a Marvelous Victory";
    }
    var utter_this = new SpeechSynthesisUtterance(data);
    synth.speak(utter_this);
}