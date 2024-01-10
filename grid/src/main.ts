const inputRangeCol: HTMLInputElement = document.getElementById(
  "nbcol"
)! as HTMLInputElement;
const inputRangeLigne: HTMLInputElement = document.getElementById(
  "nbl"
)! as HTMLInputElement;

const afficherValueCol = document.getElementById("value_col")!;
const afficherValueLigne = document.getElementById("value_lig")!;

afficherValueCol.innerText = inputRangeCol.value;
afficherValueLigne.innerText = inputRangeLigne.value;

const rootStyleElem = document.querySelector(":root");

function setNbColCss(rootStyleElem: any, amount: number) {
  rootStyleElem.style.setProperty("--nb-col", amount);
}

function setNbRowCss(rootStyleElem: any, amount: number) {
  rootStyleElem.style.setProperty("--nb-lig", amount);
}

function replaceCells(amount: number, where: HTMLDivElement) {
  where.innerHTML = "";
  for (let i = 0; i < amount; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    where.appendChild(cell);
  }
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const grid = document.querySelector(".grid")! as HTMLDivElement;
replaceCells(
  parseInt(inputRangeCol.value) * parseInt(inputRangeLigne.value),
  grid
);
setNbColCss(rootStyleElem, parseInt(inputRangeCol.value));
setNbRowCss(rootStyleElem, parseInt(inputRangeLigne.value));

inputRangeCol.addEventListener("change", () => {
  afficherValueCol.innerText = inputRangeCol.value;
  setNbColCss(rootStyleElem, parseInt(inputRangeCol.value));
  replaceCells(
    parseInt(inputRangeCol.value) * parseInt(inputRangeLigne.value),
    grid
  );
});

inputRangeLigne.addEventListener("change", () => {
  afficherValueLigne.innerText = inputRangeLigne.value;
  setNbRowCss(rootStyleElem, parseInt(inputRangeLigne.value));
  replaceCells(
    parseInt(inputRangeCol.value) * parseInt(inputRangeLigne.value),
    grid
  );
});

const caseBtn = document.querySelector("button")!;
caseBtn.addEventListener("click", () => {
  const cells = document.querySelectorAll(".cell")!;
  cells.forEach((cell) => {
    cell.classList.remove("selected");
  });
  let curr = randomIntFromInterval(0, cells.length - 1);
  cells[curr].classList.add("selected");
  setTimeout(() => {
    cells[curr].classList.remove("selected");
    curr = randomIntFromInterval(0, cells.length);
    cells[curr].classList.add("selected");

    setTimeout(() => {
      cells[curr].classList.remove("selected");
      curr = randomIntFromInterval(0, cells.length);
      cells[curr].classList.add("selected");

      setTimeout(() => {
        cells[curr].classList.remove("selected");
        curr = randomIntFromInterval(0, cells.length);
        cells[curr].classList.add("selected");

        setTimeout(() => {
          cells[curr].classList.remove("selected");
          curr = randomIntFromInterval(0, cells.length);
          cells[curr].classList.add("selected");
        }, 200);
      }, 200);
    }, 200);
  }, 200);
});
