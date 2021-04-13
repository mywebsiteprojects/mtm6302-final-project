function startfunc() {
    const secondvisibility = localStorage.getItem("showseconds");
    const datevisibility = localStorage.getItem("showdates");
    if (secondvisibility == 'No' || secondvisibility == 'NULL') {

      const elementsecond = document.getElementById("showsecond");
      elementsecond.classList.add("d-none");
    }
    if (secondvisibility == 'Yes') {

      const elementsecond = document.getElementById("showsecond");
      elementsecond.classList.remove("d-none");
    }

    if (datevisibility == 'No' || datevisibility == 'NULL') {
      const elementdate = document.getElementById("showdate");
      elementdate.classList.add("d-none");

    }
    if (datevisibility == 'Yes') {
      const elementdate = document.getElementById("showdate");
      elementdate.classList.remove("d-none");

    }
  }



  document.getElementById("settings").addEventListener("click", myFunction);
  function myFunction() {
    var element1 = document.getElementsByName('showseconds');
    var element2 = document.getElementsByName('showdates');



    for (i = 0; i < element1.length; i++) {
      if (element1[i].checked) {
        const ele1value = element1[i].value;
        localStorage.setItem("showseconds", ele1value);
      }
    }

    for (j = 0; j < element2.length; j++) {
      if (element2[j].checked)
        localStorage.setItem("showdates", element2[j].value);
    }
  }

  var myVar = setInterval(myTimer, 1000);
  function myTimer() {
    const today = new Date();
    const day = today.getDay();
    const daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    let hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();

    const greettext = (hour < 12) ? "Good morning" : (hour < 17) ? "Good afternoon" : "Good evening";

    let prepand = (hour >= 12) ? " PM " : " AM ";
    hour = (hour >= 12) ? hour - 12 : hour;

    if (hour === 0 && prepand === ' PM ') {
      if (minute === 0 && second === 0) {
        hour = 12;
        prepand = ' Noon';
      }
      else {
        hour = 12;
        prepand = ' PM';
      }
    }
    if (hour === 0 && prepand === ' AM ') {
      if (minute === 0 && second === 0) {
        hour = 12;
        prepand = ' Midnight';
      }
      else {
        hour = 12;
        prepand = ' AM';
      }


    }
    const now = new Date();
    var dd = now.getDate()
    var yyyy = now.getFullYear();
    const month = now.toLocaleString('default', { month: 'long' })

    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var yearday = Math.floor(diff / oneDay);



    const displaytime = document.getElementById("showtime");
    const displaysecond = document.getElementById("showsecond");
    const displayprep = document.getElementById("showprep");
    const displayday = document.getElementById("showday");
    const displaydate = document.getElementById("showdate");
    const displaydaymonth = document.getElementById("showdaymonth");
    const displaydayyear = document.getElementById("showdayyear");
    const displayweekyear = document.getElementById("showweekyear");
    const displaygreet = document.getElementById("greet");

    displaytime.innerHTML = `${hour} : ${minute}  `;
    displaysecond.innerHTML = `: ${second}`;
    displayprep.innerHTML = `${prepand}`;
    displayday.innerHTML = `${daylist[day]}`;
    displaydate.innerHTML = `${month} ${dd}, ${yyyy}`;
    displaydaymonth.innerHTML = `${dd}`;
    displaydayyear.innerHTML = `${yearday}`;
    displayweekyear.innerHTML = `${ISO8601_week_no(now)}`;
    displaygreet.innerHTML = `${greettext}, it is currently`;

    startfunc();
  }


  function ISO8601_week_no(dt) {
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
  }
  myTimer();



  const url = 'https://api.nasa.gov/planetary/apod?api_key='
  const api_key = 'PyVuyKsMYJkBVznW0a2vTlUOLcw7xYiKQZECLakZ';

  const fetchNASAData = async () => {
    try {
      const response = await fetch(`${url}${api_key}`);
      const data = await response.json();
      displayData(data);
    } catch (error) {
      console.log(error)
    }
  }

  const displayData = data => {
    document.body.style.backgroundImage = "url("+data.hdurl+")";
  }

  fetchNASAData()