# InFuse - Indoor Navigation System for GMU

## Overview

InFuse is an indoor navigation system designed to guide students, faculty, and visitors through George Mason University's new building. It helps users find rooms and navigate multiple floors efficiently, with additional features for room scheduling and admin management.

## Core Features

Voice-Activated Navigation: Users can find rooms using voice commands.
Shortest Path Calculation: The system computes the most efficient route inside the building.
Real-Time Map Visualization: Displays the calculated path and building layout, with automatic floor transitions.
Room Scheduling: Admins can manage room availability and activities.

## Tech Stack

Azure (Speech SDK for voice recognition)
JavaScript (Web Speech API for voice input)
ChatGPT API (OpenAI) (Translate human-language requests into code)
Dijkstra Algorithm (For pathfinding and route optimization)
CSV (Building structure data)
HTML5 Canvas (Real-time route visualization)
React (Front-end design)

## What's Next

Integration with building control systems (e.g., air conditioning, lighting)
Real-time mobile app for easier navigation
Admin log-in for managing rooms and schedules
