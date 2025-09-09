# Student Data Management System

A comprehensive system for converting PDF student data to JSON format and providing a REST API for searching student information by enrollment number and other details.

## Features

- **PDF to JSON Conversion**: Extract student data from PDF files and convert to structured JSON format
- **REST API**: FastAPI-based backend with multiple search endpoints
- **Multiple Search Options**: Search by roll number, application number, name, or across all fields
- **File Upload**: Upload PDF or JSON files to update student data
- **Statistics**: Get insights about student distribution by branch and section

## Installation

1. Clone or download the project files
2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### 1. Start the API Server

```bash
python main.py
```

The API will be available at `http://localhost:8000`

### 2. API Endpoints

#### Root Endpoint
- **GET** `/` - API information and available endpoints

#### Student Data
- **GET** `/students` - Get all students
- **GET** `/stats` - Get statistics about student data

#### Search Endpoints
- **GET** `/search/roll/{roll_no}` - Search by roll number
- **GET** `/search/application/{application_no}` - Search by application number  
- **GET** `/search/name/{name}` - Search by student name (partial match)
- **GET** `/search?query={query}` - Search across all fields

#### File Upload
- **POST** `/upload/pdf` - Upload and process PDF file
- **POST** `/upload/json` - Upload JSON file with student data

### 3. Example API Calls

#### Get all students
```bash
curl -X GET "http://localhost:8000/students"
```

#### Search by roll number
```bash
curl -X GET "http://localhost:8000/search?query=24/A01/001"
```

#### Search by name
```bash
curl -X GET "http://localhost:8000/search?query=AADIT"
```

#### Search by application number
```bash
curl -X GET "http://localhost:8000/search?query=240310038495"
```

### 4. PDF to JSON Conversion

#### Using the converter script directly:
```python
from pdf_to_json_converter import StudentDataConverter

converter = StudentDataConverter()
students = converter.extract_data_from_pdf("your_student_data.pdf")
converter.save_to_json(students, "students_data.json")
```

#### Using the API:
```bash
curl -X POST "http://localhost:8000/upload/pdf" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@your_student_data.pdf"
```

## Data Format

The system expects student data in the following JSON format:

```json
[
  {
    "roll_no": "24/A01/001",
    "application_no": "240310038495", 
    "candidate_name": "AADIT MOGHA",
    "branch": "CS",
    "section": "Sec-1"
  }
]
```

## PDF Format Support

The PDF converter supports:
- Tabular data with columns: Roll No, Application No, Candidate Name, Branch, Section
- Text-based data with roll number patterns like "24/A01/001"
- Multiple pages in a single PDF

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "roll_no": "24/A01/001",
    "application_no": "240310038495",
    "candidate_name": "AADIT MOGHA", 
    "branch": "CS",
    "section": "Sec-1"
  },
  "message": "Student found"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Student with roll number 24/A01/999 not found"
}
```

## Sample Data

The system comes with sample data based on Delhi Technological University student records. You can test the API immediately after starting the server.

## Development

### Project Structure
```
testingcompo/
├── main.py                    # FastAPI application
├── models.py                  # Pydantic models
├── pdf_to_json_converter.py   # PDF processing logic
├── requirements.txt           # Python dependencies
├── sample_students_data.json  # Sample student data
└── README.md                 # This file
```

### Adding New Features

1. **New Search Fields**: Modify the search logic in `main.py`
2. **PDF Format Support**: Update the parsing logic in `pdf_to_json_converter.py`
3. **Data Validation**: Add new validation rules in `models.py`

## Troubleshooting

### Common Issues

1. **PDF Processing Errors**: Ensure the PDF contains tabular data or follows the expected format
2. **Search Not Working**: Check if the query matches the exact format (case-insensitive for names)
3. **File Upload Issues**: Ensure the file is a valid PDF or JSON format

### Dependencies

- FastAPI: Web framework
- pdfplumber: PDF text extraction
- pandas: Data manipulation
- pydantic: Data validation
- uvicorn: ASGI server

## License

This project is open source and available under the MIT License.

