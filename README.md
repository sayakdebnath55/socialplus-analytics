# SocialPulse Analytics — Enterprise Social Media Intelligence Platform

A complete, modern, production-quality **Social Media Analytics Dashboard** web application built with **React 19**, **TypeScript**, **Tailwind CSS**, **Recharts**, and **PapaParse**.

---

## 🌟 Highlights & Features

### 1. Main Dashboard
- **Top Navigation Bar**:
  - Logo and product branding: **SocialPulse Analytics** (Enterprise edition)
  - Navigation tabs: **Dashboard**, **Analytics**, **Content**, **Audience**, **Competitors**, **Reports**, **Settings**
  - Profile/account menu with multi-workspace switcher (*TechPulse Global*, *Maya Chen Creative*, *Aura Lifestyle*)
  - Interactive notification flyout with real-time performance alerts
  - Quick access buttons: **AI Copilot**, **Connect Data (Upload)**, and **Export Report**
  - Fully responsive mobile drawer navigation

- **The 11 Core KPI Cards**:
  1. **Total Followers**
  2. **Total Reach**
  3. **Total Impressions**
  4. **Total Engagement**
  5. **Engagement Rate**
  6. **Total Likes**
  7. **Total Comments**
  8. **Total Shares**
  9. **Total Saves**
  10. **Video Views**
  11. **Follower Growth**
  *Every card includes:* Current value, percentage change badge, previous-period comparison, up/down indicator, SVG sparkline trend, and metric explanation tooltip.

- **Dynamic Cross-Platform Filter & Date Range**:
  - Filter across **All Platforms**, **Instagram**, **YouTube**, **Facebook**, **X / Twitter**, and **LinkedIn**
  - Date ranges: **Last 7 Days**, **Last 30 Days**, **Last 90 Days**, **This Year**
  - Manual sync trigger with live status indicators

- **Interactive Visualizations**:
  - **Cross-Platform Growth & Velocity Trend**: Recharts AreaChart with metric toggles (*Reach*, *Impressions*, *Engagement*, *Video Views*)
  - **Platform Share & Comparison**: Multi-channel bar chart and progress meters comparing audience share across all 5 networks
  - **Optimal Posting Windows**: Day vs Hour engagement density heatmap with peak hours and hover inspection
  - **AI Growth Engine & Recommendations**: Actionable cards with impact badges, confidence scores, and one-click execution
  - **Top Performing Content Showcase**: High-performing posts reel with direct links to the content library

### 2. Analytics Deep-Dive Tab
- **Exposure to Action Funnel**: Impressions → Unique Reach → Engagements → Virality (Shares) → Bookmarks (Saves)
- **Engagement Composition**: Interactive donut chart breaking down Likes, Discussions, Shares, and Saves
- **Format Efficiency Matrix**: Performance breakdown of Carousels, Reels/Shorts, Long-form Video, Articles, Single Images, and Text posts
- **Sentiment Telemetry**: NLP sentiment analysis breakdown (Positive 72.4%, Neutral 21.2%, Critical 6.4%) with Net Sentiment Score (+66.0 NPS)

### 3. Content Intelligence Tab
- Full post library with real-time search by keyword, caption, or hashtag
- Format pills (*Carousels*, *Reels*, *Videos*, *Articles*, *Text*, *Images*) and sort options (*Engagement Rate*, *Reach*, *Likes*, *Shares*, *Date*)
- Toggle between **Card Grid** and **Detailed Table** views
- **Post Detail Inspector Modal**: Simulated post media preview, caption, hashtags, granular metrics, and AI repurposing suggestions
- **Hashtag Resonance Index**: Track volume, reach, and engagement lift across top hashtags

### 4. Audience Demographics Tab
- **Age Cohorts Distribution**: Stacked gender breakdown (18-24, 25-34, 35-44, 45-54, 55+)
- **Gender Identity Split**: Interactive breakdown
- **Geographic Distribution**: Top countries (*United States*, *United Kingdom*, *Germany*, *India*, etc.) and top metro cities
- **Topic Affinity Index**: Ranking audience interest in AI, Cloud Engineering, SaaS, Product Design, and Automation

### 5. Competitor Intelligence Tab
- Direct competitor comparison matrix (*SocialPulse* vs *NovaTech Media*, *Apex Digital*, *Nexus Cloud Lab*)
- **Share of Voice (SOV)** donut chart
- **Engagement Rate Benchmark** comparison
- Strategic gap analysis cards (*Content Lead*, *Velocity Gap*, *Untapped Channels*)

### 6. Reports & Executive Briefings Tab
- Executive briefing document with editable notes memo
- Full 11-KPI telemetry snapshot
- Print / PDF export (formatted print layout via browser print)
- Scheduled automated email dispatch simulation

### 7. Connectors & Settings Tab
- Live API connector cards for Instagram Graph API, YouTube Data API, Facebook Pages API, X API v2, and LinkedIn Org API
- CSV / XLSX / JSON data ingestion center with template downloaders
- Team members & role permission controls
- Customizable alert threshold triggers (*Viral Velocity*, *Engagement Drop*, *Competitor Digest*)

### 8. Interactive AI Copilot & Multi-Format Data Ingestion
- **AI Copilot Drawer**: Natural language chat interface with quick prompts to diagnose engagement changes, identify best ROI channels, and generate captions
- **Multi-Format Ingestion Engine**: Powered by PapaParse and SheetJS (`xlsx`) — upload CSV, native Excel (`.xlsx`), or JSON files through a unified validation and column-mapping pipeline to update dashboard KPIs or import content records
- **Browser History Routing**: Fully integrated with `react-router-dom` across `/dashboard`, `/analytics`, `/content`, `/audience`, `/competitors`, `/reports`, and `/settings` while maintaining global filter and workspace state

---

## 🚀 Running the Project

### Prerequisites
- Node.js v18+ (tested on Node v24)
- npm v9+

### Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application runs locally on `http://127.0.0.1:5173/`.
