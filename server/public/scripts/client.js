function onReady() {
  console.log('JavaScript is loaded!');
  fetchNumCalc();
}
let operator = '';

// get calculation data from server
function fetchNumCalc() {
  axios({
    method: 'GET',
    url: '/calculations',
  }).then(function (response) {
    const calcData = response.data;
    //console.log('response.data', response.data);
    //console.log('Calculations data array', calcData);
    const resultHistory = document.getElementById("resultHistory");
    const recentResult = document.getElementById("recentResult");
    // console.log('resultHistory', resultHistory);
    // console.log('recentResult', recentResult);
    recentResult.innerHTML = '';
    if (calcData.length > 0) {
      recentResult.innerHTML = recentResult.innerHTML = `<h3>${calcData[calcData.length - 1].numOne} ${
        calcData[calcData.length - 1].operator
      } ${calcData[calcData.length - 1].numTwo} = ${calcData[calcData.length - 1].result}</h3>`;

    resultHistory.innerHTML = '';
      for (let calculation of calcData) {
        console.log('calculation', calculation);
        resultHistory.innerHTML += `
          <ul>
              <li>${calculation.numOne} ${calculation.operator} ${calculation.numTwo} = ${calculation.result}</li>
          </ul>`;
      }
    } else {
      console.log('No calculations to grab.');
    }
  });
}

function clickedOperator(event) {
  operator = event.target.id;
  console.log('operator:', operator);
}

function addCalculation(event) {
  event.preventDefault();
  const numOne = document.getElementById("numOne").value;
  console.log('numOne:', numOne);

  const numTwo = document.getElementById("numTwo").value;
  console.log('numOne :', numOne);
  console.log('numTwo', numTwo);

  const domCalc = { numOne, numTwo, operator };

  console.log('domCalc', domCalc);

  axios({
    method: 'POST',
    url: '/calculations',
    data: domCalc,
  })
    .then((response) => {
      fetchNumCalc();
    })
    .catch((error) => {
      console.error('whoops, something isnt right!');
    });
}

function clearInput(event) {
  document.getElementById('numOne').value = '';
  document.getElementById('numTwo').value = '';
  
}


onReady();
