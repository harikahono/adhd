// ============================================================
// translations.ts — terjemahan konten soal (en) per q.id
// Sumber kebenaran tetap src/content/questions.ts (id).
// Field yang nggak ada di sini → fallback bahasa sumber.
// Snippet/answer/xp nggak diterjemahkan (lihat lib/localize).
// ============================================================

export interface StepTrans {
  prompt: string
  options: string[]
  explanation: string
}

export interface QuestionTrans {
  title?: string
  steps?: StepTrans[]
  prompt?: string
  rubric?: string
  sampleAnswer?: string
}

export const translations: Record<string, QuestionTrans> = {
  "trace-001": {
    title: "Dissecting a Pop-up Modal",
    steps: [
      {
        prompt: "What does the class `fixed` do on that line?",
        options: [
          "Element stays put on screen — doesn't scroll with the page",
          "Element can't be clicked by the user",
          "Element is always in front",
          "Element fills the whole screen",
        ],
        explanation:
          "`fixed` is like super glue to the screen — scroll all you want, it stays where it is. Bringing it to the front is `z-index`'s job, a different guard. And 'full screen' is `inset-0`'s job.",
      },
      {
        prompt: "When isOpen is FALSE, what class gets applied?",
        options: [
          "block — modal appears",
          "hidden — modal hides",
          "both",
          "error — broken syntax",
        ],
        explanation:
          "A ternary is a one-line if/else: isOpen false picks the right side of the colon, which is 'hidden'. And hidden = display:none = the div vanishes completely, not just turns transparent.",
      },
      {
        prompt: "When isOpen is TRUE, what's the div's final class?",
        options: [
          "fixed inset-0 bg-black block",
          "fixed inset-0 bg-black hidden",
          "fixed inset-0 bg-black",
          "fixed inset-0 bg-black block hidden",
        ],
        explanation:
          "A ternary picks ONE value, never both. isOpen true picks 'block'. Final class: fixed inset-0 bg-black block — modal is visible.",
      },
    ],
  },
  "explain-001": {
    title: "The Lazy Security Guard",
    prompt:
      "Explain in your own words: how does the computer read the line above? What happens when isOpen is true, and when it's false?",
    rubric:
      "MUST mention: (1) conditional rendering, (2) && = short-circuit — read from the left, (3) if the left is false → stop, right side is not rendered, (4) if the left is true → <div> is rendered. BONUS for mentioning JSX / expression / boolean. Score >=90% when all required points appear.",
    sampleAnswer:
      "The computer reads from the left: checks isOpen === true first. Because && is short-circuit — like a lazy security guard — if the left side is false, he stops and never checks the right, so the <div> is not rendered. But if isOpen is true, he proceeds to the right and renders <div className='fixed'>Modal Kebuka!</div> to the screen. This is called conditional rendering.",
  },
  "trace-002": {
    title: "Array Chain Surgery",
    steps: [
      {
        prompt:
          "After passing through .filter(n => n > 1), what does the temporary array look like?",
        options: ["1, 2, 3", "2, 3", "false, true, true", "error"],
        explanation:
          "Filter is a bouncer. The rule: n must be greater than 1. Number 1 fails to enter, 2 and 3 get in. Result: [2, 3]. If you answered false/true, that's the mechanism — but what gets returned is the original values that pass, not booleans.",
      },
      {
        prompt: "After .map(n => n * 2) runs, what is the value of `res`?",
        options: ["2, 4, 6", "4, 6", "2, 3", "undefined"],
        explanation:
          "Map is a modification factory. Its input is [2, 3] from the previous step. Each value is multiplied by 2 → [4, 6]. Can't be [2, 4, 6] because 1 was already kicked out by the filter bouncer at the start.",
      },
      {
        prompt: "Now check the original `nums` array. What's inside it?",
        options: ["1, 2, 3", "4, 6", "2, 3", "empty"],
        explanation:
          "Map and filter are 'eco-friendly' methods. They create a NEW array as output and never touch the original. `nums` stays untouched at [1, 2, 3].",
      },
    ],
  },
  "trace-004": {
    title: "Loop Illusion Precision Drill",
    steps: [
      {
        prompt: "What output appears in the console after 100ms?",
        options: ["0, 1, 2", "1, 2, 3", "3, 3, 3", "error"],
        explanation:
          "JS's oldest trap. `var` is like one shared whiteboard. The loop writes 0, 1, 2 fast, stopping at 3. When 100ms pass and setTimeout checks the whiteboard, the only thing left is the final value: 3. Hence 3, 3, 3.",
      },
      {
        prompt: "How do you fix the code so the output is 0, 1, 2?",
        options: [
          "Replace setTimeout with setInterval",
          "Replace var with let",
          "Replace var with const",
          "Lower the delay from 100 to 0",
        ],
        explanation:
          "`let` gives each loop iteration its own personal notebook. Iteration one stores 0 in its own book, iteration two stores 1, etc. When setTimeout runs, each reads its own notes. (const would error on `i++`).",
      },
    ],
  },
  "trace-005": {
    title: "JS Time Machine",
    steps: [
      {
        prompt: "What does the first line execute: `console.log(nama);`?",
        options: ["Jarvis", "undefined", "ReferenceError", "null"],
        explanation:
          "With 'var', the declaration is hoisted — moved to the top — but the VALUE stays home. Like reserving a table under the name 'nama': the table exists (no error), but the food hasn't arrived yet (undefined). With 'let', you'd get a ReferenceError.",
      },
      {
        prompt: "What does the third line execute: console.log(sapa());?",
        options: ["Halo!", "undefined", "TypeError", "ReferenceError"],
        explanation:
          "Function declarations are VIPs. JavaScript hoists the WHOLE BODY of a regular function to the top before running code. That's why you can call it before you've written the declaration.",
      },
    ],
  },
  "trace-006": {
    title: "Who Is 'this' Anyway?",
    steps: [
      {
        prompt: "When you call `user.getNamaBiasa()`, what's the output?",
        options: ["Stark", "undefined", "error", "window"],
        explanation:
          "A regular function is pragmatic: `this` is WHOEVER CALLS it. Since `user` is calling (placed left of the dot), `this` refers to the `user` object.",
      },
      {
        prompt: "When you call `user.getNamaArrow()`, what's the output?",
        options: [
          "Stark",
          "undefined (or error in strict mode)",
          "null",
          "user",
        ],
        explanation:
          "Arrow functions are rebels: they have no `this` of their own. They borrow `this` from where they were created (lexical scope), i.e. the outer scope of the object (window/global). There's no `nama` there, so it's undefined.",
      },
    ],
  },
  "trace-007": {
    title: "Magic Math",
    steps: [
      {
        prompt: "What is the value of `a`?",
        options: ["2", `"2"`, `"11"`, "NaN"],
        explanation:
          "The plus (+) is a matchmaker for strings. If one side is a string, JS skips the math and merges them as text: '1' pressed against 1 becomes '11'.",
      },
      {
        prompt: "What is the value of `b`?",
        options: ["0", `"0"`, `""`, "NaN"],
        explanation:
          "The minus (-) is a strict math teacher. There's no 'string minus string'. It forces the string '1' to become a real number, then does the math: 1 - 1 = 0.",
      },
    ],
  },
  "trace-008": {
    title: "useEffect with No Brakes",
    steps: [
      {
        prompt: "When does 'Sinkronisasi!' appear in the console?",
        options: [
          "Every single time any state in the component changes",
          "Only once, when the component first renders (mount)",
          "Never appears because the array is empty",
          "Every 1 second",
        ],
        explanation:
          "An empty array `[]` is like a VIP pass for opening day only. The effect runs ONCE when the component first mounts, then it's gone. If you picked option 1, that happens when the array is removed entirely.",
      },
      {
        prompt:
          "What happens if we REMOVE the empty array `[]` (including the comma)?",
        options: [
          "Same thing — runs once",
          "Syntax error",
          "Runs every time any state/props change in that component",
          "Runs when the component is removed (unmount)",
        ],
        explanation:
          "With no dependency array at all, useEffect has no brakes. Every single re-render, no matter how small, it re-executes. Wasteful, and it can loop forever if you update state inside it.",
      },
    ],
  },
  "explain-002": {
    title: "VIP Ticket Queue",
    prompt:
      "From the code above, the console order is C, then B, then A. Explain in your own words why that ordering happens even though the setTimeout delay is 0ms.",
    rubric:
      "MUST mention: (1) C is synchronous (runs immediately on the Call Stack). (2) B is a Promise that enters the Microtask Queue. (3) A is a setTimeout that enters the Macrotask Queue. (4) The Event Loop ALWAYS drains the Microtask queue (Promises) completely before executing Macrotasks (setTimeout).",
    sampleAnswer:
      "'C' runs first because it's plain synchronous code processed immediately at the cashier (Call stack). When the cashier is free, the JS checks its waiting lines. Promises enter the Microtask queue (VIP, priority), while setTimeout enters Macrotask (regular). Even with a 0ms delay, the Event Loop has an iron rule: drain the VIP queue first ('B' comes out), then serve the regular line ('A').",
  },
  "trace-009": {
    title: "Responsive Grid Dissection",
    steps: [
      {
        prompt: "On a small (mobile) screen, how many columns are applied?",
        options: [
          "1 column",
          "3 columns",
          "4 columns",
          "auto — follows content",
        ],
        explanation:
          "A grid is a shelving system that follows rules left-to-right: `grid-cols-1` comes first and applies by default. On small screens the rest (`md:grid-cols-3`) is idle because the `md:` prefix only activates past the medium breakpoint.",
      },
      {
        prompt: "When does `md:grid-cols-3` start applying?",
        options: [
          "When the viewport is >= 768px (medium)",
          "When the viewport is <= 768px",
          "Always, no matter the size",
          "Never — md is only for debugging",
        ],
        explanation:
          "`md:` is like a pump that only starts when the viewport reaches the medium breakpoint (≥768px in Tailwind's default). Below that, the base rule (`grid-cols-1`) applies — mobile-first.",
      },
      {
        prompt: "What does `gap-4` do in this line?",
        options: [
          "Adds spacing between grid columns & rows",
          "Adds padding inside each column",
          "Spacing between pages",
          "Centers the grid",
        ],
        explanation:
          "`gap` is the space between grid cells — like empty chairs between desks in a meeting room. `-4` = 1rem (16px). Want only column gaps? Use `gap-x`; only row gaps? `gap-y`.",
      },
    ],
  },
  "trace-010": {
    title: "Flexbox Queue Dissection",
    steps: [
      {
        prompt: "Without `flex`, how would the header above render?",
        options: [
          "Stacked vertically (block)",
          "Side by side in a row",
          "Hidden entirely",
          "Positioned absolutely",
        ],
        explanation:
          "Block elements stack like cardboard boxes in a warehouse — each child drops below the previous. `flex` turns the container into a hallway; children now line up side by side.",
      },
      {
        prompt: "What does `justify-between` do?",
        options: [
          "First item hugs left, last hugs right, the rest spread between",
          "Groups all items together in the center",
          "In waves aventura",
          "Sends the last item to a new row",
        ],
        explanation:
          "On the horizontal axis, `justify-between` pins the first item to the left, the last to the right, and spreads everything between. Like two billiard balls held against the table edges — no leftover space on the sides.",
      },
      {
        prompt: "What does `items-center` control?",
        options: [
          "Alignment on the vertical axis",
          "Alignment on the horizontal axis",
          "Surface centering",
          "Also centers every other class",
        ],
        explanation:
          "`items-center` (= align-items: center) locks the vertical axis, so a logo and neighboring text sit on the same middle line. Horizontal axis is `justify-*`'s job. Both are children of the `flex` class.",
      },
    ],
  },
  "trace-011": {
    title: "Vacuum Unpacking",
    steps: [
      {
        prompt: "After unpacking, what are the values of `a` and `b`?",
        options: [
          "a=1, b=2",
          "a=1, b=3",
          "a=1, b=undefined",
          "error — invalid syntax",
        ],
        explanation:
          "Destructuring is vacuum unpacking by position: the left spot receives from the left. `const [a, b]` takes index 0 and 1 → a=1, b=2.",
      },
      {
        prompt: "What's in the `rest` variable after unpacking?",
        options: ["[3, 4]", "[2, 3, 4]", "3", "error"],
        explanation:
          "`...rest` (rest operator) collects the REMAINING array items and ALWAYS results in a new array. Not the number 3 — the whole leftover: [3, 4].",
      },
    ],
  },
  "trace-012": {
    title: "Template Literal Mold",
    steps: [
      {
        prompt:
          "After going into the template literal, what's the value of `msg`?",
        options: [
          '"Jawaban: 42"',
          "'Jawaban: ${n}'",
          '"Jawaban: [42]"',
          "Good — n breaks the string",
        ],
        explanation:
          "Backticks are a mold: `${n}` is read as an expression (evaluated), not plain text. So `msg` equals 'Jawaban: 42'. With ordinary quotes, the inner expression is not evaluated and stays literal `${n}`.",
      },
      {
        prompt: "Besides normal strings, what can template literals do?",
        options: [
          "Multi-line strings without \\n escapes",
          "Only single words",
          "It is a normal quote",
          "Cannot be nested",
        ],
        explanation:
          "Backticks keep line breaks as-is — no `\\n` needed — great for long text blocks. `${expr}` accepts any expression (functions, variables). That's why dynamic strings prefer backticks.",
      },
    ],
  },
  "explain-004": {
    title: "The Re-render Cycle",
    prompt:
      "Explain in your own words: when the button is clicked, what happens until the number on screen changes? Why does the UI update even though no HTML is being rewritten?",
    rubric:
      "MUST mention: (1) setCount changes state, (2) state changes trigger a re-render, (3) re-render = React calls the component function again, (4) the new count value is read during render → UI follows. BONUS for explaining why no manual DOM update is needed.",
    sampleAnswer:
      "When clicked, React runs `setCount(count + 1)` — like writing a new number on the state whiteboard. React then automatically calls the component function again (re-render). During that render the function reads the freshest count value (1), and the JSX picks it up. The number ticks up — completely automated, unlike the old days of manual document.getElementById DOM updates.",
  },
  "explain-005": {
    title: "useEffect Spring Cleaning",
    prompt:
      "Explain in your own words: why is `clearInterval(id)` inside the return? What happens if there's no cleanup? (hint: imagine the component mounts and unmounts many times)",
    rubric:
      "MUST mention: (1) return in useEffect = cleanup function, (2) runs on unmount (and before the next effect run), (3) without clearInterval the interval keeps firing after the component is gone → memory leak / stale callbacks. Bonus: unmount + remount needs cleanup.",
    sampleAnswer:
      "The return inside useEffect is the 'cleanup': a closing-shift ticket that runs when the component is about to be removed (unmount). `clearInterval(id)` stops the timer so it doesn't run forever. Without cleanup, the interval keeps shooting every second even after the component is gone — a leak: the watch-thief keeps stealing after the shop closed. Memory slowly bloats for nothing.",
  },
  "explain-003": {
    title: "Seat Belt for Optional",
    prompt:
      "Explain how this line works! What do `?.` and `??` do, and in what exact situation is the string 'Anonim' used?",
    rubric:
      "MUST mention: (1) `?.` (optional chaining) prevents an error when `user` or `profile` is null/undefined (returns undefined without crashing). (2) `??` (nullish coalescing) provides a fallback value. (3) 'Anonim' is used ONLY if the left-hand side IS null or undefined (not other falsy values like 0 or empty string).",
    sampleAnswer:
      "The `?.` (optional chaining) is a seat belt so your page never crashes with 'Cannot read properties of undefined'. If `user` or `profile` isn't ready yet / still loading, it stops and returns `undefined`. Then `??` (nullish coalescing) is the spare tire: only when the left side is `null` or `undefined`, it drops in the default value 'Anonim'.",
  },
}
