// Match The Regex - CTF Challenge JavaScript

let patternRevealed = false;

function submitInput() {
    const input = document.getElementById("userInput").value.trim();
    const resultDiv = document.getElementById("result");
    
    if (!input) {
        showResult("Please enter something to test!", "error");
        return;
    }

    // Show loading state
    showResult("🔄 Checking your input...", "");
    
    fetch("/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ input: input })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showResult(`🎉 ${data.message}<br><strong>Flag: ${data.flag}</strong>`, "success");
            // Add some celebration effects
            celebrateSuccess();
        } else {
            let message = data.message;
            if (data.hint) {
                message += `<br><em>💡 Hint: ${data.hint}</em>`;
            }
            showResult(message, "error");
        }
    })
    .catch(error => {
        showResult("❌ Error connecting to server", "error");
        console.error("Error:", error);
    });
}

function showResult(message, type) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = message;
    resultDiv.className = `result ${type}`;
}

function showHint() {
    if (patternRevealed) {
        return;
    }
    
    fetch("/pattern")
    .then(res => res.json())
    .then(data => {
        const regexDisplay = document.getElementById("regexDisplay");
        
        regexDisplay.innerHTML = `Pattern: <span style="color: #00ff88;">XmhlQ1RGXHsoPz0uKlthLXpBLVpdKSg/PS4qXGQpKD89LipfKVthLXpBLVpcZF9dezEwLH1cfSQ=</span> 🔓`;
    })
    .catch(error => {
        showResult("❌ Error fetching pattern", "error");
    });
}

function celebrateSuccess() {
    // Simple celebration animation
    const container = document.querySelector('.container');
    container.style.animation = 'pulse 0.5s ease-in-out 3';
    
    // Add CSS animation if not already present
    if (!document.querySelector('#celebration-style')) {
        const style = document.createElement('style');
        style.id = 'celebration-style';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Allow Enter key to submit
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        submitInput();
    }
});
