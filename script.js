document.addEventListener('DOMContentLoaded', function() {
    const driveUrlInput = document.getElementById('driveUrl');
    const generateBtn = document.getElementById('generateBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const outputGroup = document.getElementById('outputGroup');
    const directLinkInput = document.getElementById('directLink');
    const copyBtn = document.getElementById('copyBtn');
    const toast = document.getElementById('toast');
    const currentYearSpan = document.getElementById('currentYear');

    // Set current year
    currentYearSpan.textContent = new Date().getFullYear();

    // Function to extract file ID from Google Drive URL
    function extractFileId(url) {
        // Pattern to match Google Drive URLs
        const patterns = [
            /\/file\/d\/([a-zA-Z0-9_-]+)/,  // Standard sharing link
            /\/d\/([a-zA-Z0-9_-]+)/,        // Alternative format
            /id=([a-zA-Z0-9_-]+)/           // Direct ID parameter
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    }

    // Function to generate direct download link
    function generateDirectLink(fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    // Function to validate Google Drive URL
    function isValidDriveUrl(url) {
        return url.includes('drive.google.com') && extractFileId(url) !== null;
    }

    // Function to show toast notification
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // Generate button click handler
    generateBtn.addEventListener('click', function() {
        const url = driveUrlInput.value.trim();
        
        if (!url) {
            showToast('Please enter a Google Drive URL', 'error');
            return;
        }

        if (!isValidDriveUrl(url)) {
            showToast('Invalid Google Drive URL format', 'error');
            return;
        }

        const fileId = extractFileId(url);
        if (fileId) {
            const directLink = generateDirectLink(fileId);
            directLinkInput.value = directLink;
            outputGroup.style.display = 'block';
            showToast('Direct link generated successfully!');
        } else {
            showToast('Could not extract file ID from URL', 'error');
        }
    });

    // Copy button click handler
    copyBtn.addEventListener('click', function() {
        const directLink = directLinkInput.value;
        
        if (!directLink) {
            showToast('No direct link to copy', 'error');
            return;
        }

        // Add visual feedback
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

        // Use modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(directLink).then(() => {
                showToast('Direct link copied to clipboard!');
            }).catch(() => {
                fallbackCopy(directLink);
            });
        } else {
            fallbackCopy(directLink);
        }

        // Reset button after animation
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
    });

    // Fallback copy method for older browsers
    function fallbackCopy(text) {
        directLinkInput.select();
        directLinkInput.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showToast('Direct link copied to clipboard!');
            } else {
                showToast('Failed to copy link', 'error');
            }
        } catch (err) {
            showToast('Failed to copy link', 'error');
        }
    }

    // Allow Enter key to trigger generation
    driveUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    // Auto-focus on input when page loads
    driveUrlInput.focus();

    // Add example URL on click
    driveUrlInput.addEventListener('click', function() {
        if (!this.value) {
            this.value = 'https://drive.google.com/file/d/1BFxYaN_8295KG1pW0zYgoU1dL0kQc3Zs/view?usp=drive_link';
        }
    });

    // Paste button click handler
    pasteBtn.addEventListener('click', async function() {
        try {
            // Use modern clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                const text = await navigator.clipboard.readText();
                driveUrlInput.value = text;
                showToast('URL pasted from clipboard!');
            } else {
                // Fallback for older browsers
                driveUrlInput.focus();
                showToast('Please use Ctrl+V to paste', 'error');
            }
        } catch (err) {
            showToast('Failed to paste from clipboard', 'error');
        }
    });
});
