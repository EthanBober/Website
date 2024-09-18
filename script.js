import DOMPurify from 'dompurify';

const consoleElement = document.getElementById('console');

function printToConsoleNoHead(text) {
    const outputContainer = document.createElement('div');
    outputContainer.className = 'output-container';

    const promptSymbol = document.createElement('span');
    promptSymbol.className = 'prompt-symbol';

    const outputText = document.createElement('span');
    
    outputText.textContent = text;
    outputText.className = 'output-text';



    outputContainer.appendChild(promptSymbol);
    outputContainer.appendChild(outputText);
    consoleElement.appendChild(outputContainer);
}




function printToConsole(text) {
    const outputContainer = document.createElement('div');
    outputContainer.className = 'output-container';

    const promptSymbol = document.createElement('span');
    promptSymbol.textContent = '~$ ';
    promptSymbol.className = 'prompt-symbol';

    const outputText = document.createElement('span');

    outputText.innerHTML = DOMPurify.sanitize(text);
    outputText.className = 'output-text';

    outputContainer.appendChild(promptSymbol);
    outputContainer.appendChild(outputText);
    consoleElement.appendChild(outputContainer);
}


function promptInput() {
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';

    const promptSymbol = document.createElement('span');
    promptSymbol.textContent = '~$ ';
    promptSymbol.className = 'prompt-symbol';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'console-input';

    inputContainer.appendChild(promptSymbol);
    inputContainer.appendChild(input);
    consoleElement.appendChild(inputContainer);

    input.focus();

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = input.value.trim();

            // Disable the input field
            input.disabled = true;

            // Replace the input field with a span
            const commandText = document.createElement('span');
            commandText.textContent = input.value;
            commandText.className = 'command-text';

            inputContainer.replaceChild(commandText, input);

            handleCommand(command);
        }
    });
}

function handleCommand(command) {
    switch (command.toLowerCase()) {
        case 'help':
            printToConsole('Available commands:\n- help\n- aboutme\n- resume \n- socials\n- clear');
            break;
        case 'aboutme':
            printToConsole('Hey! 👋 I\'m Ethan. \n I\'m currently studying Material Science and Engineering at the University of Pennsylvania \n I do a bit of research on campus and am involved with a few engineering related clubs. \n My main interests are electronic/nanomaterials. \n Feel free to reach me at ebober@seas.upenn.edu');
            break;
        case 'resume':
            printToConsole('Redirecting to resume...');
            window.open('resumeUp.pdf', '_blank');
            break;
        case 'socials':
            printToConsole('Connect with me on: <a href="https://www.linkedin.com/in/ethanbober/" target="_blank">LinkedIn</a> | <a href="https://github.com/EthanBober" target="_blank">GitHub</a>');
            break;
        case 'clear':
            consoleElement.innerHTML = '';
            break;
        default:
            printToConsole(`Command not recognized: "${command}". Type "help" for a list of commands.`);
    }
    promptInput();
}

// Initialize the console
printToConsoleNoHead("____________________                   ________      ______ \n___  ____/_  /___  /_______ _______    ___  __ )________  /______________\n__  __/  _  __/_  __ \  __ `/_  __ \     __  __  |  __ \_  __ \  _ \_  ___/\n_  /___  / /_ _  / / / /_/ /_  / / /   _  /_/ // /_/ /  /_/ /  __/  /    \n/_____/  \__/ /_/ /_/\__,_/ /_/ /_/      /_____/ \____//_.___/\___//_/")
printToConsole('Welcome to my portfolio! Type "help" for a list of commands.');
promptInput();
