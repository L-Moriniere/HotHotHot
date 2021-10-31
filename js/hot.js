
  fetch('./values.json').then(response =>{
    return response.json();
  })
  .then (data => {

    changeValue(data,'int');
    changeValue(data,'ext');


    var tempInt = document.getElementById("intTemperature").innerHTML;
    tempInt = parseInt(tempInt.match(/\d+/)[0]);

    //TEMPERATURE INTERIEURE

    if (tempInt >= 35 ){
      changeBackground("cardInt", "#e35252");
      changeBackground("modalContenuInt", "#e35252");

      document.getElementById("alertInt").innerText="Attention il fait très chaud il y a le feu !"
      document.getElementById("infoTemperatureInt").innerText="ATTENTION ! La température intérieure est supérieure à 35°C, vérifiez qu'il n'y ait pas un feu et contactez les urgences."
      afficheModalInt();

    }
    else if (tempInt < 35 && tempInt > 25 )
    {
      changeBackground("cardInt", '#E76C6C');
      changeBackground("modalContenuInt", "#E76C6C");

      document.getElementById("alertInt").innerText="Il fait chaud, vous devriez éteindre les radiateurs !"
      document.getElementById("infoTemperatureInt").innerText="Attention ! Il fait très chaud dans la pièce, pensez à éteindre les radiateurs"
      afficheModalInt();
    }
    else if (tempInt <=15 && tempInt > 5)
    {
      changeBackground("cardInt", '#52d5e3');
      changeBackground("modalContenuInt", "#52d5e3");

      document.getElementById("alertInt").innerText="Il fait très froid ! Considérez à vous réchauffer"
      document.getElementById("infoTemperatureInt").innerText="La température intérieure est inférieure à 15°C, pensez à allumez les radiateurs et mettez un gros pull"
      afficheModalInt();
    }
    else if (tempInt <=5)
    {
      changeBackground("cardInt", '#b5f7ff');
      changeBackground("modalContenuInt", "#b5f7ff");

      document.getElementById("alertInt").innerText="Vous voulez être cryogénisé ? Allumez vite un feu !"
      document.getElementById("infoTemperatureInt").innerText="ATTENTION ! Il fait super froid, pensez à construire des murs dans votre maison et allumez un feu de camp !"
      afficheModalInt();
    }

    //TEMPERATURE EXTERIEURE

    var tempExt = document.getElementById("extTemperature").innerHTML;
    tempExt = parseInt(tempExt.match(/\d+/)[0]);

    if (tempExt >= 40 ){
      changeBackground("cardExt", "#e35252");
      changeBackground("modalContenuExt", "#e35252");

      document.getElementById("alertExt").innerText="Canicule ! Mettez vous à l'abri !"
      document.getElementById("infoTemperatureExt").innerText="ATTENTION ! C'est la canicule, ne sortez pas et mangez des glaces"
      afficheModalExt();
    }
    else if (tempExt < 40 && tempExt > 30 )
    {
      changeBackground("cardExt", '#E76C6C');
      changeBackground("modalContenuExt", "#E76C6C");

      document.getElementById("alertExt").innerText="Il fait chaud, n'oubliez pas la crème solaire et la casquette"
      document.getElementById("infoTemperatureExt").innerText="La température est élévée, pensez à mettre de la crème et évitez de sortir en milieu de journée"
      afficheModalExt();
    }
    else if (tempExt <=10 && tempExt > 2)
    {
      changeBackground("cardExt", '#1C9EAC');
      changeBackground("modalContenuExt", "#1C9EAC");

      document.getElementById("alertExt").innerText="Il fait froid ! Couvrez vous bien"
      document.getElementById("infoTemperatureExt").innerText="Oubliez pas votre bonnet et vos gants"
      afficheModalExt();
    }
    else if (tempExt <=2)
    {
      changeBackground("cardExt", '#b5f7ff');
      changeBackground("modalContenuExt", "#b5f7ff");

      document.getElementById("alertExt").innerText="Sortez les gros pulls vous allez être congelé !"
      document.getElementById("infoTemperatureExt").innerText="ATTENTION ! Températures glaciales, faites attention au verglas et tempêtes de neiges"
      afficheModalExt();
    }

    //int ou ext seulement
    function changeValue(data,endroit){
      document.getElementById(endroit+"Temperature").innerHTML = data[endroit].temperature+" °C";
      document.getElementById(endroit+"Min").innerHTML = '<i class="fas fa-chevron-down"></i> '+data[endroit].min+" °C";
      document.getElementById(endroit+"Max").innerHTML = '<i class="fas fa-chevron-up"></i> '+data[endroit].max+" °C";
    }

    function changeBackground(id, color){
      var card = document.getElementById(id);
      card.style.background = "linear-gradient(180deg, "+color+" 0%, #002A32 100%)";
    }

    function formatDate(date){
      var dd = date.getDate();
      var mm = date.getMonth()+1;
      var yyyy = date.getFullYear();
      if(dd<10) {dd='0'+dd}
      if(mm<10) {mm='0'+mm}
      date = dd+'/'+mm;
      return date
    }



    function Last7Days () {
      var result = [];
      for (var i=7; i>0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push( formatDate(d) )
      }

      return(result);
    }

    var last7days = Last7Days();

    var ctx = document.getElementById('historique').getContext('2d');
    var labels = last7days;
    var lineInt = new Chart(ctx, {
      type: 'line',

      data: {
        labels: labels,
        datasets: [{
          label: 'Température interieure',
          data: data.int.values,
          fill: false,
          borderColor: '#6498A3',
          tension: 0.6,
          backgroundColor: '#6498A3',
          pointRadius : 0
        },
        {
          label: 'Température extérieure',
          data: data.ext.values,
          fill: false,
          borderColor: '#A36464',
          tension: 0.6,
          backgroundColor: '#A36464',
          pointRadius : 0
        }]
      },
      options:
      {
        scales:
        {
          x :
          {
            grid:
            {
              display: false,
            },
            ticks:
            {
              color: 'white',
              padding: 10
            }
          },
          y : {
            grid: {
              color: '#005566',
              lineWidth: 2,
              tickLength: 0
            },
            ticks: {
              color: 'white',
              padding: 10
            }
          }
        },
        plugins:
        {
          legend:
          {
            maxWidth: 200,
            position : 'bottom',
            labels:
            {
              color: '#fff',
              font:
              {
                family : 'Lato',
                size: 16
              }
            }
          }
        }
      }
    });

  }).catch(err =>{
    console.log("erreur : "+err);
  });


var modalInt = document.getElementById("modalInt");
var modalExt = document.getElementById("modalExt");
const body = document.querySelector("body");

// When the user clicks on the button, open the modal
function afficheModalInt() {
  modalInt.style.display = "block";
  body.style.overflow = "hidden";
}

function afficheModalExt() {
  modalExt.style.display = "block";
  body.style.overflow = "hidden";
}

// When the user clicks on <span> (x), close the modal
function closeModalInt() {
  modalInt.style.display = "none";
  body.style.overflow = "scroll";
}

function closeModalExt() {
  modalExt.style.display = "none";
  body.style.overflow = "scroll";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalInt) {
    modalInt.style.display = "none";
    body.style.overflow = "scroll";
  }
  else if (event.target == modalExt) {
    modalExt.style.display = "none";
    body.style.overflow = "scroll";
  }
}
