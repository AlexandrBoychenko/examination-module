export default [
    {
        id: "answer01",
        value: 'Сколько планет в солнечной системе?',
        items: [7, 5, 9, 8],
        right: 8,
        component: "AnswerRadio"
    },
    {
        id: "answer02",
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
        component: "AnswerCheckbox",
    },
    {
        id: "answer03",
        value: 'Какая из планет солнечной системы имеет наибольший объем?',
        items: null,
        right: 'Юпитер',
        component: "AnswerTextInput"
    },
    {
        id: "answer04",
        value: 'Как называется естественный спутник Земли?',
        items: [
            "Ганимед",
            "Луна",
            "Фобос",
            "Титан",
            "Европа"
        ],
        right: "Луна",
        component: "AnswerSelect"
    },
    {
        id: "answer05",
        value: 'Достигнул ли к настоящему моменту космический аппарат Voyager-2, сконструированный "NASA",' +
        ' пределов солнечной системы?',
        items: ["Да", "Нет"],
        right: "Да",
        component: "AnswerRadio"
    },
    {
        id: "answer06",
        value: 'Есть ли жизнь на Марсе?',
        items: ["Да", "Нет", "Неизвестно"],
        right: "Неизвестно",
        component: "AnswerRadio"
    },
    {
        id: "answer07",
        value: 'Как называется наша галлактика?',
        items: [
            "Млечный путь",
            "Андромеда",
            "Сириус",
            "Альфа Центавра"
        ],
        right: "Млечный путь",
        component: "AnswerSelect"
    }
];
