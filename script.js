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

    // Extract a file ID only from supported Google Drive URLs.
    function extractFileId(value) {
        try {
            const url = new URL(value);

            if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== 'drive.google.com') {
                return null;
            }

            const pathPatterns = [
                /^\/file\/d\/([a-zA-Z0-9_-]+)/,
                /^\/d\/([a-zA-Z0-9_-]+)/
            ];

            for (const pattern of pathPatterns) {
                const match = url.pathname.match(pattern);
                if (match && match[1]) {
                    return match[1];
                }
            }

            const idParam = url.searchParams.get('id');
            return idParam && /^[a-zA-Z0-9_-]+$/.test(idParam) ? idParam : null;
        } catch {
            return null;
        }
    }

    // Generate the conventional Google Drive download-style URL.
    function generateDirectLink(fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    // Validate supported Google Drive URL formats.
    function isValidDriveUrl(url) {
        return extractFileId(url) !== null;
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
            showToast('Invalid or unsupported Google Drive URL', 'error');
            return;
        }

        const fileId = extractFileId(url);
        if (fileId) {
            const directLink = generateDirectLink(fileId);
            directLinkInput.value = directLink;
            outputGroup.style.display = 'block';
            showToast('Download link generated successfully!');
        } else {
            showToast('Could not extract file ID from URL', 'error');
        }
    });

    // Copy button click handler
    copyBtn.addEventListener('click', function() {
        const directLink = directLinkInput.value;

        if (!directLink) {
            showToast('No download link to copy', 'error');
            return;
        }

        // Add visual feedback
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';

        // Use modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(directLink).then(() => {
                showToast('Download link copied to clipboard!');
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
                showToast('Download link copied to clipboard!');
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
