В новом репозитории с одним reedme разворичиваем реакт проект командой npx
create-react-app .

Настраиваем вс код

1.  - Создаём в корне файл .prettierec
    - Вставляем { "printWidth": 80, "tabWidth": 2, "useTabs": false, "semi":
      true, "singleQuote": true, "trailingComma": "all", "bracketSpacing": true,
      "jsxBracketSameLine": false, "arrowParens": "avoid", "proseWrap": "always"
      }

2.  - Установить в проект следующие пакеты.
    - npm install --save-dev prettier husky lint-staged

3.  - Создаём в корне файл .huskyrc
    - Вставляем:
    - для Git { "hooks": { "pre-commit": "lint-staged" } }
    - для GH Desktop { "hooks": { "pre-commit": "npx lint-staged" } }

4.  - Создаём в корне файл .lintstagedrc
    - Вставляем { "src/**/\*.{json,css,scss,md}": ["prettier --write"],
      "src/**/\*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"] }

5.  - Для комфортной работы, после установки плагинов, нужно добавить несколько
      настроек редактора для автосохранения и форматирования файлов. {
      "files.autoSave": "onFocusChange", "editor.formatOnSave": true,
      "editor.codeActionsOnSave": { "source.fixAll.eslint": true } }

6.  - Для настройки абсолютных путей:
    - Создасть в корне jsconfig.json
    - Всавиль в него: { "compilerOptions": { "baseUrl": "src" }, "include":
      ["src"] }

7.  - Для деплоя приложения на GH pages:
    - Добавить в файл package.json свойство "homepage":
      "https://myusername.github.io/my-app",
    - Установить npm install --save gh-pages
    - Добавить в файде package.json скрипты: "predeploy": "npm run build",
      "deploy": "gh-pages -d build",
