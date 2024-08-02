document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('input', calculateTotals);

    function calculateTotals() {
        let grandTotal = 0;
        let subjects = 6; 
        document.querySelectorAll('.marks-table tbody tr').forEach(row => {
            const theoryMarks = parseFloat(row.querySelector('.theory').value) || 0;
            const practicalMarks = parseFloat(row.querySelector('.practical').value) || 0;
            const totalMarks = theoryMarks + practicalMarks;
            row.querySelector('.total').textContent = totalMarks;
            grandTotal += totalMarks;
        });
        document.getElementById('grand-total').textContent = grandTotal;
        document.getElementById('total-in-words').textContent = numberToWords(grandTotal);
        const percentage = subjects ? (grandTotal / (subjects * 100)) * 100 : 0;
        document.getElementById('percentage').textContent = percentage.toFixed(2) + "%";
        document.getElementById('grade').textContent = getGrade(percentage);
        document.getElementById('result').textContent = grandTotal > 250 ? 'PASS' : 'FAIL';
    }
    function getGrade(percentage) {
        if (percentage >= 90) return 'O';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B';
        if (percentage >= 60) return 'C';
        if (percentage >= 50) return 'D';
        return 'Fail';
    }
    function numberToWords(num) {
        const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
        const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        const tens = ['Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        if (num <= 10) return ones[num];
        if (num < 20) return teens[num - 11];
        if (num < 100) return tens[Math.floor(num / 10) - 1] + (num % 10 > 0 ? " " + ones[num % 10] : "");
        if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 > 0 ? " " + numberToWords(num % 100) : "");
        if (num < 1000000) return numberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 > 0 ? " " + numberToWords(num % 1000) : "");

        return num.toString();
    }
});