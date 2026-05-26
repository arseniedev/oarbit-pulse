# OarBit Pulse — Routine Management App
![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3dotjs&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

> BCDE213 - Interactive Media Development
> 
>  OarBit Pulse is a lightweight routine management app project, as part of the **BCDE213 - Interactive Media Development** course. This app is built with TypeScript, designed to help users build consistent habits through structured tracking, intelligent reminders, and actionable insights. 


🔗** Live Demo:** [ link to be added ] 

---

## Overview
OarBit Pulse focuses on behavior consistency, not just logging. It provides a minimal but purposeful system for:
- Defining habits
- Staying accountable with reminders
- Understanding progress through reporting

This project was developed as part of an Interactive Media school project, with emphasis on usability, modular design, and maintainable TypeScript architecture.

---

## Core Features
**Habit Management**
- Create, update, and delete habits
- Define frequency (daily, weekly, custom)
- Track completion status over time

**Intermittent Reminders**
- Smart reminder system to reinforce consistency
- Configurable intervals (non-intrusive nudging instead of spam notifications)
- Designed around behavioral reinforcement principles

**Habit Reporting**
- Visual and/or data-driven summaries of progress
- Track streaks and completion rates
- Identify patterns and drop-offs
---

## Project Structure
```
src/
├── components/      # UI or feature components
├── modules/         # Core logic (habits, reminders, reports)
├── services/        # Data handling / persistence
├── utils/           # Helper functions
└── index.ts         # Entry point
```

---

## Getting Started
**Prerequisites**
- Node.js (vXX+)
- npm or yarn

**Installation**
```
git clone https://github.com/your-username/oarbit-pulse.git
cd oarbit-pulse
npm install
```

**Run the App**
```
npm run dev
```

---

## Design Goals (Design Thinking Approach)
This project follows core design thinking principles, ensuring the solution is user-centered and iterative:

**Empathize**
- Designed for users who struggle with consistency and habit burnout
- Focus on reducing overwhelm rather than maximizing features

**Define**
- Problem: Users abandon habit trackers due to rigidity and notification fatigue
- Goal: Create a system that encourages sustainable routines

**Ideate**
- Introduced intermittent reminders instead of fixed alerts
- Focused on minimal UI to reduce cognitive load

**Prototype**
- Wireframes and UI flows designed in [Figma](https://www.figma.com/design/8TethMT7VHzz3WNlrJRdCZ/DesignThinkingProjects?node-id=0-1)
- Iterated on interaction patterns for simplicity and clarity

**Test**
- Evaluated usability through peer feedback
- Refined flows to prioritize ease of use and engagement

## Future Improvements
- Notification system integration (push / email)
- Data persistence (database or cloud sync)
- Advanced analytics (trend prediction, habit scoring)
- Mobile-first UI refinement

---

> [!WARNING]
> ## Important Notice: Academic Integrity
> **BCDE213 - Interactive Media Development**
> 
> This portfolio contains original work completed as part of my BCDE213 - Interactive Media Development  course at Ara Institute of Canterbury. I do not condone plagiarism or academic misconduct in any form. This project is for academic purposes only and is not intended to be copied or used without proper authorisation.
> The university has a STRICT policy on academic misconduct, and I fully support this policy. Any attempt to plagiarize, copy, or use this work as your own will result in serious consequences. Please respect academic integrity and do not attempt to pass off this work as your own.
>
> ## **Disclaimer**
> All the content presented here is the result of my own individual work, and any resemblance to other works is purely coincidental. If you are a student, please refrain from using or copying this work in any way that violates the principles of academic honesty and integrity.
