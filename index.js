const chartElement = document.querySelector("#chart-entry");
const dayOfTheWeek = new Date().getDay();

/**
 * @typedef {Object} ChartData
 * @property {string} day
 * @property {number} amount
 */

const data = [
    {
      "day": "mon",
      "amount": 17.45
    },
    {
      "day": "tue",
      "amount": 34.91
    },
    {
      "day": "wed",
      "amount": 52.36
    },
    {
      "day": "thu",
      "amount": 31.07
    },
    {
      "day": "fri",
      "amount": 23.39
    },
    {
      "day": "sat",
      "amount": 43.28
    },
    {
      "day": "sun",
      "amount": 25.48
    }
]

const dayLookup = {
    1 : "mon",
    2 : "tue",
    3 : "wed",
    4 : "thu",
    5 : "fri",
    6 : "sat",
    0 : "sun",
}


// Determine the max value
let maxValue = setMaxValue(data)



/**
 * This will dynamically create a new column in our chart element 
 * @param {number} data 
 * @param {string} label 
 * @param {number} index This parameter is to calculate the current day for highlight
 * @param {HTMLDivElement} parent 
 * 
 * 
 * @example 
 * //The resulting markup will look like this
 *   <div class="expense-component__chart-column">
 *      <div class="expense-component__bar" style="height: 50%;">
 *          <div class="expense-component__pop-over">$52.36</div>
 *       </div>
 *       <div class="expense-component__label">mon</div>
 *   </div>
 * 
 */

function createColumn(columnData, label, index, parent) {
    const today = dayLookup[dayOfTheWeek] === label;
    
    // Create the wrapper column
    const column = document.createElement('div');
    column.classList.add('expense-component__chart-column');

    // Create the colored bar
    const bar = document.createElement('div');
    bar.classList.add('expense-component__bar');
    bar.style.height = ((columnData / maxValue) * 100) + '%';

 
    // Create the data that pops over the bar
    const barPopover = document.createElement('div');
    barPopover.classList.add('expense-component__pop-over');
    barPopover.innerText = "$" + columnData;
    
    // Nest the popover within the bar
    bar.appendChild(barPopover);

    if (today) {
        bar.classList.add("expense-component__bar--green");
    }

    bar.addEventListener('click', (event) => {
        event.preventDefault();

        barPopover.classList.toggle("expense-component__pop-over--visible");
    });

    // Create the label that appears under the bar
    const text = document.createElement('div');
    text.classList.add('expense-component__label');
    text.innerText = label;

    // Add all the element to the column wrapper
    column.appendChild(bar);
    column.appendChild(text);

    // Inject into our chart element
    parent.appendChild(column);
}

/**
 * 
 * @param {Array<ChartData>} dataset 
 * @returns 
 */
function setMaxValue(dataset) {
    let max = 0;
    dataset.forEach((el) => { 
        if (el.amount > max) {
            max = el.amount;
        }
    });

    return max;
};


data.forEach((el, index) => {

    createColumn(el.amount, el.day, index, chartElement);
});
