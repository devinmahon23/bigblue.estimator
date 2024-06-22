document.addEventListener('DOMContentLoaded', function() {
    // Prepopulate the first row in the table
    addSection();

    // Attach event listeners
    document.getElementById('addSectionBtn').addEventListener('click', addSection);
    document.getElementById('calculateBtn').addEventListener('click', calculateSummary);
});

function addSection() {
    const tableBody = document.getElementById('tableBody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><input type="text" class="sectionName" placeholder="Section Name"></td>
        <td><input type="number" class="length" step="0.01" placeholder="Length"></td>
        <td><input type="number" class="width" step="0.01" placeholder="Width"></td>
        <td><input type="number" class="thickness" step="0.01" placeholder="Thickness"></td>
        <td class="area">0</td>
        <td class="boardFootage">0</td>
    `;

    tableBody.appendChild(row);
}

function calculateSummary() {
    const rows = document.querySelectorAll('#tableBody tr');
    let totalBoardFeet = 0;
    let totalSqFeet = 0;

    rows.forEach(row => {
        const length = parseFloat(row.querySelector('.length').value) || 0;
        const width = parseFloat(row.querySelector('.width').value) || 0;
        const thickness = parseFloat(row.querySelector('.thickness').value) || 0;

        const area = length * width;
        const boardFootage = area * thickness;

        row.querySelector('.area').textContent = area.toFixed(2);
        row.querySelector('.boardFootage').textContent = boardFootage.toFixed(2);

        totalBoardFeet += boardFootage;
        totalSqFeet += area;
    });

    const costPerBoardFt = parseFloat(document.getElementById('costPerBoardFt').value) || 0;
    const pricePerBoardFt = parseFloat(document.getElementById('pricePerBoardFt').value) || 0;
    const labourRate = parseFloat(document.getElementById('labourRate').value) || 0;
    const hoursExpected = parseFloat(document.getElementById('hoursExpected').value) || 0;
    const miscCosts = parseFloat(document.getElementById('miscCosts').value) || 0;

    const setsNeeded = (totalBoardFeet / 4000).toFixed(2);
    const materialCost = totalBoardFeet * costPerBoardFt;
    const labourCost = labourRate * hoursExpected;
    const quotePrice = totalBoardFeet * pricePerBoardFt;
    const companyProfit = quotePrice - materialCost - labourCost - miscCosts;

    document.getElementById('totalSqFeet').textContent = totalSqFeet.toFixed(2);
    document.getElementById('totalBoardFeet').textContent = totalBoardFeet.toFixed(2);
    document.getElementById('setsNeeded').textContent = setsNeeded;
    document.getElementById('materialCost').textContent = materialCost.toFixed(2);
    document.getElementById('labourCost').textContent = labourCost.toFixed(2);
    document.getElementById('companyProfit').textContent = companyProfit.toFixed(2);
    document.getElementById('quotePrice').textContent = quotePrice.toFixed(2);
}
