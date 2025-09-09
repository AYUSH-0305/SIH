from pydantic import BaseModel
from typing import List, Optional

class Student(BaseModel):
    Rno: str  # Roll Number
    Jno: str  # JAC/OIA Application Number
    CN: str   # Candidate Name
    B: str    # Branch
    Sec: str  # Section

class StudentResponse(BaseModel):
    success: bool
    data: Optional[Student] = None
    message: Optional[str] = None

class StudentsListResponse(BaseModel):
    success: bool
    data: List[Student]
    total_count: int
    message: Optional[str] = None

class SearchRequest(BaseModel):
    query: str
    search_type: Optional[str] = "all"  # "Rno", "Jno", "CN", "B", "Sec", "all"
