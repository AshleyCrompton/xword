// This file loads words from multiple sources
let WORDS = [];
let PHRASES = [];
let isDataLoaded = false;

// Load data from both sources
async function loadWords() {
  try {
    console.log("Loading word and phrase data...");
    console.log("Current URL:", window.location.href);

    // Load simple words from filtered_words.txt
    console.log("Fetching filtered_words.txt...");
    const wordsResponse = await fetch("filtered_words.txt");
    console.log(
      "Words response status:",
      wordsResponse.status,
      wordsResponse.statusText
    );
    if (!wordsResponse.ok) {
      console.error(
        "Failed to load words file:",
        wordsResponse.status,
        wordsResponse.statusText
      );
      throw new Error(`Failed to load words: ${wordsResponse.status}`);
    }

    const wordsText = await wordsResponse.text();
    const wordLines = wordsText.split("\n").filter((line) => line.trim());

    WORDS = wordLines.map((word) => {
      const trimmed = word.trim().toLowerCase();
      return {
        word: trimmed,
        length: trimmed.replace(/[^a-z]/g, "").length, // Count only alphabetic characters
      };
    });

    console.log(`Loaded ${WORDS.length} words from database`);

    // Load phrases from CSV file
    console.log("Fetching ProcessedPhrases.csv...");
    const phrasesResponse = await fetch("ProcessedPhrases.csv");
    console.log(
      "Phrases response status:",
      phrasesResponse.status,
      phrasesResponse.statusText
    );
    if (!phrasesResponse.ok) {
      console.error(
        "Failed to load phrases file:",
        phrasesResponse.status,
        phrasesResponse.statusText
      );
      throw new Error(`Failed to load phrases: ${phrasesResponse.status}`);
    }

    const phrasesText = await phrasesResponse.text();
    const phraseLines = phrasesText.split("\n");

    PHRASES = [];
    for (let i = 1; i < phraseLines.length; i++) {
      // Skip header line
      const line = phraseLines[i].trim();
      if (line) {
        // Parse CSV line - handle potential commas in quoted fields
        const csvParts = parseCSVLine(line);
        if (csvParts.length >= 5) {
          const letterCount = csvParts[0];
          const pattern = csvParts[1];
          const trueLength = parseInt(csvParts[2]);
          const displayWord = csvParts[3];
          const processedWord = csvParts[4];

          // Store phrase data
          PHRASES.push({
            letterCount: letterCount,
            pattern: pattern,
            trueLength: trueLength,
            displayWord: displayWord,
            processedWord: processedWord,
            length: processedWord.length,
            type: "phrase",
          });
        }
      }
    }

    isDataLoaded = true;
    console.log(`Loaded ${WORDS.length} words and ${PHRASES.length} phrases`);

    // Update UI to show loading is complete
    const loadingStatus = document.getElementById("loading-status");
    const noResults = document.querySelector(".no-results");
    if (loadingStatus) {
      loadingStatus.textContent = `✅ Loaded ${WORDS.length} words and ${PHRASES.length} phrases`;
      loadingStatus.style.color = "green";
    }
    if (noResults) {
      noResults.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error loading data:", error);

    // Update UI to show error
    const loadingStatus = document.getElementById("loading-status");
    if (loadingStatus) {
      loadingStatus.textContent = `❌ Failed to load data: ${error.message}`;
      loadingStatus.style.color = "red";
    }

    alert(
      `Failed to load word data: ${error.message}. Please check the browser console for more details.`
    );
  }
}

// Get combined data based on selection
function getCombinedData(selection = "both") {
  if (!isDataLoaded) {
    return [];
  }

  switch (selection) {
    case "words":
      return WORDS;
    case "phrases":
      return PHRASES;
    case "both":
    default:
      return [...WORDS, ...PHRASES];
  }
}

// Simple CSV parser to handle quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

// Load words when page loads
loadWords();
