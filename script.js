let beta, gamma, pression=0, gameover=false;

window.onload = function () {
  if ( window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === 'function' ){
      const banner = document.createElement('div');
      banner.innerHTML = `<div id="autorisation" style="z-index: 1; position: absolute; width: 100%; background-color:#000; color: #fff"><p style="padding: 10px">Cliquez ici pour autoriser l'accès à votre capteur de mouvements.</p></div>`;
      banner.onclick = clickRequestDeviceOrientationEvent;
      document.querySelector('body').appendChild(banner)
  }
}


function clickRequestDeviceOrientationEvent() {

  window.DeviceOrientationEvent.requestPermission()
      .then(response => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation',function (e) {
            document.getElementById('autorisation').style.display = 'none';
            beta=(Math.round(e.beta));
            gamma=(Math.round(e.gamma));
            increasePression();
            changeColor();

              }
          )} else {
          alert("Désolé, vous ne pouvez pas jouer à ce jeu car votre appareil n'a pas de capteur de mouvement.")
      }
  })
      .catch(e => {
        console.error(e)
  })
}


// document.getElementById("start").addEventListener("click", function() {
// refreshInfo();
// });


// function refreshInfo() {
//  pression=0;
//}


function increasePression() {

    document.getElementById('beta').innerHTML = ('Roulis : '+beta);
    document.getElementById('gamma').innerHTML = ('Tangage : '+gamma);
    document.getElementById('pression').innerHTML = ('Pression : '+pression);

    if (gameover) {
      document.getElementById('pression').style.color = "purple";
      document.getElementById('gameover').style.visibility = "visible";
      pression = 0;
      return;
    } else {
      if((beta >= 5 && beta < 10) || (beta <= -5 && beta > -10))
      {
        pression+=2;
      }
      else if((beta >= 10 && beta < 15) || (beta <= -10 && beta > -15))
      {
        pression+=4;
      }
      else if(beta >= 15 || beta <= -15)
      {
        pression+=6;
      }
      else
      {
        pression+=1;
      }
      if((gamma >= 10 && gamma < 15) || (gamma <= -10 && gamma > -15))
      {
        pression+=2;
      }
      else if((gamma >= 15 && gamma < 30) || (gamma <= -15 && gamma > -30))
      {
        pression+=4;
      }
      else if(gamma >= 30 || gamma <= -30)
      {
        pression+=6;
      }
      else
      {
        pression+=1;
      }
  }
}


function changeColor () {

  if (pression >= 0 && pression < 500){
    document.getElementById('pression').style.color = "brown";
    }

  else if (pression >= 500 && pression <= 2000) {
    document.getElementById('pression').style.color = "red";
    }

  else if (pression > 2000) {
    gameover = true;
    }
  }

function changeSound() {
    var audio = new Audio('assets/son_hard.wav');
    audio.play();
}

/*
Solution pour récupérer les paramètres de jeu depuis la fenêtre Options
you can very easily use this to re-use the value of the variable in another function.
Use this in source window.var1= oEvent.getSource().getBindingContext();
Get value of var1 in destination var var2= window.var1;
*/
