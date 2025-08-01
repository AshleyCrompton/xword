# Data Sources for Crossword Setters Hub

## Overview
The Word & Phrase Suggestion Tool now uses two complementary data sources to provide comprehensive search capabilities for crossword construction.

## Data Sources

### 1. Words Database (`filtered_words.txt`)
- **Source**: dwyl/english-words GitHub repository (open source, Unlicense)
- **Original size**: 370,106 words
- **Filtered size**: 350,193 words (3-15 letters only)
- **Format**: Simple text file, one word per line, uppercase
- **Content**: Single English words only (no spaces, numbers, or symbols)
- **Examples**: AARDVARK, BICYCLE, COMPUTER, ELEPHANT

### 2. Phrases Database (`ProcessedPhrases.csv`)
- **Source**: Processed from original `Copy of AllPhrases.csv`
- **Size**: 100,803 phrases
- **Format**: CSV with DisplayWord and ProcessedWord columns
- **Content**: Crossword-style phrases including abbreviations, acronyms, and multi-word entries
- **Examples**: A B C, B B C, N A S A, J F K

## Search Options

### Words Only
- Searches only the filtered_words.txt database
- Best for: Single-word answers, common vocabulary
- Results: Clean, single words in standard dictionary format

### Phrases Only
- Searches only the ProcessedPhrases.csv database
- Best for: Abbreviations, acronyms, crossword-specific phrases
- Results: Crossword-style entries with proper spacing and formatting

### Both Words and Phrases (Default)
- Searches both databases and combines results
- Results are grouped by type (Words first, then Phrases)
- Best for: Comprehensive search when you want all possible matches

## Technical Implementation

### Data Loading
- Both data sources are loaded asynchronously when the page loads
- Words are stored in memory for fast pattern matching
- CSV parsing handles quoted fields and special characters

### Search Algorithm
- Uses regex pattern matching with case-insensitive search
- ProcessedWord (uppercase, no spaces) is used for matching
- DisplayWord (original formatting) is shown in results
- Results are sorted alphabetically within each category

### Performance
- 350k+ words loaded in ~1-2 seconds
- 100k+ phrases loaded in ~2-3 seconds
- Search operations are near-instantaneous once data is loaded
- Results are limited by length (3-15 letters) for crossword relevance

## Benefits of Dual Sources

1. **Comprehensive Coverage**: Combines standard dictionary words with crossword-specific phrases
2. **Flexibility**: Users can choose the most relevant data source for their needs
3. **Quality**: Words database provides clean vocabulary; phrases database provides crossword conventions
4. **Open Source**: Both sources are freely available and can be updated/maintained
5. **Fast Search**: In-memory storage enables quick pattern matching across large datasets

## File Sizes
- `filtered_words.txt`: ~3.8MB (350k words)
- `ProcessedPhrases.csv`: ~6.2MB (100k phrases)
- Total database size: ~10MB
- Load time: 3-5 seconds on typical broadband connection
