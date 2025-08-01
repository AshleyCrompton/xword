#!/usr/bin/env python3
"""
Process AllPhrases.csv to create a new format with individual word entries.
"""

import csv
import os

def process_csv():
    input_file = "/Users/ashleycrompton/VSCode Projects/xword/Copy of AllPhrases.csv"
    output_file = "/Users/ashleycrompton/VSCode Projects/xword/ProcessedPhrases.csv"
    
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found")
        return
    
    output_rows = []
    
    # Add header row
    output_rows.append(['LetterCount', 'Pattern', 'TrueLength', 'DisplayWord', 'ProcessedWord'])
    
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
                    true_length = len(display_word)
                    
                    output_row = [letter_count, pattern, true_length, display_word, processed_word]
                    output_rows.append(output_row)
                    output_count += 1
            
            # Print progress every 1000 rows
            if row_count % 1000 == 0:
                print(f"Processed {row_count} input rows, generated {output_count} output rows")
    
    # Write output file
    with open(output_file, 'w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerows(output_rows)
    
    print(f"\nProcessing complete!")
    print(f"Input rows processed: {row_count}")
    print(f"Output rows generated: {output_count}")
    print(f"Output file: {output_file}")

if __name__ == "__main__":
    process_csv()
