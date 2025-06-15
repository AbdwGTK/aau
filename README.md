# Repository Explorer

A modern, performant GitHub repository explorer built with React, TypeScript, Zustand. 
Quickly search, browse, and discover GitHub repositories with live search, infinite scrolling.

---

## 🚀 Features

- **Instant Search**  
  Live, debounced search for GitHub repositories.

- **Repository Cards**  
  Beautiful cards show repo name, owner, avatar, language, description, topics, and stargazers.

- **Infinite Scrolling**  
  Seamless loading of more results as you scroll (intersection observer).

- **Error & Empty States**  
  Polished UI for loading, errors, and no-results.

- **Responsive & Themed UI**  
  Looks great on all devices, with light/dark mode support.



---

## 🛠️ Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/YOUR_USERNAME/repository-explorer.git
   cd repository-explorer
   ```

2. **Install dependencies (use Yarn):**

   ```sh
   yarn
   ```

3. **(Optional) Configure GitHub API access:**  
   By default, unauthenticated requests are used (subject to rate limiting).  
   To increase rate limits, create a `.env.local` file:

   ```
   VITE_GITHUB_TOKEN=your_github_personal_token
   ```


4. **Run the development server:**

   ```sh
   yarn dev
   ```

5. **Open in your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) or the printed URL.

---

## 🧪 Tech Stack

- **React** – Component UI
- **TypeScript** – Type safety
- **Zustand** – State management
- **Tailwind CSS** (or similar) – Styling (swap for your preferred method)
- **Lucide React** – Icon set
- **React Intersection Observer** – Infinite scroll


---

## 🤝 Contributions

Contributions, issues, and feature requests are welcome!

---

## 📝 License

MIT

---
