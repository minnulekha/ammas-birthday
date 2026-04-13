# 🎂 Amma's Birthday Surprise

A heartfelt, interactive web experience created as a special birthday gift for my mother. This project takes her on a digital journey through cherished memories, leading up to an emotional, custom-written letter and a step-by-step digital gift reveal. 

The entire experience is accompanied by background music and designed to feel like a premium, native application.

---

## ✨ A Journey of Surprises (Features & Walkthrough)

### 1. The Welcome Screen
The journey begins with an elegant greeting and a Polaroid gallery of our favorite moments. A hidden "spark" (✦) triggers the background music and starts the experience.
> <img width="1343" height="588" alt="image" src="https://github.com/user-attachments/assets/41b5cd21-3cd7-47e7-9736-121ff9d215ac" />


### 2. Make a Wish! (Interactive Cake)
A custom-built interactive cake sequence. Users must tap to light the candle, tap again to blow it out (complete with a smoke animation!), and finally tap the knife to cut the cake. 
> <img width="1244" height="546" alt="image" src="https://github.com/user-attachments/assets/0607e6bb-5ef7-4271-8cd8-54cecb6f2cc6" />


### 3. Balloon Pop Game
A fun, gamified section where popping four digital balloons reveals a hidden "You Are The Best!" message before moving to the next surprise.
> <img width="915" height="499" alt="image" src="https://github.com/user-attachments/assets/a5b62dc6-3c0b-42a5-b48e-7863b0651e54" />


### 4. Sweet Memories Slideshow
An automated, responsive photo slideshow showcasing 20 beautiful memories. It features a large, cinematic display for laptops and an elegant contained view for mobile screens. Users can tap to advance or skip directly to the message.
> <img width="1330" height="759" alt="image" src="https://github.com/user-attachments/assets/37bf6518-a47e-4f28-bfb9-3dbead542b4e" />

### 5. A Special Message
A digital envelope that opens to reveal a scrollable, elegantly styled, custom-written letter expressing love and gratitude.
> <img width="1336" height="589" alt="image" src="https://github.com/user-attachments/assets/1993a84d-d037-40e0-9828-81a451520732" />

### 6. The Grand Finale (Gift Reveal Sequence)
A multi-stage sequence designed to build anticipation. It flows seamlessly using a global pop-up system:
* **The Hint:** A large gift box emoji.
* **The Box:** Presenting the closed watch box.
* **The Reveal:** Opening the box to show the beautiful watch.
* **The Reaction:** A photo capturing the joy of the moment.
* **A Moment to Cherish:** A final, beautiful picture of us sharing the gift, with an option to restart the journey.
> <img width="1119" height="568" alt="image" src="https://github.com/user-attachments/assets/176c8792-3260-4688-9bc5-032f4b45a515" />

> <img width="891" height="540" alt="image" src="https://github.com/user-attachments/assets/44ffec7c-8343-4248-9a44-3e4d3ad11c37" />


---

## 🛠️ Tech Stack

This project was built entirely from scratch without external frameworks to ensure smooth performance and a highly custom layout:
* **HTML5:** Semantic structure and content organization.
* **CSS3:** Custom animations (flickering flames, rising smoke, falling hearts, slicing knife), elegant typography (`Playfair Display`, `Lato`, `Nanum Pen Script`), and a fully responsive layout.
* **Vanilla JavaScript:** Handles all complex logic, including the global modal pop-up system, sequential screen navigation, the 20-image interval slideshow, and the multi-step interactive cake logic.

---

## 🚀 How to Run Locally

If you want to run this project on your own machine:

1. Clone this repository or download the ZIP file.
2. Ensure all assets (`song.mp3` and the various `.jpeg`/`.png` images) are located in the same root folder as the code files.
3. Double-click `index.html` to open it in your default web browser.

*Note: Due to standard browser autoplay policies, the background music will begin precisely when the user clicks the initial "✦" spark trigger on the home screen.*

---

## 📂 File Structure

* `index.html`: The main structural document containing all screen sections.
* `style.css`: Contains all styling, responsive media queries, and CSS keyframe animations.
* `script.js`: The engine driving the interactivity, pop-ups, and screen transitions.
* **Assets Required:** `song.mp3`, `watch_box.png`, `watch_reveal.png`, `happy_mom.png`, `gift.png`, and `mom1.jpeg` through `mom20.jpeg`.
