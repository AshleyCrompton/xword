// This file loads the words from UniquePhrases2.txt at runtime
let WORDS = [];

// Load words from the text file
async function loadWords() {
  try {
    const response = await fetch("../UniquePhrases2.txt");
    const text = await response.text();
    const lines = text.split("\n");

    WORDS = [];
    for (let i = 1; i < lines.length; i++) {
      // Skip header line
      const line = lines[i].trim();
      if (line) {
        const parts = line.split("\t");
        if (parts.length >= 2) {
          const phrase = parts[1].toUpperCase(); // Convert to uppercase
          WORDS.push(phrase);
        }
      }
    }
    console.log(`Loaded ${WORDS.length} words`);
  } catch (error) {
    console.error("Error loading words:", error);
  }
}

// Load words when page loads
loadWords();
