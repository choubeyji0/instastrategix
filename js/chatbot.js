// js/chatbot.js - Enhanced Chatbot for Instastrategix
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.chatbot-toggle');
    const chatWindow = document.querySelector('.chatbot-window');
    const closeBtn = document.querySelector('.close-chat');
    const messages = document.querySelector('.chat-messages');
    const input = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.chat-input button');
    const quickReplies = document.querySelector('.quick-replies');

    // Toggle chat window
    toggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open') && messages.children.length === 0) {
            addMessage('bot', 'Hello! 👋 Welcome to <strong>Instastrategix</strong> – Global Digital Marketing Agency serving UK, USA, Canada, Dubai, and India.<br><br>How can I help you today?');
            showQuickReplies(['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call', 'Visit Blog']);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    // Send message
    function sendMessage() {
        const text = input.value.trim();
        if (text === '') return;

        addMessage('user', text);
        input.value = '';
        showTyping();

        const response = getBotResponse(text.toLowerCase());
        setTimeout(() => {
            hideTyping();
            addMessage('bot', response.text);
            if (response.quickReplies) {
                showQuickReplies(response.quickReplies);
            }
        }, 1000 + Math.random() * 1000);
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Quick reply handler
    quickReplies.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-reply')) {
            const text = e.target.textContent;
            addMessage('user', text);
            showTyping();
            const response = getBotResponse(text.toLowerCase());
            setTimeout(() => {
                hideTyping();
                addMessage('bot', response.text);
                if (response.quickReplies) {
                    showQuickReplies(response.quickReplies);
                }
            }, 800);
        }
    });

    // Add message
    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.innerHTML = text;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    // Show quick replies
    function showQuickReplies(options) {
        quickReplies.innerHTML = '';
        options.forEach(option => {
            const btn = document.createElement('button');
            btn.classList.add('quick-reply');
            btn.textContent = option;
            quickReplies.appendChild(btn);
        });
    }

    // Typing indicator
    function showTyping() {
        const typing = document.createElement('div');
        typing.classList.add('message', 'bot', 'typing');
        typing.innerHTML = '<span></span><span></span><span></span>';
        typing.id = 'typing-indicator';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;
    }

    function hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    // Enhanced bot responses
    function getBotResponse(message) {
        if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message.includes('good')) {
            return {
                text: 'Hi there! 😊 I\'m the Instastrategix assistant. We help brands scale with SEO, Paid Ads, Social Media, and Content Strategy across global markets.<br><br>What would you like to know?',
                quickReplies: ['Our Services', 'Pricing & Packages', 'Locations We Serve', 'Book Strategy Call']
            };
        }

        if (message.includes('service') || message.includes('what do you offer') || message.includes('what do you do')) {
            return {
                text: 'We offer:<br>• <strong>Search Engine Optimization (SEO)</strong> – Rank higher globally<br>• <strong>Paid Advertising</strong> – Google & Social Ads with high ROI<br>• <strong>Social Media Marketing</strong> – Build engagement & authority<br>• <strong>Content & Brand Strategy</strong> – Position you as industry leader<br><br><a href="services.html" target="_blank">View full Services →</a>',
                quickReplies: ['Pricing & Packages', 'Book Strategy Call']
            };
        }

        if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('package')) {
            return {
                text: 'We don\'t have fixed packages – every strategy is custom-built for your goals and market.<br><br>Typical investments start from competitive rates, fully transparent.<br><br>Best way forward: Book a <strong>Free Strategy Call</strong> and get a tailored proposal with exact pricing!',
                quickReplies: ['Book Strategy Call', 'Contact Us']
            };
        }

        if (message.includes('location') || message.includes('where') || message.includes('country') || message.includes('serve')) {
            return {
                text: 'We\'re based in India and proudly serve clients across:<br>• United Kingdom<br>• United States<br>• Canada<br>• Dubai (UAE)<br>• India<br>• And international markets<br><br>Global expertise with local execution! 🌍',
                quickReplies: ['Our Services', 'Book Strategy Call']
            };
        }

        if (message.includes('book') || message.includes('call') || message.includes('strategy') || message.includes('free call')) {
            return {
                text: 'Great choice! You can book your <strong>Free Strategy Call</strong> here:<br><a href="contact-us.html" target="_blank">→ Book Now</a><br><br>We\'ll discuss your goals and create a custom growth plan.',
                quickReplies: ['Our Services', 'Pricing & Packages']
            };
        }

        if (message.includes('blog') || message.includes('tip') || message.includes('learn') || message.includes('guide')) {
            return {
                text: 'Check out our educational blog for proven digital marketing strategies:<br><a href="https://instastrategix0.blogspot.com/" target="_blank">→ Visit Instastrategix Blog</a><br><br>Free tips for startups, coaches, and businesses!',
                quickReplies: ['Our Services', 'Book Strategy Call']
            };
        }

        if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('talk')) {
            return {
                text: 'You can reach us at:<br>• Email: <a href="mailto:instastrategix@gmail.com">instastrategix@gmail.com</a><br>• Or fill the form: <a href="contact-us.html" target="_blank">Contact Page →</a>',
                quickReplies: ['Book Strategy Call']
            };
        }

        if (message.includes('about') || message.includes('who are you') || message.includes('team')) {
            return {
                text: 'Instastrategix is a results-driven digital marketing agency focused on scalable, data-backed growth.<br><br>We partner with ambitious brands that want real revenue impact – no fluff, just performance.',
                quickReplies: ['Our Services', 'Locations We Serve']
            };
        }

        return {
            text: 'I\'m doing my best! 😅 For anything specific about your business or custom strategy, the team can help directly.<br><br>Book a <strong>Free Strategy Call</strong> or visit <a href="contact-us.html" target="_blank">Contact page →</a>',
            quickReplies: ['Our Services', 'Pricing & Packages', 'Book Strategy Call']
        };
    }
});
