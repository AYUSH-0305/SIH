import sys
import json
from pdf_to_json_converter import StudentDataConverter

def main():
    # Modes:
    #   extract: python_wrapper.py [extract] <pdf_path> [column_mapping_json]
    #   columns: python_wrapper.py columns <pdf_path>
    if len(sys.argv) < 2:
        print("[]")
        return 0

    arg_idx = 1
    mode = 'extract'
    if sys.argv[arg_idx] in ('extract', 'columns'):
        mode = sys.argv[arg_idx]
        arg_idx += 1

    if len(sys.argv) <= arg_idx:
        print("[]")
        return 0

    pdf_path = sys.argv[arg_idx]
    arg_idx += 1

    converter = StudentDataConverter()

    if mode == 'columns':
        cols = converter.get_pdf_columns(pdf_path)
        print(json.dumps(cols or []))
        return 0

    mapping = None
    if len(sys.argv) > arg_idx and sys.argv[arg_idx]:
        try:
            mapping = json.loads(sys.argv[arg_idx])
        except Exception:
            mapping = None

    students = converter.extract_data_from_pdf(pdf_path, mapping)
    print(json.dumps(students))
    return 0

if __name__ == '__main__':
    sys.exit(main())


