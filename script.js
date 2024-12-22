// Map of predefined commands and responses
const responses = {
    "hi": "Hey there! How’s it going? 👋",
    "hello": "Hey there! How’s it going? 👋",
    "sup": "Hey there! How’s it going? 👋",
    "wassup": "Hey there! How’s it going? 👋",
    "thank you": "Happy to help!",
    "what is your name": "My name is DawnGPT, I am an AI developed using JavaScript.",
    ";debug": "log: Status.JS=TRUE, ChatStatus.EXE=TRUE, Index.HTML=60FPS, Style.CSS=TRUE, 1bafbd36-b110-424a-90e7-7e48cbc3072e.JS=ServersideError>",
    ";crash": "exe:Error 500, User: FALSE. Simulating crash...",
    ";info": "System Info: DawnGPT - Version 1.0.0. Status: Active. Commands available: ;debug, ;crash, ;info, ;joke, ;quote, ;status, ;clear, ;help",
    ";help": "Available commands:\n;debug: View system debug info\n;crash: Simulate a crash\n;info: Show system info\n;joke: Hear a funny joke\n;quote: Get an inspirational quote\n;status: Check the bot's status\n;clear: Clear the chat history\n;roll: Roll a dice\n;fact: Get a random fact\n;math: Perform basic math operations\n;name: Get the bot's name\n;greeting: Get a random greeting\n;goodbye: Say goodbye in different languages\n;love: Get a cheesy love quote\n;motivate: Get a motivational quote",
    ";joke": "Why don’t skeletons fight each other? They don’t have the guts!",
    ";quote": "“The only way to do great work is to love what you do.” — Steve Jobs",
    ";status": "System Status: DawnGPT - Online, Version 1.0.0, Running smoothly!",
    ";fact": "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    ";math": "Enter a math operation (e.g., 3 + 5).",
    ";name": "I am DawnGPT, your friendly AI assistant!",
    ";greeting": "Hello there! How’s your day going so far?",
    ";goodbye": "Goodbye! Adiós! Auf Wiedersehen! Au revoir! Arrivederci!",
    ";love": "“Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.”",
    ";motivate": "“The only limit to our realization of tomorrow is our doubts of today.” — Franklin D. Roosevelt",
    "bad": "I’m really sorry to hear that. Do you mind telling me what’s bothering you?",
    "feeling down": "I’m really sorry you’re feeling this way. Do you want to talk about it? Sometimes just sharing helps.",
    "feeling overwhelmed": "I understand how that can feel. Is there something in particular that’s overwhelming you right now?",
    "default": "Sorry, I didn’t quite understand that. Could you clarify or ask something else? I’m here to help!",
    "good": "Glad to hear that! How can I help?",
    "fine": "I'm sorry to hear that. Do you mind telling me what's bothering you?"
};

// Function to handle the user input and display the responses
function handleChatInput() {
    const inputField = document.getElementById("user-input");
    const userInput = inputField.value.trim();

    if (userInput) {
        // Fade out the initial "How can I help you?" message
        const initialMessage = document.getElementById("initial-message");
        if (initialMessage) {
            initialMessage.style.opacity = 0; // Fade out
        }

        // Display the user's message
        displayMessage(userInput, 'user');
        
        // Show the bot generating the response
        displayMessage("...", 'bot');
        
        let response;
        
        // Handle special commands first (like ;clear, ;roll, etc.)
        if (userInput === ";clear") {
            response = clearChat();
        } else if (userInput === ";roll") {
            // Handle the dice roll
            const roll = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
            response = `You rolled a ${roll}!`;
        } else if (responses[userInput]) {
            // Otherwise, check for a standard predefined response
            response = responses[userInput];
        } else {
            // Default response if the input isn't recognized
            response = responses["default"];
        }
        
        // Simulate a delay before sending the actual bot response
        setTimeout(() => {
            updateLastMessage(response);
        }, 1500); // 1.5 second delay to simulate thinking time
    }

    // Clear the input field after message is sent
    inputField.value = "";
    inputField.focus();
}

// Function to clear the chat area
function clearChat() {
    const chatArea = document.getElementById("chat-area");
    chatArea.innerHTML = "";  // Clear the chat area
    return "Chat history has been cleared.";  // Return confirmation message
}

// Function to display messages in the chat box
function displayMessage(message, sender) {
    const chatArea = document.getElementById("chat-area");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;

    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight; // Auto-scroll to the bottom
}

// Function to update the last message with the bot's response
function updateLastMessage(response) {
    const chatArea = document.getElementById("chat-area");
    const lastMessage = chatArea.lastElementChild;

    // Update the last message (which is the "..." message) with the actual response
    lastMessage.textContent = response;
}

// Toggle the send button based on input
function toggleSendButton() {
    const inputField = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    if (inputField.value.trim()) {
        sendButton.classList.add("enabled");
    } else {
        sendButton.classList.remove("enabled");
    }
}

// Event listener for the send button
document.getElementById("send-btn").addEventListener("click", handleChatInput);

// Enable send button when there's text in the input field
document.getElementById("user-input").addEventListener("input", function() {
    toggleSendButton();
});

// Add an event listener for the 'Enter' key
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default "Enter" behavior (which might create a new line)
        handleChatInput(); // Send the message when 'Enter' is pressed
    }
});
