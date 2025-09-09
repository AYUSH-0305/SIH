#!/bin/bash

echo "🚀 Starting Student Data Management System"
echo "=========================================="

# Check if API server is running
if ! curl -s http://localhost:8000 > /dev/null; then
    echo "⚠️  API server not running. Starting FastAPI server..."
    python main.py &
    sleep 3
fi

echo "✅ API server is running on http://localhost:8000"
echo "🌐 Starting Streamlit UI on http://localhost:8501"
echo ""
echo "📱 Open your browser and go to: http://localhost:8501"
echo "🔧 API documentation: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Start Streamlit
streamlit run streamlit_app.py --server.port 8501

