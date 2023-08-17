
const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history')

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
        console.log(data);
        console.log(prompt + result);
        //print answer to html
        outputElement.textContent = result;
        if(data.results[0].text){
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value
            historyElement.append(pElement);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

submitButton.addEventListener('click', async () => {
    console.log('Button clicked.');
    const prompt = inputElement.value;
    await run(prompt);
});

