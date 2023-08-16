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

// const API_KEY = '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'
// const submitButton = document.querySelector('#submit');

// async function getMessage() {
//     console.log('click');
//     const options = {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${API_KEY}`,
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: "Hello!" }],
//             max_tokens: 100
//         })
//     };
//     try {
//         const response = await fetch('https://api.openai.com/v1/chat/completions', options);

//         if (!response.ok) {
//             console.error(`API request failed with status: ${response.status}`);
//             const errorText = await response.text();
//             console.error(`Error response text: ${errorText}`);
//             return;
//         }

//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }

// submitButton.addEventListener('click', async () => {
//     console.log('Button clicked.');
//     await getMessage();
// });

const submitButton = document.querySelector('#submit');

async function run(prompt) {
    const URI = 'http://192.168.1.21:5000/api/v1/generate';  // Your local API address
    
    const request = {
        prompt: prompt,
        max_new_tokens: 250,
        auto_max_new_tokens: false,
    
        // Generation params. If 'preset' is set to different than 'None', the values
        // in presets/preset-name.yaml are used instead of the individual numbers.
        preset: "None",
        do_sample: true,
        temperature: 0.7,
        top_p: 0.1,
        typical_p: 1,
        epsilon_cutoff: 0, // In units of 1e-4
        eta_cutoff: 0, // In units of 1e-4
        tfs: 1,
        top_a: 0,
        repetition_penalty: 1.18,
        repetition_penalty_range: 0,
        top_k: 40,
        min_length: 0,
        no_repeat_ngram_size: 0,
        num_beams: 1,
        penalty_alpha: 0,
        length_penalty: 1,
        early_stopping: false,
        mirostat_mode: 0,
        mirostat_tau: 5,
        mirostat_eta: 0.1,
        guidance_scale: 1,
        negative_prompt: "",
    
        seed: -1,
        add_bos_token: true,
        truncation_length: 2048,
        ban_eos_token: false,
        skip_special_tokens: true,
        stopping_strings: [],
      };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    };

    try {
        const response = await fetch(URI, options);

        if (!response.ok) {
            console.error(`API request failed with status: ${response.status}`);
            const errorText = await response.text();
            console.error(`Error response text: ${errorText}`);
            return;
        }

        const data = await response.json();
        const result = data.results[0].text;
        console.log(prompt + result);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

submitButton.addEventListener('click', async () => {
    console.log('Button clicked.');
    const prompt = "In order to make homemade bread, follow these steps:\n1)";
    await run(prompt);
});

