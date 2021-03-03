fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=68cbf1341d19c8d9fe9386af25ae8a00'
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
  