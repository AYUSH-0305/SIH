import json
import re
from typing import List, Dict, Any, Optional
import pdfplumber
import pandas as pd
from pathlib import Path

class StudentDataConverter:
    def __init__(self):
        self.students_data = []
    
    def extract_data_from_pdf(self, pdf_path: str, column_mapping: Optional[Dict[str, str]] = None) -> List[Dict[str, Any]]:
        """
        Extract student data from PDF and convert to structured format
        """
        students = []
        
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                # Extract text from page
                text = page.extract_text()
                
                if text:
                    # Try to extract table data
                    tables = page.extract_tables()
                    
                    if tables:
                        for table in tables:
                            students.extend(self._process_table(table, column_mapping))
                    else:
                        # Fallback to text parsing if no tables found
                        students.extend(self._parse_text_data(text, column_mapping))
        
        return students
    
    def get_pdf_columns(self, pdf_path: str) -> List[str]:
        """
        Extract column headers from PDF to help with mapping
        """
        columns = []
        
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                tables = page.extract_tables()
                if tables:
                    # Get the first table's header row
                    first_table = tables[0]
                    if first_table and len(first_table) > 0:
                        columns = [str(cell).strip() for cell in first_table[0] if cell]
                        break
        
        return columns
    
    def _process_table(self, table: List[List[str]], column_mapping: Optional[Dict[str, str]] = None) -> List[Dict[str, Any]]:
        """
        Process table data and convert to student records
        """
        students = []
        
        if not table or len(table) == 0:
            return students
        
        # Get header row
        header_row = table[0] if table else []
        data_rows = table[1:] if len(table) > 1 else []
        
        # If no column mapping provided, use default positions
        if not column_mapping:
            column_mapping = {
                "Rno": 0,
                "Jno": 1, 
                "CN": 2,
                "B": 3,
                "Sec": 4
            }
        
        for row in data_rows:
            if len(row) >= max(column_mapping.values()) + 1:  # Ensure we have enough columns
                student = {}
                
                # Map columns based on the provided mapping
                for db_column, pdf_column_index in column_mapping.items():
                    if pdf_column_index < len(row):
                        student[db_column] = str(row[pdf_column_index]).strip() if row[pdf_column_index] else ""
                    else:
                        student[db_column] = ""
                
                # Only add if we have essential data
                if student.get("Rno") and student.get("CN"):
                    students.append(student)
        
        return students
    
    def _parse_text_data(self, text: str, column_mapping: Optional[Dict[str, str]] = None) -> List[Dict[str, Any]]:
        """
        Parse text data when table extraction fails
        """
        students = []
        lines = text.split('\n')
        
        # If no column mapping provided, use default positions
        if not column_mapping:
            column_mapping = {
                "Rno": 0,
                "Jno": 1, 
                "CN": 2,
                "B": 3,
                "Sec": 4
            }
        
        for line in lines:
            # Look for patterns like "24/A01/001" followed by other data
            roll_pattern = r'(\d{2}/A\d{2}/\d{3})'
            match = re.search(roll_pattern, line)
            
            if match:
                parts = line.split()
                if len(parts) >= max(column_mapping.values()) + 1:
                    student = {}
                    
                    # Map columns based on the provided mapping
                    for db_column, pdf_column_index in column_mapping.items():
                        if pdf_column_index < len(parts):
                            student[db_column] = parts[pdf_column_index].strip()
                        else:
                            student[db_column] = ""
                    
                    # Only add if we have essential data
                    if student.get("Rno") and student.get("CN"):
                        students.append(student)
        
        return students
    
    def save_to_json(self, students: List[Dict[str, Any]], output_path: str):
        """
        Save student data to JSON file
        """
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(students, f, indent=2, ensure_ascii=False)
    
    def load_from_json(self, json_path: str) -> List[Dict[str, Any]]:
        """
        Load student data from JSON file
        """
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)

def main():
    """
    Example usage of the converter
    """
    converter = StudentDataConverter()
    
    # Example: Convert PDF to JSON
    # pdf_path = "student_data.pdf"
    # students = converter.extract_data_from_pdf(pdf_path)
    # converter.save_to_json(students, "students_data.json")
    
    # Create sample data based on the image description
    sample_students = [
        {
            "Rno": "24/A01/001",
            "Jno": "240310038495",
            "CN": "AADIT MOGHA",
            "B": "CS",
            "Sec": "Sec-1"
        },
        {
            "Rno": "24/A01/005",
            "Jno": "OIA240000233",
            "CN": "AADYANH GUPTA",
            "B": "CS",
            "Sec": "Sec-1"
        },
        {
            "Rno": "24/A01/009",
            "Jno": "INT202400993",
            "CN": "Aashi Gupta",
            "B": "CS",
            "Sec": "Sec-1"
        },
        {
            "Rno": "24/A01/044",
            "Jno": "240311071488",
            "CN": "AMBESH KUMAR",
            "B": "CS",
            "Sec": "Sec-1"
        }
    ]
    
    # Save sample data
    converter.save_to_json(sample_students, "sample_students_data.json")
    print("Sample data saved to sample_students_data.json")

if __name__ == "__main__":
    main()
