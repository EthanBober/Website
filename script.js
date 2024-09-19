const consoleElement = document.getElementById('console');

const photoTree = {
    'Photos': {
        'Campus': {
            'bike': 'photos/bikenflowers.JPG',
            'amtrak': 'photos/amtrak.JPG',
            'campuslamp': 'photos/campuslamp.JPG'
        },
        'Nature': {
            'fennels' : 'photos/fennels.JPG',
            'japanesemaple' : 'photos/japanesemaple.JPG',
            'wyomingcanna' : 'photos/wyomingcanna.JPG'
        }
    }
};
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

function printToConsoleElement(element, callback) {
    const outputContainer = document.createElement('div');
    outputContainer.className = 'output-container';

    const promptSymbol = document.createElement('span');
    promptSymbol.className = 'prompt-symbol';

    outputContainer.appendChild(promptSymbol);
    outputContainer.appendChild(element);
    consoleElement.appendChild(outputContainer);

    if (callback) callback();
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
    const args = command.trim().split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
        case 'help':
            printToConsole('Available commands:\n- help\n- aboutme\n- thingsido \n- socials\n- photos\n- clear', promptInput);
            break;
        case 'aboutme':
            printToConsole('Hey! 👋 I\'m Ethan. \n   I\'m currently studying Material Science and Engineering at the University of Pennsylvania (<span style="color:red;">Go Quakers!</span>).\n   I do a bit of research on campus and I am involved with a few engineering-related clubs.\n   My main interests are electronic/nanomaterials.\n   Feel free to reach me at <b>ebober@seas.upenn.edu</b>', promptInput);
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
            printToConsole('Right now, I am currently involved with research with the Shu Yang Group on <span style="color:blue;">hydroscopic hydrogel desiccants</span>.\n   Mainly, I synthesize, analyze, and compare performances of the different monomers used for the synthesis.\n   Other than that, I also help volunteer for engineering education as a part of Access Engineering and also volunteer in the SOUP comp. here at the UofPenn.', promptInput);
            break;
        case 'photos':
            handlePhotosCommand(args.slice(1));
            break;
        case 'clear':
            consoleElement.innerHTML = '';
            promptInput();
            break;
        default:
            printToConsole(`Command not recognized: "${command}". Type "help" for a list of commands.`, promptInput);
    }
}

function handlePhotosCommand(args) {
    if (args.length === 0) {
        // Display the stylized list of photos
        displayPhotoList();
        printToConsole('Type "photos" followed by a title to load the photo! (ex. photos BikeNFlowers)')
    } else {
        // Display the specified photo with an ASCII border
        const photoName = args.join(' ');
        displayPhoto(photoName);
    }
}

function displayPhotoList() {
    const treeString = buildTreeString(photoTree);
    printToConsole(treeString, promptInput);
}
function buildTreeString(node, indent = '', isRoot = true) {
    let result = '';
    const keys = Object.keys(node);
    keys.forEach((key, index) => {
        const isLeaf = typeof node[key] === 'string';
        const prefix = isRoot ? '' : (index === keys.length - 1 ? '└── ' : '├── ');

        result += indent + prefix + key + '\n';

        if (!isLeaf) {
            const childIndent = indent + (index === keys.length - 1 ? '    ' : '│   ');
            result += buildTreeString(node[key], childIndent, false);
        }
    });
    
    return result;
}


async function displayPhoto(photoName) {
    const photoPath = findPhotoPath(photoTree, photoName);
    if (photoPath) {
        // Create the main container
        const container = document.createElement('div');
        container.classList.add('windows-photo-container');

        // Create the title bar
        const titleBar = document.createElement('div');
        titleBar.classList.add('title-bar');

        // Title text
        const titleText = document.createElement('span');
        titleText.textContent = photoName;
        titleBar.appendChild(titleText);

        // Control buttons
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const minimizeButton = document.createElement('div');
        minimizeButton.textContent = '_';
        buttons.appendChild(minimizeButton);

        const maximizeButton = document.createElement('div');
        maximizeButton.textContent = '□';
        buttons.appendChild(maximizeButton);

        const closeButton = document.createElement('div');
        closeButton.textContent = 'X';
        buttons.appendChild(closeButton);

        titleBar.appendChild(buttons);

        // Content area
        const content = document.createElement('div');
        content.classList.add('content');

        // Image element
        const imgElement = document.createElement('img');
        imgElement.src = photoPath;
        imgElement.alt = photoName;
        imgElement.style.width = '350px'; // Adjust the size as needed
        imgElement.style.height = 'auto';
        imgElement.style.display = 'block';
        imgElement.style.margin = '0 auto';

        // Append the image to the content area
        content.appendChild(imgElement);

        // Append title bar and content to the main container
        container.appendChild(titleBar);
        container.appendChild(content);

        // Print to console
        await printToConsoleElement(container);
        promptInput();
    } else {
        await printToConsole(`Photo "${photoName}" not found.`);
        promptInput();
    }
}




function findPhotoPath(node, photoName) {
    for (let key in node) {
        if (typeof node[key] === 'string') {
            if (key.toLowerCase() === photoName.toLowerCase()) {
                return node[key];
            }
        } else if (typeof node[key] === 'object') {
            const result = findPhotoPath(node[key], photoName);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

printToConsoleNoHead("____________________                   ________      ______ \n___  ____/_  /___  /_______ _______    ___  __ )________  /______________\n__  __/  _  __/_  __ \  __ `/_  __ \     __  __  |  __ \_  __ \  _ \_  ___/\n_  /___  / /_ _  / / / /_/ /_  / / /   _  /_/ // /_/ /  /_/ /  __/  /    \n/_____/  \__/ /_/ /_/\__,_/ /_/ /_/      /_____/ \____//_.___/\___//_/", function() {
    printToConsole('Welcome to my portfolio! Type "help" for a list of commands.', promptInput);
});
