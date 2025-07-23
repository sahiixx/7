// Typing Animation for Terminal
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-2';
        this.canvas.style.opacity = '0.1';
        document.body.appendChild(this.canvas);

        this.matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        this.matrix = this.matrix.split("");

        this.drops = [];
        this.initializeDrops();
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.font_size = 10;
        this.columns = this.canvas.width / this.font_size;
        this.initializeDrops();
    }

    initializeDrops() {
        for (let x = 0; x < this.columns; x++) {
            this.drops[x] = 1;
        }
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = this.font_size + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.matrix[Math.floor(Math.random() * this.matrix.length)];
            this.ctx.fillText(text, i * this.font_size, this.drops[i] * this.font_size);

            if (this.drops[i] * this.font_size > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    start() {
        setInterval(() => this.draw(), 35);
    }
}

// Glitch Effect
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.glitchChars = '!@#$%^&*()_+-={}[]|;:,.<>?/~`';
    }

    glitch(duration = 100) {
        const glitchText = this.originalText.split('').map(char => {
            return Math.random() < 0.1 ? this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)] : char;
        }).join('');
        
        this.element.textContent = glitchText;
        
        setTimeout(() => {
            this.element.textContent = this.originalText;
        }, duration);
    }

    startRandomGlitch() {
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every interval
                this.glitch();
            }
        }, 2000);
    }
}

// Terminal Command Simulation
class TerminalSimulation {
    constructor(terminalElement) {
        this.terminal = terminalElement;
        this.commands = [
            'SYSTEM STATUS: ONLINE',
            'CONNECTING TO NEURAL NETWORK...',
            'DIGITAL SUPREMACY PROTOCOL ACTIVATED',
            'MARKET DOMINANCE: 99.7%',
            'AI AGENTS: FULLY OPERATIONAL',
            'READY FOR NEW MISSIONS...'
        ];
    }

    simulateTyping() {
        let commandIndex = 0;
        const typeCommand = () => {
            if (commandIndex < this.commands.length) {
                const p = document.createElement('p');
                p.textContent = '> ' + this.commands[commandIndex];
                this.terminal.appendChild(p);
                commandIndex++;
                setTimeout(typeCommand, 1500);
            }
        };
        setTimeout(typeCommand, 3000);
    }
}

// Hover Effects
class HoverEffects {
    static addGlowEffect(elements) {
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.filter = 'drop-shadow(0 0 20px #00ff41)';
                element.style.transform = 'scale(1.05)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.filter = '';
                element.style.transform = '';
            });
        });
    }

    static addScanlineEffect(element) {
        const scanline = document.createElement('div');
        scanline.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff41, transparent);
            animation: scanline 2s linear infinite;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(scanline);
    }
}

// Number Counter Animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.increment = this.target / (duration / 16);
        this.current = 0;
    }

    start() {
        const timer = setInterval(() => {
            this.current += this.increment;
            if (this.current >= this.target) {
                this.current = this.target;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(this.current);
            if (this.element.textContent.includes('+')) {
                displayValue += '+';
            } else if (this.element.textContent.includes('%')) {
                displayValue += '%';
            } else if (this.element.textContent.includes('/')) {
                displayValue = '24/7';
            }
            
            this.element.textContent = displayValue;
        }, 16);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Matrix Rain Effect
    const matrixRain = new MatrixRain();
    matrixRain.start();

    // Initialize typing animation for main terminal text
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = 'INITIALIZING DIGITAL DOMINANCE...';
        typingElement.textContent = '';
        const typing = new TypingAnimation(typingElement, originalText, 50);
        typing.start();
    }

    // Add glitch effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const glitch = new GlitchEffect(heroTitle);
        glitch.startRandomGlitch();
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    HoverEffects.addGlowEffect(buttons);

    // Add hover effects to stat items
    const statItems = document.querySelectorAll('.stat-item');
    HoverEffects.addGlowEffect(statItems);

    // Add scanline effect to terminal windows
    const terminals = document.querySelectorAll('.terminal-window');
    terminals.forEach(terminal => {
        HoverEffects.addScanlineEffect(terminal);
    });

    // Animate counters when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.dataset.animated) {
                    statNumber.dataset.animated = 'true';
                    const value = statNumber.textContent.replace(/[^\d]/g, '');
                    const counter = new CounterAnimation(statNumber, value, 2000);
                    counter.start();
                }
            }
        });
    }, observerOptions);

    // Observe all stat items
    statItems.forEach(item => observer.observe(item));

    // Add click handlers for buttons
    document.querySelector('.btn.primary')?.addEventListener('click', function() {
        // Simulate "jacking in" effect
        document.body.style.animation = 'none';
        document.body.style.filter = 'brightness(0.1) contrast(2)';
        
        setTimeout(() => {
            document.body.style.filter = '';
            alert('NEURAL LINK ESTABLISHED\n\nWelcome to the Matrix, Agent.\nYour mission briefing will begin shortly...');
        }, 500);
    });

    document.querySelector('.btn.secondary')?.addEventListener('click', function() {
        // Simulate demo loading
        const btn = this;
        const originalText = btn.textContent;
        btn.textContent = 'LOADING...';
        btn.style.background = '#00ff41';
        btn.style.color = '#000';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            alert('DEMO SIMULATION COMPLETE\n\nSystem capabilities demonstrated.\nReady for full deployment.');
        }, 2000);
    });

    // Add CSS for scanline animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
        
        .btn {
            transition: all 0.3s ease, filter 0.3s ease, transform 0.3s ease;
        }
        
        .stat-item, .capability-item {
            transition: all 0.3s ease, filter 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Add random flicker effect to status indicator
    const statusIndicator = document.querySelector('.status-indicator');
    if (statusIndicator) {
        setInterval(() => {
            if (Math.random() < 0.1) {
                statusIndicator.style.opacity = '0.3';
                setTimeout(() => {
                    statusIndicator.style.opacity = '';
                }, 100);
            }
        }, 1000);
    }

    // Add typing sound effect simulation (visual feedback)
    let isTyping = false;
    document.addEventListener('keydown', function() {
        if (!isTyping) {
            isTyping = true;
            document.body.style.textShadow = '0 0 5px #00ff41';
            setTimeout(() => {
                document.body.style.textShadow = '';
                isTyping = false;
            }, 100);
        }
    });
});

// Add smooth scrolling for better UX
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Console easter egg
console.log(`
██████╗ ██╗ ██████╗ ██╗████████╗ █████╗ ██╗         ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
██╔══██╗██║██╔════╝ ██║╚══██╔══╝██╔══██╗██║         ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
██║  ██║██║██║  ███╗██║   ██║   ███████║██║         ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
██║  ██║██║██║   ██║██║   ██║   ██╔══██║██║         ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
██████╔╝██║╚██████╔╝██║   ██║   ██║  ██║███████╗    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
╚═════╝ ╚═╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝

Welcome to the Digital Matrix, Agent.
Your access level: SUPREME
Status: CONNECTED
Mission: DOMINATE THE DIGITAL LANDSCAPE
`);