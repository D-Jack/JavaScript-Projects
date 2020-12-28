let currResult = 0;
let dataentries = [];
outputResult(currResult, "its on");

function getThegivenNumber() {
  return parseInt(userInput.value);
}
function writetheoutput(prevResult, operator, givenNumber) {
  const description = `(${prevResult} ${operator} ${givenNumber})`;
  outputResult(currResult, description);
}

function writetolog(operationIdentifier, prevResult, givenNumber, currResult) {
  const dataentry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: givenNumber,
    result: currResult,
  };
  dataentries.push(dataentry);
  console.log(dataentries);
}
function add() {
  const givenNumber = getThegivenNumber();
  const prevResult = currResult;
  currResult = currResult + givenNumber;
  writetheoutput(prevResult, "+", givenNumber);

  writetolog("ADD", prevResult, givenNumber, currResult);
  if (
    currOperator !== "ADD" &&
    currOperator !== "SUBTRACT" &&
    currOperator !== "MULTIPLE" &&
    currOperator !== "DIVIDE"
  ) {
  }
}
function subtract() {
  const givenNumber = getThegivenNumber();
  const prevResult = currResult;
  currResult = currResult - givenNumber;
  writetheoutput(prevResult, "-", givenNumber);
  writetolog("SUB", prevResult, givenNumber, currResult);
}
function multiply() {
  const givenNumber = getThegivenNumber();
  const prevResult = currResult;
  currResult = currResult * givenNumber;
  writetheoutput(prevResult, "*", givenNumber);
  writetolog("MUL", prevResult, givenNumber, currResult);
}
function divide() {
  const givenNumber = getThegivenNumber();
  const prevResult = currResult;
  currResult = currResult / givenNumber;
  writetheoutput(prevResult, "/", givenNumber);
  writetolog("DIV", prevResult, givenNumber, currResult);
}
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
