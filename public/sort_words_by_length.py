#!/usr/bin/env python3
"""
Sort words.txt by length first, then alphabetically within each length group.
This optimizes anagram searching by putting short, commonly-used words first.
"""

def sort_words_by_length():
    # Read all words from the file
    with open('words.txt', 'r', encoding='utf-8') as f:
        words = [line.strip() for line in f if line.strip()]
    
    print(f"Read {len(words)} words from words.txt")
    
    # Sort by length first, then alphabetically within each length
    sorted_words = sorted(words, key=lambda word: (len(word), word.lower()))
    
    # Write back to the file
    with open('words.txt', 'w', encoding='utf-8') as f:
        for word in sorted_words:
            f.write(word + '\n')
    
    print(f"Successfully sorted {len(sorted_words)} words by length")
    
    # Show some statistics
    length_counts = {}
    for word in sorted_words:
        length = len(word)
        length_counts[length] = length_counts.get(length, 0) + 1
    
    print("\nWord count by length:")
    for length in sorted(length_counts.keys())[:10]:  # Show first 10 lengths
        count = length_counts[length]
        print(f"  {length} letters: {count} words")
    
    print(f"\nFirst 20 words after sorting:")
    for i, word in enumerate(sorted_words[:20]):
        print(f"  {i+1:2d}. {word}")

if __name__ == "__main__":
    sort_words_by_length()
