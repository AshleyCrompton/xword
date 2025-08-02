# Crossword Setters Hub

A comprehensive public website for cryptic crossword setters, featuring professional tools, expert insights, and community resources.

## Features

### 🔍 Word Suggestion Tool

- Intelligent pattern matching for crossword construction
- Uses processed word database for accurate search
- Displays readable words while searching processed versions
- Modern, responsive interface

### 📝 Blog System

- Expert articles on crossword construction techniques
- Category filtering (Tutorials, Techniques, Tools, Inspiration)
- Search functionality across all posts
- Modal view for full article reading

### 🔗 Resource Directory

- Curated links to essential crossword tools
- Dictionary and reference sites
- Community forums and discussion groups
- Learning materials and tutorials

### 🎨 Modern Design

- Bright, contemporary color scheme
- Responsive layout for all devices
- Smooth animations and transitions
- Accessibility-focused navigation

## File Structure

```
public/
├── main.html          # Homepage with navigation and sections
├── index.html         # Word suggestion tool (updated design)
├── blog.html          # Blog listing with filtering
├── styles.css         # Main stylesheet with modern design
├── main.js           # Homepage functionality
├── blog.js           # Blog functionality and modal system
├── words.js          # Word database loading and CSV parsing
└── ProcessedPhrases.csv # Word database (processed from original CSV)
```

## Technical Features

- **CSV Processing**: Converts original phrases to searchable format
- **Pattern Matching**: Regex-based word pattern searching
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Performance Optimized**: Debounced scrolling and efficient searches
- **SEO Friendly**: Semantic HTML structure and proper meta tags

## Data Processing

The `process_phrases.py` script converts the original `Copy of AllPhrases.csv` into a format optimized for the word suggestion tool:

- **Input**: LetterCount, Pattern, Word1-Word9
- **Output**: LetterCount, Pattern, TrueLength, DisplayWord, ProcessedWord
- Each input row creates up to 9 output rows (one per word)
- ProcessedWord is uppercase with spaces removed (for searching)
- DisplayWord preserves original formatting (for display)

## Usage

1. **Development**: Run a local HTTP server in the project directory

   ```bash
   python3 -m http.server 8000
   ```

2. **Access**: Open `http://localhost:8000/public/main.html` in your browser

3. **Tools**: Navigate to the word suggestion tool from the main page

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Progressive enhancement for older browsers

## Future Enhancements

- User accounts and saved patterns
- Advanced clue generation tools
- Community puzzle sharing
- Real-time collaboration features
- API for third-party integrations

## Copyright

Built with ❤️ for the crossword community. Uses copyright-free design elements and color schemes.
