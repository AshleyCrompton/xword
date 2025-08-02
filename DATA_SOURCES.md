# Data Sources for Crossword Setters Hub

- **Results**: Crossword-style entries with proper spacing and formatting

### Both Words and Phrases (Default)

- Searches both databases and combines results
- Results are grouped by type (Words first, then Phrases)
- Best for: Comprehensive search when you want all possible matches

## Anagram Generator

The Anagram Generator uses a combined word database for comprehensive anagram finding:

### Combined Database (for Anagrams)

- **Sources**: `filtered_words.txt` + `short_words.txt`
- **Total size**: 9,487 words (1-15 letters)
- **Logic**: Perfect anagrams only - uses ALL input letters exactly once
- **Examples**: LISTEN → SILENT, TINSEL, ENLIST; CAT → ACT; EVIL → VILE, LIVE

## Technical Implementationview

The Word & Phrase Suggestion Tool now uses two complementary data sources to provide comprehensive search capabilities for crossword construction.

## Data Sources

### 1. Words Database (`filtered_words.txt`)

- **Source**: Google 10,000 English Words (first20hours/google-10000-english)
- **Original source**: Based on Google's Trillion Word Corpus frequency analysis
- **Size**: 9,460 words (filtered for 3-15 letters)
- **Format**: Simple text file, one word per line, lowercase
- **Content**: Most common English words only, frequency-ordered, swear-free
- **Quality**: Curated for practical usage - the 10,000 most frequent words cover ~90% of English usage
- **Examples**: the, and, business, computer, research

### 2. Short Words Database (`short_words.txt`)

- **Source**: Manually curated common 1-2 letter words
- **Size**: 27 words (1-2 letters only)
- **Format**: Simple text file, one word per line, lowercase
- **Content**: Essential short words for anagram generation (a, i, am, an, at, be, etc.)
- **Usage**: Combined with main word list for comprehensive anagram generation
- **Examples**: a, i, o, am, an, as, at, be, by, do, go, he, if, in, is, it, me, my, no, of, on, or, so, to, up, us, we

### 3. Phrases Database (`ProcessedPhrases.csv`)

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
