document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyze-btn");
    const ticketInput = document.getElementById("ticket-input");
    const nlpTask = document.getElementById("nlp-task");
    const resultsDiv = document.getElementById("results");

    analyzeBtn.addEventListener("click", async () => {
        const ticketText = ticketInput.value.trim();
        const selectedTask = nlpTask.value;

        resultsDiv.innerHTML = "";

        if (!ticketText) {
            resultsDiv.innerHTML = `<p style="color: red;">Please enter a ticket message.</p>`;
            return;
        }

        resultsDiv.innerHTML = `<p>Analyzing...</p>`;

        try {
            const response = await fetch("http://localhost:5000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: ticketText,
                    task: selectedTask
                }),
            });
 
            const { result, urgency } = await response.json();
            let outputHTML = "";

            if (selectedTask === "sentiment") {
                const label = result[0]?.label;
                const score = (result[0]?.score * 100).toFixed(2);
                outputHTML = `<p><strong>Sentiment:</strong> ${label} (${score}%)</p>`;
                outputHTML += `<p><strong>Urgency:</strong> <span class="urgency-tag ${urgency.toLowerCase()}">${urgency}</span></p>`;

            } else if (selectedTask === "classification") {
                const label = result[0]?.label;
                const score = (result[0]?.score * 100).toFixed(2);
                outputHTML = `<p><strong>Category:</strong> ${label} (${score}%)</p>`;
                outputHTML += `<p><strong>Urgency:</strong> <span class="urgency-tag ${urgency.toLowerCase()}">${urgency}</span></p>`;

            }

            resultsDiv.innerHTML = `<div class="result-box">${outputHTML}</div>`;
        } catch (error) {
            console.error("Error:", error);
            resultsDiv.innerHTML = `<p style="color:red;">An error occurred during analysis.</p>`;
        }
    });
});
