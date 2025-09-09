#!/usr/bin/env python3
"""
Test script for the Student Data API
Run this script to test all API endpoints
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_api():
    """Test all API endpoints"""
    print("🚀 Testing Student Data API")
    print("=" * 50)
    
    # Wait for server to start
    print("⏳ Waiting for server to start...")
    time.sleep(2)
    
    # Test root endpoint
    print("\n1. Testing root endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"✅ Root endpoint: {response.status_code}")
        print(f"   Response: {response.json()['message']}")
    except Exception as e:
        print(f"❌ Root endpoint failed: {e}")
        return
    
    # Test get all students
    print("\n2. Testing get all students...")
    try:
        response = requests.get(f"{BASE_URL}/students")
        data = response.json()
        print(f"✅ Get all students: {response.status_code}")
        print(f"   Found {data['total_count']} students")
    except Exception as e:
        print(f"❌ Get all students failed: {e}")
    
    # Test search by roll number
    print("\n3. Testing search by roll number...")
    try:
        response = requests.get(f"{BASE_URL}/search?query=24/A01/001")
        data = response.json()
        print(f"✅ Search by roll number: {response.status_code}")
        if data['success']:
            print(f"   Found: {data['data'][0]['candidate_name']}")
        else:
            print(f"   {data['message']}")
    except Exception as e:
        print(f"❌ Search by roll number failed: {e}")
    
    # Test search by name
    print("\n4. Testing search by name...")
    try:
        response = requests.get(f"{BASE_URL}/search?query=AADIT")
        data = response.json()
        print(f"✅ Search by name: {response.status_code}")
        if data['success']:
            print(f"   Found: {data['data'][0]['candidate_name']}")
        else:
            print(f"   {data['message']}")
    except Exception as e:
        print(f"❌ Search by name failed: {e}")
    
    # Test search by application number
    print("\n5. Testing search by application number...")
    try:
        response = requests.get(f"{BASE_URL}/search?query=240310038495")
        data = response.json()
        print(f"✅ Search by application number: {response.status_code}")
        if data['success']:
            print(f"   Found: {data['data'][0]['candidate_name']}")
        else:
            print(f"   {data['message']}")
    except Exception as e:
        print(f"❌ Search by application number failed: {e}")
    
    # Test search for non-existent student
    print("\n6. Testing search for non-existent student...")
    try:
        response = requests.get(f"{BASE_URL}/search?query=99/A99/999")
        data = response.json()
        print(f"✅ Search for non-existent: {response.status_code}")
        print(f"   {data['message']}")
    except Exception as e:
        print(f"❌ Search for non-existent failed: {e}")
    
    # Test statistics
    print("\n7. Testing statistics endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/stats")
        data = response.json()
        print(f"✅ Statistics: {response.status_code}")
        print(f"   Total students: {data['total_students']}")
        print(f"   Branches: {data['branches']}")
        print(f"   Sections: {data['sections']}")
    except Exception as e:
        print(f"❌ Statistics failed: {e}")
    
    print("\n" + "=" * 50)
    print("🎉 API testing completed!")
    print("\nTo test file upload endpoints, use:")
    print("curl -X POST 'http://localhost:8000/upload/pdf' -F 'file=@your_file.pdf'")
    print("curl -X POST 'http://localhost:8000/upload/json' -F 'file=@your_file.json'")

if __name__ == "__main__":
    test_api()

