#!/usr/bin/env python3
"""
Remove all lines from words.txt that contain non-alphabetic characters.
This will clean up entries like "in(a)", "in(p)", etc.
"""

import re

def clean_words_file():
    # Read all lines from the file
    with open('words.txt', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"Read {len(lines)} lines from words.txt")
    
    # Filter out lines that contain non-alphabetic characters
    clean_lines = []
    removed_lines = []
    
    for line_num, line in enumerate(lines, 1):
        word = line.strip()
        if word and re.match(r'^[a-zA-Z]+$', word):
            # Only alphabetic characters
            clean_lines.append(word)
        else:
            # Contains non-alphabetic characters or is empty
            if word:  # Don't log empty lines
                removed_lines.append((line_num, word))
    
    # Write back the clean lines
    with open('words.txt', 'w', encoding='utf-8') as f:
        for word in clean_lines:
            f.write(word + '\n')
    
    print(f"Kept {len(clean_lines)} clean words")
    print(f"Removed {len(removed_lines)} words with non-alphabetic characters")
    
    if removed_lines:
        print("\nRemoved words:")
        for line_num, word in removed_lines[:20]:  # Show first 20
            print(f"  Line {line_num}: '{word}'")
        if len(removed_lines) > 20:
            print(f"  ... and {len(removed_lines) - 20} more")

if __name__ == "__main__":
    clean_words_file()
