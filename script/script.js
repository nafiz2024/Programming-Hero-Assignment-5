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

const loadIssue = () => {
    const allIssuesURL = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;

    fetch(allIssuesURL)
        .then(response => response.json())
        .then(data => {
            allIssues = data.data || [];
            displayLoadIssue(allIssues)
            // Total Issues
            const totalIssueLength = allIssues.length;
            totalIssue.innerText = totalIssueLength;

        })
        .catch(error => {
            console.error("Error fetching issue count:", error);
        });
};

/* Issues Display Function handling */

const displayLoadIssue = (issues) => {
    const issuesContainer = document.getElementById("issues_container")
    issuesContainer.innerHTML = " ";

    issues.forEach(issue => {

        const statusIcon = issue.status === "closed"
            ? "../assets/close.png"
            : "../assets/open.png";

        const priorityColor = issue.priority === "high"
            ? "bg-[#FEECEC] text-[#EF4444]"
            : issue.priority === "medium"
                ? "bg-[#FFF6D1] text-[#F59E0B]"
                : "bg-[#9CA3AF] text-[#EEEFF2]";

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="">
            <div class="p-4 bg-white rounded-t-lg shadow space-y-3">
              <div class="mx-auto flex text-center justify-between">
                <div>
                    <img src="${statusIcon}" />
                </div>
                <p
                  class="w-24 py-1 ${priorityColor} font-medium rounded-full"
                >
                  ${issue.priority.toUpperCase()}
                </p>
              </div>
              <div class="space-y-2">
                <h1 class="text-xl text-[#1F2937] font-semibold">
                  ${issue.title}
                </h1>
                <p class="text=[#64748B]">
                  ${issue.description}
                </p>
              </div>
              <div class="flex flex-col lg:flex-row items-center gap-2">
                <p
                  class="py-1.5 px-3 w-72 lg:w-auto mx-auto text-center lg:mx-0 bg-[#FEECEC] text-[#EF4444] font-medium rounded-full"
                >
                  <i class="fa-solid fa-bug"></i> ${issue.labels[0]}
                </p>
                <p
                  class="py-1.5 px-3 w-72 lg:w-auto mx-auto text-center lg:mx-0 bg-[#FFF8DB] text-[#D97706] font-medium rounded-full"
                >
                  <i class="fa-regular fa-life-ring"></i> ${issue.labels[1]}
                </p>
              </div>
            </div>
            <div
              class="flex justify-between border-t border-[#E4E4E7] p-4 bg-white rounded-b-lg shadow space-y-2"
            >
              <div class=" text-[#64748B]">
                <p>#<span>${issue.id}</span> by <span>${issue.author}</span></p>
                <p>Assignee: ${issue.author}</p>                
              </div>
              <div class=" text-[#64748B]">
                <p>Assigned: ${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                <p>Updated: ${new Date(issue.updatedAt).toLocaleDateString("en-US")}</p>
              </div>
            </div>
          </div>
        `;
        issuesContainer.appendChild(div);
    });

}

/* Active Button Handling */
const allIssuesBtn = document.getElementById("all_btn");
const openIssuesBtn = document.getElementById("open_btn");
const closedIssuesBtn = document.getElementById("closed_btn");

const setActive = (btn) => {

    const buttons = [allIssuesBtn, openIssuesBtn, closedIssuesBtn];

    buttons.forEach(button => {
        button.classList.remove("btn-primary", "text-white");
        button.classList.add("btn-outline");
    });

    btn.classList.remove("btn-outline");
    btn.classList.add("btn-primary", "text-white");
}

const allIssue = () => {
    setActive(allIssuesBtn);
    totalIssue.innerText = allIssues.length;
     
    displayLoadIssue(allIssues);
};

const openIssue = () => {
    setActive(openIssuesBtn);
    const openIssuesLength = allIssues.filter(issue => issue.status === "open");
    totalIssue.innerText = openIssuesLength.length;

    displayLoadIssue(openIssuesLength)

};

const closedIssue = () => {
    setActive(closedIssuesBtn);
    const closedIssuesLength = allIssues.filter(issue => issue.status === "closed");
    totalIssue.innerText = closedIssuesLength.length;

    displayLoadIssue(closedIssuesLength)
};


loadIssue();
setActive(document.getElementById("all_btn"));
