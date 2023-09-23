export default defineNuxtConfig({
  vite: {
    define: {
      "process.env.TESS_ENV": process.env.ENV,
    },
  },
  modules: ["@nuxtjs/i18n"],
  i18n: {
    // add `vueI18n` option to `@nuxtjs/i18n` module options
    vueI18n: {
      legacy: false,
      locale: "en",
      messages: {
        en: {
          fileVariant1: "Insert a link to the text",
          fileVariant2: "Download from device",
          fileVariant3: "Scan Text",
          textEnd: "Text end",
          wordSpeed: "Words per minute",
          textProgress: "Progress",
          buttonDone: "OK",
          buttonBack: "Back",
          buttonStop: "Stop",
          recent: "recent files",
          cloudBadMessage: "Could not get the text from this link",
        },
        ru: {
          fileVariant1: "Вставьте ссылку на текст",
          fileVariant2: "Загрузить с устройства",
          fileVariant3: "Сканировать текст",
          textEnd: "Текст завершен",
          wordSpeed: "Слов в минуту",
          textProgress: "Прогресс",
          buttonDone: "Готово",
          buttonBack: "Назад",
          buttonStop: "Стоп",
          recent: "Недавние файлы",
          cloudBadMessage: "Не удалось получить текст по данной ссылке",
        },
      },
    },
  },
});
