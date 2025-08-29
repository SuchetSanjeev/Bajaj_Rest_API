const express = require('express');
const app = express();

// Middleware to parse JSON bodies.
// This is necessary to read the "data" array from the request.
app.use(express.json());

// Define the POST endpoint at the /bfhl route 
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        // Basic validation: Check if 'data' exists and is an array
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false, // 
                error: "Invalid input: 'data' field must be an array."
            });
        }

        // --- User Details (Replace with your own) ---
        // const user_id = "your_full_name_ddmmyyyy"; // e.g., "john_doe_17091999" 
        const user_id = "john_doe_17091999"; // e.g., "john_doe_17091999" 
        const email = "john@xyz.com"; // 
        const roll_number = "ABCD123"; // 

        // --- Data Processing Logic ---
        const odd_numbers = []; // 
        const even_numbers = []; // 
        const alphabets = []; // 
        const special_characters = []; // 
        let sum = 0; // 

        data.forEach(item => {
            if (!isNaN(item)) {
                // It's a number
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(String(num)); // Numbers must be returned as strings 
                } else {
                    odd_numbers.push(String(num)); // Numbers must be returned as strings 
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                // It's an alphabet string
                alphabets.push(item.toUpperCase()); // Convert to uppercase 
            } else {
                // It's a special character
                special_characters.push(item);
            }
        });
        
        // --- Concatenation Logic ---
        // 1. Get all alphabetical characters from input
        const allChars = alphabets.join('');
        // 2. Reverse them
        const reversedChars = allChars.split('').reverse();
        // 3. Apply alternating caps
        const concat_string = reversedChars.map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');


        // --- Construct the Response ---
        const response = {
            is_success: true, // 
            user_id: user_id, // 
            email: email, // 
            roll_number: roll_number, // 
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum), // Return sum as a string 
            concat_string: concat_string,
        };

        // Send a successful response with a 200 status code 
        res.status(200).json(response);

    } catch (error) {
        // Graceful exception handling 
        res.status(500).json({
            is_success: false,
            error: "An internal server error occurred.",
            details: error.message
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//API by Suchet Patil for Bajaj finserv Test
