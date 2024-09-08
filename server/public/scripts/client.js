function onReady() {
  console.log('JavaScript is loaded!');
  FetchNumCalc();
}
let chosenOperator = '';
let result = 0;

function FetchNumCalc() {
  axios({
    method: 'GET',
    url: '/calculations',
  })
    .then(function (response) {
      const calculationsFromServer = document.querySelector('[data-testid="resultHistory"]');
      //console.log('past calculatons:', calculationsFromServer);
      calculationsFromServer.innerHTML = '';
      for (let i = 0; i < response.data.length; i++) {
        let calcResult = response.data[i];
        console.log('Calculation result:', calcResult);
        calculationsFromServer.innerHTML += `
        <p>${calcResult.numOne} ${calcResult.operator} ${calcResult.numTwo} = ${calcResult.result}</p> `;
      }
    })
    .catch(function (error) {
      console.log(`Error GETTING calculations from server`, error);
    });
}

function clickedOperator(operator) {
  chosenOperator = operator;
  console.log('operator:', chosenOperator);
}

function addCalculation(event) {
  event.preventDefault();
  const numOne = Number(document.querySelector('[data-testid="numOne"]').value);
  const numTwo = Number(document.querySelector('[data-testid="numTwo"]').value);
  console.log('numOne:', numOne);
  console.log('numTwo:', numTwo);
  console.log('chosenOperator:', chosenOperator);

  if (chosenOperator === '+') {
    result = numOne + numTwo;
  } else if (chosenOperator === '-') {
    result = numOne - numTwo;
  } else if (chosenOperator === '*') {
    result = numOne * numTwo;
  } else if (chosenOperator === '/') {
    result = numOne / numTwo;
  }

  console.log('numOne, operator, numTwo', numOne, chosenOperator, numTwo);

  const recentResultElement = document.querySelector('[data-testid="recentResult"]');
  recentResultElement.innerHTML = `<p>${numOne} ${chosenOperator} ${numTwo} = ${result}</p>`;

  //console.log('recentResultElement', recentResultElement);
  const calcObj = { numOne, numTwo, operator: chosenOperator, result };
  console.log(calcObj);
  recentResultElement.innerHTML = '';

  axios({
    method: 'POST',
    url: '/calculations',
    data: calcObj,
  })
    .then((response) => {
      FetchNumCalc();
    })
    .catch((error) => console.error('whoops, something isnt right!'));
}

// document.querySelector('[data-testid="numOne"]').value = '';
// document.querySelector('[data-testid="numTwo"]').value = '';
onReady();
