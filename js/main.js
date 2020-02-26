const DATA = {
    typeRepair: ['cosmeticRepairsRoom', 'redecorating', 'overhaul', 'eliteRepair', 'repairNewBuilding'],
    prise: [3000, 4000, 8000, 9000, 6500]
};

const DATAwall = {
    wallDecoration: ['stuccoLighthouse', 'stuccoRule', 'wallpapering', 'decorativePlaster'],
    priseWall: [1, 0.96, 0.96, 1.04]
};

const DATAfloor = {
    floorFinish: ['laminateLinoleum', 'parquetBoard'],
    priseFloor: [1, 1.08]
};

const DATAWork = {
    additionalWork: ['redevelopment', 'dismantling', 'ceiling', 'electricalPreparation', 'waterSupply'],
    priseWork: [500, 1000, 500, 250, 250]
};

const DATAOptional = {
    optionalEquipment: ['toilet', 'sink', 'heatedTowelRail', 'washer', 'bathroom', 'showerStall', 'waterHeater', 'moidodyr', 'leakageSystem', 'wallHungToilet'],
    priseOptional: [1500, 900, 1500, 1500, 3000, 5000, 5000, 1500, 12500, 3800]
};

const repairCalculator = document.querySelector('.repair-calculator');
const totalPriceSum = document.querySelector('.total_price__sum');
const roomArea = document.getElementById('roomArea');
const ceilingHeight = document.getElementById('ceilingHeight');
const constraintElem = document.querySelector('.constraint');
const overhaul = document.getElementById('overhaul');
const eliteRepair = document.getElementById('eliteRepair');
const repairNewBuilding = document.getElementById('repairNewBuilding');
const additionalWorkElem = document.querySelector('.additional-work');
const optionalEquipmentElem = document.querySelector('.optional-equipment')

let totalArea = 1;
let totalCeilingHeight = 1;
let constraint = 0;



function pressingEnter(event) {

    if (event.keyCode == 13) {
        event.preventDefault();
        totalArea = roomArea.value;
        priceCalculation();
    }

}

function conclusionTotal(result) {

    totalPriceSum.textContent = result;

}

function priceCalculation() {

    let result = 0;
    let index = 0;
    let indexWall = 0;
    let indexFloor = 0;
    let indexWork;
    let additionalWork = 0;
    let indexOptional;
    let optionalEquipment = 0;

    for (const item of repairCalculator.elements) {

        if (item.name === 'typeRepair' && item.checked) {
            index = DATA.typeRepair.indexOf(item.value);
        }

        if (item.name === 'wallDecoration' && item.checked) {
            indexWall = DATAwall.wallDecoration.indexOf(item.value);
        }

        if (item.name === 'floorFinish' && item.checked) {
            indexFloor = DATAfloor.floorFinish.indexOf(item.value);
        }

        if (item.name === 'constraint' && item.checked) {
            constraint = 500;
        } else {
            constraint = 0;
        }
        
    }

    totalArea = roomArea.value;

    if (ceilingHeight.value > 2.7) {
        totalCeilingHeight = 1 + (Math.ceil((ceilingHeight.value - 2.7) / 0.2) * 0.04);
    } else {
        totalCeilingHeight = 1;
    }

    if (overhaul.checked || eliteRepair.checked || repairNewBuilding.checked) {
        constraintElem.style.display = 'block';
        additionalWorkElem.style.display = 'block';
    } else {
        constraintElem.style.display = 'none';
        additionalWorkElem.style.display = 'none';
    }

    for (const item of additionalWorkElem.elements) {
        if (item.checked) {
            indexWork = DATAWork.additionalWork.indexOf(item.value);
            additionalWork += DATAWork.priseWork[indexWork];            
        }
    }

    for (const item of optionalEquipmentElem.elements) {
        if (item.checked) {
            indexOptional = DATAOptional.optionalEquipment.indexOf(item.value);
            optionalEquipment += DATAOptional.priseOptional[indexOptional];            
        }
    }

    result = ((((DATA.prise[index] + constraint) * totalCeilingHeight * DATAwall.priseWall[indexWall] * DATAfloor.priseFloor[indexFloor]) + additionalWork) * totalArea) + optionalEquipment;

    conclusionTotal(result);

}

repairCalculator.addEventListener('keydown', pressingEnter);

repairCalculator.addEventListener('change', priceCalculation);

priceCalculation();

