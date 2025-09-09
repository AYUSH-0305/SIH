import streamlit as st
import requests
import json
import pandas as pd
import os
from io import BytesIO
from pdf_to_json_converter import StudentDataConverter

# Page configuration
st.set_page_config(
    page_title="Student Data Management System",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# API base URL
API_BASE_URL = "http://localhost:8000"

# Initialize converter
converter = StudentDataConverter()

# Custom CSS
st.markdown("""
<style>
    .main-header {
        text-align: center;
        padding: 2rem 0;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-left: 4px solid #667eea;
    }
    .student-card {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin: 0.5rem 0;
        border-left: 4px solid #4CAF50;
    }
    .search-result {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
    }
</style>
""", unsafe_allow_html=True)

def make_api_request(endpoint, method="GET", data=None, files=None):
    """Make API request with error handling"""
    try:
        url = f"{API_BASE_URL}{endpoint}"
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            if files and data:
                response = requests.post(url, files=files, data=data)
            elif files:
                response = requests.post(url, files=files)
            else:
                response = requests.post(url, json=data)
        
        if response.status_code == 200:
            return response.json()
        else:
            st.error(f"API Error: {response.status_code} - {response.text}")
            return None
    except requests.exceptions.ConnectionError:
        st.error("❌ Cannot connect to API server. Make sure the server is running on http://localhost:8000")
        return None
    except Exception as e:
        st.error(f"Error: {str(e)}")
        return None

def load_stats():
    """Load and display statistics"""
    stats = make_api_request("/stats")
    if stats:
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Students", stats.get("total_students", 0))
        with col2:
            branches = stats.get("branches", {})
            st.metric("Branches", len(branches))
        with col3:
            sections = stats.get("sections", {})
            st.metric("Sections", len(sections))
        
        # Display branch and section breakdown
        if branches or sections:
            col1, col2 = st.columns(2)
            with col1:
                st.subheader("📊 Branch Distribution")
                if branches:
                    branch_df = pd.DataFrame(list(branches.items()), columns=["Branch", "Count"])
                    st.bar_chart(branch_df.set_index("Branch"))
                else:
                    st.info("No branch data available")
            
            with col2:
                st.subheader("📊 Section Distribution")
                if sections:
                    section_df = pd.DataFrame(list(sections.items()), columns=["Section", "Count"])
                    st.bar_chart(section_df.set_index("Section"))
                else:
                    st.info("No section data available")

def search_students(query, search_type="all"):
    """Search for students"""
    if not query.strip():
        st.warning("Please enter a search term")
        return
    
    endpoint = f"/search?query={query}&search_type={search_type}"
    results = make_api_request(endpoint)
    
    if results and results.get("success"):
        students = results.get("data", [])
        total_count = results.get("total_count", 0)
        
        st.success(f"Found {total_count} student(s) matching '{query}'")
        
        if students:
            # Display results in a nice format
            for i, student in enumerate(students, 1):
                with st.expander(f"Student {i}: {student['CN']}", expanded=True):
                    col1, col2, col3 = st.columns(3)
                    with col1:
                        st.write(f"**Roll Number:** {student['Rno']}")
                        st.write(f"**Application No:** {student['Jno']}")
                    with col2:
                        st.write(f"**Name:** {student['CN']}")
                        st.write(f"**Branch:** {student['B']}")
                    with col3:
                        st.write(f"**Section:** {student['Sec']}")
        else:
            st.info("No students found matching your search criteria")
    else:
        st.error("Search failed or no results found")

def display_all_students():
    """Display all students in a table"""
    students_data = make_api_request("/students")
    
    if students_data and students_data.get("success"):
        students = students_data.get("data", [])
        total_count = students_data.get("total_count", 0)
        
        st.subheader(f"📋 All Students ({total_count} total)")
        
        if students:
            # Convert to DataFrame for better display
            df = pd.DataFrame(students)
            
            # Add search functionality
            search_term = st.text_input("🔍 Filter students:", placeholder="Type to filter...")
            if search_term:
                mask = df.apply(lambda x: x.astype(str).str.contains(search_term, case=False, na=False)).any(axis=1)
                df = df[mask]
                st.info(f"Showing {len(df)} students matching '{search_term}'")
            
            # Display the table
            st.dataframe(
                df,
                use_container_width=True,
                hide_index=True,
                column_config={
                    "Rno": "Roll Number",
                    "Jno": "Application No",
                    "CN": "Student Name",
                    "B": "Branch",
                    "Sec": "Section"
                }
            )
        else:
            st.info("No student data available")
    else:
        st.error("Failed to load student data")

def upload_file():
    """Handle file upload"""
    st.subheader("📁 Upload Student Data")
    
    upload_type = st.radio("Select file type:", ["PDF", "JSON"])
    
    uploaded_file = st.file_uploader(
        f"Choose a {upload_type} file",
        type=[upload_type.lower()],
        help=f"Upload a {upload_type} file containing student data"
    )
    
    if uploaded_file is not None:
        if upload_type == "PDF":
            # Show column mapping interface for PDF
            st.markdown("### 🔗 Column Mapping")
            st.info("Map the PDF columns to the database columns. The database uses fixed column names: Rno, Jno, CN, B, Sec")
            
            # First, get PDF columns
            if st.button("🔍 Extract PDF Columns", type="secondary"):
                with st.spinner("Extracting column headers from PDF..."):
                    # Save file temporarily to get columns
                    temp_path = f"temp_{uploaded_file.name}"
                    with open(temp_path, "wb") as f:
                        f.write(uploaded_file.getvalue())
                    
                    try:
                        columns = converter.get_pdf_columns(temp_path)
                        if columns:
                            st.session_state.pdf_columns = columns
                            st.success(f"Found {len(columns)} columns in PDF")
                        else:
                            st.warning("No columns found in PDF")
                    except Exception as e:
                        st.error(f"Error extracting columns: {str(e)}")
                    finally:
                        if os.path.exists(temp_path):
                            os.remove(temp_path)
            
            # Show mapping interface if columns are available
            if hasattr(st.session_state, 'pdf_columns') and st.session_state.pdf_columns:
                st.write("**PDF Columns Found:**")
                st.write(st.session_state.pdf_columns)
                
                st.write("**Map PDF columns to database columns:**")
                
                # Database column definitions
                db_columns = {
                    "Rno": "Roll Number",
                    "Jno": "JAC/OIA Application Number", 
                    "CN": "Candidate Name",
                    "B": "Branch",
                    "Sec": "Section"
                }
                
                column_mapping = {}
                cols = st.columns(2)
                
                for i, (db_col, description) in enumerate(db_columns.items()):
                    with cols[i % 2]:
                        pdf_col_index = st.selectbox(
                            f"{db_col} ({description})",
                            options=range(len(st.session_state.pdf_columns)),
                            format_func=lambda x: f"Column {x}: {st.session_state.pdf_columns[x]}" if x < len(st.session_state.pdf_columns) else "Select column",
                            key=f"mapping_{db_col}"
                        )
                        column_mapping[db_col] = pdf_col_index
                
                # Show preview of mapping
                st.write("**Mapping Preview:**")
                mapping_df = pd.DataFrame([
                    {"Database Column": db_col, "PDF Column": f"Column {pdf_col_index}: {st.session_state.pdf_columns[pdf_col_index]}"}
                    for db_col, pdf_col_index in column_mapping.items()
                ])
                st.dataframe(mapping_df, use_container_width=True)
                
                if st.button("📤 Upload PDF with Mapping", type="primary"):
                    with st.spinner("Uploading and processing PDF with column mapping..."):
                        files = {"file": (uploaded_file.name, uploaded_file.getvalue(), uploaded_file.type)}
                        data = {"column_mapping": json.dumps(column_mapping)}
                        
                        result = make_api_request("/upload/pdf", method="POST", files=files, data=data)
                        
                        if result and result.get("success"):
                            st.success(f"✅ {result.get('message')}")
                            st.info(f"📊 Processed {result.get('students_count', 0)} students")
                            st.rerun()  # Refresh the page to show updated data
                        else:
                            st.error("❌ Upload failed")
        else:
            # JSON upload (no mapping needed)
            if st.button("📤 Upload JSON", type="primary"):
                with st.spinner("Uploading and processing JSON file..."):
                    files = {"file": (uploaded_file.name, uploaded_file.getvalue(), uploaded_file.type)}
                    endpoint = "/upload/json"
                    
                    result = make_api_request(endpoint, method="POST", files=files)
                    
                    if result and result.get("success"):
                        st.success(f"✅ {result.get('message')}")
                        st.info(f"📊 Processed {result.get('students_count', 0)} students")
                        st.rerun()  # Refresh the page to show updated data
                    else:
                        st.error("❌ Upload failed")

# Main app
def main():
    # Header
    st.markdown("""
    <div class="main-header">
        <h1>🎓 Student Data Management System</h1>
        <p>Search, manage, and analyze student enrollment data</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Sidebar navigation
    st.sidebar.title("Navigation")
    page = st.sidebar.selectbox("Choose a page:", [
        "🏠 Dashboard",
        "🔍 Search Students", 
        "📋 View All Students",
        "📁 Upload Data"
    ])
    
    # Load stats for sidebar
    st.sidebar.markdown("---")
    st.sidebar.subheader("📊 Quick Stats")
    stats = make_api_request("/stats")
    if stats:
        st.sidebar.metric("Total Students", stats.get("total_students", 0))
        st.sidebar.metric("Branches", len(stats.get("branches", {})))
        st.sidebar.metric("Sections", len(stats.get("sections", {})))
    
    # Main content based on selected page
    if page == "🏠 Dashboard":
        st.header("📊 Dashboard")
        load_stats()
        
        # Quick search
        st.markdown("---")
        st.subheader("🔍 Quick Search")
        quick_search = st.text_input("Search students:", placeholder="Enter roll number, name, or application number...")
        if st.button("Search", type="primary") or quick_search:
            if quick_search:
                search_students(quick_search)
    
    elif page == "🔍 Search Students":
        st.header("🔍 Search Students")
        
        col1, col2 = st.columns([3, 1])
        with col1:
            search_query = st.text_input("Search term:", placeholder="Enter roll number, name, or application number...")
        with col2:
            search_type = st.selectbox("Search in:", ["all", "Rno", "CN", "Jno", "B", "Sec"])
        
        if st.button("🔍 Search", type="primary") or search_query:
            if search_query:
                search_students(search_query, search_type)
    
    elif page == "📋 View All Students":
        display_all_students()
    
    elif page == "📁 Upload Data":
        upload_file()
    
    # Footer
    st.markdown("---")
    st.markdown("""
    <div style="text-align: center; color: #666; padding: 1rem;">
        <p>Student Data Management System | Built with Streamlit & FastAPI</p>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
