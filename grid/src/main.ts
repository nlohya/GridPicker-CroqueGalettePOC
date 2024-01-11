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

function createFixedCells(): {
  start: number;
  top: number;
  middle: number;
  bottom: number;
} {
  const nbLig = parseInt(inputRangeLigne.value);
  const nbCol = parseInt(inputRangeCol.value);

  const startCell = ((nbLig - 1) / 2) * nbCol + 1;

  const treasureCellMiddle = ((nbLig + 1) / 2) * nbCol;

  const treasureCellTop = nbCol;

  const treasureCellBottom = nbCol * nbLig;

  const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;

  cells.forEach((cell: HTMLElement, i) => {
    if (
      [
        startCell,
        treasureCellMiddle,
        treasureCellTop,
        treasureCellBottom,
      ].includes(i + 1)
    ) {
      cell.style.backgroundColor = "black";
    }
  });

  return {
    start: startCell,
    top: treasureCellTop,
    middle: treasureCellMiddle,
    bottom: treasureCellBottom,
  };
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const grid = document.querySelector(".grid")! as HTMLDivElement;

function redraw() {
  setNbColCss(rootStyleElem, parseInt(inputRangeCol.value));
  setNbRowCss(rootStyleElem, parseInt(inputRangeLigne.value));
  replaceCells(
    parseInt(inputRangeCol.value) * parseInt(inputRangeLigne.value),
    grid
  );
  createFixedCells();
}
redraw();

inputRangeCol.addEventListener("change", () => {
  afficherValueCol.innerText = inputRangeCol.value;
  redraw();
});

inputRangeLigne.addEventListener("change", () => {
  afficherValueLigne.innerText = inputRangeLigne.value;
  redraw();
});

const btnTombeCaillou = document.getElementById("btncaill");
const btnObjectifs = document.getElementById("btnobj");

btnObjectifs?.addEventListener("click", () => {
  redraw();
  let reservedPos = [...Object.values(createFixedCells())];
  let objectivesPos: Array<number> = [];

  while (objectivesPos.length < 9) {
    let rdmPos = -1;

    while (
      reservedPos.includes(rdmPos) ||
      objectivesPos.includes(rdmPos) ||
      rdmPos === -1
    ) {
      rdmPos = randomIntFromInterval(
        1,
        parseInt(inputRangeCol.value) * parseInt(inputRangeLigne.value)
      );
    }

    objectivesPos.push(rdmPos);
  }

  const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;
  objectivesPos.forEach((n) => {
    cells[n - 1].style.backgroundColor = "red";
  });
});

btnTombeCaillou?.addEventListener("click", async () => {
  let rdmPos = -1;
  redraw();

  while (
    Object.values(createFixedCells()).includes(rdmPos + 1) ||
    rdmPos === -1
  ) {
    rdmPos = randomIntFromInterval(
      1,
      parseInt(inputRangeCol.value) * parseInt(inputRangeLigne.value)
    );
    console.log("passé");
  }

  const cells = document.querySelectorAll(".cell") as NodeListOf<HTMLElement>;

  if (!cells[rdmPos]) {
    btnTombeCaillou.dispatchEvent(new Event("click"));
    return;
  }

  cells[rdmPos].style.backgroundColor = "#1eaaf1";
});
