// This file loads words from multiple sources
let WORDS = [];
let PHRASES = [];
let FULL_WORDS = [];
let isDataLoaded = false;
let isFullWordsLoaded = false;

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
        processedWord: trimmed, // Add processedWord property for search
        displayWord: trimmed, // Add displayWord property for display
        type: "word", // Add type property
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

// Load full words list on demand
async function loadFullWords() {
  if (isFullWordsLoaded) {
    return FULL_WORDS;
  }

  try {
    console.log("Loading full words list from words_alpha.txt...");

    const response = await fetch("words_alpha.txt");
    if (!response.ok) {
      throw new Error(`Failed to load full words list: ${response.status}`);
    }

    const text = await response.text();
    const lines = text.split("\n").filter((line) => line.trim());

    FULL_WORDS = lines.map((word) => {
      const trimmed = word.trim().toLowerCase();
      return {
        word: trimmed,
        processedWord: trimmed,
        displayWord: trimmed,
        type: "fullword",
        length: trimmed.replace(/[^a-z]/g, "").length,
      };
    });

    isFullWordsLoaded = true;
    console.log(`Loaded ${FULL_WORDS.length} words from full words list`);

    return FULL_WORDS;
  } catch (error) {
    console.error("Error loading full words list:", error);
    throw error;
  }
}

// Get combined data based on selection
async function getCombinedData(selection = "both") {
  if (!isDataLoaded) {
    return [];
  }

  switch (selection) {
    case "words":
      return WORDS;
    case "phrases":
      return PHRASES;
    case "fullwords":
      // Load full words on demand
      try {
        return await loadFullWords();
      } catch (error) {
        console.error("Failed to load full words:", error);
        return [];
      }
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
