// This file loads words from multiple sources
let WORDS = [];
let PHRASES = [];
let isDataLoaded = false;

// Load data from both sources
async function loadWords() {
  try {
    console.log('Loading word and phrase data...');
    
    // Load simple words from filtered_words.txt
    const wordsResponse = await fetch("../filtered_words.txt");
    const wordsText = await wordsResponse.text();
    const wordLines = wordsText.split("\n");
    
    WORDS = [];
    for (let i = 0; i < wordLines.length; i++) {
      const word = wordLines[i].trim();
      if (word && word.length >= 3 && word.length <= 15) {
        WORDS.push({
          displayWord: word,
          processedWord: word,
          length: word.length,
          type: 'word'
        });
      }
    }
    
    // Load phrases from ProcessedPhrases.csv
    const phrasesResponse = await fetch("../ProcessedPhrases.csv");
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
            type: 'phrase'
          });
        }
      }
    }
    
    isDataLoaded = true;
    console.log(`Loaded ${WORDS.length} words and ${PHRASES.length} phrases`);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Get combined data based on selection
function getCombinedData(selection = 'both') {
  if (!isDataLoaded) {
    return [];
  }
  
  switch (selection) {
    case 'words':
      return WORDS;
    case 'phrases':
      return PHRASES;
    case 'both':
    default:
      return [...WORDS, ...PHRASES];
  }
}

// Simple CSV parser to handle quoted fields
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Load words when page loads
loadWords();
