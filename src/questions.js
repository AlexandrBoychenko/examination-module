export default [
    {
        id: "question01",
        value: 'Сколько планет в солнечной системе?',
        items: [7, 5, 9, 8],
        right: 8,
        type: "Radio"
    },
    {
        id: "question02",
        value: 'Что характерно для кометы?',
        items: [
            "Имеет хвост",
            "Вращается вокруг солнца",
            "Состоит из газа и пыли",
            "Существует только во внутренней области солнечной системы",
            "Не имеет ядра"
        ],
        right: [
            "Имеет хвост",
            "Вращается вокруг солнца",
        ],
        type: "Checkbox"
    },
    {
        id: "question03",
        value: 'Какая из планет солнечной системы имеет наибольший объем?',
        items: null,
        right: 'Юпитер',
        type: "TextInput"
    },
    {
        id: "question04",
        value: 'Как называется естественный спутник Земли?',
        items: [
            "Ганимед",
            "Луна",
            "Фобос",
            "Титан",
            "Европа"
        ],
        right: "Луна",
        type: "Select"
    },
    {
        id: "question05",
        value: 'Достигнул ли к настоящему моменту космический аппарат Voyager-2, сконструированный "NASA",' +
        ' пределов солнечной системы?',
        items: ["Да", "Нет"],
        right: "Да",
        type: "Radio"
    },
    {
        id: "question06",
        value: 'Есть ли жизнь на Марсе?',
        items: ["Да", "Нет", "Неизвестно"],
        right: "Неизвестно",
        type: "Radio"
    },
    {
        id: "question07",
        value: 'Как называется наша галлактика?',
        items: [
            "Андромеда",
            "Сириус",
            "Альфа Центавра",
            "Млечный путь"
        ],
        right: "Млечный путь",
        type: "Select"
    },
    {
        id: "question08",
        value: 'Какие из перечисленных ниже небесных тел являются спутниками Юпитера?',
        items: [
            "Тефия",
            "Диона",
            "Ганимед",
            "Титан",
            "Европа",
            "Ио"
        ],
        right: [
            "Ганимед",
            "Европа",
            "Ио"
        ],
        type: "Checkbox",
    },
    {
        id: "question09",
        value: 'Как называется относительно небольшое небесное тело Солнечной системы, движущееся по орбите вокруг ' +
        'Солнца?',
        items: null,
        right: 'Астероид',
        type: "TextInput"
    }
];
