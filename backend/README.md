SIH Backend (Express + MongoDB) with PDF -> JSON integration

Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB running locally (mongodb://127.0.0.1:27017)

Python deps (used by the converter in `testingcompo/`):
```
cd ../testingcompo
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Install & Run
```
cd backend
npm install
npm run dev
```
The API will start on `http://localhost:5000`.

Set `MONGODB_URI` to override the default connection:
```
MONGODB_URI="mongodb://127.0.0.1:27017/sih_main" npm run dev
```

API Overview
- POST `/api/institutions` → create institution
  - body: `{ name, code, email?, contactPhone?, address? }`
- GET `/api/institutions` → list institutions
- GET `/api/students` → list/search students
  - query: `institutionId?`, `q?`, `field?` (one of Rno, Jno, CN, B, Sec)
- POST `/api/upload/pdf` → upload and process a PDF for an institution
  - form-data: `file` (pdf), `institutionCode`, `columnMapping?` (JSON string)

PDF Upload Example
```
curl -X POST http://localhost:5000/api/upload/pdf \
  -F "file=@/absolute/path/to/file.pdf" \
  -F "institutionCode=ABC123" \
  -F 'columnMapping={"Rno":0,"Jno":1,"CN":2,"B":3,"Sec":4}'
```

This will:
- invoke `testingcompo/python_wrapper.py` → `pdf_to_json_converter.py`
- parse students
- upsert them into MongoDB under the specified institution

Notes
- Ensure the Python virtualenv is activated when running locally so the converter imports work.
- The backend expects `python3` to be available on PATH.

