#!/usr/bin/env python3
"""
Process new 15-31 letter phrases CSV and append to existing ProcessedPhrases.csv.
Uses the same processing logic as the original script.
"""

import csv
import os
import re

def count_alphabetic_chars(text):
    """Count only alphabetic characters in a string."""
    return len(re.sub(r'[^a-zA-Z]', '', text))

def process_new_phrases():
    input_file = "/Users/ashleycrompton/VSCode Projects/xword/Phrases 15 - 31 Letters - Phrases 15 - 31 Letters.csv"
    output_file = "/Users/ashleycrompton/VSCode Projects/xword/ProcessedPhrases.csv"
    
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found")
        return
    
    # Check if output file exists
    if not os.path.exists(output_file):
        print(f"Error: Output file {output_file} not found. Please run the original process_phrases.py first.")
        return
    
    new_rows = []
    
    with open(input_file, 'r', encoding='utf-8') as infile:
        # Create CSV reader
        reader = csv.reader(infile)
        
        # Skip header row
        header = next(reader)
        print(f"Input header: {header}")
        
        row_count = 0
        output_count = 0
        
        for row in reader:
            row_count += 1
            
            if len(row) < 3:
                continue
                
            letter_count = row[0].strip()
            pattern = row[1].strip().strip('"')  # Remove quotes around pattern
            
            # Process Word1 through Word9 (columns 2-10, but we have 0-based indexing)
            for i in range(2, min(len(row), 11)):  # Word1-Word9 are in positions 2-10
                word = row[i].strip() if i < len(row) else ""
                
                if word and word != "":  # Only process non-empty words
                    display_word = word
                    processed_word = word.upper().replace(" ", "")
                    # FIX: Only count alphabetic characters for true length
                    true_length = count_alphabetic_chars(display_word)
                    
                    output_row = [letter_count, pattern, true_length, display_word, processed_word]
                    new_rows.append(output_row)
                    output_count += 1
            
            # Print progress every 100 rows
            if row_count % 100 == 0:
                print(f"Processed {row_count} input rows, generated {output_count} new rows")
    
    # Append new rows to existing file
    with open(output_file, 'a', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerows(new_rows)
    
    print(f"\nProcessing complete!")
    print(f"Input rows processed: {row_count}")
    print(f"New rows added: {output_count}")
    print(f"Appended to: {output_file}")
    
    # Get total count of processed file
    with open(output_file, 'r', encoding='utf-8') as infile:
        total_rows = sum(1 for line in infile) - 1  # Subtract 1 for header
    print(f"Total rows in ProcessedPhrases.csv: {total_rows}")

if __name__ == "__main__":
    process_new_phrases()
