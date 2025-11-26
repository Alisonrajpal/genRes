# 🚀 AI Resume Generator

**Frontend-Only Resume Builder with AI Enhancement**

An intelligent, fully-client-side resume generator powered by Hugging Face AI and Supabase.

## ✨ Features

- ✅ **AI-Powered Content Generation** - Uses Mistral-7B model to improve your resume
  - Generate professional summaries
  - Create job descriptions with action verbs
  - Enhance skill proficiencies
  
- ✅ **Live ATS Score Checking** - Real-time feedback on your resume's ATS compatibility (0-100)
  - Keyword matching analysis
  - Actionable improvement suggestions
  - Section structure validation

- ✅ **Multiple Resume Templates** - Choose from Modern, Classic, or Creative designs

- ✅ **Secure Data Storage** - Save to Supabase, load anytime

- ✅ **Export Options** - Download as PDF or print directly

- ✅ **Fully Responsive** - Works seamlessly on desktop and mobile

## 🧰 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Hugging Face Inference API (Mistral-7B-Instruct-v0.2)
- **Database**: Supabase (PostgreSQL + Auth)
- **Icons**: Lucide React
- **Export**: HTML-to-PDF conversion

## 🚀 Quick Start

### Prerequisites
```bash
node >= 16
npm >= 7
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Alisonrajpal/genRes.git
cd genRes/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the `frontend/` directory:
```env
# Hugging Face API Token (get from https://huggingface.co/settings/tokens)
VITE_HF_TOKEN=hf_YOUR_TOKEN_HERE

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your_anon_key

# Optional: Set to "true" to use mock data instead of real API
VITE_USE_MOCK_HF=false
```

4. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## 📖 Usage

### 1. Fill in Your Information
- Enter personal details (name, email, phone, LinkedIn, etc.)
- Add education history
- List work experience
- Add your technical and soft skills

### 2. Use AI to Enhance Content
Click the AI enhancement buttons to generate or improve:
- **Generate Summary** - Creates a professional summary based on your skills and experience
- **Enhance Skills** - Assigns proficiency levels to your skills
- **Generate Job Descriptions** - Creates achievement-focused bullet points for each job

### 3. Monitor ATS Score
- Real-time ATS compatibility score (0-100) in the preview panel
- See which keywords are matched
- Get specific suggestions to improve your score
- Target score: 80+ for best ATS compatibility

### 4. Choose a Template
- **Modern**: Clean, professional design with accent colors
- **Classic**: Traditional format that works with all ATS systems
- **Creative**: Unique layout with visual elements

### 5. Export Your Resume
- Download as PDF
- Print directly
- Data is automatically saved to localStorage and Supabase

## 🔧 How It Works

### Architecture
```
Frontend (React + Vite)
    ├── Hugging Face API → Text Generation (Mistral-7B)
    ├── Supabase → Data Storage
    └── localStorage → Local Backup
```

### AI Features
- **Text Generation**: Prompts are engineered to generate resume-specific content
- **ATS Scoring**: Uses keyword analysis and structural validation (no API call required)
- **Fallback Mode**: If HF token is missing or API fails, uses intelligent mock responses

## 🎯 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_HF_TOKEN` | Hugging Face API token | Yes |
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_KEY` | Supabase anon key | Yes |
| `VITE_USE_MOCK_HF` | Use mock data instead of real API | No (default: false) |

### Get API Keys

**Hugging Face Token:**
1. Go to https://huggingface.co/settings/tokens
2. Create a new token with `read` permissions
3. Copy and paste into `.env`

**Supabase Keys:**
1. Create a project at https://supabase.com
2. Go to Settings → API
3. Copy `URL` and `anon` key

## 📊 Features in Detail

### AI Text Generation
- Uses `mistralai/Mistral-7B-Instruct-v0.2` model
- Smart prompt engineering for resume-specific content
- Automatic error handling and fallback to mock mode
- Max tokens: 150-250 per generation

### ATS Score Calculation
**Scoring Factors:**
- Base score: 50 points
- Keyword matching: +30 points (based on industry-standard ATS keywords)
- Section structure: +15 points (Education, Experience, Skills, Certifications)
- Word count validation: +5 points (optimal: 300-1000 words)

**Feedback Includes:**
- Keyword suggestions
- Section organization tips
- Word count optimization
- Action verb recommendations

### Data Storage
- **localStorage**: Automatic backup of resume data in browser
- **Supabase**: Optional cloud storage and sync
- Encrypted and secure

## 🛠️ Development

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

### Type Check
```bash
npm run type-check
```

## 📁 Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ResumeBuilder/      # Main resume building component
│   │   ├── PreviewPanel/       # Live preview with ATS score
│   │   ├── InputForms/         # Form components for data input
│   │   ├── TemplateSelector/   # Template chooser
│   │   ├── Auth/               # Authentication components
│   │   └── Layout/             # Header and layout
│   ├── services/
│   │   ├── api.ts              # API calls and ATS scoring
│   │   ├── hf.ts               # Hugging Face integration
│   │   └── supabaseClient.ts   # Supabase configuration
│   ├── types/
│   │   └── resume.ts           # TypeScript types
│   ├── utils/
│   │   ├── default.ts          # Default data
│   │   └── helpers.ts          # Utility functions
│   └── main.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🐛 Troubleshooting

### AI Generation Not Working
1. Check your Hugging Face token is valid
2. Open browser DevTools (F12) → Console
3. Look for `[HF Service]` log messages
4. Ensure internet connection is stable
5. Try again (model may need to warm up first time)

### ATS Score Not Updating
- Score updates automatically as you type
- Check that your resume text includes standard section headers
- Refresh the page if stuck

### Resume Not Saving
- Check browser localStorage is enabled
- For Supabase: verify credentials in `.env`
- Check browser DevTools for errors

## 🔒 Privacy & Security

- ✅ All resume data stays on your device (localStorage)
- ✅ Optional Supabase storage is encrypted
- ✅ No data is sent to third parties except:
  - Hugging Face API (for text generation)
  - Supabase (for cloud storage, if enabled)
- ✅ Your API tokens are only used client-side

## 📈 Performance

- Fast page loads (Vite + code splitting)
- Lightweight bundle (~1MB gzipped)
- No server required
- Works offline (with mock mode)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🎓 Learn More

- [Hugging Face Inference API](https://huggingface.co/inference-api)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)

---

**Made with ❤️ for job seekers and professionals**
