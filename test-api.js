/**
 * Test script để kiểm tra các API endpoints
 * Chạy: node test-api.js
 */

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = process.env.FRONTEND_URL || "http://localhost:4000";
const API_URL = `${BASE_URL}/api`;

// Test user credentials
const TEST_USER = {
  username: "student1",
  password: "123456"
};

let authToken = "";

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m"
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log("\n" + "=".repeat(60));
  log(title, "cyan");
  console.log("=".repeat(60));
}

function logTest(name, passed, details = "") {
  const status = passed ? "✓ PASS" : "✗ FAIL";
  const color = passed ? "green" : "red";
  log(`  ${status}: ${name}`, color);
  if (details) {
    log(`    ${details}`, "yellow");
  }
}

// Test functions
async function testAuth() {
  logSection("TEST AUTHENTICATION");
  
  try {
    // Test login
    const loginRes = await axios.post(`${API_URL}/auth/login`, TEST_USER);
    if (loginRes.data.token) {
      authToken = loginRes.data.token;
      logTest("Login", true, `Token received: ${authToken.substring(0, 20)}...`);
      return true;
    } else {
      logTest("Login", false, "No token in response");
      return false;
    }
  } catch (error) {
    logTest("Login", false, error.response?.data?.message || error.message);
    return false;
  }
}

async function testBooks() {
  logSection("TEST BOOKS API");
  
  const headers = { Authorization: `Bearer ${authToken}` };
  let allPassed = true;

  try {
    // Test GET /api/books
    try {
      const res = await axios.get(`${API_URL}/books`, { headers });
      logTest("GET /api/books", true, `Found ${res.data.length} books`);
      if (res.data.length > 0) {
        log(`    Sample book: ${res.data[0].title}`, "yellow");
      }
    } catch (error) {
      logTest("GET /api/books", false, error.response?.data?.message || error.message);
      allPassed = false;
    }

    // Test GET /api/books/top
    try {
      const res = await axios.get(`${API_URL}/books/top?limit=5`, { headers });
      logTest("GET /api/books/top", true, `Found ${res.data.length} top books`);
    } catch (error) {
      logTest("GET /api/books/top", false, error.response?.data?.message || error.message);
      allPassed = false;
    }

    // Test POST /api/books (create)
    try {
      const newBook = {
        title: "Test Book " + Date.now(),
        author: "Test Author",
        category: "Test",
        quantity: 5,
        description: "This is a test book"
      };
      const res = await axios.post(`${API_URL}/books`, newBook, { headers });
      logTest("POST /api/books", true, `Created book: ${res.data.title}`);
      const createdBookId = res.data._id;

      // Test PUT /api/books/:id (update)
      try {
        const updateData = { ...newBook, quantity: 10 };
        const updateRes = await axios.put(`${API_URL}/books/${createdBookId}`, updateData, { headers });
        logTest("PUT /api/books/:id", true, `Updated book: ${updateRes.data.title}`);
      } catch (error) {
        logTest("PUT /api/books/:id", false, error.response?.data?.message || error.message);
        allPassed = false;
      }

      // Test DELETE /api/books/:id
      try {
        await axios.delete(`${API_URL}/books/${createdBookId}`, { headers });
        logTest("DELETE /api/books/:id", true, "Book deleted");
      } catch (error) {
        logTest("DELETE /api/books/:id", false, error.response?.data?.message || error.message);
        allPassed = false;
      }
    } catch (error) {
      logTest("POST /api/books", false, error.response?.data?.message || error.message);
      allPassed = false;
    }

  } catch (error) {
    logTest("Books API", false, error.message);
    allPassed = false;
  }

  return allPassed;
}

async function testLoans() {
  logSection("TEST LOANS API");
  
  const headers = { Authorization: `Bearer ${authToken}` };
  let allPassed = true;

  try {
    // Test GET /api/loans (current loans)
    try {
      const res = await axios.get(`${API_URL}/loans`, { headers });
      logTest("GET /api/loans", true, `Found ${res.data.length} current loans`);
    } catch (error) {
      logTest("GET /api/loans", false, error.response?.data?.message || error.message);
      allPassed = false;
    }

    // Test GET /api/loans/history
    try {
      const res = await axios.get(`${API_URL}/loans/history`, { headers });
      logTest("GET /api/loans/history", true, `Found ${res.data.length} history records`);
    } catch (error) {
      logTest("GET /api/loans/history", false, error.response?.data?.message || error.message);
      allPassed = false;
    }

    // Test GET /api/loans/manage (for librarians)
    try {
      const res = await axios.get(`${API_URL}/loans/manage`, { headers });
      logTest("GET /api/loans/manage", true, `Found ${res.data.length} loans to manage`);
    } catch (error) {
      logTest("GET /api/loans/manage", false, error.response?.data?.message || error.message);
      // This might fail if user is not librarian, which is OK
    }

  } catch (error) {
    logTest("Loans API", false, error.message);
    allPassed = false;
  }

  return allPassed;
}

async function testUsers() {
  logSection("TEST USERS API");
  
  const headers = { Authorization: `Bearer ${authToken}` };
  let allPassed = true;

  try {
    // Test GET /api/users
    try {
      const res = await axios.get(`${API_URL}/users`, { headers });
      logTest("GET /api/users", true, `Found ${res.data.length} users`);
    } catch (error) {
      logTest("GET /api/users", false, error.response?.data?.message || error.message);
      allPassed = false;
    }
  } catch (error) {
    logTest("Users API", false, error.message);
    allPassed = false;
  }

  return allPassed;
}

async function testNotifications() {
  logSection("TEST NOTIFICATIONS API");
  
  const headers = { Authorization: `Bearer ${authToken}` };
  let allPassed = true;

  try {
    // Test GET /api/notifications
    try {
      const res = await axios.get(`${API_URL}/notifications`, { headers });
      logTest("GET /api/notifications", true, `Found ${res.data.length} notifications`);
    } catch (error) {
      logTest("GET /api/notifications", false, error.response?.data?.message || error.message);
      allPassed = false;
    }
  } catch (error) {
    logTest("Notifications API", false, error.message);
    allPassed = false;
  }

  return allPassed;
}

async function testRecommendations() {
  logSection("TEST RECOMMENDATIONS API");
  
  const headers = { Authorization: `Bearer ${authToken}` };
  let allPassed = true;

  try {
    // Test GET /api/recommendations
    try {
      const res = await axios.get(`${API_URL}/recommendations`, { headers });
      logTest("GET /api/recommendations", true, `Found ${res.data.length} recommendations`);
    } catch (error) {
      logTest("GET /api/recommendations", false, error.response?.data?.message || error.message);
      allPassed = false;
    }
  } catch (error) {
    logTest("Recommendations API", false, error.message);
    allPassed = false;
  }

  return allPassed;
}

async function testStats() {
  logSection("TEST STATS API");
  
  const headers = { Authorization: `Bearer ${authToken}` };
  let allPassed = true;

  try {
    // Test GET /api/admin/stats
    try {
      const res = await axios.get(`${API_URL}/admin/stats`, { headers });
      logTest("GET /api/admin/stats", true, "Stats retrieved");
      log(`    Total Titles: ${res.data.totalTitles}`, "yellow");
      log(`    Total Copies: ${res.data.totalCopies}`, "yellow");
      log(`    Students: ${res.data.studentCount}`, "yellow");
    } catch (error) {
      logTest("GET /api/admin/stats", false, error.response?.data?.message || error.message);
      allPassed = false;
    }
  } catch (error) {
    logTest("Stats API", false, error.message);
    allPassed = false;
  }

  return allPassed;
}

// Main test runner
async function runAllTests() {
  log("\n🧪 BẮT ĐẦU TEST CÁC API ENDPOINTS", "blue");
  log(`📍 Base URL: ${BASE_URL}`, "blue");
  log(`📍 API URL: ${API_URL}`, "blue");

  const results = {
    auth: false,
    books: false,
    loans: false,
    users: false,
    notifications: false,
    recommendations: false,
    stats: false
  };

  // Test authentication first
  results.auth = await testAuth();
  
  if (!results.auth) {
    log("\n❌ Authentication failed. Cannot continue with other tests.", "red");
    return;
  }

  // Run all other tests
  results.books = await testBooks();
  results.loans = await testLoans();
  results.users = await testUsers();
  results.notifications = await testNotifications();
  results.recommendations = await testRecommendations();
  results.stats = await testStats();

  // Summary
  logSection("TEST SUMMARY");
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;
  
  Object.entries(results).forEach(([name, passed]) => {
    logTest(name.toUpperCase(), passed);
  });

  console.log("\n");
  log(`Total: ${passedTests}/${totalTests} test suites passed`, passedTests === totalTests ? "green" : "yellow");
  
  if (passedTests === totalTests) {
    log("\n✅ TẤT CẢ TESTS ĐỀU PASS!", "green");
  } else {
    log(`\n⚠️  CÓ ${totalTests - passedTests} TEST SUITE FAILED`, "red");
  }
}

// Run tests
runAllTests().catch(error => {
  log(`\n❌ FATAL ERROR: ${error.message}`, "red");
  console.error(error);
  process.exit(1);
});

