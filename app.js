document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyze-btn");
    const ticketInput = document.getElementById("ticket-input");
    const nlpTask = document.getElementById("nlp-task");
    const resultsDiv = document.getElementById("results");

    analyzeBtn.addEventListener("click", () => {
        const ticketText = ticketInput.value.trim();
        const selectedTask = nlpTask.value;

        // Clear previous results
        resultsDiv.innerHTML = "";

        if(!ticketText) {
            resultsDiv.innerHTML = `<p style="color: red;"> Please enter a ticket message. </p>`;
            return;
        }

        const mockOutput = selectedTask === "sentiment"
        ? `<p><strong>Sentiment:</strong> Positive</p>`
        : `<p><strong>Category:</strong> Billing</p><p><strong>Urgency:</strong> High</p>`;

        resultsDiv.innerHTML = `<div class= "result-box">${mockOutput}</div>`;
    });
});