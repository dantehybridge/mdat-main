
# Vite + React + TypeScript + Tailwind (CDN) App

This project is a basic scaffold using **Vite**, **React**, and **TypeScript**, styled with **Tailwind CSS via CDN**. It demonstrates how to read session-based user authentication data (access token, ID token, username, roles) and display them across a simple UI layout with three sections: **Head**, **Home**, and **Foot**.

## 🎯 Purpose

The goal of this application is to provide a minimal authenticated UI shell where:

* Session storage contains the user's data (`accessToken`, `idToken`, `username`, and `roles`)
* UI is split into clear sections for displaying that data
* Tailwind CDN is used for rapid styling

## 🧩 App Structure

| Section | Description                                                             |
| ------- | ----------------------------------------------------------------------- |
| `Head`  | Displays the user's name and a logout button placeholder                |
| `Home`  | Shows the access token and ID token from `sessionStorage`               |
| `Foot`  | A footer with the message: *"May the force be with you, or something."* |

## 🔐 Session Keys Expected

The app reads the following values from `sessionStorage` on load:

| Key | Purpose                                                       |
| --- | ------------------------------------------------------------- |
| `a` | Access Token                                                  |
| `i` | ID Token                                                      |
| `u` | User's name                                                   |
| `r` | Array of roles (not used yet, but available for future logic) |

Example for local testing (paste in browser console):

```js
sessionStorage.setItem("a", "fake-a-token");
sessionStorage.setItem("i", "fake-i-token");
sessionStorage.setItem("u", "Anakin Skywalker");
sessionStorage.setItem("r", JSON.stringify(["sith", "jedi"]));
```

## ⚙️ Technologies Used

* **Vite**
* **React**
* **TypeScript**
* **Tailwind CSS (via CDN)**

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# 2. Install dependencies
pnpm install

# 3. Run the local server
pnpm dev

# 4. Visit http://localhost:1973 in your browser
```

## 📁 Folder Structure

```bash
src/
├── components/
│   ├── Head.tsx
│   ├── Home.tsx
│   └── Foot.tsx
│
├── App.tsx
└── main.tsx
```

## 🧼 Styling

Tailwind CSS is loaded via CDN in `index.html`. All utility classes are used inline in JSX for component styling.

## 🛠 Future Enhancements (Suggestions)

* Integrate MSAL for real authentication
* Use `r` (roles) to conditionally render UI
* Use logout button to redirect to Microsoft Entra logout URL

---
PS: be kind on this poor developer; here's a GIF showing the inside of its mind:

![](https://c.tenor.com/Pl24l-isDrMAAAAd/tenor.gif)
