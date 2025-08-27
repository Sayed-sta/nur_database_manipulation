const fs = require('fs');
const path = require('path');
const { text } = require('stream/consumers');

const jsonFilePath = path.join(__dirname, 'questions_math_2.json');

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }
    try {
        const jsonDatas = JSON.parse(data);
        let allArray = [];


        jsonDatas.forEach(jsonData => {
            // console.log(jsonData)
            let options = [];
            jsonData.option.forEach((element, index) => {
                let label;
                if (index == 0) label = "a";
                else if (index == 1) label = "b";
                else if (index == 2) label = "c";
                else if (index == 3) label = "d";
                if (typeof element === 'object') {
                    options.push({
                        "label": label,
                        "text": element?.blocks[0]?.text || "",
                        "image": element?.image || ""
                    });
                }
                else {
                    options.push({
                        "label": label,
                        "text": element,
                        "image": ""
                    });
                }
            });

            let choices = [];

            let qeustionParts = [];
            if (jsonData?.question_text?.blocks?.length > 1) {
                for (let i = 1; i < jsonData.question_text?.blocks?.length; i++) {
                    if (jsonData.question_text.blocks[i].text.startsWith("i")) {
                        choices.push({
                            label: jsonData.question_text.blocks[i].text,
                            image: "",
                            text: ""
                        });
                    } else {
                        qeustionParts.push(jsonData.question_text.blocks[i].text);
                    }

                }
            }
            const myObject = {
                group: "HSC/Admission",
                class: "HSC - বিজ্ঞান",
                subject: "HSC - জীববিজ্ঞান ১ম পত্র",
                chapter: "কোষ বিভাজন",
                topic: "মায়োসিস",
                medium: "Bangla",
                questionType: "MCQ",
                mcqnSubType: choices.length > 0 ? "multiple choice" : "single choice",
                structuredAnswer: [],
                related: "Meiosis",
                difficulty: "easy",
                tags: [
                    "Biology",
                    "Medical",
                    "Admission"
                ],
                "attachments": [],
                "subSource": [
                    {
                        "text": ""
                    },
                    {
                        "year": ""
                    }
                ],
                "reactions": {
                    "like": {
                        "$numberInt": "0"
                    },
                    "love": {
                        "$numberInt": "0"
                    },
                    "hot": {
                        "$numberInt": "0"
                    },
                    "useful": {
                        "$numberInt": "0"
                    },
                    "confused": {
                        "$numberInt": "0"
                    }
                },
                "priority": "",
                "rating": "",
                "status": "approved",
                "uploaderId": "user_abc123",
                "uploaderEmail": "user@gmail.com",
                "approvedBy": null,
                "approvedAt": null,
                "version": {
                    "$numberInt": "1"
                },

                // 
                board: jsonData?.question_subsources[0]?.sub_source?.name,
                question: [jsonData?.question_text?.blocks[0]?.text,],
                options: options,
                solution: [{
                    text: jsonData?.answer_text?.blocks[0]?.text,
                    image: jsonData?.answer_text?.entityMap['0']?.data?.src ? [jsonData?.answer_text?.entityMap['0']?.data?.src] : []
                }],
                correctOptionIndices: [jsonData?.mcq_solution_index],
                source: jsonData?.question_subsources[0]?.sub_source?.name,
                year: jsonData?.question_subsources[0]?.year?.name,
                choices: choices,
                passage: {
                    text: [...qeustionParts],
                    images: jsonData?.question_text?.entityMap['0']?.data?.src ? [jsonData?.question_text?.entityMap['0']?.data?.src] : []
                },
                subSource: jsonData?.question_subsources.map(data => {
                    return {
                        text: data?.sub_source?.name || "",
                        year: data?.year?.name || ""
                    }
                })
            }
            // console.log(myObject);
            allArray.push(myObject);
        });

        // write hte allArray to a new JSON file
        fs.writeFile('final_output_for_math-2_hsc.json', JSON.stringify(allArray, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('JSON file has been saved.');
            }
        });


    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
    }
});