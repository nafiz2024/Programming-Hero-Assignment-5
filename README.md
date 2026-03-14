# 🐙 GitHub Issues Tracker

GitHub Issues Tracker is a responsive web application that helps users **track, manage, and filter project issues** in an organized way.

It provides a clean interface where users can view all issues, filter them by **Open or Closed status**, and search issues easily.

---
### 🏠 Main Dashboard

<img src="./Readme Photos/Github Issue Tracker.png">

## 🚀 Live Demo

🔗 Live Website: https://github-issue-trakerr.netlify.app/  
🔗 GitHub Repository: https://github.com/your-username/github-issues-tracker

---

## ✨ Features

- 📋 View all issues in a card layout
- 🟢 Filter **Open Issues**
- 🟣 Filter **Closed Issues**
- 🔎 Search issues by keyword
- 📊 Issue counter display
- ⏳ Loading animation while fetching data
- 📖 Issue details modal
- 📱 Fully responsive design

---

## 🧠 How It Works

1. The application loads issues data from an API or data source.
2. All issues are displayed as cards in a grid layout.
3. Users can filter issues using:
   - **All**
   - **Open**
   - **Closed**
4. The search bar allows users to find specific issues.
5. Clicking an issue opens a **details modal** with more information.

---

## 🛠️ Technologies Used

- **HTML5**
- **Tailwind CSS**
- **daisyUI**
- **JavaScript (ES6)**
- **Font Awesome**

---

## 📂 Project Structure
github-issues-tracker
- │
- ├── assets
- │ ├── github-logo.png
- │ ├── Aperture.png
- │ └── other images
- │
- ├── script
- │ └── script.js
- │
- ├── index.html
- └── README.md


---

## 📸 Screenshots

### 📋 Issues Cards

<img src="./Readme Photos/Github Issue Tracker Card.png">

### 📖 Issue Details Modal

<img src="./Readme Photos/Github Issue Tracker Card Details.png">

---

## 📌 Future Improvements

- Add **Create New Issue feature**
- Add **Edit and Delete issue**
- Connect with **GitHub API**
- Add **User authentication**
- Add **Dark Mode**

---

## 👨‍💻 Author

**Nafiz Alam**

Frontend Web Developer | MERN Stack Developer

- 🌐 GitHub: https://github.com/nafiz2024
- 💼 LinkedIn: https://www.linkedin.com/in/nafiz-alam04/
- 📧 Email: nafizalam.dev@email.com

---

⭐ If you like this project, consider giving it a star on GitHub!

❓ Answers to Questions:
1. Difference between var, let, and const

  Ans:  - **var**: Function scoped. It can be re-declared and updated.
        - **let**: Block scoped. It can be updated but cannot be re-declared in the same scope.
        - **const**: Block scoped. It cannot be re-assigned after declaration.

2. What is the Spread Operator (...)?

  Ans:- The spread operator (`...`) is used to expand elements of an array or properties of an object.

        Example:

            ```javascript
                const numbers = [1,2,3];
                const newNumbers = [...numbers,4];

3. Difference between map(), filter(), and forEach()

  Ans:- 
        - map() → Returns a new array after transforming each element.
        - filter() → Returns a new array with elements that match a condition.
        - forEach() → Loops through the array but does not return a new array.

1. What is an Arrow Function?

  Ans:- An arrow function is a shorter syntax for writing functions in JavaScript.

        Example:

            ```javascript
                const add = (a, b) => a + b;

1. What are Template Literals?

  Ans:- Template literals allow us to create strings with variables using backticks ` `.

        Example:

            ```javascript
                const name = "Nafiz";
                const text = `Hello ${name}`;