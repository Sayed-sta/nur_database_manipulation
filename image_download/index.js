const fs = require('fs');
const path = require('path');
const download = require('image-downloader');

// load all data from all_questions.json file
const all_questions = JSON.parse(fs.readFileSync(path.join(__dirname, 'all_questions.json')));

let questionImages = [];
let answerImages = [];
let explanationImages = [];

for (let i = 0; i < all_questions.length; i++) {
    const question = all_questions[i];

    if (Object.keys(question.question_text.entityMap).length) {
        for (let j = 0; j < Object.keys(question.question_text.entityMap).length; j++) {
            questionImages.push(question.question_text?.entityMap[j]?.data?.src);
        }
    }

    if (Object.keys(question.answer_text.entityMap).length) {
        for (let j = 0; j < Object.keys(question.answer_text.entityMap).length; j++) {
            answerImages.push(question.answer_text?.entityMap[j]?.data?.src);
        }
    }

    if (Object.keys(question.explanation_text.entityMap).length) {
        for (let j = 0; j < Object.keys(question.explanation_text.entityMap).length; j++) {
            explanationImages.push(question.explanation_text?.entityMap[j]?.data?.src);
        }
    }
}

// Create the images directory if it doesn’t exist
const imagesDir = path.join(__dirname, 'explanationsa');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Helper to sanitize filenames
function safeFilename(url, index) {
    const ext = path.extname(url).split('?')[0] || '.png'; // try to keep original ext
    return `img_${index}${ext}`;
}

// download images
explanationImages.forEach((url, i) => {
    const options = {
        url: url,
        dest: path.join(imagesDir, safeFilename(url, i))  // full file path instead of folder
    };

    download.image(options)
        .then(({ filename }) => {
            console.log('Saved to', filename);
        })
        .catch((err) => console.error(err));
});
