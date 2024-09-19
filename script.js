const consoleElement = document.getElementById('console');

function typeHtml(element, htmlString, delay, callback) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    function processNode(node, parentElement, done) {
        if (node.nodeType === Node.TEXT_NODE) {
            typeTextNode(node, parentElement, delay, done);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const clonedNode = node.cloneNode(false);
            parentElement.appendChild(clonedNode);

            const childNodes = Array.from(node.childNodes);
            processNodesSequentially(childNodes, clonedNode, done);
        }
    }

    function processNodesSequentially(nodes, parentElement, done) {
        if (nodes.length === 0) {
            done();
            return;
        }

        const [firstNode, ...restNodes] = nodes;
        processNode(firstNode, parentElement, function() {
            processNodesSequentially(restNodes, parentElement, done);
        });
    }

    function typeTextNode(textNode, parentElement, delay, done) {
        const textContent = textNode.textContent;
        let i = 0;
        function typeNextChar() {
            if (i < textContent.length) {
                parentElement.appendChild(document.createTextNode(textContent.charAt(i)));
                i++;
                setTimeout(typeNextChar, delay);
            } else {
                done();
            }
        }
        typeNextChar();
    }

    const childNodes = Array.from(tempContainer.childNodes);
    processNodesSequentially(childNodes, element, function() {
        if (callback) callback();
    });
}

function printToConsoleNoHead(text, callback) {
    const outputContainer = document.createElement('div');
    outputContainer.className = 'output-container';

    const promptSymbol = document.createElement('span');
    promptSymbol.className = 'prompt-symbol';

    const outputText = document.createElement('span');
    outputText.className = 'output-text';

    outputContainer.appendChild(promptSymbol);
    outputContainer.appendChild(outputText);
    consoleElement.appendChild(outputContainer);

    typeHtml(outputText, text, 2, callback);
}

function printToConsole(text, callback) {
    const outputContainer = document.createElement('div');
    outputContainer.className = 'output-container';

    const promptSymbol = document.createElement('span');
    promptSymbol.textContent = '~$ ';
    promptSymbol.className = 'prompt-symbol';

    const outputText = document.createElement('span');
    outputText.className = 'output-text';

    outputContainer.appendChild(promptSymbol);
    outputContainer.appendChild(outputText);
    consoleElement.appendChild(outputContainer);

    typeHtml(outputText, text, 10, callback);
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

            input.disabled = true;

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
            printToConsole('Available commands:\n- help\n- aboutme\n- resume \n- thingsido \n- socials\n- clear', promptInput);
            break;
        case 'aboutme':
            printToConsole('Hey! 👋 I\'m Ethan. \nI\'m currently studying Material Science and Engineering at the University of Pennsylvania.\nI do a bit of research on campus and am involved with a few engineering-related clubs.\nMy main interests are electronic/nanomaterials.\nFeel free to reach me at ebober@seas.upenn.edu', promptInput);
            break;
        case 'resume':
            printToConsole('Redirecting to resume...', function() {
                window.open('resumeUp.pdf', '_blank');
                promptInput();
            });
            break;
        case 'socials':
            printToConsole('Connect with me on: <a href="https://www.linkedin.com/in/ethanbober/" target="_blank">LinkedIn</a> | <a href="https://github.com/EthanBober" target="_blank">GitHub</a>', promptInput);
            break;
        case 'maxx':
            printToConsole('secret found...', function() {
                window.open('https://www.maxxyung.com/', '_blank');
                promptInput();
            });
            break;
        case 'thingsido':
            printToConsole('Right now, I am currently involved with research with the Shu Yang Group on <span style="color:blue;">hydroscopic hydrogel desiccants</span>.\nMainly, I synthesize, analyze, and compare performances of the different monomers used for the synthesis.\nOther than that, I also help volunteer for engineering education as a part of Access Engineering and also volunteer in the SOUP comp. here at the UofPenn.\nFor a full list, check out my <span style="color:yellow;">resume</span> with the "resume" command.', promptInput);
            break;
        case 'clear':
            consoleElement.innerHTML = '';
            promptInput();
            break;
        default:
            printToConsole(`Command not recognized: "${command}". Type "help" for a list of commands.`, promptInput);
    }
}


printToConsoleNoHead("____________________                   ________      ______ \n___  ____/_  /___  /_______ _______    ___  __ )________  /______________\n__  __/  _  __/_  __ \  __ `/_  __ \     __  __  |  __ \_  __ \  _ \_  ___/\n_  /___  / /_ _  / / / /_/ /_  / / /   _  /_/ // /_/ /  /_/ /  __/  /    \n/_____/  \__/ /_/ /_/\__,_/ /_/ /_/      /_____/ \____//_.___/\___//_/", function() {
    printToConsole('Welcome to my portfolio! Type "help" for a list of commands.', promptInput);
});
