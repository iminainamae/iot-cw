//loc=99
const humidityValue = 50; 
const lightValue = 75;
const temperatureValue = 25;

// Update values and appearance
document.getElementById('hum').innerText = `${humidityValue}%`;
document.getElementById('light').innerText = lightValue;
document.getElementById('temp').innerText = `${temperatureValue} &#8451;`;

const firebaseConfig = {
    apiKey: "AIzaSyAqYP5Lv__X_o8VRc1BRQYSjiQFBHPdL98",
    authDomain: "iotrd10916.firebaseapp.com",
    dbURL: "https://iotrd10916-default-rtdb.firebaseio.com",
    projectId: "iotrd10916",
    storageBucket: "iotrd10916.appspot.com",
    messagingSenderId: "458806312283",
    appId: "1:458806312283:web:573baf0dfe4a2c4305ae7e"
  };

firebase.initializeApp(firebaseConfig);
    // getting ref to db
    var db = firebase.database();

    //getting ref to data
    var dataRef1 = db.ref('dist');
    var dataRef2 = db.ref('hum');
    var dataRef3 = db.ref('light');
    var dataRef4 = db.ref('sound');
    var dataRef5 = db.ref('temp');

    //fetch data  
    dataRef1.on('value', function(getdata1) {
        var distance = getdata1.val();
        document.getElementById('dist').innerHTML = distance + "cm";
    });
    
    dataRef2.on('value', function(getdata2) {
        var hum = getdata2.val();
        var range = [20, 60];
        document.getElementById('hum').innerHTML = hum + "%";
        updateBoxColor('hum', hum, range);
        updateGauge(hum, range);
    });
    
    dataRef3.on('value', function(getdata3) {
        var light = getdata3.val();
        var range = [210, 960];
        document.getElementById('light').innerHTML = light;
        updateBoxColor('light', light, range);
        updateVerticalBarLight(light, range);
    });
    
    dataRef4.on('value', function(getdata4) {
        var sound = getdata4.val();
        var range = [500, 600];
        document.getElementById('sound').innerHTML = sound;
        updateBoxColor('sound', sound, range);
        updateVerticalBarSound(sound, range);
    });
    
    dataRef5.on('value', function(getdata5) {
        var temp = getdata5.val();
        var range = [15, 30];
        document.getElementById('temp').innerHTML = temp + "&#8451;";
        updateBoxColor('temp', temp, range);
        updateTemperatureBar(temp, range);
    });
    
    //highlight red
    function updateBoxColor(boxId, value, range) {
        var boxElement = document.getElementById(boxId).closest('.data-item');
        if (value < range[0] || value > range[1]) {
            boxElement.style.border = '2px solid red';
        } else {
            boxElement.style.border = '2px solid white';
        }
    }

    //update charts
    function updateTemperatureBar(value, range) {
        var tempFill = document.getElementById('tempFill');
        tempFill.style.width = `${((value - range[0]) / (range[1] - range[0])) * 100}%`;
    }

    function updateGauge(value, range) {
        var humGaugeFill = document.getElementById('humGaugeFill');
        humGaugeFill.style.width = `${((value - range[0]) / (range[1] - range[0])) * 100}%`;
    }

    function updateVerticalBarLight(value, range) {
        var lightVerticalFill = document.getElementById('lightVerticalFill');
        lightVerticalFill.style.height = `${(((value - range[0]) / (range[1] - range[0])) * 100)}%`;
    }

    function updateVerticalBarSound(value, range) {
        var soundVerticalFill = document.getElementById('soundVerticalFill');
        soundVerticalFill.style.height = `${(((value - range[0]) / (range[1] - range[0])) * 100)}%`;
    }