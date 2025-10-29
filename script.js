const inputField = document.getElementById('userInput');
inputField.focus();
inputField.addEventListener('blur', function() {
    setTimeout(() => {
        inputField.focus();
    }, 0);
});
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkInput();
    }
});
async function inetGet(fileName, filePath, mimeType = 'application/octet-stream') {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error('ERROR_NETWORK');
        }
        const content = await response.blob();
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('ERROR_FETCHING_OBJECT:', error);
    }
}
function openFile(filePath) {
    window.open(filePath, '_blank');
}
const fileMap = {
    'testimg.jpg': '/PseudoJSTerminal/content/img/testimg.jpg',
};
function checkInput() {
    const userInput = document.getElementById('userInput').value;
    const output = document.getElementById('outputText');
    if (userInput === 'Help') {
        output.innerHTML = 'About (example: About Terminal); InetGet (example: InetGet testimg.jpg); Open (example: Open testimg.jpg); ShowContent';
    } else if (userInput === 'About Terminal') {
        output.innerHTML = 'Terminal ver. 0.1; written with CSS/HTML/JS';
    } else if (userInput.startsWith('InetGet ')) {
        const fileName = userInput.split(' ')[1];
        const filePath = fileMap[fileName];
        if (filePath) {
            inetGet(fileName, filePath);
        } else {
            output.innerHTML = 'Bash: file not found';
        }
    } else if (userInput.startsWith('Open ')) {
        const fileName = userInput.split(' ')[1];
        const filePath = fileMap[fileName];
        if (filePath) {
            openFile(filePath);
        } else {
            output.innerHTML = 'Bash: file not found';
        }
    } else if (userInput === 'ShowContent') {
        let content = '';
        for (const [fileName, filePath] of Object.entries(fileMap)) {
            content += `${fileName} - path:[${filePath}]<br>`;
        }
        output.innerHTML = content;
    } else if (userInput === 'who are you?') {
        output.innerHTML = 'you do not deserve to know that.';
	}
     else {
        output.innerHTML = 'Bash: command not found';
    }
}
