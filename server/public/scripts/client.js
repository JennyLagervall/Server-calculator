function onReady() {
  console.log('JavaScript is loaded!');
  FetchNumCalc();
}
let chosenOperator = '';
let result = 0;



  
  //   
  //     //const calculationsFromServer = document.querySelector('[data-testid="resultHistory"]');
  //     //console.log('past calculatons:', calculationsFromServer);
      
  //     .then((response) => {
  //     const calcData = response.data;
  //     console.log('Calculations data array', calcData);
  //     const calcHistory = document.getElementById('resultHistory');
  //     const calcRecent = document.getElementById('recentResult');

  //     // calcRecent.innerHTML = `<h2>${calcData[calcData.length - 1].result}</h2>`;
  //     // calcHistory.innerHTML = '';
  //     calculationsFromServer.innerHTML = ''; // this is calc history not from server
  //     for (let i = 0; i < response.data.length; i++) {
  //       let calcResult = response.data[i];
  //       console.log('Calculation result:', calcResult);
  //       calculationsFromServer.innerHTML += `
  //       <p>${calcResult.numOne} ${calcResult.operator} ${calcResult.numTwo} = ${calcResult.result}</p> `;
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(`Error GETTING calculations from server`, error);
  //   })
// get calculation data from server
  function FetchNumCalc() {
    axios({
      method: 'GET',
      url: '/calculations',
    }).then(function (response) {
      const calcData = response.data;
      console.log('Calculations data array', calcData);
      const calcHistory = document.getElementById('resultHistory');
      calcHistory.innerHTML = '';
      for (let calc of calcData) {
        console.log('calculation obj', calc);
        calcHistory.innerHTML += `
          <ul>
              <li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>
          </ul>`;
      }
    });


    
    function clickedOperator(event) {
      chosenOperator = operator;
      console.log('operator:', chosenOperator); // needs edit
    }
    // function setOperator(event) {
    //    event.preventDefault();
    //   console.log(event);
    //   operator = event.target.id;
    //  }
    // based on: <button type="button" id="+" onclick="setOperator(event)">+</button>

    // function addCalculation(event) {
    //   event.preventDefault();
    //   const numOne = Number(document.querySelector('[data-testid="numOne"]').value);
    //   const numTwo = Number(document.querySelector('[data-testid="numTwo"]').value);

    //   console.log('numOne:', numOne);
    //   console.log('numTwo:', numTwo);
    //   console.log('chosenOperator:', chosenOperator);

    //   console.log('numOne, operator, numTwo', numOne, chosenOperator, numTwo);

    //   const recentResultElement = document.querySelector('[data-testid="recentResult"]');
    //   recentResultElement.innerHTML = `<p>${numOne} ${chosenOperator} ${numTwo} = ${result}</p>`;

    //   //console.log('recentResultElement', recentResultElement);
    //   const calcObj = { numOne, numTwo, operator: chosenOperator, result };
    //   // shouldn' have result here bc calculations on back-end
    //   console.log(calcObj);
    //   recentResultElement.innerHTML = '';

    //   axios({
    //     method: 'POST',
    //     url: '/calculations',
    //     data: calcObj,
    //   })
    //     .then((response) => {
    //       FetchNumCalc();
    //     })
    //     .catch((error) => console.error('whoops, something isnt right!'));
    // }

    function clearInput(event) {
      document.querySelector('[data-testid="numOne"]').value = '';
      document.querySelector('[data-testid="numTwo"]').value = '';
    }

    onReady();

    // function addCalculation(event) {
    //   event.preventDefault();
    //   console.log('add my calculation');
    //   //get our form values from user interaction
    //   const numOneValue = document.getElementById('numOneInput').value;
    //   const numTwoValue = document.getElementById('num-two-input').value;
    //   //build a calculation object
    //   const newCalculation = {
    //     numOne: numOneValue,
    //     numTwo: numTwoValue,
    //     operator: operator, //this is initialized as a '+' global variable
    //   };

    //   console.log('newCalculation', newCalculation);
    //   //send a POST request to server
    //   axios.post('/calculations', newCalculation).then((response) => {
    //     console.log('successful post');
    //     fetchCalculations();
    //   });
  }
