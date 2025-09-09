from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import json
import os
from pathlib import Path
from models import Student, StudentResponse, StudentsListResponse, SearchRequest
from pdf_to_json_converter import StudentDataConverter

app = FastAPI(
    title="Student Data API",
    description="API for managing and searching student enrollment data",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to store student data
students_data: List[Student] = []

# Initialize converter
converter = StudentDataConverter()

@app.on_event("startup")
async def startup_event():
    """Load student data on startup"""
    global students_data
    data_file = Path("students_data.json")
    
    if data_file.exists():
        try:
            students_data = converter.load_from_json("students_data.json")
            print(f"Loaded {len(students_data)} students from JSON file")
        except Exception as e:
            print(f"Error loading student data: {e}")
    else:
        # Load sample data if no data file exists
        sample_file = Path("sample_students_data.json")
        if sample_file.exists():
            students_data = converter.load_from_json("sample_students_data.json")
            print(f"Loaded {len(students_data)} sample students")
        else:
            print("No student data file found. Please upload a PDF or JSON file.")

@app.get("/", response_model=dict)
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Student Data API",
        "version": "1.0.0",
        "endpoints": {
            "search_by_roll": "/search/roll/{roll_no}",
            "search_by_application": "/search/application/{application_no}",
            "search_by_name": "/search/name/{name}",
            "search_all": "/search?query={query}",
            "get_all_students": "/students",
            "upload_pdf": "/upload/pdf",
            "upload_json": "/upload/json"
        }
    }

@app.get("/students", response_model=StudentsListResponse)
async def get_all_students():
    """Get all students"""
    return StudentsListResponse(
        success=True,
        data=students_data,
        total_count=len(students_data),
        message=f"Retrieved {len(students_data)} students"
    )

@app.get("/search/roll/{roll_no}", response_model=StudentResponse)
async def search_by_roll_number(roll_no: str):
    """Search student by roll number"""
    global students_data
    
    for student in students_data:
        if student["Rno"].upper() == roll_no.upper():
            return StudentResponse(
                success=True,
                data=Student(**student),
                message="Student found"
            )
    
    return StudentResponse(
        success=False,
        message=f"Student with roll number {roll_no} not found"
    )

@app.get("/search/application/{application_no}", response_model=StudentResponse)
async def search_by_application_number(application_no: str):
    """Search student by application number"""
    global students_data
    
    for student in students_data:
        if student["Jno"] == application_no:
            return StudentResponse(
                success=True,
                data=Student(**student),
                message="Student found"
            )
    
    return StudentResponse(
        success=False,
        message=f"Student with application number {application_no} not found"
    )

@app.get("/search/name/{name}", response_model=StudentsListResponse)
async def search_by_name(name: str):
    """Search students by name (partial match)"""
    global students_data
    
    matching_students = []
    name_lower = name.lower()
    
    for student in students_data:
        if name_lower in student["CN"].lower():
            matching_students.append(Student(**student))
    
    return StudentsListResponse(
        success=True,
        data=matching_students,
        total_count=len(matching_students),
        message=f"Found {len(matching_students)} students matching '{name}'"
    )

@app.get("/search", response_model=StudentsListResponse)
async def search_all(query: str, search_type: str = "all"):
    """Search students across all fields"""
    global students_data
    
    matching_students = []
    query_lower = query.lower()
    
    for student in students_data:
        match_found = False
        
        if search_type == "all" or search_type == "Rno":
            if query_lower in student["Rno"].lower():
                match_found = True
        
        if search_type == "all" or search_type == "Jno":
            if query_lower in student["Jno"].lower():
                match_found = True
        
        if search_type == "all" or search_type == "CN":
            if query_lower in student["CN"].lower():
                match_found = True
        
        if search_type == "all" or search_type == "B":
            if query_lower in student["B"].lower():
                match_found = True
        
        if search_type == "all" or search_type == "Sec":
            if query_lower in student["Sec"].lower():
                match_found = True
        
        if match_found:
            matching_students.append(Student(**student))
    
    return StudentsListResponse(
        success=True,
        data=matching_students,
        total_count=len(matching_students),
        message=f"Found {len(matching_students)} students matching '{query}'"
    )

@app.post("/upload/pdf")
async def upload_pdf(file: UploadFile = File(...), column_mapping: str = None):
    """Upload and process PDF file to extract student data"""
    global students_data
    
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    # Save uploaded file temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    try:
        # Parse column mapping if provided
        mapping = None
        if column_mapping:
            try:
                mapping = json.loads(column_mapping)
            except json.JSONDecodeError:
                raise HTTPException(status_code=400, detail="Invalid column mapping format")
        
        # Extract data from PDF
        extracted_students = converter.extract_data_from_pdf(temp_path, mapping)
        
        if extracted_students:
            # Update global data
            students_data = extracted_students
            
            # Save to JSON file
            converter.save_to_json(extracted_students, "students_data.json")
            
            return {
                "success": True,
                "message": f"Successfully processed PDF and extracted {len(extracted_students)} students",
                "students_count": len(extracted_students)
            }
        else:
            return {
                "success": False,
                "message": "No student data found in the PDF"
            }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
    
    finally:
        # Clean up temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.get("/pdf-columns/{filename}")
async def get_pdf_columns(filename: str):
    """Get column headers from PDF for mapping"""
    try:
        # Check if file exists in temp directory
        temp_path = f"temp_{filename}"
        if not os.path.exists(temp_path):
            raise HTTPException(status_code=404, detail="File not found")
        
        columns = converter.get_pdf_columns(temp_path)
        return {
            "success": True,
            "columns": columns,
            "message": f"Found {len(columns)} columns in PDF"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF columns: {str(e)}")

@app.post("/upload/json")
async def upload_json(file: UploadFile = File(...)):
    """Upload JSON file with student data"""
    global students_data
    
    if not file.filename.endswith('.json'):
        raise HTTPException(status_code=400, detail="File must be a JSON file")
    
    try:
        content = await file.read()
        json_data = json.loads(content.decode('utf-8'))
        
        # Validate data structure
        if isinstance(json_data, list):
            # Update global data
            students_data = json_data
            
            # Save to file
            converter.save_to_json(json_data, "students_data.json")
            
            return {
                "success": True,
                "message": f"Successfully uploaded JSON with {len(json_data)} students",
                "students_count": len(json_data)
            }
        else:
            raise HTTPException(status_code=400, detail="JSON must contain an array of student objects")
    
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing JSON: {str(e)}")

@app.get("/stats")
async def get_stats():
    """Get statistics about the student data"""
    global students_data
    
    if not students_data:
        return {
            "total_students": 0,
            "branches": {},
            "sections": {},
            "message": "No student data available"
        }
    
    # Count by branch
    branches = {}
    sections = {}
    
    for student in students_data:
        branch = student.get("B", "Unknown")
        section = student.get("Sec", "Unknown")
        
        branches[branch] = branches.get(branch, 0) + 1
        sections[section] = sections.get(section, 0) + 1
    
    return {
        "total_students": len(students_data),
        "branches": branches,
        "sections": sections,
        "message": "Statistics retrieved successfully"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
