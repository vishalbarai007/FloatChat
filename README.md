
# 🌊 FloatChat - AI-Powered Ocean Data Exploration

**FloatChat** is an advanced ocean analytics platform designed to transform oceanographic research. By combining **interactive 3D visualization** with **AI-driven natural language processing**, FloatChat allows researchers and enthusiasts to explore complex ARGO float data, visualize global ocean monitoring networks, and uncover insights through simple conversation.

## 📸 Project Previews

| **Landing Page** | **Interactive Globe** |
|:---:|:---:|
| <img width="100%" alt="Landing Page" src="https://github.com/user-attachments/assets/83ec67c0-77c9-42fe-b52b-a9315463e78f" /> | <img width="100%" alt="Interactive Globe" src="https://github.com/user-attachments/assets/76402324-3833-4492-a197-d97439bea2f3" /> |

| **AI Chat Interface** | **Data Dashboard** |
|:---:|:---:|
| <img width="100%" alt="AI Chat Interface" src="https://github.com/user-attachments/assets/f9f9ec9c-5f2a-423c-bad0-632f74b709f1" /> | <img width="100%" alt="Data Dashboard" src="https://github.com/user-attachments/assets/254c9954-da89-48d6-8144-49b688720011" /> |

-----

## 🚀 Key Features

* **AI Conversational Interface**: Query ocean data using natural language. The system translates questions into SQL/Data queries using LLMs (Large Language Models).
* **Interactive 3D Globe**: Visualize ARGO float locations and trajectories on a rendered 3D Earth using `Three.js` and `@react-three/fiber`.
* **Dynamic Dashboards**: View real-time charts, salinity maps, and temperature profiles utilizing `Recharts`.
* **NetCDF Data Processing**: Upload and process raw `.nc` (NetCDF) files directly through the platform.
* **Authentication System**: Secure login, registration, and guest access modes.
* **Research Grade Data**: Tools for analyzing temperature, salinity, and biogeochemical profiles.

-----

## 🛠️ Tech Stack

### **Frontend (Client)**

Built with modern React ecosystem tools for performance and interactivity.

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
* **Language**: TypeScript / React 19
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
* **Animations**: Framer Motion & GSAP
* **3D Visualization**: @react-three/fiber, @react-three/drei
* **State Management**: React Context API
* **AI Integration**: Google Generative AI SDK

### **Backend (Server)**

A robust Python backend handling data processing and AI logic.

* **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
* **Server**: Uvicorn
* **Data Processing**: Pandas, Xarray (for NetCDF), NumPy, SciPy
* **Database**: SQLite
* **AI/ML**: FAISS (Vector DB for similarity search), Custom NLP-to-SQL logic

-----

## 📂 Project Structure

```bash
FloatChat/
├── public/                 # Static assets (images, textures, models)
├── server/                 # Python FastAPI Backend
│   ├── app/                # Application logic
│   │   ├── ai_core.py      # LLM & Vector DB handling
│   │   ├── database.py     # Database connection & queries
│   │   ├── processing.py   # NetCDF & Dataframe processing
│   │   └── visualizations.py # Map & Graph generation
│   ├── main.py             # Server entry point
│   ├── requirements.txt    # Python dependencies
│   └── *.nc / *.db         # Local data storage
├── src/                    # Next.js Frontend Source
│   ├── app/                # App Router pages & layouts
│   ├── components/         # React Components
│   │   ├── ui/             # Shadcn reusable UI elements
│   │   └── ...             # Feature components (Globe, Chat, etc.)
│   ├── contexts/           # Global state providers (Auth)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── styles/             # Global CSS & Tailwind config
├── package.json            # Frontend dependencies
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
````

## 🏁 Getting Started

### Prerequisites

  * Node.js (v18+)
  * Python (v3.9+)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/vishalbarai007/floatchat.git](https://github.com/vishalbarai007/floatchat.git)
    cd floatchat
    ```

2.  **Setup Backend:**

    ```bash
    cd server
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```

3.  **Setup Frontend:**

    ```bash
    # Open a new terminal in the root directory
    npm install
    npm run dev
    ```

-----

**Built with 💙 by Jr. Coding Saints**


