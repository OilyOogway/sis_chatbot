// let scrapedText = document.getElementById('scrapedText');

// scrapedText.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  
//     // Execute script to parse text on page
//     chrome.scripting.executeScript({
//       target: {tabId: tab.id},
//       // The func argument must be a function
//       func: scrapePage(),
//     });
//   });
  
// //Function to scrape page
// function scrapePage(){
//     const classRegEx = /(\w+-\w+)\s+([A-Za-z\s-]+)\s+(\d{1,2}:\d{2}(?:AM|PM) - \d{1,2}:\d{2}(?:AM|PM))[\s\S]*?([A-Za-z\s]+)\s+(\d)\s+(\w+\s\w+\s\w+)\s+(\d-\w+-\d+)/g;

//     let classMatches = document.body.innerHTML.matchAll(classRegEx);

//     const classData = [...classMatches].map(match => ({
//         classCode: match[1],
//         className: match[2],
//         classTime: match[3],
//         faculty: match[4],
//         credit: match[5],
//         location: match[6],
//         status: match[7]
//     }));

//     console.log(classData);
// }

// document.getElementById('scrapedText').addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     // Execute script to parse text on page
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: scrapePage, // Pass the function reference without parentheses
//     });
// });

// // Function to scrape page
// function scrapePage() {
//     const classRegEx = /(\w+-\w+)\s+([A-Za-z\s-]+)\s+(\d{1,2}:\d{2}(?:AM|PM) - \d{1,2}:\d{2}(?:AM|PM))[\s\S]*?([A-Za-z\s]+)\s+(\d)\s+(\w+\s\w+\s\w+)\s+(\d-\w+-\d+)/g;

//     let classMatches = document.body.innerHTML.matchAll(classRegEx);
//     console.log('we are executing')
//     const classData = [...classMatches].map(match => ({
//         classCode: match[1],
//         className: match[2],
//         classTime: match[3],
//         faculty: match[4],
//         credit: match[5],
//         location: match[6],
//         status: match[7]
//     }));

//     console.log(classData);
// }

const API_KEY = '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'
const submitButton = document.querySelector('#submit');

async function getMessage() {
    console.log('click');
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello!" }],
            max_tokens: 100
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);

        if (!response.ok) {
            console.error(`API request failed with status: ${response.status}`);
            const errorText = await response.text();
            console.error(`Error response text: ${errorText}`);
            return;
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

submitButton.addEventListener('click', async () => {
    console.log('Button clicked.');
    await getMessage();
});
