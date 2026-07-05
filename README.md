#### Wyze Bundle Builder

A multi-step, interactive security system bundle builder built with React and Tailwind CSS. Users can configure their personalized Wyze security system across four steps, review their selections in a live panel, and save their configuration for later.


## Live Preview


Clone the repo and run locally — see Getting Started below.




## Features


* **4-step accordion builder — Choose cameras, plan, sensors, and extra protection.
* **Live review panel — Updates in real time as selections change
* **Per-variant quantity tracking — Each color variant (White, Grey, Black) tracks its own quantity independently
* **Synced steppers — Quantity steppers in the builder and review panel stay in sync
* **Selected state — Cards highlight with a purple border when a product is added
* **Dynamic total — Price recalculates automatically as quantities change
* **Persistence — "Save my system for later" stores the full configuration in localStorage and restores it on return visits
* **Responsive — Optimized for desktop (two-column layout) and mobile (single-column, stacked)
* **Data-driven — All products, steps, and pricing are driven from a single products.json file

---



##  Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS v4** | Styling |
| **react-hot-toast** | Toast notifications |
| **localStorage** | Client-side persistence |

---




## Getting Started

Prerequisites

* **Node.js** >= 18
* **npm** >= 9

---- 





## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Monika-George-Samir/bundle-builder.git

# 2. Navigate into the project directory
cd bundle-builder

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

Then open http://localhost:5173 in your browser.
```
-----




### Build for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```
-----

## Project Structure

bundle-builder/
├── public/
│   ├── images/          # Product images and variant thumbnails
│   └── icons/           # Step icons and UI chevrons (SVG)
├── src/
│   ├── components/
│   │   ├── AccordionStep.jsx      # Single step with header + product grid
│   │   ├── ProductCard.jsx        # Individual product card
│   │   ├── ProductVariantBtn.jsx  # Color variant selector chip
│   │   ├── QuantityCounter.jsx    # Reusable stepper component
│   │   ├── ReviewPanel.jsx        # Live summary panel (right column)
│   │   └── ReviewPanelItem.jsx    # Single line item in the review panel
│   ├── data/
│   │   └── products.json          # All steps, products, variants, and shipping data
│   ├── getReviewItem.js           # Utility to derive line items from state
│   ├── App.jsx                    # Root component — holds all state
│   ├── App.css                    # Global styles
│   └── main.jsx                   # React entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js


## Data Structure

All product data lives in src/data/products.json. The structure is:

json{
  "steps": [
    {
      "id": "cameras",
      "stepId": 1,
      "title": "Choose your cameras",
      "icon": "camera",
      "products": [
        {
          "id": "wyze-cam-v4",
          "name": "Wyze Cam v4",
          "price": 27.98,
          "comparePrice": 35.98,
          "badge": 22,
          "variants": [
            { "id": "wyze-cam-v4-white", "label": "White", "color": "#FFFFFF", "image": "/images/wyze-cam-v4-white.png", "quantity": 1 }
          ],
          "image": "/images/wyze-cam-v4.png",
          "learnMore": "#"
        }
      ]
    }
  ],
  "shipping": {
    "name": "Fast Shipping",
    "price": 0,
    "comparePrice": 5.99,
    "priceLabel": "FREE"
  }
}

To add or modify products, edit products.json — no component changes needed.


## State Management

All application state lives in App.jsx using React's useState. No external state library is used — the component tree is shallow enough (3 levels deep) that prop drilling is clean and straightforward.

## State shape:

jsconst [steps, setSteps] = useState(() => {
  try {
    const localData = localStorage.getItem("saved-system");
    // Initial state reads from localStorage if available, otherwise falls back to default JSON data
    return localData ? JSON.parse(localData) : data.steps;
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return data.steps;
  }
});
const [activeStep, setActiveStep] = useState(0); // Which accordion step is open

## Key update functions:


handleQuantityChange(stepId, productId, variantId, delta) — increments or decrements a variant/product quantity
handleVariantChange(stepId, productId, variantId) — switches the active variant on a product card



## Persistence

Clicking "Save my system for later" serializes the current steps state to localStorage under the key saved-system. On page load, the app checks for saved data and restores it — the user's full configuration (quantities, active variants) is preserved across sessions.


## Responsive Design

BreakpointLayoutMobile (default)Single column, review panel below accordionlg (1024px+)Two-column grid — builder left, review panel right (sticky)xl (1280px+)5-column product grid within the accordion


## Decisions & Tradeoffs


No Context API — The component tree is only 3 levels deep. Context would add unnecessary complexity for this scope; props are clear and traceable.
Local JSON data — Products are served from a static JSON file imported directly via Vite. This could easily be replaced with an API fetch call at startup for a backend integration.
Unit prices in JSON — All prices in products.json represent the price for a single unit. The UI multiplies by quantity for totals.
Per-variant quantity — Each color variant tracks its own quantity independently, as per the spec. Switching variants on a card does not reset other variants' counts.
required flag — Products with "required": true (e.g. Wyze Sense Hub) render with a disabled stepper — they cannot be removed from the bundle.



## Known Limitations / What I'd Add With More Time


 Animated accordion open/close transitions
 Skeleton loading state for images
 Unit and integration tests (Vitest + Testing Library)
 Backend API serving products.json (bonus requirement)
 Accessible variant chips with proper aria-pressed attributes
 Error boundary for localStorage failures on private browsing mode



Monika Geogre Samir 

Built as part of a frontend take-home assessment.