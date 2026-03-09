/* Script for handling Data labels on the card */
const createElements = (arr) => {
  const htmlElements = arr.map((el) => {
    let colorClass = "";
    let iconClass = "";

    if (el === "BUG") {
      colorClass = "bg-[#FEECEC] text-[#EF4444]";
      iconClass = `<i class="fa-solid fa-bug"></i>`;
    } 
    else if (el === "HELP WANTED") {
      colorClass = "bg-[#FFF8DB] text-[#D97706]";
      iconClass = `<i class="fa-regular fa-life-ring"></i>`;
    } 
    else {
      colorClass = "bg-[#BBF7D0] text-[#00A96E]";
      iconClass = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
    }

    return `<p class="py-1.5 px-3 w-72 lg:w-auto mx-auto text-center lg:mx-0 font-medium rounded-full ${colorClass}">${iconClass} ${el}</p>`
  })
  return (htmlElements.join(" "))
}


/* Script for handling search functionality on the home page */
document.getElementById("search_btn").addEventListener("click", function () {
  const searchInput = document.getElementById("search_input").value.toLowerCase();

  // Search logic here
  const searchUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchInput)}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      const searchData = data.data;
      totalIssue.innerText = searchData.length;
      displayLoadIssue(searchData);
    })
    .catch(error => {
      console.error("Error fetching search results:", error);
    });
});

/* Script for Issue Details functionality on the home page */
const loadIssueDetails = async (id) => {
  const issueDetailsURL = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`

  const res = await fetch(issueDetailsURL);
  const details = await res.json();
  const detailsData = details.data;
  displayIssueDetails(detailsData)

  // Open the modal
  const modal = document.getElementById('my_modal_1');
  if (modal) {
    modal.showModal();
  }
}
/* Script for Issue Details Modal functionality on the home page */
const displayIssueDetails = (issue) => {
  const modalContainer = document.getElementById("modal_container");
  modalContainer.innerHTML = ""

  const statusBg = issue.status === "closed"
    ? "bg-[#E60909]"
    : "bg-[#00A96E]"

  const priorityColor = issue.priority === "high"
    ? "bg-[#EF4444]"
    : issue.priority === "medium"
      ? "bg-[#F59E0B]"
      : "bg-[#9CA3AF]";

  const div = document.createElement("div")
  div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
            <div class="modal-box w-auto lg:w-[700px] m-4 p-4 lg:p-8 space-y-6">
              <div class="space-y-2">
                <h1 class="text-[#1F2937] text-2xl font-bold">
                  ${issue.title}
                </h1>
                <div class="flex flex-col lg:flex-row items-center gap-2">
                  <div class="py-1.5 px-4 rounded-full ${statusBg}">
                      <p class="font-bold text-white">${issue.status}</p>
                  </div>
                  <div class="flex items-center gap-2 text-[#64748B]">
                    <p>•</p>
                    <p><span>${issue.status}</span> by <span>${issue.author}</span></p>
                    <p>•</p>
                    <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col lg:flex-row gap-2">
                ${createElements(issue.labels.map(label => label.toUpperCase()))}
              </div>
              <div class="">
                <p class="text-[#64748B]">
                  ${issue.description}
                </p>
              </div>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 p-4 bg-[#F8FAFC] rounded-lg">
                <div class="space-y-1">
                  <p>Assignee:</p>
                  <p>${issue.assignee}</p>
                </div>
                <div class="space-y-1">
                  <p>Priority:</p>
                  <p
                    class="flex justify-center w-24 py-1 ${priorityColor} text-white font-medium rounded-full"
                  >
                    ${issue.priority.toUpperCase()}
                  </p>
                </div>
              </div>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn btn-primary outline-none">Close</button>
                </form>
              </div>
            </div>
          </dialog>
  `;
  modalContainer.appendChild(div);
}

/* * Script for Issue Display functionality on the home page */
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

/* Script for Issues Display Function handling */
const displayLoadIssue = (issues) => {
  const issuesContainer = document.getElementById("issues_container")
  issuesContainer.innerHTML = " ";

  issues.forEach(issue => {

    const statusIcon = issue.status === "closed"
      ? "../assets/close.png"
      : "../assets/open.png";

    const statusBorder = issue.status === "closed"
      ? "border-t-4 border-purple-500"
      : "border-t-4 border-green-500";

    const priorityColor = issue.priority === "high"
      ? "bg-[#FEECEC] text-[#EF4444]"
      : issue.priority === "medium"
        ? "bg-[#FFF6D1] text-[#F59E0B]"
        : "bg-[#9CA3AF] text-[#EEEFF2]";

    const div = document.createElement('div');
    div.innerHTML = `
        <div class=""  onclick="loadIssueDetails(${issue.id})" >
            <div class="p-4 bg-white rounded-t-lg shadow space-y-3 ${statusBorder}">
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
                ${createElements(issue.labels.map(label => label.toUpperCase()))}
              </div>
            </div>
            <div
              class="flex justify-between border-t border-[#E4E4E7] p-3 lg:p-4 bg-white rounded-b-lg shadow space-y-1"
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

/* Script for Active Button function Handling */
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

/* Script for Active All Issues Button function Handling */
const allIssue = () => {
  setActive(allIssuesBtn);
  totalIssue.innerText = allIssues.length;

  displayLoadIssue(allIssues);
};

/* Script for Active Open Issues Button function Handling */
const openIssue = () => {
  setActive(openIssuesBtn);
  const openIssuesLength = allIssues.filter(issue => issue.status === "open");
  totalIssue.innerText = openIssuesLength.length;

  displayLoadIssue(openIssuesLength)

};

/* Script for Active Close Issues Button function Handling */
const closedIssue = () => {
  setActive(closedIssuesBtn);
  const closedIssuesLength = allIssues.filter(issue => issue.status === "closed");
  totalIssue.innerText = closedIssuesLength.length;

  displayLoadIssue(closedIssuesLength)
};


loadIssue();
setActive(document.getElementById("all_btn"));
