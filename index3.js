const fs = require('fs');
const path = require('path');
// If Node < 18 uncomment next line
// const fetch = require('node-fetch');

const API_URL = 'https://api.daricomma.com/v2/question/1cb9c6a4-5202-4701-8165-2b1dea4f8e3d';
const PAGE_SIZE = 25;
const OUTPUT_FOLDER = 'SSC/Genarel/Math/দুই চলকবিশিষ্ট সরল সহসমীকরণ';
const OUTPUT_FILE = 'all_questions.json';

const AUTHORIZATION_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25fZGF0ZSI6IjIwMjUtMDgtMTJUMDk6MTg6NDYuNDI4WiIsImlkIjoiODE2MDg2NmQtNjBhMy00ZTczLThlNzItYjQ5OTJkMDZlN2I5IiwiZnVsbG5hbWUiOiJOdXIgSG9zc2FpbiIsInJvbGUiOiJ2aXNpdG9yIiwiZW1haWwiOm51bGwsIm1vYmlsZSI6IjAxNzAxNTkzMTAyIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInZpc2l0b3IiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidmlzaXRvciIsIngtaGFzdXJhLXVzZXItaWQiOiI4MTYwODY2ZC02MGEzLTRlNzMtOGU3Mi1iNDk5MmQwNmU3YjkiLCJ4LWhhc3VyYS11c2VyLXJvbGUiOiJ2aXNpdG9yIiwieC1oYXN1cmEtdXNlci1lbWFpbCI6bnVsbCwieC1oYXN1cmEtdXNlci1tb2JpbGUiOiIwMTcwMTU5MzEwMiJ9LCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3NTYyODA3ODgsImV4cCI6MTc1Njg4NTU4OH0.rCZj41KQOijHxyEm-qJQsp8AuumZx963vgiFN7WoHpI';

async function fetchAllQuestions() {
  let page = 1;
  let allQuestions = [];
  let hasMore = true;

  console.log('📥 Starting to fetch questions...');

  while (hasMore) {
    const url = `${API_URL}?page=${page}`;
    console.log(`Fetching page ${page}...`);

    try {
      const response = await fetch(url, {
        headers: { Authorization: AUTHORIZATION_TOKEN },
      });

      if (!response.ok) {
        console.error(`❌ HTTP error at page ${page}: ${response.status}`);
        break;
      }

      const data = await response.json();
      const questions = data?.data?.questions || [];

      console.log(`✔ Page ${page} returned ${questions.length} questions`);

      allQuestions = allQuestions.concat(questions);

      if (questions.length === 0) {
        hasMore = false;
      } else {
        page++;
      }
    } catch (err) {
      console.error(`Fetch error at page ${page}:`, err);
      break;
    }
  }

  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
  const fullPath = path.join(OUTPUT_FOLDER, OUTPUT_FILE);
  fs.writeFileSync(fullPath, JSON.stringify(allQuestions, null, 2));

  console.log(`✅ Fetched total ${allQuestions.length} questions`);
  console.log(`📁 Saved to ${fullPath}`);
}

fetchAllQuestions();