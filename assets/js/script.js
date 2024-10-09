const apiUrl = "https://api.quotable.io/random";
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const tweetQuoteBtn = document.getElementById("tweet-quote-btn");

// Fetch the quote from the API
async function fetchQuote(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayQuote(data);
    } catch (error) {
        console.error("Failed to fetch quote: ", error);
        displayError();
    }
}

// Display the fetched quote
function displayQuote(quoteData) {
    quoteElement.innerText = quoteData.content;
    authorElement.innerText = `- ${quoteData.author}`;
}

// Handle error in fetching a quote
function displayError() {
    quoteElement.innerText = "Failed to load quote. Please try again.";
    authorElement.innerText = "";
}

// Share the current quote on Twitter
function tweetQuote() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `"${quoteElement.innerText}" - ${authorElement.innerText}`
    )}`;
    window.open(tweetUrl, "Tweet window", "width=600,height=300");
}

// Initialize the quote fetching when the page loads
function init() {
    fetchQuote(apiUrl);
}

// Add event listeners for buttons
newQuoteBtn.addEventListener("click", init);
tweetQuoteBtn.addEventListener("click", tweetQuote);

// Initial call to display a quote
init();
