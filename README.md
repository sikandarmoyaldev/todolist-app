# TodoList App 📝

A clean, offline-first todo application built with React Native, Expo, and shadcn/ui primitives. Persist your tasks locally with a polished UI that just works.

## ✨ Features

### ✅ Implemented

- **Add Todos:** Quick dialog form with validation
- **Edit Todos:** Tap pencil icon to modify task titles inline
- **Delete Todos:** Confirmation dialog prevents accidental removal
- **Toggle Completion:** Checkbox marks tasks done/undone with strikethrough
- **Persistent Storage:** AsyncStorage saves todos across app restarts
- **Dark/Light Mode:** Auto-adapts to system theme via Nativewind
- **Toast Notifications:** Success/error feedback for all actions (sonner-native)
- **Responsive Layout:** Works on phones, tablets, and foldables

## 🚧 Coming Soon (Placeholders)

- Due dates & reminders
- Categories / tags
- Search & filter
- Cloud sync (optional backend)
- Bulk actions (select multiple)
- Export / import data

## 🛠 Tech Stack

| Layer               | Technology                                |
| :------------------ | :---------------------------------------- |
| **Framework**       | React Native 0.81.5 + Expo SDK 54         |
| **Routing**         | Expo Router (file-based)                  |
| **Styling**         | Nativewind v4 (Tailwind CSS for RN)       |
| **UI Primitives**   | @rn-primitives (shadcn/ui port)           |
| **Icons**           | lucide-react-native                       |
| **State**           | React hooks + custom `useTodos` hook      |
| **Storage**         | @react-native-async-storage/async-storage |
| **Animations**      | react-native-reanimated v3                |
| **Gestures**        | react-native-gesture-handler              |
| **Toasts**          | sonner-native                             |
| **Package Manager** | pnpm                                      |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (npm install -g pnpm)
- Expo Go app (Android/iOS) or Android Studio / Xcode for dev builds

### Clone & Install

```bash
# 1. Clone the repo
git clone https://github.com/sikandarmoyaldev/todolist-app.git
cd todolist-app

# 2. Install dependencies
pnpm install

# 3. Start the dev server
npx expo start
```

### Run on Device

| Platform                | Access Method / Command                 |
| :---------------------- | :-------------------------------------- |
| **Android (Expo Go)**   | Scan QR code with the Expo Go app       |
| **iOS (Expo Go)**       | Scan QR code with the native Camera app |
| **Android (Dev Build)** | `npx expo run:android`                  |
| **iOS (Dev Build)**     | `npx expo run:ios` (Requires macOS)     |

### Troubleshooting

```bash
# Clear all caches if things break
rm -rf node_modules/.cache .expo .metro-cache
npx expo start -c

# Verify dependencies
npx expo-doctor

# Reinstall native modules (if using dev build)
npx expo prebuild --clean
```

## 📁 Project Structure

```bash
src/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout + Toaster + GestureHandler
│   └── index.tsx          # Home screen (main app)
├── components/            # Reusable UI primitives
│   ├── ui/               # shadcn-style components (button, dialog, etc.)
│   └── navbar.tsx        # App header with theme toggle
├── features/
│   └── todo/
│       ├── components/   # Todo-specific UI
│       │   ├── todo-list.tsx    # List + edit/delete actions
│       │   └── todo-form.tsx    # Reusable add/edit dialog
│       ├── hooks/        # Business logic
│       │   └── use-todos.ts     # State + AsyncStorage sync
│       ├── services.ts   # CRUD operations (storage-agnostic)
│       └── types.ts      # TypeScript definitions
├── lib/
│   ├── storage.ts        # AsyncStorage wrapper + key
│   ├── utils.ts          # cn() helper for class merging
│   └── theme.ts          # Navigation theme config
└── globals.css           # Nativewind base styles
```

## 🎨 Design Decisions

- **No global state libraries:** React hooks + context-free architecture keeps it simple
- **Service layer:** Storage logic isolated from UI — swap AsyncStorage for MMKV/backend later
- **Controlled/uncontrolled forms:** `TodoForm` works both ways via optional `open` prop
- **Local action state:** Edit/delete modals live inside `TodoList` — no prop drilling
- **Strict import order:** React → UI → Features → Types (enforced via convention)

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

### Commit Convention

```bash
feat(scope): short description
- bullet point with details
- another bullet if needed
```

## 📄 License

MIT — Use, modify, and distribute freely.

> 💡 Pro Tip: This app works 100% offline. No backend, no accounts, no sync — just your todos, saved locally. Perfect for learning, prototyping, or daily use.

Built with ❤️ using Expo + shadcn/ui primitives. No fluff, just code that works. 🚀
