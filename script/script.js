/* * Script for handling search functionality on the home page */
document.getElementById("search_btn").addEventListener("click", function () {
    const searchInput = document.getElementById("search_input").value.toLowerCase();

    // Search logic here
    const searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchInput)}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            const searchData = data.data;
            console.log("Search results:", searchData)
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
        });
});

/* * Script for Issue Count functionality on the home page */


const totalIssue = document.getElementById("count_issue");

let allIssues = [];

function loadIssue() {
    const allIssuesURL = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;

    fetch(allIssuesURL)
        .then(response => response.json())
        .then(data => {
            allIssues = data.data || [];

            // Total Issues
            const totalIssueLength = allIssues.length;
            totalIssue.innerText = totalIssueLength;

        })
        .catch(error => {
            console.error("Error fetching issue count:", error);
        });
};

/* Active Button Handling */
const allIssuesBtn = document.getElementById("all_btn");
const openIssuesBtn = document.getElementById("open_btn");
const closedIssuesBtn = document.getElementById("closed_btn");

function setActive(btn) {

    const buttons = [allIssuesBtn, openIssuesBtn, closedIssuesBtn];

    buttons.forEach(button => {
        button.classList.remove("btn-primary", "text-white");
        button.classList.add("btn-outline");
    });

    btn.classList.remove("btn-outline");
    btn.classList.add("btn-primary", "text-white");
}

function allIssue() {
    setActive(allIssuesBtn);
    const allIssuesLength = allIssues.length;
    totalIssue.innerText = allIssuesLength;
};

function openIssue() {
    setActive(openIssuesBtn);
    const openIssuesLength = allIssues.filter(issue => issue.status === "open").length;
    totalIssue.innerText = openIssuesLength;

};

function closedIssue() {
    setActive(closedIssuesBtn);
    const closedIssuesLength = allIssues.filter(issue => issue.status === "closed").length;
    totalIssue.innerText = closedIssuesLength;
};


loadIssue();
setActive(document.getElementById("all_btn"));