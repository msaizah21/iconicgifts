const messageIcon = document.getElementById('message-icon');
const chatOptions = document.getElementById('chat-options');
const liveChat = document.getElementById('live-chat');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

let currentQuestion = 0;
const questions = ['May I know your name?', 'Great! And your email address?', 'Excellent. How can we help you today?'];
const userInfo = {};
let isUserTyping = false;
let userTypingTimeout;

messageIcon.addEventListener('click', () => {
    messageIcon.style.display = 'none';
    fadeIn(chatOptions);
});

function startLiveChat() {
    fadeOut(chatOptions, () => {
        fadeIn(liveChat);
        showBotTyping(() => appendMessage('Bot', questions[currentQuestion]));
    });
}

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) {
        alert("Please enter a message.");
        return;
    }

    appendMessage('You', userMessage);
    userInput.value = '';

    if (currentQuestion < questions.length) {
        userInfo[questions[currentQuestion].toLowerCase().replace(/[^a-z]/g, '')] = userMessage;
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showBotTyping(() => appendMessage('Bot', questions[currentQuestion]));
        } else {
            showBotTyping(() => {
                const response = getChatbotResponse(userInfo.howcanwehelpyoutoday);
                appendMessage('Bot', response);
            });
        }
    }
}

function getChatbotResponse(concern) {
    const keywords = {
        "location": "We are located at Harmain Building, Ajman, UAE.",
        'notebook': 'We offer a variety of notebooks that can be customized with your company logo or message:\n- Hardcover journals\n- Softcover notebooks\n- Spiral-bound notepads\nAll available in different sizes and paper types.',
        'pen': 'Our customized pens are perfect for corporate gifting:\n- Ballpoint pens\n- Rollerball pens\n- Fountain pens\nWe can engrave your logo or message on the barrel or cap.',
        'trophy': 'We create stunning trophies for recognition events:\n- Crystal awards\n- Metal trophies\n- Acrylic plaques\nCustomize with your company name, logo, and recipient\'s details.',
        'leather': 'Our leather products add a touch of luxury to your branding:\n- Wallets\n- Portfolios\n- Keychains\nWe use high-quality leather and can deboss or foil stamp your logo.',
        'plastic': 'Our ABS plastic products are durable and customizable:\n- USB drives\n- Power banks\n- Travel mugs\nWe can print or engrave your branding on these items.',
        'pricing': 'Pricing varies based on the product, quantity, and customization. We offer discounts for bulk orders. For a precise quote, please email us at sales@iconicgifts.com with your requirements.',
        'delivery': 'We offer worldwide shipping. Standard delivery is 7-10 business days. Express options are available. Shipping costs depend on location and order size.',
        'customerservice': "Our customer service team is available 24/7 to assist you. You can reach us via email or phone.",
        "store hours": "Our physical store is open from 10 AM to 10 PM daily.",
        "feedback": "We value your feedback! Please let us know if there's anything we can improve.",
        "help": "Sure, I'm here to help! What do you need assistance with?",
        "order": "To place an order, please visit our website and add the items to your cart. If you need assistance, let me know!",
        "catalog": "Our product catalog is available on our website. You can browse through various categories to find what you're looking for.",
        "billing": "For billing inquiries, please contact our support team at billing@iconicgift.com.",
        "technical issue": "If you're experiencing a technical issue, please describe the problem and we'll assist you.",
        "careers": "Interested in joining our t  eam? Check out the careers page on our website for current openings.",
        "about us": "Iconic Gift is a leading provider of unique and personalized gifts. Our mission is to bring joy to every occasion.",
        "return": "To initiate a return, please contact our customer service team with your order details.",
        "exchange": "We offer exchanges for items in their original condition. Please contact customer service for assistance.",
        "complaint": "We're sorry to hear that you're not satisfied. Please provide details and we'll work to resolve the issue.",
        "terms and conditions": "You can read our terms and conditions on our website for detailed information.",
        "privacy policy": "Your privacy is important to us. Please review our privacy policy on our website."
    };

    for (const [keyword, response] of Object.entries(keywords)) {
        if (concern.toLowerCase().includes(keyword)) {
            return response;
        }
    }

    return "We offer a wide range of customizable corporate gifts beyond what I've mentioned. This includes eco-friendly products, tech accessories, and event merchandise. To discuss your specific needs or to get a custom quote, please email our team at sales@iconicgifts.com or call us at +971 50 642 6390. We're here to make your corporate gifting exceptional!";
}

function showBotTyping(callback) {
    chatMessages.innerHTML += '<div class="typing"><span></span><span></span><span></span></div>';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => {
        chatMessages.lastChild.remove();
        callback();
    }, 2000); // Simulating bot typing for 2 seconds
}

function appendMessage(sender, message) {
    chatMessages.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function minimizeChat(type) {
    const chat = document.getElementById(type === 'options' ? 'chat-options' : 'live-chat');
    chat.style.display = 'none';
    messageIcon.style.display = 'block';
}

function closeChat(type) {
    const chat = document.getElementById(type === 'options' ? 'chat-options' : 'live-chat');
    fadeOut(chat, () => {
        if (type === 'live') {
            currentQuestion = 0;
            chatMessages.innerHTML = '';
        }
        messageIcon.style.display = 'block';
    });
}

function fadeOut(element, callback) {
    element.style.opacity = 1;
    (function fade() {
        if ((element.style.opacity -= 0.1) < 0) {
            element.style.display = 'none';
            if (callback) callback();
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

function fadeIn(element, callback) {
    element.style.opacity = 0;
    element.style.display = 'block';
    (function fade() {
        let val = parseFloat(element.style.opacity);
        if (!((val += 0.1) > 1)) {
            element.style.opacity = val;
            requestAnimationFrame(fade);
        } else if (callback) {
            callback();
        }
    })();
}

userInput.addEventListener('input', () => {
    if (!isUserTyping) {
        isUserTyping = true;
        chatMessages.innerHTML += '<div class="typing user-typing"><span></span><span></span><span></span></div>';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    clearTimeout(userTypingTimeout);
    userTypingTimeout = setTimeout(() => {
        isUserTyping = false;
        chatMessages.querySelector('.user-typing').remove();
    }, 1000); // Stop "typing" 1 second after the user stops
});

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});